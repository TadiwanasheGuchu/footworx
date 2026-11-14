"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ONE_SIZE, sizesFor, type Product } from "@/data/products";
import { productHref } from "@/lib/links";
import { formatPrice } from "@/lib/site";
import { isLight } from "@/lib/color";
import { FloatingShoe } from "./FloatingShoe";
import { ColorwayPicker } from "./ColorwayPicker";
import { SizePicker } from "./SizePicker";
import { BuyActions } from "./BuyActions";
import { ShoeArt } from "./ShoeArt";

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

// Matches the light grey studio background of typical brand product photos
const STUDIO_BG = "#f7f6f9";

function Thumb({ on, label, onClick, bg, children }: { on: boolean; label: string; onClick: () => void; bg: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={on}
      onClick={onClick}
      className={`h-20 w-20 shrink-0 cursor-pointer overflow-hidden rounded-2xl p-1.5 transition-shadow sm:h-24 sm:w-24 ${
        on ? "shadow-[0_0_0_2px_#0b1b2b]" : "shadow-[0_0_0_1px_#e3e8ec] hover:shadow-[0_0_0_2px_#5b6b7a]"
      }`}
      style={{ background: bg }}
    >
      {children}
    </button>
  );
}

/** Soft colored panel with the floating shoe; the color follows the selected colorway. */
function ShoePanel({
  product,
  bg,
  children,
  className,
  hideBrand,
}: {
  product: Product;
  bg: string;
  children: React.ReactNode;
  className?: string;
  hideBrand?: boolean;
}) {
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
        className={`display pointer-events-none absolute -right-4 top-2 transition-opacity duration-300 ${hideBrand ? "opacity-0" : ""} select-none text-[30vw] leading-none md:text-[15vw] ${
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
  const colorway = product.colorways.find((c) => c.id === colorId) ?? product.colorways[0];
  const isShoe = product.kind !== "accessory";
  const sizes = sizesFor(product);
  const oneSize = sizes.length === 1 && sizes[0] === ONE_SIZE;
  // One-size items (headphones) need no size choice: pick it when in stock
  const autoSize = (inStock: string[]) => (oneSize && inStock.includes(ONE_SIZE) ? ONE_SIZE : null);
  const [size, setSize] = useState<string | null>(() => autoSize(product.colorways[0].inStock));

  // 0 = the floating shoe, 1+ = gallery photos
  const [view, setView] = useState(0);

  const pickColor = (id: string) => {
    setColorId(id);
    setView(0);
    const next = product.colorways.find((c) => c.id === id);
    if (oneSize) setSize(next ? autoSize(next.inStock) : null);
    else if (size && next && !next.inStock.includes(size)) setSize(null);
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
                  href={productHref(product)}
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
            <FloatingShoe colorway={colorway} label={label} className="order-1 md:order-2" tilt={isShoe} category={product.category} />
          </div>
        </ShoePanel>
      </section>
    );
  }

  const gallery = colorway.gallery ?? [];
  const photo = view > 0 ? gallery[view - 1] : null;

  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 pt-6 sm:px-8 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
      <div className="flex flex-col gap-3 lg:sticky lg:top-24 lg:self-start">
        <ShoePanel
          product={product}
          bg={photo ? STUDIO_BG : colorway.bg}
          className="flex aspect-[4/3] items-center justify-center"
          hideBrand={!!photo}
        >
          <AnimatePresence mode="wait" initial={false}>
            {photo ? (
              <motion.img
                key={photo.src}
                src={photo.src}
                alt={`${label} in ${colorway.name}, photo ${view + 1}`}
                className="relative h-full w-full object-contain"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25 }}
              />
            ) : (
              <motion.div
                key="float"
                className="relative w-full px-6 sm:px-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <FloatingShoe colorway={colorway} label={label} className="w-full" tilt={isShoe} category={product.category} />
              </motion.div>
            )}
          </AnimatePresence>
        </ShoePanel>
        {gallery.length > 0 && (
          <div className="-mx-1 flex gap-2 overflow-x-auto p-1" role="group" aria-label="Photos">
            <Thumb on={view === 0} label="Main view" onClick={() => setView(0)} bg={colorway.bg}>
              <ShoeArt colorway={colorway} category={product.category} className="h-full w-full object-contain" />
            </Thumb>
            {gallery.map((g, i) => (
              <Thumb key={g.src} on={view === i + 1} label={`Photo ${i + 2}`} onClick={() => setView(i + 1)} bg={STUDIO_BG}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g.thumb} alt="" className="h-full w-full object-contain" />
              </Thumb>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-7 lg:py-4">
        <div className="flex flex-col gap-3">
          <span className="text-[15px] text-steel">
            {[product.brand, product.category, isShoe ? product.gender : null].filter(Boolean).join(" · ")}
          </span>
          <h1 className="display text-5xl sm:text-6xl">{product.name}</h1>
          <Price product={product} />
        </div>
        <ColorwayPicker colorways={product.colorways} selectedId={colorway.id} onSelect={pickColor} />
        {oneSize ? (
          <p className="text-[15px] font-semibold" aria-live="polite">
            {colorway.inStock.includes(ONE_SIZE) ? "In stock" : "Out of stock in this color"}
          </p>
        ) : (
          <SizePicker
            sizes={sizes}
            label={isShoe ? "Select size (EU)" : "Select size"}
            inStock={colorway.inStock}
            selected={size}
            onSelect={setSize}
          />
        )}
        <BuyActions product={product} colorway={colorway} size={size} />
        {product.description && (
          <div className="border-t border-line pt-6">
            <h2 className="mb-2 font-semibold">{isShoe ? "About this shoe" : "About this product"}</h2>
            <p className="text-lg leading-relaxed text-steel">{product.description}</p>
          </div>
        )}
      </div>
    </section>
  );
}
