import {
  BookOpen,
  Code,
  Factory,
  GraduationCap,
  Handshake,
  LifeBuoy,
  Newspaper,
  ShoppingBag,
  Stethoscope,
  Truck,
  Users,
  Utensils,
} from "lucide-react";
import { ALL_APPS } from "./apps";

// `menu: "apps"` opens the grouped app mega menu; `children` opens a simple dropdown.
export const NAV_LINKS = [
  { id: "apps", label: "Apps", href: "#apps", menu: "apps" },
  {
    id: "industries",
    label: "Industries",
    href: "#industries",
    children: [
      { id: "retail", label: "Retail & eCommerce", description: "POS, stock and online orders", href: "#retail", icon: ShoppingBag },
      { id: "manufacturing", label: "Manufacturing", description: "Bills of material and purchasing", href: "#manufacturing", icon: Factory },
      { id: "services", label: "Professional services", description: "Projects, timesheets, billing", href: "#services", icon: Handshake },
      { id: "distribution", label: "Wholesale & distribution", description: "Warehouses and fulfilment", href: "#distribution", icon: Truck },
      { id: "hospitality", label: "Restaurants & hospitality", description: "Orders, staff rosters, supplies", href: "#hospitality", icon: Utensils },
      { id: "healthcare", label: "Healthcare & clinics", description: "Appointments and patient billing", href: "#healthcare", icon: Stethoscope },
      { id: "education", label: "Education", description: "Admissions, fees and staff", href: "#education", icon: GraduationCap },
    ],
  },
  { id: "pricing", label: "Pricing", href: "/pricing" },
  { id: "customers", label: "Customers", href: "/#customers" },
  {
    id: "resources",
    label: "Resources",
    href: "#resources",
    children: [
      { id: "docs", label: "Help center", description: "Guides for every app", href: "#docs", icon: BookOpen },
      { id: "blog", label: "Blog", description: "Ideas for growing businesses", href: "#blog", icon: Newspaper },
      { id: "community", label: "Community", description: "Ask other Dobis users", href: "#community", icon: Users },
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
  { title: "Apps", links: [...ALL_APPS.slice(0, 7).map((a) => ({ label: a.name, href: `/#${a.id}` })), { label: "All apps", href: "/#apps" }, { label: "Partner add-ons", href: "/pricing#addons" }] },
  { title: "Solutions", links: ["Retail", "Manufacturing", "Services", "Distribution", "Hospitality", "Healthcare"] },
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
