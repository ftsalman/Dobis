import React from "react";
import { useParams } from "react-router-dom";
import { Check, Plus } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { AppTile } from "@/components/AppTile";
import { AppCard } from "@/components/AppCard";
import { CtaBand } from "@/components/CtaBand";
import { Reveal } from "@/components/Reveal";
import { SmartLink } from "@/components/SmartLink";
import { getApp } from "@/constants/appDetails";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { APP_PAGE } from "../constants/apps";
import { usePageTitle } from "@/hooks";

/** What's included and what it costs, right next to the headline. */
const PlanCard = ({ app }) => (
  <div className="rounded-[26px] bg-card p-6 shadow-[0_24px_60px_-30px_rgba(35,35,35,0.35)] ring-1 ring-line sm:p-8">
    <div className="flex items-center gap-3">
      <AppTile app={app} className="size-12 rounded-xl" iconClassName="size-6" />
      <div>
        <p className="text-lg font-semibold text-ink">Dobis {app.name}</p>
        <p className="text-[14px] text-ink/60">{app.blurb}</p>
      </div>
    </div>
    <ul className="mt-6 space-y-3 border-t border-line pt-6">
      {APP_PAGE.included.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-[15px] text-ink">
          <Check className="mt-0.5 size-4 shrink-0 text-flow" strokeWidth={3} />
          {item}
        </li>
      ))}
    </ul>
    <SmartLink href="/pricing" className="mt-6 inline-block text-[15px] font-semibold text-flow hover:text-flow-hover">
      {APP_PAGE.pricingLink} →
    </SmartLink>
  </div>
);

export const AppPage = () => {
  const { appId } = useParams();
  const app = getApp(appId);
  usePageTitle(app ? `${app.name}: ${app.tagline}` : "Page not found");
  if (!app) return <NotFoundPage />;

  const siblings = app.group.apps.filter((a) => a.id !== app.id);
  const related = app.related.map(getApp);

  return (
    <>
      <PageHeader
        eyebrow={
          <span className="flex items-center gap-2">
            <SmartLink href="/apps" className="hover:text-flow">
              Apps
            </SmartLink>
            <span aria-hidden="true">/</span>
            {app.group.label}
            <span aria-hidden="true">/</span>
            <span className="text-ink">{app.name}</span>
          </span>
        }
        title={app.tagline}
        intro={app.description}
        actions={[
          { label: `Try ${app.name} free`, href: "/pricing" },
          { label: "Book a demo", href: "/book-demo" },
        ]}
        aside={<PlanCard app={app} />}
      />

      <section className="px-4 py-24 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-[1240px]">
          <SectionHeading eyebrow="Features" title={`What you can do with ${app.name}`} />
          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {app.features.map((f, i) => (
              <Reveal as="li" key={f.title} delay={i * 70} className="rounded-[24px] bg-line p-6">
                <span className="font-mono text-[13px] text-flow">0{i + 1}</span>
                <h3 className="mt-3 text-[19px] font-semibold text-ink">{f.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/65">{f.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-8 sm:pb-28">
        <div className="mx-auto max-w-[1240px] rounded-[28px] bg-line/60 p-6 sm:p-10">
          <SectionHeading eyebrow="Better together" title={`${app.name} is connected to everything else`} subtitle={APP_PAGE.together} />
          <div className="mt-10 grid items-center gap-3 lg:grid-cols-[1fr_auto_3fr]">
            <AppCard app={app} />
            <Plus className="mx-auto size-5 text-ink/40" />
            <ul className="grid gap-3 sm:grid-cols-3">
              {related.map((r) => (
                <li key={r.id}>
                  <AppCard app={r} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-8 sm:pb-28">
        <div className="mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading eyebrow="We can help" title={`Need help setting up ${app.name}?`} subtitle={APP_PAGE.help} />
          <Reveal className="grid content-start gap-3 sm:grid-cols-2">
            {APP_PAGE.helpLinks.map((l) => (
              <SmartLink key={l.label} href={l.href} className="rounded-2xl bg-card p-5 ring-1 ring-line transition-colors hover:ring-flow">
                <span className="block text-[17px] font-semibold text-ink">{l.label}</span>
                <span className="mt-1 block text-[14px] text-ink/60">{l.body}</span>
              </SmartLink>
            ))}
          </Reveal>
        </div>
      </section>

      {siblings.length > 0 && (
        <section className="px-4 pb-24 sm:px-8 sm:pb-28">
          <div className="mx-auto max-w-[1240px]">
            <SectionHeading eyebrow={app.group.label} title={`More ${app.group.label.toLowerCase()} apps`} />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {siblings.map((s) => (
                <li key={s.id}>
                  <AppCard app={s} />
                </li>
              ))}
              <li>
                <SmartLink href="/apps" className="flex h-full items-center justify-center rounded-2xl p-4 text-[15px] font-semibold text-flow border border-dashed border-ink/20 hover:border-flow">
                  See all 15 apps →
                </SmartLink>
              </li>
            </ul>
          </div>
        </section>
      )}

      <CtaBand title={`Start using ${app.name} today`} />
    </>
  );
};
