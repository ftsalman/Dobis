import React, { useLayoutEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@lib/cn";
import { STORY_CARDS } from "../constants/flow";
import { useScrollProgress } from "../hooks/useScrollProgress";
import { Reveal } from "./Reveal";

const PIN_QUERY = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";
const CARDS = STORY_CARDS.cards;

// Placeholder logo glyphs so each card reads like a customer wordmark.
const GLYPHS = [
  <circle key="c" cx="10" cy="10" r="8" />,
  <rect key="r" x="2" y="2" width="16" height="16" rx="4" />,
  <path key="t" d="M10 2 18 18H2Z" />,
  <path key="d" d="M10 1 19 10 10 19 1 10Z" />,
];

const StoryCard = ({ card, index, active }) => (
  <article
    className={cn(
      "flex h-[460px] w-[86vw] max-w-[630px] shrink-0 snap-start flex-col rounded-2xl p-7 transition-colors duration-500 sm:w-[600px] sm:p-8 lg:h-[min(490px,56vh)] lg:w-[630px]",
      active ? "bg-flow text-canvas" : "bg-card text-ink",
    )}
  >
    <div className="grid gap-5 sm:grid-cols-2 sm:gap-8">
      <span className="flex items-center gap-2.5">
        <svg viewBox="0 0 20 20" className="size-7 fill-current" aria-hidden="true">
          {GLYPHS[index % GLYPHS.length]}
        </svg>
        <span className="font-display text-[28px] font-extrabold tracking-tight">{card.name}</span>
      </span>
      <p className={cn("text-[16px] leading-snug transition-colors duration-500 sm:text-[18px]", active ? "text-canvas/85" : "text-ink/65")}>
        {card.about}
      </p>
    </div>
    <div className="mt-auto flex items-end justify-between gap-4">
      <div>
        <p className="text-[clamp(64px,8vw,124px)] font-medium leading-[0.9] tracking-[-0.055em]">{card.metric}</p>
        <p className="mt-2 text-xl tracking-[-0.02em] sm:text-2xl">{card.label}</p>
      </div>
      <a
        href="#stories"
        aria-label={`Read the ${card.name} story`}
        className={cn(
          "grid size-11 shrink-0 place-items-center rounded-full transition-colors duration-500",
          active ? "bg-card text-flow" : "bg-ink/5 text-ink hover:bg-ink/10",
        )}
      >
        <ArrowUpRight className="size-5" />
      </a>
    </div>
  </article>
);

/**
 * Customer stories as big metric cards. On large screens the section pins and vertical scroll
 * slides the row sideways; the card at the current position turns blue. Below lg (or with
 * reduced motion) it is a swipeable row with scroll snapping.
 */
export const StoriesCarousel = () => {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const pinnedRef = useRef(false);
  const [pinned, setPinned] = useState(false);
  const [distance, setDistance] = useState(0);
  const [active, setActive] = useState(0);

  const pick = (p) => {
    const next = Math.round(p * (CARDS.length - 1));
    setActive((cur) => (cur === next ? cur : next));
  };

  useScrollProgress(sectionRef, {
    mode: "pin",
    onProgress: (p) => {
      if (pinnedRef.current) pick(p);
    },
  });

  useLayoutEffect(() => {
    const mq = window.matchMedia(PIN_QUERY);
    const measure = () => {
      pinnedRef.current = mq.matches;
      setPinned(mq.matches);
      setDistance(Math.max(0, trackRef.current.scrollWidth - viewportRef.current.clientWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(viewportRef.current);
    mq.addEventListener("change", measure);
    return () => {
      ro.disconnect();
      mq.removeEventListener("change", measure);
    };
  }, []);

  // Swipe mode: highlight follows the row's own horizontal scroll.
  const onSwipe = (e) => {
    if (pinned) return;
    const el = e.currentTarget;
    pick(el.scrollLeft / Math.max(1, el.scrollWidth - el.clientWidth));
  };

  return (
    <section
      id="customers"
      ref={sectionRef}
      className="px-2.5 pt-2.5"
      style={pinned ? { height: `calc(100vh + ${distance}px)` } : undefined}
    >
      <div className="h-full overflow-clip rounded-[28px] bg-canvas">
        <div className={cn("flex flex-col justify-center py-20 sm:py-24", pinned && "sticky top-0 h-screen py-0 pt-16")}>
          <div className="mx-auto w-full max-w-[1560px] px-5 sm:px-8 lg:px-[9%]">
            <Reveal as="p" className="text-lg text-ink/55 sm:text-xl">
              {STORY_CARDS.eyebrow}
            </Reveal>
            <Reveal as="h2" delay={80} className="mt-2 text-[clamp(42px,5.4vw,88px)] font-bold leading-[0.98] tracking-[-0.03em] text-ink">
              {STORY_CARDS.title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </Reveal>
          </div>

          <div
            ref={viewportRef}
            onScroll={onSwipe}
            className={cn(
              "mt-12 lg:mt-16",
              pinned ? "overflow-visible" : "snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            )}
          >
            <div
              ref={trackRef}
              className="flex w-max gap-2.5 px-5 sm:px-8 lg:px-[9vw]"
              style={pinned ? { transform: `translateX(calc(var(--p, 0) * ${-distance}px))` } : undefined}
            >
              {CARDS.map((card, i) => (
                <StoryCard key={card.id} card={card} index={i} active={i === active} />
              ))}
            </div>
          </div>

          {/* progress line under the row */}
          <div className="mx-auto mt-10 w-full max-w-[1560px] px-5 sm:px-8 lg:px-[9%]" aria-hidden="true">
            <div className="flex items-center gap-4">
              <span className="font-label text-[13px] tabular-nums text-ink/50">
                {String(active + 1).padStart(2, "0")} / {String(CARDS.length).padStart(2, "0")}
              </span>
              <span className="relative h-[2px] flex-1 bg-line-cool">
                <span
                  className="absolute inset-0 origin-left bg-flow transition-transform duration-500"
                  style={{ transform: pinned ? "scaleX(var(--p, 0))" : `scaleX(${(active + 1) / CARDS.length})` }}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
