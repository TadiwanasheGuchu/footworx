import type { Colorway } from "@/data/products";

type Props = {
  colorways: Colorway[];
  selectedId: string;
  onSelect: (id: string) => void;
};

export function ColorwayPicker({ colorways, selectedId, onSelect }: Props) {
  const selected = colorways.find((c) => c.id === selectedId);
  return (
    <fieldset className="flex flex-col">
      <legend className="mb-3 text-[15px] font-semibold">
        Color: <span className="font-normal">{selected?.name}</span>
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
              className={`h-11 w-11 cursor-pointer rounded-full border-[3px] border-white transition-shadow ${
                on ? "shadow-[0_0_0_2px_currentColor]" : "shadow-[0_0_0_1px_rgba(128,128,128,.45)] hover:shadow-[0_0_0_2px_rgba(128,128,128,.8)]"
              }`}
              style={{ background: c.upper }}
            />
          );
        })}
      </div>
    </fieldset>
  );
}
