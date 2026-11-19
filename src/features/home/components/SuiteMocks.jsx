import React from "react";
import { ArrowUpRight, Bot, Check, Package, TrendingUp } from "lucide-react";
import { cn } from "@lib/cn";
import { Frame, Initials, LivePill } from "./Mockups";

// Mockups for the non-CRM apps in the suite walkthrough. Same "live" mount animation as Mockups.jsx.
const delay = (i, base = 120) => ({ animationDelay: `${base + i * 110}ms` });

/* ---------------------------------------------------------------- Books */

const INVOICES = [
  { no: "INV-1042", co: "Northwind", amt: "$5,200", status: "Paid" },
  { no: "INV-1043", co: "Ferro Supply", amt: "$3,800", status: "Overdue" },
  { no: "INV-1044", co: "Halcyon", amt: "$2,450", status: "Paid" },
  { no: "INV-1045", co: "Quarry & Co", amt: "$7,900", status: "Sent" },
];
const STATUS = {
  Paid: "bg-emerald-50 text-emerald-700",
  Overdue: "bg-red-50 text-red-600",
  Sent: "bg-sky-50 text-sky-700",
};

export const BooksMock = ({ className }) => (
  <Frame title="Books · October" badge={<LivePill>Bank synced</LivePill>} className={className}>
    <div className="grid grid-cols-3 gap-2.5">
      {[
        ["Revenue", "$32,840", "+12%"],
        ["Expenses", "$14,120", "-4%"],
        ["Cash", "$58,300", "+8%"],
      ].map(([label, value, delta], i) => (
        <div key={label} style={delay(i)} className="animate-stage-in rounded-xl bg-paper p-3">
          <p className="text-[11px] text-ink-soft">{label}</p>
          <p className="mt-1 text-[17px] font-semibold tracking-tight text-ink">{value}</p>
          <p className="mt-0.5 flex items-center gap-1 text-[11px] text-emerald-600">
            <TrendingUp className="size-3" /> {delta}
          </p>
        </div>
      ))}
    </div>
    <ul className="mt-4 divide-y divide-black/5 rounded-xl ring-1 ring-black/5">
      {INVOICES.map((inv, i) => (
        <li key={inv.no} style={delay(i + 3)} className="flex animate-stage-in items-center gap-3 px-3 py-2.5 text-[13px]">
          <span className="font-mono text-[11.5px] text-ink-soft">{inv.no}</span>
          <span className="flex-1 truncate text-ink">{inv.co}</span>
          <span className="font-medium text-ink">{inv.amt}</span>
          <span className={cn("w-16 rounded-full py-0.5 text-center text-[11px] font-medium", STATUS[inv.status])}>{inv.status}</span>
        </li>
      ))}
    </ul>
    <div style={delay(8)} className="mt-3 flex animate-stage-in items-center gap-2 rounded-xl bg-flow/10 p-2.5 text-[12px] text-ink">
      <Bot className="size-4 shrink-0" />
      14 bank lines matched to invoices. Ferro reminder drafted.
      <ArrowUpRight className="ml-auto size-3.5" />
    </div>
  </Frame>
);

/* ---------------------------------------------------------------- Inventory */

const STOCK = [
  { sku: "Oak dining table", qty: 6, max: 40, low: true },
  { sku: "Linen chair cover", qty: 128, max: 160 },
  { sku: "Walnut shelf 120cm", qty: 14, max: 60, low: true },
  { sku: "Ceramic table lamp", qty: 72, max: 100 },
  { sku: "Wool rug 2x3m", qty: 31, max: 50 },
];

export const InventoryMock = ({ className }) => (
  <Frame title="Inventory · Main warehouse" badge={<LivePill>3 locations</LivePill>} className={className}>
    <ul className="space-y-3">
      {STOCK.map((item, i) => (
        <li key={item.sku} style={delay(i)} className="animate-stage-in">
          <div className="flex items-center justify-between text-[13px]">
            <span className="flex items-center gap-2 text-ink">
              <Package className="size-3.5 text-ink-soft" />
              {item.sku}
            </span>
            <span className={cn("font-mono text-[12px]", item.low ? "text-red-600" : "text-ink-soft")}>
              {item.qty} in stock
            </span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-paper">
            <div
              className={cn("h-full origin-left animate-progress rounded-full", item.low ? "bg-red-400" : "bg-ink/70")}
              style={{ width: `${(item.qty / item.max) * 100}%`, animationDuration: "900ms", ...delay(i, 300) }}
            />
          </div>
        </li>
      ))}
    </ul>
    <div style={delay(6)} className="mt-4 animate-stage-in rounded-xl p-3 ring-1 ring-black/5">
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-semibold text-ink">PO-2291 · Ferro Supply</p>
        <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700">Draft</span>
      </div>
      <p className="mt-1 text-[12px] text-ink-soft">2 low-stock items · $6,240 · delivery in 5 days</p>
      <div className="mt-2.5 flex gap-2">
        <span className="rounded-full bg-ink px-3 py-1 text-[12px] font-semibold text-canvas">Approve</span>
        <span className="rounded-full px-3 py-1 text-[12px] font-semibold text-ink ring-1 ring-black/10">Edit</span>
      </div>
    </div>
  </Frame>
);

/* ---------------------------------------------------------------- People */

const REQUESTS = [
  { name: "Maya Rahman", what: "Annual leave · 3 days", when: "Nov 24–26" },
  { name: "Tom Reyes", what: "Remote work · 1 day", when: "Nov 21" },
  { name: "Ana Silva", what: "Sick leave · 1 day", when: "Today" },
];

export const PeopleMock = ({ className }) => (
  <Frame title="People · Team overview" badge={<LivePill>Payroll Nov 28</LivePill>} className={className}>
    <div className="grid grid-cols-3 gap-2.5">
      {[
        ["Headcount", "48"],
        ["On leave", "3"],
        ["Open roles", "5"],
      ].map(([label, value], i) => (
        <div key={label} style={delay(i)} className="animate-stage-in rounded-xl bg-paper p-3">
          <p className="text-[11px] text-ink-soft">{label}</p>
          <p className="mt-1 text-[20px] font-semibold tracking-tight text-ink">{value}</p>
        </div>
      ))}
    </div>
    <p className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-ink-soft">Waiting for approval</p>
    <ul className="mt-2 space-y-2">
      {REQUESTS.map((r, i) => (
        <li key={r.name} style={delay(i + 3)} className="flex animate-stage-in items-center gap-3 rounded-xl p-2.5 ring-1 ring-black/5">
          <Initials name={r.name} />
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-semibold text-ink">{r.name}</p>
            <p className="truncate text-[12px] text-ink-soft">
              {r.what} · {r.when}
            </p>
          </div>
          <span className="grid size-7 place-items-center rounded-full bg-emerald-50 text-emerald-600">
            <Check className="size-3.5" strokeWidth={3} />
          </span>
        </li>
      ))}
    </ul>
    <div style={delay(7)} className="mt-3 flex animate-stage-in items-center gap-2 rounded-xl bg-flow/10 p-2.5 text-[12px] text-ink">
      <Bot className="size-4 shrink-0" />
      Roster updated for approved leave. Payroll draft ready.
      <ArrowUpRight className="ml-auto size-3.5" />
    </div>
  </Frame>
);
