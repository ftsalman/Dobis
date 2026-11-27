import { Factory, GraduationCap, Handshake, ShoppingBag, Stethoscope, Truck, Utensils } from "lucide-react";

export const industryHref = (id) => `/industries/${id}`;

/**
 * Industry pages (/industries/:id). `apps` are app ids from constants/apps.js, most important first.
 * `description` is the short line used in menus and cards.
 */
export const INDUSTRIES = [
  {
    id: "retail",
    label: "Retail & eCommerce",
    description: "POS, stock and online orders",
    icon: ShoppingBag,
    title: "One system for your stores and your online shop",
    intro: "Sell in store and online from the same product list and the same stock count. Every sale updates inventory and accounts the moment it happens.",
    challenges: [
      "Stock counts that don't match between the shop, the website and the warehouse",
      "Sales, returns and payments re-typed into accounting at the end of the day",
      "No clear view of which products and branches are actually profitable",
    ],
    apps: ["pos", "inventory", "sites", "books", "purchase", "campaigns"],
    outcomes: ["Live stock across every branch and channel", "Daily sales posted to the books automatically", "Reorders drafted before bestsellers run out"],
  },
  {
    id: "manufacturing",
    label: "Manufacturing",
    description: "Materials, purchasing and costing",
    icon: Factory,
    title: "Plan, buy and build with numbers you can trust",
    intro: "Keep raw materials, purchase orders, finished goods and costs in one place, so production never stops for a missing part.",
    challenges: [
      "Production delayed by materials nobody reordered",
      "Product costs calculated in spreadsheets that are out of date",
      "Sales promising delivery dates the shop floor can't meet",
    ],
    apps: ["inventory", "purchase", "sales", "books", "projects", "people"],
    outcomes: ["Material shortages flagged before they stop production", "Real cost per product from actual purchase prices", "Accurate delivery dates on every quote"],
  },
  {
    id: "services",
    label: "Professional services",
    description: "Projects, timesheets and billing",
    icon: Handshake,
    title: "Win clients, deliver projects and bill every hour",
    intro: "From the first proposal to the final invoice, keep clients, projects, timesheets and billing connected, so no billable work slips through.",
    challenges: [
      "Billable hours lost because timesheets live in separate tools",
      "Projects running over budget without anyone noticing",
      "Proposals, contracts and invoices built from scratch every time",
    ],
    apps: ["crm", "sales", "projects", "books", "people", "expense"],
    outcomes: ["Time and expenses billed straight from projects", "Budget alerts before a project goes over", "Proposals signed online in minutes"],
  },
  {
    id: "distribution",
    label: "Wholesale & distribution",
    description: "Warehouses and fulfilment",
    icon: Truck,
    title: "Move more stock with fewer mistakes",
    intro: "Manage many warehouses, price lists and customer accounts from one system, with barcode picking and accounts that update as orders ship.",
    challenges: [
      "Orders picked from the wrong warehouse or the wrong batch",
      "Different prices for each customer kept in spreadsheets",
      "Slow month-end because invoices and payments don't match up",
    ],
    apps: ["inventory", "purchase", "sales", "books", "crm", "billing"],
    outcomes: ["Barcode-driven picking and packing", "Customer-specific price lists applied automatically", "Payments matched to invoices from the bank feed"],
  },
  {
    id: "hospitality",
    label: "Restaurants & hospitality",
    description: "Orders, staff rosters, supplies",
    icon: Utensils,
    title: "Run the front of house and the back office together",
    intro: "Take orders, manage supplies and roster your staff in one system, so you know your food cost and labour cost every single day.",
    challenges: [
      "Supplies over-ordered, wasted or run out at peak times",
      "Staff rosters and attendance tracked on paper",
      "No daily view of food cost, labour cost and margin",
    ],
    apps: ["pos", "inventory", "purchase", "people", "payroll", "books"],
    outcomes: ["Ingredients deducted from stock with every order", "Shift rosters and attendance in one app", "Daily margin reports for every location"],
  },
  {
    id: "healthcare",
    label: "Healthcare & clinics",
    description: "Appointments and patient billing",
    icon: Stethoscope,
    title: "Spend less time on admin and more with patients",
    intro: "Handle patient enquiries, billing, supplies and staff across one clinic or many, with records kept secure and access set per role.",
    challenges: [
      "Front desk juggling calls, messages and paper forms",
      "Medical supplies tracked by hand and running out",
      "Staff schedules and payroll spread across several tools",
    ],
    apps: ["desk", "books", "inventory", "people", "payroll", "campaigns"],
    outcomes: ["Every patient enquiry in one shared inbox", "Supplies reordered before they run out", "Rosters and payroll for every clinic in one place"],
  },
  {
    id: "education",
    label: "Education",
    description: "Admissions, fees and staff",
    icon: GraduationCap,
    title: "Run admissions, fees and staff from one place",
    intro: "Schools, colleges and training centres use doBis to manage enquiries, collect fees, pay staff and keep parents and students informed.",
    challenges: [
      "Admission enquiries lost between email, phone and walk-ins",
      "Fee collection and reminders handled manually",
      "Staff records, leave and payroll in separate systems",
    ],
    apps: ["crm", "billing", "books", "people", "payroll", "campaigns"],
    outcomes: ["Every enquiry tracked from first contact to enrolment", "Fee invoices and reminders sent automatically", "One place for staff records, leave and pay"],
  },
];

export const getIndustry = (id) => INDUSTRIES.find((i) => i.id === id);
