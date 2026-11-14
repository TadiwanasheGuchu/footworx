"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Colorway } from "@/data/products";
import { ShoeArt } from "./ShoeArt";

type Props = {
  colorway: Colorway;
  label: string;
  className?: string;
};

/** The signature floating shoe: bobs gently and swaps with a tilt when the colorway changes. */
export function FloatingShoe({ colorway, label, className }: Props) {
  const reduce = useReducedMotion();

  return (
    <div className={`relative flex flex-col items-center ${className ?? ""}`}>
      <motion.div
        className="w-full"
        animate={reduce ? undefined : { y: [0, -18, 0] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative aspect-[2/1] w-full">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={colorway.id}
              className="absolute inset-0"
              initial={reduce ? { opacity: 0 } : { opacity: 0, x: 120, rotate: 8, scale: 0.92 }}
              animate={{ opacity: 1, x: 0, rotate: -4, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: -120, rotate: -14, scale: 0.92 }}
              transition={{ type: "spring", stiffness: 160, damping: 18 }}
            >
              <ShoeArt colorway={colorway} label={`${label} in ${colorway.name}`} className="h-full w-full drop-shadow-xl" />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
      <motion.div
        aria-hidden
        className="mt-4 h-6 w-2/3 rounded-[50%] bg-ink blur-md"
        animate={reduce ? { opacity: 0.22 } : { scaleX: [1, 0.8, 1], opacity: [0.28, 0.16, 0.28] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
