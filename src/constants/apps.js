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
 * The Dobis app suite, grouped the way the navbar mega menu, the footer and the homepage show it.
 * `tone` is a Tailwind bg/text pair for the app's icon tile.
 */
export const APP_GROUPS = [
  {
    id: "sales",
    label: "Sales",
    apps: [
      { id: "crm", name: "CRM", blurb: "Leads, deals and pipelines", icon: UsersRound, tone: "bg-violet-100 text-violet-700" },
      { id: "sales", name: "Sales", blurb: "Quotes, orders and e-sign", icon: FileText, tone: "bg-indigo-100 text-indigo-700" },
      { id: "pos", name: "Point of Sale", blurb: "Shop and counter checkout", icon: Store, tone: "bg-fuchsia-100 text-fuchsia-700" },
    ],
  },
  {
    id: "finance",
    label: "Finance",
    apps: [
      { id: "books", name: "Books", blurb: "Accounting, tax and invoices", icon: BookOpen, tone: "bg-emerald-100 text-emerald-700" },
      { id: "expense", name: "Expense", blurb: "Receipts, claims and approvals", icon: Receipt, tone: "bg-teal-100 text-teal-700" },
      { id: "billing", name: "Billing", blurb: "Subscriptions and recurring revenue", icon: Repeat, tone: "bg-green-100 text-green-700" },
    ],
  },
  {
    id: "operations",
    label: "Operations",
    apps: [
      { id: "inventory", name: "Inventory", blurb: "Stock, warehouses and shipping", icon: Boxes, tone: "bg-amber-100 text-amber-700" },
      { id: "purchase", name: "Purchase", blurb: "Suppliers and purchase orders", icon: ShoppingCart, tone: "bg-orange-100 text-orange-700" },
      { id: "projects", name: "Projects", blurb: "Tasks, timesheets and billing", icon: SquareKanban, tone: "bg-sky-100 text-sky-700" },
    ],
  },
  {
    id: "people",
    label: "People",
    apps: [
      { id: "people", name: "People", blurb: "HR records, leave and attendance", icon: ContactRound, tone: "bg-rose-100 text-rose-700" },
      { id: "payroll", name: "Payroll", blurb: "Salaries, payslips and compliance", icon: Banknote, tone: "bg-pink-100 text-pink-700" },
      { id: "recruit", name: "Recruit", blurb: "Job posts and hiring pipeline", icon: BriefcaseBusiness, tone: "bg-red-100 text-red-700" },
    ],
  },
  {
    id: "engage",
    label: "Marketing & Service",
    apps: [
      { id: "campaigns", name: "Campaigns", blurb: "Email, SMS and WhatsApp", icon: Megaphone, tone: "bg-yellow-100 text-yellow-700" },
      { id: "desk", name: "Desk", blurb: "Helpdesk and customer portal", icon: Headphones, tone: "bg-cyan-100 text-cyan-700" },
      { id: "sites", name: "Sites", blurb: "Website and online store builder", icon: Globe, tone: "bg-blue-100 text-blue-700" },
    ],
  },
];

export const ALL_APPS = APP_GROUPS.flatMap((g) => g.apps);

/**
 * Partner add-ons: separate products sold alongside Dobis plans, each with its own site.
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
