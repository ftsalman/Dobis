import { Blocks, DatabaseZap, GraduationCap, Headset, Rocket, ShieldCheck } from "lucide-react";

// The people side of Dobis: everything we do for customers beyond the software itself.
// NOTE: PLACEHOLDER promises (backups, response times) - confirm before launch. Response times and inclusions must stay in line with the pricing and contact pages.

export const SERVICES_COPY = {
  eyebrow: "Services",
  title: "Software plus the team to set it up",
  subtitle: "You don't have to do it alone. Our specialists plan, set up, migrate and support your Dobis workspace, so your team is up and running in days, not months.",
};

export const SERVICES = [
  {
    id: "implementation",
    icon: Rocket,
    title: "Implementation",
    body: "We map how your business works, configure the apps, workflows and permissions, and launch with your team.",
    points: ["Discovery workshop", "Configuration and workflows", "Go-live support"],
  },
  {
    id: "migration",
    icon: DatabaseZap,
    title: "Data migration",
    body: "Move customers, products, invoices and staff records from spreadsheets or your current software, checked and cleaned.",
    points: ["From spreadsheets, QuickBooks, Tally, Salesforce and more", "Opening balances verified", "No downtime cut-over"],
  },
  {
    id: "custom",
    icon: Blocks,
    title: "Custom development & integrations",
    body: "Custom fields, reports, apps and connections to the other systems you rely on, built on our open API.",
    points: ["REST API and webhooks", "Custom reports and dashboards", "Bank, payment and e-commerce connectors"],
  },
  {
    id: "training",
    icon: GraduationCap,
    title: "Training",
    body: "Live sessions for each team, plus recorded guides, so everyone knows how to do their job in Dobis from day one.",
    points: ["Role-based sessions", "Admin training", "Help center and videos"],
  },
  {
    id: "support",
    icon: Headset,
    title: "Support",
    body: "Real people on chat and email, with priority 24/5 support on Professional and a dedicated success manager on Enterprise.",
    points: ["Replies within 4 hours on weekdays", "Dedicated success manager on Enterprise", "Local implementation partners"],
  },
  {
    id: "security",
    icon: ShieldCheck,
    title: "Hosting & security",
    body: "We run, back up and secure the platform for you. No servers to maintain, updates included at no extra cost.",
    points: ["Daily backups", "Roles and permissions, SSO on Enterprise", "Automatic updates"],
  },
];

/** The four steps every new customer goes through. */
export const ONBOARDING_STEPS = [
  { number: "01", title: "Talk to us", body: "Tell us how your business runs today. We'll recommend the apps and plan you need." },
  { number: "02", title: "We set it up", body: "Our team configures Dobis and moves your data across from your current tools." },
  { number: "03", title: "Train your team", body: "Short, role-based training so everyone is confident on day one." },
  { number: "04", title: "Grow with support", body: "Add apps as you grow, with real people on hand whenever you need help." },
];
