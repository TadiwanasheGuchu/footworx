import { allSizes } from "@/data/products";

type Props = {
  inStock: string[];
  selected: string | null;
  onSelect: (size: string) => void;
};

export function SizePicker({ inStock, selected, onSelect }: Props) {
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="label mb-3 text-steel">Size (EU)</legend>
      <div className="flex flex-wrap gap-2">
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
              className={`h-12 min-w-14 rounded-[2px] border-2 px-3 text-base font-bold transition-colors ${
                out
                  ? "cursor-not-allowed border-line bg-paper text-steel line-through"
                  : on
                    ? "cursor-pointer border-ink bg-ink text-white"
                    : "cursor-pointer border-ink bg-white text-ink hover:bg-blue-soft"
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
