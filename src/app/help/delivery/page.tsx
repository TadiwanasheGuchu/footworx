import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage, InfoSection } from "@/components/InfoPage";
import { payments, site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = { title: "Delivery & collection" };

export default function DeliveryPage() {
  return (
    <InfoPage title="Delivery & collection" intro="Collect from our shop in Walvis Bay, or have your order delivered." draft>
      <InfoSection title="Collect in store (free)">
        <p>Choose “Collect in store” at checkout. We’ll WhatsApp you on the number you give us when your order is ready.</p>
        <p>
          <strong>Where:</strong> {site.addressLines.join(", ")}.
        </p>
        <p>
          <strong>When:</strong> {site.hours.map((h) => `${h.days} ${h.time}`).join(", ")}.
        </p>
        <p>Please bring your order number. We keep orders for collection for [7] days.</p>
      </InfoSection>
      <InfoSection title="Delivery">
        <p>{payments.deliveryNote}</p>
        <ul>
          <li>[Delivery areas and prices, e.g. Walvis Bay N$ [ ], Swakopmund N$ [ ], rest of Namibia by courier N$ [ ]]</li>
          <li>[How long delivery takes, e.g. 1 to 2 working days in Walvis Bay and Swakopmund]</li>
        </ul>
      </InfoSection>
      <InfoSection title="Questions?">
        <p>
          <a href={whatsappLink("Hi Footworx, I have a question about delivery.")} target="_blank" rel="noopener noreferrer">
            WhatsApp us on {site.phoneDisplay}
          </a>{" "}
          or see <Link href="/help/returns">Returns & exchanges</Link>.
        </p>
      </InfoSection>
    </InfoPage>
  );
}
