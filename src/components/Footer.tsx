import Link from "next/link";
import { Logo } from "./Logo";
import { mapsLink, site, whatsappLink } from "@/lib/site";

// Shop links, like the big link columns at the bottom of sports brand sites
const shopColumns: { title: string; links: [string, string][] }[] = [
  {
    title: "Featured",
    links: [
      ["New in", "/shop?kind=shoe"],
      ["Sale", "/shop?sale=1"],
      ["Gifts", "/gifts"],
      ["Shoe Finder", "/shoe-finder"],
      ["Foot assessment", "/store#assessment"],
    ],
  },
  {
    title: "Shoes",
    links: [
      ["Running", "/shop?category=Running"],
      ["Trail", "/shop?category=Trail"],
      ["Football", "/shop?category=Football"],
      ["Everyday", "/shop?category=Casual"],
      ["All shoes", "/shop?kind=shoe"],
    ],
  },
  {
    title: "Clothing",
    links: [
      ["All clothing", "/shop?category=Clothing"],
      ["Socks", "/shop?category=Socks"],
    ],
  },
  {
    title: "Accessories",
    links: [
      ["Insoles", "/shop?category=Insoles"],
      ["Socks", "/shop?category=Socks"],
      ["Headphones", "/shop?category=Headphones"],
      ["All accessories", "/shop?kind=accessory"],
    ],
  },
];

const helpLinks: [string, string][] = [
  ["Help & FAQ", "/help/faq"],
  ["Delivery & collection", "/help/delivery"],
  ["Returns & exchanges", "/help/returns"],
  ["Size help: Shoe Finder", "/shoe-finder"],
];

const companyLinks: [string, string][] = [
  ["About Footworx", "/about"],
  ["Foot assessments", "/store#assessment"],
  ["Visit us", "/store"],
  ["Gift vouchers", "/gifts"],
];

const legalLinks: [string, string][] = [
  ["Terms of Sale", "/legal/terms-of-sale"],
  ["Privacy Policy", "/legal/privacy"],
  ["Terms of Use", "/legal/terms-of-use"],
];

function Column({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <nav aria-label={title} className="flex flex-col gap-2.5">
      <h2 className="mb-1 font-semibold">{title}</h2>
      {links.map(([label, href]) => (
        <Link key={label + href} href={href} className="text-steel hover:text-ink hover:underline">
          {label}
        </Link>
      ))}
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="mt-8">
      {/* Shop links */}
      <div className="border-t border-line">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-4 py-14 sm:px-8 md:grid-cols-4">
          {shopColumns.map((c) => (
            <Column key={c.title} {...c} />
          ))}
        </div>
      </div>

      <div className="bg-tile">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div className="flex flex-col gap-4">
            <Logo height={64} />
            <p className="max-w-xs text-steel">{site.tagline}</p>
            <a
              href="https://www.facebook.com/p/Footworx-100063710414247/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 self-start font-medium hover:underline"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.5 1.6-1.5h1.7V4.4c-.3 0-1.3-.1-2.5-.1-2.4 0-4.1 1.5-4.1 4.2v2.3H7.5V14h2.7v8h3.3z" />
              </svg>
              Footworx on Facebook
            </a>
          </div>
          <Column title="Help" links={helpLinks} />
          <Column title="Footworx" links={companyLinks} />
          <div className="flex flex-col gap-2.5">
            <h2 className="mb-1 font-semibold">Visit & contact</h2>
            <address className="not-italic text-steel">
              {site.addressLines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
            <a href={mapsLink()} target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-4">
              Get directions
            </a>
            <p className="text-steel">{site.hours.map((h) => `${h.days}: ${h.time}`).join(" · ")}</p>
            <a href={whatsappLink("Hi Footworx!")} target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">
              WhatsApp {site.phoneDisplay}
            </a>
            <a href={site.phoneHref} className="hover:underline">
              Call {site.phoneDisplay}
            </a>
            <a href={`mailto:${site.email}`} className="hover:underline">
              {site.email}
            </a>
          </div>
        </div>

        <div className="border-t border-line">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-sm text-steel sm:px-8 md:flex-row md:items-center md:justify-between">
            <p>
              © {new Date().getFullYear()} {site.name} · Walvis Bay, Namibia
            </p>
            <p>We accept: card (online soon), EFT, and card or cash in store</p>
            <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-2">
              {legalLinks.map(([label, href]) => (
                <Link key={href} href={href} className="hover:text-ink hover:underline">
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
