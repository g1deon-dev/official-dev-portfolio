"use client";

import type { ReactElement, ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { SITE } from "@/lib/site";

type BootLine = {
  time: string;
  content: ReactNode;
};

const BOOT_LINES: readonly BootLine[] = [
  {
    time: "0.001",
    content: (
      <>
        BOOT <span className="text-code-string">{SITE.handle}</span>
      </>
    ),
  },
  {
    time: "0.024",
    content: (
      <>
        user........<span className="text-code-string">{SITE.name}</span>
      </>
    ),
  },
  {
    time: "0.048",
    content: (
      <>
        role........<span className="text-code-string">Full-Stack Builder</span>
      </>
    ),
  },
  {
    time: "0.112",
    content: (
      <>
        stack.......<span className="text-code-string">Next.js · React · Tailwind</span>
      </>
    ),
  },
  {
    time: "0.187",
    content: (
      <>
        focus.......<span className="text-code-string">Web · IoT · Data Science</span>
      </>
    ),
  },
  {
    time: "0.240",
    content: (
      <>
        status......<span className="text-code-string">{SITE.status}</span>
      </>
    ),
  },
  {
    time: "0.301",
    content: (
      <>
        origin......<span className="text-code-string">Bicol University</span>
      </>
    ),
  },
];

const BOOT_SUMMARY = `System profile for ${SITE.name}: role Full-Stack Builder; stack Next.js, React, Tailwind; focus Web, IoT, Data Science; status ${SITE.status}; origin Bicol University.`;

const listVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const lineVariants: Variants = {
  hidden: { y: 4 },
  visible: { y: 0 },
};

const HEADLINE_WORDS: readonly string[] = "I build full-stack web applications".split(" ");

const headlineContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0,
    },
  },
};

const headlineWord: Variants = {
  hidden: { y: 12 },
  show: { y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const ctaContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const ctaItem: Variants = {
  hidden: { y: 8 },
  show: { y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function Hero(): ReactElement {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="grid grid-cols-1 gap-8 px-6 py-20 md:grid-cols-2"
    >
      <div>
        <motion.h1
          id="hero-heading"
          className="max-w-xl text-[36px] font-bold leading-[1.2] tracking-tight md:text-[52px]"
          initial={prefersReducedMotion ? "show" : "hidden"}
          animate="show"
          variants={headlineContainer}
        >
          {HEADLINE_WORDS.map((word, index) => (
            <motion.span
              key={word + index}
              variants={headlineWord}
              className="inline-block mr-[0.3em]"
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className="mt-4 inline-block border border-accent px-3 py-1 text-xs uppercase tracking-[0.2em] text-accent"
          initial={{ opacity: 1 }}
          animate={{
            opacity: prefersReducedMotion ? 1 : [1, 0.5, 1],
          }}
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }
          }
        >
          [ {SITE.status} ]
        </motion.p>

        <motion.p
          className="mt-6 max-w-md text-lg leading-relaxed text-secondary"
          initial={prefersReducedMotion ? { y: 0 } : { y: 8 }}
          animate={{ y: 0 }}
          transition={prefersReducedMotion ? undefined : { duration: 0.5, ease: "easeOut", delay: 0.4 }}
        >
          I&apos;m {SITE.name} — BSIT student at Bicol University, focused on Software
          Engineering, Full-Stack Web Development, and Data Science.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap gap-4"
          initial={prefersReducedMotion ? "show" : "hidden"}
          animate="show"
          variants={ctaContainer}
        >
          <motion.a
            variants={ctaItem}
            href="#contact"
            className="bg-accent px-8 py-3 text-base font-semibold tracking-[0.5px] text-background hover:bg-background hover:text-accent hover:shadow-[0_0_20px_-4px_var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Get in touch
          </motion.a>
          <motion.a
            variants={ctaItem}
            href="#projects"
            className="border border-foreground px-8 py-3 text-base font-semibold tracking-[0.5px] text-foreground hover:bg-surface hover:shadow-[0_0_20px_-4px_var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            View work
          </motion.a>
        </motion.div>
      </div>

      <motion.div
        role="img"
        aria-label={BOOT_SUMMARY}
        className="overflow-x-auto border border-card-border bg-surface p-6 font-code text-[13px] leading-[1.6] md:p-8"
        initial={prefersReducedMotion ? "visible" : "hidden"}
        animate="visible"
        variants={listVariants}
      >
        {BOOT_LINES.map((line) => (
          <motion.p
            key={line.time}
            aria-hidden="true"
            variants={prefersReducedMotion ? undefined : lineVariants}
          >
            <span className="text-secondary">[{line.time}]</span> {line.content}
          </motion.p>
        ))}
        <motion.span
          aria-hidden="true"
          className="inline-block h-[13px] w-[7px] bg-foreground align-middle"
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: [1, 1, 0, 0] }}
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }
          }
        />
      </motion.div>
    </section>
  );
}
