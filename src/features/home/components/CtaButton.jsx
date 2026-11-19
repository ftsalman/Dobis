import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@lib/cn";
import { Button } from "@lib/turtle-ui/components/button/Button";
import { scrollToHash } from "@/utils/smoothScroll";

// turtle-ui Button, restyled for the marketing pages. Tailwind utilities sit in a later
// cascade layer than turtle-ui's component classes, so these classes win.
const TONES = {
  primary: "border-flow bg-flow text-canvas hover:opacity-100 hover:border-flow-hover hover:bg-flow-hover focus:ring-flow/25 focus:border-flow",
  glass:
    "border-line bg-card/60 text-ink backdrop-blur-md hover:bg-card focus:ring-line focus:border-line",
  light: "border-card bg-card text-ink hover:bg-canvas focus:ring-card/40 focus:border-card",
};

/** Routes like "/pricing" navigate; "#x" / "/#x" scroll on the homepage or route there first. */
export const CtaButton = ({ href, tone = "primary", arrow = false, className, children }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const go = () => {
    const hash = href.startsWith("#") ? href : href.startsWith("/#") ? href.slice(1) : null;
    if (!hash) navigate(href);
    else if (pathname === "/") scrollToHash(hash);
    else navigate(`/${hash}`);
  };
  return (
  <Button
    size="lg"
    variant={tone === "primary" ? "primary" : "secondary"}
    onClick={go}
    className={cn(
      "group h-[54px] rounded-full border px-7 text-[17px] font-semibold leading-none transition-all duration-300 hover:-translate-y-0.5",
      TONES[tone],
      className,
    )}
  >
    {children}
    {arrow && <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />}
  </Button>
  );
};
