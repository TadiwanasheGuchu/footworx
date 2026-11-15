/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { Product } from "@/data/products";
import type { TrendingCard } from "@/lib/catalog";
import { productHref } from "@/lib/links";
import { ShoeArt } from "./ShoeArt";

type Item = { key: string; href: string; label: string; picture: React.ReactNode };

/**
 * "Trending": big centred heading, then small cut-out pictures with a name below.
 * Desktop shows a centred grid; phones get one row to swipe sideways.
 */
export function Trending({ cards, products }: { cards: TrendingCard[]; products: Product[] }) {
  const items: Item[] = cards.length
    ? cards.map((c, i) => ({
        key: c.href + i,
        href: c.href,
        label: c.title,
        picture: c.image ? (
          <img src={c.image.url} alt="" loading="lazy" className="max-h-full w-full object-contain" />
        ) : null,
      }))
    : [...products]
        // Featured first, then new, then the rest
        .sort((a, b) => Number(!!b.featured) * 2 + Number(!!b.isNew) - (Number(!!a.featured) * 2 + Number(!!a.isNew)))
        .slice(0, 16)
        .map((p) => ({
          key: `${p.kind}-${p.slug}`,
          href: productHref(p),
          label: p.name,
          picture: (
            <ShoeArt
              colorway={p.colorways[0]}
              category={p.category}
              className={`max-h-full w-full object-contain ${p.kind === "shoe" ? "-rotate-3" : ""}`}
            />
          ),
        }));

  if (!items.length) return null;

  return (
    <section aria-labelledby="trending-heading" className="mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-8">
      <div className="mb-10 text-center sm:mb-14">
        <h2 id="trending-heading" className="display text-6xl sm:text-8xl">
          Trending
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-lg text-steel">
          What Walvis Bay is running, walking and training in right now.
        </p>
      </div>

      <ul className="-mx-4 flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:-mx-8 sm:px-8 md:mx-auto md:max-w-5xl md:flex-wrap md:justify-center md:gap-x-4 md:gap-y-10 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
        {items.map((it) => (
          <li key={it.key} className="w-[30vw] max-w-[140px] shrink-0 snap-start md:w-[calc((100%-3rem)/4)] md:max-w-none lg:w-[calc((100%-7rem)/8)]">
            <Link href={it.href} className="group flex flex-col items-center gap-3 text-center">
              <div className="flex h-24 w-full items-center justify-center transition-transform duration-300 group-hover:-translate-y-1.5 sm:h-28">
                {it.picture}
              </div>
              <span className="text-[15px] font-semibold leading-snug group-hover:underline">{it.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
