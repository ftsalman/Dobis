import React from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@lib/cn";
import { SmartLink } from "@/components/SmartLink";
import { Reveal } from "@/components/Reveal";
import { CURRENCIES, MONTHLY_UPLIFT, PLANS } from "../constants/pricing";
import { cyclePrice, formatMoney } from "../utils/money";

/** Monthly / yearly switch plus currency picker. */
export const BillingControls = ({ billing, onBilling, currency, onCurrency, className }) => (
  <div className={cn("flex flex-wrap items-center justify-center gap-3", className)}>
    <div role="radiogroup" aria-label="Billing cycle" className="inline-flex rounded-full bg-card p-1 ring-1 ring-line">
      {[
        ["monthly", "Monthly"],
        ["yearly", "Yearly"],
      ].map(([id, label]) => (
        <button
          key={id}
          type="button"
          role="radio"
          aria-checked={billing === id}
          onClick={() => onBilling(id)}
          className={cn(
            "flex items-center gap-2 rounded-full px-5 py-2.5 text-[15px] font-semibold transition-colors",
            billing === id ? "bg-ink text-canvas" : "text-ink hover:bg-line",
          )}
        >
          {label}
          {id === "yearly" && (
            <span className={cn("rounded-full px-2 py-0.5 text-[12px]", billing === id ? "bg-flow text-canvas" : "bg-flow/15 text-flow")}>
              Save {Math.round((MONTHLY_UPLIFT / (1 + MONTHLY_UPLIFT)) * 100)}%
            </span>
          )}
        </button>
      ))}
    </div>

    <label className="relative inline-flex items-center">
      <span className="sr-only">Currency</span>
      <select
        value={currency}
        onChange={(e) => onCurrency(e.target.value)}
        className="h-[46px] appearance-none rounded-full bg-card py-2 pl-5 pr-11 text-[15px] font-semibold text-ink ring-1 ring-line outline-none focus-visible:ring-2 focus-visible:ring-flow"
      >
        {CURRENCIES.map((c) => (
          <option key={c.code} value={c.code}>
            {c.code} · {c.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-4 size-4 text-ink/60" />
    </label>
  </div>
);

const PriceLine = ({ plan, billing, currency, inverted }) => {
  if (plan.price === null) {
    return (
      <div>
        <p className="text-[48px] font-medium leading-none tracking-[-0.05em]">Custom</p>
        <p className={cn("mt-2 text-[14px]", inverted ? "text-canvas/75" : "text-ink-soft")}>Volume pricing for 200+ users</p>
      </div>
    );
  }
  if (plan.price === 0) {
    return (
      <div>
        <p className="text-[48px] font-medium leading-none tracking-[-0.05em]">{formatMoney(0, currency)}</p>
        <p className={cn("mt-2 text-[14px]", inverted ? "text-canvas/75" : "text-ink-soft")}>Free forever, no card needed</p>
      </div>
    );
  }
  const per = cyclePrice(plan.price, billing);
  return (
    <div>
      <p className="flex items-baseline gap-2">
        <span key={`${currency}-${billing}`} className="animate-stage-in text-[48px] font-medium leading-none tracking-[-0.05em]">
          {formatMoney(per, currency)}
        </span>
        <span className={cn("text-[14px]", inverted ? "text-canvas/75" : "text-ink-soft")}>/ user / month</span>
      </p>
      <p className={cn("mt-2 text-[14px]", inverted ? "text-canvas/75" : "text-ink-soft")}>
        {billing === "yearly" ? (
          <>
            Billed yearly · <s className="opacity-70">{formatMoney(cyclePrice(plan.price, "monthly"), currency)}</s> monthly
          </>
        ) : (
          "Billed monthly, cancel anytime"
        )}
      </p>
    </div>
  );
};

export const PlanCards = ({ billing, currency }) => (
  <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
    {PLANS.map((plan, i) => {
      const inverted = plan.popular;
      return (
        <Reveal
          key={plan.id}
          delay={i * 80}
          className={cn(
            "relative flex flex-col rounded-[26px] p-7",
            inverted ? "bg-flow text-canvas shadow-[0_30px_70px_-30px_rgba(47,91,255,0.7)]" : "bg-card text-ink ring-1 ring-line",
          )}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-[22px] font-semibold tracking-[-0.02em]">{plan.name}</h3>
            {plan.popular && (
              <span className="rounded-full bg-canvas px-3 py-1 font-label text-[11.5px] uppercase tracking-[0.06em] text-flow">Most popular</span>
            )}
          </div>
          <p className={cn("mt-2 min-h-[48px] text-[15px] leading-snug", inverted ? "text-canvas/85" : "text-ink-soft")}>{plan.tagline}</p>

          <div className="mt-6">
            <PriceLine plan={plan} billing={billing} currency={currency} inverted={inverted} />
          </div>

          <SmartLink
            href={plan.cta.href}
            className={cn(
              "mt-7 rounded-full py-3.5 text-center text-[15px] font-semibold transition-colors",
              inverted ? "bg-canvas text-flow hover:bg-card" : plan.price === null ? "bg-ink text-canvas hover:bg-ink-minor" : "bg-flow text-canvas hover:bg-flow-hover",
            )}
          >
            {plan.cta.label}
          </SmartLink>

          <ul className={cn("mt-7 space-y-3 border-t pt-6", inverted ? "border-canvas/20" : "border-line")}>
            {plan.highlights.map((h) => (
              <li key={h} className="flex items-start gap-3 text-[15px]">
                <Check className={cn("mt-0.5 size-4 shrink-0", inverted ? "text-canvas" : "text-flow")} strokeWidth={3} />
                {h}
              </li>
            ))}
          </ul>
        </Reveal>
      );
    })}
  </div>
);
