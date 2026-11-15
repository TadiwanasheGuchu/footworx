type Props = {
  /** All size options for this product, in order */
  sizes: string[];
  label?: string;
  inStock: string[];
  selected: string | null;
  onSelect: (size: string) => void;
  /** Tapping a sold-out size (to offer a "notify me") */
  onSoldOut?: (size: string) => void;
  /** Shown at the right of the label, e.g. the size guide link */
  extra?: React.ReactNode;
};

export function SizePicker({ sizes, label = "Select size (EU)", inStock, selected, onSelect, onSoldOut, extra }: Props) {
  // Short labels (EU numbers) fit 5 across; longer ones (S (35-38), 36-37) get wider buttons
  const longest = Math.max(...sizes.map((s) => s.length));
  const cols = longest <= 2 ? "grid-cols-5" : longest <= 5 ? "grid-cols-3" : "grid-cols-2";
  return (
    <fieldset className="flex flex-col">
      <legend className="mb-3 flex w-full items-baseline justify-between gap-4 text-[15px] font-semibold">
        <span>{label}</span>
        {extra}
      </legend>
      <div className={`grid ${cols} gap-2`}>
        {sizes.map((s) => {
          const out = !inStock.includes(s);
          const on = selected === s;
          return (
            <button
              key={s}
              type="button"
              // Sold-out sizes stay tappable when we can offer "notify me"
              disabled={out && !onSoldOut}
              aria-pressed={out ? undefined : on}
              aria-label={out ? `Size ${s}, sold out${onSoldOut ? ", get notified" : ""}` : `Size ${s}`}
              onClick={() => (out ? onSoldOut?.(s) : onSelect(s))}
              className={`h-12 rounded-xl border px-2 text-base font-medium transition-colors ${
                out
                  ? `border-line bg-tile text-steel/70 line-through ${onSoldOut ? "cursor-pointer hover:border-steel" : "cursor-not-allowed"}`
                  : on
                    ? "cursor-pointer border-ink bg-ink text-white"
                    : "cursor-pointer border-line bg-white text-ink hover:border-ink"
              }`}
            >
              {s}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
