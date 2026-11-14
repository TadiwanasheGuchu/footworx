// Stand-in for the Footworx logo. Replace with the original SVG when available.
export function Logo({ color = "#ffffff", className }: { color?: string; className?: string }) {
  return (
    <span className={`inline-flex flex-col leading-none ${className ?? ""}`} style={{ color }}>
      <span className="flex items-end gap-1">
        <span className="text-2xl font-medium tracking-wide sm:text-[28px]">FOOTWORX</span>
        <svg width="26" height="29" viewBox="0 0 70 78" aria-hidden>
          <ellipse cx="22" cy="12" rx="9" ry="11" fill="currentColor" />
          <circle cx="38" cy="14" r="6" fill="currentColor" />
          <circle cx="50" cy="20" r="5" fill="currentColor" />
          <circle cx="59" cy="28" r="4" fill="currentColor" />
          <circle cx="65" cy="37" r="3.3" fill="currentColor" />
          <path d="M14 30 Q34 26 40 44 Q44 64 4 76 Q30 58 22 44 Q18 36 14 30 Z" fill="currentColor" />
        </svg>
      </span>
      <span className="self-center pr-6 text-[10px] font-extrabold tracking-[0.2em]">NAMIBIA</span>
    </span>
  );
}
