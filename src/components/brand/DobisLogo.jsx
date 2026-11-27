import React from "react";
import { cn } from "@lib/cn";
import { CORE, LETTERS, WORDMARK_VIEWBOX } from "./wordmarkPaths";

/**
 * doBis logo artwork, per the Brand Identity Guidelines v1.0 (section 02, The logo).
 *
 * The wordmark is fixed artwork: never retype "dobis" in a font, recolour it, stretch it,
 * add effects, or drop the spark. Pick the version with the strongest contrast:
 *   primary - navy letters, doBis Blue ring, Spark Orange spark (white / light backgrounds)
 *   onDark  - white letters, light-blue ring, Spark Orange spark (navy / dark photography)
 *   black   - one colour black (single-colour print)
 *   white   - one colour white (single colour on any dark colour)
 * Minimum size: 80 px wide. Below that, use <DobisCore> (the app icon) instead.
 * Clear space: keep other elements at least the ring's height away on every side.
 */

const LOGO_VERSIONS = {
  primary: { letters: "var(--color-navy)", ring: "var(--color-blue)", spark: "var(--color-spark)" },
  onDark: { letters: "#ffffff", ring: "var(--color-blue-on-dark)", spark: "var(--color-spark)" },
  black: { letters: "#111111", ring: "#111111", spark: "#111111" },
  white: { letters: "#ffffff", ring: "#ffffff", spark: "#ffffff" },
};

// A circle path; two of them with fill-rule="evenodd" make the ring, leaving the centre open.
const circle = (cx, cy, r) => `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0Z`;

export const DobisWordmark = ({ version = "primary", productColor, className, title = "doBis" }) => {
  const c = LOGO_VERSIONS[version] ?? LOGO_VERSIONS.primary;
  return (
    <svg
      viewBox={WORDMARK_VIEWBOX}
      className={cn("block h-7 w-auto", className)}
      {...(title ? { role: "img", "aria-label": title } : { "aria-hidden": true })}
    >
      <path d={LETTERS} fill={c.letters} />
      <path d={circle(CORE.cx, CORE.cy, CORE.R) + circle(CORE.cx, CORE.cy, CORE.r)} fill={productColor ?? c.ring} fillRule="evenodd" />
      <circle cx={CORE.cx} cy={CORE.cy} r={CORE.spark} fill={c.spark} />
    </svg>
  );
};

/**
 * The core on its own: the app icon / favicon mark, used where the wordmark is too small.
 * Tile corner radius is 22.5% of the size; the ring is centred and fills 52% of the tile.
 *   classic - doBis Blue tile, white ring
 *   navy    - navy tile, light-blue ring
 *   favicon - navy tile, white ring (the small-size favicon treatment)
 */
const ICON_VERSIONS = {
  classic: { tile: "var(--color-blue)", ring: "#ffffff", spark: "var(--color-spark)" },
  navy: { tile: "var(--color-navy)", ring: "var(--color-blue-on-dark)", spark: "var(--color-spark)" },
  favicon: { tile: "var(--color-navy)", ring: "#ffffff", spark: "var(--color-spark)" },
};

export const DobisCore = ({ version = "classic", className, title = "doBis" }) => {
  const c = ICON_VERSIONS[version] ?? ICON_VERSIONS.classic;
  const R = 26; // 52% of a 100-unit tile
  const r = 12.04;
  const s = 5.54;
  return (
    <svg viewBox="0 0 100 100" className={cn("block size-8", className)} role="img" aria-label={title}>
      <rect width="100" height="100" rx="22.5" fill={c.tile} />
      <path d={circle(50, 50, R) + circle(50, 50, r)} fill={c.ring} fillRule="evenodd" />
      <circle cx="50" cy="50" r={s} fill={c.spark} />
    </svg>
  );
};
