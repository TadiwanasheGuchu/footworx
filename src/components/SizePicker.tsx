import { allSizes } from "@/data/products";

type Props = {
  inStock: string[];
  selected: string | null;
  onSelect: (size: string) => void;
};

export function SizePicker({ inStock, selected, onSelect }: Props) {
  return (
    <fieldset className="flex flex-col">
      <legend className="mb-3 flex w-full justify-between text-[15px] font-semibold">
        <span>Select size (EU)</span>
      </legend>
      <div className="grid grid-cols-5 gap-2">
        {allSizes.map((s) => {
          const out = !inStock.includes(s);
          const on = selected === s;
          return (
            <button
              key={s}
              type="button"
              disabled={out}
              aria-pressed={on}
              aria-label={out ? `Size ${s}, sold out` : `Size ${s}`}
              onClick={() => onSelect(s)}
              className={`h-12 rounded-xl border text-base font-medium transition-colors ${
                out
                  ? "cursor-not-allowed border-line bg-tile text-steel/70 line-through"
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
