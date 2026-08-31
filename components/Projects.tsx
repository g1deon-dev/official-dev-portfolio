"use client";

import type { ReactElement } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { projects } from "@/lib/projects";
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
    <section id="projects" className="px-12 py-20">
      <h2 className="flex items-center gap-3 text-2xl font-bold tracking-tight sm:text-3xl">
        <span aria-hidden="true" className="inline-block h-2.5 w-2.5 bg-accent" />
        Projects
      </h2>

      <p className="mt-3 max-w-prose text-base text-secondary">
        A selection of projects showcasing full-stack development, software engineering, and problem-solving.
      </p>

      <motion.div
        ref={ref}
        className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        initial={prefersReducedMotion ? "show" : "hidden"}
        animate={prefersReducedMotion || isInView ? "show" : "hidden"}
        variants={gridVariants}
      >
        {projects.map((project) => (
          <motion.div key={project.id} variants={tileVariants}>
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
