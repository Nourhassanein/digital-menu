const BASE = import.meta.env.BASE_URL;

const menuData = [
  // ===== MAIN COURSE =====
  {
    id: 1,
    name: "Bloom Burger",
    category: "Main Course",
    image: `${BASE}images/bloom-burger.jpg`,
    description: "Juicy grilled burger with cheddar, crisp lettuce, and signature house sauce.",
    price: 8.99,
    rating: 4.9,
    badge: "Best Seller",
    tag: "Savory"
  },
  {
    id: 2,
    name: "Garden Pasta",
    category: "Main Course",
    image: `${BASE}images/garden-pasta.jpg`,
    description: "Creamy herb pasta with fresh vegetables and parmesan.",
    price: 9.50,
    rating: 4.6,
    badge: "Vegan",
    tag: "Healthy"
  },
  {
    id: 3,
    name: "Emerald Forest Risotto",
    category: "Main Course",
    image: `${BASE}images/emerald-forest-risotto.jpg`,
    description: "Creamy arborio rice infused with wild garlic, topped with crispy kale, toasted pine nuts, and micro-flowers.",
    price: 12.50,
    rating: 4.8,
    badge: "Chef’s Choice",
    tag: "Savory"
  },
  {
    id: 4,
    name: "Golden Garlic Steak",
    category: "Main Course",
    image: `${BASE}images/golden-garlic-steak.jpg`,
    description: "Pan-seared steak topped with crispy roasted garlic and herb butter.",
    price: 15.99,
    rating: 4.9,
    badge: "Best Seller",
    tag: "Savory"
  },
  {
    id: 5,
    name: "Ocean Pearl Salmon",
    category: "Main Course",
    image: `${BASE}images/ocean-pearl-salmon.jpg`,
    description: "Grilled salmon served with pearl couscous, lemon zest, and fresh dill.",
    price: 14.50,
    rating: 4.8,
    badge: "Healthy Choice",
    tag: "Seafood"
  },
  {
    id: 6,
    name: "Harvest Chicken Roast",
    category: "Main Course",
    image: `${BASE}images/harvest-chicken-roast.jpg`,
    description: "Tender roasted chicken with honey-glazed carrots and velvety pumpkin puree.",
    price: 13.75,
    rating: 4.7,
    badge: "Popular",
    tag: "Comfort"
  },

  // ===== SALADS =====
  {
    id: 7,
    name: "Crab Salad",
    category: "Salads",
    image: `${BASE}images/crab-salad.jpg`,
    description: "Fresh crab with crisp greens, cherry tomatoes, and citrus vinaigrette.",
    price: 10.50,
    rating: 4.8,
    badge: "Chef’s Choice",
    tag: "Seafood"
  },
  {
    id: 8,
    name: "Salmon Salad",
    category: "Salads",
    image: `${BASE}images/salmon-salad.jpg`,
    description: "Grilled salmon with avocado, cucumber, and lemon dressing.",
    price: 11.25,
    rating: 4.9,
    badge: "Healthy Choice",
    tag: "Seafood"
  },
  {
    id: 9,
    name: "Chicken Avocado Salad",
    category: "Salads",
    image: `${BASE}images/chicken-avocado-salad.jpg`,
    description: "Grilled chicken with avocado, cherry tomatoes, and balsamic drizzle.",
    price: 9.99,
    rating: 4.7,
    badge: "Popular",
    tag: "Protein"
  },
  {
    id: 10,
    name: "Chicken Caesar Salad",
    category: "Salads",
    image: `${BASE}images/chicken-caesar-salad.jpg`,
    description: "Classic Caesar salad topped with grilled chicken, parmesan, and crunchy croutons.",
    price: 9.50,
    rating: 4.6,
    badge: "Classic",
    tag: "Protein"
  },

  // ===== DRINKS =====
  {
    id: 11,
    name: "Iced Latte Bloom",
    category: "Drinks",
    image: `${BASE}images/iced-latte.jpg`,
    description: "Creamy iced latte with vanilla notes and rich espresso.",
    price: 4.99,
    rating: 4.8,
    badge: "Popular",
    tag: "Cold"
  },
  {
    id: 12,
    name: "Rose Lemonade",
    category: "Drinks",
    image: `${BASE}images/rose-lemonade.jpg`,
    description: "Sparkling lemonade delicately infused with rose petals.",
    price: 3.75,
    rating: 4.7,
    badge: "New",
    tag: "Fresh"
  },
  {
    id: 13,
    name: "Vanilla Dream",
    category: "Drinks",
    image: `${BASE}images/vanilla-dream.jpg`,
    description: "Smooth vanilla cream topped with a delicate white chocolate flower.",
    price: 4.95,
    rating: 4.7,
    badge: "Chef’s Choice",
    tag: "Creamy"
  },
  {
    id: 14,
    name: "Sunrise Citrine Spritz",
    category: "Drinks",
    image: `${BASE}images/sunrise-citrine-spritz.jpg`,
    description: "A sparkling blend of blood orange, elderflower, and citrus.",
    price: 5.25,
    rating: 4.7,
    badge: "New",
    tag: "Refreshing"
  },

  // ===== DESSERTS =====
  {
    id: 15,
    name: "Berry Cheesecake",
    category: "Desserts",
    image: `${BASE}images/berry-cheesecake.jpg`,
    description: "Silky cheesecake topped with fresh berries and a glossy berry glaze.",
    price: 5.75,
    rating: 4.9,
    badge: "Sweet Pick",
    tag: "Dessert"
  },
  {
  id: 16,
  name: "Cotton Cloud Delight",
  category: "Desserts",
  image: `${BASE}images/cotton-cloud-delight.jpg`,
  description: "A dreamy scoop of vanilla bean ice cream surrounded by airy cotton candy, finished with raspberry sauce and delicate edible shimmer.",
  price: 6.25,
  rating: 4.9,
  badge: "Signature",
  tag: "Luxury"
},
  {
    id: 17,
    name: "Velvet Truffle Nest",
    category: "Desserts",
    image: `${BASE}images/velvet-truffle-nest.jpg`,
    description: "Rich chocolate truffles with caramel, served in a delicate spun-sugar nest.",
    price: 6.00,
    rating: 4.9,
    badge: "Luxury",
    tag: "Chocolate"
  },
  {
    id: 18,
    name: "Lavender Honey Panna Cotta",
    category: "Desserts",
    image: `${BASE}images/lavender-honey-panna-cotta.jpg`,
    description: "Creamy panna cotta infused with lavender, finished with honey and edible flowers.",
    price: 6.25,
    rating: 4.8,
    badge: "Elegant",
    tag: "Premium"
  }
];

export default menuData;