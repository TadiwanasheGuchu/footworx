import type { Product } from "@/data/products";

/** Where a product's page lives: /shoes/<slug> or /accessories/<slug> */
export function productHref(p: Pick<Product, "kind" | "slug">) {
  return `/${p.kind === "accessory" ? "accessories" : "shoes"}/${p.slug}`;
}
