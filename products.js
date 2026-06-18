// ── SINGLE SOURCE OF TRUTH ──
// Edit prices, names, or favorites here.
// This file is used by BOTH the backend (price validation) and frontend (display).

const PRODUCTS = [
  // ── BEEF ($7/lb) ──
  {
    id: "nihari-boneless",
    name: "Nihari Cut — Without Bone",
    description: "Classic boneless nihari cut. Perfect for slow-cooked curries and stews.",
    category: "beef",
    categoryLabel: "Beef",
    emoji: "🥩",
    tag: "Top Seller",
    pricePerLb: 7.00,
    cutType: "boneless",
    serves: "3–4 per lb",
    favorite: true,
    available: true,
  },
  {
    id: "nihari-bone",
    name: "Nihari Cut — With Bone (Beef Shank)",
    description: "Bone-in beef shank. Rich marrow, deep flavour for traditional nihari.",
    category: "beef",
    categoryLabel: "Beef",
    emoji: "🍖",
    tag: null,
    pricePerLb: 7.00,
    cutType: "bone-in",
    serves: "2–3 per lb",
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
    tag: null,
    pricePerLb: 40.00,
    cutType: "boneless",
    serves: "3–4 per lb",
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
    tag: "85% Lean",
    pricePerLb: 7.00,
    cutType: "mince",
    serves: "4 per lb",
    favorite: false,
    available: true,
  },

  // ── CHICKEN ($2/lb) ──
  {
    id: "chicken-cutup",
    name: "Chicken Cutup Skinless",
    description: "Whole chicken cut into pieces, skin removed. Great for curries and biryanis.",
    category: "chicken",
    categoryLabel: "Chicken",
    emoji: "🍗",
    tag: "Best Value",
    pricePerLb: 2.00,
    cutType: "mixed",
    serves: "4–5 per lb",
    favorite: true,
    available: true,
  },
  {
    id: "chicken-breast",
    name: "Chicken Breast Skinless",
    description: "Lean, boneless chicken breast. Perfect for grilling, baking, and salads.",
    category: "chicken",
    categoryLabel: "Chicken",
    emoji: "🍗",
    tag: null,
    pricePerLb: 2.00,
    cutType: "boneless",
    serves: "2–3 per lb",
    favorite: false,
    available: true,
  },
  {
    id: "chicken-drumstick",
    name: "Chicken Drumstick",
    description: "Juicy drumsticks. Ideal for roasting, BBQ, and air frying.",
    category: "chicken",
    categoryLabel: "Chicken",
    emoji: "🍗",
    tag: null,
    pricePerLb: 2.00,
    cutType: "bone-in",
    serves: "3–4 per lb",
    favorite: false,
    available: true,
  },

  // ── LAMB & GOAT ($13/lb) ──
  {
    id: "goat-cutup",
    name: "Goat Cutup Mix",
    description: "Mixed bone-in goat pieces. Perfect for biryani and slow curries.",
    category: "goat",
    categoryLabel: "Goat",
    emoji: "🐐",
    tag: "Popular",
    pricePerLb: 13.00,
    cutType: "bone-in",
    serves: "3–4 per lb",
    favorite: true,
    available: true,
  },
  {
    id: "lamb-mix",
    name: "Lamb Mix",
    description: "Mixed lamb cuts, bone-in. Rich flavour for Eid dishes and roasts.",
    category: "lamb",
    categoryLabel: "Lamb",
    emoji: "🐑",
    tag: "Popular",
    pricePerLb: 13.00,
    cutType: "bone-in",
    serves: "3–4 per lb",
    favorite: true,
    available: true,
  },
  {
    id: "lamb-shank",
    name: "Lamb Shank",
    description: "Premium whole lamb shank. Slow-cook for a melt-off-the-bone result.",
    category: "lamb",
    categoryLabel: "Lamb",
    emoji: "🍖",
    tag: null,
    pricePerLb: 13.00,
    cutType: "bone-in",
    serves: "2 per piece",
    favorite: true,
    available: true,
  },
]

// ── DELIVERY CONFIG ──
// Edit these to change delivery rules
const DELIVERY = {
  fee: 8.99,           // flat delivery fee
  freeThreshold: 75,   // order total above this = free delivery
  minOrder: 35,        // minimum order amount
  cutoffHour: 17,      // 5PM — order by this for next-day
  deliveryDays: [2, 3, 4, 5, 6, 0], // Tue–Sun (0=Sun, 1=Mon excluded)
  serviceZips: [
    "77449","77450","77494","77084","77095","77082",
    "77083","77079","77077","77099","77407","77406",
    "77441","77423","77469","77471",
  ],
}

// ── STORE CONFIG ──
const STORE = {
  name: "My Halal Store",
  email: "info@myhalalstore.com",
  phone: "(000) 000-0000",
  whatsapp: "10000000000",
  address: "Katy, TX",
  website: "https://myhalalstore.com",
}

module.exports = { PRODUCTS, DELIVERY, STORE }
