import type { Product } from "@/data/products";

// ---------- Questions ----------

export type Answers = {
  who?: "Women" | "Men" | "Any";
  use?: "road" | "trail" | "walk" | "stand" | "football" | "gym";
  freq?: "light" | "regular" | "often";
  pain?: "none" | "heel" | "knee" | "shin" | "ankle" | "injury";
  arch?: "low" | "medium" | "high" | "unsure";
  feel?: "soft" | "balanced" | "firm" | "any";
};

type Option<V> = { value: V; label: string; hint?: string };
export type Question<K extends keyof Answers = keyof Answers> = {
  id: K;
  title: string;
  help?: string;
  options: Option<NonNullable<Answers[K]>>[];
};

export const questions: Question[] = [
  {
    id: "who",
    title: "Who are you shopping for?",
    options: [
      { value: "Women", label: "Women" },
      { value: "Men", label: "Men" },
      { value: "Any", label: "Show me everything" },
    ],
  },
  {
    id: "use",
    title: "What will you mostly use them for?",
    options: [
      { value: "road", label: "Road running", hint: "Tar roads, pavements, the promenade" },
      { value: "trail", label: "Trail running", hint: "Gravel, sand and dunes" },
      { value: "walk", label: "Walking & everyday", hint: "Errands, walks, casual wear" },
      { value: "stand", label: "On my feet all day", hint: "Work shifts, standing for hours" },
      { value: "gym", label: "Gym & training", hint: "Classes, weights, short runs" },
      { value: "football", label: "Football" },
    ],
  },
  {
    id: "freq",
    title: "How often?",
    options: [
      { value: "light", label: "A few times a month" },
      { value: "regular", label: "1 to 3 times a week" },
      { value: "often", label: "4 or more times a week" },
    ],
  },
  {
    id: "pain",
    title: "Any pain or discomfort?",
    help: "Pick the one that bothers you most.",
    options: [
      { value: "none", label: "No pain" },
      { value: "heel", label: "Heels or arches" },
      { value: "knee", label: "Knees or hips" },
      { value: "shin", label: "Shins" },
      { value: "ankle", label: "Ankles" },
      { value: "injury", label: "Recovering from an injury" },
    ],
  },
  {
    id: "arch",
    title: "What are your arches like?",
    help: "Quick test: wet your foot and step on paper or a dry tile. A full footprint means low arches; a thin strip on the outside means high arches.",
    options: [
      { value: "low", label: "Low or flat", hint: "Most of the footprint shows" },
      { value: "medium", label: "Medium", hint: "A normal curve on the inside" },
      { value: "high", label: "High", hint: "Only a thin strip shows" },
      { value: "unsure", label: "Not sure" },
    ],
  },
  {
    id: "feel",
    title: "How do you like a shoe to feel?",
    options: [
      { value: "soft", label: "Soft & plush", hint: "Lots of cushioning" },
      { value: "balanced", label: "Balanced", hint: "Comfortable but not mushy" },
      { value: "firm", label: "Firm & responsive", hint: "Close to the ground, fast" },
      { value: "any", label: "No preference" },
    ],
  },
];

// ---------- Result ----------

export type Result = {
  headline: string;
  reasons: string[];
  /** Strongly suggest a foot assessment (pain, injury, unsure arches, heavy use) */
  assessmentFirst: boolean;
  suggestInsoles: boolean;
  shoes: Product[];
  exactMatch: boolean;
  insoles: Product[];
  whatsappSummary: string;
};

const cushionOrder = ["Soft", "Balanced", "Firm"] as const;

const label = (id: keyof Answers, value?: string) =>
  questions.find((q) => q.id === id)?.options.find((o) => o.value === value)?.label ?? "";

export function recommend(a: Answers, products: Product[]): Result {
  const category: Product["category"][] =
    a.use === "trail"
      ? ["Trail"]
      : a.use === "football"
        ? ["Football"]
        : a.use === "walk" || a.use === "stand"
          ? ["Running", "Casual"]
          : ["Running"];

  const support: Product["support"] | null = a.arch === "low" ? "Stability" : a.arch === "unsure" ? null : "Neutral";

  const painful = !!a.pain && a.pain !== "none";
  const cushion: Product["cushioning"] =
    a.feel === "soft"
      ? "Soft"
      : a.feel === "firm"
        ? "Firm"
        : a.feel === "balanced"
          ? "Balanced"
          : a.use === "football"
            ? "Firm"
            : a.use === "stand" || a.freq === "often" || painful
              ? "Soft"
              : "Balanced";

  // Headline, in plain words
  const kind =
    a.use === "football"
      ? "football boot"
      : a.use === "trail"
        ? "trail running shoe"
        : a.use === "road"
          ? "road running shoe"
          : a.use === "gym"
            ? "training shoe"
            : "everyday comfort shoe";
  const supportWord = support === "Stability" ? "stability" : support === "Neutral" ? "neutral" : "";
  const headline = `A ${[supportWord, kind].filter(Boolean).join(" ")} with ${cushion.toLowerCase()} cushioning`;

  const reasons: string[] = [];
  if (support === "Stability") reasons.push("Low arches usually do best with a stability shoe, which gives extra support under the arch.");
  if (support === "Neutral" && a.arch === "high") reasons.push("High arches suit a neutral shoe with good cushioning to absorb impact.");
  if (support === "Neutral" && a.arch === "medium") reasons.push("Medium arches usually suit a neutral shoe.");
  if (a.arch === "unsure") reasons.push("We'll check your arches properly during a foot assessment.");
  if (cushion === "Soft" && a.feel !== "soft")
    reasons.push(
      a.use === "stand"
        ? "Long hours standing call for plenty of cushioning."
        : a.freq === "often"
          ? "Running 4+ times a week, extra cushioning helps your legs recover."
          : "Softer cushioning takes pressure off sore spots.",
    );
  if (a.use === "trail") reasons.push("Trail shoes grip on gravel and sand, and protect your feet from rocks.");
  if (a.pain === "heel") reasons.push("Heel and arch pain often improves with the right support and an insole.");
  if (a.pain === "knee" || a.pain === "shin") reasons.push("Knee and shin pain can come from how your foot lands. An assessment shows us why.");
  if (a.pain === "injury") reasons.push("After an injury, it's worth getting fitted in person before choosing.");

  const assessmentFirst = painful || a.arch === "unsure" || a.freq === "often";
  const suggestInsoles = painful || a.use === "stand" || a.arch === "low";

  // Rank the shoes we have
  const shoes = products.filter(
    (p) => p.kind === "shoe" && (a.who === "Any" || !a.who || p.gender === a.who || p.gender === "Unisex"),
  );
  const score = (p: Product) => {
    let s = 0;
    const ci = category.indexOf(p.category);
    if (ci === 0) s += 4;
    else if (ci > 0) s += 3;
    if (support && p.support === support) s += 2;
    if (p.cushioning === cushion) s += 2;
    else if (p.cushioning && Math.abs(cushionOrder.indexOf(p.cushioning) - cushionOrder.indexOf(cushion)) === 1) s += 1;
    return s;
  };
  const ranked = shoes.map((p) => ({ p, s: score(p) })).sort((x, y) => y.s - x.s);
  // A match must be the right kind of shoe; support and cushioning only change the order
  const matches = ranked.filter((r) => category.includes(r.p.category)).map((r) => r.p);
  const exactMatch = matches.length > 0;
  const top = (exactMatch ? matches : ranked.map((r) => r.p)).slice(0, 4);

  const insoles = suggestInsoles
    ? products.filter((p) => p.kind === "accessory" && p.category === "Insoles").slice(0, 2)
    : [];

  const whatsappSummary =
    `Hi Footworx, I did the Shoe Finder on your website. ` +
    `For: ${label("who", a.who)}. Use: ${label("use", a.use)}, ${label("freq", a.freq).toLowerCase()}. ` +
    `Pain: ${label("pain", a.pain)}. Arches: ${label("arch", a.arch)}. Feel: ${label("feel", a.feel)}. ` +
    `It suggested: ${headline.toLowerCase()}. I'd like to book a foot assessment.`;

  return { headline, reasons, assessmentFirst, suggestInsoles, shoes: top, exactMatch, insoles, whatsappSummary };
}
