/**
 * Menu Data Architecture
 * Primary Source of Truth: Physical printed menu photograph (Assests/Screenshot 2026-10-02 112630.png)
 * 
 * Rules:
 * - Every item directly visible on the menu is marked verifiedFromPhysicalMenu: true.
 * - Any uncertain details are flagged with needsVerification: true.
 * - Individual vegetarian item classification is marked.
 */

export type MenuCategoryId =
  | "starters"
  | "tacos"
  | "sizzlers"
  | "pasta"
  | "burritos"
  | "burrito-bowls"
  | "enchiladas"
  | "quesadillas"
  | "smoothies"
  | "coffee"
  | "mocktails";

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategoryId;
  price: number; // In INR (₹)
  description?: string;
  isVegetarian: boolean;
  isSignature?: boolean;
  servingInfo?: string;
  verifiedFromPhysicalMenu: boolean;
  needsVerification?: boolean;
  verificationNote?: string;
}

export interface MenuCategory {
  id: MenuCategoryId;
  name: string;
  subtitle?: string;
  order: number;
}

export const menuCategories: MenuCategory[] = [
  { id: "starters", name: "Starters & Appetizers", subtitle: "Freshly prepped Mexican beginnings", order: 1 },
  { id: "tacos", name: "Tacos (4 Pcs)", subtitle: "Crispy folded tortillas loaded with fresh fills", order: 2 },
  { id: "sizzlers", name: "Sizzlers", subtitle: "Hot skillet platters with Mexican rice and fajita seasoning", order: 3 },
  { id: "pasta", name: "Pasta & Spaghetti", subtitle: "Comforting Italian-Mexican fusion pasta bowls", order: 4 },
  { id: "burritos", name: "Burritos", subtitle: "Warm rolled flour tortillas stuffed with seasoned rice and beans", order: 5 },
  { id: "burrito-bowls", name: "Burrito Bowls", subtitle: "Layered rice, black beans, vegetables, and salsa", order: 6 },
  { id: "enchiladas", name: "Enchiladas", subtitle: "Rolled corn tortillas smothered in rich enchilada sauce", order: 7 },
  { id: "quesadillas", name: "Quesadillas", subtitle: "Toasted flour tortillas filled with melted cheese and vegetables", order: 8 },
  { id: "smoothies", name: "Smoothies", subtitle: "Natural fruit, avocado, and date-sweetened cold blends", order: 9 },
  { id: "coffee", name: "Coffee", subtitle: "Espresso, hot brew, and layered milk coffees", order: 10 },
  { id: "mocktails", name: "Mocktails", subtitle: "Chilled botanical refreshers and layered coolers", order: 11 },
];

export const menuItems: MenuItem[] = [
  // 1. STARTERS & APPETIZERS
  {
    id: "fresh-guac-chips",
    name: "Fresh Guacamole & Tortilla Chips",
    category: "starters",
    price: 349,
    description: "Fresh guacamole, crispy tortilla chips",
    isVegetarian: true,
    isSignature: true,
    verifiedFromPhysicalMenu: true,
  },
  {
    id: "queso-fundido",
    name: "Queso Fundido",
    category: "starters",
    price: 299,
    description: "Melted cheese, roasted peppers, tortilla",
    isVegetarian: true,
    isSignature: true,
    verifiedFromPhysicalMenu: true,
  },
  {
    id: "elote-street-corn",
    name: "Elote (Mexican Street Corn)",
    category: "starters",
    price: 199,
    description: "Grilled sweet corn, cheese, chilli lime seasoning",
    isVegetarian: true,
    verifiedFromPhysicalMenu: true,
  },
  {
    id: "nachos-supreme",
    name: "Nachos Supreme",
    category: "starters",
    price: 319,
    description: "Tortilla chips, beans, cheese, jalapenos, sour cream, salsa",
    isVegetarian: true,
    verifiedFromPhysicalMenu: true,
  },
  {
    id: "mexican-bhel",
    name: "Mexican Bhel",
    category: "starters",
    price: 319,
    description: "Crispy papdi, beans, corn, salsa, lime crema, cheese",
    isVegetarian: true,
    verifiedFromPhysicalMenu: true,
  },
  {
    id: "avocado-toast",
    name: "Avocado Toast",
    category: "starters",
    price: 349,
    description: "Freshly smashed seasoned avocado on toasted artisan bread",
    isVegetarian: true,
    verifiedFromPhysicalMenu: true,
  },

  // 2. TACOS (4 PCS)
  {
    id: "roasted-cauliflower-taco",
    name: "Roasted Cauliflower Taco",
    category: "tacos",
    price: 339,
    description: "Roasted cauliflower, chipotle seasoning, cabbage slaw, avocado crema",
    servingInfo: "4 pcs",
    isVegetarian: true,
    verifiedFromPhysicalMenu: true,
  },
  {
    id: "crispy-avocado-taco",
    name: "Crispy Avocado Taco",
    category: "tacos",
    price: 369,
    description: "Breaded avocado, avocado slices, spicy lime sauce",
    servingInfo: "4 pcs",
    isVegetarian: true,
    isSignature: true,
    verifiedFromPhysicalMenu: true,
  },
  {
    id: "black-bean-sweet-potato-taco",
    name: "Black Bean & Sweet Potato Taco",
    category: "tacos",
    price: 329,
    description: "Roasted sweet potato, black beans, pickled onions, cilantro",
    servingInfo: "4 pcs",
    isVegetarian: true,
    verifiedFromPhysicalMenu: true,
  },
  {
    id: "spinach-cheese-taco",
    name: "Spinach Cheese Taco",
    category: "tacos",
    price: 349,
    description: "Spinach, melted cheese, roasted garlic, salsa",
    servingInfo: "4 pcs",
    isVegetarian: true,
    verifiedFromPhysicalMenu: true,
  },
  {
    id: "paneer-taco",
    name: "Paneer Taco",
    category: "tacos",
    price: 399,
    description: "Paneer, lettuce, jalapeños, cheese",
    servingInfo: "4 pcs",
    isVegetarian: true,
    isSignature: true,
    verifiedFromPhysicalMenu: true,
  },

  // 3. SIZZLERS
  {
    id: "mexican-veg-sizzler",
    name: "Mexican Veg Sizzler",
    category: "sizzlers",
    price: 549,
    description: "Grilled vegetables, Mexican rice, beans, salsa, tortilla chips",
    isVegetarian: true,
    isSignature: true,
    verifiedFromPhysicalMenu: true,
  },
  {
    id: "paneer-fajita-sizzler",
    name: "Paneer Fajita Sizzler",
    category: "sizzlers",
    price: 549,
    description: "Smoky paneer, peppers, onions, Mexican rice, fajita seasoning",
    isVegetarian: true,
    isSignature: true,
    verifiedFromPhysicalMenu: true,
  },
  {
    id: "cheesy-nacho-sizzler",
    name: "Cheesy Nacho Sizzler",
    category: "sizzlers",
    price: 499,
    description: "Crispy nachos, grilled vegetables, beans, cheese sauce, salsa",
    isVegetarian: true,
    verifiedFromPhysicalMenu: true,
  },

  // 4. PASTA & SPAGHETTI
  {
    id: "penne-arrabbiata",
    name: "Penne Arrabbiata",
    category: "pasta",
    price: 469,
    description: "Penne pasta, tomato basil sauce, garlic, chilli flakes",
    isVegetarian: true,
    verifiedFromPhysicalMenu: true,
  },
  {
    id: "creamy-alfredo-pasta",
    name: "Creamy Alfredo Pasta",
    category: "pasta",
    price: 499,
    description: "Penne pasta, creamy white sauce, garlic, herbs, parmesan",
    isVegetarian: true,
    verifiedFromPhysicalMenu: true,
  },
  {
    id: "pesto-penne",
    name: "Pesto Penne",
    category: "pasta",
    price: 499,
    description: "Penne pasta, basil pesto, cherry tomatoes, parmesan",
    isVegetarian: true,
    verifiedFromPhysicalMenu: true,
  },
  {
    id: "aglio-e-olio",
    name: "Aglio-e-Olio",
    category: "pasta",
    price: 399,
    description: "Spaghetti tossed in olive oil, garlic, and herbs",
    isVegetarian: true,
    verifiedFromPhysicalMenu: true,
  },

  // 5. BURRITOS
  {
    id: "veggie-burrito",
    name: "Veggie Burrito",
    category: "burritos",
    price: 379,
    description: "Rice, beans, vegetables, cheese, lettuce",
    isVegetarian: true,
    verifiedFromPhysicalMenu: true,
  },
  {
    id: "paneer-burrito",
    name: "Paneer Burrito",
    category: "burritos",
    price: 399,
    description: "Spiced paneer, rice, salsa, cheese",
    isVegetarian: true,
    verifiedFromPhysicalMenu: true,
  },
  {
    id: "tossed-veg-burrito",
    name: "Tossed Veg Burrito",
    category: "burritos",
    price: 379,
    description: "Roasted veggies, rice, chipotle salsa",
    isVegetarian: true,
    verifiedFromPhysicalMenu: true,
  },
  {
    id: "chipotle-veg-burrito",
    name: "Chipotle Veg Burrito",
    category: "burritos",
    price: 379,
    description: "Rice, beans, grilled veggies, chipotle sauce",
    isVegetarian: true,
    verifiedFromPhysicalMenu: true,
  },

  // 6. BURRITO BOWLS
  {
    id: "mexican-rice-bowl",
    name: "Mexican Rice Bowl",
    category: "burrito-bowls",
    price: 449,
    description: "Seasoned Mexican rice, black beans, charred corn, salsa, and cheese",
    isVegetarian: true,
    verifiedFromPhysicalMenu: true,
  },
  {
    id: "black-bean-burrito-bowl",
    name: "Black Bean Burrito Bowl",
    category: "burrito-bowls",
    price: 449,
    description: "Slow-cooked black beans, cilantro-lime rice, pico de gallo, and crema",
    isVegetarian: true,
    verifiedFromPhysicalMenu: true,
  },
  {
    id: "paneer-burrito-bowl",
    name: "Paneer Burrito Bowl",
    category: "burrito-bowls",
    price: 469,
    description: "Spiced grilled paneer, Mexican rice, sautéed peppers, and salsa",
    isVegetarian: true,
    verifiedFromPhysicalMenu: true,
  },
  {
    id: "chipotle-veggie-bowl",
    name: "Chipotle Veggie Bowl",
    category: "burrito-bowls",
    price: 449,
    description: "Chipotle spiced seasonal veggies, beans, roasted salsa, and greens",
    isVegetarian: true,
    verifiedFromPhysicalMenu: true,
  },

  // 7. ENCHILADAS
  {
    id: "three-cheese-enchiladas",
    name: "Three Cheese Enchiladas",
    category: "enchiladas",
    price: 399,
    description: "Corn tortillas stuffed with cheese, smothered in red enchilada sauce, cheese, sour cream",
    isVegetarian: true,
    verifiedFromPhysicalMenu: true,
  },
  {
    id: "veg-enchiladas",
    name: "Veg Enchiladas",
    category: "enchiladas",
    price: 369,
    description: "Tortillas stuffed with vegetables, beans, cheese, enchilada sauce",
    isVegetarian: true,
    verifiedFromPhysicalMenu: true,
  },
  {
    id: "spinach-corn-enchiladas",
    name: "Spinach Corn Enchiladas",
    category: "enchiladas",
    price: 379,
    description: "Spinach, sweet corn, beans, cheese, enchilada sauce, sour cream",
    isVegetarian: true,
    verifiedFromPhysicalMenu: true,
  },

  // 8. QUESADILLAS
  {
    id: "veggie-supreme-quesadilla",
    name: "Veggie Supreme Quesadilla",
    category: "quesadillas",
    price: 339,
    description: "Bell peppers, onions, corn, cheese, served with salsa",
    isVegetarian: true,
    verifiedFromPhysicalMenu: true,
  },
  {
    id: "paneer-quesadilla",
    name: "Paneer Quesadilla",
    category: "quesadillas",
    price: 399,
    description: "Spiced paneer, onions, peppers, cheese, served with salsa",
    isVegetarian: true,
    verifiedFromPhysicalMenu: true,
  },
  {
    id: "spinach-corn-quesadilla",
    name: "Spinach Corn Quesadilla",
    category: "quesadillas",
    price: 399,
    description: "Spinach, sweet corn, cheese, served with salsa",
    isVegetarian: true,
    verifiedFromPhysicalMenu: true,
  },
  {
    id: "mushroom-cheese-quesadilla",
    name: "Mushroom Cheese Quesadilla",
    category: "quesadillas",
    price: 399,
    description: "Sauteed mushrooms, cheese, served with salsa",
    isVegetarian: true,
    verifiedFromPhysicalMenu: true,
  },

  // 9. SMOOTHIES
  {
    id: "avocado-smoothie",
    name: "Avocado Smoothie",
    category: "smoothies",
    price: 399,
    description: "Avocado, milk, cashews, dates",
    isVegetarian: true,
    isSignature: true,
    verifiedFromPhysicalMenu: true,
  },
  {
    id: "make-your-own-smoothie",
    name: "Make your Own Smoothie",
    category: "smoothies",
    price: 289,
    description: "Chocolate, Oreo",
    isVegetarian: true,
    verifiedFromPhysicalMenu: true,
  },
  {
    id: "berry-blast-smoothie",
    name: "Berry Blast Smoothie",
    category: "smoothies",
    price: 399,
    description: "Mixed berries, banana, oats, honey",
    isVegetarian: true,
    verifiedFromPhysicalMenu: true,
  },
  {
    id: "peanut-butter-banana-smoothie",
    name: "Peanut Butter Banana Smoothie",
    category: "smoothies",
    price: 339,
    description: "Peanut butter, banana, milk, dates",
    isVegetarian: true,
    verifiedFromPhysicalMenu: true,
  },

  // 10. COFFEE
  {
    id: "espresso",
    name: "Espresso",
    category: "coffee",
    price: 149,
    description: "Single or double shot of rich espresso roast",
    isVegetarian: true,
    verifiedFromPhysicalMenu: true,
  },
  {
    id: "americano",
    name: "Americano",
    category: "coffee",
    price: 169,
    description: "Espresso diluted with hot water for a clean, rich cup",
    isVegetarian: true,
    verifiedFromPhysicalMenu: true,
  },
  {
    id: "cappuccino",
    name: "Cappuccino",
    category: "coffee",
    price: 199,
    description: "Espresso with steamed milk foam",
    isVegetarian: true,
    verifiedFromPhysicalMenu: true,
  },
  {
    id: "cafe-latte",
    name: "Café Latte",
    category: "coffee",
    price: 199,
    description: "Silky steamed milk poured over espresso",
    isVegetarian: true,
    verifiedFromPhysicalMenu: true,
  },
  {
    id: "hazelnut-latte",
    name: "Hazelnut Latte",
    category: "coffee",
    price: 229,
    description: "Café latte infused with roasted hazelnut",
    isVegetarian: true,
    verifiedFromPhysicalMenu: true,
  },
  {
    id: "caramel-macchiato",
    name: "Caramel Macchiato",
    category: "coffee",
    price: 249,
    description: "Steamed milk stained with espresso and finished with caramel",
    isVegetarian: true,
    verifiedFromPhysicalMenu: true,
  },

  // 11. MOCKTAILS
  {
    id: "virgin-mojito",
    name: "Virgin Mojito",
    category: "mocktails",
    price: 229,
    description: "Muddled fresh mint, lime, sugar, and sparkling soda",
    isVegetarian: true,
    verifiedFromPhysicalMenu: true,
  },
  {
    id: "mango-spicy-cooler",
    name: "Mango Spicy Cooler",
    category: "mocktails",
    price: 225,
    description: "Tropical mango with a spiced chili-lime kick",
    isVegetarian: true,
    verifiedFromPhysicalMenu: true,
  },
  {
    id: "cucumber-mint-cooler",
    name: "Cucumber Mint Cooler",
    category: "mocktails",
    price: 229,
    description: "Crisp cucumber ribbons, fresh garden mint, and chilled fizz",
    isVegetarian: true,
    verifiedFromPhysicalMenu: true,
  },
  {
    id: "berry-hibiscus-fizz",
    name: "Berry Hibiscus Fizz",
    category: "mocktails",
    price: 319,
    description: "Steeped hibiscus floral tea with mixed berry crush",
    isVegetarian: true,
    isSignature: true,
    verifiedFromPhysicalMenu: true,
  },
  {
    id: "watermelon-basil-smash",
    name: "Watermelon Basil Smash",
    category: "mocktails",
    price: 229,
    description: "Fresh crushed watermelon and sweet basil with citrus",
    isVegetarian: true,
    verifiedFromPhysicalMenu: true,
  },
];
