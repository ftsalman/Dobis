import React from "react";
import { ArrowUpRight, Bot, Check, Clock, Hash, Sparkles, Zap } from "lucide-react";
import { cn } from "@lib/cn";
import { Button } from "@lib/turtle-ui/components/button/Button";
import { Tag } from "@lib/turtle-ui/components/tag/Tag";
import { AGENT_MOCK, CONTACT_MOCK, PIPELINE_MOCK, SEQUENCE_MOCK } from "../constants/mockups";

// Hand-built product mockups. Each one plays a short "live" animation when it mounts,
// so re-keying the component replays it (the hero does that on every tab change).
// Buttons and tags are turtle-ui components; Tailwind classes sit in a later cascade
// layer than turtle-ui's component classes, so the overrides below win.

export const Frame = ({ title, badge, children, className }) => (
  <div
    className={cn(
      "flex h-full flex-col overflow-hidden rounded-[22px] bg-card text-left shadow-[0_24px_60px_-28px_rgba(35,35,35,0.35)] ring-1 ring-black/5",
      className,
    )}
  >
    <div className="flex items-center justify-between border-b border-black/5 px-5 py-3.5">
      <div className="flex items-center gap-2">
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-line" />
          <span className="size-2.5 rounded-full bg-line" />
          <span className="size-2.5 rounded-full bg-line" />
        </span>
        <span className="ml-2 text-sm font-semibold text-ink">{title}</span>
      </div>
      {badge}
    </div>
    <div className="relative flex-1 overflow-hidden p-4 sm:p-5">{children}</div>
  </div>
);

export const LivePill = ({ children = "Live" }) => (
  <span className="flex items-center gap-1.5 rounded-full bg-paper px-2.5 py-1 text-xs font-medium text-ink-soft">
    <span className="relative flex size-2">
      <span className="absolute inset-0 animate-ping-slow rounded-full bg-emerald-400" />
      <span className="relative size-2 rounded-full bg-emerald-500" />
    </span>
    {children}
  </span>
);

export const Initials = ({ name, className }) => (
  <span
    className={cn(
      "grid size-7 shrink-0 place-items-center rounded-full bg-hero text-[11px] font-bold text-ink",
      className,
    )}
  >
    {name
      .split(" ")
      .map((p) => p[0])
      .join("")}
  </span>
);

/* turtle-ui Button, sized and toned for the small in-mock actions. */
const MOCK_BUTTON_TONES = {
  primary: "border-ink bg-ink text-canvas hover:border-ink hover:bg-ink focus:border-ink focus:ring-ink/15",
  secondary: "border border-black/10 bg-card text-ink hover:bg-paper focus:border-black/20 focus:ring-black/5",
};

const MockButton = ({ tone = "primary", className, children }) => (
  <Button
    size="xs"
    variant={tone}
    tabIndex={-1}
    className={cn("h-7 rounded-full px-3 text-[11px] font-semibold", MOCK_BUTTON_TONES[tone], className)}
  >
    {children}
  </Button>
);

const step = (i, base = 120) => ({ animationDelay: `${base + i * 110}ms` });

/* ---------------------------------------------------------------- Pipeline */

export const PipelineMock = ({ className }) => {
  const { title, badge, forecastLabel, forecast, delta, columns } = PIPELINE_MOCK;
  return (
    <Frame title={title} badge={<LivePill>{badge}</LivePill>} className={className}>
      <div className="mb-4 flex items-end justify-between">
        <div>
          <p className="text-xs text-ink-soft">{forecastLabel}</p>
          <p className="font-display text-2xl font-extrabold tracking-tight text-ink">{forecast}</p>
        </div>
        <Tag
          variant="green"
          size="sm"
          showDot={false}
          className="rounded-full bg-emerald-50 px-2.5 font-semibold text-emerald-700"
        >
          {delta}
        </Tag>
      </div>
      <div className="grid grid-cols-3 gap-2.5">
        {columns.map((col, c) => (
          <div key={col.name} className="rounded-2xl bg-paper p-2">
            <div className="flex items-center justify-between px-1.5 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
              {col.name}
              <span className="font-mono normal-case tracking-normal">{col.total}</span>
            </div>
            <div className="space-y-2">
              {col.deals.map((d, i) => (
                <div
                  key={d.co}
                  style={step(c * 2 + i)}
                  className={cn(
                    "animate-stage-in rounded-xl bg-card p-2.5 shadow-sm ring-1 ring-black/5",
                    d.moved && "ring-2 ring-dot",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <p className="truncate text-[13px] font-semibold text-ink">{d.co}</p>
                    {d.tag && (
                      <Tag
                        size="sm"
                        showDot={false}
                        className="rounded-md border-0 bg-hero px-1.5 py-0 text-[10px] font-semibold text-ink"
                      >
                        {d.tag}
                      </Tag>
                    )}
                  </div>
                  <p className="mt-0.5 font-mono text-xs text-ink-soft">{d.amt}</p>
                  <div className="mt-2 flex items-center gap-1.5">
                    <Initials name={d.who} className="size-5 text-[9px]" />
                    <span className="truncate text-[11px] text-ink-soft">{d.who}</span>
                  </div>
                  {d.warn && (
                    <p className="mt-2 flex items-center gap-1 rounded-md bg-orange-50 px-1.5 py-1 text-[10px] font-medium text-orange-700">
                      <Clock className="size-3" /> No reply in 6 days
                    </p>
                  )}
                  {d.moved && (
                    <p className="mt-2 flex items-center gap-1 rounded-md bg-flow/10 px-1.5 py-1 text-[10px] font-medium text-ink">
                      <Sparkles className="size-3" /> Moved after call
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Frame>
  );
};

/* --------------------------------------------------------------- Sequences */

export const SequenceMock = ({ className }) => {
  const { title, badge, steps, draft } = SEQUENCE_MOCK;
  return (
    <Frame title={title} badge={<LivePill>{badge}</LivePill>} className={className}>
      <div className="grid h-full gap-3 md:grid-cols-[0.9fr_1.1fr]">
        <ol className="space-y-2">
          {steps.map((s, i) => (
            <li
              key={s.label}
              style={step(i)}
              className={cn(
                "flex animate-stage-in items-center gap-3 rounded-xl p-2.5",
                s.active ? "bg-card shadow-sm ring-2 ring-dot" : "bg-paper",
              )}
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-card text-ink ring-1 ring-black/5">
                <s.icon className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-ink">{s.label}</p>
                <p className="text-[11px] text-ink-soft">{s.state}</p>
              </div>
              <span className="font-mono text-[10px] text-ink-soft">{s.day}</span>
            </li>
          ))}
        </ol>
        <div style={step(4)} className="hidden animate-stage-in rounded-2xl bg-paper p-3.5 md:block">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
            <Sparkles className="size-3.5" /> AI draft
          </p>
          <div className="mt-2.5 rounded-xl bg-card p-3 text-[13px] leading-relaxed text-ink shadow-sm">
            <p className="font-semibold">{draft.subject}</p>
            <p className="mt-2 text-ink-soft">
              {draft.body}
              <span className="ml-0.5 inline-block h-3.5 w-[2px] translate-y-0.5 animate-blink bg-ink" />
            </p>
          </div>
          <div className="mt-3 flex gap-2">
            <MockButton tone="primary">{draft.approve}</MockButton>
            <MockButton tone="secondary">{draft.rewrite}</MockButton>
          </div>
        </div>
      </div>
    </Frame>
  );
};

/* ------------------------------------------------------------------ Agents */

export const AgentMock = ({ className }) => {
  const { title, badge, trigger, steps, channel, message } = AGENT_MOCK;
  return (
    <Frame title={title} badge={<LivePill>{badge}</LivePill>} className={className}>
      <div style={step(0)} className="animate-stage-in rounded-2xl bg-paper p-3.5">
        <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
          <Zap className="size-3.5" /> Trigger
        </p>
        <p className="mt-1.5 text-[14px] font-semibold text-ink">{trigger}</p>
      </div>
      <div className="ml-6 h-4 w-px bg-black/10" />
      <ol className="space-y-2">
        {steps.map((s, i) => (
          <li
            key={s.label}
            style={step(i + 1, 220)}
            className="flex animate-stage-in items-center gap-3 rounded-xl bg-card p-3 ring-1 ring-black/5"
          >
            <span className="font-mono text-[11px] text-ink-soft">0{i + 1}</span>
            <p className="flex-1 text-[13px] text-ink">{s.label}</p>
            {s.done && (
              <span className="grid size-5 place-items-center rounded-full bg-emerald-500 text-canvas">
                <Check className="size-3" strokeWidth={3} />
              </span>
            )}
            {s.running && (
              <span className="size-4 animate-spin rounded-full border-2 border-hero border-t-ink" />
            )}
          </li>
        ))}
      </ol>
      <div style={step(5)} className="mt-3 flex animate-stage-in items-start gap-3 rounded-2xl bg-flow/10 p-3.5">
        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-card">
          <Hash className="size-4 text-ink" />
        </span>
        <div className="text-[13px] text-ink">
          <p className="font-semibold">{channel}</p>
          <p className="text-ink-soft">{message}</p>
        </div>
      </div>
    </Frame>
  );
};

/* ---------------------------------------------------------------- Contacts */

export const ContactsMock = ({ className }) => {
  const { title, badge, name, email, fields, timeline, insight } = CONTACT_MOCK;
  return (
    <Frame title={title} badge={<LivePill>{badge}</LivePill>} className={className}>
      <div className="grid h-full gap-3 md:grid-cols-2">
        <div style={step(0)} className="animate-stage-in rounded-2xl bg-paper p-3.5">
          <div className="flex items-center gap-3">
            <Initials name={name} className="size-11 bg-ink text-sm text-canvas" />
            <div>
              <p className="text-[15px] font-semibold text-ink">{name}</p>
              <p className="text-xs text-ink-soft">{email}</p>
            </div>
          </div>
          <dl className="mt-4 space-y-2">
            {fields.map(([k, v], i) => (
              <div
                key={k}
                style={step(i + 1, 260)}
                className="flex animate-stage-in items-center justify-between rounded-lg bg-card px-2.5 py-2 text-xs"
              >
                <dt className="text-ink-soft">{k}</dt>
                <dd className="font-medium text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="hidden md:block">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-ink-soft">Timeline</p>
          <ol className="relative space-y-3 before:absolute before:bottom-2 before:left-4 before:top-2 before:w-px before:bg-black/10">
            {timeline.map((t, i) => (
              <li key={t.text} style={step(i + 2, 300)} className="relative flex animate-stage-in items-center gap-3">
                <span className="relative grid size-8 place-items-center rounded-full bg-card ring-1 ring-black/10">
                  <t.icon className="size-3.5 text-ink" />
                </span>
                <div>
                  <p className="text-[13px] text-ink">{t.text}</p>
                  <p className="text-[11px] text-ink-soft">{t.time}</p>
                </div>
              </li>
            ))}
          </ol>
          <div
            style={step(6)}
            className="mt-4 flex animate-stage-in items-center gap-2 rounded-xl bg-flow/10 p-2.5 text-[12px] text-ink"
          >
            <Bot className="size-4 shrink-0" />
            {insight}
            <ArrowUpRight className="ml-auto size-3.5" />
          </div>
        </div>
      </div>
    </Frame>
  );
};

export const MOCKS = {
  pipeline: PipelineMock,
  sequences: SequenceMock,
  agents: AgentMock,
  contacts: ContactsMock,
};
