"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SITE } from "@/lib/site";

const THEME_STORAGE_KEY = "theme";
const THEME_CHANGE_EVENT = "theme-change";

const NAV_LINKS = [
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "contact", label: "Contact", href: "#contact" },
] as const;

function subscribeToTheme(callback: () => void): () => void {
  window.addEventListener("storage", callback);
  window.addEventListener(THEME_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(THEME_CHANGE_EVENT, callback);
  };
}

function getThemeSnapshot(): "default" | "blood-moon" {
  try {
    return window.localStorage.getItem(THEME_STORAGE_KEY) === "blood-moon"
      ? "blood-moon"
      : "default";
  } catch {
    return "default";
  }
}

function getThemeServerSnapshot(): "default" | "blood-moon" {
  return "default";
}

export default function NavBar(): React.ReactElement {
  const [open, setOpen] = React.useState<boolean>(false);
  const [activeId, setActiveId] = React.useState<string>("");
  const theme = React.useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getThemeServerSnapshot,
  );
  const prefersReducedMotion = useReducedMotion();
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = React.useRef<HTMLAnchorElement>(null);

  const closeMenu = (): void => setOpen(false);

  React.useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (!open) return;
    firstMobileLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent): void => {
      const target = e.target as Node;
      if (
        !triggerRef.current?.contains(target) &&
        !document.getElementById("mobile-nav")?.contains(target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const toggleTheme = (): void => {
    const next = theme === "blood-moon" ? "default" : "blood-moon";
    if (next === "blood-moon") {
      document.documentElement.setAttribute("data-theme", "blood-moon");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* storage unavailable — theme still applied for this session */
    }
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  };

  const themeLabel =
    theme === "blood-moon"
      ? "Switch to default theme"
      : "Switch to blood moon theme";

  const linkBase =
    "mr-[-0.2em] underline decoration-foreground/50 hover:text-accent hover:decoration-accent transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

  return (
    <header className="sticky top-0 z-50 bg-background">
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 px-6 py-6">
        <a
          href="#top"
          className="text-sm font-bold uppercase tracking-[0.2em] hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {SITE.name}
        </a>

        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-6 text-xs uppercase tracking-[0.2em] md:flex">
            {NAV_LINKS.map((l) => {
              const active = activeId === l.id;
              return (
                <a
                  key={l.id}
                  href={l.href}
                  aria-current={active ? "true" : undefined}
                  className={`${linkBase} ${active ? "font-bold" : ""}`}
                >
                  {active ? (
                    <span aria-hidden="true" className="mr-1 text-secondary">
                      &gt;
                    </span>
                  ) : null}
                  {l.label}
                </a>
              );
            })}
          </nav>

          <button
            type="button"
            title={themeLabel}
            aria-label={themeLabel}
            aria-pressed={theme === "blood-moon"}
            onClick={toggleTheme}
            className="flex h-8 w-8 items-center justify-center bg-surface transition-colors duration-300 hover:text-accent hover:shadow-[0_0_16px_-2px_var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <motion.span
              className="flex h-4 w-4 items-center justify-center"
              animate={{ rotate: theme === "blood-moon" ? 180 : 0 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.4, ease: "easeInOut" }
              }
            >
              {theme === "blood-moon" ? (
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
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
            </motion.span>
          </button>

          <button
            ref={triggerRef}
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((prev) => !prev)}
            className="flex h-8 w-8 items-center justify-center bg-surface transition-colors duration-300 hover:text-accent hover:shadow-[0_0_16px_-2px_var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              {open ? <path d="M4 4l16 16M20 4L4 20" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.nav
            key="mobile-nav"
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={
              prefersReducedMotion ? { duration: 0 } : { duration: 0.25, ease: "easeOut" }
            }
            className="overflow-hidden bg-surface md:hidden"
          >
            <div className="flex flex-col px-6 py-2 text-xs uppercase tracking-[0.2em]">
              {NAV_LINKS.map((l, i) => (
                <a
                  key={l.id}
                  ref={i === 0 ? firstMobileLinkRef : undefined}
                  href={l.href}
                  onClick={closeMenu}
                  aria-current={activeId === l.id ? "true" : undefined}
                  className={`${linkBase} py-4 ${activeId === l.id ? "font-bold" : ""}`}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
