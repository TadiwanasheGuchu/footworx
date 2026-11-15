import type { Metadata } from "next";
import Link from "next/link";
import { getProducts, getStory } from "@/lib/catalog";
import { CategoryStory } from "@/components/CategoryStory";
import { whatsappLink } from "@/lib/site";
import { ProductCard } from "@/components/ProductCard";
import { accessoryCategories, accessorySizeOptions, allSizes, ONE_SIZE, shoeCategories, type AccessoryCategory, type Product } from "@/data/products";

export const metadata: Metadata = { title: "Shop shoes & accessories" };

type Kind = Product["kind"];
type Query = { kind?: string; brand?: string; category?: string; sort?: string; size?: string };
type Sort = "new" | "price-asc" | "price-desc";
type Search = { searchParams: Promise<Query> };

const isAccessoryCategory = (c?: string) => !!c && (accessoryCategories as readonly string[]).includes(c);
const isShoeCategory = (c?: string) => !!c && (shoeCategories as readonly string[]).includes(c);

export default async function ShopPage({ searchParams }: Search) {
  const q = await searchParams;
  const category = isShoeCategory(q.category) || isAccessoryCategory(q.category) ? q.category : undefined;
  // A category decides the kind; otherwise use ?kind=shoe|accessory
  const kind: Kind | undefined = isAccessoryCategory(category)
    ? "accessory"
    : isShoeCategory(category)
      ? "shoe"
      : q.kind === "shoe" || q.kind === "accessory"
        ? q.kind
        : undefined;
  const brand = q.brand;
  const sort: Sort = q.sort === "price-asc" || q.sort === "price-desc" ? q.sort : "new";
  // Size filter: EU sizes for shoes, the accessory's own sizes for insoles and socks
  const sizeOptions =
    kind === "shoe"
      ? allSizes
      : isAccessoryCategory(category)
        ? accessorySizeOptions[category as AccessoryCategory].filter((s) => s !== ONE_SIZE)
        : [];
  const size = q.size && sizeOptions.includes(q.size) ? q.size : undefined;

  const storyPage = category ?? (kind === "shoe" ? "shoes" : kind === "accessory" ? "accessories" : "all");
  const [products, story] = await Promise.all([getProducts(), getStory(storyPage)]);
  const inKind = products.filter((p) => !kind || p.kind === kind);
  const brands = [...new Set(inKind.map((p) => p.brand))].sort();
  const list = inKind.filter(
    (p) =>
      (!brand || p.brand === brand) &&
      (!category || p.category === category) &&
      (!size || p.colorways.some((c) => c.inStock.includes(size))),
  );
  const price = (p: Product) => p.salePrice ?? p.price;
  if (sort === "price-asc") list.sort((a, b) => price(a) - price(b));
  else if (sort === "price-desc") list.sort((a, b) => price(b) - price(a));
  // Newest (the catalogue order), shoes first when showing everything
  else list.sort((a, b) => Number(a.kind === "accessory") - Number(b.kind === "accessory"));

  type Next = { kind?: Kind; brand?: string; category?: string; sort?: Sort; size?: string };
  // Sort and size carry over when switching other filters (size only within the same kind)
  const href = (next: Next, keep: { sort?: boolean; size?: boolean } = { sort: true }) => {
    const sp = new URLSearchParams();
    if (next.kind) sp.set("kind", next.kind);
    if (next.category) sp.set("category", next.category);
    if (next.brand) sp.set("brand", next.brand);
    const nextSort = "sort" in next ? next.sort : keep.sort ? sort : undefined;
    if (nextSort && nextSort !== "new") sp.set("sort", nextSort);
    const nextSize = "size" in next ? next.size : keep.size ? size : undefined;
    if (nextSize) sp.set("size", nextSize);
    const s = sp.toString();
    return s ? `/shop?${s}` : "/shop";
  };

  const pill = (active: boolean) =>
    `rounded-full px-4 py-2 text-[15px] font-medium transition-colors ${active ? "bg-ink text-white" : "bg-tile hover:bg-[#e3e8ec]"}`;

  const kindLabel = kind === "accessory" ? "Accessories" : kind === "shoe" ? "Shoes" : "Shop all";
  const title = [brand, category ?? (kind ? kindLabel : null)].filter(Boolean).join(" ") || kindLabel;
  const noun = kind === "shoe" ? ["shoe", "shoes"] : ["product", "products"];
  const types = kind === "accessory" ? accessoryCategories : kind === "shoe" ? shoeCategories : [];

  return (
    <>
    <CategoryStory page={storyPage} story={story} />
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-8">
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="text-steel">
            {list.length} {list.length === 1 ? noun[0] : noun[1]}
            {size ? ` in size ${size}` : ""}
          </p>
          <div className="flex items-center gap-1 text-[15px]" role="group" aria-label="Sort">
            <span className="mr-1 text-steel">Sort:</span>
            {(
              [
                ["new", "Newest"],
                ["price-asc", "Price ↑"],
                ["price-desc", "Price ↓"],
              ] as const
            ).map(([v, label]) => (
              <Link
                key={v}
                href={href({ kind, brand, category, sort: v }, { size: true })}
                aria-current={sort === v ? "true" : undefined}
                aria-label={v === "new" ? "Sort by newest" : v === "price-asc" ? "Sort by price, low to high" : "Sort by price, high to low"}
                className={`rounded-full px-3 py-1.5 font-medium ${sort === v ? "bg-ink text-white" : "hover:bg-tile"}`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-10 flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Shoes or accessories">
          <Link href="/shop" className={pill(!kind)}>Everything</Link>
          <Link href={href({ kind: "shoe" })} className={pill(kind === "shoe")}>Shoes</Link>
          <Link href={href({ kind: "accessory" })} className={pill(kind === "accessory")}>Accessories</Link>
        </div>
        {types.length > 0 && (
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by type">
            <Link href={href({ kind, brand })} className={pill(!category)}>
              All {kind === "accessory" ? "accessories" : "shoes"}
            </Link>
            {types.map((c) => (
              <Link key={c} href={href({ kind, brand, category: c })} className={pill(category === c)}>
                {c}
              </Link>
            ))}
          </div>
        )}
        {sizeOptions.length > 0 && (
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Show only my size">
            <span className="mr-1 text-[15px] font-semibold">My size</span>
            <Link href={href({ kind, brand, category, size: undefined })} className={pill(!size)}>Any</Link>
            {sizeOptions.map((sz) => (
              <Link
                key={sz}
                href={href({ kind, brand, category, size: sz })}
                className={pill(size === sz)}
                aria-current={size === sz ? "true" : undefined}
              >
                {sz}
              </Link>
            ))}
          </div>
        )}
        {brands.length > 1 && (
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by brand">
            <Link href={href({ kind, category }, { sort: true, size: true })} className={pill(!brand)}>All brands</Link>
            {brands.map((b) => (
              <Link key={b} href={href({ kind, brand: b, category }, { sort: true, size: true })} className={pill(brand === b)}>
                {b}
              </Link>
            ))}
          </div>
        )}
      </div>

      {list.length ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((p) => (
            <ProductCard key={`${p.kind}-${p.slug}`} product={p} />
          ))}
        </div>
      ) : (
        <p className="text-lg">
          {size ? `Nothing in size ${size} right now. ` : "Nothing matches those filters yet. "}
          {size && (
            <a
              href={whatsappLink(`Hi Footworx, do you have any ${category ?? (kind === "accessory" ? "accessories" : "shoes")} in size ${size}?`)}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline"
            >
              Ask us on WhatsApp
            </a>
          )}
          {size ? " or " : ""}
          <Link href="/shop" className="font-semibold underline">clear filters</Link>
        </p>
      )}
    </div>
    </>
  );
}
