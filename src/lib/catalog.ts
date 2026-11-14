import { createClient } from "next-sanity";
import {
  accessorySizeOptions,
  products as sampleProducts,
  ONE_SIZE,
  type AccessoryCategory,
  type Colorway,
  type Product,
} from "@/data/products";
import { projectId, dataset, apiVersion, sanityConfigured } from "@/sanity/env";
import { isLight } from "./color";

const client = sanityConfigured ? createClient({ projectId, dataset, apiVersion, useCdn: true }) : null;

// How often (seconds) the site checks Sanity for changes
const REVALIDATE = 60;

type SanityColor = { hex?: string } | null;
type SanityProduct = {
  slug: string;
  kind: "shoe" | "accessory";
  accessoryType?: AccessoryCategory | null;
  brand: string | null;
  name: string;
  category: Product["category"];
  gender: Product["gender"];
  price: number;
  salePrice?: number | null;
  description?: string | null;
  isNew?: boolean | null;
  featured?: boolean | null;
  colorways: {
    _key: string;
    name: string;
    imageUrl?: string | null;
    gallery?: (string | null)[] | null;
    swatch: SanityColor;
    background: SanityColor;
    inStock?: string[] | null;
    inStockInsoles?: string[] | null;
    inStockSocks?: string[] | null;
    inStockOneSize?: boolean | null;
  }[] | null;
};

const query = `*[_type == "product" && defined(slug.current) && count(colorways) > 0] | order(_createdAt desc){
  "slug": slug.current,
  "kind": coalesce(kind, "shoe"),
  accessoryType,
  "brand": brand->name,
  name, category, gender, price, salePrice, description, isNew, featured,
  colorways[]{
    _key, name, "imageUrl": image.asset->url, "gallery": gallery[].asset->url, swatch, background,
    inStock, inStockInsoles, inStockSocks, inStockOneSize
  }
}`;


function toProduct(p: SanityProduct): Product {
  const accessory = p.kind === "accessory";
  const accType: AccessoryCategory = p.accessoryType ?? "Socks";
  const stockFor = (c: NonNullable<SanityProduct["colorways"]>[number]) => {
    if (!accessory) return c.inStock ?? [];
    if (accType === "Insoles") return c.inStockInsoles ?? [];
    if (accType === "Socks") return c.inStockSocks ?? [];
    return c.inStockOneSize === false ? [] : [ONE_SIZE];
  };
  const colorways: Colorway[] = (p.colorways ?? []).map((c) => {
    const swatch = c.swatch?.hex ?? "#0b1b2b";
    return {
      id: c._key,
      name: c.name,
      upper: swatch,
      sole: isLight(swatch) ? "#38b6ff" : "#ffffff",
      accent: isLight(swatch) ? "#0b1b2b" : "#ff5a1f",
      lace: isLight(swatch) ? "#0b1b2b" : "#ffffff",
      bg: c.background?.hex ?? "#e3f4ff",
      image: c.imageUrl ? `${c.imageUrl}?w=1400&fm=webp&q=85` : undefined,
      gallery: (c.gallery ?? [])
        .filter((u): u is string => !!u)
        .map((u) => ({ src: `${u}?w=1600&fm=webp&q=85`, thumb: `${u}?w=240&h=240&fit=fillmax&bg=f1f4f6&fm=webp` })),
      inStock: stockFor(c),
    };
  });
  return {
    slug: p.slug,
    kind: accessory ? "accessory" : "shoe",
    brand: p.brand ?? "Footworx",
    name: p.name,
    category: accessory ? accType : p.category,
    gender: accessory ? "Unisex" : p.gender,
    sizes: accessory ? accessorySizeOptions[accType] : undefined,
    price: p.price,
    salePrice: p.salePrice ?? undefined,
    description: p.description ?? "",
    isNew: !!p.isNew,
    featured: !!p.featured,
    colorways,
  };
}

/** All shoes. Uses Sanity once it has products, otherwise the sample catalogue. */
export async function getProducts(): Promise<Product[]> {
  if (!client) return sampleProducts;
  try {
    const rows = await client.fetch<SanityProduct[]>(query, {}, { next: { revalidate: REVALIDATE } });
    return rows.length ? rows.map(toProduct) : sampleProducts;
  } catch (err) {
    console.error("Sanity fetch failed, showing sample products", err);
    return sampleProducts;
  }
}

export async function getProduct(slug: string) {
  return (await getProducts()).find((p) => p.slug === slug);
}

/** The big floating shoe on the home page: the newest featured shoe (accessories never) */
export async function getFeatured() {
  const shoes = (await getProducts()).filter((p) => p.kind === "shoe");
  return shoes.find((p) => p.featured) ?? shoes[0];
}

export { productHref } from "./links";

export async function isSampleCatalogue() {
  return (await getProducts()) === sampleProducts;
}
