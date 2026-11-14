// SAMPLE catalogue for the prototype. Names, prices and stock are placeholders.
// Later this comes from Sanity, where staff manage the real products.

export type Colorway = {
  id: string;
  name: string;
  // Colors for the placeholder shoe drawing (replaced by photos later)
  upper: string;
  sole: string;
  accent: string;
  lace: string;
  // Background behind the floating shoe for this colorway
  bg: string;
  // Path to a transparent product photo, once we have real images
  image?: string;
  // EU sizes in stock for this colorway
  inStock: string[];
};

export type Product = {
  slug: string;
  brand: string;
  name: string;
  category: "Running" | "Football" | "Casual" | "Trail";
  gender: "Men" | "Women" | "Unisex" | "Kids";
  price: number;
  description: string;
  isNew?: boolean;
  featured?: boolean;
  salePrice?: number;
  colorways: Colorway[];
};

export const allSizes = ["38", "39", "40", "41", "42", "43", "44", "45", "46"];

export const products: Product[] = [
  {
    slug: "sample-road-runner",
    brand: "Hoka",
    name: "Sample Road Runner",
    category: "Running",
    gender: "Unisex",
    price: 2999,
    isNew: true,
    description:
      "Placeholder description. A cushioned everyday running shoe for long kilometres on Windhoek's roads.",
    colorways: [
      { id: "navy", name: "Navy / White", upper: "#0b1b2b", sole: "#ffffff", accent: "#ff5a1f", lace: "#ffffff", bg: "#38b6ff", inStock: ["40", "41", "42", "43", "44"] },
      { id: "dune", name: "Dune Orange", upper: "#ff5a1f", sole: "#0b1b2b", accent: "#0b1b2b", lace: "#ffffff", bg: "#ffc7b0", inStock: ["39", "41", "42"] },
      { id: "cloud", name: "Cloud White", upper: "#ffffff", sole: "#38b6ff", accent: "#38b6ff", lace: "#0b1b2b", bg: "#bfe6ff", inStock: ["38", "40", "42", "44", "45"] },
      { id: "sky", name: "Footworx Blue", upper: "#38b6ff", sole: "#ffffff", accent: "#0b1b2b", lace: "#0b1b2b", bg: "#e4eef5", inStock: ["41", "42", "43"] },
    ],
  },
  {
    slug: "sample-max-cushion",
    brand: "Hoka",
    name: "Sample Max Cushion",
    category: "Running",
    gender: "Women",
    price: 3299,
    description: "Placeholder description. Maximum cushioning for recovery runs and long days on your feet.",
    colorways: [
      { id: "black", name: "Black", upper: "#1c1f24", sole: "#1c1f24", accent: "#38b6ff", lace: "#ffffff", bg: "#bfe6ff", inStock: ["38", "39", "40", "41"] },
      { id: "lilac", name: "Pale Lilac", upper: "#d9cff5", sole: "#ffffff", accent: "#0b1b2b", lace: "#0b1b2b", bg: "#efeaff", inStock: ["38", "40"] },
    ],
  },
  {
    slug: "sample-trail",
    brand: "Hoka",
    name: "Sample Trail",
    category: "Trail",
    gender: "Men",
    price: 3199,
    salePrice: 2699,
    description: "Placeholder description. Grippy trail shoe for gravel, dunes and mountain paths.",
    colorways: [
      { id: "olive", name: "Olive / Dune", upper: "#4d5a3a", sole: "#ff5a1f", accent: "#ff5a1f", lace: "#f4f7fa", bg: "#dfe6cf", inStock: ["42", "43", "44", "45", "46"] },
      { id: "stone", name: "Stone Grey", upper: "#8a99a8", sole: "#0b1b2b", accent: "#0b1b2b", lace: "#ffffff", bg: "#e4eef5", inStock: ["41", "42"] },
    ],
  },
  {
    slug: "sample-football-boot",
    brand: "Joma",
    name: "Sample Football Boot",
    category: "Football",
    gender: "Men",
    price: 1899,
    isNew: true,
    description: "Placeholder description. Firm-ground football boot with a light, responsive feel.",
    colorways: [
      { id: "white", name: "White / Blue", upper: "#ffffff", sole: "#38b6ff", accent: "#38b6ff", lace: "#0b1b2b", bg: "#38b6ff", inStock: ["39", "40", "41", "42", "43", "44"] },
      { id: "red", name: "Signal Red", upper: "#d92b2b", sole: "#ffffff", accent: "#0b1b2b", lace: "#ffffff", bg: "#ffd3d3", inStock: ["40", "42"] },
    ],
  },
  {
    slug: "sample-daily-trainer",
    brand: "Joma",
    name: "Sample Daily Trainer",
    category: "Running",
    gender: "Unisex",
    price: 1499,
    salePrice: 1199,
    description: "Placeholder description. Affordable, comfortable trainer for running and the gym.",
    colorways: [
      { id: "grey", name: "Grey / Orange", upper: "#5b6b7a", sole: "#ffffff", accent: "#ff5a1f", lace: "#ffffff", bg: "#ffe3d8", inStock: ["38", "39", "40", "41", "42", "43"] },
      { id: "navy", name: "Navy", upper: "#0b1b2b", sole: "#ffffff", accent: "#38b6ff", lace: "#ffffff", bg: "#bfe6ff", inStock: ["41", "42", "43", "44"] },
    ],
  },
  {
    slug: "sample-court-casual",
    brand: "Joma",
    name: "Sample Court Casual",
    category: "Casual",
    gender: "Women",
    price: 1299,
    description: "Placeholder description. Clean everyday sneaker that goes with everything.",
    colorways: [
      { id: "white", name: "All White", upper: "#ffffff", sole: "#ffffff", accent: "#dde4ea", lace: "#dde4ea", bg: "#e4eef5", inStock: ["37", "38", "39", "40", "41"] },
      { id: "sand", name: "Dune Pink", upper: "#ffc7b0", sole: "#ffffff", accent: "#ff5a1f", lace: "#ffffff", bg: "#fff0e9", inStock: ["38", "39"] },
    ],
  },
];

