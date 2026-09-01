"use client";

import type { ReactElement } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { gridVariants, tileVariants } from "@/lib/motion";
import { projects } from "@/lib/projects";
import { SITE } from "@/lib/site";
import ProjectCard from "@/components/ProjectCard";

export default function Projects(): ReactElement {
  const { ref, isInView } = useScrollReveal();
  const prefersReducedMotion = useReducedMotion();
  const single = projects.length === 1;

  return (
    <section id="projects" aria-labelledby="projects-heading" className="px-6 py-20">
      <h2
        id="projects-heading"
        className="flex items-center gap-3 text-3xl font-bold tracking-tight sm:text-4xl"
      >
        <span aria-hidden="true" className="inline-block h-3 w-3 bg-accent" />
        Projects
      </h2>

      <p className="mt-3 max-w-prose text-base text-secondary">
        A constraint-driven portfolio build in Next.js and Tailwind v4. More
        repositories and coursework live on GitHub.
      </p>

      <motion.div
        ref={ref}
        className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2"
        initial={prefersReducedMotion ? "show" : "hidden"}
        animate={prefersReducedMotion || isInView ? "show" : "hidden"}
        variants={gridVariants}
      >
        {projects.map((project) => (
          <motion.div
            key={project.id}
            variants={tileVariants}
            className={single ? "sm:col-span-2" : undefined}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}

        <motion.a
          variants={tileVariants}
          href={SITE.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between gap-4 bg-surface px-8 py-6 shadow-[0_1px_3px_var(--shadow-tint)] transition-shadow duration-300 hover:shadow-[0_0_20px_-4px_var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 sm:col-span-2"
        >
          <span className="flex items-center gap-4 text-sm text-secondary">
            <SiGithub
              aria-hidden="true"
              className="h-5 w-5 shrink-0 transition-colors duration-300 group-hover:text-accent"
            />
            <span>
              More repositories, coursework, and works in progress —{" "}
              <span className="text-foreground">@{SITE.handle}</span>
              <span className="sr-only"> (opens GitHub in a new tab)</span>
            </span>
          </span>
          <span
            aria-hidden="true"
            className={
              prefersReducedMotion
                ? "shrink-0 text-secondary transition-colors duration-300 group-hover:text-accent"
                : "shrink-0 text-secondary transition-[color,transform] duration-300 group-hover:translate-x-1 group-hover:text-accent"
            }
          >
            →
          </span>
        </motion.a>
      </motion.div>
    </section>
  );
}
