import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@lib/cn";

export default function Pricing({ onBuildSuite }) {
  const [annual, setAnnual] = useState(true);
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-5 py-24 lg:px-10">
      <Reveal>
        <div className="text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
            Room to grow
          </p>
          <h2 className="text-4xl font-medium tracking-[-1.8px] md:text-5xl">
            Your next chapter starts here.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-muted">
            A flexible pricing concept for a growing business.
            <br />
            All prices below are illustrative and subject to product validation.
          </p>
          <div className="mt-7 inline-flex rounded-full bg-paper p-1">
            <button
              aria-pressed={!annual}
              onClick={() => setAnnual(false)}
              className={cn(
                "rounded-full px-5 py-2.5 text-xs font-medium",
                !annual && "bg-white shadow-sm",
              )}
            >
              Monthly
            </button>
            <button
              aria-pressed={annual}
              onClick={() => setAnnual(true)}
              className={cn(
                "flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-medium",
                annual && "bg-white shadow-sm",
              )}
            >
              Yearly <span className="text-brand-700">Save 20%</span>
            </button>
          </div>
        </div>
      </Reveal>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {[
          {
            name: "Essentials",
            subtitle: "A focused start.",
            monthly: 15,
            annual: 12,
            features: [
              "Choose one core product",
              "Your own team workspace",
              "Core reports and dashboards",
              "Self-service knowledge base",
            ],
            cta: "Choose your product",
          },
          {
            name: "Dobis One",
            subtitle: "Everything, working together.",
            monthly: 49,
            annual: 39.2,
            features: [
              "All six products in one suite",
              "Connected customer context",
              "Cross-team workflows",
              "Shared reporting and insights",
            ],
            cta: "Build your suite",
            featured: true,
          },
          {
            name: "Enterprise",
            subtitle: "For your bigger picture.",
            features: [
              "A tailored implementation plan",
              "Custom integration planning",
              "Role and access design",
              "Dedicated onboarding strategy",
            ],
            cta: "Explore a tailored suite",
          },
        ].map((plan) => (
          <article
            key={plan.name}
            className={cn(
              "relative flex flex-col rounded-2xl border p-7",
              plan.featured
                ? "border-brand-600 bg-brand-50"
                : "border-line bg-white",
            )}
          >
            {plan.featured && (
              <span className="absolute -top-3 left-6 rounded-full bg-brand-600 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                The connected suite
              </span>
            )}
            <h3 className="text-xl font-semibold">{plan.name}</h3>
            <p className="mt-2 text-sm text-muted">{plan.subtitle}</p>
            <div className="mb-6 mt-7">
              <p className="text-4xl font-medium tracking-tight">
                {plan.monthly
                  ? `$${annual ? plan.annual.toFixed(plan.annual % 1 ? 2 : 0) : plan.monthly}`
                  : "Let’s talk"}
              </p>
              <p className="mt-2 min-h-10 text-xs leading-5 text-muted">
                {plan.monthly ? (
                  <>
                    per user / month
                    <br />
                    {annual
                      ? `$${(plan.annual * 12).toFixed(2)} billed yearly per user`
                      : "Billed monthly per user"}
                  </>
                ) : (
                  "A plan shaped around your team."
                )}
              </p>
            </div>
            <ul className="mb-8 grid gap-4">
              {plan.features.map((feature) => (
                <li key={feature} className="flex gap-2.5 text-sm">
                  <Check className="size-4 shrink-0 text-brand-600" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              onClick={onBuildSuite}
              variant={plan.featured ? "primary" : "secondary"}
              className="mt-auto w-full"
            >
              {plan.cta}
              <ArrowUpRight className="size-4" />
            </Button>
          </article>
        ))}
      </div>
    </section>
  );
}
