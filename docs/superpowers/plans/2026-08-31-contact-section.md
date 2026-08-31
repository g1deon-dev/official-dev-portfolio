# Contact Section Implementation Plan

**Goal:** Add a static `Contact` section component that surfaces the GitHub profile link and a placeholder professional email, rendered at the bottom of the home page.

**Architecture:** A single presentational component (`components/Contact.tsx`) following the exact structural pattern already established by `components/Skills.tsx` and `components/Projects.tsx` (bordered `<section id="...">` with an accent-dot heading). It reads shared identity data from `lib/site.ts`, which gains one new field (`email`). The component is imported and rendered in `app/page.tsx` below `<Projects />`.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS v4 (no test framework is configured in this repo; verification is `npm run lint` + `npm run build` + a manual dev-server check).

**Spec:** GitHub issue #9, "Implement the contact section to provide communication links" — https://github.com/g1deon-dev/official-dev-portfolio/issues/9

### Task 1: Add placeholder email to shared site config

**Files:**
- Modify: `lib/site.ts`

- [ ] Step 1: Add the `email` field to the `SITE` object so it reads exactly:

```ts
export const SITE = {
  name: "Elijah Gideon B. Yanto",
  handle: "g1deon-dev",
  status: "Available for work",
  year: 2026,
  description:
    "Portfolio of Elijah Gideon B. Yanto (g1deon-dev), a software developer building web applications, developer tooling, and back-end systems.",
  github: "https://github.com/g1deon-dev",
  linkedin: "https://www.linkedin.com/in/g1deon-dev",
  email: "hello@g1deon.dev",
} as const;
```

Only the new `email` line is added; every other field stays byte-for-byte identical.

- [ ] Step 2: Typecheck. Run: `npx tsc --noEmit`. Expected: no errors.
- [ ] Step 3: Commit: `git add lib/site.ts && git commit -m "feat: add placeholder email to site config"`

### Task 2: Build the Contact section component

**Files:**
- Create: `components/Contact.tsx`
- Modify: `app/page.tsx`

- [ ] Step 1: Create `components/Contact.tsx`:

```tsx
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
```

This mirrors the exact section/heading/bordered-grid pattern used by `components/Skills.tsx` and `components/Projects.tsx`: `border-t border-foreground px-6 py-20` section, accent-dot `<h2>`, `border-l border-t` grid wrapper with `border-b border-r` cells so borders don't double up between adjacent cells.

- [ ] Step 2: Render `Contact` in `app/page.tsx`:

```tsx
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Skills />
      <Projects />
      <Contact />
    </main>
  );
}
```

- [ ] Step 3: Lint and typecheck. Run: `npm run lint && npx tsc --noEmit`. Expected: no errors or warnings.
- [ ] Step 4: Build. Run: `npm run build`. Expected: build succeeds with no errors.
- [ ] Step 5: Manual visual check. Run `npm run dev` in the background, curl `http://localhost:3000` and confirm the response HTML contains `id="contact"`, a "GitHub" link, and a `mailto:` link. Then stop the dev server.
- [ ] Step 6: Commit: `git add components/Contact.tsx app/page.tsx && git commit -m "feat: add Contact section component"`

## When you're done
Report back: the branch name, the exact commits you made (hash + message), the full output of `npm run lint`, `npx tsc --noEmit`, and `npm run build`, and confirm the manual dev-server check passed. If anything fails, stop and report the failure with full output rather than guessing a fix.
