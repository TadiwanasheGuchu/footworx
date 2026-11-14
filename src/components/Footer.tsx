import Link from "next/link";
import { Logo } from "./Logo";
import { mapsLink, site, whatsappLink } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-8 bg-tile">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-8 md:grid-cols-3">
        <div className="flex flex-col gap-4">
          <Logo height={52} />
          <p className="max-w-xs text-steel">{site.tagline}</p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="label mb-2 text-steel">Visit us</h2>
          <address className="not-italic">
            {site.addressLines.map((l, i) => (
              <span key={l} className={`block ${i === 0 ? "font-medium" : "text-steel"}`}>
                {l}
              </span>
            ))}
          </address>
          <a href={mapsLink()} target="_blank" rel="noopener noreferrer" className="mb-2 font-medium underline underline-offset-4">
            Get directions
          </a>
          {site.hours.map((h) => (
            <p key={h.days} className="text-steel">
              {h.days}: {h.time}
            </p>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="label mb-2 text-steel">Talk to us</h2>
          <a href={whatsappLink("Hi Footworx!")} target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">
            WhatsApp {site.phoneDisplay}
          </a>
          <a href={site.phoneHref} className="hover:underline">Call {site.phoneDisplay}</a>
          <a href={`mailto:${site.email}`} className="hover:underline">{site.email}</a>
          <Link href="/store#assessment" className="hover:underline">Book a foot assessment</Link>
          <Link href="/shop" className="hover:underline">Shop all shoes</Link>
          <Link href="/store" className="hover:underline">Directions & opening hours</Link>
        </div>
      </div>
      <p className="border-t border-line px-4 py-5 text-center text-sm text-steel">
        © {new Date().getFullYear()} {site.name}
      </p>
    </footer>
  );
}
