// Data for the hand-built product mockups (pipeline, sequences, agents, contacts).
// NOTE: companies, people and figures here are PLACEHOLDERS - replace them before launch.
import { Calendar, Mail, MessageSquare, Phone } from "lucide-react";

export const PIPELINE_MOCK = {
  title: "Pipeline · Q4",
  badge: "Auto-synced",
  forecastLabel: "Weighted forecast",
  forecast: "$412,600",
  delta: "+18% vs. plan",
  columns: [
    {
      name: "Qualified",
      total: "$84k",
      deals: [
        { co: "Oakline", amt: "$24k", who: "Sam Ortiz", tag: "New" },
        { co: "Ferro", amt: "$60k", who: "Lena Park" },
      ],
    },
    {
      name: "Proposal",
      total: "$142k",
      deals: [
        { co: "Meridian", amt: "$52k", who: "Tom Reyes", tag: "Hot" },
        { co: "Quarry", amt: "$90k", who: "Ana Silva", moved: true },
      ],
    },
    {
      name: "Closing",
      total: "$186k",
      deals: [
        { co: "Northwind", amt: "$118k", who: "Jo Kim", warn: true },
        { co: "Atlas Labs", amt: "$68k", who: "Ravi Das" },
      ],
    },
  ],
};

export const SEQUENCE_MOCK = {
  title: "Sequence · Series A founders",
  badge: "142 enrolled",
  steps: [
    { icon: Mail, label: "Intro email", day: "Day 1", state: "Sent · 64% opened" },
    { icon: MessageSquare, label: "LinkedIn note", day: "Day 3", state: "Sent" },
    { icon: Mail, label: "Follow-up", day: "Day 5", state: "Drafting", active: true },
    { icon: Phone, label: "Call task", day: "Day 8", state: "Scheduled" },
  ],
  draft: {
    subject: "Re: scaling the sales team",
    body: "Hi Priya, congrats on the raise! You mentioned hiring four reps this quarter. Most teams we work with lose a day a week to CRM admin at that stage",
    approve: "Approve",
    rewrite: "Rewrite",
  },
};

export const AGENT_MOCK = {
  title: "Agent · Revive quiet deals",
  badge: "Running",
  trigger: "When a deal over $20k has no activity for 7 days",
  steps: [
    { label: "Read the last call and email thread", done: true },
    { label: "Draft a check-in with a clear next step", done: true },
    { label: "Ask the owner to approve in Slack", running: true },
  ],
  channel: "#sales-deals",
  message: "3 quiet deals found. Drafts are ready for Jo, Tom and Ana.",
};

export const CONTACT_MOCK = {
  title: "Contact",
  badge: "Enriched",
  name: "Priya Nair",
  email: "priya@meridian.example",
  fields: [
    ["Role", "VP of Revenue"],
    ["Company", "Meridian · 240 people"],
    ["Location", "Dubai, UAE"],
    ["Funding", "Series B · $38M"],
  ],
  timeline: [
    { icon: Phone, text: "Discovery call · 32 min", time: "Today" },
    { icon: Mail, text: "Opened pricing email twice", time: "Yesterday" },
    { icon: Calendar, text: "Booked a demo via website", time: "Mon" },
  ],
  insight: "Likely buyer. Suggest sending the ROI deck.",
};
