import type { ReactElement } from "react";
import { SITE } from "@/lib/site";

const LINKS: readonly { label: string; href: string }[] = [
  { label: "GitHub", href: SITE.github },
  { label: "Email", href: `mailto:${SITE.email}` },
];

export default function Contact(): ReactElement {
  return (
    <section id="contact" className="border-t border-foreground px-6 py-20">
      <h2 className="flex items-center gap-3 text-2xl font-bold tracking-tight sm:text-3xl">
        <span aria-hidden="true" className="inline-block h-2.5 w-2.5 bg-accent" />
        Contact
      </h2>

      <p className="mt-3 max-w-prose text-xs leading-relaxed opacity-70">
        Reach out directly through either channel below.
      </p>

      <div className="mt-10 grid grid-cols-1 border-l border-t border-foreground sm:grid-cols-2">
        {LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.label === "GitHub" ? "_blank" : undefined}
            rel={link.label === "GitHub" ? "noreferrer" : undefined}
            className="flex min-h-32 flex-col justify-between border-b border-r border-foreground p-6 hover:text-accent"
          >
            <span className="text-xs uppercase tracking-[0.2em] opacity-70">
              {link.label}
            </span>
            <span className="text-sm tracking-[0.05em]">
              {link.href.replace("mailto:", "")}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
