import type { Product } from "@/data/products";
import Link from "next/link";
import { payments, shortAddress } from "@/lib/site";

function Section({ title, open, children }: { title: string; open?: boolean; children: React.ReactNode }) {
  return (
    <details open={open} className="group border-b border-line">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-lg font-semibold [&::-webkit-details-marker]:hidden">
        {title}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="shrink-0 transition-transform group-open:rotate-180"
          aria-hidden
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </summary>
      <div className="flex flex-col gap-3 pb-6 text-steel [&_a]:font-semibold [&_a]:text-ink [&_a]:underline">{children}</div>
    </details>
  );
}

/** Fold-out sections under the buy buttons: details, delivery, returns */
export function ProductInfo({ product }: { product: Product }) {
  const isShoe = product.kind === "shoe";
  const facts = [
    ["Type", product.category],
    isShoe ? ["For", product.gender] : null,
    isShoe && product.support ? ["Support", product.support] : null,
    isShoe && product.cushioning ? ["Cushioning", product.cushioning] : null,
    ["Colours", product.colorways.map((c) => c.name).join(", ")],
  ].filter((f): f is string[] => !!f);

  return (
    <div className="border-t border-line">
      <Section title="Details" open>
        {product.description && <p className="text-lg leading-relaxed">{product.description}</p>}
        <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1">
          {facts.map(([k, v]) => (
            <div key={k} className="contents">
              <dt>{k}</dt>
              <dd className="font-medium text-ink">{v}</dd>
            </div>
          ))}
        </dl>
      </Section>
      <Section title="Delivery & collection">
        <p>
          <strong className="text-ink">Collect in store, free:</strong> {shortAddress}. We’ll WhatsApp you when your order is
          ready.
        </p>
        <p>
          <strong className="text-ink">Delivery:</strong> {payments.deliveryNote}
        </p>
      </Section>
      <Section title="Returns & exchanges">
        <p>{payments.returnsSummary}</p>
        <p>
          <Link href="/help/returns">Full returns & exchanges policy</Link>
        </p>
        <p>Questions about fit? Message us on WhatsApp before you buy, or book a foot assessment.</p>
      </Section>
    </div>
  );
}
