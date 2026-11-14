import Link from "next/link";
import { Logo } from "./Logo";
import { site, whatsappLink } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-8 md:grid-cols-3">
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="max-w-xs text-white/80">Running, football and everyday shoes in Windhoek.</p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="label mb-2 text-blue">Visit us</h2>
          <p>{site.address}</p>
          {site.hours.map((h) => (
            <p key={h.days} className="text-white/80">
              {h.days}: {h.time}
            </p>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="label mb-2 text-blue">Talk to us</h2>
          <a href={whatsappLink("Hi Footworx!")} target="_blank" rel="noopener noreferrer" className="hover:text-blue">
            WhatsApp {site.phoneDisplay}
          </a>
          <Link href="/shop" className="hover:text-blue">Shop all shoes</Link>
          <Link href="/store" className="hover:text-blue">Store & opening hours</Link>
        </div>
      </div>
      <p className="border-t border-white/15 px-4 py-5 text-center text-sm text-white/70">
        © {new Date().getFullYear()} {site.name}
      </p>
    </footer>
  );
}
