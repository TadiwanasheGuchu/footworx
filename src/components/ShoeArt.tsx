import type { Colorway } from "@/data/products";

type Props = {
  colorway: Colorway;
  className?: string;
  label?: string;
};

/**
 * Placeholder shoe drawing used until real product photos arrive.
 * When a colorway has an `image`, the photo is shown instead.
 */
export function ShoeArt({ colorway, className, label }: Props) {
  if (colorway.image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={colorway.image} alt={label ?? colorway.name} className={className} />;
  }
  const { upper, sole, accent, lace } = colorway;
  const outline = upper.toLowerCase() === "#ffffff" ? "#dde4ea" : "none";
  return (
    <svg
      viewBox="0 0 400 200"
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <path d="M18 146 Q18 178 52 180 L358 180 Q394 178 392 150 L390 138 L20 138 Z" fill={sole} stroke={sole.toLowerCase() === "#ffffff" ? "#dde4ea" : "none"} strokeWidth="2" />
      <path d="M18 160 L392 160 L392 166 L18 166 Z" fill={accent} />
      <path
        d="M26 140 L36 92 Q44 68 78 70 L128 76 Q148 56 176 48 L206 44 Q228 60 248 84 Q302 98 346 110 Q388 120 390 140 Z"
        fill={upper}
        stroke={outline}
        strokeWidth="2"
      />
      <path d="M36 92 Q44 68 78 70 L96 72 Q74 100 70 140 L26 140 Z" fill={accent} />
      <path d="M150 62 L232 98 M162 56 L240 92 M176 50 L246 86" stroke={lace} strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M120 118 L300 118" stroke={lace} strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6" />
    </svg>
  );
}
