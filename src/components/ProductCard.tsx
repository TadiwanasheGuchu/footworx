import Link from "next/link";
import type { Product } from "@/data/products";
import { formatPrice } from "@/lib/site";
import { ShoeArt } from "./ShoeArt";

export function ProductCard({ product }: { product: Product }) {
  const first = product.colorways[0];
  return (
    <Link href={`/shoes/${product.slug}`} className="group flex flex-col overflow-hidden rounded-[4px] bg-white">
      <div className="relative flex aspect-[4/3] items-center justify-center p-6" style={{ background: first.bg }}>
        <div className="absolute left-3 top-3 flex gap-1.5">
          {product.salePrice && <span className="bg-dune px-2 py-1 text-[11px] font-extrabold uppercase text-ink">Sale</span>}
          {product.isNew && <span className="bg-ink px-2 py-1 text-[11px] font-extrabold uppercase text-white">New</span>}
        </div>
        <ShoeArt colorway={first} className="w-full -rotate-3 transition-transform duration-300 group-hover:-translate-y-2 group-hover:-rotate-6" />
      </div>
      <div className="flex flex-col gap-1 p-4">
        <span className="label text-steel">{product.brand} · {product.category}</span>
        <h3 className="text-lg font-bold group-hover:underline">{product.name}</h3>
        <div className="flex items-center justify-between">
          <span className="flex gap-2 text-lg font-extrabold">
            {product.salePrice ? (
              <>
                {formatPrice(product.salePrice)}
                <s className="font-normal text-steel">{formatPrice(product.price)}</s>
              </>
            ) : (
              formatPrice(product.price)
            )}
          </span>
          <span className="flex gap-1" aria-label={`${product.colorways.length} colorways`}>
            {product.colorways.map((c) => (
              <span key={c.id} className="h-3.5 w-3.5 rounded-full border border-line" style={{ background: c.upper }} />
            ))}
          </span>
        </div>
      </div>
    </Link>
  );
}
