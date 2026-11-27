import React from "react";
import { CLOSING } from "../constants/home";
import { CtaButton } from "./CtaButton";
import { Reveal } from "./Reveal";

export const Closing = () => {
  return (
    <section id="signup" className="px-2.5 pb-2.5">
      <div className="overflow-hidden rounded-[28px] bg-paper text-center">
        <div className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
          <Reveal as="h2" className="font-display text-[40px] font-extrabold leading-[1.02] tracking-[-0.03em] text-ink sm:text-7xl">
            {CLOSING.title}
          </Reveal>
          <Reveal as="p" delay={100} className="mx-auto mt-6 max-w-lg text-lg text-ink-soft sm:text-xl">
            {CLOSING.subtitle}
          </Reveal>
          <Reveal delay={200} className="mt-9 flex flex-wrap justify-center gap-3">
            <CtaButton href="/pricing" arrow>
              Start free
            </CtaButton>
            <CtaButton href="/book-demo" tone="glass">
              Book a demo
            </CtaButton>
          </Reveal>
        </div>
        <svg aria-hidden="true" width="100%" height="120" className="block">
          <defs>
            <pattern id="closing-core-field" width="392" height="96" overflow="visible" patternUnits="userSpaceOnUse">
              {[0, 1, 2, 3, 4, 5, 6].map((column) => (
                <g key={column} fill="none" stroke="var(--color-core-on-light)" strokeWidth="10">
                  <circle cx={column * 56 + 14} cy="24" r="13" />
                  <circle cx={column * 56 + 42} cy="72" r="13" />
                </g>
              ))}
              <g fill="var(--color-spark)">
                <circle cx="70" cy="24" r="3.5" />
                <circle cx="266" cy="72" r="3.5" />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#closing-core-field)" />
        </svg>
      </div>
    </section>
  );
};
