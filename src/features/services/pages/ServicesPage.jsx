import React from "react";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { Reveal } from "@/components/Reveal";
import { SERVICES_COPY } from "@/constants/services";
import { OnboardingSteps, ServiceGrid } from "@/features/home/components/Services";
import { usePageTitle } from "@/hooks";

const SERVICES_FAQ = [
  { q: "Do I have to buy services to use Dobis?", a: "No. Many customers set Dobis up themselves using guided imports and the help center. Services are there when you'd rather we do it for you." },
  { q: "How long does an implementation take?", a: "Most small teams are live within one to two weeks. Larger projects with several apps, branches or custom work are planned together with you up front." },
  { q: "Is data migration included?", a: "Guided imports are free on every plan. On Professional and Enterprise our team migrates your data for you at no extra cost." },
  { q: "Can you work with our existing systems?", a: "Yes. We connect Dobis to banks, payment providers, e-commerce platforms and in-house systems using our REST API and webhooks." },
];

export const ServicesPage = () => {
  usePageTitle("Implementation, migration and support services");
  return (
  <>
    <PageHeader
      eyebrow={SERVICES_COPY.eyebrow}
      title={SERVICES_COPY.title}
      intro={SERVICES_COPY.subtitle}
      actions={[
        { label: "Talk to an expert", href: "/contact?topic=sales" },
        { label: "Book a demo", href: "/book-demo" },
      ]}
    />

    <section className="px-4 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-[1240px]">
        <SectionHeading eyebrow="What we do" title="Everything you need to get the most from Dobis" className="mb-12" />
        <ServiceGrid />
      </div>
    </section>

    <section className="px-4 pb-24 sm:px-8 sm:pb-28">
      <div className="mx-auto max-w-[1240px]">
        <SectionHeading eyebrow="How it works" title="From first call to go-live" className="mb-10" />
        <OnboardingSteps />
      </div>
    </section>

    <section className="px-4 pb-24 sm:px-8 sm:pb-28">
      <div className="mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-[1fr_2fr]">
        <Reveal as="h2" className="text-[34px] font-medium leading-[1.05] tracking-[-0.045em] text-ink sm:text-[46px]">
          Service questions
        </Reveal>
        <Faq items={SERVICES_FAQ} />
      </div>
    </section>

    <CtaBand
      title="Let's plan your setup"
      body="Tell us how your business runs today and we'll recommend the right apps, plan and services. No obligation."
      primary={{ label: "Talk to an expert", href: "/contact?topic=sales" }}
    />
  </>
  );
};
