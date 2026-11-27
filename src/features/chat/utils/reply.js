import { ALL_APPS } from "@/constants/apps";
import { appHref, getApp } from "@/constants/appDetails";
import { INDUSTRIES, industryHref } from "@/constants/industries";
import { SERVICES } from "@/constants/services";
import { PLANS } from "@/features/pricing/constants/pricing";
import { CHAT } from "../constants/chat";

/**
 * Rule-based answers built from the site's own data, so they never drift from the pages.
 * Returns { text, links?: [{ label, href }], chips?: string[] }.
 * To use a real AI later, replace getReply with an API call that returns the same shape.
 */

const has = (text, words) => words.some((w) => new RegExp(`\\b${w}`, "i").test(text));

// Extra words people use for each app, beyond its name.
const APP_ALIASES = {
  crm: ["crm", "lead", "deal", "pipeline", "customer relationship"],
  sales: ["quote", "quotation", "sales order", "e-sign", "esign"],
  pos: ["pos", "point of sale", "checkout", "till", "cashier"],
  books: ["books", "accounting", "accounts", "invoice", "bookkeeping", "vat", "tax", "ledger"],
  expense: ["expense", "receipt", "reimburse", "claim"],
  billing: ["billing", "subscription", "recurring", "mrr"],
  inventory: ["inventory", "stock", "warehouse", "barcode"],
  purchase: ["purchase", "supplier", "vendor", "procure"],
  projects: ["project", "task", "timesheet", "gantt"],
  people: ["hr", "people", "employee", "leave", "attendance"],
  payroll: ["payroll", "salary", "salaries", "payslip"],
  recruit: ["recruit", "hiring", "hire", "job", "candidate"],
  campaigns: ["campaign", "marketing", "newsletter", "sms", "email marketing"],
  desk: ["desk", "helpdesk", "help desk", "ticket", "customer support"],
  sites: ["website", "site builder", "online store", "ecommerce store", "web shop"],
};

const INDUSTRY_ALIASES = {
  retail: ["retail", "shop", "store", "ecommerce", "e-commerce"],
  manufacturing: ["manufactur", "factory", "production"],
  services: ["agency", "consult", "professional service", "law firm", "accountant"],
  distribution: ["wholesale", "distribut", "logistics", "trading"],
  hospitality: ["restaurant", "cafe", "hotel", "hospitality", "food"],
  healthcare: ["clinic", "health", "hospital", "medical", "dental", "pharma"],
  education: ["school", "college", "education", "institute", "training cent", "academy"],
};

const findApp = (text) => ALL_APPS.find((a) => has(text, APP_ALIASES[a.id] ?? [a.name.toLowerCase()]));
const findIndustry = (text) => INDUSTRIES.find((i) => has(text, INDUSTRY_ALIASES[i.id]));

const pricingReply = () => {
  const lines = PLANS.map((p) =>
    p.price === null ? `• ${p.name}: custom pricing` : p.price === 0 ? `• ${p.name}: $0, ${p.highlights.slice(0, 2).join(", ").toLowerCase()}` : `• ${p.name}: $${p.price} per user / month`,
  );
  return {
    text: `doBis has four plans (billed yearly):\n${lines.join("\n")}\n\nEvery paid plan has a 14-day free trial, no card needed.`,
    links: [
      { label: "Compare plans", href: "/pricing" },
      { label: "Talk to sales", href: "/contact?topic=sales" },
    ],
    chips: ["What's in the Free plan?", "Can you set it up for us?"],
  };
};

const servicesReply = () => ({
  text: `Yes, we can do it for you. Our team offers:\n${SERVICES.map((s) => `• ${s.title}`).join("\n")}\n\nGuided imports are free on every plan, and on Professional and Enterprise we migrate your data for you.`,
  links: [
    { label: "Explore services", href: "/services" },
    { label: "Talk to an expert", href: "/contact?topic=sales" },
  ],
  chips: ["Pricing & plans", "Book a demo"],
});

const appsReply = () => ({
  text: `doBis is one platform with ${ALL_APPS.length} connected apps:\n${ALL_APPS.map((a) => a.name).join(", ")}.\n\nThey share one login and one database, so you can start with one and add the rest anytime. Which area are you most interested in?`,
  links: [{ label: "See all apps", href: "/apps" }],
  chips: ["Accounting", "CRM", "Inventory", "HR & Payroll"],
});

export const getReply = (raw) => {
  const text = raw.trim().toLowerCase();

  if (/^(hi|hello|hey|salam|hai|good (morning|afternoon|evening))\b/.test(text)) {
    return { text: "Hi there! What would you like to know about doBis?", chips: CHAT.starters };
  }
  if (has(text, ["thank", "thanks", "great", "perfect"])) {
    return { text: "You're welcome! Anything else I can help with?", chips: CHAT.starters };
  }
  if (has(text, ["demo", "walkthrough", "show me"])) {
    return {
      text: "Happy to show you! A demo is a free 30-minute call focused on the apps you care about, with no obligation to buy.",
      links: [{ label: "Book a demo", href: "/book-demo" }],
    };
  }
  if (has(text, ["free plan", "what's in the free", "whats in the free"])) {
    const free = PLANS.find((p) => p.id === "free");
    return {
      text: `The Free plan costs nothing, forever: ${free.highlights.join(", ").toLowerCase().replace(" gb ", " GB ")}. Upgrade any time to unlock all 15 apps.`,
      links: [{ label: "Start free", href: "/pricing" }],
    };
  }
  if (has(text, ["price", "pricing", "cost", "plan", "how much", "trial", "package", "subscription fee"])) return pricingReply();
  if (has(text, ["set it up", "setup", "set up", "implement", "migrat", "import", "training", "train", "service", "custom", "integrat", "api"])) {
    return servicesReply();
  }
  if (has(text, ["support", "help me", "problem", "issue", "not working", "bug"])) {
    return {
      text: "Our support team replies within 4 hours on weekdays. If you already have an account, you can also use live chat inside the app.",
      links: [{ label: "Contact support", href: "/contact?topic=support" }],
    };
  }
  if (has(text, ["secur", "safe", "privacy", "backup", "gdpr", "sso"])) {
    return {
      text: "We host, back up and secure the platform for you, with roles and permissions on every app. Enterprise adds SSO, SAML, audit logs and a 99.9% uptime SLA.",
      links: [{ label: "Hosting & security", href: "/services#security" }],
    };
  }
  if (has(text, ["hr & payroll", "hr and payroll"])) {
    const [people, payroll] = [getApp("people"), getApp("payroll")];
    return {
      text: `${people.name}: ${people.tagline.toLowerCase()}. ${payroll.name}: ${payroll.tagline.toLowerCase()}. Leave and overtime flow from People straight into Payroll.`,
      links: [
        { label: "doBis People", href: appHref("people") },
        { label: "doBis Payroll", href: appHref("payroll") },
      ],
    };
  }

  const industry = findIndustry(text);
  if (industry) {
    const names = industry.apps.slice(0, 4).map((id) => getApp(id).name).join(", ");
    return {
      text: `${industry.title}. Businesses in ${industry.label.toLowerCase()} usually start with ${names}.`,
      links: [{ label: `doBis for ${industry.label}`, href: industryHref(industry.id) }],
      chips: ["Pricing & plans", "Book a demo"],
    };
  }

  const app = findApp(text);
  if (app) {
    const full = getApp(app.id);
    return {
      text: `${full.name}: ${full.tagline}.\n\n${full.description}`,
      links: [
        { label: `Explore ${full.name}`, href: appHref(full.id) },
        { label: "Pricing", href: "/pricing" },
      ],
      chips: ["Book a demo", "Can you set it up for us?"],
    };
  }

  if (has(text, ["app", "product", "feature", "what is dobis", "what do you", "what does", "module", "software", "erp", "all-in-one"])) return appsReply();
  if (has(text, ["contact", "call", "phone", "email", "human", "agent", "person", "talk", "sales"])) {
    return {
      text: "I'll connect you with our team. Sales and demo requests get a reply within one business day.",
      links: [
        { label: "Contact us", href: "/contact" },
        { label: "Book a demo", href: "/book-demo" },
      ],
    };
  }

  return {
    text: "I'm not sure about that one yet. I can tell you about our apps, pricing, industries and setup services, or connect you with a person.",
    links: [{ label: "Talk to our team", href: "/contact?topic=sales" }],
    chips: CHAT.starters,
  };
};
