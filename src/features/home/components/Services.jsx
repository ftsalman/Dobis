import React from "react";
import { Check } from "lucide-react";
import { cn } from "@lib/cn";
import { ONBOARDING_STEPS, SERVICES, SERVICES_COPY } from "@/constants/services";
import { CtaButton } from "./CtaButton";
import { Reveal } from "./Reveal";

/** The four steps from first call to go-live, as a numbered strip. */
export const OnboardingSteps = ({ dark = false }) => (
  <ol className="grid gap-px overflow-hidden rounded-[24px] sm:grid-cols-2 lg:grid-cols-4">
    {ONBOARDING_STEPS.map((step, i) => (
      <Reveal as="li" key={step.number} delay={i * 80} className={cn("p-6", dark ? "bg-white/[0.06]" : "bg-line")}>
        <span className={cn("font-mono text-[13px]", dark ? "text-dot" : "text-flow")}>{step.number}</span>
        <h3 className={cn("mt-3 text-[20px] font-semibold", dark ? "text-canvas" : "text-ink")}>{step.title}</h3>
        <p className={cn("mt-2 text-[15px] leading-relaxed", dark ? "text-canvas/70" : "text-ink/65")}>{step.body}</p>
      </Reveal>
    ))}
  </ol>
);

/** Service cards. `compact` drops the bullet points (homepage). */
export const ServiceGrid = ({ compact = false, dark = false }) => (
  <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
    {SERVICES.map(({ id, icon: Icon, title, body, points }, i) => (
      <Reveal as="li" key={id} id={compact ? undefined : id} delay={(i % 3) * 80} className="scroll-mt-28">
        <div className={cn("flex h-full flex-col rounded-[24px] p-6", dark ? "bg-white/[0.06]" : "bg-line")}>
          <span className={cn("grid size-10 place-items-center rounded-xl", dark ? "bg-canvas text-ink" : "bg-card text-ink shadow-sm")}>
            <Icon className="size-5" />
          </span>
          <h3 className={cn("mt-5 text-xl font-semibold", dark ? "text-canvas" : "text-ink")}>{title}</h3>
          <p className={cn("mt-2 text-[15px] leading-relaxed", dark ? "text-canvas/70" : "text-ink/65")}>{body}</p>
          {!compact && (
            <ul className="mt-5 space-y-2">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-[14.5px] text-ink">
                  <Check className="mt-0.5 size-4 shrink-0 text-flow" strokeWidth={3} />
                  {p}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Reveal>
    ))}
  </ul>
);

/** Homepage section: the service side of Dobis, on a dark panel so it reads as its own offer. */
export const Services = () => (
  <section id="services" className="scroll-mt-24 px-2.5 pb-24 sm:pb-32">
    <div className="rounded-[28px] bg-dark px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-[1240px]">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <Reveal as="p" className="font-mono text-xs uppercase tracking-[0.2em] text-canvas/60">
              {SERVICES_COPY.eyebrow}
            </Reveal>
            <Reveal as="h2" delay={80} className="mt-5 text-[40px] font-medium leading-[1.02] tracking-[-0.05em] text-canvas sm:text-[56px]">
              {SERVICES_COPY.title}
            </Reveal>
            <Reveal as="p" delay={160} className="mt-5 text-lg text-canvas/70">
              {SERVICES_COPY.subtitle}
            </Reveal>
          </div>
          <Reveal delay={200} className="flex shrink-0 flex-wrap gap-3">
            <CtaButton href="/services" tone="light" arrow>
              Explore services
            </CtaButton>
          </Reveal>
        </div>

        <div className="mt-12">
          <ServiceGrid compact dark />
        </div>
        <div className="mt-3">
          <OnboardingSteps dark />
        </div>
      </div>
    </div>
  </section>
);
