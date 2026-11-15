import type { Metadata } from "next";
import Link from "next/link";
import { getProducts } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";
import { whatsappLink } from "@/lib/site";
import type { Product } from "@/data/products";

export const metadata: Metadata = { title: "Search", robots: { index: false } };

type Search = { searchParams: Promise<{ q?: string }> };

function haystack(p: Product) {
  return [p.brand, p.name, p.category, p.kind === "accessory" ? "accessory accessories" : "shoe shoes", p.gender, p.support, p.cushioning, ...p.colorways.map((c) => c.name)]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export default async function SearchPage({ searchParams }: Search) {
  const { q = "" } = await searchParams;
  const query = q.trim().slice(0, 80);
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  const products = await getProducts();
  // Every word must appear somewhere (brand, name, type, colour...)
  const results = words.length ? products.filter((p) => words.every((w) => haystack(p).includes(w))) : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-8">
      <form action="/search" role="search" className="mb-10 flex max-w-2xl gap-2">
        <label htmlFor="q" className="sr-only">
          Search shoes and accessories
        </label>
        <input
          id="q"
          name="q"
          type="search"
          defaultValue={query}
          autoFocus
          placeholder="Search: Hoka, trail, socks, black…"
          className="h-14 min-w-0 flex-1 rounded-full border border-line bg-white px-6 text-lg outline-none focus:border-ink"
        />
        <button type="submit" className="h-14 shrink-0 rounded-full bg-ink px-7 font-semibold text-white hover:bg-[#1d3349]">
          Search
        </button>
      </form>

      {words.length === 0 ? (
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight">What are you looking for?</h1>
          <div className="flex flex-wrap gap-2">
            {["Running", "Trail", "Hoka", "Insoles", "Socks", "Women"].map((s) => (
              <Link key={s} href={`/search?q=${encodeURIComponent(s)}`} className="rounded-full bg-tile px-4 py-2 font-medium hover:bg-[#e3e8ec]">
                {s}
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <>
          <h1 className="mb-6 text-3xl font-bold tracking-tight">
            {results.length} {results.length === 1 ? "result" : "results"} for “{query}”
          </h1>
          {results.length ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-3 xl:grid-cols-4">
              {results.map((p) => (
                <ProductCard key={`${p.kind}-${p.slug}`} product={p} />
              ))}
            </div>
          ) : (
            <p className="text-lg">
              Nothing online matches that yet. We stock more in the shop:{" "}
              <a
                href={whatsappLink(`Hi Footworx, do you have ${query}?`)}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline"
              >
                ask us on WhatsApp
              </a>
              .
            </p>
          )}
        </>
      )}
    </div>
  );
}
