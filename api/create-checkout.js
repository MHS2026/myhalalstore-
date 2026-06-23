// api/create-checkout.js
// Vercel serverless function — creates Stripe Checkout session

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const { PRODUCTS, DELIVERY, STORE } = require("../products")

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", process.env.ALLOWED_ORIGIN || "https://myhalalstore.com")
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")
  if (req.method === "OPTIONS") return res.status(200).end()
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" })

  try {
    const { cartItems, customerInfo } = req.body

    // ── VALIDATE INPUT ──
    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0)
      return res.status(400).json({ error: "Your cart is empty." })

    const required = ["name","email","phone","street","city","zip"]
    for (const field of required) {
      if (!customerInfo?.[field]?.trim())
        return res.status(400).json({ error: `Please fill in your ${field}.` })
    }

    // ── VALIDATE + PRICE SERVER-SIDE (never trust frontend prices) ──
    const validatedItems = []
    let subtotal = 0

    for (const item of cartItems) {
      const product = PRODUCTS.find(p => p.id === item.id && p.available)
      if (!product)
        return res.status(400).json({ error: `Product not found: ${item.id}` })

      const lbs = parseFloat(item.lbs)
      if (isNaN(lbs) || lbs < 0.5 || lbs > 50)
        return res.status(400).json({ error: `Invalid quantity for ${product.name}. Must be 0.5–50 lbs.` })

      const lbsRounded = Math.round(lbs * 2) / 2
      const itemTotal = parseFloat((product.pricePerLb * lbsRounded).toFixed(2))
      subtotal += itemTotal
      validatedItems.push({ ...product, lbs: lbsRounded, itemTotal })
    }

    subtotal = parseFloat(subtotal.toFixed(2))

    if (subtotal < DELIVERY.minOrder)
      return res.status(400).json({ error: `Minimum order is $${DELIVERY.minOrder}. Your subtotal is $${subtotal.toFixed(2)}.` })

    const deliveryFee = subtotal >= DELIVERY.freeThreshold ? 0 : DELIVERY.fee
    const grandTotal = parseFloat((subtotal + deliveryFee).toFixed(2))

    // ── STRIPE LINE ITEMS ──
    const lineItems = validatedItems.map(item => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: `${item.emoji} ${item.name}`,
          description: `${item.lbs} lb × $${item.pricePerLb.toFixed(2)}/lb`,
        },
        unit_amount: Math.round(item.itemTotal * 100),
      },
      quantity: 1,
    }))

    if (deliveryFee > 0) {
      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: "🚚 Delivery Fee",
            description: `Free delivery on orders over $${DELIVERY.freeThreshold}`,
          },
          unit_amount: Math.round(deliveryFee * 100),
        },
        quantity: 1,
      })
    }

    const orderId = "MHS-" + Date.now().toString(36).toUpperCase()
    const deliveryAddress = [
      customerInfo.street,
      customerInfo.apt,
      `${customerInfo.city}, ${customerInfo.state || "TX"} ${customerInfo.zip}`
    ].filter(Boolean).join(", ")

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      customer_email: customerInfo.email,
      success_url: `${process.env.SITE_URL}/order-confirmed?session_id={CHECKOUT_SESSION_ID}&order_id=${orderId}`,
      cancel_url: `${process.env.SITE_URL}/checkout?cancelled=true`,
      metadata: {
        orderId,
        customerName:    customerInfo.name,
        customerEmail:   customerInfo.email,
        customerPhone:   customerInfo.phone,
        deliveryAddress,
        deliveryDate:    customerInfo.deliveryDate  || "",   // ← ADDED
        deliveryNotes:   customerInfo.notes         || "",
        tip:             (body.tip                 || 0).toFixed(2),
        subtotal:        subtotal.toFixed(2),
        deliveryFee:     deliveryFee.toFixed(2),
        grandTotal:      grandTotal.toFixed(2),
        items: JSON.stringify(validatedItems.map(i => ({
          name: i.name, lbs: i.lbs, pricePerLb: i.pricePerLb, itemTotal: i.itemTotal,
        }))),
      },
    })

    return res.status(200).json({ url: session.url, sessionId: session.id, orderId })

  } catch (err) {
    console.error("Checkout error:", err.message)
    return res.status(500).json({ error: "Something went wrong. Please try again or WhatsApp us." })
  }
}
