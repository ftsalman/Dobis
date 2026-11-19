import React from "react";
import { ArrowUpRight, CalendarPlus, Check } from "lucide-react";
import { cn } from "@lib/cn";
import { ADDONS } from "@/constants/apps";
import { Reveal } from "@/components/Reveal";
import { SmartLink } from "@/components/SmartLink";
import { formatMoney } from "../utils/money";

const hostOf = (url) => new URL(url).host.replace(/^www\./, "");

/** Partner products sold alongside any plan; each links to its own site and can be added to a demo. */
export const AddOns = ({ currency }) => (
  <div className="grid gap-3 lg:grid-cols-3">
    {ADDONS.map((addon, i) => (
      <Reveal key={addon.id} delay={i * 80} className="flex flex-col rounded-[26px] bg-card p-7 ring-1 ring-line transition-shadow hover:shadow-[0_30px_60px_-40px_rgba(35,35,35,0.5)]">
        <div className="flex items-start justify-between gap-3">
          <span className={cn("grid size-12 place-items-center rounded-2xl", addon.tone)}>
            <addon.icon className="size-6" />
          </span>
          <span className="rounded-full bg-canvas px-3 py-1 font-mono text-[11px] uppercase tracking-[0.06em] text-ink/60 ring-1 ring-line">Add-on</span>
        </div>

        <h3 className="mt-5 text-[22px] font-semibold tracking-[-0.02em] text-ink">{addon.name}</h3>
        <p className="mt-0.5 font-mono text-[12px] text-ink/50">{hostOf(addon.href)}</p>
        <p className="mt-3 text-[15px] leading-snug text-ink-soft">{addon.description}</p>

        <div className="mt-5">
          {addon.price === null ? (
            <>
              <p className="text-[28px] font-medium leading-none tracking-[-0.04em] text-ink">Priced separately</p>
              <p className="mt-2 text-[14px] text-ink-soft">Works with any Dobis plan, including Free</p>
            </>
          ) : (
            <p className="flex items-baseline gap-2">
              <span className="text-[40px] font-medium leading-none tracking-[-0.05em] text-ink">{formatMoney(addon.price, currency)}</span>
              <span className="text-[14px] text-ink-soft">/ month</span>
            </p>
          )}
        </div>

        <ul className="mt-6 flex-1 space-y-2.5 border-t border-line pt-5">
          {addon.features.map((f) => (
            <li key={f} className="flex items-start gap-3 text-[14.5px] text-ink">
              <Check className="mt-0.5 size-4 shrink-0 text-flow" strokeWidth={3} />
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-7 grid grid-cols-2 gap-2">
          <a
            href={addon.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 rounded-full bg-ink py-3 text-[14.5px] font-semibold text-canvas transition-colors hover:bg-ink-minor"
          >
            Visit site <ArrowUpRight className="size-4" />
          </a>
          <SmartLink
            href={`/book-demo?apps=${addon.id}`}
            className="flex items-center justify-center gap-1.5 rounded-full bg-canvas py-3 text-[14.5px] font-semibold text-ink ring-1 ring-line transition-colors hover:bg-line"
          >
            <CalendarPlus className="size-4" /> Demo it
          </SmartLink>
        </div>
      </Reveal>
    ))}
  </div>
);
