import React, { useRef, useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@lib/cn";
import { HERO_COPY, HERO_NEWS, HERO_STAGE_DURATION, HERO_STAGES } from "../constants/hero";
import { ringDots, waveDots } from "../utils/halftone";
import { useScrollProgress } from "../hooks/useScrollProgress";
import { CtaButton } from "./CtaButton";
import { MOCKS } from "./mockRegistry";

// Computed once at module load - pure geometry, no need to redo per render.
const RING = ringDots();
const WAVE_LEFT = waveDots({ base: 165, amp: 120 });
const WAVE_RIGHT = waveDots({ base: 150, amp: -90 });

const DotField = ({ dots, width, height, className }) => (
  <svg
    viewBox={`0 0 ${width} ${height}`}
    className={className}
    aria-hidden="true"
  >
    {dots.map((d) => (
      <circle
        key={`${d.x}-${d.y}`}
        cx={d.x}
        cy={d.y}
        r={d.r}
        fill="var(--color-dot)"
        opacity={d.o}
      />
    ))}
  </svg>
);

const ChromeSphere = () => (
  <div className="relative size-[230px] animate-float-slow sm:size-[268px]">
    <div
      className="absolute inset-0 rounded-full shadow-[0_30px_60px_-20px_rgba(15,27,76,0.35)]"
      style={{
        background: [
          // soft yellow floor reflection
          "radial-gradient(ellipse 75% 45% at 50% 82%, rgba(244,247,200,0.95) 0%, rgba(232,236,180,0.6) 45%, transparent 75%)",
          // specular highlight
          "radial-gradient(circle at 62% 34%, #ffffff 0%, rgba(255,255,255,0.85) 7%, transparent 24%)",
          // chrome body
          "radial-gradient(circle at 50% 38%, #e9e9ec 0%, #b9b9be 28%, #8d8d93 52%, #737379 68%, #a9a9ae 88%, #cfcfd3 100%)",
        ].join(","),
      }}
    />
    {/* rim */}
    <div className="absolute inset-0 rounded-full ring-[6px] ring-inset ring-white/25" />
    {/* reflected dots */}
    <svg viewBox="0 0 268 268" className="absolute inset-0" aria-hidden="true">
      {[
        [202, 82, 5],
        [204, 98, 6],
        [168, 118, 6.5],
        [186, 118, 7],
        [205, 118, 7.5],
        [222, 120, 5.5],
        [233, 122, 4],
        [205, 140, 6.5],
        [204, 160, 5],
        [187, 101, 2.5],
      ].map(([cx, cy, r]) => (
        <circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r={r}
          fill="var(--color-dot)"
        />
      ))}
    </svg>
  </div>
);

const SequencePill = () => (
  <div className="absolute left-[11%] top-[560px] hidden animate-float items-center gap-2 rounded-full bg-white/40 py-2 pl-2 pr-4 text-[15px] text-ink-soft/80 backdrop-blur-sm xl:flex">
    <span className="grid size-[22px] place-items-center rounded-full bg-ink-soft/70 text-white">
      <Check className="size-3.5" strokeWidth={3} />
    </span>
    Sequence started
  </div>
);

const AlertCard = () => (
  <div className="absolute right-[9%] top-[512px] hidden animate-float-slow items-center gap-3.5 rounded-2xl bg-white px-4 py-3.5 shadow-[0_10px_40px_-12px_rgba(15,27,76,0.18)] xl:flex">
    <span className="grid size-9 place-items-center rounded-lg bg-[#1a1a1a]">
      <span className="size-4 rotate-45 rounded-[3px] bg-gradient-to-br from-[#ff6363] to-[#e8243b]" />
    </span>
    <div>
      <p className="text-[16px] font-medium text-ink">
        Northwind deal has no next step
      </p>
      <p className="flex items-center gap-1.5 text-sm text-ink-soft">
        <span className="size-1.5 rounded-full bg-orange-500" />
        Pipeline · today
      </p>
    </div>
  </div>
);


/** Tabs that auto-advance; the active tab shows a progress bar that triggers the next tab when it fills. */
const StageTabs = ({ active, onChange, paused }) => (
  <div
    role="tablist"
    aria-label="Product areas"
    className="relative z-10 mx-auto flex w-fit max-w-full overflow-x-auto rounded-2xl bg-white/45 p-1.5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.6)] backdrop-blur-md"
  >
    {HERO_STAGES.map((stage, i) => (
      <button
        key={stage.id}
        role="tab"
        type="button"
        aria-selected={active === i}
        onClick={() => onChange(i)}
        className={cn(
          "relative flex shrink-0 items-baseline gap-2 overflow-hidden rounded-xl px-4 py-2.5 text-[16px] transition-all duration-300 sm:px-7",
          active === i ? "bg-white text-ink shadow-sm" : "text-ink-soft/70 hover:text-ink",
        )}
      >
        <span className="font-label text-[13px] opacity-60">{stage.number}</span>
        {stage.label}
        {active === i && (
          <span
            key={`${stage.id}-bar`}
            onAnimationEnd={() => onChange((i + 1) % HERO_STAGES.length)}
            className="absolute inset-x-3 bottom-1 h-[2px] origin-left animate-progress rounded-full bg-ink/70"
            style={{ animationDuration: `${HERO_STAGE_DURATION}ms`, animationPlayState: paused ? "paused" : "running" }}
          />
        )}
      </button>
    ))}
  </div>
);

/** Large product preview; tilts back and straightens as it scrolls into view. */
const StagePreview = ({ active, onHover }) => {
  const ref = useRef(null);
  useScrollProgress(ref, { mode: "enter" });
  const Mock = MOCKS[HERO_STAGES[active].id];

  return (
    <div ref={ref} className="mx-auto mt-6 w-full max-w-[1180px] [perspective:1600px]">
      <div
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
        className="origin-bottom rounded-t-[34px] bg-white/45 p-2.5 pb-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.7)] backdrop-blur-md will-change-transform sm:p-3 sm:pb-0"
        style={{
          transform:
            "rotateX(calc((1 - var(--p, 1)) * 18deg)) scale(calc(0.9 + var(--p, 1) * 0.1)) translateY(calc((1 - var(--p, 1)) * 40px))",
        }}
      >
        <div className="h-[430px] sm:h-[470px]">
          <Mock key={active} className="animate-stage-in rounded-b-none" />
        </div>
      </div>
    </div>
  );
};

export const Hero = () => {
  const [stage, setStage] = useState(0);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef(null);
  useScrollProgress(sectionRef);

  return (
    <section ref={sectionRef} className="px-2.5 pt-2.5">
      <div className="relative overflow-hidden rounded-[28px] bg-hero px-4 pt-[106px] sm:px-8">
        {/* side waves drift up at different speeds as the page scrolls */}
        <div className="pointer-events-none absolute inset-0" style={{ transform: "translateY(calc(var(--p, 0) * -160px))" }}>
          <DotField
            dots={WAVE_LEFT}
            width={330}
            height={900}
            className="absolute -left-2 top-10 hidden h-[900px] w-[330px] md:block"
          />
        </div>
        <div className="pointer-events-none absolute inset-0" style={{ transform: "translateY(calc(var(--p, 0) * -90px))" }}>
          <DotField
            dots={WAVE_RIGHT}
            width={330}
            height={900}
            className="absolute -right-2 top-10 hidden h-[900px] w-[330px] md:block"
          />
        </div>
        {/* warm glow behind the sphere */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-[radial-gradient(ellipse_60%_70%_at_50%_100%,rgba(240,243,170,0.7),transparent_70%)]" />

        <SequencePill />
        <AlertCard />

        <div className="relative flex flex-col items-center text-center">
          <a
            href={HERO_NEWS.href}
            className="flex animate-rise items-center gap-2.5 rounded-full bg-white p-1 pr-4 text-[13px] text-ink shadow-[0_0_0_3px_rgba(255,255,255,0.5)] transition-transform hover:-translate-y-0.5 sm:text-[15px]"
          >
            <span className="rounded-full bg-gradient-to-br from-white via-[#d7d7db] to-[#a9a9ae] px-2.5 py-1 font-semibold shadow-inner">
              {HERO_NEWS.tag}
            </span>
            {HERO_NEWS.text}
          </a>

          <h1 className="mt-7 font-display text-[44px] font-extrabold leading-[1.02] tracking-[-0.045em] text-ink sm:text-6xl lg:text-[76px]">
            {HERO_COPY.title.map((line, i) => (
              <span key={line} className="block animate-rise" style={{ animationDelay: `${120 + i * 110}ms` }}>
                {line}
              </span>
            ))}
          </h1>

          <p
            className="mt-6 max-w-xl animate-rise text-lg leading-[1.65] text-ink-soft sm:text-[21px]"
            style={{ animationDelay: "360ms" }}
          >
            {HERO_COPY.subtitle}
          </p>

          <div className="mt-8 flex animate-rise flex-wrap justify-center gap-3" style={{ animationDelay: "480ms" }}>
            <CtaButton href={HERO_COPY.primary.href} arrow>
              {HERO_COPY.primary.label}
            </CtaButton>
            <CtaButton href={HERO_COPY.secondary.href} tone="glass">
              {HERO_COPY.secondary.label}
            </CtaButton>
          </div>

          {/* sphere + dot ring, sinking slowly on scroll */}
          <div
            className="relative mt-2 grid h-[380px] w-full animate-rise place-items-center sm:h-[400px]"
            style={{ animationDelay: "600ms" }}
          >
            <div className="absolute inset-0 grid place-items-center" style={{ transform: "translateY(calc(var(--p, 0) * 140px))" }}>
              <DotField
                dots={RING}
                width={460}
                height={460}
                className="pointer-events-none absolute left-1/2 top-1/2 size-[400px] -translate-x-1/2 -translate-y-[46%] sm:size-[460px]"
              />
              <ChromeSphere />
            </div>
          </div>
        </div>

        <div className="relative -mt-6">
          <StageTabs active={stage} onChange={setStage} paused={paused} />
          <StagePreview active={stage} onHover={setPaused} />
        </div>
      </div>
    </section>
  );
};
