import type { ReactElement } from "react";

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

export default function Skills(): ReactElement {
  return (
    <section id="stack" className="px-6 py-20">
      <h2 className="flex items-center gap-3 text-2xl font-bold tracking-tight sm:text-3xl">
        <span aria-hidden="true" className="inline-block h-2.5 w-2.5 bg-accent" />
        Technical Skills
      </h2>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {SKILL_GROUPS.map((group, index) => (
          <div
            key={group.category}
            className={
              index === 0
                ? "bg-surface p-6 hover:shadow-[0_0_20px_-4px_var(--accent)] sm:col-span-2"
                : "bg-surface p-6 hover:shadow-[0_0_20px_-4px_var(--accent)]"
            }
          >
            <h3 className="text-sm font-bold uppercase tracking-[0.2em]">
              {group.category}
            </h3>
            <p className="mt-3 max-w-prose text-xs leading-relaxed opacity-70">
              {group.description}
            </p>
            <p className="mt-4 text-xs leading-relaxed tracking-[0.1em]">
              {group.items.join(" · ")}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
