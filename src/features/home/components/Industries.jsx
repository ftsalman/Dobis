import React from "react";
import { ArrowUpRight } from "lucide-react";
import { SmartLink } from "@/components/SmartLink";
import { AppTile } from "@/components/AppTile";
import { getApp } from "@/constants/appDetails";
import { INDUSTRIES, industryHref } from "@/constants/industries";
import { INDUSTRIES_COPY } from "../constants/home";
import { Reveal } from "./Reveal";

/** "Is this for a business like mine?" - one card per industry, linking to its page. */
export const Industries = () => (
  <section id="industries" className="scroll-mt-24 px-4 pb-24 sm:px-8 sm:pb-32">
    <div className="mx-auto max-w-[1240px]">
      <div className="max-w-2xl">
        <Reveal as="p" className="font-label text-xs uppercase tracking-[0.2em] text-ink/60">
          {INDUSTRIES_COPY.eyebrow}
        </Reveal>
        <Reveal as="h2" delay={80} className="mt-5 text-[40px] font-bold leading-[1.02] tracking-[-0.03em] text-ink sm:text-[56px]">
          {INDUSTRIES_COPY.title}
        </Reveal>
        <Reveal as="p" delay={160} className="mt-5 text-lg text-ink/70">
          {INDUSTRIES_COPY.subtitle}
        </Reveal>
      </div>

      <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {INDUSTRIES.map(({ id, label, title, icon: Icon, apps }, i) => (
          <Reveal as="li" key={id} delay={(i % 4) * 70}>
            <SmartLink
              href={industryHref(id)}
              className="group flex h-full flex-col rounded-[24px] bg-line p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-line-cool hover:shadow-[0_30px_60px_-30px_rgba(15,27,76,0.3)]"
            >
              <div className="flex items-start justify-between">
                <span className="grid size-10 place-items-center rounded-xl bg-card text-ink shadow-sm">
                  <Icon className="size-5" />
                </span>
                <ArrowUpRight className="size-5 text-ink/30 transition-colors group-hover:text-flow" />
              </div>
              <h3 className="mt-5 text-[19px] font-semibold text-ink">{label}</h3>
              <p className="mt-1.5 text-[14.5px] leading-snug text-ink/65">{title}</p>
              <div className="mt-auto flex -space-x-1.5 pt-5">
                {apps.slice(0, 4).map((appId) => {
                  const app = getApp(appId);
                  return <AppTile key={appId} app={app} className="size-8 ring-2 ring-line group-hover:ring-line-cool" iconClassName="size-4" />;
                })}
              </div>
            </SmartLink>
          </Reveal>
        ))}
        <Reveal as="li" delay={210}>
          <SmartLink
            href="/contact?topic=sales"
            className="group flex h-full flex-col justify-between rounded-[24px] bg-flow p-5 text-canvas transition-all duration-300 hover:-translate-y-1 hover:bg-flow-hover"
          >
            <h3 className="text-[19px] font-semibold">{INDUSTRIES_COPY.other.title}</h3>
            <p className="mt-2 text-[14.5px] leading-snug text-canvas/85">{INDUSTRIES_COPY.other.body}</p>
            <span className="mt-6 flex items-center gap-1 text-[15px] font-semibold">
              {INDUSTRIES_COPY.other.cta} <ArrowUpRight className="size-4" />
            </span>
          </SmartLink>
        </Reveal>
      </ul>
    </div>
  </section>
);
