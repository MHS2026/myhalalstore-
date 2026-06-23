// =============================================================
// MY HALAL STORE — MASTER CONFIG
// Edit this file and push to GitHub. The site auto-updates.
// =============================================================

// =============================================================
// LOGO SETTINGS
// =============================================================
const LOGO = {
  // 1. Upload your logo to imgbb.com
  // 2. Paste the direct URL below
  // 3. Or keep null to use the embedded default
  url: null,          // ← e.g. "https://i.ibb.co/xxx/logo.png"
  height: 60,         // ← logo height in nav bar (px)
  footerHeight: 60,   // ← logo height in footer (px)
};

// =============================================================
// DELIVERY SCHEDULE — ADMIN CONTROL
// =============================================================
const DELIVERY_SCHEDULE = {
  // Allowed delivery days (0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat)
  allowedDays: [2, 4, 6],            // Tuesday, Thursday, Saturday

  // How many upcoming delivery date options to show at checkout
  numOptions: 3,

  // Allow same-day delivery?
  // If today is Tue/Thu/Sat and this is true, it appears as an option.
  sameDayAllowed: false,

  // Disabled specific dates — format: 'YYYY-MM-DD'
  // These dates will be skipped even if they fall on an allowed day.
  disabledDates: [
    // '2026-07-04',   // Example: skip July 4th
  ],

  // Manual override: force these exact dates to appear (format: 'YYYY-MM-DD')
  // Leave empty [] to use auto-calculated dates based on allowedDays above.
  overrideDates: [],
};

// =============================================================
// PROMO CODES — ADMIN CONTROL
// discount: 0.10 = 10%, type: 'percent' or 'flat' ($ off)
// minOrder: minimum subtotal required to use the code
// =============================================================
const PROMO_CODES = {
  'WELCOME10': { discount: 0.10, type: 'percent', minOrder: 35,  label: '10% off your order', maxDiscount: 10 },
  'FREESHIP':  { discount: 0,    type: 'freeDelivery', minOrder: 0, label: 'Free delivery', maxUses: 3 },
  'EID20':     { discount: 0.20, type: 'percent', minOrder: 100, label: '20% off orders $100+'   },
  // Add more codes here. Keys are case-insensitive.
};

// =============================================================
// STORE SETTINGS
// =============================================================
const STORE = {
  name:     'My Halal Store',
  email:    'myhalalstore1@gmail.com',
  phone:    '(000) 000-0000',      // ← REPLACE with real number
  whatsapp: '10000000000',          // ← REPLACE with real WhatsApp number (no + or spaces)
};

// =============================================================
// DELIVERY FEES & THRESHOLDS
// =============================================================
const DELIVERY = {
  fee:           8.99,   // ← flat delivery fee in $
  freeThreshold: 75,     // ← spend this amount or more for free delivery
  minOrder:      35,     // ← minimum order value in $
};

// =============================================================
// SERVICE ZIP CODES
// Add or remove ZIPs here to control your delivery area.
// =============================================================
const SERVICE_ZIPS = [
  // Katy
  '77449', '77450', '77493', '77494', '77492',
  // South Katy / Firethorne
  '77441', '77423',
  // West Houston / Bear Creek / Copperfield
  '77084', '77095',
  // West Houston / Westheimer Corridor
  '77082', '77083', '77077', '77079', '77099',
  // Sugar Land / First Colony
  '77478', '77479', '77498',
  // Richmond / Rosenberg
  '77406', '77407', '77469', '77471',
  // Missouri City
  '77459',
];

// =============================================================
// PRODUCTS — single source of truth
// HOW TO ADD A PRODUCT IMAGE:
//   1. Take a photo of the product
//   2. Upload to https://imgbb.com (free, no account needed)
//   3. Copy the "Direct link" URL
//   4. Paste it into the "image" field below
//   5. Push to GitHub — done
// If no image, leave image: null and the emoji shows instead.
// =============================================================
const PRODUCTS = [

  // ── BEEF ──────────────────────────────────────────────────
  {
    id: 'nihari-boneless',
    name: 'Nihari Cut — Without Bone',
    description: 'Classic boneless nihari cut. Perfect for slow-cooked curries and stews.',
    category: 'beef',
    categoryLabel: 'Beef',
    emoji: '🥩',
    image: "https://i.ibb.co/2D8702t/Product1-1.png", // ← paste image URL here
    tag: 'Top Seller',              // ← options: 'Top Seller', 'Best Value', 'Popular', null
    pricePerLb: 7.00,               // ← EDIT PRICE HERE
    originalPrice: 9.00,            // ← set to e.g. 9.00 for crossed-out price
    cutType: 'boneless',            // ← 'boneless', 'bone-in', 'mince', 'mixed'
    piecesPerLb: '5-6 pieces/lb',
    favorite: true,                 // ← true = shows in Customer Favourites carousel
    available: true,                // ← false = hidden from shop (not deleted)
  },
  {
    id: 'nihari-bone',
    name: 'Nihari Cut — With Bone (Beef Shank)',
    description: 'Bone-in beef shank. Rich marrow for traditional nihari.',
    category: 'beef',
    categoryLabel: 'Beef',
    emoji: '🍖',
    image: "https://i.ibb.co/Dm6XgTp/Product2-1.png",
    tag: null,
    pricePerLb: 7.00,
    originalPrice: 9.00,
    cutType: 'bone-in',
    piecesPerLb: '4-5 pieces/lb',
    favorite: false,
    available: true,
  },
  {
    id: 'beef-cubes',
    name: 'Beef Cubes',
    description: 'Tender boneless cubes. Ideal for karahi, handi, and kebabs.',
    category: 'beef',
    categoryLabel: 'Beef',
    emoji: '🥩',
    image: "https://i.ibb.co/Mxyz3h1D/Product3-1.png",
    tag: null,
    pricePerLb: 7.00,
    originalPrice: 9.00,
    cutType: 'boneless',
    piecesPerLb: '5-6 pieces/lb',
    favorite: false,
    available: true,
  },
  {
    id: 'beef-mince',
    name: 'Beef Mince (85% Lean)',
    description: '85% lean ground beef. Perfect for keema, burgers, and kofta.',
    category: 'beef',
    categoryLabel: 'Beef',
    emoji: '🫙',
    image: "https://i.ibb.co/MDVCGgzz/Product4-1.png",
    tag: null,
    pricePerLb: 7.00,
    originalPrice: 9.00,
    cutType: 'mince',
    piecesPerLb: '4 servings/lb',
    favorite: false,
    available: true,
  },

  // ── CHICKEN ───────────────────────────────────────────────
  {
    id: 'chicken-cutup',
    name: 'Chicken Cutup Skinless',
    description: 'Whole chicken cut into pieces, skin removed. Great for curries.',
    category: 'chicken',
    categoryLabel: 'Chicken',
    emoji: '🍗',
    image: "https://i.ibb.co/hxBdsssf/Product5-1.png",
    tag: 'Best Value',
    pricePerLb: 2.00,
    originalPrice: 3.50,
    cutType: 'mixed',
    piecesPerLb: '7-8 pieces/lb',
    favorite: true,
    available: true,
  },
  {
    id: 'chicken-breast',
    name: 'Chicken Breast Skinless',
    description: 'Lean boneless breast. Perfect for grilling and baking.',
    category: 'chicken',
    categoryLabel: 'Chicken',
    emoji: '🍗',
    image: "https://i.ibb.co/P7pLZdn/Product6-1.png",
    tag: null,
    pricePerLb: 2.00,
    originalPrice: 3.50,
    cutType: 'boneless',
    piecesPerLb: '2-3 pieces/lb',
    favorite: false,
    available: true,
  },
  {
    id: 'chicken-drumstick',
    name: 'Chicken Drumstick',
    description: 'Juicy drumsticks. Ideal for roasting and BBQ.',
    category: 'chicken',
    categoryLabel: 'Chicken',
    emoji: '🍗',
    image: "https://i.ibb.co/HfkNP8WM/Product7-1.png",
    tag: null,
    pricePerLb: 2.00,
    originalPrice: 3.50,
    cutType: 'bone-in',
    piecesPerLb: '4–5 pieces/lb',
    favorite: false,
    available: true,
  },

  // ── GOAT ──────────────────────────────────────────────────
  {
    id: 'goat-cutup',
    name: 'Goat Cutup Mix',
    description: 'Mixed bone-in goat pieces. Perfect for biryani and slow curries.',
    category: 'goat',
    categoryLabel: 'Goat',
    emoji: '🐐',
    image: "https://i.ibb.co/GfXKWhvj/Product8-1.png",
    tag: 'Popular',
    pricePerLb: 13.00,
    originalPrice: 15.50,
    cutType: 'bone-in',
    piecesPerLb: '4–5 pieces/lb',
    favorite: true,
    available: true,
  },

  // ── LAMB ──────────────────────────────────────────────────
  {
    id: 'lamb-mix',
    name: 'Lamb Mix',
    description: 'Mixed lamb cuts, bone-in. Rich flavour for Eid dishes.',
    category: 'lamb',
    categoryLabel: 'Lamb',
    emoji: '🐑',
    image: "https://i.ibb.co/cXtdbxb2/Product9-1.png",
    tag: 'Popular',
    pricePerLb: 13.00,
    originalPrice: 15.50,
    cutType: 'bone-in',
    piecesPerLb: '4–5 pieces/lb',
    favorite: true,
    available: true,
  },
  {
    id: 'lamb-shank',
    name: 'Lamb Shank',
    description: 'Premium whole lamb shank. Slow-cook for best results.',
    category: 'lamb',
    categoryLabel: 'Lamb',
    emoji: '🍖',
    image: "https://i.ibb.co/gbGVV0RV/Product10-1.png",
    tag: null,
    pricePerLb: 13.00,
    originalPrice: 15.50,
    cutType: 'bone-in',
    piecesPerLb: '1-2 pieces/lb',
    favorite: true,
    available: true,
  },
];

// =============================================================
// HELPERS — used by checkout.html, shop.html, order-confirmed.html
// DO NOT EDIT BELOW THIS LINE
// =============================================================

// Alias for pages that reference DELIVERY_ZONES
const DELIVERY_ZONES = SERVICE_ZIPS;

// ZIP validation
function isDeliverableZip(zip) {
  return SERVICE_ZIPS.includes(String(zip).trim());
}

// Cart helpers
function getCart() {
  try { return JSON.parse(localStorage.getItem('mhs_cart') || '[]'); } catch { return []; }
}
function saveCart(items) {
  localStorage.setItem('mhs_cart', JSON.stringify(items));
  window.dispatchEvent(new CustomEvent('mhs_cart', { detail: items }));
}
function cartCount() {
  return getCart().length;
}
function cartSubtotal() {
  return getCart().reduce((s, i) => s + i.pricePerLb * i.lbs, 0);
}
function cartDelivery(subtotal) {
  const sub = subtotal !== undefined ? subtotal : cartSubtotal();
  if (sub <= 0) return 0;
  return sub >= DELIVERY.freeThreshold ? 0 : DELIVERY.fee;
}
function cartTotal() {
  const sub = cartSubtotal();
  return sub + cartDelivery(sub);
}

// =============================================================
// DELIVERY DATE ENGINE
// Returns array of Date objects for upcoming valid delivery dates.
// Reads from DELIVERY_SCHEDULE above — no code changes needed.
// =============================================================
function getUpcomingDeliveryDates() {
  // Manual override takes priority
  if (DELIVERY_SCHEDULE.overrideDates && DELIVERY_SCHEDULE.overrideDates.length) {
    return DELIVERY_SCHEDULE.overrideDates.map(s => {
      const [y, m, d] = s.split('-').map(Number);
      return new Date(y, m - 1, d);
    });
  }

  const today   = new Date();
  today.setHours(0, 0, 0, 0); // midnight local

  const disabledSet = new Set(DELIVERY_SCHEDULE.disabledDates || []);
  const results     = [];

  let cursor = new Date(today);
  if (!DELIVERY_SCHEDULE.sameDayAllowed) {
    cursor.setDate(cursor.getDate() + 1); // start from tomorrow
  }

  // Walk forward up to 60 days to find enough valid slots
  for (let i = 0; i < 60 && results.length < DELIVERY_SCHEDULE.numOptions; i++) {
    const dayOfWeek = cursor.getDay();
    const dateStr   = cursor.toISOString().slice(0, 10); // YYYY-MM-DD

    if (DELIVERY_SCHEDULE.allowedDays.includes(dayOfWeek) && !disabledSet.has(dateStr)) {
      results.push(new Date(cursor));
    }

    cursor.setDate(cursor.getDate() + 1);
  }

  return results;
}

// Format a Date as a slot label, e.g. "Tue, Jun 24"
function formatDeliveryDate(d) {
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

// Format a Date for the backend / confirmation page, e.g. "Tuesday, June 24, 2026"
function formatDeliveryDateFull(d) {
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
}

// =============================================================
// PROMO CODE VALIDATOR
// Returns { valid, code, discount, type, label, error }
// =============================================================
function validatePromo(inputCode, subtotal) {
  const key = (inputCode || '').trim().toUpperCase();
  if (!key) return { valid: false, error: 'Please enter a promo code.' };

  const match = Object.keys(PROMO_CODES).find(k => k.toUpperCase() === key);
  if (!match) return { valid: false, error: 'Invalid promo code.' };

  const promo = PROMO_CODES[match];
  if (subtotal < promo.minOrder) {
    return { valid: false, error: `This code requires a minimum order of $${promo.minOrder.toFixed(2)}.` };
  }

  // Per-device usage limit
  if (promo.maxUses) {
    try {
      const uses = JSON.parse(localStorage.getItem('mhs_promo_uses') || '{}');
      if ((uses[match] || 0) >= promo.maxUses) {
        return { valid: false, error: 'This promo code has reached its limit on this device.' };
      }
    } catch(e) {}
  }

  return { valid: true, code: match, ...promo };
}

// Calculate discount $ amount from a validated promo object
function promoDiscountAmount(promo, subtotal, deliveryFee) {
  if (!promo || !promo.valid) return 0;
  if (promo.type === 'percent') {
    const raw = parseFloat((subtotal * promo.discount).toFixed(2));
    return promo.maxDiscount ? Math.min(raw, promo.maxDiscount) : raw;
  }
  if (promo.type === 'flat')        return Math.min(promo.discount, subtotal);
  if (promo.type === 'freeDelivery') return (deliveryFee !== undefined ? deliveryFee : 0);
  return 0;
}
