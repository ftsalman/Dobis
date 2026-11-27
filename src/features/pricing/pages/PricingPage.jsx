import React, { useEffect, useState } from "react";
import { ArrowRight, CreditCard, LifeBuoy, RefreshCw, ShieldCheck } from "lucide-react";
import { Faq } from "@/components/Faq";
import { Reveal } from "@/components/Reveal";
import { SmartLink } from "@/components/SmartLink";
import { CURRENCIES, PRICING_FAQ } from "../constants/pricing";
import { guessCurrency } from "../utils/money";
import { BillingControls, PlanCards } from "../components/PlanCards";
import { SuiteCalculator } from "../components/SuiteCalculator";
import { CompareTable } from "../components/CompareTable";
import { AddOns } from "../components/AddOns";

const CURRENCY_KEY = "dobis-currency";

// Remembered per browser; storage can be blocked, so every access is guarded.
const initialCurrency = () => {
  try {
    const saved = localStorage.getItem(CURRENCY_KEY);
    if (CURRENCIES.some((c) => c.code === saved)) return saved;
  } catch {
    /* storage unavailable: fall back to a guess */
  }
  return guessCurrency();
};

const PROMISES = [
  { icon: CreditCard, title: "14-day free trial", body: "Every feature, no card needed." },
  { icon: RefreshCw, title: "Cancel anytime", body: "Monthly plans stop at the end of the month." },
  { icon: LifeBuoy, title: "Free migration help", body: "On Professional and Enterprise." },
  { icon: ShieldCheck, title: "Your data is yours", body: "Export everything, whenever you like." },
];

const SectionHead = ({ eyebrow, title, body }) => (
  <div className="max-w-2xl">
    <Reveal as="p" className="font-label text-xs uppercase tracking-[0.2em] text-ink/60">
      {eyebrow}
    </Reveal>
    <Reveal as="h2" delay={80} className="mt-4 text-[36px] font-bold leading-[1.04] tracking-[-0.03em] text-ink sm:text-[52px]">
      {title}
    </Reveal>
    {body && (
      <Reveal as="p" delay={140} className="mt-4 text-lg text-ink-soft">
        {body}
      </Reveal>
    )}
  </div>
);

export const PricingPage = () => {
  const [billing, setBilling] = useState("yearly");
  const [currency, setCurrency] = useState(initialCurrency);

  useEffect(() => {
    document.title = "Pricing · doBis";
    return () => {
      document.title = "doBis · All-in-one business software";
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(CURRENCY_KEY, currency);
    } catch {
      /* not critical */
    }
  }, [currency]);

  return (
    <>
      {/* ---------- hero + plans ---------- */}
      <section className="px-4 pb-20 pt-36 sm:px-8 sm:pt-40">
        <div className="mx-auto max-w-[1320px]">
          <div className="flex flex-col items-center text-center">
            <p className="animate-rise font-label text-xs uppercase tracking-[0.2em] text-ink/60">Pricing</p>
            <h1
              className="mt-5 max-w-4xl animate-rise text-[46px] font-extrabold leading-[1.02] tracking-[-0.025em] text-ink sm:text-[84px]"
              style={{ animationDelay: "100ms" }}
            >
              One price. Every app.
            </h1>
            <p className="mt-6 max-w-xl animate-rise text-lg text-ink-soft sm:text-xl" style={{ animationDelay: "200ms" }}>
              Start free, upgrade when you grow. Every paid plan includes all 15 apps, so you never pay extra to connect your business.
            </p>
            <div className="mt-9 animate-rise" style={{ animationDelay: "300ms" }}>
              <BillingControls billing={billing} onBilling={setBilling} currency={currency} onCurrency={setCurrency} />
            </div>
          </div>

          <div className="mt-14">
            <PlanCards billing={billing} currency={currency} />
          </div>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {PROMISES.map(({ icon: Icon, title, body }) => (
              <li key={title} className="flex items-start gap-3 rounded-2xl bg-line/60 p-4">
                <Icon className="mt-0.5 size-5 shrink-0 text-flow" />
                <span>
                  <span className="block text-[15px] font-semibold text-ink">{title}</span>
                  <span className="block text-[14px] text-ink-soft">{body}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- calculator ---------- */}
      <section id="calculator" className="scroll-mt-24 px-4 py-20 sm:px-8">
        <div className="mx-auto max-w-[1320px]">
          <SectionHead
            eyebrow="Build your own"
            title="Only need a few apps?"
            body="Pay per app instead. Pick what you need and we'll tell you whether a plan is the better deal."
          />
          <div className="mt-10">
            <SuiteCalculator billing={billing} currency={currency} />
          </div>
        </div>
      </section>

      {/* ---------- partner add-ons ---------- */}
      <section id="addons" className="scroll-mt-24 px-4 py-20 sm:px-8">
        <div className="mx-auto max-w-[1320px]">
          <SectionHead
            eyebrow="Partner add-ons"
            title="Go further with add-ons"
            body="Specialist products from our partners that sit alongside any doBis plan. Each has its own site, and we can show them in your demo."
          />
          <div className="mt-10">
            <AddOns currency={currency} />
          </div>
        </div>
      </section>

      {/* ---------- comparison ---------- */}
      <section id="compare" className="scroll-mt-24 px-4 py-20 sm:px-8">
        <div className="mx-auto max-w-[1320px]">
          <SectionHead eyebrow="Compare plans" title="Every feature, side by side" />
          <div className="mt-10">
            <CompareTable />
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section id="faq" className="scroll-mt-24 px-4 py-20 sm:px-8">
        <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-[1fr_1.6fr]">
          <SectionHead eyebrow="FAQ" title="Questions, answered" body="Can't find what you need? Our team replies within one business day." />
          <Reveal delay={120}>
            <Faq items={PRICING_FAQ} />
          </Reveal>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="px-2.5 pb-2.5 pt-10">
        <div className="rounded-[28px] bg-dark px-6 py-20 text-center text-canvas sm:py-28">
          <h2 className="mx-auto max-w-3xl text-[38px] font-bold leading-[1.02] tracking-[-0.03em] sm:text-[64px]">
            Not sure which plan fits?
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg text-muted">Tell us about your business and we'll recommend a setup, with a price, in one call.</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <SmartLink
              href="/contact?topic=sales"
              className="flex items-center gap-2 rounded-full bg-flow px-7 py-4 text-[16px] font-semibold text-canvas transition-colors hover:bg-flow-hover"
            >
              Talk to sales <ArrowRight className="size-4" />
            </SmartLink>
            <SmartLink
              href="/book-demo"
              className="rounded-full bg-canvas/10 px-7 py-4 text-[16px] font-semibold text-canvas transition-colors hover:bg-canvas/20"
            >
              Book a demo
            </SmartLink>
          </div>
        </div>
      </section>
    </>
  );
};
