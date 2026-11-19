export const HERO_NEWS = {
  tag: "New",
  text: "Dobis Agents now work across every app",
  href: "#agents",
};

export const HERO_COPY = {
  title: ["Your whole business,", "in one place"],
  subtitle: "CRM, accounting, inventory, HR and projects in one connected suite. Dobis agents handle the busywork between them.",
  primary: { label: "Start free", href: "/pricing" },
  secondary: { label: "Book a demo", href: "/book-demo" },
};

/** The four product areas. Drives the hero tabs, the overview cards and the pinned showcase. */
export const HERO_STAGES = [
  { id: "pipeline", number: "01", label: "Pipeline" },
  { id: "sequences", number: "02", label: "Sequences" },
  { id: "agents", number: "03", label: "Agents" },
  { id: "contacts", number: "04", label: "Contacts" },
];

/** How long each hero tab stays active before auto-advancing (ms). */
export const HERO_STAGE_DURATION = 6000;
