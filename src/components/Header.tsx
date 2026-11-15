"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Logo } from "./Logo";
import { CartButton } from "./CartButton";
import { whatsappLink } from "@/lib/site";

const categories = [
  { href: "/shop", label: "All" },
  { href: "/shop?category=Running", label: "Running" },
  { href: "/shop?category=Trail", label: "Trail" },
  { href: "/shop?category=Football", label: "Football" },
  { href: "/shop?category=Casual", label: "Casual" },
  { href: "/shop?kind=accessory", label: "Accessories" },
  { href: "/gifts", label: "Gifts" },
];

const accessoryTypes = ["Insoles", "Socks", "Headphones"];

function CategoryPills({ onPick }: { onPick?: () => void }) {
  const path = usePathname();
  const params = useSearchParams();
  const cat = params.get("category");
  const current =
    path === "/gifts"
      ? "/gifts"
      : path.startsWith("/accessories/")
      ? "/shop?kind=accessory"
      : path !== "/shop"
        ? null
        : cat && accessoryTypes.includes(cat)
          ? "/shop?kind=accessory"
          : cat
            ? `/shop?category=${cat}`
            : params.get("kind") === "accessory"
              ? "/shop?kind=accessory"
              : "/shop";
  return (
    <>
      {categories.map((c) => {
        const on = current === c.href;
        return (
          <Link
            key={c.href}
            href={c.href}
            onClick={onPick}
            aria-current={on ? "page" : undefined}
            className={`whitespace-nowrap rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors ${
              on ? "bg-ink text-white" : "text-ink hover:bg-tile"
            }`}
          >
            {c.label}
          </Link>
        );
      })}
    </>
  );
}

function SearchLink({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/search"
      onClick={onClick}
      aria-label="Search"
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full hover:bg-tile"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-4-4" />
      </svg>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 sm:px-8">
        <Link href="/" aria-label="Footworx home" onClick={() => setOpen(false)}>
          <Logo priority height={52} />
        </Link>
        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Categories">
          <Suspense>
            <CategoryPills />
          </Suspense>
        </nav>
        <div className="hidden shrink-0 items-center gap-1 md:flex">
          <Link href="/shoe-finder" className="whitespace-nowrap rounded-full px-3.5 py-2 text-[15px] font-medium hover:bg-tile">
            Shoe Finder
          </Link>
          <Link href="/store#assessment" className="whitespace-nowrap rounded-full px-3.5 py-2 text-[15px] font-medium hover:bg-tile">
            Foot assessment
          </Link>
          <Link href="/store" className="hidden whitespace-nowrap rounded-full px-3.5 py-2 text-[15px] font-medium hover:bg-tile 2xl:block">
            Visit us
          </Link>
          <a
            href={whatsappLink("Hi Footworx, I have a question.")}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 whitespace-nowrap rounded-full bg-ink px-5 py-2.5 text-[15px] font-semibold text-white hover:bg-blue hover:text-ink"
          >
            WhatsApp us
          </a>
          <SearchLink />
          <CartButton />
        </div>
        <div className="flex items-center gap-1 md:hidden">
        <SearchLink onClick={() => setOpen(false)} />
        <CartButton onClick={() => setOpen(false)} />
        <button
          type="button"
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full hover:bg-tile"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
        </div>
      </div>
      <nav className="mx-auto hidden max-w-7xl gap-1 overflow-x-auto px-4 pb-3 sm:px-8 md:flex xl:hidden" aria-label="Categories">
        <Suspense>
          <CategoryPills />
        </Suspense>
      </nav>
      {open && (
        <nav id="mobile-nav" className="flex flex-col gap-1 border-t border-line px-4 py-4 md:hidden" aria-label="Mobile">
          <div className="flex flex-wrap gap-1">
            <Suspense>
              <CategoryPills onPick={() => setOpen(false)} />
            </Suspense>
          </div>
          <Link href="/shoe-finder" onClick={() => setOpen(false)} className="mt-2 rounded-full px-4 py-3 font-medium hover:bg-tile">
            Shoe Finder
          </Link>
          <Link href="/store#assessment" onClick={() => setOpen(false)} className="rounded-full px-4 py-3 font-medium hover:bg-tile">
            Foot assessment
          </Link>
          <Link href="/store" onClick={() => setOpen(false)} className="rounded-full px-4 py-3 font-medium hover:bg-tile">
            Visit us
          </Link>
          <a
            href={whatsappLink("Hi Footworx, I have a question.")}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-ink px-4 py-3 text-center font-semibold text-white"
          >
            WhatsApp us
          </a>
        </nav>
      )}
    </header>
  );
}
