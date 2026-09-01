"use client";

import type { ReactElement } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Code2, Cpu, Globe, Wrench, type LucideIcon } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type SkillGroup = {
  category: string;
  slug: string;
  description: string;
  items: readonly string[];
};

const SKILL_GROUPS: readonly SkillGroup[] = [
  {
    category: "Core Languages",
    slug: "core.languages",
    description:
      "General-purpose programming languages used for algorithms, data structures, systems programming, and coursework.",
    items: ["C", "Java", "Python"],
  },
  {
    category: "Web Technologies",
    slug: "web.stack",
    description:
      "The markup, styling, framework, and animation tools used to build front-end web applications.",
    items: ["HTML", "Tailwind CSS", "Next.js", "Framer Motion"],
  },
  {
    category: "Tools & Workflows",
    slug: "tooling",
    description:
      "Version control, code hosting, editor, and AI assistant used in day-to-day development.",
    items: ["Git", "GitHub", "VS Code", "Claude Code"],
  },
  {
    category: "Embedded & IoT",
    slug: "embedded",
    description:
      "Programming ESP32 microcontrollers to connect hardware and sensors to software.",
    items: ["ESP32 microcontroller integration"],
  },
];

const SKILL_ICONS: Record<string, LucideIcon> = {
  "Core Languages": Code2,
  "Web Technologies": Globe,
  "Tools & Workflows": Wrench,
  "Embedded & IoT": Cpu,
};

const SKILL_SPANS: Record<string, string> = {
  "Core Languages": "sm:col-span-2",
  "Web Technologies": "sm:col-span-4",
  "Tools & Workflows": "sm:col-span-4",
  "Embedded & IoT": "sm:col-span-2",
};

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

export default function Skills(): ReactElement {
  const { ref, isInView } = useScrollReveal();
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="stack" className="px-6 py-20">
      <h2 className="flex items-center gap-3 text-3xl font-bold tracking-tight sm:text-4xl">
        <span aria-hidden="true" className="inline-block h-3 w-3 bg-accent" />
        Technical Skills
      </h2>

      <p className="mt-4 font-code text-[13px] leading-[1.6] text-secondary">
        [0.312] stack......... {SKILL_GROUPS.length} modules
      </p>

      <motion.div
        ref={ref}
        className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-6"
        initial={prefersReducedMotion ? "show" : "hidden"}
        animate={prefersReducedMotion || isInView ? "show" : "hidden"}
        variants={gridVariants}
      >
        {SKILL_GROUPS.map((group) => {
          const Icon = SKILL_ICONS[group.category];
          return (
            <motion.div
              key={group.category}
              variants={tileVariants}
              className={`flex flex-col bg-surface p-6 shadow-[0_1px_3px_var(--shadow-tint)] ${SKILL_SPANS[group.category]}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold uppercase tracking-[0.15em] md:text-lg">
                    {group.category}
                  </h3>
                  <span className="mt-1 block font-code text-xs text-secondary">
                    {group.slug}
                  </span>
                </div>
                <Icon
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 text-secondary"
                />
              </div>

              <ul className="mt-5 space-y-1.5 font-code text-sm">
                {group.items.map((item, index) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden="true" className="text-secondary">
                      {index}
                    </span>
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-auto pt-6 text-xs leading-relaxed text-secondary">
                {group.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
