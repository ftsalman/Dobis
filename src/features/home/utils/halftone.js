// Generates halftone dot grids: each grid point gets a radius from an
// intensity function (0..1), so the dots grow toward the "ink" and vanish away from it.

const buildGrid = ({ width, height, step, maxRadius, intensity, opacity }) => {
  const dots = [];
  for (let y = step / 2; y < height; y += step) {
    for (let x = step / 2; x < width; x += step) {
      const t = intensity(x, y);
      const r = maxRadius * t;
      if (r < 2.2) continue;
      dots.push({ x, y, r: Math.round(r * 10) / 10, o: opacity ? opacity(x, y) : 1 });
    }
  }
  return dots;
};

const clamp01 = (v) => Math.max(0, Math.min(1, v));

/** Ring of dots around the central sphere. */
export const ringDots = ({ size = 460, inner = 150, outer = 222, step = 31.5, maxRadius = 14 } = {}) => {
  const c = size / 2;
  const mid = (inner + outer) / 2;
  const half = (outer - inner) / 2;
  return buildGrid({
    width: size,
    height: size,
    step,
    maxRadius,
    intensity: (x, y) => {
      const d = Math.hypot(x - c, y - c);
      return clamp01(1 - Math.abs(d - mid) / half) ** 0.55;
    },
  });
};

/** S-shaped band of dots running down a side of the hero. */
export const waveDots = ({ width = 330, height = 900, step = 31.5, maxRadius = 16, base, amp, band = 85 }) =>
  buildGrid({
    width,
    height,
    step,
    maxRadius,
    intensity: (x, y) => {
      const center = base + amp * Math.cos((2 * Math.PI * (y - 40)) / 820);
      return clamp01(1 - Math.abs(x - center) / band) ** 0.6;
    },
    // Paler toward the top, bright toward the bottom
    opacity: (_x, y) => 0.25 + 0.75 * clamp01((y - 40) / 420),
  });

/**
 * Rolling hill silhouette: dots appear below a sine-shaped crest line and grow with depth.
 * Stack a few with different crests and speeds to get a layered landscape.
 */
export const hillDots = ({ width = 1440, height = 420, step = 26, maxRadius = 11, crest, amp = 50, waves = 1.4, phase = 0 }) =>
  buildGrid({
    width,
    height,
    step,
    maxRadius,
    intensity: (x, y) => {
      const top = crest + amp * Math.sin((x / width) * Math.PI * 2 * waves + phase);
      return clamp01((y - top) / 140) ** 0.7;
    },
  });
