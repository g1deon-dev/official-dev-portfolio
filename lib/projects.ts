export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  role: string;
  technologies: string[];
  imageUrl?: string;
  liveUrl?: string;
  repoUrl: string;
  status: "shipped" | "in-development" | "archived";
}

export const projects: Project[] = [
  {
    id: "project-1",
    title: "Official Dev Portfolio",
    description:
      "Personal portfolio site built with Next.js, Tailwind CSS v4, and Framer Motion. Dual-theme system with constraint-based design.",
    shortDescription: "Full-stack portfolio with a dual-theme bento grid layout.",
    role: "Creator",
    technologies: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Framer Motion"],
    repoUrl: "https://github.com/g1deon-dev/official-dev-portfolio",
    status: "shipped",
  },
  {
    id: "project-2",
    title: "Placeholder Project Two",
    description: "Placeholder entry — swap for a real project before this section goes live.",
    shortDescription: "Placeholder — swap for a real project before this goes live.",
    role: "Placeholder",
    technologies: ["Placeholder"],
    repoUrl: "https://github.com/g1deon-dev",
    status: "in-development",
  },
  {
    id: "project-3",
    title: "Placeholder Project Three",
    description: "Placeholder entry — swap for a real project before this section goes live.",
    shortDescription: "Placeholder — swap for a real project before this goes live.",
    role: "Placeholder",
    technologies: ["Placeholder"],
    repoUrl: "https://github.com/g1deon-dev",
    status: "in-development",
  },
];
