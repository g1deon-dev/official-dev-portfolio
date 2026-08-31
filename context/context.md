# Portfolio Website — Context

## What this is

A personal developer portfolio for **Elijah Gideon B. Yanto** (GitHub: `g1deon-dev`), a BSIT student at Bicol University focused on software engineering, full-stack web development, and data science. Single-page site: NavBar → Hero → Skills → Projects → Contact → Footer.

Repo: https://github.com/g1deon-dev/official-dev-portfolio

## Tech stack

- **Next.js 16.3.3** (App Router, TypeScript, Turbopack)
- **React 19.2.8**
- **Tailwind CSS v4** (CSS-first `@theme inline` config, no `tailwind.config.js`)
- **Framer Motion** (installed as a dependency; not yet used in any component)
- No test framework — verification is `npm run lint` + `npx tsc --noEmit` + `npm run build`, plus a manual dev-server check

## Design system

Governed by `CLAUDE.md` at the repo root, which **overrides default behavior** for any AI agent working in this repo. Current rules (as of the dual-theme redesign):

- **Typography:** system monospace or a rigid sans-serif stack only — no Google Fonts (Inter, Roboto, etc.)
- **Color:** a strict **two-theme system**, each theme monochrome-plus-one-accent:
  | Theme | Background | Surface (tile fill) | Text | Accent |
  |---|---|---|---|---|
  | Default (`:root`) | `#0a1628` navy | `#101d33` | `#c9d3e0` silver | `#22d3ee` cyan |
  | `blood-moon` (`[data-theme='blood-moon']`) | `#180a10` maroon-black | `#220e15` | `#f2c6ce` pale pink | `#ff4d6d` crimson |

  No gradients, textures, or a third color in either theme. Accent color is reserved **exclusively** for `:hover`/`:focus` states — never resting.
- **Layout:** asymmetrical **bento grid** — solid-fill tiles of varying size separated by generous gap spacing, dense information layout. No centered text blocks, no symmetrical 3-column cards.
- **UI elements:** sharp corners only (no `rounded-*`), no border, no shadow at rest. `box-shadow` accent glow permitted strictly on hover/focus of interactive elements.
- **Code:** no comments anywhere in the codebase (hard rule).

This design system evolved: the site originally shipped with a single monochrome black/white theme and visible structural borders separating every section (the "brutalist bordered" look). Issue #10 deliberately replaced that with the current dual-theme, borderless bento aesthetic — `CLAUDE.md` was rewritten at that point to match, so it always reflects the *current* intended design, not the original one.

## Theme switching

A toggle button in `NavBar.tsx` flips `data-theme` on `<html>` between unset (default) and `"blood-moon"`, persisted to `localStorage` (key: `"theme"`). An inline blocking `<script>` in `app/layout.tsx`'s `<head>` reads that value before paint to avoid a flash of the wrong theme on load.

## Site content (`lib/site.ts`)

Single source of truth for identity/contact data, imported by `Contact.tsx`, `NavBar.tsx`, and the footer in `layout.tsx`:

```ts
name: "Elijah Gideon B. Yanto"
handle: "g1deon-dev"
status: "Available for work"
year: 2026
github: "https://github.com/g1deon-dev"
linkedin: "https://www.linkedin.com/in/g1deon-dev"
facebook: "https://facebook.com/g1deondev"      // placeholder — swap for the real handle
discord: "https://discord.com/users/g1deondev"  // placeholder — swap for the real handle
email: "yantoelijah14@gmail.com"
```

## Components (`components/`)

- **`NavBar.tsx`** — logo/name link, section jump links (Home / Tech Stack / Projects / Contact), functional theme toggle, mobile hamburger menu.
- **`Hero.tsx`** — eyebrow label (name), H1 tagline ("I build full-stack web applications and IoT systems."), subheading ("BSIT Student at Bicol University | Focused on Software Engineering, Full-Stack Web Development, and Data Science."), two CTA buttons ("Get in touch" → `#contact`, "View work" → `#projects`).
- **`Skills.tsx`** — bento grid of skill categories: Core Languages (C, Java, Python), Web Technologies (HTML, Tailwind CSS, Next.js, Framer Motion), Tools & Workflows (Git, GitHub, VS Code, Claude Code), Embedded & IoT (ESP32 microcontroller integration).
- **`Projects.tsx`** — placeholder bento grid (3 tiles, all "Currently in Development"); no real projects wired in yet.
- **`Contact.tsx`** — bento grid of 5 link tiles: GitHub, LinkedIn, Facebook, Discord, Email (`mailto:`).

`app/layout.tsx` wraps everything in a `max-w-5xl` centered column with the NavBar, page content, and a footer (status indicator, GitHub/LinkedIn links, copyright).

## Project management

Tracked via a GitHub Projects (v2) board linked to this repo (`@g1deon-dev's official-dev-portfolio`, project #1). Each issue is a scoped implementation task with an explicit spec (objective, execution steps, strict constraints) written for an AI agent to execute. Issues #2–#11 are closed/Done — project init, `CLAUDE.md` authoring, layout, NavBar, Hero, Skills, Projects, Contact, and the dual-theme bento redesign are all shipped on `main`. No open issues as of this writing.

## Workflow conventions for this repo

- Every feature is implemented on an isolated git worktree/branch, verified (lint + typecheck + build), then merged to `main` and pushed only when explicitly requested.
- Ambiguous or CLAUDE.md-conflicting issue specs are clarified with the project owner (via brainstorming) before implementation — several issues (e.g. #10) have explicitly amended `CLAUDE.md` itself as part of the accepted design.
- Implementation work is delegated to a subagent in its own worktree per issue; the orchestrating session reviews the diff and verification output before merging.
