import React from "react";
import { Activity, BarChart3, Code, MessageSquare, Phone, Radar, RefreshCw } from "lucide-react";
import { cn } from "@lib/cn";
import { Card } from "@lib/turtle-ui/components/card/Card";
import { Tag } from "@lib/turtle-ui/components/tag/Tag";
import { EVERYTHING } from "../constants/home";
import { Reveal } from "./Reveal";

/* small visuals for each card */

const Dialer = () => (
  <div className="flex items-center gap-4 rounded-2xl bg-card p-4 shadow-sm">
    <span className="grid size-10 place-items-center rounded-full bg-emerald-500 text-canvas">
      <Phone className="size-4" />
    </span>
    <div className="flex h-8 flex-1 items-center gap-[3px]">
      {Array.from({ length: 32 }, (_, i) => (
        <span
          key={i}
          className="w-[3px] flex-1 origin-center rounded-full bg-ink/70 animate-[eq_1.1s_ease-in-out_infinite]"
          style={{ height: `${30 + ((i * 37) % 70)}%`, animationDelay: `${(i % 8) * 90}ms` }}
        />
      ))}
    </div>
    <span className="font-mono text-sm text-ink">04:12</span>
  </div>
);

const Chat = () => (
  <div className="space-y-2 text-[13px]">
    <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-ink px-3 py-2 text-canvas">Who still owes us money?</p>
    <p className="w-fit max-w-[90%] rounded-2xl rounded-bl-md bg-card px-3 py-2 text-ink shadow-sm">
      12 customers, $18.4k overdue. Ferro is 30 days late.
    </p>
  </div>
);

const SIGNALS = [
  ["Ferro paid INV-1043 · $3,800", "green"],
  ["Oak dining table: 6 left", "yellow"],
  ["Maya requested 3 days leave", "blue"],
];

const Signals = () => (
  <div className="space-y-2">
    {SIGNALS.map(([text, variant]) => (
      <div key={text} className="flex items-center justify-between gap-2 rounded-xl bg-card px-3 py-2 text-[13px] text-ink shadow-sm">
        <span className="truncate">{text}</span>
        <Tag variant={variant} size="sm" className="shrink-0 rounded-full">
          new
        </Tag>
      </div>
    ))}
  </div>
);

const Sync = () => (
  <div className="flex items-center justify-center gap-3">
    {["Your old tools", "Dobis"].map((label, i) => (
      <React.Fragment key={label}>
        {i === 1 && <RefreshCw className="size-5 animate-[spin_4s_linear_infinite] text-ink-soft" />}
        <span className="rounded-xl bg-card px-4 py-3 text-sm font-semibold text-ink shadow-sm">{label}</span>
      </React.Fragment>
    ))}
  </div>
);

const Bars = () => (
  <div className="flex h-24 items-end gap-2">
    {[38, 54, 46, 70, 62, 84, 96].map((h, i) => (
      <span
        key={h}
        className={cn("flex-1 rounded-t-md", i === 6 ? "bg-ink" : "bg-ink/20")}
        style={{ height: `${h}%` }}
      />
    ))}
  </div>
);

const Snippet = () => (
  <pre className="overflow-hidden rounded-xl bg-ink p-3.5 font-mono text-[12px] leading-relaxed text-canvas/80">
    <span className="text-dot">POST</span> /v1/books/invoices{"\n"}
    {"{ "}
    <span className="text-canvas">"customer"</span>: "Northwind",{"\n"}
    {"  "}
    <span className="text-canvas">"total"</span>: 5200 {"}"}
  </pre>
);

const ITEMS = [
  { icon: Phone, title: "Calls & meetings built in", body: "Call customers, suppliers or candidates from any app. Every call is recorded, summarised and logged.", visual: Dialer, wide: true },
  { icon: MessageSquare, title: "Ask Dobis anything", body: "Get answers from sales, finance or stock data in plain words, in the app or in Slack and Teams.", visual: Chat },
  { icon: Radar, title: "Live alerts", body: "Payments, low stock and approvals surface the moment they happen, in whichever app you're in.", visual: Signals },
  { icon: RefreshCw, title: "Easy migration", body: "Import from spreadsheets, QuickBooks, Tally, Salesforce and more, with guided setup.", visual: Sync },
  { icon: BarChart3, title: "Cross-app reports", body: "Profit by customer, stock by store, cost per project. Dashboards across every app.", visual: Bars },
  { icon: Activity, title: "Roles & permissions", body: "One login for everyone, with access set per app, team and branch. SSO and audit logs included.", visual: null },
  { icon: Code, title: "Open API & marketplace", body: "Connect anything with REST APIs, webhooks and 300+ ready-made integrations.", visual: Snippet, wide: true },
];

export const Everything = () => (
  <section className="px-4 pb-24 sm:px-8 sm:pb-32">
    <div className="mx-auto max-w-[1240px]">
      <div className="max-w-2xl">
        <Reveal as="h2" className="font-display text-4xl font-extrabold tracking-[-0.04em] text-ink sm:text-[56px] sm:leading-[1.05]">
          {EVERYTHING.title}
        </Reveal>
        <Reveal as="p" delay={80} className="mt-5 text-lg text-ink-soft">
          {EVERYTHING.subtitle}
        </Reveal>
      </div>

      <div className="mt-14 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {ITEMS.map(({ icon: Icon, title, body, visual: Visual, wide }, i) => (
          <Reveal key={title} delay={(i % 3) * 90} className={cn("min-w-0", wide && "lg:col-span-2")}>
            <Card className="group flex cursor-default h-full flex-col gap-6 rounded-[26px] border-0 bg-line p-6 shadow-none transition-all duration-500 hover:-translate-y-1 hover:bg-line-cool hover:shadow-[0_30px_60px_-30px_rgba(35,35,35,0.3)]">
              <div>
                <span className="grid size-10 place-items-center rounded-xl bg-card text-ink shadow-sm transition-transform duration-500 group-hover:rotate-[-8deg]">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 text-xl font-semibold text-ink">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{body}</p>
              </div>
              {Visual && (
                <div className="mt-auto">
                  <Visual />
                </div>
              )}
            </Card>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
