import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Check, Zap } from "lucide-react";
import { cn } from "@lib/cn";
import { WALKTHROUGH } from "../constants/flow";
import { useScrollProgress } from "../hooks/useScrollProgress";
import { PipelineMock } from "./Mockups";
import { BooksMock, InventoryMock, PeopleMock } from "./SuiteMocks";

const ROW_MOCKS = { crm: PipelineMock, books: BooksMock, inventory: InventoryMock, people: PeopleMock };
import { Reveal } from "./Reveal";

/** Chat prompt with a cycling agent status; a blue line runs in from the left edge as it scrolls into view. */
const PromptCard = () => {
  const ref = useRef(null);
  const [status, setStatus] = useState(0);
  useScrollProgress(ref, { mode: "enter" });

  useEffect(() => {
    const id = setInterval(() => setStatus((s) => (s + 1) % WALKTHROUGH.statuses.length), 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div ref={ref} className="relative mt-14 flex justify-start lg:justify-center">
      {/* incoming line from the page edge (lg+) */}
      <span
        className="absolute right-1/2 top-1/2 hidden h-[2px] w-[50vw] origin-left bg-flow lg:block"
        style={{ transform: "scaleX(var(--p, 0))" }}
        aria-hidden="true"
      />
      <Reveal className="relative w-full max-w-[460px] rounded-xl bg-card p-5 shadow-[0_24px_60px_-28px_rgba(35,35,35,0.35)]">
        <p className="text-[19px] leading-snug text-ink">{WALKTHROUGH.prompt}</p>
        <p className="mt-5 flex items-center gap-2 font-mono text-[12.5px] uppercase tracking-[0.05em] text-flow">
          <span className="relative flex size-2">
            <span className="absolute inset-0 animate-ping-slow rounded-full bg-flow/60" />
            <span className="relative size-2 rounded-full bg-flow" />
          </span>
          <span key={status} className="animate-stage-in">
            {WALKTHROUGH.statuses[status]}…
          </span>
        </p>
      </Reveal>
    </div>
  );
};

const RowCopy = ({ item }) => (
  <>
    <span className="inline-flex h-8 items-center gap-2 rounded-full bg-flow-pill px-3 font-mono text-[12.5px] uppercase tracking-[0.05em] text-ink">
      <Zap className="size-3.5 fill-flow text-flow" strokeWidth={0} />
      {item.number} · {item.label}
    </span>
    <h3 className="mt-5 text-[34px] font-medium leading-[1.05] tracking-[-0.04em] text-ink sm:text-[46px]">{item.title}</h3>
    <p className="mt-5 max-w-md text-lg leading-relaxed text-ink/70">{item.body}</p>
    <ul className="mt-6 space-y-2.5">
      {item.points.map((pt) => (
        <li key={pt} className="flex items-center gap-3 text-[16px] text-ink">
          <Check className="size-4 text-flow" strokeWidth={3} />
          {pt}
        </li>
      ))}
    </ul>
  </>
);

/**
 * Alternating feature rows threaded on one vertical rail. The rail fills blue as you scroll;
 * each row's node and arm light up once the fill passes it (thresholds measured into --t).
 */
export const FlowWalkthrough = () => {
  const railRef = useRef(null);
  useScrollProgress(railRef, { mode: "center" });

  useLayoutEffect(() => {
    const rail = railRef.current;
    const measure = () => {
      const h = rail.offsetHeight || 1;
      rail.querySelectorAll("[data-row]").forEach((row) => {
        row.style.setProperty("--t", ((row.offsetTop + row.offsetHeight / 2) / h).toFixed(4));
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(rail);
    return () => ro.disconnect();
  }, []);

  return (
    <section className="px-2.5">
      <div className="overflow-hidden rounded-[28px] bg-canvas px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-[1240px]">
          <div className="flex flex-col items-start lg:items-center lg:text-center">
            <Reveal as="p" className="font-mono text-xs uppercase tracking-[0.2em] text-ink/60">
              {WALKTHROUGH.eyebrow}
            </Reveal>
            <Reveal as="h2" delay={80} className="mt-5 text-[44px] font-medium leading-[1] tracking-[-0.05em] text-ink sm:text-[76px]">
              {WALKTHROUGH.title}
            </Reveal>
            <Reveal as="p" delay={160} className="mt-6 max-w-xl text-lg text-ink/70 sm:text-xl">
              {WALKTHROUGH.subtitle}
            </Reveal>
          </div>

          <PromptCard />

          <div ref={railRef} className="relative mt-0 pt-16">
            {/* rail: grey track, blue fill, glowing head */}
            <span className="absolute bottom-0 left-[9px] top-0 w-[2px] bg-line-cool lg:left-1/2 lg:-translate-x-1/2" aria-hidden="true">
              <span className="absolute inset-0 origin-top bg-flow" style={{ transform: "scaleY(var(--p, 0))" }} />
              <span
                className="absolute left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-flow shadow-[0_0_0_6px_rgba(11,79,255,0.15),0_0_24px_rgba(11,79,255,0.6)]"
                style={{ top: "calc(var(--p, 0) * 100%)" }}
              />
            </span>

            {WALKTHROUGH.rows.map((item, i) => {
              const Mock = ROW_MOCKS[item.mock];
              const flip = i % 2 === 1;
              return (
                <div
                  key={item.id}
                  id={item.id}
                  data-row
                  className="relative grid scroll-mt-28 items-center gap-10 py-14 pl-10 lg:grid-cols-2 lg:gap-28 lg:py-20 lg:pl-0"
                >
                  {/* node on the rail */}
                  <span className="absolute left-[10px] top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 lg:left-1/2" aria-hidden="true">
                    <span className="absolute inset-0 rounded-full border-2 border-line-cool bg-canvas" />
                    <span className="rail-on absolute inset-0 grid place-items-center rounded-full bg-flow">
                      <Zap className="size-2.5 fill-canvas text-canvas" strokeWidth={0} />
                    </span>
                  </span>
                  {/* arm from the node to the visual (lg+) */}
                  <span
                    className={cn(
                      "rail-arm absolute top-1/2 hidden h-[2px] w-14 bg-flow lg:block",
                      flip ? "right-1/2 origin-right" : "left-1/2 origin-left",
                    )}
                    aria-hidden="true"
                  />

                  <Reveal className={cn(flip && "lg:order-2")}>
                    <RowCopy item={item} />
                  </Reveal>
                  <Reveal delay={120} className={cn(flip && "lg:order-1")}>
                    <div className="h-[380px] rounded-[22px] bg-white/60 p-2.5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.8),0_30px_60px_-34px_rgba(35,35,35,0.4)] sm:h-[420px]">
                      <Mock className="h-full" />
                    </div>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
