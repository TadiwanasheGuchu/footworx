import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage, InfoSection } from "@/components/InfoPage";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = { title: "Returns & exchanges" };

export default function ReturnsPage() {
  return (
    <InfoPage title="Returns & exchanges" intro="Wrong size or changed your mind? Here’s how returns and exchanges work.">
      <InfoSection title="Exchanges">
        <p>Unworn items in their original box, with tags and proof of purchase, can be exchanged for another size or product within <strong>14 days</strong> of purchase or delivery.</p>
        <p>Not sure about your size? Book a foot assessment before you buy, and we’ll fit you properly.</p>
      </InfoSection>
      <InfoSection title="Returns and refunds">
        <p>If you’d rather not exchange, unworn items can be returned within <strong>14 days</strong> for <strong>store credit</strong> to the full value.</p>
        <p>Please try shoes on indoors on a clean surface: shoes that have been worn outside can’t be returned unless they’re faulty.</p>
      </InfoSection>
      <InfoSection title="Faulty items">
        <p>If something is faulty, contact us and we’ll repair, replace or refund it in line with your consumer rights. Refunds go back the way you paid, within 7 working days.</p>
      </InfoSection>
      <InfoSection title="Items we can’t take back">
        <p>For hygiene reasons, we can’t take back worn socks, used insoles or headphones that have been used, unless they’re faulty.</p>
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
