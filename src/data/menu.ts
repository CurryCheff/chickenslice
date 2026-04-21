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