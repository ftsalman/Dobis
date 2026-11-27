import React, { useEffect, useRef, useState } from "react";
import { Zap } from "lucide-react";
import { cn } from "@lib/cn";
import { SIGNALS } from "../constants/flow";

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Becomes true (once) when the element is at least `threshold` visible. */
const useInView = (ref, threshold = 0.5) => {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [ref, threshold]);
  return inView;
};

/** Counts from `from` to `to` (ease-out) once `start` turns true. */
const useCountUp = (start, from, to, duration = 2400) => {
  const [value, setValue] = useState(from);
  useEffect(() => {
    if (!start) return undefined;
    const begin = performance.now();
    const span = reducedMotion() ? 1 : duration;
    let frame = 0;
    const step = (now) => {
      const t = Math.min(1, (now - begin) / span);
      setValue(Math.round(from + (to - from) * (1 - (1 - t) ** 4)));
      if (t < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [start, from, to, duration]);
  return value;
};

const Row = ({ signal, action }) => (
  <div className="mx-auto flex h-[46px] w-full max-w-[1560px] items-center gap-4 px-5 sm:gap-5 sm:px-8 lg:px-[9%]">
    <span className="min-w-0 truncate font-label text-[11px] uppercase tracking-[0.06em] text-muted sm:text-[14px]">
      {signal}
    </span>
    <span className="h-px min-w-6 flex-1 bg-white/[0.07]" />
    <span className="inline-flex h-7 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-flow/20 px-2.5 font-label text-[11px] font-medium uppercase tracking-[0.04em] text-canvas sm:h-8 sm:px-3 sm:text-[14px]">
      <Zap className="size-3.5 fill-flow text-flow" strokeWidth={0} />
      {action}
    </span>
  </div>
);

/** Caption whose letters come into focus from the middle outwards. */
const FocusText = ({ text, shown }) => {
  const mid = (text.length - 1) / 2;
  let index = 0; // position of each letter in the whole caption
  return (
    <span aria-label={text}>
      {text.split(" ").map((word, w) => (
        <React.Fragment key={w}>
          {w > 0 && " "}
          <span className="inline-block whitespace-nowrap" aria-hidden="true">
            {[...word].map((ch) => {
              const i = index++;
              return (
                <span
                  key={i}
                  className="inline-block transition-[filter,opacity] duration-700 ease-out"
                  style={{
                    transitionDelay: `${Math.abs(i - mid) * 28}ms`,
                    filter: shown ? "blur(0)" : "blur(14px)",
                    opacity: shown ? 1 : 0.15,
                  }}
                >
                  {ch}
                </span>
              );
            })}
          </span>
        </React.Fragment>
      ))}
    </span>
  );
};

/**
 * Dark ticker: signal -> action rows stream upward behind a big counter that
 * counts up, with its caption sharpening into focus.
 */
export const SignalTicker = () => {
  const centerRef = useRef(null);
  const inView = useInView(centerRef, 0.6);
  const { from, to, unit, label } = SIGNALS.counter;
  const value = useCountUp(inView, from, to);

  return (
    <section className="px-2.5 pt-2.5">
      <div className="relative h-[620px] overflow-hidden rounded-[28px] bg-dark sm:h-[740px]">
        <div className="absolute inset-0 [mask-image:linear-gradient(transparent,#000_14%,#000_86%,transparent)]" aria-hidden="true">
          <div className="flex animate-ticker-up flex-col">
            {[...SIGNALS.rows, ...SIGNALS.rows].map(([signal, action], i) => (
              <Row key={`${signal}-${i}`} signal={signal} action={action} />
            ))}
          </div>
        </div>

        {/* dark pool so the number reads over the rows */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_28%_at_50%_50%,rgba(15,27,76,0.97)_40%,rgba(15,27,76,0.7)_65%,transparent_90%)] sm:bg-[radial-gradient(ellipse_52%_38%_at_50%_50%,rgba(15,27,76,1)_45%,rgba(15,27,76,0.8)_65%,transparent_88%)]" />

        <div ref={centerRef} className="absolute inset-0 grid place-items-center px-5 text-center">
          <div>
            <p className={cn("text-[clamp(64px,11vw,176px)] font-medium leading-[0.9] tracking-[-0.055em] text-flow tabular-nums")}>
              {value} {unit}
            </p>
            <p className="mt-4 text-[clamp(28px,4.2vw,66px)] font-medium leading-[1.05] tracking-[-0.045em] text-canvas">
              <FocusText text={label} shown={inView} />
            </p>
          </div>
        </div>

        <p className="sr-only">
          Example signals and actions: {SIGNALS.rows.map(([s, a]) => `${s} triggers ${a}`).join("; ")}.
        </p>
      </div>
    </section>
  );
};
