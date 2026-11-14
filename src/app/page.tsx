import Link from "next/link";
import { products } from "@/data/products";
import { ShoeShowcase } from "@/components/ShoeShowcase";
import { ProductCard } from "@/components/ProductCard";
import { site, whatsappLink } from "@/lib/site";

export default function Home() {
  const featured = products[0];
  const newArrivals = products.slice(0, 4);

  return (
    <>
      <ShoeShowcase product={featured} variant="hero" />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-8">
        <h2 className="label mb-6 text-steel">Shop by brand</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/shop?brand=Hoka" className="group flex items-end justify-between rounded-[4px] bg-ink p-8 text-white">
            <span className="display text-6xl sm:text-7xl">Hoka</span>
            <span className="font-bold group-hover:text-blue">Running & trail →</span>
          </Link>
          <Link href="/shop?brand=Joma" className="group flex items-end justify-between rounded-[4px] bg-blue p-8 text-ink">
            <span className="display text-6xl sm:text-7xl">Joma</span>
            <span className="font-bold group-hover:underline">Football & training →</span>
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-8">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="display text-5xl">New in</h2>
          <Link href="/shop" className="font-bold underline underline-offset-4 hover:text-steel">View all</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {newArrivals.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <section className="bg-dune">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-8 md:grid-cols-[1.3fr_1fr] md:items-center">
          <div className="flex flex-col gap-4">
            <h2 className="display text-5xl sm:text-6xl">Try them on in Windhoek</h2>
            <p className="max-w-lg text-lg">
              Reserve your size online or on WhatsApp and collect it in the shop. We’ll help you find the right fit.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <Link href="/store" className="rounded-[2px] bg-ink px-6 py-4 text-center font-bold text-white hover:-translate-y-0.5">
              Opening hours & directions
            </Link>
            <a
              href={whatsappLink("Hi Footworx, I'd like help finding a shoe.")}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-[2px] border-2 border-ink px-6 py-[14px] text-center font-bold hover:bg-ink hover:text-white"
            >
              Ask us on WhatsApp
            </a>
            <span className="text-sm font-semibold">{site.address}</span>
          </div>
        </div>
      </section>
    </>
  );
}
