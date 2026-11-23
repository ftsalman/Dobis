// Copy shared by the apps catalog (/apps) and every app page (/apps/:id).
// Plan facts must match src/features/pricing/constants/pricing.js.

export const APPS_PAGE = {
  eyebrow: "All apps",
  title: "15 apps. One login. One database.",
  intro: "Pick the apps your business needs today and switch on more whenever you're ready. Every app shares the same customers, products, people and numbers.",
  addons: {
    title: "Partner add-ons",
    subtitle: "Specialist products from our partners that plug into your Dobis workspace. Each is sold separately.",
  },
};

export const APP_PAGE = {
  included: [
    "Free for up to 3 users with any 2 apps",
    "Included in every paid plan, with all 15 apps",
    "Web, iOS and Android apps",
    "14-day free trial, no card needed",
  ],
  pricingLink: "Compare plans",
  together: "Every Dobis app works from the same database, so information entered once shows up everywhere it's needed. No imports, exports or integrations to maintain.",
  help: "Our team and certified partners can configure the app for you, import your existing data and train your staff.",
  helpLinks: [
    { label: "Implementation", body: "We set it up around how you work.", href: "/services#implementation" },
    { label: "Data migration", body: "Move your data from your current tools.", href: "/services#migration" },
    { label: "Training", body: "Get every team confident on day one.", href: "/services#training" },
    { label: "Talk to an expert", body: "Ask anything, no obligation.", href: "/contact?topic=sales" },
  ],
};
