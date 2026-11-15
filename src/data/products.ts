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
  // Extra photos (other angles, sole, on foot) shown as a gallery on the shoe page
  gallery?: { src: string; thumb: string }[];
  // EU sizes in stock for this colorway
  inStock: string[];
};

export const shoeCategories = ["Running", "Trail", "Football", "Casual"] as const;
export const accessoryCategories = ["Clothing", "Insoles", "Socks", "Headphones"] as const;
export type ShoeCategory = (typeof shoeCategories)[number];
export type AccessoryCategory = (typeof accessoryCategories)[number];

export type Product = {
  slug: string;
  /** "shoe" gets the floating, tilted shoe; "accessory" a straight product view */
  kind: "shoe" | "accessory";
  brand: string;
  name: string;
  category: ShoeCategory | AccessoryCategory;
  gender: "Men" | "Women" | "Unisex" | "Kids";
  /** Size options to show; defaults to EU shoe sizes. ["One size"] hides the size picker. */
  sizes?: string[];
  /** Shoes only, used by the Shoe Finder */
  support?: "Neutral" | "Stability";
  cushioning?: "Soft" | "Balanced" | "Firm";
  price: number;
  description: string;
  isNew?: boolean;
  featured?: boolean;
  salePrice?: number;
  colorways: Colorway[];
};

export const allSizes = ["38", "39", "40", "41", "42", "43", "44", "45", "46"];
export const ONE_SIZE = "One size";

/** Size options per accessory category (staff tick from these in Sanity) */
export const accessorySizeOptions: Record<AccessoryCategory, string[]> = {
  Insoles: ["36-37", "38-39", "40-41", "42-43", "44-45", "46-47"],
  Socks: ["S (35-38)", "M (39-42)", "L (43-46)", "XL (47-50)"],
  Headphones: [ONE_SIZE],
  Clothing: ["XS", "S", "M", "L", "XL", "XXL"],
};

export function sizesFor(p: Product) {
  return p.sizes ?? allSizes;
}

export const products: Product[] = [
  {
    kind: "shoe",
    slug: "sample-road-runner",
    support: "Neutral",
    cushioning: "Balanced",
    brand: "Hoka",
    name: "Sample Road Runner",
    category: "Running",
    gender: "Unisex",
    price: 2999,
    isNew: true,
    description:
      "Placeholder description. A cushioned everyday running shoe for long kilometres on Walvis Bay's roads.",
    colorways: [
      { id: "navy", name: "Navy / White", upper: "#0b1b2b", sole: "#ffffff", accent: "#ff5a1f", lace: "#ffffff", bg: "#d6efff", inStock: ["40", "41", "42", "43", "44"] },
      { id: "dune", name: "Dune Orange", upper: "#ff5a1f", sole: "#0b1b2b", accent: "#0b1b2b", lace: "#ffffff", bg: "#ffe6dc", inStock: ["39", "41", "42"] },
      { id: "cloud", name: "Cloud White", upper: "#ffffff", sole: "#38b6ff", accent: "#38b6ff", lace: "#0b1b2b", bg: "#e3f4ff", inStock: ["38", "40", "42", "44", "45"] },
      { id: "sky", name: "Footworx Blue", upper: "#38b6ff", sole: "#ffffff", accent: "#0b1b2b", lace: "#0b1b2b", bg: "#e4eef5", inStock: ["41", "42", "43"] },
    ],
  },
  {
    kind: "shoe",
    slug: "sample-max-cushion",
    support: "Neutral",
    cushioning: "Soft",
    brand: "Hoka",
    name: "Sample Max Cushion",
    category: "Running",
    gender: "Women",
    price: 3299,
    description: "Placeholder description. Maximum cushioning for recovery runs and long days on your feet.",
    colorways: [
      { id: "black", name: "Black", upper: "#1c1f24", sole: "#1c1f24", accent: "#38b6ff", lace: "#ffffff", bg: "#e3f4ff", inStock: ["38", "39", "40", "41"] },
      { id: "lilac", name: "Pale Lilac", upper: "#d9cff5", sole: "#ffffff", accent: "#0b1b2b", lace: "#0b1b2b", bg: "#efeaff", inStock: ["38", "40"] },
    ],
  },
  {
    kind: "shoe",
    slug: "sample-trail",
    support: "Neutral",
    cushioning: "Balanced",
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
    kind: "shoe",
    slug: "sample-football-boot",
    support: "Neutral",
    cushioning: "Firm",
    brand: "Joma",
    name: "Sample Football Boot",
    category: "Football",
    gender: "Men",
    price: 1899,
    isNew: true,
    description: "Placeholder description. Firm-ground football boot with a light, responsive feel.",
    colorways: [
      { id: "white", name: "White / Blue", upper: "#ffffff", sole: "#38b6ff", accent: "#38b6ff", lace: "#0b1b2b", bg: "#d6efff", inStock: ["39", "40", "41", "42", "43", "44"] },
      { id: "red", name: "Signal Red", upper: "#d92b2b", sole: "#ffffff", accent: "#0b1b2b", lace: "#ffffff", bg: "#ffe5e5", inStock: ["40", "42"] },
    ],
  },
  {
    kind: "shoe",
    slug: "sample-daily-trainer",
    support: "Stability",
    cushioning: "Balanced",
    brand: "Joma",
    name: "Sample Daily Trainer",
    category: "Running",
    gender: "Unisex",
    price: 1499,
    salePrice: 1199,
    description: "Placeholder description. Affordable, comfortable trainer for running and the gym.",
    colorways: [
      { id: "grey", name: "Grey / Orange", upper: "#5b6b7a", sole: "#ffffff", accent: "#ff5a1f", lace: "#ffffff", bg: "#ffe3d8", inStock: ["38", "39", "40", "41", "42", "43"] },
      { id: "navy", name: "Navy", upper: "#0b1b2b", sole: "#ffffff", accent: "#38b6ff", lace: "#ffffff", bg: "#e3f4ff", inStock: ["41", "42", "43", "44"] },
    ],
  },
  {
    kind: "shoe",
    slug: "sample-court-casual",
    support: "Neutral",
    cushioning: "Firm",
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
  {
    kind: "accessory",
    slug: "sample-support-insoles",
    brand: "Footworx",
    name: "Sample Support Insoles",
    category: "Insoles",
    gender: "Unisex",
    sizes: ["36-37", "38-39", "40-41", "42-43", "44-45", "46-47"],
    price: 699,
    description: "Placeholder description. Arch-support insoles, fitted after your foot assessment.",
    colorways: [
      { id: "blue", name: "Blue", upper: "#38b6ff", sole: "#0b1b2b", accent: "#0b1b2b", lace: "#ffffff", bg: "#e3f4ff", inStock: ["38-39", "40-41", "42-43"] },
    ],
  },
  {
    kind: "accessory",
    slug: "sample-running-socks",
    brand: "Footworx",
    name: "Sample Running Socks",
    category: "Socks",
    gender: "Unisex",
    sizes: ["S (35-38)", "M (39-42)", "L (43-46)", "XL (47-50)"],
    price: 189,
    isNew: true,
    description: "Placeholder description. Cushioned, blister-resistant running socks.",
    colorways: [
      { id: "white", name: "White", upper: "#ffffff", sole: "#38b6ff", accent: "#38b6ff", lace: "#0b1b2b", bg: "#e3f4ff", inStock: ["S (35-38)", "M (39-42)", "L (43-46)"] },
      { id: "black", name: "Black", upper: "#1c1f24", sole: "#ff5a1f", accent: "#ff5a1f", lace: "#ffffff", bg: "#ffe6dc", inStock: ["M (39-42)", "L (43-46)"] },
    ],
  },
  {
    kind: "accessory",
    slug: "sample-sport-headphones",
    brand: "Footworx",
    name: "Sample Sport Headphones",
    category: "Headphones",
    gender: "Unisex",
    sizes: ["One size"],
    price: 1499,
    description: "Placeholder description. Open-ear sport headphones that stay put on the run.",
    colorways: [
      { id: "black", name: "Black", upper: "#1c1f24", sole: "#38b6ff", accent: "#38b6ff", lace: "#ffffff", bg: "#e3f4ff", inStock: ["One size"] },
    ],
  },
];

