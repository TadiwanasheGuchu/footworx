import type { Metadata } from "next";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = { title: "Visit the shop" };

export default function StorePage() {
  return (
    <>
      <section className="bg-blue">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-8">
          <h1 className="display text-6xl sm:text-8xl">Visit the shop</h1>
          <p className="mt-4 max-w-xl text-lg">Come try them on. We’ll help you find the right shoe and the right fit.</p>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-14 sm:px-8 md:grid-cols-3">
        <div className="rounded-[4px] bg-white p-6">
          <h2 className="label mb-3 text-steel">Address</h2>
          <p className="text-lg font-bold">{site.address}</p>
        </div>
        <div className="rounded-[4px] bg-white p-6">
          <h2 className="label mb-3 text-steel">Opening hours</h2>
          <ul className="flex flex-col gap-1 text-lg">
            {site.hours.map((h) => (
              <li key={h.days} className="flex justify-between gap-4">
                <span className="font-bold">{h.days}</span>
                <span>{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-3 rounded-[4px] bg-white p-6">
          <h2 className="label text-steel">Contact</h2>
          <p className="text-lg font-bold">{site.phoneDisplay}</p>
          <a
            href={whatsappLink("Hi Footworx, I have a question.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto rounded-[2px] bg-ink px-5 py-3 text-center font-bold text-white"
          >
            Message us on WhatsApp
          </a>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-8">
        <div className="flex aspect-[21/9] items-center justify-center rounded-[4px] border-2 border-dashed border-line bg-white text-steel">
          [Map and shop photo go here]
        </div>
      </section>
    </>
  );
}
