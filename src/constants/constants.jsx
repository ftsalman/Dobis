import { BookOpen, Code, Handshake, LifeBuoy, Newspaper, Users } from "lucide-react";
import { ALL_APPS } from "./apps";
import { appHref } from "./appDetails";
import { INDUSTRIES, industryHref } from "./industries";
import { SERVICES } from "./services";

// `menu: "apps"` opens the grouped app mega menu; `children` opens a simple dropdown.
export const NAV_LINKS = [
  { id: "apps", label: "Apps", href: "/apps", menu: "apps" },
  {
    id: "industries",
    label: "Industries",
    href: "/#industries",
    children: INDUSTRIES.map(({ id, label, description, icon }) => ({ id, label, description, icon, href: industryHref(id) })),
  },
  {
    id: "services",
    label: "Services",
    href: "/services",
    children: SERVICES.map(({ id, title, body, icon }) => ({
      id,
      label: title,
      description: body.split(/[,.]/)[0],
      icon,
      href: `/services#${id}`,
    })),
  },
  { id: "pricing", label: "Pricing", href: "/pricing" },
  { id: "customers", label: "Customers", href: "/#customers" },
  {
    id: "resources",
    label: "Resources",
    href: "#resources",
    // NOTE: help center, blog, community and developer docs don't exist yet - point these at real URLs when they do.
    children: [
      { id: "docs", label: "Help center", description: "Guides for every app", href: "#docs", icon: BookOpen },
      { id: "blog", label: "Blog", description: "Ideas for growing businesses", href: "#blog", icon: Newspaper },
      { id: "community", label: "Community", description: "Ask other doBis users", href: "#community", icon: Users },
      { id: "partners", label: "Partners", description: "Find an implementation partner", href: "/contact?topic=partnership", icon: Handshake },
      { id: "developers", label: "Developers", description: "REST API, webhooks and SDKs", href: "#developers", icon: Code },
      { id: "support", label: "Support", description: "Talk to our team, 24/5", href: "/contact?topic=support", icon: LifeBuoy },
    ],
  },
];

export const NAV_ACTIONS = {
  login: { label: "Sign in", href: "#login" },
  demo: { label: "Book a demo", href: "/book-demo" },
  primary: { label: "Start free", href: "/pricing" },
};

// Footer entries are plain labels (linked to "#label") or { label, href } for real pages.
export const FOOTER_LINKS = [
  {
    title: "Apps",
    links: [
      ...ALL_APPS.slice(0, 6).map((a) => ({ label: a.name, href: appHref(a.id) })),
      { label: "All apps", href: "/apps" },
      { label: "Partner add-ons", href: "/apps#addons" },
    ],
  },
  { title: "Industries", links: INDUSTRIES.map(({ id, label }) => ({ label, href: industryHref(id) })) },
  { title: "Services", links: [...SERVICES.map(({ id, title }) => ({ label: title, href: `/services#${id}` }))] },
  {
    title: "Company",
    links: [
      "About",
      { label: "Customers", href: "/#customers" },
      { label: "Pricing", href: "/pricing" },
      { label: "Partners", href: "/contact?topic=partnership" },
      "Careers",
      { label: "Contact", href: "/contact" },
    ],
  },
  { title: "Resources", links: ["Help center", "Developers", "Community", "Status", "Security", "Terms", "Privacy"] },
];
