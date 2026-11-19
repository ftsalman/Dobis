import { useEffect, useRef } from "react";

/** Like useEffect, but skips the first run (on mount). */
export const useEffectAfterMount = (fn = () => {}, deps = []) => {
  const isMounted = useRef(false);
  const fnRef = useRef(fn);

  // Always call the latest `fn` without making it a dependency.
  useEffect(() => {
    fnRef.current = fn;
  });

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    fnRef.current();
    // Generic hook: the caller owns the dependency list.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
