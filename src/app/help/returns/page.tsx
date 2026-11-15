import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage, InfoSection } from "@/components/InfoPage";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = { title: "Returns & exchanges" };

export default function ReturnsPage() {
  return (
    <InfoPage title="Returns & exchanges" intro="Wrong size or changed your mind? Here’s how returns and exchanges work." draft>
      <InfoSection title="Exchanges">
        <p>[Unworn items in their original box can be exchanged for another size or product within [X] days of purchase, with proof of purchase.]</p>
        <p>Not sure about your size? Book a foot assessment before you buy, and we’ll fit you properly.</p>
      </InfoSection>
      <InfoSection title="Returns and refunds">
        <p>[Whether Footworx offers refunds, store credit or exchanges only, and within how many days.]</p>
        <p>[How refunds are paid: back to the card, by EFT, or as store credit, and how long it takes.]</p>
      </InfoSection>
      <InfoSection title="Faulty items">
        <p>If something is faulty, contact us and we’ll repair, replace or refund it in line with your consumer rights.</p>
      </InfoSection>
      <InfoSection title="Items we can’t take back">
        <p>[For hygiene reasons: worn socks, used insoles and opened earphone tips, unless faulty.]</p>
      </InfoSection>
      <InfoSection title="How to return or exchange">
        <ul>
          <li>Bring the item and your order number or receipt to {site.addressLines[0]}, Walvis Bay, or</li>
          <li>
            <a href={whatsappLink("Hi Footworx, I'd like to return or exchange an item.")} target="_blank" rel="noopener noreferrer">
              WhatsApp us
            </a>{" "}
            and we’ll arrange it.
          </li>
        </ul>
        <p>
          See also our <Link href="/legal/terms-of-sale">Terms of Sale</Link>.
        </p>
      </InfoSection>
    </InfoPage>
  );
}
