import React, { useId, useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@lib/cn";

/** Accordion of questions; one open at a time. `items` = [{ q, a }]. */
export const Faq = ({ items, defaultOpen = 0, className }) => {
  const [open, setOpen] = useState(defaultOpen);
  const base = useId();

  return (
    <ul className={cn("divide-y divide-line border-y border-line", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={item.q}>
            <h3>
              <button
                type="button"
                id={`${base}-q${i}`}
                aria-expanded={isOpen}
                aria-controls={`${base}-a${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left text-[18px] font-medium text-ink transition-colors hover:text-flow sm:text-[20px]"
              >
                {item.q}
                <span
                  className={cn(
                    "grid size-9 shrink-0 place-items-center rounded-full transition-all duration-300",
                    isOpen ? "rotate-45 bg-flow text-canvas" : "bg-card text-ink ring-1 ring-line",
                  )}
                >
                  <Plus className="size-4" />
                </span>
              </button>
            </h3>
            {/* grid-rows trick animates height without measuring */}
            <div
              id={`${base}-a${i}`}
              role="region"
              aria-labelledby={`${base}-q${i}`}
              className={cn("grid transition-[grid-template-rows] duration-300 ease-out", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
            >
              <div className="overflow-hidden">
                <p className="max-w-3xl pb-6 pr-14 text-[16px] leading-relaxed text-ink-soft sm:text-[17px]">{item.a}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
