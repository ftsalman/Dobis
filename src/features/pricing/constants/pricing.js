// Pricing page data. Every price, limit and exchange rate is a PLACEHOLDER - confirm before launch.
// Prices are in USD per user per month on yearly billing; monthly billing costs MONTHLY_UPLIFT more.

export const MONTHLY_UPLIFT = 0.2; // monthly billing is 20% more than yearly

// Fixed display rates from USD. Replace with your real price list per currency.
export const CURRENCIES = [
  { code: "USD", label: "US Dollar", locale: "en-US", rate: 1 },
  { code: "EUR", label: "Euro", locale: "de-DE", rate: 0.92 },
  { code: "GBP", label: "British Pound", locale: "en-GB", rate: 0.79 },
  { code: "INR", label: "Indian Rupee", locale: "en-IN", rate: 83 },
  { code: "AED", label: "UAE Dirham", locale: "en-AE", rate: 3.67 },
];

export const PLANS = [
  {
    id: "free",
    name: "Free",
    price: 0,
    tagline: "For freelancers and tiny teams getting organised.",
    cta: { label: "Start free", href: "/contact?topic=trial&plan=free" },
    highlights: ["Up to 3 users", "Any 2 apps", "1 GB storage", "Mobile apps", "Email support"],
  },
  {
    id: "standard",
    name: "Standard",
    price: 14,
    tagline: "Every app, ready for a growing business.",
    cta: { label: "Start 14-day trial", href: "/contact?topic=trial&plan=standard" },
    highlights: ["All 15 apps", "500 automation runs / month", "Multi-currency & tax", "Standard reports", "Chat & email support"],
  },
  {
    id: "professional",
    name: "Professional",
    price: 29,
    popular: true,
    tagline: "Agents, automation and control for scaling teams.",
    cta: { label: "Start 14-day trial", href: "/contact?topic=trial&plan=professional" },
    highlights: ["Everything in Standard", "Dobis agents · 5,000 runs / month", "Multiple companies & branches", "Custom fields, workflows & API", "Priority support"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: null,
    tagline: "Security, scale and a team that knows your business.",
    cta: { label: "Talk to sales", href: "/contact?topic=sales&plan=enterprise" },
    highlights: ["Everything in Professional", "SSO, SAML & audit logs", "Sandbox environment", "99.9% uptime SLA", "Dedicated success manager"],
  },
];

// Build-your-own: per-app price, USD per user per month (yearly billing).
export const APP_PRICES = {
  crm: 8,
  sales: 6,
  pos: 6,
  books: 7,
  expense: 4,
  billing: 6,
  inventory: 8,
  purchase: 5,
  projects: 6,
  people: 5,
  payroll: 6,
  recruit: 5,
  campaigns: 6,
  desk: 6,
  sites: 5,
};

// Comparison table. `true` = included, `false` = not included, string = the limit.
export const PLAN_IDS = ["free", "standard", "professional", "enterprise"];
export const COMPARISON = [
  {
    group: "Apps & users",
    rows: [
      ["Users", ["Up to 3", "Unlimited", "Unlimited", "Unlimited"]],
      ["Apps included", ["Any 2", "All 15", "All 15", "All 15"]],
      ["Storage", ["1 GB", "10 GB / user", "25 GB / user", "Unlimited"]],
      ["Mobile apps (iOS & Android)", [true, true, true, true]],
    ],
  },
  {
    group: "Automation & AI",
    rows: [
      ["Workflow automation runs", ["50 / month", "500 / month", "10,000 / month", "Unlimited"]],
      ["Dobis agents", [false, false, "5,000 runs / month", "Custom"]],
      ["Ask Dobis (AI answers)", [false, true, true, true]],
      ["Approval flows", [false, true, true, true]],
    ],
  },
  {
    group: "Finance & operations",
    rows: [
      ["Multi-currency & tax", [false, true, true, true]],
      ["Bank feeds & reconciliation", [false, true, true, true]],
      ["Multiple companies & branches", [false, false, true, true]],
      ["Warehouses", ["1", "3", "Unlimited", "Unlimited"]],
    ],
  },
  {
    group: "Customisation & data",
    rows: [
      ["Custom fields", ["10", "100", "Unlimited", "Unlimited"]],
      ["Custom reports & dashboards", [false, "Standard", "Advanced", "Advanced"]],
      ["REST API & webhooks", [false, false, true, true]],
      ["Sandbox environment", [false, false, false, true]],
    ],
  },
  {
    group: "Security & support",
    rows: [
      ["Two-factor authentication", [true, true, true, true]],
      ["SSO, SAML & SCIM", [false, false, false, true]],
      ["Audit logs", [false, "30 days", "1 year", "Unlimited"]],
      ["Support", ["Email", "Chat & email", "Priority, 24/5", "Dedicated manager"]],
      ["Uptime SLA", [false, false, "99.5%", "99.9%"]],
    ],
  },
];

export const PRICING_FAQ = [
  {
    q: "Can I start with one app and add more later?",
    a: "Yes. On the Free plan you can pick any two apps. Standard and above include all 15, so you can switch an app on whenever a team is ready, with no migration or extra contract.",
  },
  {
    q: "How does the 14-day trial work?",
    a: "You get every feature of the plan you choose for 14 days, no card needed. At the end you pick a plan or drop to Free, and your data stays exactly where it is.",
  },
  {
    q: "What counts as a user?",
    a: "Anyone who signs in to Dobis. Customers using the portal, candidates applying for jobs and employees who only view their own payslips do not count.",
  },
  {
    q: "Is it cheaper to pay per app?",
    a: "If you only need two or three apps, building your own suite can cost less. Use the calculator above: it shows when an all-in-one plan becomes the better deal.",
  },
  {
    q: "Can I move my data from another system?",
    a: "Yes. Guided imports cover spreadsheets and popular tools for accounting, CRM and HR. On Professional and Enterprise our team helps you migrate for free.",
  },
  {
    q: "What are partner add-ons?",
    a: "Kootaan CSM, Flowbee and Flowbee Booking are specialist products that work alongside any Dobis plan. They're priced and billed separately; ask for one in your demo and we'll include it in your quote.",
  },
  {
    q: "Do you offer discounts for non-profits or startups?",
    a: "Registered non-profits get 50% off Standard and Professional, and eligible early-stage startups get their first year at 75% off. Contact sales to apply.",
  },
];
