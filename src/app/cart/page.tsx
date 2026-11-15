"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/site";
import { DemoNotice, ItemLine, Steps } from "@/components/CheckoutBits";

export default function CartPage() {
  const { items, subtotal, setQty, remove, ready } = useCart();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-8">
      <Steps current={1} />
      <h1 className="display mb-6 text-5xl sm:text-6xl">Your cart</h1>

      {!ready ? null : items.length === 0 ? (
        <div className="flex flex-col items-start gap-4 rounded-3xl bg-tile p-8">
          <p className="text-lg">Your cart is empty.</p>
          <Link href="/shop" className="rounded-full bg-ink px-6 py-3 font-semibold text-white hover:bg-[#1d3349]">
            Shop shoes & accessories
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <ul className="flex flex-col divide-y divide-line">
            {items.map((item) => (
              <li key={item.key} className="py-5 first:pt-0">
                <ItemLine item={item}>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="flex items-center rounded-full border border-line">
                      <button
                        type="button"
                        aria-label={`One less ${item.name}`}
                        onClick={() => setQty(item.key, item.qty - 1)}
                        disabled={item.qty <= 1}
                        className="h-11 w-11 rounded-full text-lg hover:bg-tile disabled:opacity-40"
                      >
                        −
                      </button>
                      <span className="w-6 text-center font-semibold" aria-live="polite">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        aria-label={`One more ${item.name}`}
                        onClick={() => setQty(item.key, item.qty + 1)}
                        disabled={item.qty >= 10}
                        className="h-11 w-11 rounded-full text-lg hover:bg-tile disabled:opacity-40"
                      >
                        +
                      </button>
                    </div>
                    <button type="button" onClick={() => remove(item.key)} className="text-sm font-medium underline underline-offset-4">
                      Remove
                    </button>
                  </div>
                </ItemLine>
              </li>
            ))}
          </ul>

          <aside className="flex h-fit flex-col gap-4 rounded-3xl bg-tile p-6">
            <h2 className="text-xl font-semibold">Summary</h2>
            <div className="flex justify-between text-lg">
              <span>Subtotal</span>
              <span className="font-bold">{formatPrice(subtotal)}</span>
            </div>
            <p className="text-sm text-steel">Collect in store for free. Delivery cost is confirmed after you order.</p>
            <Link href="/checkout" className="rounded-full bg-ink px-6 py-4 text-center font-semibold text-white hover:bg-[#1d3349]">
              Checkout
            </Link>
            <Link href="/shop" className="text-center font-medium underline underline-offset-4">
              Keep shopping
            </Link>
            <DemoNotice />
          </aside>
        </div>
      )}
    </div>
  );
}
