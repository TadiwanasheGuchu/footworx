import type { Product } from "@/data/products";

export type GiftIdea = {
  id: string;
  title: string;
  text: string;
  /** Products for this idea; empty for vouchers handled on WhatsApp */
  pick?: (p: Product) => boolean;
  /** WhatsApp message instead of a product list */
  whatsapp?: string;
  /** Card background */
  bg: string;
};

const price = (p: Product) => p.salePrice ?? p.price;

export const giftIdeas: GiftIdea[] = [
  {
    id: "runner",
    title: "For the runner",
    text: "Road shoes for the promenade and race day.",
    pick: (p) => p.kind === "shoe" && p.category === "Running",
    bg: "#e3f4ff",
  },
  {
    id: "trail",
    title: "For the trail lover",
    text: "Grip for gravel, sand and the dunes.",
    pick: (p) => p.kind === "shoe" && p.category === "Trail",
    bg: "#e6ecdf",
  },
  {
    id: "all-day",
    title: "On their feet all day",
    text: "Soft, cushioned shoes and supportive insoles.",
    pick: (p) => (p.kind === "shoe" && (p.cushioning === "Soft" || p.category === "Casual")) || p.category === "Insoles",
    bg: "#fff0e9",
  },
  {
    id: "football",
    title: "For the football player",
    text: "Boots for firm ground and astro.",
    pick: (p) => p.kind === "shoe" && p.category === "Football",
    bg: "#e3f4ff",
  },
  {
    id: "under-300",
    title: "Under N$ 300",
    text: "Stocking fillers: socks and small extras.",
    pick: (p) => price(p) <= 300,
    bg: "#fff0e9",
  },
  {
    id: "under-1000",
    title: "Under N$ 1 000",
    text: "Insoles, headphones and accessories.",
    pick: (p) => price(p) <= 1000,
    bg: "#e6ecdf",
  },
  {
    id: "under-2000",
    title: "Under N$ 2 000",
    text: "Great shoes and gifts that won’t break the bank.",
    pick: (p) => price(p) <= 2000,
    bg: "#e3f4ff",
  },
  {
    id: "assessment",
    title: "Gift a foot assessment",
    text: "The gift of the right fit: we assess their feet and help them choose.",
    whatsapp: "Hi Footworx, I'd like to buy a foot assessment as a gift.",
    bg: "#0b1b2b",
  },
  {
    id: "voucher",
    title: "Footworx gift voucher",
    text: "Let them choose. Spend it in store on shoes or accessories.",
    whatsapp: "Hi Footworx, I'd like to buy a gift voucher.",
    bg: "#38b6ff",
  },
];

export function productsFor(idea: GiftIdea, products: Product[]) {
  if (!idea.pick) return [];
  // Budget ideas: closest to the budget first (the best gift for the money)
  const list = products.filter(idea.pick);
  return idea.id.startsWith("under-") ? list.sort((a, b) => price(b) - price(a)) : list;
}

export function onSale(products: Product[]) {
  const off = (p: Product) => (p.salePrice ? 1 - p.salePrice / p.price : 0);
  return products.filter((p) => p.salePrice && p.salePrice < p.price).sort((a, b) => off(b) - off(a));
}
