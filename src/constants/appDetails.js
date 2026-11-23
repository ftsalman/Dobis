import { ALL_APPS, APP_GROUPS } from "./apps";

/** Every app links to its own page. */
export const appHref = (id) => `/apps/${id}`;

/**
 * Long-form copy for each app's page (/apps/:id). `related` lists the apps it shares the most data with.
 * Keep claims in line with the pricing page and FAQs.
 */
export const APP_DETAILS = {
  crm: {
    tagline: "Track every lead and close more deals",
    description: "Dobis CRM keeps your leads, contacts, deals and conversations in one pipeline, so your team always knows who to call next and what's about to close.",
    features: [
      { title: "Visual pipelines", body: "Drag deals between stages and see the value of each stage at a glance." },
      { title: "One timeline per customer", body: "Emails, calls, WhatsApp messages and meetings logged automatically." },
      { title: "Follow-up reminders", body: "Tasks and alerts for every next step, so no lead goes cold." },
      { title: "Forecasts and reports", body: "Expected revenue by month, rep and product." },
    ],
    related: ["sales", "campaigns", "books"],
  },
  sales: {
    tagline: "Send quotes in minutes, get them signed today",
    description: "Build professional quotes from your product list, collect e-signatures online and turn accepted quotes into sales orders and invoices in one click.",
    features: [
      { title: "Quote templates", body: "Branded quotes with your prices, discounts and taxes filled in." },
      { title: "Online e-signature", body: "Customers review, sign and pay from a single link." },
      { title: "Quote to order to invoice", body: "No re-typing: each step carries the details forward." },
      { title: "Price lists and discounts", body: "Different prices per customer, region or currency." },
    ],
    related: ["crm", "books", "inventory"],
  },
  pos: {
    tagline: "Fast checkout for shops, counters and restaurants",
    description: "Sell in store on a tablet, laptop or touchscreen. Every sale updates stock and accounts instantly, and checkout keeps working when the internet drops.",
    features: [
      { title: "Works offline", body: "Keep selling during outages; sales sync when you're back online." },
      { title: "Cards, cash and wallets", body: "Split payments, refunds and end-of-day cash counts." },
      { title: "Multi-store", body: "Run many branches with shared products and live stock." },
      { title: "Loyalty and gift cards", body: "Reward repeat customers at the counter." },
    ],
    related: ["inventory", "books", "sites"],
  },
  books: {
    tagline: "Accounting that keeps itself up to date",
    description: "Invoices, bills, bank feeds and tax in one place. Payments match themselves to invoices, so your books are always ready for your accountant.",
    features: [
      { title: "Invoices and bills", body: "Multi-currency invoicing with online payment links." },
      { title: "Bank reconciliation", body: "Connect your bank feed and match transactions automatically." },
      { title: "Tax and VAT ready", body: "Tax rates, returns and reports for your region." },
      { title: "Financial statements", body: "Profit and loss, balance sheet and cash flow in real time." },
    ],
    related: ["expense", "billing", "payroll"],
  },
  expense: {
    tagline: "Snap a receipt, get reimbursed",
    description: "Employees photograph receipts on their phone, managers approve with a tap and finance pays out without chasing paperwork.",
    features: [
      { title: "Receipt scanning", body: "Amount, date and merchant read from the photo." },
      { title: "Approval rules", body: "Route claims by amount, team or project." },
      { title: "Policies and limits", body: "Out-of-policy spend is flagged before it's approved." },
      { title: "Straight into Books", body: "Approved claims post to your accounts automatically." },
    ],
    related: ["books", "people", "projects"],
  },
  billing: {
    tagline: "Recurring revenue on autopilot",
    description: "Sell subscriptions, plans and retainers. Dobis bills customers on schedule, retries failed payments and shows your recurring revenue at a glance.",
    features: [
      { title: "Plans and add-ons", body: "Monthly, yearly or usage-based pricing." },
      { title: "Automatic invoicing", body: "Invoices and card charges on every renewal." },
      { title: "Smart dunning", body: "Retries and reminders when a payment fails." },
      { title: "MRR and churn reports", body: "Know exactly how your subscription business is doing." },
    ],
    related: ["books", "crm", "desk"],
  },
  inventory: {
    tagline: "Know what you have, everywhere, in real time",
    description: "Track stock across warehouses and stores, reorder before you run out, and pick, pack and ship orders with barcode scanning.",
    features: [
      { title: "Multi-warehouse", body: "Stock levels, transfers and locations across every site." },
      { title: "Reorder points", body: "Low stock drafts a purchase order for you to approve." },
      { title: "Batches and serial numbers", body: "Full traceability, including expiry dates." },
      { title: "Barcode and shipping", body: "Scan to pick and print carrier labels." },
    ],
    related: ["purchase", "pos", "sales"],
  },
  purchase: {
    tagline: "Buy smarter from every supplier",
    description: "Send purchase orders, compare supplier prices, receive goods against orders and match supplier bills, all connected to your stock and accounts.",
    features: [
      { title: "Purchase orders", body: "Create, approve and email POs in seconds." },
      { title: "Supplier price lists", body: "Compare vendors and lead times before you buy." },
      { title: "Goods receipts", body: "Receive full or partial deliveries into stock." },
      { title: "Three-way matching", body: "Order, receipt and bill checked before you pay." },
    ],
    related: ["inventory", "books", "expense"],
  },
  projects: {
    tagline: "Deliver projects on time and on budget",
    description: "Plan work on boards and timelines, track time against tasks and bill clients for exactly what was delivered.",
    features: [
      { title: "Boards, lists and Gantt", body: "Plan the way your team likes to work." },
      { title: "Timesheets", body: "Log hours from desktop or phone." },
      { title: "Budgets and profitability", body: "Cost against budget for every project." },
      { title: "Bill clients", body: "Turn time and expenses into invoices in Books." },
    ],
    related: ["books", "people", "crm"],
  },
  people: {
    tagline: "Everything HR, in one place",
    description: "Employee records, onboarding, leave, attendance and performance, with self-service for your team so HR isn't stuck answering emails.",
    features: [
      { title: "Employee directory", body: "Documents, contracts and history for every person." },
      { title: "Leave and attendance", body: "Requests, approvals, shifts and clock-in." },
      { title: "Onboarding checklists", body: "Every new hire gets the same smooth start." },
      { title: "Self-service app", body: "Staff update their details and request leave themselves." },
    ],
    related: ["payroll", "recruit", "expense"],
  },
  payroll: {
    tagline: "Pay your team correctly, every time",
    description: "Run payroll in a few clicks. Leave, overtime and expenses flow in from People; payslips, filings and accounting entries flow out.",
    features: [
      { title: "One-click pay runs", body: "Salaries, allowances and deductions calculated for you." },
      { title: "Payslips", body: "Delivered to every employee's app and inbox." },
      { title: "Local compliance", body: "Statutory deductions and filings for your country." },
      { title: "Posts to Books", body: "Payroll journals recorded automatically." },
    ],
    related: ["people", "books", "expense"],
  },
  recruit: {
    tagline: "Hire the right people, faster",
    description: "Post jobs to your careers page and job boards, screen applicants, schedule interviews and send offers, then hand new hires straight to onboarding.",
    features: [
      { title: "Careers page", body: "A branded jobs page that's live in minutes." },
      { title: "Hiring pipeline", body: "Move candidates through stages with your team's feedback." },
      { title: "Interview scheduling", body: "Candidates pick slots that suit your interviewers." },
      { title: "Offer to onboarding", body: "Signed offers become employee records in People." },
    ],
    related: ["people", "payroll", "sites"],
  },
  campaigns: {
    tagline: "Reach customers on email, SMS and WhatsApp",
    description: "Design campaigns, segment contacts using real sales data and see exactly how much revenue each campaign brings in.",
    features: [
      { title: "Drag-and-drop editor", body: "Good-looking emails without a designer." },
      { title: "Segments from real data", body: "Target by purchases, deal stage or location." },
      { title: "Automated journeys", body: "Welcome, win-back and follow-up sequences." },
      { title: "Revenue tracking", body: "See which campaigns led to paid invoices." },
    ],
    related: ["crm", "sites", "desk"],
  },
  desk: {
    tagline: "Help customers quickly, wherever they ask",
    description: "Email, chat, WhatsApp and phone requests land in one shared inbox. Agents see the customer's orders and invoices next to every ticket.",
    features: [
      { title: "Shared inbox", body: "Assign, prioritise and track every request." },
      { title: "SLAs and escalation", body: "Tickets escalate before they breach your targets." },
      { title: "Customer portal", body: "Customers track tickets and find answers themselves." },
      { title: "Full customer context", body: "Orders, invoices and history beside each ticket." },
    ],
    related: ["crm", "billing", "campaigns"],
  },
  sites: {
    tagline: "Build your website and online store",
    description: "Launch a fast, mobile-friendly website or online shop from templates. Orders, stock, leads and payments connect straight to your other apps.",
    features: [
      { title: "Drag-and-drop builder", body: "Templates for every industry, no code needed." },
      { title: "Online store", body: "Products, cart and checkout synced with Inventory." },
      { title: "Forms to CRM", body: "Every enquiry becomes a lead automatically." },
      { title: "SEO and custom domains", body: "Your own brand, easy to find on search engines." },
    ],
    related: ["pos", "campaigns", "crm"],
  },
};

const GROUP_BY_APP = Object.fromEntries(APP_GROUPS.flatMap((g) => g.apps.map((a) => [a.id, g])));

/** The app merged with its long-form details and its group, or undefined if the id is unknown. */
export const getApp = (id) => {
  const app = ALL_APPS.find((a) => a.id === id);
  return app && { ...app, ...APP_DETAILS[app.id], group: GROUP_BY_APP[app.id] };
};
