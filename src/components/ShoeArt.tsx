import type { Colorway, Product } from "@/data/products";

type Props = {
  colorway: Colorway;
  className?: string;
  label?: string;
  /** Picks the placeholder drawing for accessories */
  category?: Product["category"];
};

/**
 * Placeholder product drawing used until real photos arrive.
 * When a colorway has an `image`, the photo is shown instead.
 */
export function ShoeArt({ colorway, className, label, category }: Props) {
  if (colorway.image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={colorway.image} alt={label ?? colorway.name} className={className} />;
  }
  const a11y = {
    role: label ? "img" : undefined,
    "aria-label": label,
    "aria-hidden": label ? undefined : true,
  } as const;
  const { upper, sole, accent, lace } = colorway;
  const outlineOf = (c: string) => (c.toLowerCase() === "#ffffff" ? "#dde4ea" : "none");

  if (category === "Insoles") {
    return (
      <svg viewBox="0 0 400 200" className={className} {...a11y}>
        <path
          d="M40 120 Q40 70 110 62 L300 58 Q370 56 372 100 Q374 142 300 146 L120 150 Q40 160 40 120 Z"
          fill={upper}
          stroke={outlineOf(upper)}
          strokeWidth="2"
        />
        <path d="M60 118 Q62 92 112 86 L200 84 Q190 112 120 128 Q74 138 60 118 Z" fill={sole} opacity="0.85" />
        <path d="M250 80 Q330 76 344 100 Q344 124 300 128" stroke={accent} strokeWidth="6" fill="none" strokeLinecap="round" />
      </svg>
    );
  }

  if (category === "Socks") {
    return (
      <svg viewBox="0 0 400 200" className={className} {...a11y}>
        <path
          d="M150 20 L230 20 L232 110 Q234 130 252 138 L320 150 Q352 156 350 176 Q346 192 316 190 L190 184 Q150 182 150 150 Z"
          fill={upper}
          stroke={outlineOf(upper)}
          strokeWidth="2"
        />
        <path d="M150 20 L230 20 L230 42 L150 42 Z" fill={accent} />
        <path d="M316 150 Q352 156 350 176 Q346 192 316 190 Z" fill={sole} />
        <path d="M150 150 Q150 182 190 184 L196 152 Q170 150 150 150 Z" fill={sole} />
      </svg>
    );
  }

  if (category === "Headphones") {
    return (
      <svg viewBox="0 0 400 200" className={className} {...a11y}>
        <path d="M120 130 Q120 30 200 30 Q280 30 280 130" stroke={upper} strokeWidth="16" fill="none" strokeLinecap="round" />
        <rect x="96" y="112" width="52" height="72" rx="22" fill={upper} stroke={outlineOf(upper)} strokeWidth="2" />
        <rect x="252" y="112" width="52" height="72" rx="22" fill={upper} stroke={outlineOf(upper)} strokeWidth="2" />
        <rect x="110" y="128" width="24" height="40" rx="10" fill={sole} />
        <rect x="266" y="128" width="24" height="40" rx="10" fill={sole} />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 400 200" className={className} {...a11y}>
      <path d="M18 146 Q18 178 52 180 L358 180 Q394 178 392 150 L390 138 L20 138 Z" fill={sole} stroke={outlineOf(sole)} strokeWidth="2" />
      <path d="M18 160 L392 160 L392 166 L18 166 Z" fill={accent} />
      <path
        d="M26 140 L36 92 Q44 68 78 70 L128 76 Q148 56 176 48 L206 44 Q228 60 248 84 Q302 98 346 110 Q388 120 390 140 Z"
        fill={upper}
        stroke={outlineOf(upper)}
        strokeWidth="2"
      />
      <path d="M36 92 Q44 68 78 70 L96 72 Q74 100 70 140 L26 140 Z" fill={accent} />
      <path d="M150 62 L232 98 M162 56 L240 92 M176 50 L246 86" stroke={lace} strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M120 118 L300 118" stroke={lace} strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6" />
    </svg>
  );
}
