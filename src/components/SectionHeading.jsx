import React from "react";
import { cn } from "@lib/cn";
import { Reveal } from "@/components/Reveal";

/** Eyebrow + h2 + optional subtitle, used at the top of page sections. */
export const SectionHeading = ({ eyebrow, title, subtitle, className }) => (
  <div className={cn("max-w-2xl", className)}>
    {eyebrow && (
      <Reveal as="p" className="font-label text-xs uppercase tracking-[0.2em] text-ink/60">
        {eyebrow}
      </Reveal>
    )}
    <Reveal as="h2" delay={80} className="mt-4 text-[34px] font-bold leading-[1.05] tracking-[-0.03em] text-ink sm:text-[46px]">
      {title}
    </Reveal>
    {subtitle && (
      <Reveal as="p" delay={160} className="mt-4 text-lg text-ink/70">
        {subtitle}
      </Reveal>
    )}
  </div>
);
