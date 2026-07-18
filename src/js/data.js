import { fetchMenu } from "./api.js";

// Used only if the backend is unreachable, so the site still renders.
const fallbackMenuItems = [
  {
    id: 1,
    name: "Caramel Oat Cloud",
    category: "coffee",
    image: "/assets/photo/p9.jpg",
    rating: 4.3,
    description:
      "Smooth espresso paired with creamy oat milk and a sweet swirl of caramel, topped with a velvety cloud of cold foam.",
    price: 5.45,
  },
  {
    id: 2,
    name: "Dark Choco Mocha",
    category: "cold-brew",
    image: "/assets/photo/p10.jpg",
    rating: 4.5,
    description:
      "Rich, dark roasted espresso blended with premium bittersweet chocolate and warm milk, finished with whipped cream.",
    price: 6.15,
  },
  {
    id: 3,
    name: "Wild Rose Hibiscus",
    category: "tea",
    image: "/assets/photo/p15.jpg",
    rating: 4.0,
    description:
      "An iced herbal infusion pairing tangy hibiscus with delicate floral notes of wild rose. Naturally sweet, crisp, and deeply refreshing.",
    price: 6.25,
  },
  {
    id: 4,
    name: "Ceremonial Matcha",
    category: "tea",
    image: "/assets/photo/p11.jpg",
    rating: 4.9,
    description:
      "Premium Japanese ceremonial-grade matcha whisked into a smooth, vibrant, and antioxidant-rich green tea latte.",
    price: 5.75,
  },
  {
    id: 5,
    name: "Signature Flat White",
    category: "coffee",
    image: "/assets/photo/p12.jpg",
    rating: 4.8,
    description:
      "A velvety shot of light-roast espresso topped with a thin, smooth layer of perfectly steamed microfoam milk.",
    price: 4.95,
  },
  {
    id: 6,
    name: "Croissant",
    category: "snacks",
    image: "/assets/photo/p13.jpg",
    rating: 4.2,
    description:
      "A freshly baked, buttery, and flaky croissant—the perfect companion to your morning coffee.",
    price: 3.95,
  },
  {
    id: 7,
    name: "Caramel Cloud",
    category: "coffee",
    image: "/assets/photo/p2.jpg",
    rating: 4.9,
    description: "Light and fluffy cold foam over rich caramel espresso.",
    price: 5.5,
  },
  {
    id: 8,
    name: "Velvet Matcha",
    category: "tea",
    image: "/assets/photo/p3.jpg",
    rating: 4.8,
    description: "Premium ceremonial grade matcha with silky oat milk.",
    price: 6.25,
  },
  {
    id: 9,
    name: "Hazelnut Dream",
    category: "coffee",
    image: "/assets/photo/p4.jpg",
    rating: 5.0,
    description:
      "Rich espresso with toasted hazelnut notes and praline finish.",
    price: 5.75,
  },
  {
    id: 10,
    name: "Signature Cold",
    category: "tea", // សម្គាល់៖ ក្នុង HTML ដើមរបស់អ្នកដាក់ tea តែឈ្មោះ Signature Cold (អាចជា Cold Brew)
    image: "/assets/photo/p5.jpg",
    rating: 4.7,
    description: "12-hour slow steeped cold blew with a chocolatey finish.",
    price: 4.95,
  },
  {
    id: 11,
    name: "Salted Caramel Cold",
    category: "cold-brew",
    image: "/assets/photo/p16.jpg",
    rating: 5.0,
    description:
      "Smooth iced cold brew elevated with rich caramel syrup and topped with a luxurious, savory-sweet salted cold foam.",
    price: 7.5,
  },
  {
    id: 12,
    name: "Salted Caramel Cream",
    category: "cold-brew",
    image: "/assets/photo/p17.jpg",
    rating: 4.8,
    description:
      "An indulgent combination of bold espresso, creamy milk, and rich caramel syrup, elevated with a velvety blanket of signature salted cream.",
    price: 5.45,
  },
];

export const menuItems = [];

export async function loadMenuItems() {

    try {

        const items = await fetchMenu();
        menuItems.push(...items);

    } catch (err) {

        console.warn("Could not reach the backend, using fallback menu:", err.message);
        menuItems.push(...fallbackMenuItems);
    }
    return menuItems;

}

