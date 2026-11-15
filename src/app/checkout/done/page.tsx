"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { loadOrder, type Order } from "@/lib/cart";
import { formatPrice, payments, shortAddress, whatsappLink } from "@/lib/site";
import { DemoNotice, ItemLine } from "@/components/CheckoutBits";

function orderMessage(o: Order) {
  const lines = o.items.map(
    (i) => `- ${i.qty} x ${i.brand} ${i.name}, ${i.colorName}${i.size === "One size" ? "" : `, size ${i.size}`} (${formatPrice(i.price * i.qty)})`,
  );
  const pay = { card: "Card", eft: "EFT", store: "Pay in store" }[o.payment];
  const status = o.status === "paid" ? "PAID" : o.status === "awaiting-eft" ? "will pay by EFT" : o.status === "pay-on-collection" ? "will pay in store" : "payment not completed";
  return [
    `Hi Footworx, here is my order ${o.id}${payments.mode === "demo" ? " (demo)" : ""}:`,
    ...lines,
    `Total: ${formatPrice(o.subtotal)}`,
    `${o.fulfilment === "collect" ? "Collect in store" : `Delivery to: ${o.address}`}`,
    `Payment: ${pay} (${status})`,
    `Name: ${o.customer.name}, ${o.customer.phone}`,
  ].join("\n");
}

function DoneInner() {
  const params = useSearchParams();
  const [order, setOrder] = useState<Order | null | undefined>(undefined);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read the order saved in this browser
    setOrder(loadOrder(params.get("order") ?? ""));
  }, [params]);

  if (order === undefined) return null;
  if (!order) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <p className="mb-6 text-lg">We couldn’t find that order.</p>
        <Link href="/shop" className="rounded-full bg-ink px-6 py-3 font-semibold text-white">Keep shopping</Link>
      </div>
    );
  }

  const failed = order.status === "payment-failed";
  const heading = failed
    ? "Payment didn’t go through"
    : order.status === "paid"
      ? "Thank you, your order is paid"
      : "Thank you, your order is placed";

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-8">
      <div className={`mb-8 rounded-[2rem] p-8 sm:p-10 ${failed ? "bg-dune-soft" : "bg-blue-soft"}`}>
        <span className="label text-steel">Order {order.id}</span>
        <h1 className="display mt-2 text-5xl sm:text-6xl">{heading}</h1>
        <p className="mt-4 max-w-xl text-lg text-steel">
          {failed
            ? "No money was taken. You can try again, choose another way to pay, or order on WhatsApp."
            : order.fulfilment === "collect"
              ? `We’ll WhatsApp you on ${order.customer.phone} when it’s ready to collect at ${shortAddress}.`
              : `We’ll WhatsApp you on ${order.customer.phone} to confirm delivery and the delivery cost.`}
        </p>
        {failed && (
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={`/checkout/pay?order=${order.id}`} className="rounded-full bg-ink px-6 py-3 font-semibold text-white">
              Try payment again
            </Link>
            <Link href="/checkout" className="rounded-full border border-ink/30 bg-white px-6 py-3 font-semibold hover:border-ink">
              Choose another way to pay
            </Link>
          </div>
        )}
      </div>

      {order.status === "awaiting-eft" && (
        <section className="mb-8 rounded-3xl bg-tile p-6">
          <h2 className="mb-3 text-xl font-semibold">Pay by EFT</h2>
          {payments.eft.accountNumber ? (
          <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1">
            <dt className="text-steel">Bank</dt><dd className="font-medium">{payments.eft.bank}</dd>
            <dt className="text-steel">Account name</dt><dd className="font-medium">{payments.eft.accountName}</dd>
            <dt className="text-steel">Account number</dt><dd className="font-medium">{payments.eft.accountNumber}</dd>
            <dt className="text-steel">Branch code</dt><dd className="font-medium">{payments.eft.branchCode}</dd>
            <dt className="text-steel">Reference</dt><dd className="font-bold">{order.id}</dd>
            <dt className="text-steel">Amount</dt><dd className="font-bold">{formatPrice(order.subtotal)}</dd>
          </dl>
          ) : (
            <p>
              Tap <strong>Send this order to Footworx on WhatsApp</strong> below and we’ll reply with our bank details. Please
              use <strong>{order.id}</strong> as your payment reference. Amount: <strong>{formatPrice(order.subtotal)}</strong>.
            </p>
          )}
          <p className="mt-3 text-sm text-steel">Send your proof of payment on WhatsApp and we’ll get your order ready.</p>
        </section>
      )}

      <section className="mb-8 flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Order summary</h2>
        <ul className="flex flex-col gap-4">
          {order.items.map((i) => (
            <li key={i.key}>
              <ItemLine item={i}>{i.qty > 1 && <span className="text-sm text-steel">Qty {i.qty}</span>}</ItemLine>
            </li>
          ))}
        </ul>
        <div className="flex justify-between border-t border-line pt-4 text-lg">
          <span>Total</span>
          <span className="font-bold">{formatPrice(order.subtotal)}</span>
        </div>
      </section>

      <div className="flex flex-col gap-3 sm:flex-row">
        <a
          href={whatsappLink(orderMessage(order))}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 rounded-full bg-blue px-6 py-4 text-center font-semibold text-ink hover:bg-[#62c6ff]"
        >
          Send this order to Footworx on WhatsApp
        </a>
        <Link href="/shop" className="flex-1 rounded-full border border-line px-6 py-4 text-center font-semibold hover:border-ink">
          Keep shopping
        </Link>
      </div>
      <div className="mt-8">
        <DemoNotice />
      </div>
    </div>
  );
}

export default function DonePage() {
  return (
    <Suspense>
      <DoneInner />
    </Suspense>
  );
}
