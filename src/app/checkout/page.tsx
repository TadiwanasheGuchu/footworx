"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { newOrderId, saveOrder, useCart, type Order } from "@/lib/cart";
import { formatPrice, payments } from "@/lib/site";
import { DemoNotice, ItemLine, Steps } from "@/components/CheckoutBits";

const field = "h-12 w-full rounded-xl border border-line bg-white px-4 text-base outline-none focus:border-ink";

function Choice({
  name,
  value,
  checked,
  onChange,
  title,
  text,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: (v: string) => void;
  title: string;
  text: string;
}) {
  return (
    <label
      className={`flex cursor-pointer gap-3 rounded-2xl border-2 p-4 transition-colors ${
        checked ? "border-ink bg-white" : "border-transparent bg-tile hover:border-line"
      }`}
    >
      <input type="radio" name={name} value={value} checked={checked} onChange={() => onChange(value)} className="mt-1 h-5 w-5 accent-[#0b1b2b]" />
      <span className="flex flex-col gap-0.5">
        <span className="font-semibold">{title}</span>
        <span className="text-sm text-steel">{text}</span>
      </span>
    </label>
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, ready, clear } = useCart();
  const [fulfilment, setFulfilment] = useState<Order["fulfilment"]>("collect");
  const [payment, setPayment] = useState<Order["payment"]>("card");
  const [error, setError] = useState<string | null>(null);

  if (ready && items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-8">
        <h1 className="display mb-4 text-5xl">Checkout</h1>
        <p className="mb-6 text-lg">Your cart is empty.</p>
        <Link href="/shop" className="rounded-full bg-ink px-6 py-3 font-semibold text-white">
          Shop now
        </Link>
      </div>
    );
  }

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "").trim();
    const phone = String(f.get("phone") ?? "").trim();
    const email = String(f.get("email") ?? "").trim();
    const address = String(f.get("address") ?? "").trim();
    if (!name || !phone) return setError("Please add your name and phone number.");
    if (fulfilment === "delivery" && !address) return setError("Please add your delivery address.");
    const pay = fulfilment === "delivery" && payment === "store" ? "card" : payment;

    const order: Order = {
      id: newOrderId(),
      createdAt: new Date().toISOString(),
      items,
      subtotal,
      customer: { name, phone, email },
      fulfilment,
      address: fulfilment === "delivery" ? address : undefined,
      payment: pay,
      status: pay === "card" ? "awaiting-payment" : pay === "eft" ? "awaiting-eft" : "pay-on-collection",
    };
    saveOrder(order);
    if (pay === "card") {
      router.push(`/checkout/pay?order=${order.id}`);
    } else {
      clear();
      router.push(`/checkout/done?order=${order.id}`);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-8">
      <Steps current={2} />
      <h1 className="display mb-6 text-5xl sm:text-6xl">Checkout</h1>

      <form onSubmit={submit} className="grid gap-8 lg:grid-cols-[1.6fr_1fr]" noValidate>
        <div className="flex flex-col gap-8">
          <fieldset className="flex flex-col gap-3">
            <legend className="mb-3 text-xl font-semibold">Your details</legend>
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium">Full name</span>
              <input name="name" autoComplete="name" required className={field} />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium">Phone (WhatsApp)</span>
              <input name="phone" type="tel" autoComplete="tel" required placeholder="081 234 5678" className={field} />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium">
                Email <span className="text-steel">(optional, for your receipt)</span>
              </span>
              <input name="email" type="email" autoComplete="email" className={field} />
            </label>
          </fieldset>

          <fieldset className="flex flex-col gap-3">
            <legend className="mb-3 text-xl font-semibold">Collect or delivery</legend>
            <Choice
              name="fulfilment"
              value="collect"
              checked={fulfilment === "collect"}
              onChange={(v) => setFulfilment(v as Order["fulfilment"])}
              title="Collect in store (free)"
              text="LERA Medical Centre, Walvis Bay. We'll WhatsApp you when it's ready."
            />
            <Choice
              name="fulfilment"
              value="delivery"
              checked={fulfilment === "delivery"}
              onChange={(v) => {
                setFulfilment(v as Order["fulfilment"]);
                if (payment === "store") setPayment("card");
              }}
              title="Delivery"
              text={payments.deliveryNote}
            />
            {fulfilment === "delivery" && (
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium">Delivery address</span>
                <textarea name="address" rows={3} autoComplete="street-address" className={`${field} h-auto py-3`} />
              </label>
            )}
          </fieldset>

          <fieldset className="flex flex-col gap-3">
            <legend className="mb-3 text-xl font-semibold">Payment</legend>
            <Choice
              name="payment"
              value="card"
              checked={payment === "card"}
              onChange={(v) => setPayment(v as Order["payment"])}
              title={`Card${payments.mode === "demo" ? " (demo)" : ""}`}
              text={`Pay securely on the ${payments.provider} payment page.`}
            />
            <Choice
              name="payment"
              value="eft"
              checked={payment === "eft"}
              onChange={(v) => setPayment(v as Order["payment"])}
              title="EFT / bank transfer"
              text="Pay by bank transfer and send proof of payment on WhatsApp."
            />
            {fulfilment === "collect" && (
              <Choice
                name="payment"
                value="store"
                checked={payment === "store"}
                onChange={(v) => setPayment(v as Order["payment"])}
                title="Pay in store"
                text="Pay by card or cash when you collect."
              />
            )}
          </fieldset>
        </div>

        <aside className="flex h-fit flex-col gap-4 rounded-3xl bg-tile p-6 lg:sticky lg:top-24">
          <h2 className="text-xl font-semibold">Your order</h2>
          <ul className="flex flex-col gap-4">
            {items.map((i) => (
              <li key={i.key}>
                <ItemLine item={i}>{i.qty > 1 && <span className="text-sm text-steel">Qty {i.qty}</span>}</ItemLine>
              </li>
            ))}
          </ul>
          <div className="flex justify-between border-t border-line pt-4 text-lg">
            <span>Total</span>
            <span className="font-bold">{formatPrice(subtotal)}</span>
          </div>
          {fulfilment === "delivery" && <p className="text-sm text-steel">Plus delivery, confirmed on WhatsApp.</p>}
          <p aria-live="polite" className="min-h-5 text-[15px] font-semibold text-[#b42318]">
            {error}
          </p>
          <button type="submit" className="rounded-full bg-ink px-6 py-4 font-semibold text-white hover:bg-[#1d3349]">
            {payment === "card" || (fulfilment === "delivery" && payment === "store") ? "Continue to payment" : "Place order"}
          </button>
          <DemoNotice />
        </aside>
      </form>
    </div>
  );
}
