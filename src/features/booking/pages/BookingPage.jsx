import React, { useEffect } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Faq } from "@/components/Faq";
import { Reveal } from "@/components/Reveal";
import { SmartLink } from "@/components/SmartLink";
import { TRUST } from "@/features/home/constants/home";
import { AGENDA, BENEFITS, BOOKING_FAQ, BOOKING_STATS } from "../constants/booking";
import { BookingFlow } from "../components/BookingFlow";

const GLYPHS = [
  <circle key="c" cx="10" cy="10" r="8" />,
  <rect key="r" x="2" y="2" width="16" height="16" rx="4" />,
  <path key="t" d="M10 2 18 18H2Z" />,
  <path key="d" d="M10 1 19 10 10 19 1 10Z" />,
];

export const BookingPage = () => {
  useEffect(() => {
    document.title = "Book a demo · Dobis";
    return () => {
      document.title = "Dobis · All-in-one business software";
    };
  }, []);

  return (
    <>
      {/* ---------- hero + booking ---------- */}
      <section className="px-4 pb-20 pt-32 sm:px-8 sm:pt-40">
        <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* intro (row 1, left) */}
          <div className="lg:col-start-1 lg:row-start-1">
            <p className="flex animate-rise items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-ink/60">
              <span className="relative flex size-2">
                <span className="absolute inset-0 animate-ping-slow rounded-full bg-flow" />
                <span className="relative size-2 rounded-full bg-flow" />
              </span>
              Book a demo
            </p>
            <h1
              className="mt-5 animate-rise text-[46px] font-medium leading-[0.98] tracking-[-0.055em] text-ink sm:text-[72px]"
              style={{ animationDelay: "100ms" }}
            >
              See Dobis in action.
            </h1>
            <p className="mt-6 max-w-md animate-rise text-lg text-ink-soft sm:text-xl" style={{ animationDelay: "200ms" }}>
              A 30-minute walkthrough built around your business. Pick a time that works, and we'll show you exactly how Dobis fits.
            </p>
          </div>

          {/* booking card (right, spans both rows) */}
          <div className="animate-rise lg:col-start-2 lg:row-span-2 lg:row-start-1" style={{ animationDelay: "250ms" }}>
            <BookingFlow />
            <p className="mt-4 flex items-center justify-center gap-2 text-[13px] text-ink/50">
              <ShieldCheck className="size-4" /> No sales pressure. Your details are only used to arrange this call.
            </p>
          </div>

          {/* benefits + agenda (row 2, left) */}
          <div className="lg:col-start-1 lg:row-start-2">
            <p className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-ink/50">With Dobis, you can</p>
            <ul className="mt-5 space-y-3">
              {BENEFITS.map(({ icon: Icon, title, body }, i) => (
                <Reveal as="li" key={title} delay={i * 90} className="flex gap-4 rounded-[22px] bg-line/50 p-5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-flow text-canvas">
                    <Icon className="size-5" />
                  </span>
                  <span>
                    <span className="block text-[17px] font-semibold tracking-[-0.01em] text-ink">{title}</span>
                    <span className="mt-1 block text-[15px] leading-snug text-ink-soft">{body}</span>
                  </span>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={120} className="mt-8 rounded-[22px] bg-dark p-6 text-canvas">
              <p className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-muted">What we'll cover</p>
              <ol className="mt-4 space-y-3">
                {AGENDA.map(([time, item]) => (
                  <li key={item} className="flex items-baseline gap-4 border-b border-canvas/10 pb-3 last:border-0 last:pb-0">
                    <span className="w-14 shrink-0 font-mono text-[12.5px] text-flow-pill">{time}</span>
                    <span className="text-[15px]">{item}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- social proof ---------- */}
      <section className="px-4 py-16 sm:px-8">
        <div className="mx-auto max-w-[1320px]">
          <Reveal as="p" className="text-center font-mono text-xs uppercase tracking-[0.2em] text-ink/60">
            Growing businesses choose Dobis
          </Reveal>
          <Reveal delay={100} className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-[26px] bg-line ring-1 ring-line sm:grid-cols-5">
            {TRUST.logos.map((name, i) => (
              <span key={name} className="flex items-center justify-center gap-2 bg-canvas px-4 py-8 text-ink/45 transition-colors hover:text-ink">
                <svg viewBox="0 0 20 20" className="size-4 fill-current" aria-hidden="true">
                  {GLYPHS[i % GLYPHS.length]}
                </svg>
                <span className="font-display text-[17px] font-extrabold tracking-tight">{name}</span>
              </span>
            ))}
          </Reveal>
          <dl className="mt-3 grid gap-3 sm:grid-cols-3">
            {BOOKING_STATS.map(([value, label], i) => (
              <Reveal key={label} delay={i * 80} className="rounded-[22px] bg-card p-6 ring-1 ring-line">
                <dt className="sr-only">{label}</dt>
                <dd className="text-[40px] font-medium leading-none tracking-[-0.05em] text-ink">{value}</dd>
                <dd className="mt-2 text-[14px] text-ink-soft">{label}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="px-4 py-20 sm:px-8">
        <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div className="max-w-md">
            <Reveal as="p" className="font-mono text-xs uppercase tracking-[0.2em] text-ink/60">
              FAQ
            </Reveal>
            <Reveal as="h2" delay={80} className="mt-4 text-[36px] font-medium leading-[1.04] tracking-[-0.05em] text-ink sm:text-[52px]">
              Before you book
            </Reveal>
            <Reveal as="p" delay={140} className="mt-4 text-lg text-ink-soft">
              Prefer to look around first?{" "}
              <SmartLink href="/pricing" className="inline-flex items-center gap-1 font-semibold text-flow hover:text-flow-hover">
                Compare plans <ArrowRight className="size-4" />
              </SmartLink>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <Faq items={BOOKING_FAQ} />
          </Reveal>
        </div>
      </section>
    </>
  );
};
