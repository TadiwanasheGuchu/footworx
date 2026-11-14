import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Product } from "@/data/products";
import { getProducts } from "@/lib/catalog";
import { ShoeShowcase } from "./ShoeShowcase";
import { ProductCard } from "./ProductCard";

type Kind = Product["kind"];
export type SlugParams = { params: Promise<{ slug: string }> };

async function find(kind: Kind, slug: string) {
  const all = await getProducts();
  return { all, product: all.find((p) => p.kind === kind && p.slug === slug) };
}

export async function staticParamsFor(kind: Kind) {
  return (await getProducts()).filter((p) => p.kind === kind).map((p) => ({ slug: p.slug }));
}

export async function metadataFor(kind: Kind, { params }: SlugParams): Promise<Metadata> {
  const { slug } = await params;
  const { product } = await find(kind, slug);
  return {
    title: product ? `${product.brand} ${product.name}` : "Not found",
    description: product?.description || undefined,
  };
}

/** The product page for both shoes and accessories */
export async function ProductPage({ kind, params }: { kind: Kind } & SlugParams) {
  const { slug } = await params;
  const { all, product } = await find(kind, slug);
  if (!product) notFound();

  const related = all
    .filter((p) => p.slug !== product.slug && p.kind === product.kind && (p.brand === product.brand || p.category === product.category))
    .slice(0, 4);

  const info =
    kind === "shoe"
      ? [
          ["Collect in store", "Reserve on WhatsApp and pick up at LERA Medical Centre, Walvis Bay."],
          ["Not sure of your size?", "Book a foot assessment, or message us and we’ll help you choose."],
          ["Pay your way", "WhatsApp orders, EFT or in store. Card payments online coming soon."],
        ]
      : [
          ["Collect in store", "Reserve on WhatsApp and pick up at LERA Medical Centre, Walvis Bay."],
          ["Need advice?", "Message us on WhatsApp or ask during your foot assessment."],
          ["Pay your way", "WhatsApp orders, EFT or in store. Card payments online coming soon."],
        ];

  return (
    <>
      <ShoeShowcase product={product} variant="detail" />

      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-14 sm:px-8 md:grid-cols-3">
        {info.map(([title, text]) => (
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
