"use client";

import type { ReactElement } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Code2, Cpu, Globe, Wrench, type LucideIcon } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { gridVariants, tileVariants } from "@/lib/motion";

type SkillGroup = {
  category: string;
  slug: string;
  note: string;
  items: readonly string[];
};

const SKILL_GROUPS: readonly SkillGroup[] = [
  {
    category: "Core Languages",
    slug: "core.languages",
    note: "Coursework and personal tools — algorithms, data structures, systems programming.",
    items: ["C", "Java", "Python"],
  },
  {
    category: "Web Technologies",
    slug: "web.stack",
    note: "The front-end stack behind this site — markup, styling, framework, motion.",
    items: ["HTML", "Tailwind CSS", "Next.js", "Framer Motion"],
  },
  {
    category: "Tools & Workflows",
    slug: "dev.tooling",
    note: "Daily version control, editing, and AI-assisted development.",
    items: ["Git", "GitHub", "VS Code", "Claude Code"],
  },
  {
    category: "Embedded & IoT",
    slug: "hardware.embedded",
    note: "ESP32 microcontrollers bridging sensors and software.",
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
  "Core Languages": "lg:col-span-2",
  "Web Technologies": "lg:col-span-4",
  "Tools & Workflows": "lg:col-span-4",
  "Embedded & IoT": "lg:col-span-2",
};

export default function Skills(): ReactElement {
  const { ref, isInView } = useScrollReveal();
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="skills" aria-labelledby="skills-heading" className="px-6 py-20">
      <h2
        id="skills-heading"
        className="flex items-center gap-3 text-3xl font-bold tracking-tight sm:text-4xl"
      >
        <span aria-hidden="true" className="inline-block h-3 w-3 bg-accent" />
        Skills
      </h2>

      <p className="mt-4 font-code text-[13px] leading-[1.6] text-secondary">
        stack......... {SKILL_GROUPS.length} modules
      </p>

      <motion.div
        ref={ref}
        className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6"
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
                  <h3 className="text-lg font-bold uppercase tracking-[0.15em]">
                    {group.category}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="mt-1 block font-code text-xs text-secondary"
                  >
                    {group.slug}
                  </span>
                </div>
                <Icon
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 text-secondary"
                />
              </div>

              <ul className="mt-5 space-y-2 font-code text-sm">
                {group.items.map((item, index) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden="true" className="text-secondary">
                      {index}
                    </span>
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-5 text-xs leading-relaxed text-secondary">
                {group.note}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
