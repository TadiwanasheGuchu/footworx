import type { Metadata } from "next";
import Link from "next/link";
import { getProducts } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";

export const metadata: Metadata = { title: "Shop all shoes" };

const categories = ["Running", "Trail", "Football", "Casual"] as const;

type Search = { searchParams: Promise<{ brand?: string; category?: string }> };

export default async function ShopPage({ searchParams }: Search) {
  const { brand, category } = await searchParams;
  const products = await getProducts();
  const brands = [...new Set(products.map((p) => p.brand))].sort();
  const list = products.filter((p) => (!brand || p.brand === brand) && (!category || p.category === category));

  const href = (next: { brand?: string; category?: string }) => {
    const q = new URLSearchParams();
    if (next.brand) q.set("brand", next.brand);
    if (next.category) q.set("category", next.category);
    const s = q.toString();
    return s ? `/shop?${s}` : "/shop";
  };

  const chip = (active: boolean) =>
    `rounded-[2px] border-2 px-4 py-2 text-[15px] font-bold ${active ? "border-ink bg-ink text-white" : "border-ink bg-white hover:bg-blue-soft"}`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-8">
      <h1 className="display mb-8 text-6xl sm:text-7xl">{brand ?? "All shoes"}</h1>

      <div className="mb-10 flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by brand">
          <span className="label mr-2 text-steel">Brand</span>
          <Link href={href({ category })} className={chip(!brand)}>All</Link>
          {brands.map((b) => (
            <Link key={b} href={href({ brand: b, category })} className={chip(brand === b)}>{b}</Link>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by category">
          <span className="label mr-2 text-steel">Type</span>
          <Link href={href({ brand })} className={chip(!category)}>All</Link>
          {categories.map((c) => (
            <Link key={c} href={href({ brand, category: c })} className={chip(category === c)}>{c}</Link>
          ))}
        </div>
      </div>

      {list.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      ) : (
        <p className="text-lg">No shoes match those filters yet. <Link href="/shop" className="font-bold underline">Clear filters</Link></p>
      )}
    </div>
  );
}
