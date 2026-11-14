"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import type { Product } from "@/data/products";
import { formatPrice } from "@/lib/site";
import { isLight } from "@/lib/color";
import { FloatingShoe } from "./FloatingShoe";
import { ColorwayPicker } from "./ColorwayPicker";
import { SizePicker } from "./SizePicker";
import { BuyActions } from "./BuyActions";

type Props = {
  product: Product;
  /** "hero" on the home page links to the shoe page; "detail" shows sizes and buy buttons */
  variant: "hero" | "detail";
};

function Price({ product }: { product: Product }) {
  const off = product.salePrice ? Math.round((1 - product.salePrice / product.price) * 100) : 0;
  return (
    <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <span className="text-2xl font-bold">{formatPrice(product.salePrice ?? product.price)}</span>
      {product.salePrice && (
        <>
          <s className="text-lg opacity-60">{formatPrice(product.price)}</s>
          <span className="rounded-full bg-dune px-3 py-0.5 text-sm font-semibold text-ink">−{off}%</span>
        </>
      )}
    </span>
  );
}

/** Soft colored panel with the floating shoe; the color follows the selected colorway. */
function ShoePanel({ product, bg, children, className }: { product: Product; bg: string; children: React.ReactNode; className?: string }) {
  const dark = !isLight(bg);
  return (
    <motion.div
      animate={{ backgroundColor: bg }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ backgroundColor: bg }}
      className={`relative overflow-hidden rounded-[2rem] ${dark ? "text-white" : "text-ink"} ${className ?? ""}`}
    >
      <span
        aria-hidden
        className={`display pointer-events-none absolute -right-4 top-2 select-none text-[30vw] leading-none md:text-[15vw] ${
          dark ? "text-white/[0.07]" : "text-white/60"
        }`}
      >
        {product.brand}
      </span>
      {children}
    </motion.div>
  );
}

export function ShoeShowcase({ product, variant }: Props) {
  const [colorId, setColorId] = useState(product.colorways[0].id);
  const [size, setSize] = useState<string | null>(null);
  const colorway = product.colorways.find((c) => c.id === colorId) ?? product.colorways[0];

  const pickColor = (id: string) => {
    setColorId(id);
    const next = product.colorways.find((c) => c.id === id);
    if (size && next && !next.inStock.includes(size)) setSize(null);
  };

  const label = `${product.brand} ${product.name}`;

  if (variant === "hero") {
    const dark = !isLight(colorway.bg);
    return (
      <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-8">
        <ShoePanel product={product} bg={colorway.bg}>
          <div className="relative grid items-center gap-6 p-6 sm:p-10 md:grid-cols-[1fr_1.2fr] md:p-14">
            <div className="order-2 flex flex-col gap-6 md:order-1">
              <span className="label opacity-80">{product.brand} · {product.category}</span>
              <h2 className="display text-6xl sm:text-7xl lg:text-[5.5rem]">{product.name}</h2>
              <Price product={product} />
              <ColorwayPicker colorways={product.colorways} selectedId={colorway.id} onSelect={pickColor} />
              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/shoes/${product.slug}`}
                  className={`rounded-full px-7 py-3.5 font-semibold transition-colors ${
                    dark ? "bg-white text-ink hover:bg-blue-soft" : "bg-ink text-white hover:bg-[#1d3349]"
                  }`}
                >
                  Shop this shoe
                </Link>
                <Link
                  href="/shop"
                  className={`rounded-full border px-7 py-3.5 font-semibold transition-colors ${
                    dark ? "border-white/50 hover:border-white" : "border-ink/30 hover:border-ink"
                  }`}
                >
                  See all shoes
                </Link>
              </div>
            </div>
            <FloatingShoe colorway={colorway} label={label} className="order-1 md:order-2" />
          </div>
        </ShoePanel>
      </section>
    );
  }

  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 pt-6 sm:px-8 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
      <div className="lg:sticky lg:top-24 lg:self-start">
        <ShoePanel product={product} bg={colorway.bg} className="flex aspect-[4/3] items-center px-6 sm:px-12">
          <FloatingShoe colorway={colorway} label={label} className="relative w-full" />
        </ShoePanel>
      </div>
      <div className="flex flex-col gap-7 lg:py-4">
        <div className="flex flex-col gap-3">
          <span className="text-[15px] text-steel">
            {product.brand} · {product.category} · {product.gender}
          </span>
          <h1 className="display text-5xl sm:text-6xl">{product.name}</h1>
          <Price product={product} />
        </div>
        <ColorwayPicker colorways={product.colorways} selectedId={colorway.id} onSelect={pickColor} />
        <SizePicker inStock={colorway.inStock} selected={size} onSelect={setSize} />
        <BuyActions product={product} colorway={colorway} size={size} />
        {product.description && (
          <div className="border-t border-line pt-6">
            <h2 className="mb-2 font-semibold">About this shoe</h2>
            <p className="text-lg leading-relaxed text-steel">{product.description}</p>
          </div>
        )}
      </div>
    </section>
  );
}
