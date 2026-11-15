"use client";

import Link from "next/link";
import type { CartItem } from "@/lib/cart";
import { formatPrice, payments } from "@/lib/site";
import { productHref } from "@/lib/links";
import { ShoeArt } from "./ShoeArt";

export function DemoNotice() {
  if (payments.mode !== "demo") return null;
  return (
    <div className="rounded-2xl border-2 border-dashed border-dune bg-dune-soft px-5 py-3 text-[15px]" role="note">
      <strong>Demo checkout.</strong> This shows how buying online will work. No money is taken and no card details
      are asked for. Real payments ({payments.provider}) will be connected soon.
    </div>
  );
}

export function ItemThumb({ item, size = 80 }: { item: CartItem; size?: number }) {
  return (
    <div
      className="flex shrink-0 items-center justify-center overflow-hidden rounded-2xl p-2"
      style={{ width: size, height: size, background: item.art.bg }}
    >
      <ShoeArt colorway={item.art} category={item.category} className="max-h-full w-full object-contain" />
    </div>
  );
}

export function ItemLine({ item, children }: { item: CartItem; children?: React.ReactNode }) {
  const sizeLabel = item.size === "One size" ? "" : ` · Size ${item.size}`;
  return (
    <div className="flex gap-4">
      <ItemThumb item={item} />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <Link href={productHref(item)} className="font-semibold hover:underline">
          {item.brand} {item.name}
        </Link>
        <span className="text-sm text-steel">
          {item.colorName}
          {sizeLabel}
        </span>
        {children}
      </div>
      <span className="shrink-0 font-semibold">{formatPrice(item.price * item.qty)}</span>
    </div>
  );
}

export function Steps({ current }: { current: 1 | 2 | 3 }) {
  const steps = ["Cart", "Details", "Payment"];
  return (
    <ol className="mb-8 flex items-center gap-2 text-sm font-medium" aria-label="Checkout steps">
      {steps.map((s, i) => {
        const n = (i + 1) as 1 | 2 | 3;
        const on = n === current;
        const done = n < current;
        return (
          <li key={s} className="flex items-center gap-2" aria-current={on ? "step" : undefined}>
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                on ? "bg-ink text-white" : done ? "bg-blue text-ink" : "bg-tile text-steel"
              }`}
            >
              {done ? "✓" : n}
            </span>
            <span className={on ? "text-ink" : "text-steel"}>{s}</span>
            {i < steps.length - 1 && <span aria-hidden className="mx-1 h-px w-6 bg-line sm:w-10" />}
          </li>
        );
      })}
    </ol>
  );
}
