"use client";

import type { ReactElement } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Code2, Cpu, Globe, Wrench, type LucideIcon } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type SkillGroup = {
  category: string;
  description: string;
  items: readonly string[];
};

const SKILL_GROUPS: readonly SkillGroup[] = [
  {
    category: "Core Languages",
    description:
      "General-purpose programming languages used for algorithms, data structures, systems programming, and coursework.",
    items: ["C", "Java", "Python"],
  },
  {
    category: "Web Technologies",
    description:
      "The markup, styling, framework, and animation tools used to build front-end web applications.",
    items: ["HTML", "Tailwind CSS", "Next.js", "Framer Motion"],
  },
  {
    category: "Tools & Workflows",
    description:
      "Version control, code hosting, editor, and AI assistant used in day-to-day development.",
    items: ["Git", "GitHub", "VS Code", "Claude Code"],
  },
  {
    category: "Embedded & IoT",
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

      <motion.div
        ref={ref}
        className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3"
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
              className="group bg-surface p-6 shadow-[0_1px_3px_var(--shadow-tint)] transition-shadow duration-300 hover:shadow-[0_0_20px_-4px_var(--accent)]"
            >
              <div className="flex items-center gap-3">
                <Icon
                  aria-hidden="true"
                  className="h-6 w-6 text-secondary transition-colors duration-300 group-hover:text-accent"
                />
                <h3 className="text-sm font-bold uppercase tracking-[0.2em]">
                  {group.category}
                </h3>
              </div>
              <p className="mt-3 max-w-prose text-xs leading-relaxed text-secondary">
                {group.description}
              </p>
              <p className="mt-4 text-xs leading-relaxed tracking-[0.1em]">
                {group.items.join(" · ")}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
