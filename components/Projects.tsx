"use client";

import type { ReactElement } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const MARKERS: readonly string[] = ["01", "02", "03"];

const gridVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const tileVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Projects(): ReactElement {
  const { ref, isInView } = useScrollReveal();
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="projects" className="px-6 py-20">
      <h2 className="flex items-center gap-3 text-2xl font-bold tracking-tight sm:text-3xl">
        <span aria-hidden="true" className="inline-block h-2.5 w-2.5 bg-accent" />
        Projects
      </h2>

      <p className="mt-3 max-w-prose text-xs leading-relaxed opacity-70">
        Case studies and source repositories are currently in development.
      </p>

      <motion.div
        ref={ref}
        className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3"
        initial={prefersReducedMotion ? "show" : "hidden"}
        animate={prefersReducedMotion || isInView ? "show" : "hidden"}
        variants={gridVariants}
      >
        {MARKERS.map((marker, index) => (
          <motion.div
            key={marker}
            variants={tileVariants}
            whileHover={prefersReducedMotion ? undefined : { y: -4 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={
              index === 0
                ? "flex min-h-40 flex-col justify-between bg-surface p-6 hover:shadow-[0_0_20px_-4px_var(--accent)] sm:col-span-2"
                : "flex min-h-40 flex-col justify-between bg-surface p-6 hover:shadow-[0_0_20px_-4px_var(--accent)]"
            }
          >
            <span className="text-xs tracking-[0.2em] opacity-70">{marker}</span>
            <span className="text-xs uppercase tracking-[0.2em]">
              Currently in Development
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
