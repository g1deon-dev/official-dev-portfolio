"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { SiDiscord, SiFacebook, SiGithub } from "@icons-pack/react-simple-icons";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { gridVariants, tileVariants } from "@/lib/motion";
import { SITE } from "@/lib/site";

function LinkedInIcon({ className }: { className?: string }): ReactElement {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  );
}

type SocialLink = {
  key: string;
  label: string;
  href: string;
  handle: string;
  icon: ReactNode;
};

const ICON_CLASS = "h-8 w-8";

const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    key: "linkedin",
    label: "LinkedIn",
    href: SITE.linkedin,
    handle: "in/g1deon-dev",
    icon: <LinkedInIcon className={ICON_CLASS} />,
  },
  {
    key: "github",
    label: "GitHub",
    href: SITE.github,
    handle: "@g1deon-dev",
    icon: <SiGithub aria-hidden="true" className={ICON_CLASS} />,
  },
  {
    key: "facebook",
    label: "Facebook",
    href: SITE.facebook,
    handle: "g1deondev",
    icon: <SiFacebook aria-hidden="true" className={ICON_CLASS} />,
  },
];

function CopyButton({
  value,
  copied,
  onCopy,
}: {
  value: string;
  copied: boolean;
  onCopy: () => void;
}): ReactElement {
  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={`Copy ${value} to clipboard`}
      className="flex shrink-0 items-center gap-2 self-start bg-background px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-secondary transition-colors duration-200 hover:text-accent hover:shadow-[0_0_16px_-4px_var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {copied ? (
        <Check aria-hidden="true" className="h-4 w-4" />
      ) : (
        <Copy aria-hidden="true" className="h-4 w-4" />
      )}
      <span>{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}

export default function Contact(): ReactElement {
  const { ref, isInView } = useScrollReveal();
  const prefersReducedMotion = useReducedMotion();
  const [copied, setCopied] = useState<string | null>(null);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, []);

  const copy = async (key: string, value: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      if (resetTimer.current) clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopied(null);
    }
  };

  const tileClass =
    "flex min-h-32 flex-col justify-between bg-surface p-6 shadow-[0_1px_3px_var(--shadow-tint)]";
  const linkTileClass = `group ${tileClass} transition-shadow duration-300 hover:text-accent hover:shadow-[0_0_20px_-4px_var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent`;

  return (
    <section id="contact" aria-labelledby="contact-heading" className="px-6 py-20">
      <h2
        id="contact-heading"
        className="flex items-center gap-3 text-3xl font-bold tracking-tight sm:text-4xl"
      >
        <span aria-hidden="true" className="inline-block h-3 w-3 bg-accent" />
        Contact
      </h2>

      <p className="mt-3 max-w-prose text-base leading-relaxed text-secondary">
        <span className="text-foreground">{SITE.status}.</span> The fastest way to
        reach me is email — I&apos;m also on LinkedIn, GitHub, Discord, and Facebook.
      </p>

      <motion.div
        ref={ref}
        className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2"
        initial={prefersReducedMotion ? "show" : "hidden"}
        animate={prefersReducedMotion || isInView ? "show" : "hidden"}
        variants={gridVariants}
      >
        <motion.div
          variants={tileVariants}
          className="flex flex-col gap-6 bg-surface p-8 shadow-[0_1px_3px_var(--shadow-tint)] sm:col-span-2 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="min-w-0">
            <span className="text-xs uppercase tracking-[0.2em] text-secondary">
              Email
            </span>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-3 block select-all break-words text-lg tracking-[0.05em] underline decoration-foreground/50 transition-colors duration-200 hover:text-accent hover:decoration-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:text-xl"
            >
              {SITE.email}
            </a>
          </div>
          <CopyButton
            value={SITE.email}
            copied={copied === "email"}
            onCopy={() => copy("email", SITE.email)}
          />
        </motion.div>

        {SOCIAL_LINKS.map((link) => (
          <motion.a
            key={link.key}
            variants={tileVariants}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${link.label} — opens in a new tab`}
            className={linkTileClass}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.2em] text-secondary">
                {link.label}
              </span>
              <span className="text-secondary transition-colors duration-300 group-hover:text-accent">
                {link.icon}
              </span>
            </div>
            <span className="block underline decoration-foreground/50 transition-colors duration-200 group-hover:decoration-accent text-sm tracking-[0.05em]">
              {link.handle}
            </span>
          </motion.a>
        ))}

        <motion.div variants={tileVariants} className={tileClass}>
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-[0.2em] text-secondary">
              Discord
            </span>
            <span className="text-secondary">
              <SiDiscord aria-hidden="true" className={ICON_CLASS} />
            </span>
          </div>
          <div className="flex items-end justify-between gap-3">
            <span className="text-sm tracking-[0.05em] text-foreground">
              {SITE.discord}
            </span>
            <CopyButton
              value={SITE.discord}
              copied={copied === "discord"}
              onCopy={() => copy("discord", SITE.discord)}
            />
          </div>
        </motion.div>
      </motion.div>

      <span aria-live="polite" className="sr-only">
        {copied ? `${copied} copied to clipboard` : ""}
      </span>
    </section>
  );
}
