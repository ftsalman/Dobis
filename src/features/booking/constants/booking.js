import { BarChart3, Bot, Workflow } from "lucide-react";

// Booking page data. Team hours, hosts and copy are PLACEHOLDERS - confirm before launch.

/** Length of a demo call, in minutes. */
export const DEMO_MINUTES = 30;

/** When the demo team takes calls: weekdays, in UTC (04:00-20:00 UTC covers Dubai, India, Europe and US mornings). */
export const TEAM_HOURS_UTC = { open: 4, close: 20, days: [1, 2, 3, 4, 5] };

/** Only offer times that fall between these hours on the visitor's own clock (no 2 AM calls). */
export const LOCAL_HOURS = { from: 7, to: 21 };

/** Earliest bookable slot is this far from now; latest is this many days ahead. */
export const LEAD_HOURS = 3;
export const WINDOW_DAYS = 28;

/** Timezones offered in the picker; the visitor's own zone is added if it isn't here. */
export const TIMEZONES = [
  "Asia/Dubai",
  "Asia/Riyadh",
  "Asia/Kolkata",
  "Asia/Singapore",
  "Australia/Sydney",
  "Africa/Cairo",
  "Europe/London",
  "Europe/Berlin",
  "America/New_York",
  "America/Chicago",
  "America/Los_Angeles",
  "UTC",
];

export const BENEFITS = [
  {
    icon: Workflow,
    title: "Connect every team",
    body: "See a deal flow from CRM to invoice to stock in one system, with no copy-paste between apps.",
  },
  {
    icon: Bot,
    title: "Put agents to work",
    body: "Watch doBis agents chase invoices, qualify leads and reorder stock while your team sleeps.",
  },
  {
    icon: BarChart3,
    title: "Get answers, not reports",
    body: "Ask a question in plain words and get live numbers across sales, finance and operations.",
  },
];

export const AGENDA = [
  ["05 min", "Your business, your goals"],
  ["15 min", "Live walkthrough of the apps you pick"],
  ["10 min", "Pricing, migration and next steps"],
];

export const COMPANY_SIZES = ["Just me", "2–10", "11–50", "51–200", "201–1,000", "1,000+"];

export const STEPS = ["Pick a time", "Your details", "Confirmed"];

export const BOOKING_STATS = [
  ["12,000+", "businesses on doBis"],
  ["4.8/5", "average demo rating"],
  ["< 1 day", "to a tailored quote"],
];

export const BOOKING_FAQ = [
  { q: "Is the demo really free?", a: "Yes. It's a 30-minute call with a product specialist, focused on the apps you pick, with no obligation to buy." },
  { q: "Who should join the call?", a: "Whoever owns the process you want to fix, plus anyone who signs off on software. You can forward the invite to as many people as you like." },
  { q: "Can I reschedule or cancel?", a: "Yes. Your calendar invite has reschedule and cancel links, or just reply to the confirmation email." },
  { q: "Do I need to prepare anything?", a: "No. If you can, bring a rough idea of your team size and the tools you use today so we can show a realistic setup and price." },
  { q: "Would you rather try it yourself first?", a: "Start a 14-day free trial from the pricing page. Every feature is included and no card is needed." },
];
