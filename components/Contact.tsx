import type { ReactElement, ReactNode } from "react";
import { Mail, MessageCircle } from "lucide-react";
import { SiFacebook, SiGithub } from "@icons-pack/react-simple-icons";
import { SITE } from "@/lib/site";

function LinkedInIcon({ className }: { className?: string }): ReactElement {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

type ContactLink = {
  label: string;
  href: string;
  icon: ReactNode;
};

function formatDisplayValue(href: string): string {
  if (href.startsWith("mailto:")) {
    return href.replace("mailto:", "");
  }
  return href.replace(/^https?:\/\/(www\.)?/, "");
}

const LINKS: readonly ContactLink[] = [
  {
    label: "GitHub",
    href: SITE.github,
    icon: <SiGithub aria-hidden="true" size={32} className="h-8 w-8" />,
  },
  {
    label: "LinkedIn",
    href: SITE.linkedin,
    icon: <LinkedInIcon className="h-8 w-8" />,
  },
  {
    label: "Facebook",
    href: SITE.facebook,
    icon: <SiFacebook aria-hidden="true" size={32} className="h-8 w-8" />,
  },
  {
    label: "Discord",
    href: SITE.discord,
    icon: <MessageCircle aria-hidden="true" size={32} className="h-8 w-8" />,
  },
  {
    label: "Email",
    href: `mailto:${SITE.email}`,
    icon: <Mail aria-hidden="true" size={32} className="h-8 w-8" />,
  },
];

export default function Contact(): ReactElement {
  return (
    <section id="contact" className="px-6 py-20">
      <h2 className="flex items-center gap-3 text-2xl font-bold tracking-tight sm:text-3xl">
        <span aria-hidden="true" className="inline-block h-2.5 w-2.5 bg-accent" />
        Contact
      </h2>

      <p className="mt-3 max-w-prose text-xs leading-relaxed text-secondary">
        Reach out directly through either channel below.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("mailto:") ? undefined : "_blank"}
            rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
            className="group flex min-h-32 flex-col justify-between bg-surface p-6 shadow-[0_1px_3px_var(--shadow-tint)] transition-shadow duration-300 hover:text-accent hover:shadow-[0_0_20px_-4px_var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.2em] text-secondary">
                {link.label}
              </span>
              <span className="text-secondary transition-colors duration-300 group-hover:text-accent">
                {link.icon}
              </span>
            </div>
            <span className="mr-[-0.05em] block truncate underline decoration-foreground/50 transition-colors duration-200 group-hover:decoration-accent text-sm tracking-[0.05em]">
              {formatDisplayValue(link.href)}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
