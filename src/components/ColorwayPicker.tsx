import type { Colorway } from "@/data/products";

type Props = {
  colorways: Colorway[];
  selectedId: string;
  onSelect: (id: string) => void;
};

export function ColorwayPicker({ colorways, selectedId, onSelect }: Props) {
  const selected = colorways.find((c) => c.id === selectedId);
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="mb-3 text-[15px] font-bold">
        Colorway: <span className="font-normal">{selected?.name}</span>
      </legend>
      <div className="flex flex-wrap gap-3">
        {colorways.map((c) => {
          const on = c.id === selectedId;
          return (
            <button
              key={c.id}
              type="button"
              aria-label={c.name}
              aria-pressed={on}
              onClick={() => onSelect(c.id)}
              className={`h-12 w-12 cursor-pointer rounded-full border-[3px] border-white transition-shadow ${
                on ? "shadow-[0_0_0_3px_currentColor]" : "shadow-[0_0_0_1px_rgba(128,128,128,.5)] hover:shadow-[0_0_0_2px_currentColor]"
              }`}
              style={{ background: c.upper }}
            />
          );
        })}
      </div>
    </fieldset>
  );
}
