import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowUp, Check, LoaderCircle, UserRound, Zap } from "lucide-react";
import { cn } from "@lib/cn";
import { FLOW_HERO } from "../constants/flow";
import { CtaButton } from "./CtaButton";
import { Reveal } from "./Reveal";

const TICK_MS = 650; // one beat of the demo loop
const CYCLE = 16; // beats per loop: 6 workflow steps, scoring, outreach, then a pause
const TYPE_MS = 18; // per character of the typed prompt
const LINE_MS = 2600; // how long the blue connector takes to draw on load
const CURVE = 28; // radius of the line's step down

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const easeOut = (t) => 1 - (1 - t) ** 3;
const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Drives the looping demo: typed prompt, then a beat counter (tick) inside numbered cycles. */
const useDemoClock = (sectionRef) => {
  const still = reducedMotion();
  const [typed, setTyped] = useState(still ? FLOW_HERO.prompt.length : 0);
  const [clock, setClock] = useState(still ? { cycle: 0, tick: CYCLE - 1 } : { cycle: 0, tick: -1 });
  const [visible, setVisible] = useState(false);
  const [started, setStarted] = useState(still);

  // The demo sits mid-page, so nothing plays until it is properly in view.
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        setVisible(e.isIntersecting);
        if (e.isIntersecting) setStarted(true);
      },
      { rootMargin: "0px 0px -30% 0px" },
    );
    io.observe(sectionRef.current);
    return () => io.disconnect();
  }, [sectionRef]);

  // Characters come from elapsed time, so slow renders never make the typing drag.
  useEffect(() => {
    if (still || !started) return undefined;
    const start = performance.now() + 450;
    const total = FLOW_HERO.prompt.length;
    const id = setInterval(() => {
      const n = Math.min(total, Math.max(0, Math.floor((performance.now() - start) / TYPE_MS)));
      setTyped(n);
      if (n >= total) clearInterval(id);
    }, 40);
    return () => clearInterval(id);
  }, [still, started]);

  const typingDone = typed >= FLOW_HERO.prompt.length;
  useEffect(() => {
    if (still || !typingDone || !visible) return undefined;
    const id = setInterval(
      () => setClock(({ cycle, tick }) => (tick + 1 >= CYCLE ? { cycle: cycle + 1, tick: 0 } : { cycle, tick: tick + 1 })),
      TICK_MS,
    );
    return () => clearInterval(id);
  }, [still, typingDone, visible]);

  return { typed, started, ...clock };
};

// `wait`: the pill starts as an icon and opens when the drawing line reaches it (data-reached is set by the hero).
const Pill = ({ ref, label, collapse = false, wait = false, className }) => (
  <span
    ref={ref}
    data-reached={wait ? "false" : undefined}
    className={cn(
      "relative z-10 inline-flex h-9 items-center rounded-full bg-flow-pill px-[11px] font-mono text-[13px] uppercase tracking-[0.04em] text-ink transition-[background,box-shadow] duration-500",
      collapse && "flow-collapse",
      className,
    )}
  >
    <Zap className="flow-pill-icon size-3.5 shrink-0 fill-current text-flow transition-colors duration-500" strokeWidth={0} />
    <span className="flow-pill-label ml-2">{label}</span>
  </span>
);

const AskCard = ({ ref, typed, className }) => {
  const text = FLOW_HERO.prompt.slice(0, typed);
  const typing = typed < FLOW_HERO.prompt.length;
  return (
    <div ref={ref} className={cn("relative", className)}>
      {/* soft halo the card floats on */}
      <div className="pointer-events-none absolute -inset-x-24 -bottom-40 top-10 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(35,35,35,0.09),transparent)]" />
      <div className="flow-fade rounded-xl bg-card p-5 shadow-[0_24px_60px_-28px_rgba(35,35,35,0.35)]">
        <p className="min-h-[106px] text-[19px] leading-[1.35] text-ink" aria-label={FLOW_HERO.prompt}>
          <span aria-hidden="true">{text}</span>
          {typing && <span className="ml-0.5 inline-block h-5 w-[2px] translate-y-1 animate-blink bg-flow" aria-hidden="true" />}
        </p>
        <div className="mt-2 flex justify-end">
          <span
            className={cn(
              "grid size-8 place-items-center rounded-md text-canvas transition-colors duration-300",
              typing ? "bg-flow/40" : "bg-flow",
            )}
          >
            <ArrowUp className="size-4" strokeWidth={2.5} />
          </span>
        </div>
      </div>
    </div>
  );
};

const Checklist = ({ done, running, className }) => (
  <ul className={cn("flow-fade space-y-2.5", className)}>
    {FLOW_HERO.steps.map((step, i) => {
      const isDone = i < done;
      const isActive = running && i === done;
      return (
        <li
          key={step}
          className={cn(
            "flex w-fit items-center gap-2 rounded-full border px-2.5 py-[5px] font-mono text-[12.5px] uppercase tracking-[0.04em] transition-colors duration-500",
            isDone ? "border-flow/25 text-ink" : "border-line text-ink/30",
          )}
        >
          {isDone ? (
            <Check className="size-3.5 text-flow" strokeWidth={3} />
          ) : (
            <LoaderCircle className={cn("size-3.5", isActive ? "animate-spin text-flow" : "text-flow/30")} strokeWidth={2.5} />
          )}
          {step}
        </li>
      );
    })}
  </ul>
);

const Segments = ({ highlight, className }) => (
  <ul className={cn("flow-fade space-y-9", className)}>
    {FLOW_HERO.segments.map((seg, i) => (
      <li
        key={seg}
        className={cn(
          "flex gap-4 font-mono text-[13px] uppercase leading-[1.5] tracking-[0.04em] transition-colors duration-700",
          i === highlight ? "text-ink" : "text-ink/25",
        )}
      >
        <UserRound
          className={cn("mt-0.5 size-3.5 shrink-0 transition-colors duration-700", i === highlight ? "fill-flow text-flow" : "text-ink/25")}
        />
        <span className="max-w-[240px]">{seg}</span>
      </li>
    ))}
  </ul>
);

const VariantCard = ({ shown, index, className }) => (
  <div className={cn("flow-card", className)}>
    <div
      className={cn(
        "relative aspect-[346/440] w-full overflow-hidden rounded-xl bg-dark shadow-[0_30px_60px_-24px_rgba(20,15,30,0.55)] transition-all duration-1000",
        shown ? "scale-100 opacity-100 blur-0" : "scale-[0.97] opacity-0 blur-md",
      )}
    >
      {FLOW_HERO.variants.map((v, i) => (
        <div
          key={v.id}
          className={cn("absolute inset-0 transition-opacity duration-1000", i === index ? "opacity-100" : "opacity-0")}
          style={{ background: v.bg }}
          aria-hidden={i !== index}
        >
          {v.stars && (
            <>
              <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.75)_1px,transparent_1.3px)] [background-size:23px_31px] [mask-image:linear-gradient(#000,transparent_70%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.45)_0.8px,transparent_1px)] [background-position:11px_7px] [background-size:37px_29px] [mask-image:linear-gradient(#000,transparent_65%)]" />
              <span className="absolute left-[38%] top-[48%] h-px w-24 rotate-[8deg] bg-gradient-to-r from-transparent via-white/70 to-transparent" />
            </>
          )}
          {/* ridge silhouette + darkening for legible copy */}
          <svg viewBox="0 0 346 140" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[38%] w-full" aria-hidden="true">
            <path d="M0 70 L40 52 L72 64 L110 30 L150 58 L190 40 L232 66 L270 36 L310 60 L346 48 V140 H0Z" fill="rgba(10,8,14,0.55)" />
          </svg>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <span className="absolute left-5 top-5 rounded-full bg-white/15 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.06em] text-canvas/90 backdrop-blur">
            Dobis {v.tag} · Draft
          </span>
          <div className="absolute inset-x-6 bottom-6 text-canvas">
            <p className="text-[27px] font-medium leading-[1.1] tracking-[-0.03em]">{v.title}</p>
            <p className="mt-3 text-[15px] leading-snug text-canvas/85">{v.body}</p>
            <span className="mt-5 inline-block rounded-md bg-white/15 px-4 py-2.5 text-[16px] font-medium backdrop-blur-md">{v.cta}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

/**
 * Builds the connector path (along the Ask row, a rounded step down, then out to the right edge)
 * and, for each pill, the fraction of the path's length at which the line reaches it.
 */
const buildPath = (root, askPill, askCard, nextPill, pills) => {
  const r = root.getBoundingClientRect();
  const a = askPill.getBoundingClientRect();
  const c = askCard.getBoundingClientRect();
  const n = nextPill.getBoundingClientRect();
  const y1 = a.top + a.height / 2 - r.top;
  const y2 = n.top + n.height / 2 - r.top;
  const x = (c.right + n.left) / 2 - r.left;
  const k = Math.min(CURVE, (y2 - y1) / 2);
  const total = r.width + (y2 - y1);
  const reach = pills.map((el, i) => {
    const b = el.getBoundingClientRect();
    const d = b.left + 14 - r.left; // the line meets the pill's icon
    return Math.min(1, (i === 0 ? d : d + (y2 - y1)) / total);
  });
  const d = `M0 ${y1} H${x - k} Q${x} ${y1} ${x} ${y1 + k} V${y2 - k} Q${x} ${y2} ${x + k} ${y2} H${r.width}`;
  return { d, reach };
};

/** "Ask once, agents do the work across your apps" - a looping demo section. */
export const AgentFlow = () => {
  const sectionRef = useRef(null);
  const diagramRef = useRef(null);
  const askPillRef = useRef(null);
  const askCardRef = useRef(null);
  const nextPillRef = useRef(null);
  const scorePillRef = useRef(null);
  const sendPillRef = useRef(null);
  const reachRef = useRef([]);
  const blueRef = useRef(null);
  const greyRef = useRef(null);
  const [path, setPath] = useState("");
  const { typed, started, cycle, tick } = useDemoClock(sectionRef);

  // Re-measure the connector whenever the layout changes (resize, font swap).
  useLayoutEffect(() => {
    const els = [diagramRef.current, askPillRef.current, askCardRef.current, nextPillRef.current];
    const measure = () => {
      if (diagramRef.current.offsetParent === null) return; // hidden below lg
      const pills = [askPillRef.current, nextPillRef.current, scorePillRef.current, sendPillRef.current];
      const { d, reach } = buildPath(...els, pills);
      reachRef.current = pills.map((el, i) => ({ el, at: reach[i] }));
      setPath(d);
    };
    measure();
    const ro = new ResizeObserver(measure);
    els.forEach((el) => ro.observe(el));
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, []);

  // The blue connector draws itself once the section is in view; pills open as the line reaches them.
  useEffect(() => {
    if (!started) return undefined;
    const start = performance.now();
    const still = reducedMotion();
    let frame = 0;

    const render = () => {
      const intro = still ? 1 : easeOut(clamp01((performance.now() - start - 150) / LINE_MS));
      if (blueRef.current) blueRef.current.style.strokeDasharray = `0 0 ${intro} 2`;
      if (greyRef.current) greyRef.current.style.opacity = String(intro);
      reachRef.current.forEach((pill) => {
        if (pill.el.dataset.reached === "false" && intro >= pill.at) pill.el.dataset.reached = "true";
      });
      frame = intro < 1 ? requestAnimationFrame(render) : 0;
    };

    render();
    return () => cancelAnimationFrame(frame);
  }, [started]);

  const running = tick >= 0;
  const done = Math.max(0, Math.min(tick, FLOW_HERO.steps.length));
  const highlight = tick >= 7 ? cycle % FLOW_HERO.segments.length : -1;
  const variantShown = cycle > 0 || tick >= 9;
  const variant = (tick >= 9 ? cycle : cycle + FLOW_HERO.variants.length - 1) % FLOW_HERO.variants.length;
  const [ask, workflow, scoring, outreach] = FLOW_HERO.stages;

  return (
    <section ref={sectionRef} id="agents" data-collapsed="false" className="scroll-mt-24 px-2.5 pb-24 sm:pb-32">
      <div className="relative overflow-hidden rounded-[28px] bg-canvas">
        {/* ---------- heading ---------- */}
        <div className="relative mx-auto flex max-w-[1560px] flex-col justify-between gap-8 px-5 pb-16 sm:px-8 lg:flex-row lg:items-end lg:px-[9%]">
          <div className="max-w-2xl">
            <Reveal as="p" className="font-mono text-xs uppercase tracking-[0.2em] text-ink/60">
              {FLOW_HERO.copy.eyebrow}
            </Reveal>
            <Reveal as="h2" delay={80} className="mt-5 text-[40px] font-medium leading-[1.02] tracking-[-0.05em] text-ink sm:text-[56px]">
              {FLOW_HERO.copy.title}
            </Reveal>
            <Reveal as="p" delay={160} className="mt-5 text-lg text-ink/70">
              {FLOW_HERO.copy.subtitle}
            </Reveal>
          </div>
          <Reveal delay={200} className="shrink-0">
            <CtaButton href={FLOW_HERO.copy.cta.href} tone="glass" arrow>
              {FLOW_HERO.copy.cta.label}
            </CtaButton>
          </Reveal>
        </div>

        {/* ---------- lg+: connector diagram ---------- */}
        <div ref={diagramRef} className="relative hidden h-[560px] lg:block">
          <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
            <path ref={greyRef} d={path} fill="none" stroke="var(--color-line-cool)" strokeWidth="2" style={{ opacity: 0 }} />
            <path
              ref={blueRef}
              d={path}
              pathLength="1"
              fill="none"
              stroke="var(--color-flow)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ strokeDasharray: "0 0 0 2" }}
            />
          </svg>

          <div className="relative mx-auto grid h-full max-w-[1560px] grid-cols-4 gap-x-12 px-[9%]">
            <div>
              <Pill ref={askPillRef} label={ask.label} wait />
              <AskCard ref={askCardRef} typed={typed} className="mt-12 w-full max-w-[290px]" />
            </div>
            <div className="pt-[86px]">
              <Pill ref={nextPillRef} label={workflow.label} collapse wait />
              <Checklist done={done} running={running} className="mt-8" />
            </div>
            <div className="pt-[86px]">
              <Pill ref={scorePillRef} label={scoring.label} collapse wait />
              <Segments highlight={highlight} className="mt-8" />
            </div>
            <div className="pt-[86px]">
              <Pill ref={sendPillRef} label={outreach.label} collapse wait />
              <VariantCard shown={variantShown} index={variant} className="mt-7 w-full max-w-[340px]" />
            </div>
          </div>
        </div>

        {/* ---------- below lg: stacked version with a vertical line ---------- */}
        <div className="px-5 sm:px-8 lg:hidden">
          <Pill label={ask.label} />
          <div className="relative ml-[17px] mt-0 border-l-2 border-flow pb-2 pl-6 pt-5">
            <AskCard typed={typed} className="max-w-[340px]" />
            <div className="mt-8 -ml-[43px]">
              <Pill label={workflow.label} />
            </div>
            <Checklist done={done} running={running} className="mt-5" />
          </div>
        </div>
      </div>
    </section>
  );
};
