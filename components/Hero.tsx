import type { ReactElement } from "react";

export default function Hero(): ReactElement {
  return (
    <section className="grid grid-cols-1 gap-12 px-12 py-20 md:grid-cols-2">
      <div>
        <h1 className="max-w-xl text-[36px] font-bold leading-[1.2] tracking-[-1px] md:text-[52px]">
          I build full-stack web applications
        </h1>

        <div className="mt-4 h-1 w-[120px] bg-accent" />

        <p className="mt-6 max-w-md text-lg leading-relaxed text-secondary">
          BSIT Student at Bicol University | Focused on Software Engineering, Full-Stack Web Development, and Data Science.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#contact"
            className="bg-accent px-8 py-3 text-base font-semibold tracking-[0.5px] text-background hover:bg-background hover:text-accent hover:shadow-[0_0_20px_-4px_var(--accent)]"
          >
            Get in touch
          </a>
          <a
            href="#projects"
            className="border border-foreground px-8 py-3 text-base font-semibold tracking-[0.5px] text-foreground hover:bg-surface hover:shadow-[0_0_20px_-4px_var(--accent)]"
          >
            View work
          </a>
        </div>
      </div>

      <div className="border border-[#1f2937] bg-surface p-8 font-code text-[13px] leading-[1.6]">
        <p>
          <span className="text-accent">const</span> elijah = {"{"}
        </p>
        <p className="pl-4">
          role: <span className="text-code-string">&apos;Full-Stack Builder&apos;</span>,
        </p>
        <p className="pl-4">
          tech: [<span className="text-code-string">&apos;Next.js&apos;</span>, <span className="text-code-string">&apos;React&apos;</span>, <span className="text-code-string">&apos;Tailwind&apos;</span>],
        </p>
        <p className="pl-4">
          status: <span className="text-code-string">&apos;Available for work&apos;</span>,
        </p>
        <p className="pl-4">
          experience: [<span className="text-code-string">&apos;Web Dev&apos;</span>, <span className="text-code-string">&apos;IoT&apos;</span>, <span className="text-code-string">&apos;Data Science&apos;</span>]
        </p>
        <p>{"};"}</p>
      </div>
    </section>
  );
}
