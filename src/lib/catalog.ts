import { createClient } from "next-sanity";
import { products as sampleProducts, type Product, type Colorway } from "@/data/products";
import { projectId, dataset, apiVersion, sanityConfigured } from "@/sanity/env";
import { isLight } from "./color";

const client = sanityConfigured ? createClient({ projectId, dataset, apiVersion, useCdn: true }) : null;

// How often (seconds) the site checks Sanity for changes
const REVALIDATE = 60;

type SanityColor = { hex?: string } | null;
type SanityProduct = {
  slug: string;
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
    swatch: SanityColor;
    background: SanityColor;
    inStock?: string[] | null;
  }[] | null;
};

const query = `*[_type == "product" && defined(slug.current) && count(colorways) > 0] | order(_createdAt desc){
  "slug": slug.current,
  "brand": brand->name,
  name, category, gender, price, salePrice, description, isNew, featured,
  colorways[]{ _key, name, "imageUrl": image.asset->url, swatch, background, inStock }
}`;


function toProduct(p: SanityProduct): Product {
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
      inStock: c.inStock ?? [],
    };
  });
  return {
    slug: p.slug,
    brand: p.brand ?? "Footworx",
    name: p.name,
    category: p.category,
    gender: p.gender,
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

export async function getFeatured() {
  const all = await getProducts();
  return all.find((p) => p.featured) ?? all[0];
}

export async function isSampleCatalogue() {
  return (await getProducts()) === sampleProducts;
}
