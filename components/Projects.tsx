"use client";

import type { ReactElement } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { projects } from "@/lib/projects";
import { SITE } from "@/lib/site";
import ProjectCard from "@/components/ProjectCard";

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
      <h2 className="flex items-center gap-3 text-3xl font-bold tracking-tight sm:text-4xl">
        <span aria-hidden="true" className="inline-block h-3 w-3 bg-accent" />
        Projects
      </h2>

      <p className="mt-3 max-w-prose text-base text-secondary">
        A selection of projects showcasing full-stack development, software engineering, and problem-solving.
      </p>

      <motion.div
        ref={ref}
        className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-5"
        initial={prefersReducedMotion ? "show" : "hidden"}
        animate={prefersReducedMotion || isInView ? "show" : "hidden"}
        variants={gridVariants}
      >
        {projects.map((project) => (
          <motion.div
            key={project.id}
            variants={tileVariants}
            className="sm:col-span-3"
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}

        <motion.a
          variants={tileVariants}
          href={SITE.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col bg-surface p-8 shadow-[0_1px_3px_var(--shadow-tint)] transition-shadow duration-300 hover:shadow-[0_0_20px_-4px_var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 sm:col-span-2"
        >
          <div className="flex items-start justify-between gap-4">
            <span className="text-xs uppercase tracking-[0.2em] text-secondary">
              Profile
            </span>
            <SiGithub
              aria-hidden="true"
              className="h-6 w-6 text-secondary transition-colors duration-300 group-hover:text-accent"
            />
          </div>

          <h3 className="mt-4 text-lg font-semibold text-foreground group-hover:text-accent">
            More on GitHub
          </h3>

          <p className="mt-2 text-[15px] leading-relaxed text-secondary">
            Repositories, coursework, and works in progress — including this site&apos;s source.
          </p>

          <div className="mt-auto flex items-center justify-between pt-6 text-sm text-secondary group-hover:text-accent">
            <span>@{SITE.handle}</span>
            <span
              aria-hidden="true"
              className={
                prefersReducedMotion
                  ? "opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                  : "opacity-60 transition-[opacity,transform] duration-300 group-hover:translate-x-1 group-hover:opacity-100"
              }
            >
              →
            </span>
          </div>
        </motion.a>
      </motion.div>
    </section>
  );
}
