/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { Product } from "@/data/products";
import type { TrendingCard } from "@/lib/catalog";
import { productHref } from "@/lib/links";
import { formatPrice } from "@/lib/site";
import { Scroller } from "./Scroller";
import { ShoeArt } from "./ShoeArt";

const card = "group flex w-[42vw] max-w-[220px] shrink-0 snap-start flex-col gap-2 sm:w-52";

/** "Trending at Footworx": small cards that scroll sideways */
export function Trending({ cards, products }: { cards: TrendingCard[]; products: Product[] }) {
  // Staff-picked cards from the Studio, otherwise new and featured products
  const picks = cards.length
    ? null
    : [...products]
        .sort((a, b) => Number(!!b.featured) * 2 + Number(!!b.isNew) - (Number(!!a.featured) * 2 + Number(!!a.isNew)))
        .slice(0, 10);
  if (!cards.length && !picks?.length) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-8">
      <Scroller
        label="Trending"
        title={<h2 className="text-3xl font-bold tracking-tight">Trending at Footworx</h2>}
        action={
          <Link href="/shop" className="font-medium underline underline-offset-4 hover:text-steel">
            Shop all
          </Link>
        }
      >
        {cards.length
          ? cards.map((c, i) => (
              <li key={c.href + i} className={card}>
                <Link href={c.href} className="flex flex-col gap-2">
                  <div className="relative aspect-square overflow-hidden rounded-2xl bg-tile">
                    {c.image && (
                      <img
                        src={c.image.url}
                        alt={c.image.alt}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        style={{ objectPosition: c.image.position }}
                      />
                    )}
                  </div>
                  <span className="font-semibold leading-snug group-hover:underline">{c.title}</span>
                  {c.subtitle && <span className="-mt-1 text-sm text-steel">{c.subtitle}</span>}
                </Link>
              </li>
            ))
          : picks!.map((p) => {
              const c = p.colorways[0];
              return (
                <li key={`${p.kind}-${p.slug}`} className={card}>
                  <Link href={productHref(p)} className="flex flex-col gap-2">
                    <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-tile p-4 transition-colors group-hover:bg-[#e8edf1]">
                      <ShoeArt
                        colorway={c}
                        category={p.category}
                        className={`max-h-full w-full object-contain drop-shadow-md transition-transform duration-300 group-hover:-translate-y-1 ${
                          p.kind === "shoe" ? "-rotate-6" : ""
                        }`}
                      />
                    </div>
                    <span className="font-semibold leading-snug group-hover:underline">{p.name}</span>
                    <span className="-mt-1 text-sm text-steel">
                      {p.brand} · {formatPrice(p.salePrice ?? p.price)}
                    </span>
                  </Link>
                </li>
              );
            })}
      </Scroller>
    </div>
  );
}
