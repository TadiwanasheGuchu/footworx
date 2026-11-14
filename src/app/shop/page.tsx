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

  const pill = (active: boolean) =>
    `rounded-full px-4 py-2 text-[15px] font-medium transition-colors ${active ? "bg-ink text-white" : "bg-tile hover:bg-[#e3e8ec]"}`;

  const title = [brand, category].filter(Boolean).join(" ") || "All shoes";

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-8">
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
        <p className="text-steel">{list.length} {list.length === 1 ? "shoe" : "shoes"}</p>
      </div>

      <div className="mb-10 flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by type">
          <Link href={href({ brand })} className={pill(!category)}>All types</Link>
          {categories.map((c) => (
            <Link key={c} href={href({ brand, category: c })} className={pill(category === c)}>{c}</Link>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by brand">
          <Link href={href({ category })} className={pill(!brand)}>All brands</Link>
          {brands.map((b) => (
            <Link key={b} href={href({ brand: b, category })} className={pill(brand === b)}>{b}</Link>
          ))}
        </div>
      </div>

      {list.length ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      ) : (
        <p className="text-lg">
          No shoes match those filters yet. <Link href="/shop" className="font-semibold underline">Clear filters</Link>
        </p>
      )}
    </div>
  );
}
