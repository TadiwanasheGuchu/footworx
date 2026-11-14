"use client";

import { useState } from "react";
import { ONE_SIZE, type Colorway, type Product } from "@/data/products";
import { whatsappLink } from "@/lib/site";

type Props = {
  product: Product;
  colorway: Colorway;
  size: string | null;
};

export function BuyActions({ product, colorway, size }: Props) {
  const [notice, setNotice] = useState<string | null>(null);
  const item = `${product.brand} ${product.name}, ${colorway.name}`;
  const sizeText = size === ONE_SIZE ? "" : size ? `, size ${size}` : ", (size: please advise)";

  const orderMsg = `Hi Footworx, I'd like to order the ${item}${sizeText}.`;
  const collectMsg = `Hi Footworx, please reserve the ${item}${sizeText} for me to collect in store.`;

  const needSize = (e: React.MouseEvent) => {
    if (!size) {
      e.preventDefault();
      setNotice("Please choose your size first.");
      return true;
    }
    setNotice(null);
    return false;
  };

  const pill = "flex h-14 w-full items-center justify-center gap-2 rounded-full text-base font-semibold transition-colors";

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={(e) => {
          if (!needSize(e)) setNotice("Online payment is coming soon. For now, order on WhatsApp or collect in store.");
        }}
        className={`${pill} cursor-pointer bg-ink text-white hover:bg-[#1d3349]`}
      >
        Buy now
      </button>
      <a
        href={whatsappLink(orderMsg)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={needSize}
        className={`${pill} bg-blue text-ink hover:bg-[#62c6ff]`}
      >
        <WhatsAppIcon />
        Order on WhatsApp
      </a>
      <a
        href={whatsappLink(collectMsg)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={needSize}
        className={`${pill} border border-line bg-white text-ink hover:border-ink`}
      >
        Collect in store
      </a>
      <p aria-live="polite" className="min-h-6 text-center text-[15px] font-medium">
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
