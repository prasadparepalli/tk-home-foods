import { useState, useEffect, useCallback, createContext, useContext, useRef } from "react";

// ─── CONFIG ─────────────────────────────────────────────────────────────────
const CONFIG = {
  WHATSAPP_NUMBER: "919581344345", // Change this to actual number
  BRAND_NAME: "TK Home Foods",
  TAGLINE: "Authentic Telangana & Andhra Flavours, Made Like Home.",
  LOCATION: "Matrusri Nagar, Miyapur, Hyderabad",
  PHONE: "+91 9581 344 345",
  EMAIL: "tkhomefoods@gmail.com",
  BUSINESS_HOURS: "Mon–Sun: 6:00 AM – 9:00 PM",
  DELIVERY_AREAS: [
    "Matrusri Nagar", "Mokila", "Kokapet", "MLA Quarters",
    "HayathNagar", "Bachupally", "Hafeezpet", "Madhapur", "Gajularamaram"
  ],
};

// ─── DATA ────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  {
    id: "tiffins", slug: "tiffins", name: "Tiffins",
    icon: "🍱", emoji: "🍱",
    description: "Freshly prepared South Indian breakfast and traditional tiffins.",
    color: "#e8520a",
    items: ["Idli", "Ghee Karam Idli", "Plain Dosa", "Masala Dosa", "Pesarattu", "Upma", "Pongal", "Poori", "Vada"]
  },
  {
    id: "meals", slug: "meals-rice", name: "Rice",
    icon: "🍚", emoji: "🍚",
    description: "Wholesome Telangana & Andhra meals prepared fresh daily.",
    color: "#c4a020",
    items: ["Andhra Veg Meals", "Telangana Veg Meals", "Pulihora", "Lemon Rice", "Tomato Rice", "Curd Rice", "Veg Biryani", "Special Rice Items"]
  },
  {
    id: "hot-items", slug: "hot-items", name: "Hot Items & Snacks",
    icon: "🔥", emoji: "🌶️",
    description: "Crispy, spicy and delicious hot snacks made fresh.",
    color: "#b91c1c",
    items: ["Mirchi Bajji", "Punugulu", "Pakodi", "Onion Pakora", "Bonda", "Samosa", "Garelu", "Evening Snacks"]
  },
  {
    id: "sweets", slug: "sweets", name: "Traditional Sweets",
    icon: "🍬", emoji: "🍮",
    description: "Traditional handmade sweets with authentic flavours.",
    color: "#9333ea",
    items: ["Boondi Laddu", "Mysore Pak", "Ariselu", "Sunnundalu", "Gulab Jamun", "Badusha", "Seasonal Specials"]
  }
];

const MENU_ITEMS = [
  // Tiffins
  { id: 1, category: "tiffins", name: "Ghee Karam Idli", desc1: "Soft steamed idlis tossed in ghee and karam podi — a classic Andhra morning treat.", price: 60, veg: true, featured: true, special: false, rating: 4.8, img: "idli" },
  { id: 2, category: "tiffins", name: "Masala Dosa", desc1: "Crispy golden dosa filled with spiced potato masala, served with chutney and sambar.", price: 70, veg: true, featured: true, special: false, rating: 4.7, img: "dosa" },
  { id: 3, category: "tiffins", name: "Special Pesarattu", desc1: "Crispy green moong dal crepes — a signature Andhra breakfast, served with ginger chutney.", price: 80, veg: true, featured: false, special: true, rating: 4.9, img: "pesarattu" },
  { id: 4, category: "tiffins", name: "Upma", desc1: "Fluffy semolina upma tempered with mustard, curry leaves and fresh vegetables.", price: 50, veg: true, featured: false, special: false, rating: 4.5, img: "upma" },
  { id: 5, category: "tiffins", name: "Pongal", desc1: "Comforting rice and lentil khichdi with ghee, pepper and cashews.", price: 60, veg: true, featured: false, special: false, rating: 4.6, img: "pongal" },
  { id: 6, category: "tiffins", name: "Poori Masala", desc1: "Soft fluffy pooris served with tangy potato curry — a weekend favourite.", price: 70, veg: true, featured: true, special: false, rating: 4.7, img: "poori" },
  { id: 7, category: "tiffins", name: "Medu Vada", desc1: "Crispy fried lentil doughnuts served hot with coconut chutney and sambar.", price: 60, veg: true, featured: false, special: false, rating: 4.6, img: "vada" },
  { id: 8, category: "tiffins", name: "Plain Dosa", desc1: "Light, thin and crispy rice crepe served with fresh chutney and sambar.", price: 55, veg: true, featured: false, special: false, rating: 4.5, img: "dosa" },

  // Meals
  { id: 9, category: "meals", name: "Andhra Veg Meals", desc1: "Full Andhra thali with rice, sambar, rasam, 3 curries, pappad and pickle.", price: 130, veg: true, featured: true, special: true, rating: 4.9, img: "meals" },
  { id: 10, category: "meals", name: "Telangana Veg Meals", desc1: "Traditional Telangana thali with jonna, rice, dal, 2 curries, chutney and pickle.", price: 120, veg: true, featured: false, special: false, rating: 4.8, img: "meals" },
  { id: 11, category: "meals", name: "Pulihora", desc1: "Tangy tamarind rice with peanuts and curry leaves — a festival favourite.", price: 80, veg: true, featured: true, special: false, rating: 4.7, img: "rice" },
  { id: 12, category: "meals", name: "Veg Biryani", desc1: "Aromatic basmati biryani loaded with vegetables and fresh mint.", price: 150, veg: true, featured: true, special: true, rating: 4.8, img: "biryani" },
  { id: 13, category: "meals", name: "Curd Rice", desc1: "Cooling and comforting curd rice with pomegranate, curry leaves and mustard.", price: 70, veg: true, featured: false, special: false, rating: 4.6, img: "rice" },
  { id: 14, category: "meals", name: "Lemon Rice", desc1: "Tangy, light lemon rice with peanuts and aromatic seasoning.", price: 75, veg: true, featured: false, special: false, rating: 4.5, img: "rice" },

  // Hot Items
  { id: 15, category: "hot-items", name: "Mirchi Bajji", desc1: "Long green chillies dipped in spiced besan batter, deep fried till golden.", price: 60, veg: true, featured: true, special: true, rating: 4.9, img: "bajji" },
  { id: 16, category: "hot-items", name: "Punugulu", desc1: "Crispy fermented batter bites — Andhra's favourite tea-time snack.", price: 50, veg: true, featured: true, special: false, rating: 4.8, img: "punugulu" },
  { id: 17, category: "hot-items", name: "Onion Pakora", desc1: "Crispy fried onion fritters made with gram flour and green chillies.", price: 55, veg: true, featured: false, special: false, rating: 4.6, img: "pakora" },
  { id: 18, category: "hot-items", name: "Garelu", desc1: "Traditional urad dal vadas, crispy outside and soft inside.", price: 60, veg: true, featured: false, special: false, rating: 4.7, img: "vada" },
  { id: 19, category: "hot-items", name: "Samosa", desc1: "Flaky pastry filled with spiced potato and peas, served with mint chutney.", price: 20, veg: true, featured: true, special: false, rating: 4.5, img: "samosa" },

  // Sweets
  { id: 20, category: "sweets", name: "Boondi Laddu", desc1: "Soft round sweets made from chickpea flour pearls, ghee and cardamom.", price: 30, veg: true, featured: true, special: false, rating: 4.9, img: "laddu" },
  { id: 21, category: "sweets", name: "Mysore Pak", desc1: "Melt-in-the-mouth ghee and gram flour sweet — a South Indian classic.", price: 40, veg: true, featured: true, special: true, rating: 4.8, img: "mysorepa" },
  { id: 22, category: "sweets", name: "Ariselu", desc1: "Traditional Andhra sweet made from rice flour and jaggery — a festival delight.", price: 35, veg: true, featured: false, special: false, rating: 4.7, img: "ariselu" },
  { id: 23, category: "sweets", name: "Sunnundalu", desc1: "Urad dal laddus with ghee and sugar — nutritious and delicious.", price: 35, veg: true, featured: false, special: false, rating: 4.6, img: "laddu" },
  { id: 24, category: "sweets", name: "Gulab Jamun", desc1: "Soft khoya dumplings soaked in rose-scented sugar syrup.", price: 25, veg: true, featured: true, special: true, rating: 4.9, img: "gulabjamun" },
];

const TODAYS_SPECIALS = MENU_ITEMS.filter(i => i.special);

const TESTIMONIALS = [
  { id: 1, name: "Priya Reddy", location: "Miyapur", rating: 5, text: "The Andhra Veg Meals taste exactly like homemade food! The sambar is rich and the curries are perfectly spiced. My family loves it every day.", avatar: "P" },
  { id: 2, name: "Suresh Kumar", location: "KPHB Colony", rating: 5, text: "Pesarattu and Punugulu are my go-to order. Crispy, fresh and so authentic. Reminds me of my hometown in Andhra. Great work, TK Home Foods!", avatar: "S" },
  { id: 3, name: "Lakshmi Devi", location: "Chandanagar", rating: 5, text: "Ordered Boondi Laddu and Mysore Pak for Diwali. The quality was exceptional. Fresh, tasty and packed nicely. Will order again for every occasion!", avatar: "L" },
  { id: 4, name: "Ravi Teja", location: "Hafeezpet", rating: 4, text: "The Mirchi Bajji and Punugulu in the evenings are absolutely amazing. Best hot snacks in the Miyapur area. Delivery is also quick and reliable.", avatar: "R" },
  { id: 5, name: "Anitha Rao", location: "Nizampet", rating: 5, text: "I get the weekly meal plan every week. The food is fresh, hygienic and tastes authentic. Love that they use traditional recipes. Highly recommended!", avatar: "A" },
];

// ─── CART CONTEXT ─────────────────────────────────────────────────────────────
const CartContext = createContext(null);

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = useCallback((item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...item, qty: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart(prev => prev.filter(i => i.id !== id));
  }, []);

  const updateQty = useCallback((id, delta) => {
    setCart(prev => {
      const updated = prev.map(i => i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i);
      return updated.filter(i => i.qty > 0);
    });
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const count = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, total, count, isCartOpen, setIsCartOpen }}>
      {children}
    </CartContext.Provider>
  );
}

const useCart = () => useContext(CartContext);

// ─── PAGE CONTEXT ─────────────────────────────────────────────────────────────
const PageContext = createContext(null);

// ─── FOOD IMAGE COMPONENT ─────────────────────────────────────────────────────
function FoodImage({ type, alt, className = "" }) {
  const FOOD_SVGS = {
    idli: { bg: "#fff5e6", items: [
      <ellipse key="1" cx="50" cy="52" rx="28" ry="14" fill="#f0e0c8" />,
      <ellipse key="2" cx="50" cy="48" rx="26" ry="18" fill="#fff8f0" />,
      <ellipse key="3" cx="50" cy="47" rx="22" ry="14" fill="#fafafa" />,
      <circle key="4" cx="50" cy="47" r="8" fill="#f5f0e8" />,
    ]},
    dosa: { bg: "#fff3e0", items: [
      <ellipse key="1" cx="50" cy="55" rx="38" ry="12" fill="#d4861a" opacity="0.3"/>,
      <ellipse key="2" cx="48" cy="50" rx="36" ry="18" fill="#c8781a" />,
      <ellipse key="3" cx="48" cy="48" rx="34" ry="16" fill="#d4891f" />,
      <path key="4" d="M 20 45 Q 50 30 80 45" stroke="#b8690f" strokeWidth="2" fill="none"/>,
    ]},
    pesarattu: { bg: "#f0f9e8", items: [
      <ellipse key="1" cx="50" cy="54" rx="36" ry="11" fill="#4a7c20" opacity="0.3"/>,
      <ellipse key="2" cx="50" cy="50" rx="35" ry="16" fill="#5a8f2a" />,
      <ellipse key="3" cx="50" cy="48" rx="33" ry="14" fill="#6ba032" />,
      <circle key="4" cx="35" cy="46" r="4" fill="#4a7020" />,
      <circle key="5" cx="50" cy="44" r="4" fill="#4a7020" />,
      <circle key="6" cx="65" cy="46" r="4" fill="#4a7020" />,
    ]},
    upma: { bg: "#faf5e4", items: [
      <circle key="1" cx="50" cy="52" r="32" fill="#e8d5a0" />,
      <circle key="2" cx="50" cy="50" r="28" fill="#f0e0a8" />,
      <circle key="3" cx="40" cy="44" r="3" fill="#2d5016" />,
      <circle key="4" cx="55" cy="48" r="3" fill="#2d5016" />,
      <circle key="5" cx="45" cy="54" r="3" fill="#2d5016" />,
      <circle key="6" cx="58" cy="42" r="2" fill="#8B4513" />,
    ]},
    pongal: { bg: "#fffbf0", items: [
      <circle key="1" cx="50" cy="52" r="30" fill="#e8d890" />,
      <circle key="2" cx="50" cy="50" r="27" fill="#f5e8a0" />,
      <circle key="3" cx="42" cy="44" r="4" fill="#c8a020" />,
      <circle key="4" cx="56" cy="46" r="4" fill="#c8a020" />,
      <circle key="5" cx="48" cy="56" r="4" fill="#c8a020" />,
      <path key="6" d="M 38 54 Q 50 60 62 54" stroke="#8B6914" strokeWidth="1.5" fill="none"/>,
    ]},
    poori: { bg: "#fff8e8", items: [
      <circle key="1" cx="50" cy="52" r="28" fill="#c8780a" opacity="0.4"/>,
      <circle key="2" cx="50" cy="50" r="26" fill="#d48a18" />,
      <circle key="3" cx="50" cy="50" r="22" fill="#e0a030" />,
      <ellipse key="4" cx="45" cy="47" rx="8" ry="5" fill="#d49020" opacity="0.6"/>,
    ]},
    vada: { bg: "#fff5e0", items: [
      <circle key="1" cx="50" cy="52" r="26" fill="#8B4513" opacity="0.3"/>,
      <circle key="2" cx="50" cy="50" r="25" fill="#a0540e" />,
      <circle key="3" cx="50" cy="50" r="20" fill="#b8620f" />,
      <circle key="4" cx="50" cy="50" r="8" fill="#8B4513" />,
      <circle key="5" cx="50" cy="50" r="6" fill="#fff5e0" />,
    ]},
    meals: { bg: "#f5f0e8", items: [
      <circle key="1" cx="50" cy="50" r="35" fill="#e8d5a0" />,
      <circle key="2" cx="32" cy="45" r="12" fill="#c8781a" />,
      <circle key="3" cx="68" cy="45" r="12" fill="#5a8f2a" />,
      <circle key="4" cx="50" cy="65" r="10" fill="#f0e0a8" />,
      <circle key="5" cx="32" cy="45" r="8" fill="#d4891f" />,
      <circle key="6" cx="68" cy="45" r="8" fill="#6ba032" />,
    ]},
    rice: { bg: "#fffff0", items: [
      <circle key="1" cx="50" cy="52" r="30" fill="#f8f0d0" />,
      <circle key="2" cx="50" cy="50" r="27" fill="#faf8e8" />,
      <rect key="3" x="38" y="42" width="4" height="2" rx="1" fill="#e8d080" />,
      <rect key="4" x="46" y="46" width="4" height="2" rx="1" fill="#e8d080" />,
      <rect key="5" x="54" y="42" width="4" height="2" rx="1" fill="#e8d080" />,
      <rect key="6" x="42" y="50" width="4" height="2" rx="1" fill="#e8d080" />,
      <rect key="7" x="58" y="48" width="4" height="2" rx="1" fill="#e8d080" />,
    ]},
    biryani: { bg: "#fff8e0", items: [
      <circle key="1" cx="50" cy="52" r="30" fill="#c8900a" opacity="0.3"/>,
      <circle key="2" cx="50" cy="50" r="28" fill="#d4a020" />,
      <circle key="3" cx="50" cy="50" r="24" fill="#e8b430" />,
      <circle key="4" cx="40" cy="44" r="3" fill="#8B4513" />,
      <circle key="5" cx="58" cy="46" r="3" fill="#2d5016" />,
      <circle key="6" cx="48" cy="56" r="3" fill="#e8d080" />,
      <path key="7" d="M 30 54 Q 50 62 70 54" stroke="#a07010" strokeWidth="1.5" fill="none"/>,
    ]},
    bajji: { bg: "#fff0e0", items: [
      <rect key="1" x="30" y="25" width="18" height="50" rx="9" fill="#2d5016" />,
      <rect key="2" x="28" y="23" width="22" height="54" rx="11" fill="#8B4513" opacity="0.3"/>,
      <rect key="3" x="29" y="24" width="20" height="52" rx="10" fill="#a0540e" />,
      <rect key="4" x="30" y="25" width="18" height="50" rx="9" fill="#b8620f" />,
      <rect key="5" x="52" y="30" width="16" height="42" rx="8" fill="#8B4513" opacity="0.3"/>,
      <rect key="6" x="53" y="31" width="14" height="40" rx="7" fill="#c07015" />,
    ]},
    punugulu: { bg: "#fff5e8", items: [
      <circle key="1" cx="35" cy="42" r="14" fill="#8B4513" />,
      <circle key="2" cx="35" cy="42" r="11" fill="#a05615" />,
      <circle key="3" cx="60" cy="48" r="13" fill="#8B4513" />,
      <circle key="4" cx="60" cy="48" r="10" fill="#a05615" />,
      <circle key="5" cx="47" cy="62" r="12" fill="#8B4513" />,
      <circle key="6" cx="47" cy="62" r="9" fill="#a05615" />,
    ]},
    pakora: { bg: "#fff3e0", items: [
      <ellipse key="1" cx="50" cy="52" rx="28" ry="20" fill="#8B4513" />,
      <ellipse key="2" cx="50" cy="50" rx="26" ry="18" fill="#a05615" />,
      <path key="3" d="M 30 45 Q 50 35 70 45 Q 68 55 50 60 Q 32 55 30 45" fill="#b86515" />,
      <line key="4" x1="38" y1="42" x2="42" y2="58" stroke="#8B4513" strokeWidth="1.5"/>,
      <line key="5" x1="50" y1="38" x2="50" y2="58" stroke="#8B4513" strokeWidth="1.5"/>,
      <line key="6" x1="62" y1="42" x2="58" y2="58" stroke="#8B4513" strokeWidth="1.5"/>,
    ]},
    samosa: { bg: "#fef9e7", items: [
      <path key="1" d="M 50 20 L 75 70 L 25 70 Z" fill="#c8900a" />,
      <path key="2" d="M 50 22 L 73 69 L 27 69 Z" fill="#d4a015" />,
      <path key="3" d="M 50 25 L 70 68 L 30 68 Z" fill="#e0b020" />,
      <line key="4" x1="50" y1="25" x2="50" y2="65" stroke="#c8900a" strokeWidth="1.5" strokeDasharray="3,2"/>,
    ]},
    laddu: { bg: "#fff5e0", items: [
      <circle key="1" cx="50" cy="52" r="28" fill="#d4a020" opacity="0.4"/>,
      <circle key="2" cx="50" cy="50" r="26" fill="#e0b030" />,
      <circle key="3" cx="50" cy="50" r="22" fill="#f0c040" />,
      <circle key="4" cx="42" cy="45" r="3" fill="#c89010" />,
      <circle key="5" cx="56" cy="44" r="3" fill="#c89010" />,
      <circle key="6" cx="48" cy="56" r="3" fill="#c89010" />,
      <circle key="7" cx="60" cy="52" r="3" fill="#c89010" />,
    ]},
    mysorepa: { bg: "#fffbe6", items: [
      <rect key="1" x="22" y="35" width="56" height="36" rx="4" fill="#c8900a" />,
      <rect key="2" x="24" y="37" width="52" height="32" rx="3" fill="#d4a020" />,
      <rect key="3" x="26" y="39" width="48" height="28" rx="2" fill="#e8b830" />,
      <line key="4" x1="26" y1="50" x2="74" y2="50" stroke="#c8900a" strokeWidth="1.5"/>,
      <line key="5" x1="50" y1="39" x2="50" y2="67" stroke="#c8900a" strokeWidth="1.5"/>,
    ]},
    ariselu: { bg: "#fff8f0", items: [
      <circle key="1" cx="50" cy="52" r="26" fill="#8B4513" opacity="0.3"/>,
      <circle key="2" cx="50" cy="50" r="25" fill="#a05615" />,
      <circle key="3" cx="50" cy="50" r="21" fill="#b86515" />,
      <circle key="4" cx="40" cy="46" r="3" fill="#8B4513" />,
      <circle key="5" cx="58" cy="46" r="3" fill="#8B4513" />,
      <circle key="6" cx="50" cy="58" r="3" fill="#8B4513" />,
    ]},
    gulabjamun: { bg: "#fff0f5", items: [
      <circle key="1" cx="40" cy="50" r="18" fill="#8B2252" opacity="0.3"/>,
      <circle key="2" cx="40" cy="50" r="16" fill="#a02060" />,
      <circle key="3" cx="40" cy="50" r="14" fill="#b83070" />,
      <circle key="4" cx="62" cy="52" r="15" fill="#a02060" />,
      <circle key="5" cx="62" cy="52" r="13" fill="#b83070" />,
      <ellipse key="6" cx="50" cy="68" rx="28" ry="6" fill="#d4508a" opacity="0.5"/>,
    ]},
    default: { bg: "#f5f0e8", items: [
      <circle key="1" cx="50" cy="50" r="30" fill="#e8d0a0" />,
      <text key="2" x="50" y="55" textAnchor="middle" fontSize="24">🍽️</text>
    ]}
  };

  const food = FOOD_SVGS[type] || FOOD_SVGS.default;

  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={className}
      style={{ background: food.bg, borderRadius: "inherit" }} role="img" aria-label={alt}>
      {food.items}
    </svg>
  );
}

// ─── STAR RATING ──────────────────────────────────────────────────────────────
function Stars({ rating }) {
  return (
    <span className="stars" aria-label={`${rating} out of 5 stars`}>
      {[1,2,3,4,5].map(n => (
        <span key={n} style={{ color: n <= Math.floor(rating) ? "#f59e0b" : n - 0.5 <= rating ? "#f59e0b" : "#d1d5db", fontSize: "12px" }}>★</span>
      ))}
      <span style={{ fontSize: "11px", color: "#6b7280", marginLeft: "3px" }}>{rating}</span>
    </span>
  );
}

// ─── FOOD CARD ─────────────────────────────────────────────────────────────────
function FoodCard({ item, compact = false }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handle = () => {
    addToCart(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="food-card" style={{ borderRadius: "16px", overflow: "hidden", background: "#fff",
      boxShadow: "0 2px 12px rgba(0,0,0,0.08)", transition: "transform 0.2s, box-shadow 0.2s",
      display: "flex", flexDirection: "column" }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.14)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.08)"; }}>
      <div style={{ height: compact ? "140px" : "170px", flexShrink: 0, position: "relative" }}>
        <FoodImage type={item.img} alt={item.name} className="w-full h-full" style={{ width: "100%", height: "100%", display: "block" }} />
        <span style={{ position: "absolute", top: "10px", left: "10px", background: item.veg ? "#16a34a" : "#dc2626",
          color: "#fff", borderRadius: "4px", fontSize: "10px", padding: "2px 6px", fontWeight: 700 }}>
          {item.veg ? "VEG" : "NON-VEG"}
        </span>
      </div>
      <div style={{ padding: "14px 16px 16px", flex: 1, display: "flex", flexDirection: "column" }}>
        <h3 style={{ margin: "0 0 4px", fontSize: compact ? "14px" : "15px", fontWeight: 700, color: "#1c1917" }}>{item.name}</h3>
        {!compact && <p style={{ margin: "0 0 8px", fontSize: "12px", color: "#6b7280", lineHeight: 1.5, flex: 1 }}>{item.desc}</p>}
        <Stars rating={item.rating} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "10px" }}>
          <span style={{ fontSize: "18px", fontWeight: 800, color: "#c0390a" }}>₹{item.price}</span>
          <button onClick={handle} style={{
            background: added ? "#16a34a" : "#c0390a", color: "#fff",
            border: "none", borderRadius: "8px", padding: "7px 14px", fontSize: "12px",
            fontWeight: 700, cursor: "pointer", transition: "background 0.2s"
          }}>
            {added ? "✓ Added" : "+ Add"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── NAVIGATION ───────────────────────────────────────────────────────────────
function Nav({ currentPage, setPage }) {
  const { count, setIsCartOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { key: "home", label: "Home" },
    { key: "tiffins", label: "Tiffins" },
    { key: "meals", label: "Rice" },
    { key: "hot-items", label: "Hot Items" },
    { key: "sweets", label: "Sweets" },
    { key: "specials", label: "Today's Specials" },
    { key: "about", label: "About Us" },
    { key: "contact", label: "Contact" },
  ];

  const go = (key) => { setPage(key); setMenuOpen(false); window.scrollTo(0,0); };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? "rgba(255,255,255,0.97)" : "#fff",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.12)" : "0 1px 4px rgba(0,0,0,0.06)",
        backdropFilter: "blur(8px)", transition: "box-shadow 0.3s"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>
          {/* Logo */}
          <button onClick={() => go("home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", padding: 0 }}>
            <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "linear-gradient(135deg,#c0390a,#e8520a)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "20px" }}>🍱</span>
            </div>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: "16px", fontWeight: 800, color: "#1c1917", lineHeight: 1.1 }}>TK Home Foods</div>
              <div style={{ fontSize: "10px", color: "#c0390a", fontWeight: 600, letterSpacing: "0.02em" }}>Miyapur, Hyderabad</div>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            {navLinks.map(l => (
              <button key={l.key} onClick={() => go(l.key)} style={{
                background: "none", border: "none", padding: "6px 10px", cursor: "pointer",
                fontSize: "13px", fontWeight: currentPage === l.key ? 700 : 500,
                color: currentPage === l.key ? "#c0390a" : "#374151",
                borderRadius: "6px",
                transition: "color 0.15s, background 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#fef2f2"}
              onMouseLeave={e => e.currentTarget.style.background = "none"}>
                {l.label}
              </button>
            ))}
          </div>

          {/* Right */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button onClick={() => setIsCartOpen(true)} style={{ background: "none", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "8px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", position: "relative" }}>
              <span style={{ fontSize: "16px" }}>🛒</span>
              {count > 0 && <span style={{ background: "#c0390a", color: "#fff", borderRadius: "50%", width: "18px", height: "18px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 700, position: "absolute", top: "-6px", right: "-6px" }}>{count}</span>}
            </button>
            <button onClick={() => go("checkout")} className="desktop-nav" style={{ background: "#c0390a", color: "#fff", border: "none", borderRadius: "8px", padding: "9px 18px", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}>
              Order Now
            </button>
            {/* Mobile hamburger */}
            <button className="mobile-only" onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "22px", padding: "4px" }}>
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ background: "#fff", borderTop: "1px solid #f3f4f6", padding: "12px 20px 20px" }}>
            {navLinks.map(l => (
              <button key={l.key} onClick={() => go(l.key)} style={{
                display: "block", width: "100%", textAlign: "left", padding: "12px 0",
                background: "none", border: "none", borderBottom: "1px solid #f3f4f6",
                fontSize: "15px", fontWeight: currentPage === l.key ? 700 : 500,
                color: currentPage === l.key ? "#c0390a" : "#374151", cursor: "pointer"
              }}>
                {l.label}
              </button>
            ))}
            <button onClick={() => { go("checkout"); setMenuOpen(false); }} style={{ marginTop: "12px", width: "100%", background: "#c0390a", color: "#fff", border: "none", borderRadius: "8px", padding: "13px", fontSize: "15px", fontWeight: 700, cursor: "pointer" }}>
              Order Now
            </button>
          </div>
        )}
      </nav>

      {/* Mobile bottom nav */}
      <div className="mobile-only" style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 999, background: "#fff", borderTop: "1px solid #e5e7eb", display: "flex", boxShadow: "0 -4px 16px rgba(0,0,0,0.08)" }}>
        {[
          { key: "home", icon: "🏠", label: "Home" },
          { key: "tiffins", icon: "🍱", label: "Menu" },
          { key: "specials", icon: "⭐", label: "Specials" },
          { key: "cart-mobile", icon: "🛒", label: `Cart${count > 0 ? ` (${count})` : ""}` },
          { key: "contact", icon: "📞", label: "Contact" },
        ].map(b => (
          <button key={b.key} onClick={() => b.key === "cart-mobile" ? setIsCartOpen(true) : go(b.key)}
            style={{ flex: 1, background: "none", border: "none", padding: "10px 4px 12px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
            <span style={{ fontSize: "18px" }}>{b.icon}</span>
            <span style={{ fontSize: "10px", color: "#6b7280" }}>{b.label}</span>
          </button>
        ))}
      </div>
    </>
  );
}

// ─── CART DRAWER ──────────────────────────────────────────────────────────────
function CartDrawer({ setPage }) {
  const { cart, removeFromCart, updateQty, total, count, isCartOpen, setIsCartOpen } = useCart();

  if (!isCartOpen) return null;

  const delivery = total > 0 ? 30 : 0;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 2000 }}>
      <div onClick={() => setIsCartOpen(false)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)" }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "min(400px, 100vw)", background: "#fff", display: "flex", flexDirection: "column", boxShadow: "-4px 0 24px rgba(0,0,0,0.15)" }}>
        <div style={{ padding: "20px", borderBottom: "1px solid #f3f4f6", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h2 style={{ margin: 0, fontSize: "18px", fontWeight: 700 }}>Your Cart {count > 0 && <span style={{ color: "#c0390a" }}>({count})</span>}</h2>
          <button onClick={() => setIsCartOpen(false)} style={{ background: "none", border: "none", fontSize: "22px", cursor: "pointer", color: "#6b7280" }}>✕</button>
        </div>

        {cart.length === 0 ? (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px", color: "#9ca3af" }}>
            <span style={{ fontSize: "48px" }}>🛒</span>
            <p style={{ margin: 0, fontWeight: 500 }}>Your cart is empty</p>
            <button onClick={() => { setIsCartOpen(false); }} style={{ background: "#c0390a", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 24px", fontWeight: 700, cursor: "pointer" }}>
              Browse Menu
            </button>
          </div>
        ) : (
          <>
            <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px" }}>
              {cart.map(item => (
                <div key={item.id} style={{ display: "flex", gap: "12px", padding: "12px 0", borderBottom: "1px solid #f3f4f6", alignItems: "center" }}>
                  <div style={{ width: "56px", height: "56px", borderRadius: "10px", overflow: "hidden", flexShrink: 0 }}>
                    <FoodImage type={item.img} alt={item.name} style={{ width: "100%", height: "100%" }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: "14px", color: "#1c1917" }}>{item.name}</div>
                    <div style={{ fontSize: "13px", color: "#c0390a", fontWeight: 700 }}>₹{item.price}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <button onClick={() => updateQty(item.id, -1)} style={{ width: "26px", height: "26px", borderRadius: "50%", border: "1px solid #e5e7eb", background: "#fff", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                    <span style={{ minWidth: "20px", textAlign: "center", fontWeight: 600 }}>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)} style={{ width: "26px", height: "26px", borderRadius: "50%", border: "1px solid #e5e7eb", background: "#fff", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                    <button onClick={() => removeFromCart(item.id)} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: "16px", padding: "2px" }}>🗑</button>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ padding: "16px 20px", borderTop: "1px solid #f3f4f6" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "14px", color: "#6b7280" }}>
                <span>Subtotal</span><span>₹{total}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontSize: "14px", color: "#6b7280" }}>
                <span>Delivery</span><span>₹{delivery}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", fontWeight: 700, fontSize: "16px" }}>
                <span>Total</span><span style={{ color: "#c0390a" }}>₹{total + delivery}</span>
              </div>
              <button onClick={() => { setIsCartOpen(false); setPage("checkout"); window.scrollTo(0,0); }} style={{ width: "100%", background: "#c0390a", color: "#fff", border: "none", borderRadius: "10px", padding: "14px", fontSize: "15px", fontWeight: 700, cursor: "pointer" }}>
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── HOME PAGE ─────────────────────────────────────────────────────────────────
function HomePage({ setPage }) {
  const { addToCart } = useCart();

  const whatsappOrder = () => {
    window.open(`https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=Hello! I'd like to place an order from TK Home Foods.`, "_blank");
  };

  const specials = TODAYS_SPECIALS.slice(0, 4);
  const featured = MENU_ITEMS.filter(i => i.featured).slice(0, 8);
  const today = new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });

  return (
    <main>
      {/* HERO */}
      <section style={{ background: "linear-gradient(135deg, #fef7ef 0%, #fff5e6 40%, #fef2f2 100%)", padding: "100px 20px 70px", minHeight: "85vh", display: "flex", alignItems: "center" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#fde8e0", borderRadius: "20px", padding: "6px 14px", marginBottom: "20px" }}>
              <span style={{ fontSize: "12px" }}>📍</span>
              <span style={{ fontSize: "13px", color: "#c0390a", fontWeight: 600 }}>Matrusri Nagar, Miyapur, Hyderabad1</span>
            </div>
            <h1 style={{ fontSize: "clamp(28px, 4.5vw, 50px)", fontWeight: 900, color: "#1c1917", lineHeight: 1.15, margin: "0 0 20px" }}>
              Authentic Telangana &amp; Andhra {" "}
              <span style={{ color: "#c0390a" }}>Home Made Food</span>
            </h1>
            <p style={{ fontSize: "17px", color: "#4b5563", lineHeight: 1.7, margin: "0 0 32px", maxWidth: "480px" }}>
              Freshly prepared tiffins, wholesome meals, hot snacks and traditional sweets — bringing the authentic taste of home to your table.
            </p>
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <button onClick={() => { setPage("tiffins"); window.scrollTo(0,0); }} style={{ background: "#c0390a", color: "#fff", border: "none", borderRadius: "10px", padding: "14px 28px", fontSize: "15px", fontWeight: 700, cursor: "pointer" }}>
                View Our Menu
              </button>
              <button onClick={whatsappOrder} style={{ background: "#fff", color: "#1c1917", border: "2px solid #e5e7eb", borderRadius: "10px", padding: "14px 28px", fontSize: "15px", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "18px" }}>💬</span> Order on WhatsApp
              </button>
            </div>
            <div style={{ marginTop: "32px", display: "flex", gap: "28px", flexWrap: "wrap" }}>
              {[["🕐", "Fresh Daily"], ["🟢", "Veg"],["🔴", "Non-Veg"], ["🚚", "Quick Delivery"], ["❤️", "Home Style"]].map(([icon, label]) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#6b7280", fontWeight: 500 }}>
                  <span>{icon}</span>{label}
                </div>
              ))}
            </div>
          </div>
          {/* Hero food art */}
          <div className="desktop-nav" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            {[
              { img: "masala_dosa", type: "dosa", label: "Masala Dosa" },
              { img: "andhra_meals", type: "meals", label: "Andhra Meals" },
              { img: "mirchi_bajji", type: "bajji", label: "Mirchi Bajji" },
              { img: "boondi_laddu", type: "laddu", label: "Boondi Laddu" },
            ].map((f, i) => (
              <div key={f.img} style={{ borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", transform: i % 2 === 1 ? "translateY(20px)" : "none" }}>
                <div style={{ height: "130px" }}>
                  <FoodImage type={f.type} alt={f.label} className="w-full h-full" style={{ width: "100%", height: "100%", display: "block" }} />
                </div>
                <div style={{ padding: "10px 12px", background: "#fff" }}>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#1c1917" }}>{f.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section style={{ padding: "70px 20px", background: "#fff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#c0390a", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>Explore Our Menu</div>
            <h2 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 900, color: "#1c1917", margin: 0 }}>What Would You Like Today?</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
            {CATEGORIES.map(cat => (
              <button key={cat.id} onClick={() => { setPage(cat.id); window.scrollTo(0,0); }} style={{
                background: "#fff", border: "2px solid #f3f4f6", borderRadius: "20px", padding: "28px 24px",
                cursor: "pointer", textAlign: "left", transition: "all 0.2s", boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = cat.color; e.currentTarget.style.boxShadow = `0 8px 24px ${cat.color}30`; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#f3f4f6"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)"; e.currentTarget.style.transform = ""; }}>
                <div style={{ fontSize: "40px", marginBottom: "16px" }}>{cat.icon}</div>
                <h3 style={{ margin: "0 0 8px", fontSize: "18px", fontWeight: 800, color: "#1c1917" }}>{cat.name}</h3>
                <p style={{ margin: "0 0 16px", fontSize: "13px", color: "#6b7280", lineHeight: 1.5 }}>{cat.description}</p>
                <div style={{ marginBottom: "16px" }}>
                  {cat.items.slice(0, 4).map(it => (
                    <span key={it} style={{ display: "inline-block", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "6px", padding: "3px 8px", fontSize: "11px", color: "#374151", margin: "2px" }}>{it}</span>
                  ))}
                </div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: cat.color }}>Explore {cat.name} →</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* TODAY'S SPECIALS */}
      <section style={{ padding: "70px 20px", background: "linear-gradient(135deg, #fff8f5, #fff)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "40px", flexWrap: "wrap", gap: "12px" }}>
            <div>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#c0390a", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "6px" }}>🔥 Today's Specials</div>
              <h2 style={{ fontSize: "clamp(22px, 3.5vw, 34px)", fontWeight: 900, color: "#1c1917", margin: 0 }}>Fresh Picks for {today}</h2>
            </div>
            <button onClick={() => { setPage("specials"); window.scrollTo(0,0); }} style={{ background: "none", border: "1px solid #c0390a", color: "#c0390a", borderRadius: "8px", padding: "9px 18px", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}>
              View All Specials →
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "20px" }}>
            {specials.map(item => <FoodCard key={item.id} item={item} />)}
          </div>
        </div>
      </section>

      {/* POPULAR / FAVORITES */}
      <section style={{ padding: "70px 20px", background: "#fff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#c0390a", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "6px" }}>⭐ Customer Favorites</div>
            <h2 style={{ fontSize: "clamp(22px, 3.5vw, 34px)", fontWeight: 900, color: "#1c1917", margin: 0 }}>Most Loved Dishes</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "18px" }}>
            {featured.map(item => <FoodCard key={item.id} item={item} />)}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section style={{ padding: "70px 20px", background: "#fef7ef" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2 style={{ fontSize: "clamp(22px, 3.5vw, 34px)", fontWeight: 900, color: "#1c1917", margin: "0 0 12px" }}>Why Choose TK Home Foods?</h2>
            <p style={{ color: "#6b7280", fontSize: "16px", margin: 0 }}>We bring the warmth of home cooking to your doorstep</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "24px" }}>
            {[
              { icon: "🏠", title: "Homemade Taste", desc1: "Authentic recipes prepared with love and care, just like your mother's cooking." },
              { icon: "🌿", title: "Fresh Ingredients", desc1: "We prioritise quality ingredients, freshly sourced and prepared daily." },
              { icon: "👩‍🍳", title: "Traditional Recipes", desc1: "Authentic Telangana and Andhra flavours passed down through generations." },
              { icon: "🧼", title: "Hygiene & Quality", desc1: "Food prepared in a clean, hygienic kitchen with the highest standards." },
              { icon: "❤️", title: "Made with Care", desc1: "Every dish is prepared with warmth and dedication to make you feel at home." },
              { icon: "📍", title: "Local Delivery", desc1: "Serving Miyapur, Matrusri Nagar, and nearby areas with timely delivery." },
            ].map(f => (
              <div key={f.title} style={{ background: "#fff", borderRadius: "16px", padding: "24px 20px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", textAlign: "center" }}>
                <div style={{ fontSize: "36px", marginBottom: "12px" }}>{f.icon}</div>
                <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#1c1917", margin: "0 0 8px" }}>{f.title}</h3>
                <p style={{ fontSize: "13px", color: "#6b7280", margin: 0, lineHeight: 1.5 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: "70px 20px", background: "#fff" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2 style={{ fontSize: "clamp(22px, 3.5vw, 34px)", fontWeight: 900, color: "#1c1917", margin: "0 0 12px" }}>How It Works</h2>
            <p style={{ color: "#6b7280", fontSize: "16px", margin: 0 }}>Fresh food in four simple steps</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "32px", position: "relative" }}>
            {[
              { step: "01", icon: "🍱", title: "Choose Your Food", desc1: "Browse Tiffins, Meals, Hot Items and Sweets from our fresh daily menu." },
              { step: "02", icon: "🛒", title: "Add to Cart", desc1: "Select your favourite items and build your perfect order." },
              { step: "03", icon: "📍", title: "Delivery or Pickup", desc1: "Enter your address for delivery or choose convenient pickup." },
              { step: "04", icon: "😋", title: "Enjoy Fresh Food", desc1: "We prepare your food fresh and deliver it with care to your door." },
            ].map((s, i) => (
              <div key={s.step} style={{ textAlign: "center" }}>
                <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "linear-gradient(135deg,#c0390a,#e8520a)", margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(192,57,10,0.3)" }}>
                  <span style={{ fontSize: "26px" }}>{s.icon}</span>
                </div>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#c0390a", letterSpacing: "0.08em", marginBottom: "6px" }}>STEP {s.step}</div>
                <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#1c1917", margin: "0 0 8px" }}>{s.title}</h3>
                <p style={{ fontSize: "13px", color: "#6b7280", margin: 0, lineHeight: 1.5 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "70px 20px", background: "#fef7ef" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h2 style={{ fontSize: "clamp(22px, 3.5vw, 34px)", fontWeight: 900, color: "#1c1917", margin: "0 0 8px" }}>What Our Customers Say</h2>
            <p style={{ color: "#6b7280", fontSize: "15px", margin: 0 }}>Real reviews from our valued customers</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
            {TESTIMONIALS.slice(0, 4).map(t => (
              <div key={t.id} style={{ background: "#fff", borderRadius: "16px", padding: "24px", boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
                <div style={{ display: "flex", gap: "2px", marginBottom: "12px" }}>
                  {[...Array(t.rating)].map((_,i) => <span key={i} style={{ color: "#f59e0b", fontSize: "14px" }}>★</span>)}
                </div>
                <p style={{ fontSize: "14px", color: "#374151", lineHeight: 1.6, margin: "0 0 16px", fontStyle: "italic" }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(135deg,#c0390a,#e8520a)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "14px" }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "14px", color: "#1c1917" }}>{t.name}</div>
                    <div style={{ fontSize: "12px", color: "#9ca3af" }}>{t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERY AREAS */}
      <section style={{ padding: "60px 20px", background: "#fff" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(20px, 3vw, 30px)", fontWeight: 900, color: "#1c1917", margin: "0 0 8px" }}>📍 Proudly Serving These Neighbourhoods Around Miyapur</h2>
          <p style={{ color: "#6b7280", fontSize: "15px", margin: "0 0 24px" }}>Fresh food delivered to your neighbourhood</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
            {CONFIG.DELIVERY_AREAS.map(area => (
              <span key={area} style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "20px", padding: "8px 16px", fontSize: "13px", color: "#c0390a", fontWeight: 600 }}>📍 {area}</span>
            ))}
          </div>
          <div style={{ marginTop: "32px", background: "#f9fafb", borderRadius: "16px", height: "220px", display: "flex", alignItems: "center", justifyContent: "center", border: "2px dashed #e5e7eb" }}>
            <div style={{ textAlign: "center", color: "#9ca3af" }}>
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>🗺️</div>
              <div style={{ fontSize: "14px" }}>Matrusri Nagar, Miyapur, Hyderabad</div>
              <div style={{ fontSize: "12px", marginTop: "4px" }}>Google Maps integration — add your API key to enable</div>
            </div>
          </div>
        </div>
      </section>

      {/* SUBSCRIPTION */}
      <section style={{ padding: "70px 20px", background: "linear-gradient(135deg,#1c1917,#2d1a12)" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(22px, 3.5vw, 34px)", fontWeight: 900, color: "#fff", margin: "0 0 12px" }}>Enjoy Home Food Every Day</h2>
          <p style={{ color: "#d6a08a", fontSize: "16px", margin: "0 0 40px" }}>Meal plans and subscriptions — coming soon!</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
            {[
              { icon: "📅", title: "Weekly Meal Plan", desc1: "Fresh meals delivered every day for a week" },
              { icon: "📆", title: "Monthly Tiffin Plan", desc1: "Your daily tiffin, on time, every morning" },
              { icon: "🏢", title: "Office Lunch Plan", desc1: "Nutritious daily lunch for your workplace" },
            ].map(p => (
              <div key={p.title} style={{ background: "rgba(255,255,255,0.08)", borderRadius: "16px", padding: "24px", border: "1px solid rgba(255,255,255,0.12)" }}>
                <div style={{ fontSize: "32px", marginBottom: "12px" }}>{p.icon}</div>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#fff", margin: "0 0 6px" }}>{p.title}</h3>
                <p style={{ fontSize: "13px", color: "#d6a08a", margin: "0 0 14px" }}>{p.desc}</p>
                <span style={{ background: "rgba(192,57,10,0.4)", color: "#ffa07a", borderRadius: "20px", padding: "4px 12px", fontSize: "11px", fontWeight: 700 }}>Coming Soon</span>
              </div>
            ))}
          </div>
          <button onClick={() => { setPage("contact"); window.scrollTo(0,0); }} style={{ marginTop: "32px", background: "#c0390a", color: "#fff", border: "none", borderRadius: "10px", padding: "14px 32px", fontSize: "15px", fontWeight: 700, cursor: "pointer" }}>
            Get Notified →
          </button>
        </div>
      </section>

      {/* BULK ORDERS */}
      <section style={{ padding: "70px 20px", background: "#fff" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#c0390a", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>Bulk & Party Orders</div>
              <h2 style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 900, color: "#1c1917", margin: "0 0 16px" }}>Catering for Every Occasion</h2>
              <p style={{ color: "#6b7280", fontSize: "15px", lineHeight: 1.6, margin: "0 0 20px" }}>
                Planning a birthday party, office meeting, family function, or festival celebration? We provide fresh, authentic Telangana and Andhra food for all your events.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px" }}>
                {["🎂 Birthday / Kitty Parties", "🏢 Office Meetings / Pot-luck Lunch", "👨‍👩‍👧 Family Functions", "🎉 Festivals", "💍 Special Occasions"].map(tag => (
                  <span key={tag} style={{ background: "#fef2f2", borderRadius: "6px", padding: "5px 10px", fontSize: "12px", color: "#c0390a", fontWeight: 600 }}>{tag}</span>
                ))}
              </div>
              <button onClick={() => { setPage("contact"); window.scrollTo(0,0); }} style={{ background: "#c0390a", color: "#fff", border: "none", borderRadius: "10px", padding: "13px 28px", fontSize: "14px", fontWeight: 700, cursor: "pointer" }}>
                Request a Quote →
              </button>
            </div>
            <div style={{ background: "#fef7ef", borderRadius: "20px", padding: "32px 24px" }}>
              <h3 style={{ margin: "0 0 20px", fontSize: "16px", fontWeight: 700, color: "#1c1917" }}>Quick Enquiry</h3>
              {["Your Name", "Phone Number", "Event Type"].map(ph => (
                <input key={ph} placeholder={ph} style={{ width: "100%", padding: "11px 14px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "14px", marginBottom: "10px", boxSizing: "border-box", outline: "none" }} />
              ))}
              <select style={{ width: "100%", padding: "11px 14px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "14px", marginBottom: "10px", background: "#fff", outline: "none" }}>
                <option>Number of People</option>
                {["10-25", "25-50", "50-100", "100+"].map(n => <option key={n}>{n} people</option>)}
              </select>
              <textarea placeholder="Special requirements..." style={{ width: "100%", padding: "11px 14px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "14px", height: "80px", resize: "vertical", boxSizing: "border-box", outline: "none" }} />
              <button style={{ width: "100%", background: "#c0390a", color: "#fff", border: "none", borderRadius: "8px", padding: "13px", fontSize: "14px", fontWeight: 700, cursor: "pointer", marginTop: "8px" }}>
                Send Enquiry
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// ─── CATEGORY PAGE ─────────────────────────────────────────────────────────────
function CategoryPage({ categoryId, setPage }) {
  const cat = CATEGORIES.find(c => c.id === categoryId);
  const items = MENU_ITEMS.filter(i => i.category === categoryId);
  const [filter, setFilter] = useState("all");

  if (!cat) return null;

  const filtered = filter === "special" ? items.filter(i => i.special) : items;

  const seoTitle = {
    tiffins: "Fresh Tiffins in Miyapur | TK Home Foods",
    meals: "Andhra & Telangana Meals in Miyapur | TK Home Foods",
    "hot-items": "Hot Snacks in Miyapur | TK Home Foods",
    sweets: "Traditional Sweets in Miyapur | TK Home Foods",
  }[categoryId] || cat.name;

  return (
    <main style={{ paddingTop: "64px" }}>
      <div style={{ background: "linear-gradient(135deg,#fef7ef,#fff)", padding: "48px 20px 40px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <nav style={{ fontSize: "13px", color: "#9ca3af", marginBottom: "16px" }}>
            <button onClick={() => { setPage("home"); window.scrollTo(0,0); }} style={{ background: "none", border: "none", color: "#c0390a", cursor: "pointer", padding: 0, fontSize: "13px", fontWeight: 600 }}>Home</button>
            <span style={{ margin: "0 8px" }}>›</span>
            <span style={{ color: "#374151" }}>{cat.name}</span>
          </nav>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "12px" }}>
            <span style={{ fontSize: "40px" }}>{cat.icon}</span>
            <div>
              <h1 style={{ fontSize: "clamp(24px, 4vw, 38px)", fontWeight: 900, color: "#1c1917", margin: "0 0 6px" }}>{cat.name}</h1>
              <p style={{ color: "#6b7280", margin: 0, fontSize: "15px" }}>{cat.description}</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px", marginTop: "20px", flexWrap: "wrap" }}>
            {["all", "special"].map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{
                padding: "8px 18px", borderRadius: "20px", border: "none", cursor: "pointer",
                fontSize: "13px", fontWeight: 600,
                background: filter === f ? "#c0390a" : "#f3f4f6",
                color: filter === f ? "#fff" : "#374151"
              }}>
                {f === "all" ? `All ${cat.name}` : "⭐ Specials Only"}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px 80px" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", color: "#9ca3af", padding: "40px" }}>No items found.</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "20px" }}>
            {filtered.map(item => <FoodCard key={item.id} item={item} />)}
          </div>
        )}
      </div>
    </main>
  );
}

// ─── TODAY'S SPECIALS PAGE ────────────────────────────────────────────────────
function SpecialsPage({ setPage }) {
  const today = new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  return (
    <main style={{ paddingTop: "64px" }}>
      <div style={{ background: "linear-gradient(135deg,#fff5e6,#fef2f2)", padding: "48px 20px 40px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#fde8e0", borderRadius: "20px", padding: "5px 14px", marginBottom: "16px" }}>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#c0390a", textTransform: "uppercase", letterSpacing: "0.08em" }}>🔥 Today's Specials</span>
          </div>
          <h1 style={{ fontSize: "clamp(24px, 4vw, 38px)", fontWeight: 900, color: "#1c1917", margin: "0 0 8px" }}>Fresh Specials</h1>
          <p style={{ color: "#6b7280", margin: 0, fontSize: "15px" }}>📅 {today} · Limited availability · Order early!</p>
        </div>
      </div>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px 80px" }}>
        <div style={{ background: "#fef2f2", borderRadius: "12px", padding: "14px 20px", marginBottom: "32px", display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "18px" }}>⚡</span>
          <span style={{ fontSize: "14px", color: "#c0390a", fontWeight: 600 }}>Today's specials are freshly prepared in limited quantities. Order early to avoid missing out!</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "20px" }}>
          {TODAYS_SPECIALS.map(item => <FoodCard key={item.id} item={item} />)}
        </div>
      </div>
    </main>
  );
}

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────
function AboutPage() {
  return (
    <main style={{ paddingTop: "64px" }}>
      <div style={{ background: "linear-gradient(135deg,#fef7ef,#fff)", padding: "60px 20px 50px", textAlign: "center" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 900, color: "#1c1917", margin: "0 0 16px" }}>Our Story</h1>
          <p style={{ fontSize: "17px", color: "#6b7280", lineHeight: 1.7, margin: 0 }}>
            TK Home Foods was born from a simple belief: everyone deserves access to authentic, homemade food that truly tastes like home.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "60px 20px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", marginBottom: "64px", alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: "28px", fontWeight: 900, color: "#1c1917", margin: "0 0 16px" }}>Authentic Telangana & Andhra Flavours</h2>
            <p style={{ color: "#6b7280", lineHeight: 1.7, marginBottom: "16px" }}>
              TK Home Foods brings together the authentic flavours of Andhra and Telangana with the warmth and comfort of home-style cooking. Located in the heart of Matrusree Nagar, Miyapur, we are proud to serve our community with food that feels genuine and wholesome.
            </p>
            <p style={{ color: "#6b7280", lineHeight: 1.7 }}>
              Our kitchen operates on the principle that good food should be simple, fresh, and full of flavour. We use traditional recipes, quality ingredients, and prepare everything fresh every day — no shortcuts, no compromises.
            </p>
          </div>
          <div style={{ background: "#fef7ef", borderRadius: "20px", padding: "36px 28px" }}>
            {[
              { icon: "📜", title: "Traditional Recipes", desc1: "Recipes rooted in authentic Telangana and Andhra culinary traditions." },
              { icon: "🌿", title: "Fresh Every Day", desc1: "All food is prepared fresh daily in our hygienic kitchen." },
              { icon: "🧼", title: "Hygiene First", desc1: "We maintain the highest standards of cleanliness and food safety." },
            ].map(v => (
              <div key={v.title} style={{ display: "flex", gap: "14px", marginBottom: "20px" }}>
                <span style={{ fontSize: "24px", flexShrink: 0 }}>{v.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, color: "#1c1917", marginBottom: "4px" }}>{v.title}</div>
                  <div style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.5 }}>{v.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "linear-gradient(135deg,#c0390a,#e8520a)", borderRadius: "20px", padding: "48px 40px", color: "#fff", textAlign: "center", marginBottom: "48px" }}>
          <h2 style={{ fontSize: "26px", fontWeight: 900, margin: "0 0 12px" }}>Our Mission</h2>
          <p style={{ fontSize: "17px", lineHeight: 1.7, opacity: 0.9, margin: "0 auto", maxWidth: "560px" }}>
            To make authentic, wholesome Telangana and Andhra home food accessible to every household in Miyapur and beyond — prepared fresh, delivered with care, and made to feel like a meal from home.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "16px" }}>
          {[["🍱", "4", "Categories"], ["🍽️", "24+", "Menu Items"], ["📍", "8+", "Delivery Areas"], ["⭐", "4.8", "Avg Rating"]].map(([icon, val, label]) => (
            <div key={label} style={{ background: "#f9fafb", borderRadius: "14px", padding: "24px 16px", textAlign: "center" }}>
              <div style={{ fontSize: "28px", marginBottom: "8px" }}>{icon}</div>
              <div style={{ fontSize: "28px", fontWeight: 900, color: "#c0390a", marginBottom: "4px" }}>{val}</div>
              <div style={{ fontSize: "13px", color: "#6b7280", fontWeight: 500 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

// ─── CONTACT PAGE ─────────────────────────────────────────────────────────────
function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!form.name || !form.message) return;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  const whatsapp = () => {
    const msg = `Hello TK Home Foods! I have an enquiry.\n\nName: ${form.name || "[Your name]"}\nMessage: ${form.message || "[Your message]"}`;
    window.open(`https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <main style={{ paddingTop: "64px" }}>
      <div style={{ background: "linear-gradient(135deg,#fef7ef,#fff)", padding: "60px 20px 50px", textAlign: "center" }}>
        <h1 style={{ fontSize: "clamp(26px, 4.5vw, 40px)", fontWeight: 900, color: "#1c1917", margin: "0 0 12px" }}>Get in Touch</h1>
        <p style={{ color: "#6b7280", fontSize: "16px", margin: 0 }}>We'd love to hear from you. Reach out for orders, enquiries, or feedback.</p>
      </div>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "48px 20px 80px", display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "48px" }}>
        {/* Info */}
        <div>
          <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#1c1917", margin: "0 0 24px" }}>Contact Information</h2>
          {[
            { icon: "📍", label: "Address", val: "Matrusri Nagar, Miyapur, Hyderabad, Telangana, India" },
            { icon: "📞", label: "Phone", val: CONFIG.PHONE },
            { icon: "💬", label: "WhatsApp", val: CONFIG.PHONE },
            { icon: "✉️", label: "Email", val: CONFIG.EMAIL },
            { icon: "🕐", label: "Business Hours", val: CONFIG.BUSINESS_HOURS },
          ].map(c => (
            <div key={c.label} style={{ display: "flex", gap: "14px", marginBottom: "20px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "#fef2f2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "18px" }}>{c.icon}</div>
              <div>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "2px" }}>{c.label}</div>
                <div style={{ fontSize: "14px", color: "#374151", fontWeight: 500 }}>{c.val}</div>
              </div>
            </div>
          ))}

          <button onClick={whatsapp} style={{ display: "flex", alignItems: "center", gap: "10px", background: "#25d366", color: "#fff", border: "none", borderRadius: "10px", padding: "13px 22px", fontSize: "14px", fontWeight: 700, cursor: "pointer", marginTop: "8px" }}>
            <span style={{ fontSize: "20px" }}>💬</span> Chat on WhatsApp
          </button>

          <div style={{ marginTop: "24px", background: "#f9fafb", borderRadius: "14px", height: "180px", display: "flex", alignItems: "center", justifyContent: "center", border: "2px dashed #e5e7eb" }}>
            <div style={{ textAlign: "center", color: "#9ca3af" }}>
              <div style={{ fontSize: "28px" }}>🗺️</div>
              <div style={{ fontSize: "13px" }}>Map coming soon</div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div style={{ background: "#fef7ef", borderRadius: "20px", padding: "36px 28px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#1c1917", margin: "0 0 24px" }}>Send a Message</h2>
          {[
            { field: "name", label: "Your Name", type: "text", placeholder: "Enter your name" },
            { field: "phone", label: "Phone Number", type: "tel", placeholder: "+91 9581  344 345" },
            { field: "email", label: "Email (optional)", type: "email", placeholder: "you@example.com" },
          ].map(f => (
            <div key={f.field} style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>{f.label}</label>
              <input type={f.type} placeholder={f.placeholder} value={form[f.field]}
                onChange={e => setForm(p => ({ ...p, [f.field]: e.target.value }))}
                style={{ width: "100%", padding: "11px 14px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "14px", boxSizing: "border-box", outline: "none", background: "#fff" }} />
            </div>
          ))}
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>Message</label>
            <textarea placeholder="Your message, order enquiry, or feedback..." value={form.message}
              onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
              style={{ width: "100%", padding: "11px 14px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "14px", height: "110px", resize: "vertical", boxSizing: "border-box", outline: "none", background: "#fff" }} />
          </div>
          <button onClick={handleSend} style={{ width: "100%", background: "#c0390a", color: "#fff", border: "none", borderRadius: "10px", padding: "14px", fontSize: "15px", fontWeight: 700, cursor: "pointer" }}>
            {sent ? "✓ Message Sent!" : "Send Message"}
          </button>
          <p style={{ fontSize: "12px", color: "#9ca3af", textAlign: "center", marginTop: "12px" }}>Or reach us directly on WhatsApp for a faster response.</p>
        </div>
      </div>
    </main>
  );
}

// ─── CHECKOUT PAGE ─────────────────────────────────────────────────────────────
function CheckoutPage({ setPage }) {
  const { cart, total, clearCart } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", address: "", landmark: "", delivery: "delivery", time: "", instructions: "", payment: "cod" });
  const [ordered, setOrdered] = useState(false);

  const delivery = total > 0 ? 30 : 0;
  const grandTotal = total + delivery;

  const whatsappOrder = () => {
    const items = cart.map(i => `• ${i.name} x${i.qty} = ₹${i.price * i.qty}`).join("\n");
    const msg = `🍱 *New Order — TK Home Foods*\n\n👤 Name: ${form.name}\n📞 Phone: ${form.phone}\n📍 Address: ${form.address}${form.landmark ? `, Near ${form.landmark}` : ""}\n🚚 Type: ${form.delivery === "delivery" ? "Delivery" : "Pickup"}${form.time ? `\n⏰ Time: ${form.time}` : ""}\n\n*Order Items:*\n${items}\n\n💰 Subtotal: ₹${total}\n🚚 Delivery: ₹${delivery}\n✅ Total: ₹${grandTotal}\n\n💳 Payment: ${form.payment === "cod" ? "Cash on Delivery" : form.payment === "upi" ? "UPI" : "Online"}${form.instructions ? `\n📝 Instructions: ${form.instructions}` : ""}`;
    window.open(`https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const placeOrder = () => {
    if (!form.name || !form.phone) return alert("Please fill in your name and phone number.");
    if (form.delivery === "delivery" && !form.address) return alert("Please enter your delivery address.");
    setOrdered(true);
    clearCart();
  };

  if (ordered) {
    return (
      <main style={{ paddingTop: "64px", minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", padding: "40px 20px" }}>
          <div style={{ fontSize: "72px", marginBottom: "20px" }}>🎉</div>
          <h1 style={{ fontSize: "28px", fontWeight: 900, color: "#1c1917", margin: "0 0 12px" }}>Order Placed!</h1>
          <p style={{ color: "#6b7280", fontSize: "16px", maxWidth: "400px", margin: "0 auto 28px" }}>
            Thank you, {form.name || "valued customer"}! Your order has been received. We'll prepare your fresh food and contact you shortly.
          </p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => { setPage("home"); window.scrollTo(0,0); }} style={{ background: "#c0390a", color: "#fff", border: "none", borderRadius: "10px", padding: "13px 28px", fontSize: "15px", fontWeight: 700, cursor: "pointer" }}>
              Back to Home
            </button>
            <button onClick={whatsappOrder} style={{ background: "#25d366", color: "#fff", border: "none", borderRadius: "10px", padding: "13px 28px", fontSize: "15px", fontWeight: 700, cursor: "pointer" }}>
              💬 Confirm on WhatsApp
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main style={{ paddingTop: "64px", minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", padding: "40px 20px" }}>
          <div style={{ fontSize: "56px", marginBottom: "16px" }}>🛒</div>
          <h1 style={{ fontSize: "24px", fontWeight: 900, color: "#1c1917", margin: "0 0 12px" }}>Your cart is empty</h1>
          <button onClick={() => { setPage("home"); window.scrollTo(0,0); }} style={{ background: "#c0390a", color: "#fff", border: "none", borderRadius: "10px", padding: "13px 28px", fontSize: "15px", fontWeight: 700, cursor: "pointer" }}>
            Browse Menu
          </button>
        </div>
      </main>
    );
  }

  return (
    <main style={{ paddingTop: "64px" }}>
      <div style={{ background: "#fef7ef", padding: "40px 20px 30px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "30px", fontWeight: 900, color: "#1c1917", margin: 0 }}>Checkout</h1>
        </div>
      </div>
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 20px 80px", display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "32px" }}>
        {/* Form */}
        <div>
          <h2 style={{ fontSize: "18px", fontWeight: 800, color: "#1c1917", margin: "0 0 20px" }}>Delivery Details</h2>
          {[
            { field: "name", label: "Your Name *", type: "text", placeholder: "Full name" },
            { field: "phone", label: "Mobile Number *", type: "tel", placeholder: "+91 XXXXX XXXXX" },
          ].map(f => (
            <div key={f.field} style={{ marginBottom: "14px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "5px" }}>{f.label}</label>
              <input type={f.type} placeholder={f.placeholder} value={form[f.field]}
                onChange={e => setForm(p => ({ ...p, [f.field]: e.target.value }))}
                style={{ width: "100%", padding: "11px 14px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "14px", boxSizing: "border-box", outline: "none" }} />
            </div>
          ))}

          <div style={{ marginBottom: "14px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "8px" }}>Order Type</label>
            <div style={{ display: "flex", gap: "12px" }}>
              {[{ val: "delivery", label: "🚚 Delivery" }, { val: "pickup", label: "🏃 Pickup" }].map(o => (
                <button key={o.val} onClick={() => setForm(p => ({ ...p, delivery: o.val }))} style={{
                  flex: 1, padding: "11px", borderRadius: "8px", border: `2px solid ${form.delivery === o.val ? "#c0390a" : "#e5e7eb"}`,
                  background: form.delivery === o.val ? "#fef2f2" : "#fff", cursor: "pointer",
                  fontSize: "14px", fontWeight: 600, color: form.delivery === o.val ? "#c0390a" : "#374151"
                }}>{o.label}</button>
              ))}
            </div>
          </div>

          {form.delivery === "delivery" && (
            <>
              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "5px" }}>Delivery Address *</label>
                <textarea placeholder="House/Flat No., Street, Area..." value={form.address}
                  onChange={e => setForm(p => ({ ...p, address: e.target.value }))}
                  style={{ width: "100%", padding: "11px 14px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "14px", height: "80px", resize: "vertical", boxSizing: "border-box", outline: "none" }} />
              </div>
              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "5px" }}>Landmark (optional)</label>
                <input placeholder="Near landmark..." value={form.landmark}
                  onChange={e => setForm(p => ({ ...p, landmark: e.target.value }))}
                  style={{ width: "100%", padding: "11px 14px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "14px", boxSizing: "border-box", outline: "none" }} />
              </div>
            </>
          )}

          <div style={{ marginBottom: "14px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "5px" }}>Preferred Delivery Time</label>
            <select value={form.time} onChange={e => setForm(p => ({ ...p, time: e.target.value }))}
              style={{ width: "100%", padding: "11px 14px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "14px", background: "#fff", outline: "none" }}>
              <option value="">As soon as possible</option>
              {["7:00 AM – 8:00 AM", "8:00 AM – 9:00 AM", "9:00 AM – 10:00 AM", "12:00 PM – 1:00 PM", "1:00 PM – 2:00 PM", "6:00 PM – 7:00 PM", "7:00 PM – 8:00 PM"].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>

          <div style={{ marginBottom: "14px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "5px" }}>Special Instructions</label>
            <textarea placeholder="Any special requests..." value={form.instructions}
              onChange={e => setForm(p => ({ ...p, instructions: e.target.value }))}
              style={{ width: "100%", padding: "11px 14px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "14px", height: "70px", resize: "vertical", boxSizing: "border-box", outline: "none" }} />
          </div>

          <h2 style={{ fontSize: "18px", fontWeight: 800, color: "#1c1917", margin: "24px 0 16px" }}>Payment Method</h2>
          {[
            { val: "cod", icon: "💵", label: "Cash on Delivery", sub: "Pay when your food arrives" },
            { val: "upi", icon: "📱", label: "UPI Payment", sub: "Google Pay, PhonePe, Paytm" },
            { val: "online", icon: "💳", label: "Online Payment", sub: "Razorpay — coming soon" },
          ].map(pm => (
            <button key={pm.val} onClick={() => setForm(p => ({ ...p, payment: pm.val }))} style={{
              display: "flex", alignItems: "center", gap: "14px", width: "100%", marginBottom: "10px",
              padding: "14px 16px", borderRadius: "10px", border: `2px solid ${form.payment === pm.val ? "#c0390a" : "#e5e7eb"}`,
              background: form.payment === pm.val ? "#fef2f2" : "#fff", cursor: "pointer", textAlign: "left"
            }}>
              <span style={{ fontSize: "24px" }}>{pm.icon}</span>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "#1c1917" }}>{pm.label}</div>
                <div style={{ fontSize: "12px", color: "#9ca3af" }}>{pm.sub}</div>
              </div>
              <div style={{ marginLeft: "auto", width: "18px", height: "18px", borderRadius: "50%", border: `2px solid ${form.payment === pm.val ? "#c0390a" : "#d1d5db"}`, background: form.payment === pm.val ? "#c0390a" : "#fff" }} />
            </button>
          ))}
        </div>

        {/* Order Summary */}
        <div>
          <div style={{ background: "#f9fafb", borderRadius: "16px", padding: "24px", position: "sticky", top: "80px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: 800, color: "#1c1917", margin: "0 0 16px" }}>Order Summary</h2>
            {cart.map(item => (
              <div key={item.id} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #e5e7eb", fontSize: "14px" }}>
                <span style={{ color: "#374151" }}>{item.name} <span style={{ color: "#9ca3af" }}>×{item.qty}</span></span>
                <span style={{ fontWeight: 600, color: "#1c1917" }}>₹{item.price * item.qty}</span>
              </div>
            ))}
            <div style={{ padding: "12px 0 0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#6b7280", marginBottom: "6px" }}>
                <span>Subtotal</span><span>₹{total}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#6b7280", marginBottom: "12px" }}>
                <span>Delivery</span><span>₹{delivery}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "17px", fontWeight: 800, color: "#1c1917", borderTop: "2px solid #e5e7eb", paddingTop: "12px" }}>
                <span>Total</span><span style={{ color: "#c0390a" }}>₹{grandTotal}</span>
              </div>
            </div>
            <button onClick={placeOrder} style={{ width: "100%", background: "#c0390a", color: "#fff", border: "none", borderRadius: "10px", padding: "15px", fontSize: "15px", fontWeight: 700, cursor: "pointer", marginTop: "16px" }}>
              Place Order
            </button>
            <button onClick={whatsappOrder} style={{ width: "100%", background: "#25d366", color: "#fff", border: "none", borderRadius: "10px", padding: "13px", fontSize: "14px", fontWeight: 700, cursor: "pointer", marginTop: "10px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
              <span>💬</span> Order via WhatsApp
            </button>
            <p style={{ fontSize: "11px", color: "#9ca3af", textAlign: "center", marginTop: "10px" }}>
              By placing an order you agree to our terms of service.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer({ setPage }) {
  const go = (key) => { setPage(key); window.scrollTo(0,0); };
  return (
    <footer style={{ background: "#1c1917", color: "#d6d3d1", padding: "60px 20px 30px" }} className="footer-mobile-fix">
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "40px", marginBottom: "48px" }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "linear-gradient(135deg,#c0390a,#e8520a)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>🍱</div>
              <div>
                <div style={{ fontSize: "16px", fontWeight: 800, color: "#fff" }}>TK Home Foods</div>
                <div style={{ fontSize: "11px", color: "#c0390a" }}>Miyapur, Hyderabad</div>
              </div>
            </div>
            <p style={{ fontSize: "14px", lineHeight: 1.6, color: "#a8a29e", marginBottom: "16px" }}>
              {CONFIG.TAGLINE}
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              {["📘", "📸", "▶️", "💬"].map((icon, i) => (
                <div key={i} style={{ width: "34px", height: "34px", borderRadius: "8px", background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", cursor: "pointer" }}>{icon}</div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ color: "#fff", fontSize: "14px", fontWeight: 700, margin: "0 0 16px", letterSpacing: "0.05em" }}>MENU</h3>
            {[["tiffins", "Tiffins"], ["meals", "Rice"], ["hot-items", "Hot Items"], ["sweets", "Sweets"], ["specials", "Today's Specials"]].map(([key, label]) => (
              <button key={key} onClick={() => go(key)} style={{ display: "block", background: "none", border: "none", color: "#a8a29e", fontSize: "14px", cursor: "pointer", padding: "4px 0", transition: "color 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#c0390a"}
                onMouseLeave={e => e.currentTarget.style.color = "#a8a29e"}>
                {label}
              </button>
            ))}
          </div>

          {/* Company */}
          <div>
            <h3 style={{ color: "#fff", fontSize: "14px", fontWeight: 700, margin: "0 0 16px", letterSpacing: "0.05em" }}>COMPANY</h3>
            {[["home", "Home"], ["about", "About Us"], ["contact", "Contact"], ["checkout", "Order Now"]].map(([key, label]) => (
              <button key={key} onClick={() => go(key)} style={{ display: "block", background: "none", border: "none", color: "#a8a29e", fontSize: "14px", cursor: "pointer", padding: "4px 0" }}
                onMouseEnter={e => e.currentTarget.style.color = "#c0390a"}
                onMouseLeave={e => e.currentTarget.style.color = "#a8a29e"}>
                {label}
              </button>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h3 style={{ color: "#fff", fontSize: "14px", fontWeight: 700, margin: "0 0 16px", letterSpacing: "0.05em" }}>CONTACT</h3>
            <div style={{ fontSize: "13px", color: "#a8a29e", lineHeight: 1.8 }}>
              <div>📍 Matrusri Nagar</div>
              <div>Miyapur, Hyderabad</div>
              <div style={{ marginTop: "8px" }}>📞 {CONFIG.PHONE}</div>
              <div>✉️ {CONFIG.EMAIL}</div>
              <div style={{ marginTop: "8px" }}>🕐 {CONFIG.BUSINESS_HOURS}</div>
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ fontSize: "13px", color: "#78716c" }}>© 2026 TK Home Foods. All Rights Reserved.</div>
          <div style={{ fontSize: "13px", color: "#78716c" }}>Made with ❤️ in Miyapur, Hyderabad</div>
        </div>
      </div>
    </footer>
  );
}

// ─── WHATSAPP FAB ─────────────────────────────────────────────────────────────
function WhatsAppFab() {
  return (
    <a href={`https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=Hello! I'd like to order from TK Home Foods.`}
      target="_blank" rel="noopener noreferrer"
      style={{ position: "fixed", bottom: "80px", right: "20px", zIndex: 990,
        width: "52px", height: "52px", borderRadius: "50%", background: "#25d366",
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px",
        boxShadow: "0 4px 16px rgba(37,211,102,0.5)", textDecoration: "none",
        transition: "transform 0.2s" }}
      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
      💬
    </a>
  );
}

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
function GlobalStyles() {
  return (
    <style>{`
      * { box-sizing: border-box; }
      body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #fff; }
      button { font-family: inherit; }
      input, select, textarea { font-family: inherit; }
      @media (max-width: 768px) {
        .desktop-nav { display: none !important; }
        .mobile-only { display: flex !important; }
        section > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        section > div > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        .footer-mobile-fix > div > div[style*="grid-template-columns"] { grid-template-columns: 1fr 1fr !important; }
        main > div[style*="grid-template-columns: 1.4fr 1fr"] { grid-template-columns: 1fr !important; }
        main > div[style*="grid-template-columns: 1fr 1.3fr"] { grid-template-columns: 1fr !important; }
      }
      @media (min-width: 769px) {
        .mobile-only { display: none !important; }
        .desktop-nav { display: flex !important; }
      }
    `}</style>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");

  const renderPage = () => {
    switch(page) {
      case "home": return <HomePage setPage={setPage} />;
      case "tiffins":
      case "meals":
      case "hot-items":
      case "sweets":
        return <CategoryPage categoryId={page} setPage={setPage} />;
      case "specials": return <SpecialsPage setPage={setPage} />;
      case "about": return <AboutPage />;
      case "contact": return <ContactPage />;
      case "checkout": return <CheckoutPage setPage={setPage} />;
      default: return <HomePage setPage={setPage} />;
    }
  };

  return (
    <CartProvider>
      <GlobalStyles />
      <Nav currentPage={page} setPage={setPage} />
      <CartDrawer setPage={setPage} />
      <WhatsAppFab />
      {renderPage()}
      <Footer setPage={setPage} />
    </CartProvider>
  );
}
