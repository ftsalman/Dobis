import { useEffect, useEffectEvent } from "react";

const clamp01 = (v) => Math.min(1, Math.max(0, v));

/**
 * Tracks how far an element has scrolled and writes it to a `--p` CSS variable (0..1)
 * on that element, so CSS can animate from it without React re-renders.
 *
 * mode:
 *  - "through": 0 when the top enters the bottom of the viewport, 1 when the bottom leaves the top.
 *  - "enter":   0 when the top enters, 1 when the top reaches the middle of the viewport.
 *  - "pin":     for a tall section with a sticky child; 0 at its top, 1 when its end reaches the bottom.
 *  - "center":  follows a line at 55% of the viewport; 0 when it meets the top, 1 when it meets the bottom.
 */
export const useScrollProgress = (ref, { mode = "through", onProgress } = {}) => {
  const report = useEffectEvent((p) => onProgress?.(p));

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      let p;
      if (mode === "pin") p = -rect.top / Math.max(1, rect.height - vh);
      else if (mode === "center") p = (vh * 0.55 - rect.top) / Math.max(1, rect.height);
      else if (mode === "enter") p = (vh - rect.top) / (vh * 0.6);
      else p = (vh - rect.top) / (vh + rect.height);
      p = clamp01(p);
      el.style.setProperty("--p", p.toFixed(4));
      report(p);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ref, mode]);
};
