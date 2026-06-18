// ============================================================
//  MY HALAL STORE — MASTER CONFIGURATION
//  This is the ONLY file you need to edit to:
//  - Change prices
//  - Add/remove products
//  - Change product names, descriptions, tags
//  - Mark products as favorites (homepage carousel)
//  - Hide products without deleting (available: false)
//  - Add product images (paste URL into "image" field)
// ============================================================

// HOW TO ADD A PRODUCT IMAGE:
// 1. Take a photo of the product
// 2. Upload to https://imgbb.com (free, no account needed)
// 3. Copy the "Direct link" URL
// 4. Paste it into the "image" field below
// 5. Save this file, push to GitHub — done
// If no image, leave image: null and the emoji will show instead.

const PRODUCTS = [

  // ── BEEF ──────────────────────────────────────────────────
  {
    id: "nihari-boneless",
    name: "Nihari Cut — Without Bone",
    description: "Classic boneless nihari cut. Perfect for slow-cooked curries and stews.",
    category: "beef",
    categoryLabel: "Beef",
    emoji: "🥩",
    image: null,                    // ← paste image URL here
    tag: "Top Seller",              // ← options: "Top Seller", "Best Value", "Popular", null
    pricePerLb: 7.00,               // ← EDIT PRICE HERE
    cutType: "boneless",            // ← "boneless", "bone-in", "mince"
    piecesPerLb: "3-4 pieces/lb",   // ← shown on product card
    favorite: true,                 // ← true = shows on homepage carousel
    available: true,                // ← false = hidden from shop (not deleted)
  },
  {
    id: "nihari-bone",
    name: "Nihari Cut — With Bone (Beef Shank)",
    description: "Bone-in beef shank. Rich marrow for traditional nihari.",
    category: "beef",
    categoryLabel: "Beef",
    emoji: "🍖",
    image: null,
    tag: null,
    pricePerLb: 7.00,
    cutType: "bone-in",
    piecesPerLb: "2-3 pieces/lb",
    favorite: false,
    available: true,
  },
  {
    id: "beef-cubes",
    name: "Beef Cubes",
    description: "Tender boneless cubes. Ideal for karahi, handi, and kebabs.",
    category: "beef",
    categoryLabel: "Beef",
    emoji: "🥩",
    image: null,
    tag: null,
    pricePerLb: 7.00,
    cutType: "boneless",
    piecesPerLb: "3-4 pieces/lb",
    favorite: false,
    available: true,
  },
  {
    id: "beef-mince",
    name: "Beef Mince (85% Lean)",
    description: "85% lean ground beef. Perfect for keema, burgers, and kofta.",
    category: "beef",
    categoryLabel: "Beef",
    emoji: "🫙",
    image: null,
    tag: null,                      // ← removed "85% Lean" tag — now shown as chip instead
    pricePerLb: 7.00,
    cutType: "mince",
    piecesPerLb: "4 servings/lb",
    favorite: false,
    available: true,
  },

  // ── CHICKEN ───────────────────────────────────────────────
  {
    id: "chicken-cutup",
    name: "Chicken Cutup Skinless",
    description: "Whole chicken cut into pieces, skin removed. Great for curries.",
    category: "chicken",
    categoryLabel: "Chicken",
    emoji: "🍗",
    image: null,
    tag: "Best Value",
    pricePerLb: 2.00,
    cutType: "mixed",
    piecesPerLb: "8-10 pieces/lb",
    favorite: true,
    available: true,
  },
  {
    id: "chicken-breast",
    name: "Chicken Breast Skinless",
    description: "Lean boneless breast. Perfect for grilling and baking.",
    category: "chicken",
    categoryLabel: "Chicken",
    emoji: "🍗",
    image: null,
    tag: null,
    pricePerLb: 2.00,
    cutType: "boneless",
    piecesPerLb: "2-3 pieces/lb",
    favorite: false,
    available: true,
  },
  {
    id: "chicken-drumstick",
    name: "Chicken Drumstick",
    description: "Juicy drumsticks. Ideal for roasting and BBQ.",
    category: "chicken",
    categoryLabel: "Chicken",
    emoji: "🍗",
    image: null,
    tag: null,
    pricePerLb: 2.00,
    cutType: "bone-in",
    piecesPerLb: "4-5 pieces/lb",
    favorite: false,
    available: true,
  },

  // ── GOAT ──────────────────────────────────────────────────
  {
    id: "goat-cutup",
    name: "Goat Cutup Mix",
    description: "Mixed bone-in goat pieces. Perfect for biryani and slow curries.",
    category: "goat",
    categoryLabel: "Goat",
    emoji: "🐐",
    image: null,
    tag: "Popular",
    pricePerLb: 13.00,
    cutType: "bone-in",
    piecesPerLb: "4-5 pieces/lb",
    favorite: true,
    available: true,
  },

  // ── LAMB ──────────────────────────────────────────────────
  {
    id: "lamb-mix",
    name: "Lamb Mix",
    description: "Mixed lamb cuts, bone-in. Rich flavour for Eid dishes.",
    category: "lamb",
    categoryLabel: "Lamb",
    emoji: "🐑",
    image: null,
    tag: "Popular",
    pricePerLb: 13.00,
    cutType: "bone-in",
    piecesPerLb: "4-5 pieces/lb",
    favorite: true,
    available: true,
  },
  {
    id: "lamb-shank",
    name: "Lamb Shank",
    description: "Premium whole lamb shank. Slow-cook for best results.",
    category: "lamb",
    categoryLabel: "Lamb",
    emoji: "🍖",
    image: null,
    tag: null,
    pricePerLb: 13.00,
    cutType: "bone-in",
    piecesPerLb: "1 shank/lb",
    favorite: true,
    available: true,
  },
]

// ── DELIVERY RULES ────────────────────────────────────────
const DELIVERY = {
  fee: 8.99,            // ← flat delivery fee in $
  freeThreshold: 75,    // ← spend above this for free delivery
  minOrder: 35,         // ← minimum order in $
  cutoffHour: 17,       // ← 5 = 5PM cutoff for next-day
}

// ── STORE CONTACT ─────────────────────────────────────────
const STORE = {
  whatsapp: "10000000000",   // ← your WhatsApp number (no +, no spaces)
  phone: "(000) 000-0000",   // ← display phone number
  email: "info@myhalalstore.com",
}

// ── SERVICE ZIP CODES ─────────────────────────────────────
const SERVICE_ZIPS = [
  "77449","77450","77494","77084","77095","77082",
  "77083","77079","77077","77099","77407","77406",
  "77441","77423","77469","77471",
]

// ── CART HELPERS — DO NOT EDIT BELOW THIS LINE ────────────
const CART_KEY = "mhs_cart"
function getCart(){try{return JSON.parse(localStorage.getItem(CART_KEY)||"[]")}catch{return[]}}
function saveCart(items){localStorage.setItem(CART_KEY,JSON.stringify(items));window.dispatchEvent(new CustomEvent("mhs_cart",{detail:items}))}
function cartSubtotal(){return getCart().reduce((s,i)=>s+i.pricePerLb*i.lbs,0)}
function cartDelivery(){const s=cartSubtotal();return s>=DELIVERY.freeThreshold?0:s>0?DELIVERY.fee:0}
function cartTotal(){return cartSubtotal()+cartDelivery()}
function cartCount(){return getCart().length}
