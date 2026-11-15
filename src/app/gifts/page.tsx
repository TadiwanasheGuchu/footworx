import type { Metadata } from "next";
import Link from "next/link";
import { getProducts } from "@/lib/catalog";
import { giftIdeas, onSale, productsFor } from "@/lib/gifts";
import { GiftCarousel } from "@/components/GiftCarousel";
import { ProductCard } from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "Gifts",
  description: "Gift ideas for runners, walkers and footballers in Walvis Bay, plus Footworx gift vouchers and foot assessments.",
};

type Search = { searchParams: Promise<{ idea?: string }> };

export default async function GiftsPage({ searchParams }: Search) {
  const { idea: ideaId } = await searchParams;
  const products = await getProducts();

  // Only show ideas that have products (vouchers always show)
  const cards = giftIdeas
    .map((idea) => {
      const list = productsFor(idea, products);
      const cover = list.find((p) => p.colorways[0]?.image) ?? list[0];
      // Only plain data goes to the browser (not the matching rule)
      const { id, title, text, whatsapp, bg } = idea;
      return { idea: { id, title, text, whatsapp, bg }, cover, count: list.length };
    })
    .filter((c) => c.idea.whatsapp || c.count > 0);

  const active = cards.find((c) => c.idea.id === ideaId && !c.idea.whatsapp);
  const activeIdea = giftIdeas.find((g) => g.id === active?.idea.id);
  const results = activeIdea ? productsFor(activeIdea, products) : [];
  const sale = onSale(products);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-8">
      <div className="mb-8 flex flex-col gap-3">
        <h1 className="display text-6xl sm:text-8xl">Gifts</h1>
        <p className="max-w-2xl text-lg text-steel">
          Ideas for the runners, walkers and footballers in your life. Not sure of their size? Sizes can be exchanged in store.
        </p>
      </div>

      <GiftCarousel cards={cards} active={active?.idea.id} />

      {active && (
        <section id="gift-results" className="scroll-mt-24 pt-10" aria-live="polite">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-3xl font-bold tracking-tight">{active.idea.title}</h2>
            <Link href="/gifts" scroll={false} className="font-medium underline underline-offset-4">
              Clear
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
            {results.map((p) => (
              <ProductCard key={`${p.kind}-${p.slug}`} product={p} />
            ))}
          </div>
        </section>
      )}

      {sale.length > 0 && (
        <section className="pt-16" aria-labelledby="sale-heading">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-line pb-4">
            <div>
              <h2 id="sale-heading" className="display text-5xl sm:text-6xl">
                Sale
              </h2>
              <p className="mt-1 text-steel">
                {sale.length} {sale.length === 1 ? "product" : "products"} on sale, biggest savings first
              </p>
            </div>
            <Link href="/shop?sale=1" className="font-medium underline underline-offset-4 hover:text-steel">
              View all sale
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
            {sale.slice(0, 8).map((p) => (
              <ProductCard key={`${p.kind}-${p.slug}`} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
