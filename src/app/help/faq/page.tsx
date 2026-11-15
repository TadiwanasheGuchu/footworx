import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "@/components/InfoPage";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = { title: "Help & FAQ" };

const faqs: [string, React.ReactNode][] = [
  ["What is a biomechanical foot assessment?", <>We look at how you stand, walk and run, check your arches and foot shape, and recommend shoes and insoles that suit you. <Link href="/store#assessment">Book one here</Link>.</>],
  ["How do I find my size?", <>Use the <strong>Size guide</strong> on any shoe page, try the <Link href="/shoe-finder">Shoe Finder</Link>, or come in and we’ll measure you.</>],
  ["Can I try shoes on before I buy?", <>Yes. Reserve on WhatsApp and try them at our shop at {site.addressLines[0]}, Walvis Bay.</>],
  ["How do I pay?", <>Card online (coming soon), EFT, or card and cash in store. You can also order on WhatsApp.</>],
  ["Do you deliver?", <>Yes. See <Link href="/help/delivery">Delivery & collection</Link>.</>],
  ["Can I return or exchange?", <>See <Link href="/help/returns">Returns & exchanges</Link>.</>],
  ["A size is sold out. Can you get it?", <>Tap the sold-out size on the shoe’s page and choose <strong>Notify me on WhatsApp</strong>, and we’ll let you know.</>],
];

export default function FaqPage() {
  return (
    <InfoPage title="Help & FAQ" intro="Quick answers to common questions.">
      <div className="flex flex-col border-t border-line">
        {faqs.map(([q, a]) => (
          <details key={q} className="group border-b border-line">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-lg font-semibold [&::-webkit-details-marker]:hidden">
              {q}
              <span aria-hidden className="text-2xl transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="pb-6 text-lg leading-relaxed text-ink/85 [&_a]:font-semibold [&_a]:underline">{a}</p>
          </details>
        ))}
      </div>
      <p className="text-lg">
        Still stuck?{" "}
        <a className="font-semibold underline" href={whatsappLink("Hi Footworx, I have a question.")} target="_blank" rel="noopener noreferrer">
          WhatsApp us on {site.phoneDisplay}
        </a>{" "}
        or email <a className="font-semibold underline" href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </InfoPage>
  );
}
