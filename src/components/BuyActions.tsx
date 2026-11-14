"use client";

import { useState } from "react";
import type { Product, Colorway } from "@/data/products";
import { whatsappLink } from "@/lib/site";

type Props = {
  product: Product;
  colorway: Colorway;
  size: string | null;
  /** True when the background behind the buttons is dark */
  dark?: boolean;
};

export function BuyActions({ product, colorway, size, dark = false }: Props) {
  const [notice, setNotice] = useState<string | null>(null);
  const shoe = `${product.brand} ${product.name}, ${colorway.name}`;
  const sizeText = size ? `size ${size}` : "(size: please advise)";

  const orderMsg = `Hi Footworx, I'd like to order the ${shoe}, ${sizeText}.`;
  const collectMsg = `Hi Footworx, please reserve the ${shoe}, ${sizeText} for me to collect in store.`;

  const needSize = (e: React.MouseEvent) => {
    if (!size) {
      e.preventDefault();
      setNotice("Please choose your size first.");
      return true;
    }
    setNotice(null);
    return false;
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={(e) => {
            if (!needSize(e)) setNotice("Online payment is coming soon. For now, order on WhatsApp or collect in store.");
          }}
          className="cursor-pointer rounded-[2px] bg-dune px-7 py-4 text-base font-extrabold uppercase tracking-wider text-ink transition-transform hover:-translate-y-0.5"
        >
          Buy now
        </button>
        <a
          href={whatsappLink(orderMsg)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={needSize}
          className={`flex items-center gap-2 rounded-[2px] px-6 py-4 text-base font-bold transition-transform hover:-translate-y-0.5 ${dark ? "bg-white text-ink" : "bg-ink text-white"}`}
        >
          <WhatsAppIcon />
          Order on WhatsApp
        </a>
        <a
          href={whatsappLink(collectMsg)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={needSize}
          className={`rounded-[2px] border-2 px-6 py-[14px] text-base font-bold transition-colors ${dark ? "border-white hover:bg-white hover:text-ink" : "border-ink hover:bg-ink hover:text-white"}`}
        >
          Collect in store
        </a>
      </div>
      <p aria-live="polite" className="min-h-6 text-[15px] font-semibold">
        {notice}
      </p>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 21l1.7-5A8.5 8.5 0 1 1 8 19.3L3 21z" />
      <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1.2-1.4-2-1-1 .8a4 4 0 0 1-2.1-2.1l.8-1-1-2L9 9.5z" />
    </svg>
  );
}
