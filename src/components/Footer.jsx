import React, { useEffect, useRef, useState } from "react";
import { cn } from "@lib/cn";
import { SmartLink } from "@/components/SmartLink";
import { FOOTER_LINKS } from "@/constants/constants";
import { Logo } from "@/components/navbar/Navbar";

const toHref = (label) => `#${label.toLowerCase().replace(/\s+/g, "-")}`;

export const Footer = () => {
  // The giant wordmark slides up once the bottom of the footer is in view.
  const markRef = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = markRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setShown(true), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <footer className="overflow-hidden bg-canvas px-4 pt-20 sm:px-8">
      <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[1fr_3fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-ink-soft">
            All-in-one business software for sales, finance, operations and people, with the team to set it up and support you.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {FOOTER_LINKS.map((col) => (
            <div key={col.title}>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-ink-soft/70">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((item) => {
                  const { label, href } = typeof item === "string" ? { label: item, href: toHref(item) } : item;
                  return (
                  <li key={label}>
                    <SmartLink href={href} className="text-[15px] text-ink transition-colors hover:text-ink-soft">
                      {label}
                    </SmartLink>
                  </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-[1240px] flex-wrap items-center justify-between gap-3 border-t border-black/5 pt-6 text-sm text-ink-soft">
        <span>© {new Date().getFullYear()} Dobis. All rights reserved.</span>
        <SmartLink href="#cookies" className="hover:text-ink">
          Cookie settings
        </SmartLink>
      </div>

      <div ref={markRef} aria-hidden="true" className="mx-auto max-w-[1400px] select-none">
        <p
          className={cn(
            "translate-y-[35%] text-center font-display text-[27vw] font-extrabold leading-none tracking-[-0.06em] text-hero transition-all duration-[1400ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] xl:text-[380px]",
            shown ? "translate-y-[22%] opacity-100" : "translate-y-[60%] opacity-0",
          )}
        >
          Dobis
        </p>
      </div>
    </footer>
  );
};
