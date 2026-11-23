import React from "react";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { AppCard } from "@/components/AppCard";
import { AppTile } from "@/components/AppTile";
import { CtaBand } from "@/components/CtaBand";
import { Reveal } from "@/components/Reveal";
import { ADDONS, APP_GROUPS } from "@/constants/apps";
import { APPS_PAGE } from "../constants/apps";
import { usePageTitle } from "@/hooks";

/** The full catalog: every app by department, then partner add-ons. */
export const AppsPage = () => {
  usePageTitle("All apps");
  return (
  <>
    <PageHeader
      eyebrow={APPS_PAGE.eyebrow}
      title={APPS_PAGE.title}
      intro={APPS_PAGE.intro}
      actions={[
        { label: "Start free", href: "/pricing" },
        { label: "Book a demo", href: "/book-demo" },
      ]}
    />

    <section className="px-4 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-[1240px] space-y-14">
        {APP_GROUPS.map((group) => (
          <div key={group.id} id={group.id} className="grid scroll-mt-28 gap-6 lg:grid-cols-[220px_1fr]">
            <Reveal as="h2" className="font-mono text-[13px] uppercase tracking-[0.14em] text-ink/60 lg:pt-4">
              {group.label}
            </Reveal>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {group.apps.map((app, i) => (
                <Reveal as="li" key={app.id} delay={i * 60}>
                  <AppCard app={app} />
                </Reveal>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>

    <section id="addons" className="scroll-mt-28 px-4 pb-24 sm:px-8 sm:pb-28">
      <div className="mx-auto max-w-[1240px] rounded-[28px] bg-line/60 p-6 sm:p-10">
        <SectionHeading title={APPS_PAGE.addons.title} subtitle={APPS_PAGE.addons.subtitle} />
        <ul className="mt-10 grid gap-3 md:grid-cols-3">
          {ADDONS.map((app) => (
            <li key={app.id}>
              <a
                href={app.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-2xl bg-card p-5 ring-1 ring-line transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-22px_rgba(35,35,35,0.45)]"
              >
                <span className="flex items-center gap-3">
                  <AppTile app={app} className="size-11 rounded-xl" iconClassName="size-5" />
                  <span className="flex-1 text-[16px] font-semibold text-ink">{app.name}</span>
                  <ArrowUpRight className="size-4 text-ink/30 group-hover:text-flow" />
                </span>
                <span className="mt-3 text-[14.5px] leading-relaxed text-ink/65">{app.description}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>

    <CtaBand />
  </>
  );
};
