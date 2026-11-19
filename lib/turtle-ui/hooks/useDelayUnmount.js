import { useEffect, useState } from "react";

/** Keeps a component rendered for `delay` ms after `isMounted` turns false (for exit animations). */
export const useDelayUnmount = (isMounted, delay = 300) => {
  const [shouldRender, setShouldRender] = useState(isMounted);

  // Mount right away: adjusting state during render avoids an extra effect-driven render.
  if (isMounted && !shouldRender) setShouldRender(true);

  // Unmount only after the delay.
  useEffect(() => {
    if (isMounted || !shouldRender) return;
    const timeoutId = setTimeout(() => setShouldRender(false), delay);
    return () => clearTimeout(timeoutId);
  }, [delay, isMounted, shouldRender]);

  return shouldRender;
};
