import React, { useState } from "react";
import { Check, ChevronDown, Minus } from "lucide-react";
import { cn } from "@lib/cn";
import { COMPARISON, PLANS, PLAN_IDS } from "../constants/pricing";

const PLAN_BY_ID = Object.fromEntries(PLANS.map((p) => [p.id, p]));
const POPULAR = PLAN_IDS.indexOf(PLANS.find((p) => p.popular)?.id);

const Cell = ({ value }) => {
  if (value === true) return <Check className="mx-auto size-5 text-flow" strokeWidth={2.5} aria-label="Included" />;
  if (value === false) return <Minus className="mx-auto size-4 text-ink/25" aria-label="Not included" />;
  return <span className="text-[14px] text-ink">{value}</span>;
};

/** Full feature comparison; groups collapse, and the table scrolls sideways on small screens. */
export const CompareTable = () => {
  const [open, setOpen] = useState(() => new Set(COMPARISON.map((g) => g.group)));
  const allOpen = open.size === COMPARISON.length;
  const toggle = (g) =>
    setOpen((cur) => {
      const next = new Set(cur);
      if (next.has(g)) next.delete(g);
      else next.add(g);
      return next;
    });

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button
          type="button"
          onClick={() => setOpen(allOpen ? new Set() : new Set(COMPARISON.map((g) => g.group)))}
          className="text-[14px] font-semibold text-flow hover:text-flow-hover"
        >
          {allOpen ? "Collapse all" : "Expand all"}
        </button>
      </div>

      <div className="overflow-x-auto rounded-[26px] bg-card ring-1 ring-line" data-lenis-prevent-horizontal>
        <table className="w-full min-w-[760px] border-collapse text-left">
          <caption className="sr-only">Feature comparison across plans</caption>
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="sticky left-0 z-10 w-[32%] bg-card p-5 text-[14px] font-medium text-ink-soft">
                Features
              </th>
              {PLAN_IDS.map((id, i) => (
                <th
                  key={id}
                  scope="col"
                  className={cn("p-5 text-center text-[17px] font-semibold text-ink", i === POPULAR && "bg-flow/[0.06]")}
                >
                  {PLAN_BY_ID[id].name}
                  {i === POPULAR && <span className="mt-1 block font-mono text-[11px] font-normal uppercase tracking-[0.06em] text-flow">Most popular</span>}
                </th>
              ))}
            </tr>
          </thead>
          {COMPARISON.map(({ group, rows }) => {
            const isOpen = open.has(group);
            return (
              <tbody key={group}>
                <tr className="border-b border-line bg-canvas/60">
                  <th scope="colgroup" colSpan={PLAN_IDS.length + 1} className="p-0">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => toggle(group)}
                      className="sticky left-0 flex w-full items-center gap-2 px-5 py-3.5 text-left font-mono text-[12.5px] uppercase tracking-[0.1em] text-ink/70 hover:text-ink"
                    >
                      <ChevronDown className={cn("size-4 transition-transform", !isOpen && "-rotate-90")} />
                      {group}
                    </button>
                  </th>
                </tr>
                {isOpen &&
                  rows.map(([label, values]) => (
                    <tr key={label} className="border-b border-line last:border-0">
                      <th scope="row" className="sticky left-0 z-10 bg-card px-5 py-4 text-[15px] font-normal text-ink">
                        {label}
                      </th>
                      {values.map((v, i) => (
                        <td key={PLAN_IDS[i]} className={cn("px-5 py-4 text-center", i === POPULAR && "bg-flow/[0.06]")}>
                          <Cell value={v} />
                        </td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
};
