import React, { useMemo, useState } from "react";
import { ArrowRight, Check, RotateCcw, Sparkles } from "lucide-react";
import { cn } from "@lib/cn";
import { APP_GROUPS, ALL_APPS } from "@/constants/apps";
import { AppTile } from "@/components/AppTile";
import { SmartLink } from "@/components/SmartLink";
import { APP_PRICES, PLANS } from "../constants/pricing";
import { cyclePrice, formatMoney } from "../utils/money";

const MAX_USERS = 500;
const DEFAULT_APPS = ["crm", "books", "inventory"];
const STANDARD = PLANS.find((p) => p.id === "standard");
const FREE_LIMITS = { users: 3, apps: 2 };

const clampUsers = (n) => Math.min(MAX_USERS, Math.max(1, Math.round(Number(n) || 1)));

/**
 * Build-your-own suite: pick apps and a team size, see the monthly total, and get told
 * when the Free plan or the all-in-one Standard plan is the better deal.
 */
export const SuiteCalculator = ({ billing, currency }) => {
  const [selected, setSelected] = useState(DEFAULT_APPS);
  const [users, setUsers] = useState(10);

  const toggle = (id) => setSelected((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  const quote = useMemo(() => {
    const lines = ALL_APPS.filter((a) => selected.includes(a.id)).map((a) => ({
      ...a,
      perUser: cyclePrice(APP_PRICES[a.id], billing),
    }));
    const perUser = lines.reduce((sum, l) => sum + l.perUser, 0);
    const monthly = perUser * users;
    const standardMonthly = cyclePrice(STANDARD.price, billing) * users;
    return {
      lines,
      monthly,
      yearly: monthly * 12,
      standardMonthly,
      fitsFree: users <= FREE_LIMITS.users && lines.length <= FREE_LIMITS.apps && lines.length > 0,
    };
  }, [selected, users, billing]);

  const contactHref = `/contact?${new URLSearchParams({
    topic: "sales",
    apps: selected.join(","),
    users: String(users),
    billing,
    currency,
  })}`;

  let advice;
  if (quote.lines.length === 0) {
    advice = { tone: "muted", text: "Pick at least one app to see your price." };
  } else if (quote.fitsFree) {
    advice = { tone: "good", text: `This fits the Free plan: up to ${FREE_LIMITS.users} users and ${FREE_LIMITS.apps} apps cost nothing.` };
  } else if (quote.monthly > quote.standardMonthly) {
    advice = {
      tone: "switch",
      text: `Standard gives you all ${ALL_APPS.length} apps for ${formatMoney(quote.standardMonthly, currency)}/month, which is ${formatMoney(
        quote.monthly - quote.standardMonthly,
        currency,
      )} less.`,
    };
  } else {
    advice = {
      tone: "good",
      text: `Paying per app saves you ${formatMoney(quote.standardMonthly - quote.monthly, currency)}/month compared with Standard.`,
    };
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
      {/* ---------- picker ---------- */}
      <div className="rounded-[26px] bg-card p-6 ring-1 ring-line sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-[22px] font-semibold tracking-[-0.02em] text-ink">1. Pick your apps</h3>
          <button
            type="button"
            onClick={() => {
              setSelected(DEFAULT_APPS);
              setUsers(10);
            }}
            className="flex items-center gap-1.5 text-[14px] font-semibold text-ink-soft hover:text-ink"
          >
            <RotateCcw className="size-4" /> Reset
          </button>
        </div>

        <div className="mt-6 space-y-5">
          {APP_GROUPS.map((group) => (
            <fieldset key={group.id}>
              <legend className="mb-2 font-label text-[11.5px] uppercase tracking-[0.12em] text-ink/50">{group.label}</legend>
              <div className="flex flex-wrap gap-2">
                {group.apps.map((app) => {
                  const on = selected.includes(app.id);
                  return (
                    <button
                      key={app.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggle(app.id)}
                      className={cn(
                        "flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-3.5 text-[14px] font-medium transition-all",
                        on ? "bg-flow text-canvas" : "bg-canvas text-ink ring-1 ring-line hover:ring-flow/40",
                      )}
                    >
                      {on ? (
                        <span className="grid size-7 place-items-center rounded-full bg-canvas/20">
                          <Check className="size-3.5" strokeWidth={3} />
                        </span>
                      ) : (
                        <AppTile app={app} className="size-7" />
                      )}
                      {app.name}
                      <span className={cn("text-[12px]", on ? "text-canvas/75" : "text-ink/45")}>
                        {formatMoney(cyclePrice(APP_PRICES[app.id], billing), currency)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>

        <div className="mt-8 border-t border-line pt-6">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-[22px] font-semibold tracking-[-0.02em] text-ink">
              <label htmlFor="calc-users">2. How many users?</label>
            </h3>
            <input
              id="calc-users"
              type="number"
              min={1}
              max={MAX_USERS}
              value={users}
              onChange={(e) => setUsers(clampUsers(e.target.value))}
              className="w-24 rounded-xl bg-canvas px-3 py-2 text-right text-[17px] font-semibold text-ink ring-1 ring-line outline-none focus:ring-2 focus:ring-flow"
            />
          </div>
          <input
            type="range"
            min={1}
            max={MAX_USERS}
            value={users}
            onChange={(e) => setUsers(clampUsers(e.target.value))}
            aria-label="Number of users"
            className="mt-5 w-full accent-[var(--color-flow)]"
          />
          <div className="mt-1 flex justify-between font-label text-[12px] text-ink/45">
            <span>1</span>
            <span>{MAX_USERS}+</span>
          </div>
        </div>
      </div>

      {/* ---------- summary ---------- */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-[26px] bg-dark p-6 text-canvas sm:p-8" aria-live="polite">
          <p className="font-label text-[12px] uppercase tracking-[0.1em] text-muted">Your suite</p>
          <p className="mt-3 flex items-baseline gap-2">
            <span key={`${quote.monthly}-${currency}`} className="animate-stage-in text-[52px] font-medium leading-none tracking-[-0.05em]">
              {formatMoney(quote.monthly, currency)}
            </span>
            <span className="text-[15px] text-muted">/ month</span>
          </p>
          <p className="mt-2 text-[14px] text-muted">
            {users} {users === 1 ? "user" : "users"} · {quote.lines.length} {quote.lines.length === 1 ? "app" : "apps"} ·{" "}
            {billing === "yearly" ? `${formatMoney(quote.yearly, currency)} billed yearly` : "billed monthly"}
          </p>

          <ul className="mt-6 max-h-56 space-y-2 overflow-y-auto border-t border-canvas/10 pt-5" data-lenis-prevent>
            {quote.lines.length === 0 && <li className="text-[14px] text-muted">No apps selected yet.</li>}
            {quote.lines.map((l) => (
              <li key={l.id} className="flex items-center justify-between gap-3 text-[14px]">
                <span className="flex items-center gap-2">
                  <l.icon className="size-4 text-flow" />
                  {l.name}
                </span>
                <span className="tabular-nums text-canvas/80">
                  {formatMoney(l.perUser, currency)} × {users} = {formatMoney(l.perUser * users, currency)}
                </span>
              </li>
            ))}
          </ul>

          {advice && (
            <p
              className={cn(
                "mt-6 flex gap-2.5 rounded-2xl p-4 text-[14px] leading-snug",
                advice.tone === "switch" ? "bg-flow text-canvas" : advice.tone === "good" ? "bg-canvas/10 text-canvas" : "bg-canvas/5 text-muted",
              )}
            >
              <Sparkles className="mt-0.5 size-4 shrink-0" />
              {advice.text}
            </p>
          )}

          <SmartLink
            href={contactHref}
            className="mt-6 flex items-center justify-center gap-2 rounded-full bg-canvas py-3.5 text-[15px] font-semibold text-ink transition-colors hover:bg-card"
          >
            Get this quote <ArrowRight className="size-4" />
          </SmartLink>
          <p className="mt-3 text-center text-[12.5px] text-muted">Prices exclude tax. Change apps or users anytime.</p>
        </div>
      </div>
    </div>
  );
};
