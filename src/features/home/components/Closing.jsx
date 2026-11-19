import React, { useRef } from "react";
import { CLOSING } from "../constants/home";
import { hillDots } from "../utils/halftone";
import { useScrollProgress } from "../hooks/useScrollProgress";
import { CtaButton } from "./CtaButton";
import { Reveal } from "./Reveal";

// Three dotted hill layers, back to front. Each moves at its own speed for depth.
const LAYERS = [
  { dots: hillDots({ crest: 150, amp: 60, waves: 1.1, phase: 0.6, maxRadius: 8, step: 22 }), shift: 40, opacity: 0.35 },
  { dots: hillDots({ crest: 220, amp: 55, waves: 1.6, phase: 2.2, maxRadius: 10, step: 24 }), shift: 90, opacity: 0.6 },
  { dots: hillDots({ crest: 300, amp: 40, waves: 0.9, phase: 4.1, maxRadius: 12, step: 26 }), shift: 150, opacity: 1 },
];

export const Closing = () => {
  const ref = useRef(null);
  useScrollProgress(ref);

  return (
    <section id="signup" ref={ref} className="px-2.5 pb-2.5">
      <div className="relative overflow-hidden rounded-[28px] bg-hero px-6 pb-[300px] pt-28 text-center sm:pb-[380px] sm:pt-36">
        {/* glow + sun rising from behind the hills */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 bg-[radial-gradient(ellipse_55%_60%_at_50%_100%,rgba(11,79,255,0.16),transparent_70%)]" />
        <div
          className="pointer-events-none absolute bottom-[90px] left-1/2 size-[260px] -translate-x-1/2 rounded-full shadow-[0_30px_80px_-20px_rgba(35,35,35,0.35)] sm:size-[320px]"
          style={{
            translate: "-50% calc((1 - var(--p, 0)) * 220px)",
            background:
              "radial-gradient(circle at 62% 30%, #fff 0%, rgba(255,255,255,0.8) 8%, transparent 26%), radial-gradient(circle at 50% 38%, #ececef 0%, #bcbcc1 30%, #8f8f95 55%, #76767c 70%, #adadb2 90%, #d2d2d6 100%)",
          }}
        />

        {LAYERS.map(({ dots, shift, opacity }, i) => (
          <svg
            key={i}
            viewBox="0 0 1440 420"
            preserveAspectRatio="xMidYMax slice"
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[420px] w-full"
            style={{ transform: `translateY(calc((1 - var(--p, 0)) * ${shift}px))`, opacity }}
          >
            {i === LAYERS.length - 1 && <rect x="0" y="330" width="1440" height="90" fill="var(--color-hero)" />}
            {dots.map((d) => (
              <circle key={`${d.x}-${d.y}`} cx={d.x} cy={d.y} r={d.r} fill={i === 2 ? "var(--color-ink)" : "var(--color-ink-soft)"} />
            ))}
          </svg>
        ))}

        <div className="relative mx-auto max-w-3xl">
          <Reveal as="h2" className="font-display text-[40px] font-extrabold leading-[1.02] tracking-[-0.045em] text-ink sm:text-7xl">
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
      </div>
    </section>
  );
};
