// Testimonials section. PLACEHOLDER people, companies, quotes and ratings - replace with real,
// approved customer quotes before launch.

export const TESTIMONIALS_COPY = {
  eyebrow: "Testimonials",
  title: "Teams that switched never looked back",
  rating: { score: 4.8, count: "2,400+", label: "average rating from verified reviews" },
};

/** `featured` quotes rotate in the large card; every quote appears in the filterable wall. */
export const TESTIMONIALS = [
  {
    id: "t1",
    app: "CRM",
    featured: true,
    metric: { value: "32%", label: "more deals closed in a quarter" },
    quote:
      "We used to lose deals in spreadsheets and sticky notes. Now every lead has an owner, a next step and a reminder. Our close rate went up in the first quarter and nobody had to be trained twice.",
    name: "Maya Rahman",
    role: "Head of Sales",
    company: "Halcyon",
    rating: 5,
  },
  {
    id: "t2",
    app: "Books",
    featured: true,
    metric: { value: "2 days", label: "to close the month, down from 9" },
    quote:
      "Bank feeds match themselves, invoices go out on time and our accountant logs straight in. Month-end used to take over a week. Now it is a two-day checklist.",
    name: "Daniel Okafor",
    role: "Finance Manager",
    company: "Brightpath",
    rating: 5,
  },
  {
    id: "t3",
    app: "Inventory",
    featured: true,
    metric: { value: "-38%", label: "stock-outs in six months" },
    quote:
      "Three warehouses, one stock count. Reorder points create purchase orders for us, so our best sellers stay on the shelf and we stopped over-ordering the slow ones.",
    name: "Priya Nair",
    role: "Operations Lead",
    company: "Kestrel Foods",
    rating: 5,
  },
  {
    id: "t4",
    app: "People",
    featured: true,
    metric: { value: "0", label: "payroll errors this year" },
    quote:
      "Leave, attendance and payroll finally talk to each other. Approvals take a tap on my phone and payslips go out on time, every month, for 260 people in three countries.",
    name: "Lucas Moreau",
    role: "HR Director",
    company: "Atlas Labs",
    rating: 5,
  },
  {
    id: "t5",
    app: "Projects",
    quote: "Timesheets turn into invoices without anyone copying numbers across. Our project margins are finally visible while the work is still happening.",
    name: "Sara Lindqvist",
    role: "Studio Director",
    company: "Oakline Studio",
    rating: 5,
  },
  {
    id: "t6",
    app: "CRM",
    quote: "The agent drafts follow-ups after every call. I review, tweak one line and send. It gives me back an hour a day.",
    name: "Tom Reyes",
    role: "Account Executive",
    company: "Meridian",
    rating: 5,
  },
  {
    id: "t7",
    app: "Books",
    quote: "Multi-currency invoicing used to be a headache. doBis handles the exchange rates and the tax reports, and our auditors liked the trail.",
    name: "Aisha Al-Mansoori",
    role: "CFO",
    company: "Ferro Supply",
    rating: 4,
  },
  {
    id: "t8",
    app: "Inventory",
    quote: "Barcode scanning on the phone app means receiving goods takes minutes. Our counts finally match what is on the shelves.",
    name: "Ken Watanabe",
    role: "Warehouse Manager",
    company: "Quarry & Co",
    rating: 5,
  },
  {
    id: "t9",
    app: "People",
    quote: "New hires get their laptop, accounts and onboarding checklist before day one. It feels like a much bigger HR team than it is.",
    name: "Grace Mensah",
    role: "People Partner",
    company: "Northwind Retail",
    rating: 5,
  },
  {
    id: "t10",
    app: "Projects",
    quote: "Clients see progress in the portal, so the 'where are we?' emails stopped. Our team just works the board.",
    name: "Ravi Das",
    role: "Delivery Lead",
    company: "Atlas Labs",
    rating: 4,
  },
  {
    id: "t11",
    app: "CRM",
    quote: "We moved 40,000 contacts over in an afternoon with the import wizard. No consultant, no downtime.",
    name: "Ana Silva",
    role: "Revenue Operations",
    company: "Lumen & Co",
    rating: 5,
  },
  {
    id: "t12",
    app: "Books",
    quote: "Expense claims with a photo of the receipt, approved from Slack, reimbursed with payroll. My team stopped chasing paper.",
    name: "Jo Kim",
    role: "Office Manager",
    company: "Halcyon",
    rating: 5,
  },
];

export const TESTIMONIAL_FILTERS = ["All", "CRM", "Books", "Inventory", "People", "Projects"];
