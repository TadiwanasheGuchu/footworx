"use client";

import { useRef } from "react";

/** A row that swipes sideways on phones, with arrow buttons on bigger screens */
export function Scroller({ label, title, action, children }: { label: string; title?: React.ReactNode; action?: React.ReactNode; children: React.ReactNode }) {
  const track = useRef<HTMLUListElement>(null);
  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 700), behavior: "smooth" });
  };
  const arrow = "flex h-11 w-11 items-center justify-center rounded-full bg-tile hover:bg-line";
  return (
    <section aria-label={label}>
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>{title}</div>
        <div className="flex items-center gap-3">
          {action}
          <div className="hidden gap-2 md:flex">
            <button type="button" onClick={() => go(-1)} aria-label={`Scroll ${label} back`} className={arrow}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>
            <button type="button" onClick={() => go(1)} aria-label={`Scroll ${label} forward`} className={arrow}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <ul
        ref={track}
        className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-4 pb-2 [scrollbar-width:none] sm:-mx-8 sm:px-8 [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </ul>
    </section>
  );
}
