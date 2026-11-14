"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "./Logo";
import { whatsappLink } from "@/lib/site";

const nav = [
  { href: "/shop", label: "Shop" },
  { href: "/shop?brand=Hoka", label: "Hoka" },
  { href: "/shop?brand=Joma", label: "Joma" },
  { href: "/store", label: "Visit the shop" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-ink text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-8">
        <Link href="/" aria-label="Footworx home" onClick={() => setOpen(false)}>
          <Logo />
        </Link>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="text-[15px] font-bold hover:text-blue">
              {n.label}
            </Link>
          ))}
          <a
            href={whatsappLink("Hi Footworx, I have a question.")}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-[2px] bg-blue px-4 py-2 text-[15px] font-bold text-ink hover:bg-white"
          >
            WhatsApp us
          </a>
        </nav>
        <button
          type="button"
          className="flex h-11 w-11 cursor-pointer items-center justify-center md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" className="flex flex-col border-t border-white/15 px-4 pb-4 md:hidden" aria-label="Mobile">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="py-3 text-lg font-bold">
              {n.label}
            </Link>
          ))}
          <a
            href={whatsappLink("Hi Footworx, I have a question.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 rounded-[2px] bg-blue px-4 py-3 text-center font-bold text-ink"
          >
            WhatsApp us
          </a>
        </nav>
      )}
    </header>
  );
}
