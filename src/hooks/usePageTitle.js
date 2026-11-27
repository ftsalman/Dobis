import { useEffect } from "react";

const DEFAULT_TITLE = "doBis · All-in-one business software";

/** Sets the browser tab title to "<title> · doBis" while the page is mounted. */
export const usePageTitle = (title) => {
  useEffect(() => {
    document.title = title ? `${title} · doBis` : DEFAULT_TITLE;
    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [title]);
};
