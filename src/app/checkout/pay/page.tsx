"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { loadOrder, saveOrder, useCart, type Order } from "@/lib/cart";
import { formatPrice, payments } from "@/lib/site";
import { Steps } from "@/components/CheckoutBits";

function PayInner() {
  const router = useRouter();
  const params = useSearchParams();
  const { clear } = useCart();
  const [order, setOrder] = useState<Order | null | undefined>(undefined);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read the order saved in this browser
    setOrder(loadOrder(params.get("order") ?? ""));
  }, [params]);

  if (order === undefined) return null;
  if (!order) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <p className="mb-6 text-lg">We couldn’t find that order.</p>
        <Link href="/cart" className="rounded-full bg-ink px-6 py-3 font-semibold text-white">Back to cart</Link>
      </div>
    );
  }

  const finish = (status: Order["status"]) => {
    setBusy(true);
    saveOrder({ ...order, status });
    if (status === "paid") clear();
    // A short pause, like a real payment page confirming
    setTimeout(() => router.push(`/checkout/done?order=${order.id}`), 900);
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-10 sm:px-8">
      <Steps current={3} />
      <div className="overflow-hidden rounded-[2rem] border border-line bg-white shadow-sm">
        <div className="flex items-center justify-between bg-ink px-6 py-4 text-white">
          <span className="flex items-center gap-2 font-semibold">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <rect x="4" y="10" width="16" height="11" rx="2" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            </svg>
            Secure payment
          </span>
          {payments.mode === "demo" && (
            <span className="rounded-full bg-dune px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink">Demo</span>
          )}
        </div>

        <div className="flex flex-col gap-6 p-6 sm:p-8">
          <div className="flex flex-col gap-1">
            <span className="text-sm text-steel">Paying</span>
            <span className="text-lg font-semibold">Footworx Namibia</span>
            <span className="text-sm text-steel">Order {order.id}</span>
          </div>
          <div className="flex items-baseline justify-between rounded-2xl bg-tile px-5 py-4">
            <span>Amount</span>
            <span className="text-3xl font-bold">{formatPrice(order.subtotal)}</span>
          </div>

          <div className="rounded-2xl border-2 border-dashed border-dune bg-dune-soft p-4 text-[15px]">
            <p className="font-semibold">This is a demo payment page.</p>
            <p className="mt-1">
              With real payments, customers enter their card here, on {payments.provider}&apos;s secure page. No card
              details are asked for and no money is taken in this demo. Choose what happens next:
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <button
              type="button"
              disabled={busy}
              onClick={() => finish("paid")}
              className="h-14 rounded-full bg-ink font-semibold text-white hover:bg-[#1d3349] disabled:opacity-60"
            >
              {busy ? "Processing…" : "Approve test payment"}
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => finish("payment-failed")}
              className="h-14 rounded-full border border-line font-semibold hover:border-ink disabled:opacity-60"
            >
              Decline (test a failed payment)
            </button>
            <Link href="/checkout" className="text-center text-sm font-medium underline underline-offset-4">
              Cancel and go back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PayPage() {
  return (
    <Suspense>
      <PayInner />
    </Suspense>
  );
}
