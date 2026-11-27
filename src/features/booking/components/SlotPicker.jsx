import React, { useMemo, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Globe } from "lucide-react";
import { cn } from "@lib/cn";
import { formatLongDate, formatMonth, formatTime, monthGrid, offsetLabel, parseKey, zoneName } from "../utils/slots";

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

const addMonth = ({ y, m }, n) => {
  const i = y * 12 + (m - 1) + n;
  return { y: Math.floor(i / 12), m: (i % 12) + 1 };
};
const monthIndex = ({ y, m }) => y * 12 + m;

/**
 * Calendar + time list. `slots` is the Map from buildSlots; the selected day and slot are owned by the parent
 * so they survive moving between steps.
 */
export const SlotPicker = ({ slots, todayKey, tz, tzOptions, onTz, hour12, onHour12, day, onDay, slot, onSlot }) => {
  const keys = useMemo(() => [...slots.keys()].sort(), [slots]);
  const firstMonth = parseKey(todayKey);
  const lastMonth = keys.length ? parseKey(keys[keys.length - 1]) : firstMonth;
  const [view, setView] = useState(() => (day ? parseKey(day) : keys.length ? parseKey(keys[0]) : firstMonth));

  const canPrev = monthIndex(view) > monthIndex(firstMonth);
  const canNext = monthIndex(view) < monthIndex(lastMonth);
  const cells = monthGrid(view.y, view.m);
  const daySlots = (day && slots.get(day)) || [];
  const openCount = (key) => (slots.get(key) ?? []).filter((s) => !s.taken).length;

  return (
    <div className="grid gap-6 md:grid-cols-[1.15fr_1fr] md:gap-8">
      {/* ---------- calendar ---------- */}
      <div>
        <div className="flex items-center justify-between">
          <p className="text-[17px] font-semibold tracking-[-0.01em] text-ink" aria-live="polite">
            {formatMonth(view.y, view.m)}
          </p>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => setView((v) => addMonth(v, -1))}
              disabled={!canPrev}
              aria-label="Previous month"
              className="grid size-9 place-items-center rounded-full text-ink transition-colors hover:bg-line disabled:pointer-events-none disabled:opacity-25"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => setView((v) => addMonth(v, 1))}
              disabled={!canNext}
              aria-label="Next month"
              className="grid size-9 place-items-center rounded-full text-ink transition-colors hover:bg-line disabled:pointer-events-none disabled:opacity-25"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-7 gap-1 text-center" role="grid" aria-label="Choose a day">
          {WEEKDAYS.map((w) => (
            <span key={w} className="pb-2 font-label text-[11px] uppercase tracking-[0.08em] text-ink/40" role="columnheader">
              {w}
            </span>
          ))}
          {cells.map((key, i) => {
            if (!key) return <span key={`pad-${i}`} />;
            const open = openCount(key);
            const selected = key === day;
            const isToday = key === todayKey;
            return (
              <button
                key={key}
                type="button"
                role="gridcell"
                disabled={!open}
                aria-selected={selected}
                aria-label={`${key}${open ? `, ${open} times available` : ", unavailable"}`}
                onClick={() => {
                  onDay(key);
                  onSlot(null);
                }}
                className={cn(
                  "relative mx-auto grid aspect-square w-full max-w-[46px] place-items-center rounded-full text-[15px] font-medium transition-all",
                  selected
                    ? "bg-flow text-canvas shadow-[0_10px_24px_-10px_rgba(47,91,255,0.8)]"
                    : open
                      ? "bg-flow/10 text-flow hover:bg-flow/20"
                      : "text-ink/25",
                )}
              >
                {parseKey(key).d}
                {isToday && <span className={cn("absolute bottom-1.5 size-1 rounded-full", selected ? "bg-canvas" : "bg-ink/40")} />}
              </button>
            );
          })}
        </div>

        {/* timezone */}
        <label className="relative mt-6 flex items-center gap-2 rounded-full bg-canvas py-1 pl-4 pr-2 ring-1 ring-line focus-within:ring-2 focus-within:ring-flow">
          <Globe className="size-4 shrink-0 text-ink/50" />
          <span className="sr-only">Timezone</span>
          <select
            value={tz}
            onChange={(e) => {
              onTz(e.target.value);
              onSlot(null);
            }}
            className="w-full appearance-none bg-transparent py-2 pr-8 text-[14px] font-medium text-ink outline-none"
          >
            {tzOptions.map((z) => (
              <option key={z} value={z}>
                {zoneName(z)} ({offsetLabel(z)})
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-4 size-4 text-ink/50" />
        </label>
      </div>

      {/* ---------- times ---------- */}
      <div className="flex flex-col md:min-h-[320px] md:border-l md:border-line md:pl-8">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[15px] font-semibold text-ink">{daySlots.length ? formatLongDate(daySlots[0].start, tz) : "Choose a day"}</p>
          <div role="radiogroup" aria-label="Time format" className="inline-flex rounded-full bg-canvas p-0.5 ring-1 ring-line">
            {[
              [true, "12h"],
              [false, "24h"],
            ].map(([v, label]) => (
              <button
                key={label}
                type="button"
                role="radio"
                aria-checked={hour12 === v}
                onClick={() => onHour12(v)}
                className={cn(
                  "rounded-full px-2.5 py-1 font-label text-[11.5px] transition-colors",
                  hour12 === v ? "bg-ink text-canvas" : "text-ink/60 hover:text-ink",
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {!day ? (
          <div className="mt-4 grid flex-1 place-items-center rounded-2xl border border-dashed border-line p-6 text-center text-[14px] text-ink/50">
            Pick a highlighted day to see open times.
          </div>
        ) : (
          <ul
            key={`${day}-${tz}`}
            className="mt-4 grid max-h-[340px] animate-stage-in grid-cols-2 gap-2 overflow-y-auto pr-1 sm:grid-cols-3 md:grid-cols-2"
            data-lenis-prevent
            aria-label="Available times"
          >
            {daySlots.map((s) => {
              const on = slot && slot.getTime() === s.start.getTime();
              return (
                <li key={s.start.toISOString()}>
                  <button
                    type="button"
                    disabled={s.taken}
                    aria-pressed={on}
                    onClick={() => onSlot(s.start)}
                    className={cn(
                      "w-full rounded-xl py-3 text-[14.5px] font-semibold tabular-nums transition-all",
                      on
                        ? "bg-ink text-canvas"
                        : s.taken
                          ? "cursor-not-allowed text-ink/25 line-through ring-1 ring-line/60"
                          : "bg-canvas text-ink ring-1 ring-line hover:ring-2 hover:ring-flow",
                    )}
                  >
                    {formatTime(s.start, tz, hour12)}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
