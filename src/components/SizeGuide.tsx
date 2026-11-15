"use client";

import Link from "next/link";
import { useRef } from "react";

// Approximate conversions; sizes differ a little between brands.
const rows: [eu: string, uk: string, usMen: string, usWomen: string, cm: string][] = [
  ["38", "5", "6", "7.5", "24"],
  ["39", "6", "7", "8.5", "24.5"],
  ["40", "6.5", "7.5", "9", "25"],
  ["41", "7.5", "8.5", "10", "26"],
  ["42", "8", "9", "10.5", "26.5"],
  ["43", "9", "10", "11.5", "27.5"],
  ["44", "9.5", "10.5", "12", "28"],
  ["45", "10.5", "11.5", "13", "29"],
  ["46", "11", "12", "13.5", "29.5"],
];

/** "Size guide" link that opens a size chart and measuring tips */
export function SizeGuide() {
  const ref = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button
        type="button"
        onClick={() => ref.current?.showModal()}
        className="text-[15px] font-medium underline underline-offset-4 hover:text-steel"
      >
        Size guide
      </button>
      <dialog
        ref={ref}
        aria-labelledby="size-guide-title"
        onClick={(e) => {
          // Clicking the dimmed backdrop closes it
          if (e.target === ref.current) ref.current?.close();
        }}
        className="m-auto w-[min(640px,calc(100%-2rem))] rounded-[2rem] bg-white p-0 text-ink backdrop:bg-ink/50"
      >
        <div className="flex max-h-[85vh] flex-col gap-6 overflow-y-auto p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <h2 id="size-guide-title" className="display text-4xl">
              Size guide
            </h2>
            <button
              type="button"
              onClick={() => ref.current?.close()}
              aria-label="Close size guide"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-tile hover:bg-line"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <div className="shrink-0 overflow-x-auto rounded-2xl border border-line">
            <table className="w-full text-left text-[15px]">
              <caption className="sr-only">Shoe size conversions</caption>
              <thead className="bg-tile">
                <tr>
                  {["EU", "UK", "US men", "US women", "Foot (cm)"].map((h) => (
                    <th key={h} scope="col" className="whitespace-nowrap px-4 py-3 font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r[0]} className="border-t border-line">
                    <th scope="row" className="px-4 py-2.5 font-semibold">
                      {r[0]}
                    </th>
                    {r.slice(1).map((v, i) => (
                      <td key={i} className="px-4 py-2.5">
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="-mt-3 text-sm text-steel">A guide only: sizes vary a little between brands and models.</p>

          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Measure your foot</h3>
            <ol className="flex list-decimal flex-col gap-1.5 pl-5 text-steel">
              <li>Stand on a sheet of paper with your heel against a wall, wearing the socks you run in.</li>
              <li>Mark the tip of your longest toe, then measure from the wall to the mark in cm.</li>
              <li>Measure both feet in the afternoon (feet swell during the day) and use the longer one.</li>
              <li>Running shoes need about a thumb’s width of space in front of your toes, so many runners go half a size up.</li>
            </ol>
          </div>

          <div className="flex flex-col gap-3 rounded-3xl bg-ink p-6 text-white">
            <p className="text-lg font-semibold">Not sure? We’ll measure you properly.</p>
            <p className="text-white/80">A foot assessment checks your size, width and arch, and you can try shoes on.</p>
            <Link href="/store#assessment" className="self-start rounded-full bg-blue px-6 py-3 font-semibold text-ink hover:bg-white">
              Book a foot assessment
            </Link>
          </div>
        </div>
      </dialog>
    </>
  );
}
