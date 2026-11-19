export const products = [
  {
    id: "crm",
    name: "CRM",
    category: "Sales & marketing",
    icon: "UsersRound",
    tone: "violet",
    tagline: "Turn conversations into customers.",
    description:
      "Keep every relationship, opportunity, and next step in one clear view.",
    features: [
      "Visual sales pipelines",
      "Contact and company profiles",
      "Follow-up reminders",
      "Revenue forecasting",
    ],
    price: 12,
  },
  {
    id: "books",
    name: "Books",
    category: "Finance",
    icon: "Wallet",
    tone: "green",
    tagline: "A clearer picture of your finances.",
    description:
      "Bring invoices, expenses, and payments together. Spend less time chasing the numbers.",
    features: [
      "Invoices and payment tracking",
      "Expense categorization",
      "Financial reporting",
      "Recurring billing workflows",
    ],
    price: 9,
  },
  {
    id: "projects",
    name: "Projects",
    category: "Operations",
    icon: "Layers3",
    tone: "blue",
    tagline: "Good work. Moving forward.",
    description:
      "Give your team a shared plan, clear ownership, and a little more room to focus.",
    features: [
      "Boards and task lists",
      "Milestones and dependencies",
      "Team workload views",
      "Time tracking",
    ],
    price: 8,
  },
  {
    id: "people",
    name: "People",
    category: "People",
    icon: "ContactRound",
    tone: "rose",
    tagline: "Put your people first.",
    description:
      "Create a thoughtful employee experience, from their first day to their next big step.",
    features: [
      "Employee directory",
      "Onboarding checklists",
      "Leave requests",
      "Performance conversations",
    ],
    price: 7,
  },
  {
    id: "desk",
    name: "Desk",
    category: "Operations",
    icon: "Headphones",
    tone: "amber",
    tagline: "Every customer deserves a human touch.",
    description:
      "Bring support requests into one inbox and help your team find the right answer.",
    features: [
      "Shared support inbox",
      "Ticket assignment",
      "Knowledge base",
      "Response time reporting",
    ],
    price: 8,
  },
  {
    id: "campaigns",
    name: "Campaigns",
    category: "Sales & marketing",
    icon: "Megaphone",
    tone: "purple",
    tagline: "Make your next connection count.",
    description:
      "Plan campaigns around your customers, with audience context already at hand.",
    features: [
      "Audience segmentation",
      "Email campaign builder",
      "Campaign scheduling",
      "Engagement reporting",
    ],
    price: 10,
  },
];
export const categories = [
  "All products",
  "Sales & marketing",
  "Finance",
  "Operations",
  "People",
];
export const getProduct = (id) => products.find((product) => product.id === id);
