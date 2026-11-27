import React from "react";
import { cn } from "@lib/cn";
import { CtaButton } from "@/features/home/components/CtaButton";

/**
 * Top of every inner page: eyebrow, h1, intro and optional CTAs, on the warm canvas panel.
 * `actions` = [{ label, href, tone? }]; the first gets an arrow.
 */
export const PageHeader = ({ eyebrow, title, intro, actions = [], aside, className, children }) => (
  <section className="px-2.5 pt-2.5">
    <div className={cn("rounded-[28px] bg-line/60 px-5 pb-16 pt-[128px] sm:px-8 lg:pb-20", className)}>
      <div className={cn("mx-auto max-w-[1240px]", aside && "grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]")}>
        <div>
          {eyebrow && (
            <div className="animate-rise font-label text-[12.5px] uppercase tracking-[0.14em] text-ink/60">{eyebrow}</div>
          )}
          <h1
            className="mt-5 max-w-3xl animate-rise text-[42px] font-extrabold leading-[1.04] tracking-[-0.025em] text-ink sm:text-[64px]"
            style={{ animationDelay: "100ms" }}
          >
            {title}
          </h1>
          {intro && (
            <p className="mt-6 max-w-2xl animate-rise text-lg leading-relaxed text-ink/75 sm:text-[20px]" style={{ animationDelay: "200ms" }}>
              {intro}
            </p>
          )}
          {actions.length > 0 && (
            <div className="mt-8 flex animate-rise flex-wrap gap-3" style={{ animationDelay: "300ms" }}>
              {actions.map((a, i) => (
                <CtaButton key={a.label} href={a.href} tone={a.tone ?? (i === 0 ? "primary" : "glass")} arrow={i === 0}>
                  {a.label}
                </CtaButton>
              ))}
            </div>
          )}
          {children}
        </div>
        {aside && (
          <div className="animate-rise" style={{ animationDelay: "250ms" }}>
            {aside}
          </div>
        )}
      </div>
    </div>
  </section>
);
