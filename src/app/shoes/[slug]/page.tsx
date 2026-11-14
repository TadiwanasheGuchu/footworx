import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, getProducts } from "@/lib/catalog";
import { ShoeShowcase } from "@/components/ShoeShowcase";
import { ProductCard } from "@/components/ProductCard";

type Params = { params: Promise<{ slug: string }> };

export const revalidate = 60;

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  return { title: product ? `${product.brand} ${product.name}` : "Shoe not found" };
}

export default async function ShoePage({ params }: Params) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const products = await getProducts();
  const related = products.filter((p) => p.slug !== product.slug && (p.brand === product.brand || p.category === product.category)).slice(0, 4);

  return (
    <>
      <ShoeShowcase product={product} variant="detail" />

      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-14 sm:px-8 md:grid-cols-3">
        {[
          ["Collect in store", "Reserve on WhatsApp and pick up at LERA Medical Centre, Walvis Bay."],
          ["Not sure of your size?", "Book a foot assessment, or message us and we’ll help you choose."],
          ["Pay your way", "WhatsApp orders, EFT or in store. Card payments online coming soon."],
        ].map(([title, text]) => (
          <div key={title} className="rounded-3xl bg-tile p-6">
            <h2 className="mb-2 text-lg font-semibold">{title}</h2>
            <p className="text-steel">{text}</p>
          </div>
        ))}
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-8">
          <h2 className="mb-6 text-3xl font-bold tracking-tight">You might also like</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
