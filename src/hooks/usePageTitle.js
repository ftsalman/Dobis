import { useEffect } from "react";

const DEFAULT_TITLE = "Dobis · All-in-one business software";

/** Sets the browser tab title to "<title> · Dobis" while the page is mounted. */
export const usePageTitle = (title) => {
  useEffect(() => {
    document.title = title ? `${title} · Dobis` : DEFAULT_TITLE;
    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [title]);
};
