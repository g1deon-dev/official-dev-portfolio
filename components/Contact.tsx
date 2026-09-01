"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { Check, Copy, Mail, MessageCircle } from "lucide-react";
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
  return href.replace(/^https?:\/\/(www\.)?/, "");
}

const LINKS: readonly ContactLink[] = [
  {
    label: "LinkedIn",
    href: SITE.linkedin,
    icon: <LinkedInIcon className="h-8 w-8" />,
  },
  {
    label: "GitHub",
    href: SITE.github,
    icon: <SiGithub aria-hidden="true" size={32} className="h-8 w-8" />,
  },
  {
    label: "Discord",
    href: SITE.discord,
    icon: <MessageCircle aria-hidden="true" size={32} className="h-8 w-8" />,
  },
  {
    label: "Facebook",
    href: SITE.facebook,
    icon: <SiFacebook aria-hidden="true" size={32} className="h-8 w-8" />,
  },
];

export default function Contact(): ReactElement {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, []);

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      if (resetTimer.current) clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="contact" className="px-6 py-20">
      <h2 className="flex items-center gap-3 text-3xl font-bold tracking-tight sm:text-4xl">
        <span aria-hidden="true" className="inline-block h-3 w-3 bg-accent" />
        Contact
      </h2>

      <p className="mt-3 max-w-prose text-xs leading-relaxed text-secondary">
        {SITE.status}. The fastest way to reach me is email — I&apos;m also on
        LinkedIn, GitHub, Discord, and Facebook.
      </p>

      <div className="mt-10 flex flex-col gap-6 bg-surface p-8 shadow-[0_1px_3px_var(--shadow-tint)] sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-[0.2em] text-secondary">
              Email
            </span>
            <Mail aria-hidden="true" className="h-5 w-5 text-secondary" />
          </div>
          <a
            href={`mailto:${SITE.email}`}
            className="mt-3 block break-all text-lg tracking-[0.05em] underline decoration-foreground/50 transition-colors duration-200 hover:text-accent hover:decoration-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:text-xl"
          >
            {SITE.email}
          </a>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy email address to clipboard"
          className="flex shrink-0 items-center gap-2 self-start bg-background px-4 py-2 text-xs uppercase tracking-[0.2em] text-secondary transition-colors duration-200 hover:text-accent hover:shadow-[0_0_16px_-4px_var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {copied ? (
            <Check aria-hidden="true" className="h-4 w-4" />
          ) : (
            <Copy aria-hidden="true" className="h-4 w-4" />
          )}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>

        <span aria-live="polite" className="sr-only">
          {copied ? "Email address copied to clipboard" : ""}
        </span>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
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
