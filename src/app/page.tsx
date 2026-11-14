import Link from "next/link";
import { getFeatured, getProducts } from "@/lib/catalog";
import { ShoeShowcase } from "@/components/ShoeShowcase";
import { ProductCard } from "@/components/ProductCard";
import { shortAddress, site, whatsappLink } from "@/lib/site";

export const revalidate = 60;

const categories = ["Running", "Trail", "Football", "Casual"];

const accessoryTiles = [
  { category: "Insoles", text: "Support and comfort, matched to your foot assessment." },
  { category: "Socks", text: "Cushioned running socks that keep blisters away." },
  { category: "Headphones", text: "Shokz open-ear headphones: hear the road while you run." },
];

export default async function Home() {
  const [featured, products] = await Promise.all([getFeatured(), getProducts()]);
  const shoes = products.filter((p) => p.kind === "shoe");
  const accessories = products.filter((p) => p.kind === "accessory");
  const newArrivals = [...shoes].sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew)).slice(0, 8);
  const inCatalogue = new Set(products.map((p) => p.brand.toLowerCase()));

  return (
    <>
      <ShoeShowcase product={featured} variant="hero" />

      <section className="mx-auto max-w-7xl px-4 pt-14 sm:px-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <Link key={c} href={`/shop?category=${c}`} className="rounded-full bg-tile px-5 py-2.5 font-medium hover:bg-ink hover:text-white">
              {c}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-8">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-3xl font-bold tracking-tight">New in</h2>
          <Link href="/shop" className="font-medium underline underline-offset-4 hover:text-steel">View all</Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
          {newArrivals.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-8">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Accessories</h2>
          <Link href="/shop?kind=accessory" className="font-medium underline underline-offset-4 hover:text-steel">
            View all
          </Link>
        </div>
        <div className="mb-8 grid gap-3 sm:grid-cols-3">
          {accessoryTiles.map((t) => (
            <Link
              key={t.category}
              href={`/shop?category=${t.category}`}
              className="group flex flex-col gap-1 rounded-3xl bg-tile p-6 transition-colors hover:bg-ink hover:text-white"
            >
              <span className="display text-4xl">{t.category}</span>
              <span className="text-steel group-hover:text-white/75">{t.text}</span>
            </Link>
          ))}
        </div>
        {accessories.length > 0 && (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
            {accessories.slice(0, 4).map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-8">
        <div className="grid gap-8 rounded-[2rem] bg-ink p-8 text-white sm:p-12 md:grid-cols-[1.3fr_1fr] md:items-center">
          <div className="flex flex-col gap-3">
            <span className="label text-blue">Not sure which shoe?</span>
            <h2 className="display text-5xl sm:text-6xl">Start with a foot assessment</h2>
            <p className="max-w-lg text-lg text-white/80">
              We look at how you stand, walk and run, then match you to the right shoe for your feet.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <a
              href={whatsappLink("Hi Footworx, I'd like to book a foot assessment.")}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-blue px-7 py-3.5 text-center font-semibold text-ink hover:bg-white"
            >
              Book on WhatsApp
            </a>
            <Link href="/shoe-finder" className="rounded-full border border-white/40 px-7 py-3.5 text-center font-semibold hover:border-white">
              Try the 1-minute Shoe Finder
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-8">
        <h2 className="mb-5 text-3xl font-bold tracking-tight">Brands we stock</h2>
        <div className="flex flex-wrap gap-2">
          {site.brands.map((b) =>
            inCatalogue.has(b.toLowerCase()) ? (
              <Link
                key={b}
                href={`/shop?brand=${encodeURIComponent(b)}`}
                className="rounded-full border border-line px-6 py-3 text-lg font-semibold hover:border-ink"
              >
                {b}
              </Link>
            ) : (
              <a
                key={b}
                href={whatsappLink(`Hi Footworx, which ${b} products do you have in stock?`)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-line px-6 py-3 text-lg font-semibold hover:border-ink"
              >
                {b}
              </a>
            ),
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-8">
        <div className="grid gap-8 rounded-[2rem] bg-blue-soft p-8 sm:p-12 md:grid-cols-[1.3fr_1fr] md:items-center">
          <div className="flex flex-col gap-3">
            <h2 className="display text-5xl sm:text-6xl">Try them on in Walvis Bay</h2>
            <p className="max-w-lg text-lg text-steel">
              Reserve your size on WhatsApp and collect it in the shop. We’ll help you find the right fit.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <Link href="/store" className="rounded-full bg-ink px-7 py-3.5 text-center font-semibold text-white hover:bg-[#1d3349]">
              Directions & opening hours
            </Link>
            <a
              href={whatsappLink("Hi Footworx, I'd like help finding a shoe.")}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-ink/30 bg-white px-7 py-3.5 text-center font-semibold hover:border-ink"
            >
              Ask us on WhatsApp
            </a>
            <span className="text-sm text-steel">{shortAddress}</span>
          </div>
        </div>
      </section>
    </>
  );
}
