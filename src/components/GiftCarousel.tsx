"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import type { Product } from "@/data/products";
import type { GiftIdea } from "@/lib/gifts";
import { isLight } from "@/lib/color";
import { whatsappLink } from "@/lib/site";
import { ShoeArt } from "./ShoeArt";

type Card = { idea: GiftIdea; cover?: Product; count: number };

function Cover({ card, dark }: { card: Card; dark: boolean }) {
  if (card.cover) {
    const c = card.cover.colorways[0];
    return (
      <ShoeArt
        colorway={c}
        category={card.cover.category}
        className={`max-h-full w-full object-contain drop-shadow-lg ${card.cover.kind === "shoe" ? "-rotate-6" : ""}`}
      />
    );
  }
  // Vouchers: the Footworx footprint
  return (
    <Image
      src="/brand/footworx-logo-white.png"
      alt=""
      width={648}
      height={225}
      className={`h-auto w-full max-w-[150px] ${dark ? "" : "brightness-0"}`}
    />
  );
}

/** Gift ideas: picture left, text right; swipe on phones, arrows on desktop */
export function GiftCarousel({ cards, active }: { cards: Card[]; active?: string }) {
  const track = useRef<HTMLUListElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.85, 520), behavior: "smooth" });
  };

  return (
    <section aria-label="Gift ideas" className="relative">
      <div className="mb-4 hidden justify-end gap-2 md:flex">
        <button type="button" onClick={() => scroll(-1)} aria-label="Previous gift ideas" className="flex h-11 w-11 items-center justify-center rounded-full bg-tile hover:bg-line">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </button>
        <button type="button" onClick={() => scroll(1)} aria-label="More gift ideas" className="flex h-11 w-11 items-center justify-center rounded-full bg-tile hover:bg-line">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      <ul
        ref={track}
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-4 [scrollbar-width:none] sm:-mx-8 sm:px-8 [&::-webkit-scrollbar]:hidden"
      >
        {cards.map((card) => {
          const { idea } = card;
          const dark = !isLight(idea.bg);
          const on = active === idea.id;
          const body = (
            <>
              <div className="flex w-[42%] shrink-0 items-center justify-center p-5">
                <Cover card={card} dark={dark} />
              </div>
              <div className="flex flex-1 flex-col justify-center gap-2 py-6 pr-6">
                <h3 className="display text-3xl leading-none">{idea.title}</h3>
                <p className={`text-[15px] ${dark ? "text-white/80" : "text-ink/70"}`}>{idea.text}</p>
                <span className="mt-1 text-[15px] font-semibold underline underline-offset-4">
                  {idea.whatsapp ? "Ask on WhatsApp" : `Shop ${card.count} ${card.count === 1 ? "gift" : "gifts"}`}
                </span>
              </div>
            </>
          );
          const cls = `flex h-48 w-[85vw] max-w-[440px] snap-start overflow-hidden rounded-3xl transition-shadow sm:h-52 ${
            dark ? "text-white" : "text-ink"
          } ${on ? "shadow-[0_0_0_3px_#0b1b2b]" : "hover:shadow-[0_0_0_2px_rgba(11,27,43,.3)]"}`;
          return (
            <li key={idea.id} className="shrink-0">
              {idea.whatsapp ? (
                <a href={whatsappLink(idea.whatsapp)} target="_blank" rel="noopener noreferrer" className={cls} style={{ background: idea.bg }}>
                  {body}
                </a>
              ) : (
                <Link
                  href={`/gifts?idea=${idea.id}#gift-results`}
                  scroll={false}
                  aria-current={on ? "true" : undefined}
                  className={cls}
                  style={{ background: idea.bg }}
                >
                  {body}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
