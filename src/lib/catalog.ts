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
  support?: Product["support"] | null;
  cushioning?: Product["cushioning"] | null;
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
  support,
  cushioning,
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
    support: accessory ? undefined : (p.support ?? undefined),
    cushioning: accessory ? undefined : (p.cushioning ?? undefined),
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

export type BrandInfo = { name: string; logo?: string };

/** Brands with uploaded logos, from Sanity (name -> logo url) */
export async function getBrandLogos(): Promise<Record<string, string>> {
  if (!client) return {};
  try {
    const rows = await client.fetch<{ name: string; logo: string | null }[]>(
      `*[_type == "brand" && defined(logo.asset)]{ name, "logo": logo.asset->url }`,
      {},
      { next: { revalidate: REVALIDATE } },
    );
    return Object.fromEntries(rows.filter((r) => r.logo).map((r) => [r.name.trim().toLowerCase(), r.logo as string]));
  } catch (err) {
    console.error("Sanity brand fetch failed", err);
    return {};
  }
}

export async function isSampleCatalogue() {
  return (await getProducts()) === sampleProducts;
}

// ---------- Category stories (photo banners on shop pages) ----------

export type StoryImage = { url: string; alt: string; position: string };
export type Story = { headline: string; subtitle?: string; main?: StoryImage; images: StoryImage[] };

type SanityStoryImage = { url: string | null; alt?: string | null; hotspot?: { x: number; y: number } | null } | null;

const toImage = (i: SanityStoryImage, w: number): StoryImage | undefined =>
  i?.url
    ? {
        url: `${i.url}?w=${w}&fm=webp&q=80`,
        alt: i.alt ?? "",
        position: i.hotspot ? `${Math.round(i.hotspot.x * 100)}% ${Math.round(i.hotspot.y * 100)}%` : "50% 50%",
      }
    : undefined;

/** The story for a shop page key ("all", "shoes", "accessories" or a category), or null */
export async function getStory(page: string): Promise<Story | null> {
  if (!client) return null;
  try {
    const row = await client.fetch<{
      headline: string;
      subtitle?: string | null;
      main: SanityStoryImage;
      images: SanityStoryImage[] | null;
    } | null>(
      `*[_type == "categoryStory" && page == $page] | order(_updatedAt desc)[0]{
        headline, subtitle,
        "main": { "url": mainImage.asset->url, "alt": mainImage.alt, "hotspot": mainImage.hotspot },
        "images": images[]{ "url": asset->url, alt, hotspot }
      }`,
      { page },
      { next: { revalidate: REVALIDATE } },
    );
    if (!row) return null;
    return {
      headline: row.headline,
      subtitle: row.subtitle ?? undefined,
      main: toImage(row.main, 1800),
      images: (row.images ?? []).map((i) => toImage(i, 900)).filter((i): i is StoryImage => !!i).slice(0, 3),
    };
  } catch (err) {
    console.error("Sanity story fetch failed", err);
    return null;
  }
}
