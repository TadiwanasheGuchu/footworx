"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Product } from "@/data/products";
import { questions, recommend, type Answers } from "@/lib/finder";
import { whatsappLink } from "@/lib/site";
import { ProductCard } from "./ProductCard";

export function ShoeFinder({ products }: { products: Product[] }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const reduce = useReducedMotion();
  const headingRef = useRef<HTMLHeadingElement>(null);

  const done = step >= questions.length;
  const q = questions[Math.min(step, questions.length - 1)];
  const result = useMemo(() => (done ? recommend(answers, products) : null), [done, answers, products]);

  const go = (next: number) => {
    setStep(next);
    // Move focus to the new heading for keyboard and screen-reader users
    requestAnimationFrame(() => headingRef.current?.focus());
  };

  const choose = (value: string) => {
    setAnswers((a) => ({ ...a, [q.id]: value }));
    go(step + 1);
  };

  const restart = () => {
    setAnswers({});
    go(0);
  };

  const slide = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { initial: { opacity: 0, x: 40 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -40 } };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
      {!done && (
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => go(Math.max(0, step - 1))}
              disabled={step === 0}
              className="rounded-full px-4 py-2 font-medium hover:bg-tile disabled:invisible"
            >
              ← Back
            </button>
            <span className="text-sm font-medium text-steel">
              Question {step + 1} of {questions.length}
            </span>
          </div>
          <div
            className="mb-10 h-2 overflow-hidden rounded-full bg-tile"
            role="progressbar"
            aria-label="Shoe Finder progress"
            aria-valuemin={0}
            aria-valuemax={questions.length}
            aria-valuenow={step}
          >
            <motion.div
              className="h-full rounded-full bg-blue"
              animate={{ width: `${(step / questions.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.fieldset key={q.id} {...slide} transition={{ duration: 0.2 }} className="flex flex-col gap-6">
              <legend className="contents">
                <h1 ref={headingRef} tabIndex={-1} className="display text-5xl outline-none sm:text-6xl">
                  {q.title}
                </h1>
              </legend>
              {q.help && <p className="-mt-2 max-w-2xl text-lg text-steel">{q.help}</p>}
              <div className="grid gap-3 sm:grid-cols-2">
                {q.options.map((o) => {
                  const on = answers[q.id] === o.value;
                  return (
                    <button
                      key={o.value}
                      type="button"
                      aria-pressed={on}
                      onClick={() => choose(o.value)}
                      className={`flex min-h-20 cursor-pointer flex-col items-start justify-center gap-0.5 rounded-3xl border-2 px-6 py-4 text-left transition-colors ${
                        on ? "border-ink bg-ink text-white" : "border-transparent bg-tile hover:border-ink"
                      }`}
                    >
                      <span className="text-lg font-semibold">{o.label}</span>
                      {o.hint && <span className={on ? "text-white/75" : "text-steel"}>{o.hint}</span>}
                    </button>
                  );
                })}
              </div>
            </motion.fieldset>
          </AnimatePresence>
        </div>
      )}

      {done && result && (
        <motion.div {...slide} transition={{ duration: 0.25 }} className="flex flex-col gap-10">
          <div className="grid gap-6 rounded-[2rem] bg-blue-soft p-8 sm:p-12 lg:grid-cols-[1.4fr_1fr] lg:items-start">
            <div className="flex flex-col gap-4">
              <span className="label text-steel">Your match</span>
              <h1 ref={headingRef} tabIndex={-1} className="display text-5xl outline-none sm:text-6xl">
                {result.headline}
              </h1>
              {result.reasons.length > 0 && (
                <ul className="flex max-w-2xl list-disc flex-col gap-2 pl-5 text-lg text-steel">
                  {result.reasons.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              )}
              <button type="button" onClick={restart} className="mt-2 self-start font-medium underline underline-offset-4">
                Start again
              </button>
            </div>

            <div className={`flex flex-col gap-3 rounded-3xl p-6 ${result.assessmentFirst ? "bg-ink text-white" : "bg-white"}`}>
              <h2 className="text-xl font-semibold">
                {result.assessmentFirst ? "We recommend a foot assessment first" : "Want to be sure? Get assessed"}
              </h2>
              <p className={result.assessmentFirst ? "text-white/80" : "text-steel"}>
                We’ll check how you stand, walk and run, then fit you properly. Your answers are added to the
                message so we’re ready for you.
              </p>
              <a
                href={whatsappLink(result.whatsappSummary)}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-1 rounded-full px-6 py-3.5 text-center font-semibold ${
                  result.assessmentFirst ? "bg-blue text-ink hover:bg-white" : "bg-ink text-white hover:bg-[#1d3349]"
                }`}
              >
                Book a foot assessment
              </a>
            </div>
          </div>

          <section>
            <div className="mb-6 flex items-end justify-between gap-4">
              <h2 className="text-3xl font-bold tracking-tight">
                {result.exactMatch ? "Shoes that match" : "Closest shoes we have online"}
              </h2>
              <Link href="/shop?kind=shoe" className="shrink-0 font-medium underline underline-offset-4 hover:text-steel">
                All shoes
              </Link>
            </div>
            {!result.exactMatch && (
              <p className="mb-6 max-w-2xl text-steel">
                We don’t have an exact match on the website yet, but we stock more in the shop. Message us and we’ll
                tell you what’s available.
              </p>
            )}
            {result.shoes.length > 0 ? (
              <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
                {result.shoes.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            ) : (
              <p className="text-lg">No shoes online yet. Message us and we’ll help you choose.</p>
            )}
          </section>

          {result.suggestInsoles && (
            <section className="rounded-[2rem] bg-tile p-8 sm:p-12">
              <h2 className="mb-2 text-3xl font-bold tracking-tight">Add insoles</h2>
              <p className="mb-6 max-w-2xl text-lg text-steel">
                Based on your answers, a supportive insole could help. We’ll fit the right one during your assessment.
              </p>
              {result.insoles.length > 0 ? (
                <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
                  {result.insoles.map((p) => (
                    <ProductCard key={p.slug} product={p} />
                  ))}
                </div>
              ) : (
                <Link href="/shop?category=Insoles" className="font-semibold underline underline-offset-4">
                  See insoles
                </Link>
              )}
            </section>
          )}

          <p className="text-sm text-steel">
            The Shoe Finder is a quick guide, not a medical diagnosis. If you have pain or an injury, book a foot
            assessment or see a health professional.
          </p>
        </motion.div>
      )}
    </div>
  );
}
