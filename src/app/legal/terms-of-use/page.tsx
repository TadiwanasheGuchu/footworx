import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage, InfoSection } from "@/components/InfoPage";

export const metadata: Metadata = { title: "Terms of Use" };

export default function TermsOfUsePage() {
  return (
    <InfoPage title="Terms of Use" intro="The rules for using this website." updated="15 November 2026">
      <InfoSection title="Using this site">
        <p>By using this website you agree to these terms. Buying from us is covered by our <Link href="/legal/terms-of-sale">Terms of Sale</Link>.</p>
      </InfoSection>
      <InfoSection title="Information on the site">
        <p>We try to keep product details, prices and stock accurate, but mistakes can happen and stock changes quickly. Product colours can look slightly different on different screens.</p>
        <p>Size guides, the Shoe Finder and other advice are general guidance, not medical advice.</p>
      </InfoSection>
      <InfoSection title="Brands, logos and photos">
        <p>Brand names and logos belong to their owners and are shown because we sell their products. Photos and text on this site may not be copied without permission.</p>
      </InfoSection>
      <InfoSection title="Links to other sites">
        <p>Links to WhatsApp, Google Maps, payment pages and other sites are provided for convenience. We aren’t responsible for their content or how they handle your information.</p>
      </InfoSection>
      <InfoSection title="Changes">
        <p>We may update these terms from time to time. The date at the top shows the latest version.</p>
      </InfoSection>
    </InfoPage>
  );
}
