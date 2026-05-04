import chicken from "@/assets/menu-chicken.jpg";
import burger from "@/assets/menu-burger.jpg";
import fries from "@/assets/menu-fries.jpg";
import combo from "@/assets/menu-combo.jpg";
import wings from "@/assets/menu-wings.jpg";
import drink from "@/assets/menu-drink.jpg";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: "Chicken" | "Burgers" | "Combos" | "Sides" | "Drinks";
  bestseller?: boolean;
  deal?: boolean;
};

export const categories = ["Chicken", "Burgers", "Combos", "Sides", "Drinks"] as const;

export const menu: MenuItem[] = [
  { id: "c1", name: "Crispy Bucket (8 pcs)", description: "Eight pieces of our signature golden crispy chicken.", price: 12.99, image: chicken, category: "Chicken", bestseller: true },
  { id: "c2", name: "Hot Wings (6 pcs)", description: "Spicy glazed wings with our secret peri sauce.", price: 6.5, image: wings, category: "Chicken" },
  { id: "c3", name: "Quarter Chicken & Chips", description: "Juicy quarter chicken with golden chips.", price: 5.99, image: combo, category: "Chicken", deal: true },
  { id: "b1", name: "Slice Zinger Burger", description: "Crispy chicken fillet, lettuce and zinger sauce.", price: 4.5, image: burger, category: "Burgers", bestseller: true },
  { id: "b2", name: "Double Crunch Burger", description: "Two crunchy fillets, cheese and signature sauce.", price: 6.99, image: burger, category: "Burgers" },
  { id: "co1", name: "Family Feast Combo", description: "8 pcs chicken, large chips, 4 rolls & 1.5L drink.", price: 24.99, image: combo, category: "Combos", deal: true, bestseller: true },
  { id: "co2", name: "Slice Lunch Combo", description: "2 pcs chicken, chips and a soft drink.", price: 5.5, image: combo, category: "Combos" },
  { id: "s1", name: "Crispy Chips", description: "Golden, perfectly seasoned fries.", price: 2.5, image: fries, category: "Sides", bestseller: true },
  { id: "s2", name: "Coleslaw", description: "Cool and creamy fresh coleslaw.", price: 1.99, image: fries, category: "Sides" },
  { id: "d1", name: "Cherry Plum Soda", description: "Ice-cold local Zim favourite.", price: 1.5, image: drink, category: "Drinks" },
  { id: "d2", name: "1.5L Family Drink", description: "Shareable bottle, perfect with a feast.", price: 2.99, image: drink, category: "Drinks" },
];

export const testimonials = [
  { name: "Tafadzwa M.", city: "Harare", rating: 5, text: "Crispiest chicken in Zim! The Zinger burger is a must-try. Always fresh, always hot." },
  { name: "Rumbi K.", city: "Bulawayo", rating: 5, text: "Family Feast on a Sunday is now a tradition. Great prices and the wings are fire 🔥" },
  { name: "Kuda N.", city: "Mutare", rating: 4, text: "Fast delivery and the food arrives hot. Slice Lunch Combo is unbeatable value." },
  { name: "Anesu T.", city: "Gweru", rating: 5, text: "Proudly Zimbabwean and proudly delicious. My kids ask for Chicken Slice every weekend!" },
];

export const locations = [
  { city: "Harare", branches: ["Borrowdale", "Avondale", "Eastgate", "Sam Levy's"] },
  { city: "Bulawayo", branches: ["City Centre", "Hillside"] },
  { city: "Mutare", branches: ["Main Street"] },
  { city: "Gweru", branches: ["Town Centre"] },
  { city: "Masvingo", branches: ["Robert Mugabe Way"] },
];

export type Store = {
  id: string;
  city: string;
  branch: string;
  address: string;
  phone: string;
  hours: string;
  services: ("Dine-in" | "Takeaway" | "Delivery" | "Drive-thru")[];
  mapsQuery: string;
};

export const stores: Store[] = [
  { id: "hre-borrowdale", city: "Harare", branch: "Borrowdale", address: "Sam Levy's Village, Borrowdale Rd", phone: "+263 77 123 4567", hours: "10am – 10pm", services: ["Dine-in", "Takeaway", "Delivery"], mapsQuery: "Sam Levy's Village Borrowdale Harare" },
  { id: "hre-avondale", city: "Harare", branch: "Avondale", address: "Avondale Shopping Centre, King George Rd", phone: "+263 77 234 5678", hours: "10am – 10pm", services: ["Dine-in", "Takeaway", "Delivery"], mapsQuery: "Avondale Shopping Centre Harare" },
  { id: "hre-eastgate", city: "Harare", branch: "Eastgate", address: "Eastgate Mall, Robert Mugabe Rd", phone: "+263 77 345 6789", hours: "9am – 9pm", services: ["Dine-in", "Takeaway"], mapsQuery: "Eastgate Mall Harare" },
  { id: "hre-samlevys", city: "Harare", branch: "Sam Levy's", address: "Sam Levy's Piazza, Borrowdale", phone: "+263 77 456 7890", hours: "10am – 10pm", services: ["Dine-in", "Takeaway", "Drive-thru"], mapsQuery: "Sam Levy's Piazza Harare" },
  { id: "byo-city", city: "Bulawayo", branch: "City Centre", address: "Joshua Mqabuko Nkomo St", phone: "+263 77 567 8901", hours: "9am – 9pm", services: ["Dine-in", "Takeaway", "Delivery"], mapsQuery: "Bulawayo City Centre" },
  { id: "byo-hillside", city: "Bulawayo", branch: "Hillside", address: "Hillside Shopping Centre", phone: "+263 77 678 9012", hours: "10am – 9pm", services: ["Dine-in", "Takeaway"], mapsQuery: "Hillside Shopping Centre Bulawayo" },
  { id: "mut-main", city: "Mutare", branch: "Main Street", address: "Herbert Chitepo St", phone: "+263 77 789 0123", hours: "9am – 9pm", services: ["Dine-in", "Takeaway", "Delivery"], mapsQuery: "Main Street Mutare" },
  { id: "gwe-town", city: "Gweru", branch: "Town Centre", address: "Robert Mugabe Way", phone: "+263 77 890 1234", hours: "9am – 9pm", services: ["Dine-in", "Takeaway"], mapsQuery: "Gweru Town Centre" },
  { id: "mas-rmway", city: "Masvingo", branch: "Robert Mugabe Way", address: "Robert Mugabe Way, CBD", phone: "+263 77 901 2345", hours: "10am – 9pm", services: ["Takeaway", "Delivery"], mapsQuery: "Robert Mugabe Way Masvingo" },
];