"use client";

import type { ReactElement } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/lib/projects";

const STATUS_LABEL: Record<Project["status"], string> = {
  shipped: "Shipped",
  "in-development": "In Development",
  archived: "Archived",
};

export default function ProjectCard({ project }: { project: Project }): ReactElement {
  const prefersReducedMotion = useReducedMotion();

  return (
    <a
      href={project.repoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
    >
      <motion.div
        whileHover={prefersReducedMotion ? undefined : { y: -4 }}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex h-full flex-col bg-surface p-8 hover:shadow-[0_0_20px_-4px_var(--accent)]"
      >
        <div className="flex items-start justify-between gap-4">
          <span className="text-xs uppercase tracking-[0.2em] opacity-70">
            {project.role}
          </span>
          <span className="bg-background px-2 py-1 text-xs uppercase tracking-[0.2em] opacity-70">
            {STATUS_LABEL[project.status]}
          </span>
        </div>

        <h3 className="mt-4 text-lg font-semibold text-foreground group-hover:text-accent">
          {project.title}
        </h3>

        <p className="mt-2 text-[15px] leading-relaxed text-secondary">
          {project.shortDescription}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="bg-background px-3 py-1.5 text-xs uppercase tracking-[0.1em] opacity-70"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between pt-6 text-sm text-secondary group-hover:text-accent">
          <span>View on GitHub</span>
          <span
            aria-hidden="true"
            className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            →
          </span>
        </div>
      </motion.div>
    </a>
  );
}
