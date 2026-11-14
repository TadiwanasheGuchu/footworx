import type { Metadata } from "next";
import { mapsEmbed, mapsLink, site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Visit us & foot assessments",
  description: "Find Footworx at LERA Medical Centre, Walvis Bay, and book a biomechanical foot assessment.",
};

const steps = [
  ["We look at how you stand and move", "Arches, foot shape and how your feet land when you walk or run."],
  ["We talk about what you do", "Running, walking, standing all day at work, or recovering from pain or injury."],
  ["We match you to the right shoe", "From the brands we stock, and try them on until the fit feels right."],
];

export default function StorePage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-8">
        <div className="rounded-[2rem] bg-blue-soft px-6 py-14 sm:px-12">
          <h1 className="display text-6xl sm:text-8xl">Visit us</h1>
          <p className="mt-4 max-w-xl text-lg text-steel">
            Find us at LERA Medical Centre in Walvis Bay. Come for a foot assessment, try shoes on, or collect an order.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-10 sm:px-8 md:grid-cols-3">
        <div className="flex flex-col gap-3 rounded-3xl bg-tile p-6">
          <h2 className="label text-steel">Address</h2>
          <address className="text-lg not-italic">
            {site.addressLines.map((l, i) => (
              <span key={l} className={`block ${i === 0 ? "font-semibold" : ""}`}>
                {l}
              </span>
            ))}
          </address>
          <a
            href={mapsLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto rounded-full border border-ink/30 bg-white px-5 py-3 text-center font-semibold hover:border-ink"
          >
            Get directions
          </a>
        </div>
        <div className="rounded-3xl bg-tile p-6">
          <h2 className="label mb-3 text-steel">Opening hours</h2>
          <ul className="flex flex-col gap-1 text-lg">
            {site.hours.map((h) => (
              <li key={h.days} className="flex justify-between gap-4">
                <span className="font-semibold">{h.days}</span>
                <span>{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-3 rounded-3xl bg-tile p-6">
          <h2 className="label text-steel">Contact</h2>
          <a href={site.phoneHref} className="text-lg font-semibold hover:underline">
            {site.phoneDisplay}
          </a>
          <a href={`mailto:${site.email}`} className="text-lg hover:underline">
            {site.email}
          </a>
          <a
            href={whatsappLink("Hi Footworx, I have a question.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto rounded-full bg-ink px-5 py-3 text-center font-semibold text-white hover:bg-[#1d3349]"
          >
            Message us on WhatsApp
          </a>
        </div>
      </section>

      <section id="assessment" className="mx-auto max-w-7xl scroll-mt-24 px-4 pb-10 sm:px-8">
        <div className="grid gap-8 rounded-[2rem] bg-ink p-8 text-white sm:p-12 lg:grid-cols-[1fr_1.3fr]">
          <div className="flex flex-col gap-4">
            <span className="label text-blue">Our speciality</span>
            <h2 className="display text-5xl sm:text-6xl">Biomechanical foot assessment</h2>
            <p className="text-lg text-white/80">
              The right shoe starts with your feet. We assess how you stand, walk and run, then recommend shoes that suit
              your feet and what you do.
            </p>
            <a
              href={whatsappLink("Hi Footworx, I'd like to book a foot assessment.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 self-start rounded-full bg-blue px-7 py-3.5 font-semibold text-ink hover:bg-white"
            >
              Book on WhatsApp
            </a>
          </div>
          <ol className="flex flex-col gap-3">
            {steps.map(([title, text], i) => (
              <li key={title} className="flex gap-4 rounded-3xl bg-white/[0.06] p-5">
                <span className="display text-4xl text-blue">{i + 1}</span>
                <span className="flex flex-col gap-1">
                  <span className="text-lg font-semibold">{title}</span>
                  <span className="text-white/75">{text}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-line bg-tile">
          <iframe
            title="Map to Footworx at LERA Medical Centre, Walvis Bay"
            src={mapsEmbed()}
            className="block aspect-[4/3] w-full sm:aspect-[21/9]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}
