import React from "react";
import { Link, useLocation } from "react-router-dom";
import { scrollToHash } from "@/utils/smoothScroll";

/**
 * One link for every kind of site href:
 *  - "#section" or "/#section": smooth-scrolls when already on the homepage, otherwise routes to "/#section"
 *    (the homepage then scrolls to it on arrival).
 *  - "/pricing", "/contact?topic=demo": client-side route change.
 *  - "https://…", "mailto:", "tel:": plain anchor.
 */
export const SmartLink = ({ href = "/", onClick, children, ...rest }) => {
  const { pathname } = useLocation();

  if (/^(https?:|mailto:|tel:)/.test(href)) {
    return (
      <a href={href} onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }

  const hash = href.startsWith("#") ? href : href.startsWith("/#") ? href.slice(1) : null;
  if (hash) {
    const handle = (e) => {
      onClick?.(e);
      if (pathname === "/") {
        e.preventDefault();
        scrollToHash(hash);
        window.history.replaceState(null, "", hash);
      }
    };
    return (
      <Link to={`/${hash}`} onClick={handle} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <Link to={href} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
};
