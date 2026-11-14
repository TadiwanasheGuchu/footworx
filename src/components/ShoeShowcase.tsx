"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import type { Product } from "@/data/products";
import { formatPrice } from "@/lib/site";
import { FloatingShoe } from "./FloatingShoe";
import { ColorwayPicker } from "./ColorwayPicker";
import { SizePicker } from "./SizePicker";
import { BuyActions } from "./BuyActions";
import { isLight } from "@/lib/color";

type Props = {
  product: Product;
  /** "hero" on the home page links to the shoe page; "detail" shows sizes and buy buttons */
  variant: "hero" | "detail";
};

export function ShoeShowcase({ product, variant }: Props) {
  const [colorId, setColorId] = useState(product.colorways[0].id);
  const [size, setSize] = useState<string | null>(null);
  const colorway = product.colorways.find((c) => c.id === colorId) ?? product.colorways[0];

  const pickColor = (id: string) => {
    setColorId(id);
    const next = product.colorways.find((c) => c.id === id);
    if (size && next && !next.inStock.includes(size)) setSize(null);
  };

  // Dark backgrounds get white text so everything stays readable
  const dark = !isLight(colorway.bg);
  const outline = dark
    ? "border-white hover:bg-white hover:text-ink"
    : "border-ink hover:bg-ink hover:text-white";

  const TitleTag = variant === "detail" ? "h1" : "h2";

  return (
    <motion.section
      animate={{ backgroundColor: colorway.bg }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`relative overflow-hidden transition-colors duration-500 ${dark ? "text-white" : "text-ink"}`}
      style={{ backgroundColor: colorway.bg }}
    >
      <span
        aria-hidden
        className={`display pointer-events-none absolute -right-6 top-6 select-none text-[34vw] tracking-tighter md:text-[22vw] ${dark ? "text-white/10" : "text-white/25"}`}
        style={{ fontStretch: "62%" }}
      >
        {product.brand}
      </span>
      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 sm:px-8 md:grid-cols-2 md:py-20">
        <div className="order-2 flex flex-col gap-8 md:order-1">
          <div className="flex flex-col gap-4">
            <span className="label">{product.brand} · {product.category} · {product.gender}</span>
            <TitleTag className="display text-6xl sm:text-7xl lg:text-8xl">{product.name}</TitleTag>
            <span className="flex items-baseline gap-3 text-3xl font-extrabold">
              {formatPrice(product.salePrice ?? product.price)}
              {product.salePrice && <s className="text-xl font-semibold opacity-60">{formatPrice(product.price)}</s>}
            </span>
            {variant === "detail" && <p className="max-w-md text-lg">{product.description}</p>}
          </div>
          <ColorwayPicker colorways={product.colorways} selectedId={colorway.id} onSelect={pickColor} />
          {variant === "detail" ? (
            <>
              <SizePicker inStock={colorway.inStock} selected={size} onSelect={setSize} />
              <BuyActions product={product} colorway={colorway} size={size} dark={dark} />
            </>
          ) : (
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/shoes/${product.slug}`}
                className="rounded-[2px] bg-dune px-7 py-4 font-extrabold uppercase tracking-wider text-ink transition-transform hover:-translate-y-0.5"
              >
                Shop this shoe
              </Link>
              <Link href="/shop" className={`rounded-[2px] border-2 px-6 py-[14px] font-bold ${outline}`}>
                See all shoes
              </Link>
            </div>
          )}
        </div>
        <FloatingShoe colorway={colorway} label={`${product.brand} ${product.name}`} className="order-1 md:order-2" />
      </div>
    </motion.section>
  );
}
