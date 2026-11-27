import React from "react";
import { ArrowRight, Check } from "lucide-react";
import { SmartLink } from "@/components/SmartLink";
import { AppTile } from "@/components/AppTile";
import { ALL_APPS } from "@/constants/apps";
import { appHref } from "@/constants/appDetails";
import { INDUSTRIES, industryHref } from "@/constants/industries";
import { HERO_COPY } from "../constants/hero";
import { CtaButton } from "./CtaButton";

/** Every app as a clickable tile, so the whole offer is visible on the first screen. */
const AppLauncher = () => (
  <div className="rounded-[26px] bg-line p-3 sm:p-4">
    <p className="px-1 pb-3 font-label text-[12px] uppercase tracking-[0.12em] text-ink/55">{HERO_COPY.launcher.title}</p>
    <ul className="grid grid-cols-3 gap-2 sm:grid-cols-5">
      {ALL_APPS.map((app, i) => (
        <li key={app.id} className="animate-rise" style={{ animationDelay: `${300 + i * 35}ms` }}>
          <SmartLink
            href={appHref(app.id)}
            title={app.blurb}
            className="group flex h-full flex-col items-center gap-2 rounded-2xl bg-card px-1.5 py-3.5 text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-22px_rgba(15,27,76,0.45)] focus-visible:outline-2 focus-visible:outline-flow"
          >
            <AppTile app={app} className="size-11" iconClassName="size-5" />
            <span className="text-[13.5px] font-semibold leading-tight text-ink">{app.name}</span>
          </SmartLink>
        </li>
      ))}
    </ul>
    <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1 text-[14px]">
      <span className="text-ink/65">{HERO_COPY.launcher.footer}</span>
      <SmartLink href="/apps" className="group flex items-center gap-1 font-semibold text-flow hover:text-flow-hover">
        See all apps <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </SmartLink>
    </div>
  </div>
);

export const HomeHero = () => (
  <section className="px-2.5 pt-2.5">
    <div className="rounded-[28px] bg-white px-5 pb-16 pt-[124px] sm:px-8 lg:pb-20 lg:pt-[140px]">
      <div className="mx-auto grid max-w-[1320px] items-center gap-12 lg:grid-cols-[1fr_minmax(0,560px)] xl:gap-16">
        <div>
          <p className="animate-rise font-label text-[12.5px] uppercase tracking-[0.14em] text-ink/60">{HERO_COPY.eyebrow}</p>
          <h1 className="mt-5 text-[clamp(42px,6vw,84px)] font-extrabold leading-[1.02] tracking-[-0.025em] text-ink">
            {HERO_COPY.title.map((line, i) => (
              <span key={line} className="block animate-rise last:text-blue" style={{ animationDelay: `${100 + i * 110}ms` }}>
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-7 max-w-[600px] animate-rise text-[18px] leading-[1.55] text-ink/80 sm:text-[20px]" style={{ animationDelay: "320ms" }}>
            {HERO_COPY.subtitle}
          </p>
          <div className="mt-8 flex animate-rise flex-wrap gap-3" style={{ animationDelay: "420ms" }}>
            <CtaButton href={HERO_COPY.primary.href} arrow>
              {HERO_COPY.primary.label}
            </CtaButton>
            <CtaButton href={HERO_COPY.secondary.href} tone="glass">
              {HERO_COPY.secondary.label}
            </CtaButton>
          </div>
          <ul className="mt-6 flex animate-rise flex-wrap gap-x-5 gap-y-2 text-[14.5px] text-ink/70" style={{ animationDelay: "500ms" }}>
            {HERO_COPY.fineprint.map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <Check className="size-4 text-flow" strokeWidth={3} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0">
          <AppLauncher />
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-[1320px] animate-rise flex-wrap items-center gap-2" style={{ animationDelay: "650ms" }}>
        <span className="mr-2 font-label text-[12px] uppercase tracking-[0.12em] text-ink/55">{HERO_COPY.industries}</span>
        {INDUSTRIES.map(({ id, label, icon: Icon }) => (
          <SmartLink
            key={id}
            href={industryHref(id)}
            className="flex items-center gap-2 rounded-full bg-card px-3.5 py-2 text-[14px] text-ink ring-1 ring-line transition-colors hover:bg-white hover:text-flow"
          >
            <Icon className="size-4 text-ink/55" />
            {label}
          </SmartLink>
        ))}
      </div>
    </div>
  </section>
);
