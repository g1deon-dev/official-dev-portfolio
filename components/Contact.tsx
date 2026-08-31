import type { ReactElement } from "react";
import { SITE } from "@/lib/site";

const LINKS: readonly { label: string; href: string }[] = [
  { label: "GitHub", href: SITE.github },
  { label: "LinkedIn", href: SITE.linkedin },
  { label: "Facebook", href: SITE.facebook },
  { label: "Discord", href: SITE.discord },
  { label: "Email", href: `mailto:${SITE.email}` },
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

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("mailto:") ? undefined : "_blank"}
            rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
            className={
              link.label === "Email"
                ? "group flex min-h-32 flex-col justify-between bg-surface p-6 hover:text-accent hover:shadow-[0_0_20px_-4px_var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:col-span-2"
                : "group flex min-h-32 flex-col justify-between bg-surface p-6 hover:text-accent hover:shadow-[0_0_20px_-4px_var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            }
          >
            <span className="text-xs uppercase tracking-[0.2em] text-secondary">
              {link.label}
            </span>
            <span className="mr-[-0.05em] inline-block underline decoration-foreground/50 transition-colors duration-200 group-hover:decoration-accent text-sm tracking-[0.05em]">
              {link.href.replace("mailto:", "")}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
