import React from "react";
import { TRUST } from "../constants/home";
import { Reveal } from "./Reveal";

// Placeholder wordmarks; each gets a small geometric glyph so the row reads like a logo strip.
const GLYPHS = [
  <circle key="c" cx="10" cy="10" r="8" />,
  <rect key="r" x="2" y="2" width="16" height="16" rx="4" />,
  <path key="t" d="M10 2 18 18H2Z" />,
  <path key="d" d="M10 1 19 10 10 19 1 10Z" />,
];

const Wordmark = ({ name, i }) => (
  <span className="flex shrink-0 items-center gap-2.5 px-8 text-ink/45 transition-colors duration-300 hover:text-ink sm:px-12">
    <svg viewBox="0 0 20 20" className="size-5 fill-current" aria-hidden="true">
      {GLYPHS[i % GLYPHS.length]}
    </svg>
    <span className="font-display text-xl font-extrabold tracking-tight">{name}</span>
  </span>
);

export const TrustMarquee = () => (
  <section className="py-16 sm:py-20">
    <Reveal as="p" className="mx-auto max-w-md px-6 text-center text-[15px] text-ink-soft">
      {TRUST.line}
    </Reveal>
    <Reveal delay={150} className="marquee-mask mt-9 overflow-hidden">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {[...TRUST.logos, ...TRUST.logos].map((name, i) => (
          <Wordmark key={`${name}-${i}`} name={name} i={i} />
        ))}
      </div>
    </Reveal>
  </section>
);
