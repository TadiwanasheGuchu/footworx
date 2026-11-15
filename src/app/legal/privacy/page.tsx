import type { Metadata } from "next";
import { InfoPage, InfoSection } from "@/components/InfoPage";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <InfoPage title="Privacy Policy" intro="What information we collect, why, and what we do with it." updated="15 November 2026">
      <InfoSection title="Who we are">
        <p>
          Footworx Namibia, {site.addressLines.join(", ")}. Contact us about privacy at{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a> or {site.phoneDisplay}.
        </p>
      </InfoSection>
      <InfoSection title="What we collect">
        <ul>
          <li><strong>Order details</strong> you give at checkout: name, phone number, email (optional), delivery address and what you order.</li>
          <li><strong>Messages</strong> you send us on WhatsApp or by email, including Shoe Finder answers you choose to send.</li>
          <li><strong>Foot assessment notes</strong> we take in store, to recommend shoes and insoles.</li>
          <li><strong>Basic technical data</strong> our website host keeps in its logs, such as your IP address and browser type, for security.</li>
        </ul>
        <p>We do not use advertising or tracking cookies.</p>
      </InfoSection>
      <InfoSection title="Stored on your own device">
        <p>Your cart and recent orders are saved in your browser (local storage) so they’re still there when you come back. They stay on your device; clearing your browser data removes them.</p>
      </InfoSection>
      <InfoSection title="Why we use it">
        <ul>
          <li>To process, prepare and deliver your order, and to contact you about it.</li>
          <li>To give you advice and after-sales help.</li>
          <li>To keep records we’re required to keep, such as invoices.</li>
        </ul>
        <p>We only send you marketing if you ask us to, and you can stop it any time.</p>
      </InfoSection>
      <InfoSection title="Who we share it with">
        <p>We don’t sell your information. We only share what’s needed with services that help us run the shop:</p>
        <ul>
          <li><strong>Our payment provider</strong>, to process card payments once online payments are available.</li>
          <li><strong>WhatsApp</strong> (Meta), when you message us.</li>
          <li><strong>Netlify</strong>, which hosts this website, and <strong>Sanity</strong>, where our product information is stored.</li>
          <li><strong>Google Maps</strong>, shown on our Visit us page; Google may receive your IP address when the map loads.</li>
          <li><strong>Couriers</strong>, to deliver your order.</li>
        </ul>
        <p>Some of these services store data outside Namibia.</p>
      </InfoSection>
      <InfoSection title="How long we keep it">
        <p>We keep order records for as long as the law requires for tax and accounting, and other information only as long as we need it to help you.</p>
      </InfoSection>
      <InfoSection title="Your choices">
        <p>You can ask to see, correct or delete the information we hold about you, or stop marketing messages, by contacting us.</p>
      </InfoSection>
    </InfoPage>
  );
}
