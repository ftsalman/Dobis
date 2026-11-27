import crmSymbol from "@/assets/products/crm.svg";
import booksSymbol from "@/assets/products/books.svg";
import deskSymbol from "@/assets/products/desk.svg";
import peopleSymbol from "@/assets/products/people.svg";
import {
  Banknote,
  BookOpen,
  Boxes,
  BriefcaseBusiness,
  ContactRound,
  Globe,
  Headphones,
  Megaphone,
  Receipt,
  Repeat,
  ShoppingCart,
  SquareKanban,
  Store,
  UsersRound,
  FileText,
  FileStack,
  MessageCircle,
  CalendarCheck,
} from "lucide-react";

/**
 * The doBis app suite, grouped the way the navbar mega menu, the footer and the homepage show it.
 * The four published product identities use the guide artwork. Other suite apps keep their existing hues.
 */
export const APP_GROUPS = [
  {
    id: "sales",
    label: "Sales",
    apps: [
      { id: "crm", name: "CRM", blurb: "Leads, deals and pipelines", icon: UsersRound, color: "var(--color-blue)", symbol: crmSymbol },
      { id: "sales", name: "Sales", blurb: "Quotes, orders and e-sign", icon: FileText, color: "var(--color-indigo-700)" },
      { id: "pos", name: "Point of Sale", blurb: "Shop and counter checkout", icon: Store, color: "var(--color-fuchsia-700)" },
    ],
  },
  {
    id: "finance",
    label: "Finance",
    apps: [
      { id: "books", name: "Books", blurb: "Accounting, tax and invoices", icon: BookOpen, color: "#15803D", symbol: booksSymbol },
      { id: "expense", name: "Expense", blurb: "Receipts, claims and approvals", icon: Receipt, color: "var(--color-cyan-700)" },
      { id: "billing", name: "Billing", blurb: "Subscriptions and recurring revenue", icon: Repeat, color: "var(--color-violet-700)" },
    ],
  },
  {
    id: "operations",
    label: "Operations",
    apps: [
      { id: "inventory", name: "Inventory", blurb: "Stock, warehouses and shipping", icon: Boxes, color: "var(--color-amber-700)" },
      { id: "purchase", name: "Purchase", blurb: "Suppliers and purchase orders", icon: ShoppingCart, color: "var(--color-orange-700)" },
      { id: "projects", name: "Projects", blurb: "Tasks, timesheets and billing", icon: SquareKanban, color: "var(--color-sky-700)" },
    ],
  },
  {
    id: "people",
    label: "People",
    apps: [
      { id: "people", name: "People", blurb: "HR records, leave and attendance", icon: ContactRound, color: "#DB2777", symbol: peopleSymbol },
      { id: "payroll", name: "Payroll", blurb: "Salaries, payslips and compliance", icon: Banknote, color: "var(--color-rose-700)" },
      { id: "recruit", name: "Recruit", blurb: "Job posts and hiring pipeline", icon: BriefcaseBusiness, color: "var(--color-red-700)" },
    ],
  },
  {
    id: "engage",
    label: "Marketing & Service",
    apps: [
      { id: "campaigns", name: "Campaigns", blurb: "Email, SMS and WhatsApp", icon: Megaphone, color: "var(--color-yellow-700)" },
      { id: "desk", name: "Desk", blurb: "Helpdesk and customer portal", icon: Headphones, color: "#0F766E", symbol: deskSymbol },
      { id: "sites", name: "Sites", blurb: "Website and online store builder", icon: Globe, color: "var(--color-blue-700)" },
    ],
  },
];

export const ALL_APPS = APP_GROUPS.flatMap((g) => g.apps);

/**
 * Partner add-ons: separate products sold alongside doBis plans, each with its own site.
 * They are NOT part of ALL_APPS, so plan contents and the pricing calculator are unaffected.
 * `price` is USD per month, or null for "priced separately" - confirm real prices before setting one.
 */
export const ADDONS = [
  {
    id: "kootaan",
    name: "Kootaan CSM",
    blurb: "Typing centers and corporate services",
    description: "Run a typing center or corporate service business from one dashboard: documents, clients, staff and every renewal deadline.",
    features: ["Secure document storage with role-based access", "Reminders for renewals, expiries and submissions", "Multi-branch dashboard with full audit trail", "iOS and Android apps"],
    href: "https://kootaan.com/",
    icon: FileStack,
    tone: "bg-lime-100 text-lime-700",
    price: null,
  },
  {
    id: "flowbee",
    name: "Flowbee",
    blurb: "WhatsApp Business API platform",
    description: "Turn WhatsApp into your sales channel and support desk on the official API, from click-to-WhatsApp ads to confirmed orders.",
    features: ["Broadcast campaigns to opted-in customers", "Chatbots that qualify leads automatically", "Shared team inbox with assignment and notes", "Click-to-WhatsApp ad funnels"],
    href: "https://flowbee.io/",
    icon: MessageCircle,
    tone: "bg-emerald-100 text-emerald-700",
    price: null,
  },
  {
    id: "flowbee-booking",
    name: "Flowbee Booking",
    blurb: "Appointments and staff scheduling",
    description: "Let customers book appointments online, and manage staff calendars, availability and rescheduling in one place.",
    features: ["Online booking from live calendar slots", "Staff availability and time off", "Reschedule or reassign in a click", "Customer records for every booking"],
    href: "https://booking.flowbee.io/",
    icon: CalendarCheck,
    tone: "bg-orange-100 text-orange-700",
    price: null,
  },
];
