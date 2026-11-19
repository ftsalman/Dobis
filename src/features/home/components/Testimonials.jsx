import React, { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import { cn } from "@lib/cn";
import { TESTIMONIALS, TESTIMONIALS_COPY, TESTIMONIAL_FILTERS } from "../constants/testimonials";
import { Reveal } from "./Reveal";

const FEATURED = TESTIMONIALS.filter((t) => t.featured);
const ROTATE_MS = 7000;
const PAGE = 6;

const Stars = ({ rating, className }) => (
  <span className={cn("flex gap-0.5", className)} role="img" aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={cn("size-4", i < rating ? "fill-current" : "opacity-25")} strokeWidth={0} />
    ))}
  </span>
);

const Avatar = ({ name, className }) => (
  <span className={cn("grid size-11 shrink-0 place-items-center rounded-full text-[14px] font-semibold", className)} aria-hidden="true">
    {name
      .split(" ")
      .map((p) => p[0])
      .join("")
      .slice(0, 2)}
  </span>
);

/** Large rotating quote. Auto-advances with a progress bar; pauses on hover/focus; arrow keys step. */
const FeaturedQuote = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  // With reduced motion the global CSS shortens animations to ~0ms, so auto-advance must be off.
  const [still] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const item = FEATURED[index];
  const step = (d) => setIndex((i) => (i + d + FEATURED.length) % FEATURED.length);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured customer quotes"
      tabIndex={0}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") step(1);
        if (e.key === "ArrowLeft") step(-1);
      }}
      className="grid overflow-hidden rounded-[28px] bg-dark text-canvas outline-none focus-visible:ring-4 focus-visible:ring-flow/40 lg:grid-cols-[1.6fr_1fr]"
    >
      <div className="relative p-7 sm:p-12">
        <Quote className="size-10 fill-flow text-flow" strokeWidth={0} aria-hidden="true" />
        <div key={item.id} className="animate-stage-in" aria-live="polite">
          <blockquote className="mt-6 text-[24px] font-medium leading-[1.25] tracking-[-0.03em] sm:text-[34px]">
            “{item.quote}”
          </blockquote>
          <div className="mt-8 flex items-center gap-4">
            <Avatar name={item.name} className="bg-flow text-canvas" />
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-[15px] text-muted">
                {item.role}, {item.company}
              </p>
            </div>
            <span className="ml-auto hidden rounded-full bg-canvas/10 px-3 py-1 font-mono text-[12px] uppercase tracking-[0.06em] sm:inline">
              Dobis {item.app}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-10 border-t border-canvas/10 bg-canvas/[0.04] p-7 sm:p-12 lg:border-l lg:border-t-0">
        <div key={`${item.id}-m`} className="animate-stage-in">
          <p className="text-[64px] font-medium leading-none tracking-[-0.05em] text-flow sm:text-[84px]">{item.metric.value}</p>
          <p className="mt-3 max-w-[16rem] text-lg text-canvas/85">{item.metric.label}</p>
        </div>

        <div>
          <div className="flex gap-1.5" role="tablist" aria-label="Choose a quote">
            {FEATURED.map((t, i) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Quote from ${t.name}`}
                onClick={() => setIndex(i)}
                className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-canvas/15"
              >
                {i < index && <span className="absolute inset-0 bg-canvas/60" />}
                {i === index && still && <span className="absolute inset-0 bg-flow" />}
                {i === index && !still && (
                  <span
                    key={`${t.id}-bar`}
                    onAnimationEnd={() => step(1)}
                    className="absolute inset-0 origin-left animate-progress bg-flow"
                    style={{ animationDuration: `${ROTATE_MS}ms`, animationPlayState: paused ? "paused" : "running" }}
                  />
                )}
              </button>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between">
            <span className="font-mono text-[13px] tabular-nums text-muted">
              {String(index + 1).padStart(2, "0")} / {String(FEATURED.length).padStart(2, "0")}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous quote"
                className="grid size-11 place-items-center rounded-full bg-canvas/10 transition-colors hover:bg-canvas/20"
              >
                <ArrowLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next quote"
                className="grid size-11 place-items-center rounded-full bg-flow transition-colors hover:bg-flow-hover"
              >
                <ArrowRight className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/** Filterable wall of every quote, with "show more". */
const QuoteWall = () => {
  const [filter, setFilter] = useState("All");
  const [visible, setVisible] = useState(PAGE);
  const list = useMemo(() => (filter === "All" ? TESTIMONIALS : TESTIMONIALS.filter((t) => t.app === filter)), [filter]);
  const shown = list.slice(0, visible);

  return (
    <div className="mt-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter testimonials by app">
          {TESTIMONIAL_FILTERS.map((f) => {
            const count = f === "All" ? TESTIMONIALS.length : TESTIMONIALS.filter((t) => t.app === f).length;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                onClick={() => {
                  setFilter(f);
                  setVisible(PAGE);
                }}
                className={cn(
                  "flex items-center gap-2 rounded-full px-4 py-2 text-[15px] font-medium transition-colors",
                  filter === f ? "bg-ink text-canvas" : "bg-card text-ink ring-1 ring-line hover:bg-line",
                )}
              >
                {f}
                <span className={cn("font-mono text-[12px]", filter === f ? "text-canvas/60" : "text-ink/40")}>{count}</span>
              </button>
            );
          })}
        </div>
        <p className="text-[15px] text-ink-soft" aria-live="polite">
          Showing {shown.length} of {list.length}
        </p>
      </div>

      <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {shown.map((t) => (
          <figure key={t.id} className="mb-4 animate-stage-in break-inside-avoid rounded-[22px] bg-card p-6 ring-1 ring-line">
            <div className="flex items-center justify-between">
              <Stars rating={t.rating} className="text-flow" />
              <span className="rounded-full bg-flow/10 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.06em] text-flow">{t.app}</span>
            </div>
            <blockquote className="mt-4 text-[17px] leading-relaxed text-ink">“{t.quote}”</blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <Avatar name={t.name} className="size-10 bg-line text-ink" />
              <span>
                <span className="block text-[15px] font-semibold text-ink">{t.name}</span>
                <span className="block text-[14px] text-ink-soft">
                  {t.role}, {t.company}
                </span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      {visible < list.length && (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE)}
            className="rounded-full bg-card px-6 py-3 text-[15px] font-semibold text-ink ring-1 ring-line transition-colors hover:bg-line"
          >
            Show more reviews
          </button>
        </div>
      )}
    </div>
  );
};

export const Testimonials = () => (
  <section id="testimonials" className="scroll-mt-24 px-4 py-24 sm:px-8 sm:py-32">
    <div className="mx-auto max-w-[1240px]">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <div>
          <Reveal as="p" className="font-mono text-xs uppercase tracking-[0.2em] text-ink/60">
            {TESTIMONIALS_COPY.eyebrow}
          </Reveal>
          <Reveal as="h2" delay={80} className="mt-5 max-w-2xl text-[40px] font-medium leading-[1.02] tracking-[-0.05em] text-ink sm:text-[64px]">
            {TESTIMONIALS_COPY.title}
          </Reveal>
        </div>
        <Reveal delay={160} className="flex items-center gap-4 rounded-2xl bg-card px-5 py-4 ring-1 ring-line">
          <span className="text-[44px] font-medium leading-none tracking-[-0.04em] text-ink">{TESTIMONIALS_COPY.rating.score}</span>
          <span>
            <Stars rating={5} className="text-flow" />
            <span className="mt-1 block text-[14px] text-ink-soft">
              {TESTIMONIALS_COPY.rating.count} {TESTIMONIALS_COPY.rating.label}
            </span>
          </span>
        </Reveal>
      </div>

      <Reveal delay={120} className="mt-12">
        <FeaturedQuote />
      </Reveal>
      <QuoteWall />
    </div>
  </section>
);
