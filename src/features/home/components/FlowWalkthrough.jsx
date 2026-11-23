import React, { useLayoutEffect, useRef } from "react";
import { Check, Scan, Sparkles } from "lucide-react";
import { cn } from "@lib/cn";
import { WALKTHROUGH } from "../constants/flow";
import { PipelineMock } from "./Mockups";
import { BooksMock, InventoryMock, PeopleMock } from "./SuiteMocks";
import { CtaButton } from "./CtaButton";
import { Reveal } from "./Reveal";

const ROW_MOCKS = { crm: PipelineMock, books: BooksMock, inventory: InventoryMock, people: PeopleMock };
const TRANSITIONS = ["Connecting your workspace", "Creating the invoice", "Reserving the stock", "Assigning the team"];
const clamp = (value) => Math.min(1, Math.max(0, value));

/** Measure the actual pills, so the connector follows wrapping text and font changes. */
const useWalkthroughPath = (rootRef) => {
  useLayoutEffect(() => {
    const root = rootRef.current;
    const svg = root.querySelector("[data-flow-paths]");
    const nodes = [...root.querySelectorAll("[data-flow-node]")];
    const rows = [...root.querySelectorAll("[data-flow-row]")];
    const labels = [...root.querySelectorAll("[data-flow-label]")];
    const bluePaths = [...svg.querySelectorAll("[data-flow-fill]")];
    const tracks = [...svg.querySelectorAll("[data-flow-track]")];
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let segments = [];
    let frame = 0;
    let disposed = false;

    const render = () => {
      frame = 0;
      const front = window.innerHeight * 0.6 - root.getBoundingClientRect().top;
      segments.forEach(({ start, end }, index) => {
        const progress = motion.matches ? 1 : clamp((front - start) / Math.max(1, end - start));
        bluePaths[index].style.strokeDashoffset = String(1 - progress);
      });
    };

    const measure = () => {
      if (disposed) return;
      const bounds = root.getBoundingClientRect();
      const desktop = window.matchMedia("(min-width: 1024px)").matches;
      const boxes = nodes.map((node) => {
        const rect = node.getBoundingClientRect();
        return { x: rect.left + rect.width / 2 - bounds.left, y: rect.top + rect.height / 2 - bounds.top };
      });
      const rowBottoms = rows.map((row) => row.getBoundingClientRect().bottom - bounds.top);
      svg.setAttribute("viewBox", `0 0 ${bounds.width} ${bounds.height}`);
      segments = [];

      boxes.slice(1).forEach((end, index) => {
        const start = boxes[index];
        let d;
        let turnY;
        if (desktop && index === 0) {
          d = `M ${start.x} ${start.y} H ${end.x}`;
        } else if (desktop) {
          // Cross in the empty space between rows, never through a preview card.
          const bottom = index === 1 ? start.y : rowBottoms[index - 2];
          turnY = bottom + (end.y - bottom) / 2;
          const direction = Math.sign(end.x - start.x);
          const radius = Math.min(30, Math.abs(end.x - start.x) / 2, (end.y - turnY) / 2, (turnY - start.y) / 2);
          d = `M ${start.x} ${start.y} V ${turnY - radius} Q ${start.x} ${turnY} ${start.x + direction * radius} ${turnY} H ${end.x - direction * radius} Q ${end.x} ${turnY} ${end.x} ${turnY + radius} V ${end.y}`;
        } else {
          // A compact side rail leaves room for stacked content on small screens.
          d = `M ${start.x} ${start.y} H 1 V ${end.y} H ${end.x}`;
        }
        tracks[index].setAttribute("d", d);
        bluePaths[index].setAttribute("d", d);
        segments.push({ start: index === 0 ? start.y - window.innerHeight * 0.35 : start.y, end: end.y });
        if (index > 0 && index <= labels.length) {
          labels[index - 1].style.top = `${desktop ? turnY : end.y - 64}px`;
        }
      });
      render();
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    nodes.forEach((node) => observer.observe(node));
    rows.forEach((row) => observer.observe(row));
    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    motion.addEventListener("change", render);
    return () => {
      disposed = true;
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      motion.removeEventListener("change", render);
    };
  }, [rootRef]);
};

const FlowPill = ({ children, activating = false, as: Tag = "h3" }) => (
  <Tag
    data-flow-node
    className="relative z-10 flex min-h-[60px] w-full items-center justify-center gap-3 rounded-full bg-flow px-5 py-4 text-center text-[17px] font-medium leading-tight tracking-[-0.035em] text-white sm:min-h-[72px] sm:text-[20px]"
  >
    {activating ? <Scan className="size-5 shrink-0" aria-hidden="true" /> : <Sparkles className="size-5 shrink-0" aria-hidden="true" />}
    {children}
  </Tag>
);

const RowCopy = ({ item }) => (
  <div className="relative z-10 text-center">
    <FlowPill>{item.title}</FlowPill>
    <div className="bg-canvas pb-7 pt-6 sm:pt-8">
      <p className="text-[16px] leading-[1.45] text-ink/75 sm:text-[17px]">{item.body}</p>
      <ul className="mt-5 space-y-2.5 text-left">
        {item.points.map((point) => (
          <li key={point} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-ink/65 sm:text-sm">
            <Check className="mt-1 size-3.5 shrink-0 text-flow" strokeWidth={2} aria-hidden="true" />
            {point}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export const FlowWalkthrough = () => {
  const flowRef = useRef(null);
  useWalkthroughPath(flowRef);

  return (
    <section id="walkthrough" aria-labelledby="walkthrough-title" className="overflow-hidden bg-canvas px-6 py-24 sm:px-10 sm:py-32 lg:px-[7vw]">
      <div className="mx-auto max-w-[1540px]">
        <div className="max-w-[1120px]">
          <Reveal as="p" className="font-mono text-xs uppercase tracking-[0.15em] text-ink/60">{WALKTHROUGH.eyebrow}</Reveal>
          <Reveal as="h2" id="walkthrough-title" delay={80} className="mt-5 text-[42px] font-medium leading-[1.05] tracking-[-0.055em] text-ink sm:text-[64px] lg:text-[76px]">
            {WALKTHROUGH.title}
          </Reveal>
          <Reveal as="p" delay={160} className="mt-6 max-w-[1080px] text-xl leading-[1.45] tracking-[-0.025em] text-ink/70 sm:text-[28px]">
            {WALKTHROUGH.subtitle}
          </Reveal>
        </div>

        <div ref={flowRef} className="relative mt-16 pl-6 sm:mt-24 lg:pl-0">
          {/* This SVG is a measured UI connector, not a decorative image. */}
          <svg data-flow-paths className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" fill="none" strokeWidth="2" aria-hidden="true">
            {Array.from({ length: WALKTHROUGH.rows.length + 2 }, (_, index) => (
              <g key={index}>
                <path data-flow-track stroke="var(--color-line)" />
                <path data-flow-fill stroke="var(--color-flow)" pathLength="1" strokeDasharray="1" strokeDashoffset="1" />
              </g>
            ))}
          </svg>

          <div className="relative flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center lg:gap-0">
            <div data-flow-node className="relative z-10 w-full rounded-2xl bg-white px-6 py-6 shadow-[0_18px_22px_-14px_rgba(0,0,0,0.25),0_55px_65px_-25px_rgba(35,35,35,0.3)] lg:w-[31.5%]">
              <p className="text-[18px] leading-[1.2] tracking-[-0.035em] text-ink sm:text-[20px]">{WALKTHROUGH.prompt}</p>
            </div>
            <div className="w-full lg:w-[24%]">
              <FlowPill activating as="p">{WALKTHROUGH.statuses[0]}</FlowPill>
            </div>
          </div>

          {TRANSITIONS.map((label) => (
            <p key={label} data-flow-label className="pointer-events-none absolute left-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-canvas px-5 font-mono text-[12px] uppercase tracking-[-0.025em] text-ink lg:block xl:text-[14px]">{label}</p>
          ))}

          <div className="pt-28 lg:pt-[360px]">
            {WALKTHROUGH.rows.map((item, index) => {
              const Mock = ROW_MOCKS[item.mock];
              const flip = index % 2 === 1;
              return (
                <div key={item.id} id={item.id} data-flow-row className={cn("relative grid scroll-mt-28 items-start gap-10 lg:gap-x-[10%]", index > 0 && "mt-28 lg:mt-[360px]", flip ? "lg:grid-cols-[66%_24%]" : "lg:grid-cols-[24%_66%]")}>
                  <div className={cn(flip && "lg:col-start-2 lg:row-start-1")}>
                    <RowCopy item={item} />
                  </div>
                  <div className={cn("relative z-10 min-w-0", flip && "lg:col-start-1 lg:row-start-1")}>
                    <div
                      role="region"
                      aria-label={`${item.label} preview`}
                      tabIndex={0}
                      className="overflow-x-auto rounded-[22px] bg-[#191919] p-2 shadow-[0_40px_65px_-20px_rgba(35,35,35,0.35)] outline-none focus-visible:ring-2 focus-visible:ring-flow focus-visible:ring-offset-4 sm:rounded-[30px] sm:p-5 [--color-card:#191919] [--color-paper:#303030] [--color-ink:#f0efe3] [--color-ink-soft:#b5b5af] [--color-line:#40403d] [--color-hero:#454540]"
                    >
                      <Mock className="min-h-[420px] min-w-[520px] shadow-none ring-0 sm:min-h-[460px] sm:min-w-0 [&>div:first-child]:border-white/10 [&>div:first-child]:pb-6 [&>div:first-child]:pt-4 [&>div:last-child]:overflow-visible" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="relative pt-40 text-center lg:pt-[330px]">
            <div data-flow-node className="absolute left-1/2 top-28 size-px lg:top-[250px]" aria-hidden="true" />
            <div className="relative z-10 bg-canvas">
              <h2 className="text-[40px] font-medium leading-[1.08] tracking-[-0.055em] text-ink sm:text-[60px] lg:text-[76px]">One workspace. More possibilities.</h2>
              <p className="mx-auto mt-7 max-w-[900px] text-lg leading-relaxed tracking-[-0.025em] text-ink/70 sm:text-[25px]">Let Dobis handle the busywork while you focus on your business.</p>
              <div className="mt-10 flex justify-center">
                <CtaButton href="/book-demo" className="h-[62px] rounded-2xl px-8 text-[19px] font-medium">Request a Demo</CtaButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
