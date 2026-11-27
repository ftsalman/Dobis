import React from "react";
import { useParams } from "react-router-dom";
import { Check, X } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { AppCard } from "@/components/AppCard";
import { CtaBand } from "@/components/CtaBand";
import { Reveal } from "@/components/Reveal";
import { SmartLink } from "@/components/SmartLink";
import { appHref, getApp } from "@/constants/appDetails";
import { AppTile } from "@/components/AppTile";
import { INDUSTRIES, getIndustry, industryHref } from "@/constants/industries";
import { OnboardingSteps } from "@/features/home/components/Services";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { usePageTitle } from "@/hooks";

export const IndustryPage = () => {
  const { industryId } = useParams();
  const industry = getIndustry(industryId);
  usePageTitle(industry ? `doBis for ${industry.label}` : "Page not found");
  if (!industry) return <NotFoundPage />;

  const apps = industry.apps.map(getApp);
  const others = INDUSTRIES.filter((i) => i.id !== industry.id);
  const Icon = industry.icon;

  return (
    <>
      <PageHeader
        eyebrow={
          <span className="flex items-center gap-2">
            <Icon className="size-4" /> {industry.label}
          </span>
        }
        title={industry.title}
        intro={industry.intro}
        actions={[
          { label: "Start free", href: "/pricing" },
          { label: "Talk to an expert", href: "/contact?topic=sales" },
        ]}
        aside={
          <div className="rounded-[26px] bg-card p-5 shadow-[0_24px_60px_-30px_rgba(15,27,76,0.35)] ring-1 ring-line sm:p-6">
            <p className="font-label text-[12px] uppercase tracking-[0.12em] text-ink/55">Apps for {industry.label.toLowerCase()}</p>
            <ul className="mt-4 grid grid-cols-3 gap-2">
              {apps.map((app) => (
                <li key={app.id}>
                  <SmartLink href={appHref(app.id)} className="flex flex-col items-center gap-2 rounded-2xl bg-canvas px-1.5 py-4 text-center transition-colors hover:bg-line">
                    <AppTile app={app} className="size-11 rounded-xl" iconClassName="size-5" />
                    <span className="text-[13.5px] font-semibold text-ink">{app.name}</span>
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>
        }
      />

      <section className="px-4 py-24 sm:px-8 sm:py-28">
        <div className="mx-auto grid max-w-[1240px] gap-3 lg:grid-cols-2">
          <Reveal className="rounded-[26px] bg-line p-7 sm:p-9">
            <p className="font-label text-xs uppercase tracking-[0.16em] text-ink/60">Sound familiar?</p>
            <ul className="mt-6 space-y-4">
              {industry.challenges.map((c) => (
                <li key={c} className="flex items-start gap-3 text-[17px] leading-snug text-ink">
                  <X className="mt-0.5 size-5 shrink-0 text-red-600" strokeWidth={2.5} />
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={100} className="rounded-[26px] bg-dark p-7 sm:p-9">
            <p className="font-label text-xs uppercase tracking-[0.16em] text-canvas/60">With doBis</p>
            <ul className="mt-6 space-y-4">
              {industry.outcomes.map((o) => (
                <li key={o} className="flex items-start gap-3 text-[17px] leading-snug text-canvas">
                  <Check className="mt-0.5 size-5 shrink-0 text-dot" strokeWidth={3} />
                  {o}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-8 sm:pb-28">
        <div className="mx-auto max-w-[1240px]">
          <SectionHeading
            eyebrow="Recommended apps"
            title={`The ${industry.label.toLowerCase()} setup`}
            subtitle="Most businesses like yours start with these apps. Begin with one or two and add the rest when you're ready."
          />
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {apps.map((app, i) => (
              <Reveal as="li" key={app.id} delay={(i % 3) * 60}>
                <AppCard app={app} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-8 sm:pb-28">
        <div className="mx-auto max-w-[1240px]">
          <SectionHeading eyebrow="Getting started" title="Live in days, with our team beside you" className="mb-10" />
          <OnboardingSteps />
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-8">
        <div className="mx-auto max-w-[1240px]">
          <p className="font-label text-xs uppercase tracking-[0.16em] text-ink/60">Other industries</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {others.map(({ id, label, icon: OtherIcon }) => (
              <li key={id}>
                <SmartLink
                  href={industryHref(id)}
                  className="flex items-center gap-2 rounded-full bg-card px-3.5 py-2 text-[14px] text-ink ring-1 ring-line hover:text-flow"
                >
                  <OtherIcon className="size-4 text-ink/55" />
                  {label}
                </SmartLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title={`See doBis for ${industry.label.toLowerCase()}`} body="Book a 30-minute demo tailored to how your business works, or start free today." primary={{ label: "Book a demo", href: "/book-demo" }} secondary={{ label: "Start free", href: "/pricing" }} />
    </>
  );
};
