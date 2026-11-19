import React, { useRef, useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@lib/cn";
import { SHOWCASE } from "../constants/home";
import { useScrollProgress } from "../hooks/useScrollProgress";
import { MOCKS } from "./mockRegistry";
import { Reveal } from "./Reveal";

const Copy = ({ item }) => (
  <>
    <p className="flex items-center gap-2 font-mono text-sm text-ink-soft">
      <span className="size-2 rounded-full bg-dot ring-4 ring-dot/30" />
      {item.number} · {item.label}
    </p>
    <h3 className="mt-4 font-display text-[34px] font-extrabold leading-[1.05] tracking-[-0.04em] text-ink sm:text-5xl">
      {item.title}
    </h3>
    <p className="mt-5 text-lg leading-relaxed text-ink-soft">{item.body}</p>
    <ul className="mt-6 space-y-2.5">
      {item.points.map((pt) => (
        <li key={pt} className="flex items-center gap-3 text-[16px] text-ink">
          <span className="grid size-5 place-items-center rounded-full bg-ink text-white">
            <Check className="size-3" strokeWidth={3} />
          </span>
          {pt}
        </li>
      ))}
    </ul>
  </>
);

/**
 * Pinned showcase (lg+): the section is 4 screens tall and its content sticks to the viewport
 * while copy and mockup swap per quarter of scroll. Below lg it falls back to stacked blocks.
 */
export const Showcase = () => {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  useScrollProgress(ref, {
    mode: "pin",
    onProgress: (p) => setActive(Math.min(SHOWCASE.length - 1, Math.floor(p * SHOWCASE.length))),
  });

  return (
    <section ref={ref} className="relative bg-white lg:h-[400vh]">
      {/* in-page anchors for the nav links, one per scroll segment */}
      {SHOWCASE.map((item, i) => (
        <span key={item.id} id={item.id} className="absolute left-0" style={{ top: `${i * 25}%` }} />
      ))}

      {/* desktop: pinned */}
      <div className="sticky top-0 hidden h-screen items-center px-8 lg:flex">
        <div className="mx-auto grid w-full max-w-[1240px] grid-cols-[0.85fr_1.15fr] items-center gap-16">
          <div className="flex gap-8">
            {/* progress rail */}
            <div className="relative w-[3px] shrink-0 rounded-full bg-hero">
              <div
                className="absolute inset-x-0 top-0 h-full origin-top rounded-full bg-ink"
                style={{ transform: "scaleY(var(--p, 0))" }}
              />
            </div>
            <div className="grid">
              {SHOWCASE.map((item, i) => (
                <div
                  key={item.id}
                  aria-hidden={active !== i}
                  className={cn(
                    "col-start-1 row-start-1 transition-all duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)]",
                    active === i ? "translate-y-0 opacity-100" : cn("pointer-events-none opacity-0", i < active ? "-translate-y-8" : "translate-y-8"),
                  )}
                >
                  <Copy item={item} />
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[520px]">
            <div className="absolute -inset-8 rounded-[40px] bg-hero" />
            <div className="pointer-events-none absolute -inset-8 rounded-[40px] bg-[radial-gradient(var(--color-dot)_2px,transparent_2.5px)] opacity-60 [background-size:24px_24px] [mask-image:linear-gradient(135deg,transparent_45%,#000)]" />
            {SHOWCASE.map((item, i) => {
              const Mock = MOCKS[item.id];
              return (
                <div
                  key={item.id}
                  aria-hidden={active !== i}
                  className={cn(
                    "absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)]",
                    active === i
                      ? "translate-y-0 scale-100 opacity-100"
                      : cn("pointer-events-none opacity-0", i < active ? "-translate-y-10 scale-95" : "translate-y-16 scale-95"),
                  )}
                >
                  {active === i && <Mock />}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* mobile / tablet: stacked */}
      <div className="space-y-24 px-4 pb-24 sm:px-8 lg:hidden">
        {SHOWCASE.map((item) => {
          const Mock = MOCKS[item.id];
          return (
            <div key={item.id} className="mx-auto max-w-2xl">
              <Reveal>
                <Copy item={item} />
              </Reveal>
              <Reveal delay={120} className="mt-10 h-[430px] rounded-[30px] bg-hero p-3">
                <Mock />
              </Reveal>
            </div>
          );
        })}
      </div>
    </section>
  );
};
