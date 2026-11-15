"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";

export function CartButton({ onClick }: { onClick?: () => void }) {
  const { count, ready } = useCart();
  const label = ready && count > 0 ? `Cart, ${count} item${count === 1 ? "" : "s"}` : "Cart";
  return (
    <Link
      href="/cart"
      onClick={onClick}
      aria-label={label}
      className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full hover:bg-tile"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M6 7h12l-1 13H7L6 7z" />
        <path d="M9 7V6a3 3 0 0 1 6 0v1" />
      </svg>
      {ready && count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-dune px-1 text-xs font-bold text-ink">
          {count}
        </span>
      )}
    </Link>
  );
}
