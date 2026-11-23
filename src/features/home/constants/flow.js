// Copy for the agent-flow hero, the walkthrough rail, the signal ticker and the stories carousel.
// NOTE: company names, people and every figure here are PLACEHOLDERS - replace them before launch.

export const FLOW_HERO = {
  copy: {
    eyebrow: "Dobis Agents",
    title: "Ask once. Agents do the work across every app.",
    subtitle: "Because every app shares one database, Dobis agents can chase invoices, reorder stock and prepare payroll in a single request. You just review and approve.",
    cta: { label: "See agent pricing", href: "/pricing" },
  },
  prompt: "Close out October: chase overdue invoices, restock low items and get payroll ready",
  stages: [
    { id: "ask", label: "Ask Dobis" },
    { id: "workflow", label: "Agent workflow" },
    { id: "apps", label: "Across your apps" },
    { id: "ready", label: "Ready to approve" },
  ],
  steps: [
    "Match bank payments in Books",
    "Flag overdue invoices",
    "Check stock in Inventory",
    "Draft purchase orders",
    "Sync leave into Payroll",
    "Route for approval",
  ],
  segments: [
    "Books · 12 invoices overdue, $18,400 outstanding",
    "Inventory · 7 items below reorder point",
    "People · 3 leave requests before payroll run",
  ],
  // Agent outputs that cycle on the hero card, one per highlighted app above.
  variants: [
    {
      id: "books",
      tag: "Books",
      title: "12 reminders ready to send",
      body: "Personal payment reminders for $18,400 in overdue invoices.",
      cta: "Review & send",
      bg: "radial-gradient(120% 80% at 70% 0%, #3b2d7a 0%, #1b1838 45%, #0d0b18 100%)",
      stars: true,
    },
    {
      id: "inventory",
      tag: "Inventory",
      title: "PO-2291 drafted for Ferro Supply",
      body: "7 low-stock items, $6,240, delivered in 5 days.",
      cta: "Approve order",
      bg: "linear-gradient(160deg, #f3b37a 0%, #c8675a 38%, #4b2a4a 75%, #1c1426 100%)",
    },
    {
      id: "payroll",
      tag: "Payroll",
      title: "November payroll ready to run",
      body: "48 payslips, leave and overtime already applied.",
      cta: "Run payroll",
      bg: "linear-gradient(170deg, #b9e3dd 0%, #4f9c9a 40%, #1f4d5c 75%, #0f2530 100%)",
    },
  ],
};

export const WALKTHROUGH = {
  eyebrow: "How it works",
  title: "One workspace. Every team.",
  subtitle: "Sales, finance, operations and HR share one database, so work flows between apps without exports or re-typing.",
  prompt: "A deal closes in CRM. Invoice it, reserve the stock and staff the project.",
  statuses: ["Activating agents", "Creating invoice in Books", "Reserving stock", "Assigning the team"],
  // `mock` picks the preview: CRM uses Mockups.jsx, the rest SuiteMocks.jsx.
  rows: [
    {
      id: "crm",
      mock: "crm",
      number: "01",
      label: "CRM",
      title: "Win the deal",
      body: "Every lead, email and call lands on one pipeline. Dobis moves deals forward and flags the ones going cold.",
      points: ["Visual pipelines and forecasts", "Quotes and e-signatures built in", "Email, calls and WhatsApp in one timeline"],
    },
    {
      id: "books",
      mock: "books",
      number: "02",
      label: "Books",
      title: "Get paid on time",
      body: "Won deals become invoices automatically. Payments match themselves to your bank feed, and reminders go out before you notice.",
      points: ["Invoices, bills and multi-currency", "Automatic bank reconciliation", "Tax-ready reports and audit trail"],
    },
    {
      id: "inventory",
      mock: "inventory",
      number: "03",
      label: "Inventory",
      title: "Never run out",
      body: "Stock updates the moment something sells, in store or online. Low items trigger purchase orders for you to approve.",
      points: ["Multiple warehouses and batches", "Reorder points and supplier POs", "Barcode scanning and shipping labels"],
    },
    {
      id: "people",
      mock: "people",
      number: "04",
      label: "People",
      title: "Look after your team",
      body: "Onboarding, leave, attendance and payroll in one place. Approvals take a tap and payslips are ready on time.",
      points: ["Self-service leave and expenses", "Attendance and shift rosters", "Payroll with compliance built in"],
    },
  ],
};

// Each row: something that happens in one app -> what Dobis does about it.
export const SIGNALS = {
  counter: { from: 46, to: 50, unit: "million", label: "automations run across Dobis apps" },
  rows: [
    ["Deal won in CRM", "Create invoice + project"],
    ["Invoice overdue 30 days", "Payment reminder"],
    ["Stock below reorder point", "Draft purchase order"],
    ["Payment received", "Reconcile in Books"],
    ["Quote accepted", "Convert to sales order"],
    ["Offer letter signed", "Onboarding checklist"],
    ["Expense submitted", "Manager approval"],
    ["Ticket open 24 hours", "Escalate to lead"],
    ["Leave approved", "Update shift roster"],
    ["Order shipped", "Tracking SMS to customer"],
    ["Renewal in 60 days", "Renewal quote"],
    ["Timesheet missing", "Reminder to team"],
    ["Supplier price changed", "Update cost price"],
    ["Card payment failed", "Retry + dunning email"],
    ["Project over budget", "Alert project owner"],
    ["Candidate applied", "Screen + schedule interview"],
    ["Bestseller selling fast", "Reorder from supplier"],
    ["Month end reached", "Close-the-books checklist"],
  ],
};

export const STORY_CARDS = {
  eyebrow: "Customer stories",
  title: ["Fewer tools,", "faster growth"],
  cards: [
    { id: "halcyon", name: "Halcyon", about: "Halcyon, a 120-person design agency, replaced its CRM, accounting, HR and project tools with one Dobis workspace.", metric: "6 → 1", label: "tools replaced" },
    { id: "kestrel", name: "Kestrel Foods", about: "Kestrel runs three warehouses and 40 wholesale accounts on Dobis Inventory, Purchase and Books.", metric: "-38%", label: "stock-outs in six months" },
    { id: "brightpath", name: "Brightpath", about: "Brightpath's finance team reconciles 4,000 transactions a month with bank feeds and automatic matching.", metric: "2 days", label: "to close the month" },
    { id: "northwind", name: "Northwind Retail", about: "Northwind connected 14 stores and its online shop to one Point of Sale and one stock count.", metric: "14", label: "stores on one system" },
    { id: "atlas", name: "Atlas Labs", about: "Atlas Labs pays 260 people across three countries with Dobis People and Payroll.", metric: "0", label: "payroll errors this year" },
    { id: "meridian", name: "Meridian Clinics", about: "Meridian books appointments, bills patients and manages staff rosters across 9 clinics.", metric: "11 hrs", label: "admin saved per week, per clinic" },
  ],
};
