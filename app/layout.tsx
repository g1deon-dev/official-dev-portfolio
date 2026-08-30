import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SITE } from "@/lib/site";
import NavBar from "@/components/NavBar";
import "./globals.css";

export const metadata: Metadata = {
  title: `${SITE.name} — Software Developer Portfolio`,
  description: SITE.description,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-mono text-foreground antialiased">
        <div className="mx-auto flex min-h-screen max-w-5xl flex-col border-x border-foreground">
          <NavBar />

          <div className="flex-1">{children}</div>

          <footer className="border-t border-foreground px-6 py-5 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
              <p className="flex items-center gap-2 uppercase tracking-[0.2em]">
                <span aria-hidden="true" className="inline-block h-2.5 w-2.5 bg-accent" />
                {SITE.status}
              </p>
              <nav className="flex items-center gap-6 uppercase tracking-[0.2em]">
                <a
                  href={SITE.github}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-accent"
                >
                  GitHub
                </a>
                <a
                  href={SITE.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-accent"
                >
                  LinkedIn
                </a>
              </nav>
            </div>
            <p className="mt-4 tracking-[0.15em]">
              © {SITE.year} {SITE.name}
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
