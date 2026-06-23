import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

export const config = {
  api: {
    bodyParser: false,  // CRITICAL — must be raw for Stripe signature verification
  },
}

// Helper to read raw body from stream
async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', chunk => chunks.push(chunk))
    req.on('end', () => resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  let event
  const rawBody = await getRawBody(req)
  const sig = req.headers['stripe-signature']

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return res.status(400).json({ error: `Webhook error: ${err.message}` })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object

    // Extract address fields
    const shipping = session.shipping_details || {}
    const address  = shipping.address || {}
    const name     = shipping.name || session.customer_details?.name || ''
    const email    = session.customer_details?.email || ''
    const phone    = session.customer_details?.phone || ''

    // Extract line items from metadata (set during checkout creation)
    let items = []
    try {
      items = JSON.parse(session.metadata?.items || '[]')
    } catch (e) {
      items = []
    }

    const total        = (session.amount_total / 100).toFixed(2)
    const subtotal     = (session.metadata?.subtotal    || (session.amount_total / 100)).toString()
    const deliveryFee  = session.metadata?.deliveryFee  || '8.99'
    const orderId      = session.metadata?.orderId      || 'MHS-' + session.id.slice(-8).toUpperCase()
    const deliveryDate  = session.metadata?.deliveryDate  || ''
    const deliveryNotes = session.metadata?.deliveryNotes || ''
    const tip           = session.metadata?.tip           || '0.00'

    const payload = {
      orderId,
      customerName  : name,
      customerEmail : email,
      customerPhone : phone,
      address       : address.line1 || session.metadata?.deliveryAddress || '',
      city          : address.city  || '',
      zip           : address.postal_code || '',
      deliveryDate,
      deliveryNotes,
      tip,
      items,
      subtotal,
      deliveryFee,
      total,
      stripeSessionId: session.id
    }

    // Send to Google Apps Script
    if (process.env.GOOGLE_SCRIPT_URL) {
      try {
        const response = await fetch(process.env.GOOGLE_SCRIPT_URL, {
          method : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body   : JSON.stringify(payload)
        })
        const result = await response.text()
        console.log('Google Script response:', result)
      } catch (err) {
        console.error('Google Script error:', err.message)
        // Don't fail the webhook — Stripe needs 200
      }
    } else {
      console.warn('GOOGLE_SCRIPT_URL not set — skipping sheet update')
    }
  }

  return res.status(200).json({ received: true })
}
