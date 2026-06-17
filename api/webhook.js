// api/webhook.js
// Receives Stripe webhook events after successful payment
// Writes order to Google Sheets via Google Apps Script webhook URL

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end()

  const sig = req.headers["stripe-signature"]
  let event

  try {
    event = stripe.webhooks.constructEvent(
      req.body, // raw body — must be raw Buffer, not parsed JSON
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error("Webhook signature error:", err.message)
    return res.status(400).json({ error: `Webhook error: ${err.message}` })
  }

  // Only handle successful payments
  if (event.type === "checkout.session.completed") {
    const session = event.data.object

    // Only process paid sessions
    if (session.payment_status !== "paid") {
      return res.status(200).json({ received: true })
    }

    const meta = session.metadata
    let items = []
    try { items = JSON.parse(meta.items || "[]") } catch {}

    const orderData = {
      orderId: meta.orderId,
      stripeSessionId: session.id,
      stripePaymentIntent: session.payment_intent,
      timestamp: new Date().toISOString(),
      customerName: meta.customerName,
      customerEmail: meta.customerEmail,
      customerPhone: meta.customerPhone,
      deliveryAddress: meta.deliveryAddress,
      deliveryNotes: meta.deliveryNotes,
      items,
      subtotal: meta.subtotal,
      deliveryFee: meta.deliveryFee,
      grandTotal: meta.grandTotal,
      paymentStatus: "Paid",
      orderStatus: "To Pack",
    }

    // ── SEND TO GOOGLE APPS SCRIPT ──
    try {
      const response = await fetch(process.env.GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      })
      if (!response.ok) {
        console.error("Google Script error:", await response.text())
      }
    } catch (err) {
      console.error("Failed to reach Google Script:", err.message)
      // Don't return error — Stripe will retry. Log and continue.
    }
  }

  return res.status(200).json({ received: true })
}
