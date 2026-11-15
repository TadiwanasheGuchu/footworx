import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage, InfoSection } from "@/components/InfoPage";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Terms of Sale" };

export default function TermsOfSalePage() {
  return (
    <InfoPage title="Terms of Sale" updated="[date]" draft>
      <InfoSection title="1. Who you’re buying from">
        <p>
          You are buying from [registered business name] trading as Footworx Namibia, [registration number], at{" "}
          {site.addressLines.join(", ")}. Phone and WhatsApp {site.phoneDisplay}, email{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </InfoSection>
      <InfoSection title="2. Prices">
        <p>Prices are in Namibian dollars (N$) and include VAT where applicable [confirm VAT status]. Delivery is charged separately and confirmed before you pay for it.</p>
        <p>We work hard to show correct prices. If a price is clearly wrong, we’ll contact you before going ahead, and you can cancel.</p>
      </InfoSection>
      <InfoSection title="3. Orders and stock">
        <p>Placing an order is an offer to buy. We confirm your order by WhatsApp or email. Stock is shared with our shop, so if an item sells out before we confirm, we’ll let you know and refund anything you’ve paid.</p>
      </InfoSection>
      <InfoSection title="4. Payment">
        <p>You can pay by card through our payment provider ([PayToday / DPO Pay]), by EFT, or in store when you collect. Card payments are handled on the provider’s secure page; we never see or store your full card number.</p>
        <p>For EFT, please use your order number as the reference. We prepare your order once the payment shows in our account.</p>
      </InfoSection>
      <InfoSection title="5. Collection and delivery">
        <p>
          See <Link href="/help/delivery">Delivery & collection</Link> for areas, prices and how long it takes. Risk in the goods passes to you when you collect them or they are delivered.
        </p>
      </InfoSection>
      <InfoSection title="6. Returns, exchanges and faulty goods">
        <p>
          See <Link href="/help/returns">Returns & exchanges</Link>. Nothing in these terms limits the rights you have under Namibian consumer law [confirm with legal adviser, including the Electronic Transactions Act, 2019].
        </p>
      </InfoSection>
      <InfoSection title="7. Foot assessments and advice">
        <p>Our foot assessments and shoe recommendations, including the online Shoe Finder, are general guidance to help you choose footwear. They are not a medical diagnosis. If you have pain or an injury, please also see a health professional.</p>
      </InfoSection>
      <InfoSection title="8. Gift vouchers">
        <p>[Voucher amounts, how long they’re valid, and that they can’t be exchanged for cash.]</p>
      </InfoSection>
      <InfoSection title="9. Contact and complaints">
        <p>Unhappy with something? Contact us first and we’ll do our best to put it right.</p>
      </InfoSection>
    </InfoPage>
  );
}
