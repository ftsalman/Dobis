import React from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@lib/cn";
import { APP_GROUPS, ALL_APPS } from "@/constants/apps";
import { OVERVIEW } from "../constants/home";
import { Reveal } from "./Reveal";

/** The whole suite at a glance: every app as a tile, grouped by department. */
export const Overview = () => (
  <section id="apps" className="scroll-mt-24 px-4 pb-24 sm:px-8 sm:pb-32">
    <div className="mx-auto max-w-[1240px]">
      <div className="flex flex-col items-center text-center">
        <Reveal as="p" className="font-mono text-xs uppercase tracking-[0.2em] text-ink/60">
          {OVERVIEW.eyebrow} · {ALL_APPS.length} apps
        </Reveal>
        <Reveal as="h2" delay={80} className="mt-5 max-w-3xl text-[40px] font-medium leading-[1.02] tracking-[-0.05em] text-ink sm:text-[64px]">
          {OVERVIEW.title}
        </Reveal>
        <Reveal as="p" delay={160} className="mt-5 max-w-xl text-lg text-ink/70">
          {OVERVIEW.subtitle}
        </Reveal>
      </div>

      <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {APP_GROUPS.map((group, g) => (
          <Reveal key={group.id} delay={g * 80} className="rounded-[24px] bg-line p-3">
            <p className="px-2 pb-2 pt-1 font-mono text-[11.5px] uppercase tracking-[0.12em] text-ink/50">{group.label}</p>
            <ul className="space-y-1.5">
              {group.apps.map((app) => (
                <li key={app.id}>
                  <a
                    href={`#${app.id}`}
                    className="group flex items-center gap-3 rounded-2xl bg-card p-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-22px_rgba(35,35,35,0.45)]"
                  >
                    <span className={cn("grid size-11 shrink-0 place-items-center rounded-xl transition-transform duration-300 group-hover:rotate-[-6deg]", app.tone)}>
                      <app.icon className="size-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[15px] font-semibold text-ink">{app.name}</span>
                      <span className="block text-[13px] leading-snug text-ink/55">{app.blurb}</span>
                    </span>
                    <ArrowUpRight className="size-4 shrink-0 self-start text-ink/30 transition-colors group-hover:text-flow lg:hidden xl:block" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
