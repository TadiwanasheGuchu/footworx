import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage, InfoSection } from "@/components/InfoPage";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "About Footworx" };

export default function AboutPage() {
  return (
    <InfoPage title="About Footworx" intro={site.tagline}>
      <InfoSection title="What we do">
        <p>
          Footworx is a specialist running and footwear shop at {site.addressLines[0]} in Walvis Bay. We start with your feet:
          a biomechanical foot assessment shows how you stand, walk and run, so we can recommend shoes and insoles that suit you.
        </p>
        <p>Every customer gets honest, personal advice from people who understand feet and running, whether you’re training for a race, starting out, or on your feet all day at work.</p>
      </InfoSection>
      <InfoSection title="Brands we stock">
        <p>{site.brands.join(", ")}.</p>
      </InfoSection>
      <InfoSection title="Visit us">
        <p>
          {site.addressLines.join(", ")}. <Link href="/store">Directions and opening hours</Link>.
        </p>
      </InfoSection>
    </InfoPage>
  );
}
