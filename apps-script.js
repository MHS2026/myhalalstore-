// ── GOOGLE APPS SCRIPT ──
// Deploy this as a Web App in Google Apps Script
// Settings: Execute as Me, Anyone can access
// This receives order data from Vercel webhook and:
// 1. Writes to Google Sheets
// 2. Emails store owner
// 3. Emails customer

// ── CONFIG — EDIT THESE ──
const SHEET_ID = "YOUR_GOOGLE_SHEET_ID_HERE" // from sheet URL
const STORE_EMAIL = "myhalalstore@gmail.com"
const STORE_NAME = "My Halal Store"
const WHATSAPP = "10000000000"

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents)
    writeToSheet(data)
    emailStoreOwner(data)
    emailCustomer(data)
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON)
  } catch (err) {
    console.error("Apps Script error:", err)
    return ContentService
      .createTextOutput(JSON.stringify({ error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON)
  }
}

function writeToSheet(data) {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet()

  // Add header row if sheet is empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Order ID","Date/Time","Customer Name","Email","Phone",
      "Delivery Address","Delivery Notes","Items Ordered",
      "Subtotal","Delivery Fee","Grand Total",
      "Payment Status","Order Status",
      "Stripe Session ID","Stripe Payment Intent"
    ])
    sheet.getRange(1, 1, 1, 15).setFontWeight("bold")
    sheet.setFrozenRows(1)
  }

  // Format items for readable display
  const itemsText = (data.items || [])
    .map(i => `${i.name} — ${i.lbs}lb @ $${i.pricePerLb}/lb = $${i.itemTotal.toFixed(2)}`)
    .join("\n")

  sheet.appendRow([
    data.orderId,
    new Date(data.timestamp).toLocaleString("en-US", { timeZone: "America/Chicago" }),
    data.customerName,
    data.customerEmail,
    data.customerPhone,
    data.deliveryAddress,
    data.deliveryNotes || "",
    itemsText,
    "$" + data.subtotal,
    "$" + data.deliveryFee,
    "$" + data.grandTotal,
    data.paymentStatus,
    data.orderStatus,
    data.stripeSessionId,
    data.stripePaymentIntent,
  ])
}

function emailStoreOwner(data) {
  const itemsHtml = (data.items || [])
    .map(i => `<tr>
      <td style="padding:8px;border-bottom:1px solid #eee">${i.name}</td>
      <td style="padding:8px;border-bottom:1px solid #eee;text-align:center">${i.lbs} lb</td>
      <td style="padding:8px;border-bottom:1px solid #eee;text-align:right">$${i.pricePerLb.toFixed(2)}/lb</td>
      <td style="padding:8px;border-bottom:1px solid #eee;text-align:right">$${i.itemTotal.toFixed(2)}</td>
    </tr>`).join("")

  const subject = `🥩 New Order ${data.orderId} — $${data.grandTotal} — ${data.customerName}`
  const body = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#1C3829;padding:20px;border-radius:8px 8px 0 0">
        <h2 style="color:#D4A843;margin:0">New Order Received</h2>
        <p style="color:rgba(255,255,255,0.7);margin:4px 0 0">${data.orderId}</p>
      </div>
      <div style="background:#fff;padding:24px;border:1px solid #eee">
        <h3 style="color:#1C3829;margin-top:0">Customer Details</h3>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:6px 0;color:#666;width:140px">Name</td><td style="padding:6px 0;font-weight:600">${data.customerName}</td></tr>
          <tr><td style="padding:6px 0;color:#666">Email</td><td style="padding:6px 0">${data.customerEmail}</td></tr>
          <tr><td style="padding:6px 0;color:#666">Phone</td><td style="padding:6px 0">${data.customerPhone}</td></tr>
          <tr><td style="padding:6px 0;color:#666">Address</td><td style="padding:6px 0">${data.deliveryAddress}</td></tr>
          ${data.deliveryNotes ? `<tr><td style="padding:6px 0;color:#666">Notes</td><td style="padding:6px 0">${data.deliveryNotes}</td></tr>` : ""}
        </table>
        <h3 style="color:#1C3829">Order Items</h3>
        <table style="width:100%;border-collapse:collapse">
          <tr style="background:#f8f4ee"><th style="padding:8px;text-align:left">Item</th><th style="padding:8px">Qty</th><th style="padding:8px">Price/lb</th><th style="padding:8px;text-align:right">Total</th></tr>
          ${itemsHtml}
        </table>
        <div style="margin-top:16px;text-align:right">
          <p style="color:#666;margin:4px 0">Subtotal: $${data.subtotal}</p>
          <p style="color:#666;margin:4px 0">Delivery: $${data.deliveryFee}</p>
          <p style="font-size:18px;font-weight:700;color:#1C3829;margin:8px 0">Total: $${data.grandTotal}</p>
        </div>
        <hr style="border:1px solid #eee;margin:20px 0">
        <p style="color:#666;font-size:13px">Stripe Session: ${data.stripeSessionId}</p>
      </div>
    </div>`

  GmailApp.sendEmail(STORE_EMAIL, subject, "", { htmlBody: body, name: STORE_NAME })
}

function emailCustomer(data) {
  const itemsHtml = (data.items || [])
    .map(i => `<tr>
      <td style="padding:8px;border-bottom:1px solid #eee">${i.name}</td>
      <td style="padding:8px;border-bottom:1px solid #eee;text-align:center">${i.lbs} lb</td>
      <td style="padding:8px;border-bottom:1px solid #eee;text-align:right">$${i.itemTotal.toFixed(2)}</td>
    </tr>`).join("")

  const subject = `Order Confirmed — ${data.orderId} | My Halal Store`
  const body = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#1C3829;padding:24px;border-radius:8px 8px 0 0;text-align:center">
        <h1 style="color:#D4A843;margin:0;font-size:28px">My Halal Store</h1>
        <p style="color:rgba(255,255,255,0.7);margin:6px 0 0">Order Confirmed ✓</p>
      </div>
      <div style="background:#fff;padding:28px;border:1px solid #eee;border-top:none">
        <p style="font-size:16px;color:#141210">Hi ${data.customerName.split(" ")[0]},</p>
        <p style="color:#666;line-height:1.6">Thank you for your order! Your payment has been received and your fresh halal meat is being prepared. We will WhatsApp you to confirm your delivery slot.</p>

        <div style="background:#F8F4EE;border-radius:8px;padding:16px;margin:20px 0;text-align:center">
          <p style="color:#666;margin:0;font-size:13px">Order Number</p>
          <p style="color:#1C3829;font-size:22px;font-weight:700;margin:4px 0">${data.orderId}</p>
        </div>

        <h3 style="color:#1C3829">Your Order</h3>
        <table style="width:100%;border-collapse:collapse">
          <tr style="background:#f8f4ee"><th style="padding:8px;text-align:left">Item</th><th style="padding:8px">Qty</th><th style="padding:8px;text-align:right">Total</th></tr>
          ${itemsHtml}
        </table>
        <div style="margin-top:16px;text-align:right">
          <p style="color:#666;margin:4px 0">Subtotal: $${data.subtotal}</p>
          <p style="color:#666;margin:4px 0">Delivery: ${parseFloat(data.deliveryFee) === 0 ? "Free" : "$"+data.deliveryFee}</p>
          <p style="font-size:18px;font-weight:700;color:#1C3829;margin:8px 0">Total Paid: $${data.grandTotal}</p>
        </div>

        <h3 style="color:#1C3829">Delivery Address</h3>
        <p style="color:#666">${data.deliveryAddress}</p>
        ${data.deliveryNotes ? `<p style="color:#666"><strong>Notes:</strong> ${data.deliveryNotes}</p>` : ""}

        <div style="background:#1C3829;border-radius:8px;padding:20px;margin:24px 0;text-align:center">
          <p style="color:rgba(255,255,255,0.8);margin:0 0 12px;font-size:14px">Questions? We're on WhatsApp</p>
          <a href="https://wa.me/${WHATSAPP}" style="background:#25D366;color:#fff;padding:10px 24px;border-radius:6px;text-decoration:none;font-weight:600;font-size:14px">💬 Chat with Us</a>
        </div>

        <p style="color:#999;font-size:12px;text-align:center;margin-top:24px">My Halal Store · Katy, TX · myhalalstore.com</p>
      </div>
    </div>`

  GmailApp.sendEmail(data.customerEmail, subject, "", {
    htmlBody: body,
    name: STORE_NAME,
    replyTo: STORE_EMAIL,
  })
}
