"use client";

import type { ReactElement } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Archive, Check, Clock, type LucideIcon } from "lucide-react";
import type { Project } from "@/lib/projects";

const STATUS_LABEL: Record<Project["status"], string> = {
  shipped: "Shipped",
  "in-development": "In Development",
  archived: "Archived",
};

const STATUS_ICON: Record<Project["status"], LucideIcon> = {
  shipped: Check,
  "in-development": Clock,
  archived: Archive,
};

export default function ProjectCard({ project }: { project: Project }): ReactElement {
  const prefersReducedMotion = useReducedMotion();
  const StatusIcon = STATUS_ICON[project.status];

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
        className="flex h-full flex-col bg-surface shadow-[0_1px_3px_var(--shadow-tint)] transition-shadow duration-300 hover:shadow-[0_0_20px_-4px_var(--accent)]"
      >
        {project.imageUrl ? (
          <div className="relative h-40 w-full overflow-hidden bg-background">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              unoptimized
              className="object-cover"
            />
          </div>
        ) : null}

        <div className="flex h-full flex-col p-8">
          <div className="flex items-start justify-between gap-4">
            <span className="text-xs uppercase tracking-[0.2em] text-secondary">
              {project.role}
            </span>
            <span className="flex items-center gap-1.5 bg-background px-2 py-1 text-xs uppercase tracking-[0.2em] text-secondary">
              <StatusIcon aria-hidden="true" className="h-3.5 w-3.5" />
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
                className="bg-background px-3 py-1.5 text-xs uppercase tracking-[0.1em] text-secondary"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-auto flex items-center justify-between pt-6 text-sm text-secondary group-hover:text-accent">
            <span>View on GitHub</span>
            <span
              aria-hidden="true"
              className={
                prefersReducedMotion
                  ? "opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  : "opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-x-1 group-hover:opacity-100"
              }
            >
              →
            </span>
          </div>
        </div>
      </motion.div>
    </a>
  );
}
