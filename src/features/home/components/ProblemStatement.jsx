import React, { useRef } from "react";
import { PROBLEM } from "../constants/home";
import { useScrollProgress } from "../hooks/useScrollProgress";
import { Reveal } from "./Reveal";

const WORDS = PROBLEM.statement.split(" ");

/** Big statement whose words light up one by one as you scroll through it. */
export const ProblemStatement = () => {
  const ref = useRef(null);
  useScrollProgress(ref, { mode: "enter" });

  return (
    <section className="relative overflow-hidden px-6 py-24 sm:py-36">
      {/* faint dot texture */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--color-hero)_1.6px,transparent_1.6px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_55%_60%_at_50%_50%,#000,transparent)]" />

      <div className="relative mx-auto max-w-4xl text-center">
        <Reveal as="p" className="font-label text-xs uppercase tracking-[0.2em] text-ink-soft">
          {PROBLEM.eyebrow}
        </Reveal>
        <h2
          ref={ref}
          style={{ "--n": WORDS.length }}
          className="mt-6 font-display text-[36px] font-extrabold leading-[1.08] tracking-[-0.04em] text-ink sm:text-6xl"
        >
          {WORDS.map((word, i) => (
            <span key={`${word}-${i}`} className="scrub-word" style={{ "--i": i }}>
              {word}{" "}
            </span>
          ))}
        </h2>
        <Reveal as="p" delay={100} className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl">
          {PROBLEM.body}
        </Reveal>
      </div>
    </section>
  );
};
