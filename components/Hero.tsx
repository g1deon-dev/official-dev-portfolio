import type { ReactElement } from "react";

export default function Hero(): ReactElement {
  return (
    <section className="px-6 py-20">
      <p className="text-xs uppercase tracking-[0.2em] text-accent">
        ELIJAH GIDEON B. YANTO
      </p>

      <h1 className="mt-6 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
        I build full-stack web applications and IoT systems.
      </h1>

      <p className="mt-6 max-w-2xl text-sm leading-relaxed sm:text-base">
        BSIT student at Bicol University — I design and ship full-stack web applications and IoT systems.
      </p>

      <div className="mt-10 flex flex-wrap gap-4">
        <a
          href="#contact"
          className="border border-foreground bg-foreground px-6 py-3 text-xs uppercase tracking-[0.2em] text-background hover:bg-background hover:text-accent"
        >
          Get in touch
        </a>
        <a
          href="#projects"
          className="border border-foreground px-6 py-3 text-xs uppercase tracking-[0.2em] hover:text-accent"
        >
          View work
        </a>
      </div>
    </section>
  );
}
