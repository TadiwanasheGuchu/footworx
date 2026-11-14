import Link from "next/link";
import { whatsappLink } from "@/lib/site";

type Brand = { name: string; logo?: string; inShop: boolean };

/**
 * Give every logo roughly the same visual weight: wide logos get more width,
 * tall ones more height. Sanity image URLs end in "-<width>x<height>.<ext>".
 */
function logoSize(url: string) {
  const m = url.match(/-(\d+)x(\d+)\.[a-z]+$/i);
  const aspect = m ? Number(m[1]) / Number(m[2]) : 2.5;
  const area = 7200; // px², about 150 × 48
  let w = Math.sqrt(area * aspect);
  let h = w / aspect;
  if (h > 64) { h = 64; w = h * aspect; }
  if (w > 190) { w = 190; h = w / aspect; }
  return { width: Math.round(w), height: Math.round(h) };
}

function BrandItem({ b, hidden }: { b: Brand; hidden?: boolean }) {
  const size = b.logo ? logoSize(b.logo) : null;
  const inner = b.logo && size ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${b.logo}?h=${size.height * 2}&fm=png`}
      alt={hidden ? "" : b.name}
      width={size.width}
      height={size.height}
      style={{ width: size.width, height: size.height }}
      className="max-w-none object-contain opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
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
