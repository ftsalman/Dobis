// Holds the page's Lenis instance so non-link controls (e.g. buttons) can scroll smoothly too.
let instance = null;

export const setSmoothScroller = (lenis) => {
  instance = lenis;
};

/** Scrolls to an in-page target like "#pricing"; falls back to a plain hash change. */
export const scrollToHash = (hash) => {
  const target = hash?.startsWith("#") ? document.querySelector(hash) : null;
  if (!target) {
    window.location.hash = hash;
    return;
  }
  if (instance) instance.scrollTo(target, { offset: -96 });
  else target.scrollIntoView({ behavior: "smooth" });
};

/** Jumps to the top of the page without animation (used on route changes). */
export const scrollToTop = () => {
  if (instance) instance.scrollTo(0, { immediate: true, force: true });
  else window.scrollTo(0, 0);
};
