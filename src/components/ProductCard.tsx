import Link from "next/link";
import type { Product } from "@/data/products";
import { formatPrice } from "@/lib/site";
import { ShoeArt } from "./ShoeArt";
import { productHref } from "@/lib/links";

export function ProductCard({ product }: { product: Product }) {
  const first = product.colorways[0];
  const off = product.salePrice ? Math.round((1 - product.salePrice / product.price) * 100) : 0;
  return (
    <Link href={productHref(product)} className="group flex flex-col gap-4">
      <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-3xl bg-tile p-8 transition-colors group-hover:bg-[#e8edf1]">
        <div className="absolute left-4 top-4 flex gap-1.5">
          {product.isNew && <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold">New</span>}
          {off > 0 && <span className="rounded-full bg-dune px-3 py-1 text-xs font-semibold text-ink">−{off}%</span>}
        </div>
        <ShoeArt
          colorway={first}
          category={product.category}
          className={`max-h-full w-full object-contain drop-shadow-lg transition-transform duration-300 group-hover:-translate-y-2 ${
            product.kind === "accessory" ? "" : "-rotate-6 group-hover:-rotate-[10deg]"
          }`}
        />
      </div>
      <div className="flex flex-col gap-1 px-1">
        <span className="text-sm text-steel">{product.brand} · {product.category}</span>
        <h3 className="text-lg font-semibold leading-snug">{product.name}</h3>
        <div className="flex items-center justify-between gap-2">
          <span className="flex items-baseline gap-2">
            <span className="text-lg font-bold">{formatPrice(product.salePrice ?? product.price)}</span>
            {product.salePrice && <s className="text-sm text-steel">{formatPrice(product.price)}</s>}
          </span>
          <span className="flex gap-1" aria-label={`${product.colorways.length} colors`}>
            {product.colorways.map((c) => (
              <span key={c.id} className="h-3.5 w-3.5 rounded-full ring-1 ring-line" style={{ background: c.upper }} />
            ))}
          </span>
        </div>
      </div>
    </Link>
  );
}
