"use client";

import Link from "next/link";
import * as React from "react";
import { SITE } from "@/lib/site";

export default function NavBar(): React.ReactElement {
  const [open, setOpen] = React.useState<boolean>(false);

  const closeMenu = (): void => setOpen(false);

  return (
    <header className="border-b border-foreground">
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 px-6 py-5">
        <Link
          href="/"
          className="text-sm font-bold uppercase tracking-[0.2em] hover:text-accent"
        >
          {SITE.name}
        </Link>

        <div className="flex items-center gap-6">
          <nav className="hidden items-center gap-6 text-xs uppercase tracking-[0.2em] md:flex">
            <Link href="/" className="hover:text-accent">
              Home
            </Link>
            <a href="#stack" className="hover:text-accent">
              Tech Stack
            </a>
            <a href="#projects" className="hover:text-accent">
              Projects
            </a>
            <a href="#contact" className="hover:text-accent">
              Contact
            </a>
          </nav>

          <button
            type="button"
            disabled
            aria-label="Toggle theme"
            className="flex h-8 w-8 items-center justify-center border border-foreground"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9l-2.1 2.1M7 17l-2.1 2.1" />
            </svg>
          </button>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
            className="flex h-8 w-8 items-center justify-center border border-foreground md:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              {open ? (
                <path d="M4 4l16 16M20 4L4 20" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open ? (
        <nav className="flex flex-col border border-foreground bg-background text-xs uppercase tracking-[0.2em] md:hidden">
          <Link
            href="/"
            onClick={closeMenu}
            className="border-b border-foreground px-6 py-4 hover:text-accent"
          >
            Home
          </Link>
          <a
            href="#stack"
            onClick={closeMenu}
            className="border-b border-foreground px-6 py-4 hover:text-accent"
          >
            Tech Stack
          </a>
          <a
            href="#projects"
            onClick={closeMenu}
            className="border-b border-foreground px-6 py-4 hover:text-accent"
          >
            Projects
          </a>
          <a
            href="#contact"
            onClick={closeMenu}
            className="px-6 py-4 hover:text-accent"
          >
            Contact
          </a>
        </nav>
      ) : null}
    </header>
  );
}
