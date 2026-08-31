"use client";

import Link from "next/link";
import * as React from "react";
import { SITE } from "@/lib/site";

const THEME_STORAGE_KEY = "theme";
const THEME_CHANGE_EVENT = "theme-change";

function subscribeToTheme(callback: () => void): () => void {
  window.addEventListener("storage", callback);
  window.addEventListener(THEME_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(THEME_CHANGE_EVENT, callback);
  };
}

function getThemeSnapshot(): "default" | "blood-moon" {
  return window.localStorage.getItem(THEME_STORAGE_KEY) === "blood-moon"
    ? "blood-moon"
    : "default";
}

function getThemeServerSnapshot(): "default" | "blood-moon" {
  return "default";
}

export default function NavBar(): React.ReactElement {
  const [open, setOpen] = React.useState<boolean>(false);
  const theme = React.useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getThemeServerSnapshot,
  );

  const closeMenu = (): void => setOpen(false);

  const toggleTheme = (): void => {
    const next = theme === "blood-moon" ? "default" : "blood-moon";
    if (next === "blood-moon") {
      document.documentElement.setAttribute("data-theme", "blood-moon");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    window.localStorage.setItem(THEME_STORAGE_KEY, next);
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  };

  return (
    <header>
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 px-6 py-6">
        <Link
          href="/"
          className="text-sm font-bold uppercase tracking-[0.2em] hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {SITE.name}
        </Link>

        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-6 text-xs uppercase tracking-[0.2em] md:flex">
            <Link href="/" className="underline decoration-foreground/50 hover:text-accent hover:decoration-accent transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
              Home
            </Link>
            <a href="#stack" className="underline decoration-foreground/50 hover:text-accent hover:decoration-accent transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
              Tech Stack
            </a>
            <a href="#projects" className="underline decoration-foreground/50 hover:text-accent hover:decoration-accent transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
              Projects
            </a>
            <a href="#contact" className="underline decoration-foreground/50 hover:text-accent hover:decoration-accent transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
              Contact
            </a>
          </nav>

          <button
            type="button"
            aria-label={theme === "blood-moon" ? "Switch to default theme" : "Switch to blood moon theme"}
            aria-pressed={theme === "blood-moon"}
            onClick={toggleTheme}
            className="flex h-8 w-8 items-center justify-center bg-surface transition-colors duration-300 hover:text-accent hover:shadow-[0_0_16px_-2px_var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {theme === "blood-moon" ? (
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-4 w-4"
                fill="currentColor"
              >
                <circle cx="12" cy="12" r="8" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
            className="flex h-8 w-8 items-center justify-center bg-surface hover:shadow-[0_0_16px_-2px_var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:hidden"
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
        <nav className="flex flex-col gap-1 bg-surface px-2 py-2 text-xs uppercase tracking-[0.2em] md:hidden">
          <Link
            href="/"
            onClick={closeMenu}
            className="px-4 py-4 underline decoration-foreground/50 hover:text-accent hover:decoration-accent transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Home
          </Link>
          <a
            href="#stack"
            onClick={closeMenu}
            className="px-4 py-4 underline decoration-foreground/50 hover:text-accent hover:decoration-accent transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Tech Stack
          </a>
          <a
            href="#projects"
            onClick={closeMenu}
            className="px-4 py-4 underline decoration-foreground/50 hover:text-accent hover:decoration-accent transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Projects
          </a>
          <a
            href="#contact"
            onClick={closeMenu}
            className="px-4 py-4 underline decoration-foreground/50 hover:text-accent hover:decoration-accent transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Contact
          </a>
        </nav>
      ) : null}
    </header>
  );
}
