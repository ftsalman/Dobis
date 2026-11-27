// The first screen of the homepage: it has to answer "what is this, who is it for, what do I do next" at a glance.

export const HERO_NEWS = {
  tag: "New",
  text: "doBis Agents now work across every app",
  href: "#agents",
};

export const HERO_COPY = {
  eyebrow: "Business software · Setup · Support",
  title: ["Run your entire business", "on one platform"],
  subtitle:
    "doBis is a suite of 15 connected business apps for CRM, accounting, inventory, HR, payroll, projects and more. Our team sets it up, moves your data and supports you as you grow.",
  primary: { label: "Start free", href: "/pricing" },
  secondary: { label: "Book a demo", href: "/book-demo" },
  fineprint: ["Free for up to 3 users", "No credit card", "Set up in days"],
  launcher: { title: "Pick the apps you need", footer: "One login, one database, every app connected." },
  industries: "Built for",
};

/** The four product areas. Drives the old hero tabs and pinned showcase (Hero.jsx / Showcase.jsx). */
export const HERO_STAGES = [
  { id: "pipeline", number: "01", label: "Pipeline" },
  { id: "sequences", number: "02", label: "Sequences" },
  { id: "agents", number: "03", label: "Agents" },
  { id: "contacts", number: "04", label: "Contacts" },
];

/** How long each hero tab stays active before auto-advancing (ms). */
export const HERO_STAGE_DURATION = 6000;
