import Link from "next/link";
import { whatsappLink } from "@/lib/site";

type Brand = { name: string; logo?: string; inShop: boolean };

function BrandItem({ b, hidden }: { b: Brand; hidden?: boolean }) {
  const inner = b.logo ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${b.logo}?h=96&fm=png`}
      alt={hidden ? "" : b.name}
      className="h-10 w-auto max-w-[170px] object-contain opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0 sm:h-12"
      loading="lazy"
    />
  ) : (
    <span className="display whitespace-nowrap text-3xl text-ink/60 transition-colors group-hover:text-ink sm:text-4xl">
      {b.name}
    </span>
  );
  const cls = "group flex h-20 shrink-0 items-center px-8 sm:px-12";
  const a11y = hidden ? { "aria-hidden": true, tabIndex: -1 } : { "aria-label": b.inShop ? `Shop ${b.name}` : `Ask about ${b.name}` };
  return b.inShop ? (
    <Link href={`/shop?brand=${encodeURIComponent(b.name)}`} className={cls} {...a11y}>
      {inner}
    </Link>
  ) : (
    <a
      href={whatsappLink(`Hi Footworx, which ${b.name} products do you have in stock?`)}
      target="_blank"
      rel="noopener noreferrer"
      className={cls}
      {...a11y}
    >
      {inner}
    </a>
  );
}

/** "Brands we stock": logos scroll right to left in an endless loop */
export function BrandMarquee({ brands }: { brands: Brand[] }) {
  return (
    <div className="marquee relative overflow-hidden border-y border-line py-4">
      <div className="marquee-track flex w-max">
        {/* Two identical copies so the loop is seamless; the second is hidden from screen readers */}
        <div className="flex">
          {brands.map((b) => (
            <BrandItem key={b.name} b={b} />
          ))}
        </div>
        <div className="marquee-copy flex">
          {brands.map((b) => (
            <BrandItem key={b.name} b={b} hidden />
          ))}
        </div>
      </div>
    </div>
  );
}
