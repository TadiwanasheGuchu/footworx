import type { Metadata } from "next";
import Link from "next/link";
import { getProducts } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";
import { accessoryCategories, shoeCategories, type Product } from "@/data/products";

export const metadata: Metadata = { title: "Shop shoes & accessories" };

type Kind = Product["kind"];
type Query = { kind?: string; brand?: string; category?: string };
type Search = { searchParams: Promise<Query> };

const isAccessoryCategory = (c?: string) => !!c && (accessoryCategories as readonly string[]).includes(c);
const isShoeCategory = (c?: string) => !!c && (shoeCategories as readonly string[]).includes(c);

export default async function ShopPage({ searchParams }: Search) {
  const q = await searchParams;
  const category = isShoeCategory(q.category) || isAccessoryCategory(q.category) ? q.category : undefined;
  // A category decides the kind; otherwise use ?kind=shoe|accessory
  const kind: Kind | undefined = isAccessoryCategory(category)
    ? "accessory"
    : isShoeCategory(category)
      ? "shoe"
      : q.kind === "shoe" || q.kind === "accessory"
        ? q.kind
        : undefined;
  const brand = q.brand;

  const products = await getProducts();
  const inKind = products.filter((p) => !kind || p.kind === kind);
  const brands = [...new Set(inKind.map((p) => p.brand))].sort();
  const list = inKind.filter((p) => (!brand || p.brand === brand) && (!category || p.category === category));
  // Shoes first when showing everything
  list.sort((a, b) => Number(a.kind === "accessory") - Number(b.kind === "accessory"));

  const href = (next: { kind?: Kind; brand?: string; category?: string }) => {
    const sp = new URLSearchParams();
    if (next.kind) sp.set("kind", next.kind);
    if (next.category) sp.set("category", next.category);
    if (next.brand) sp.set("brand", next.brand);
    const s = sp.toString();
    return s ? `/shop?${s}` : "/shop";
  };

  const pill = (active: boolean) =>
    `rounded-full px-4 py-2 text-[15px] font-medium transition-colors ${active ? "bg-ink text-white" : "bg-tile hover:bg-[#e3e8ec]"}`;

  const kindLabel = kind === "accessory" ? "Accessories" : kind === "shoe" ? "Shoes" : "Shop all";
  const title = [brand, category ?? (kind ? kindLabel : null)].filter(Boolean).join(" ") || kindLabel;
  const noun = kind === "shoe" ? ["shoe", "shoes"] : ["product", "products"];
  const types = kind === "accessory" ? accessoryCategories : kind === "shoe" ? shoeCategories : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-8">
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
        <p className="text-steel">
          {list.length} {list.length === 1 ? noun[0] : noun[1]}
        </p>
      </div>

      <div className="mb-10 flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Shoes or accessories">
          <Link href="/shop" className={pill(!kind)}>Everything</Link>
          <Link href={href({ kind: "shoe" })} className={pill(kind === "shoe")}>Shoes</Link>
          <Link href={href({ kind: "accessory" })} className={pill(kind === "accessory")}>Accessories</Link>
        </div>
        {types.length > 0 && (
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by type">
            <Link href={href({ kind, brand })} className={pill(!category)}>
              All {kind === "accessory" ? "accessories" : "shoes"}
            </Link>
            {types.map((c) => (
              <Link key={c} href={href({ kind, brand, category: c })} className={pill(category === c)}>
                {c}
              </Link>
            ))}
          </div>
        )}
        {brands.length > 1 && (
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by brand">
            <Link href={href({ kind, category })} className={pill(!brand)}>All brands</Link>
            {brands.map((b) => (
              <Link key={b} href={href({ kind, brand: b, category })} className={pill(brand === b)}>
                {b}
              </Link>
            ))}
          </div>
        )}
      </div>

      {list.length ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((p) => (
            <ProductCard key={`${p.kind}-${p.slug}`} product={p} />
          ))}
        </div>
      ) : (
        <p className="text-lg">
          Nothing matches those filters yet. <Link href="/shop" className="font-semibold underline">Clear filters</Link>
        </p>
      )}
    </div>
  );
}
