import { Handshake, Headphones, MessagesSquare } from "lucide-react";

// Contact page data. Emails, phone numbers and offices are PLACEHOLDERS - replace before launch.

/** Why someone is getting in touch. `?topic=<id>` in the URL preselects one. */
export const TOPICS = [
  { id: "demo", label: "Book a demo", next: "We'll email you a few times for a 30-minute walkthrough within one business day." },
  { id: "sales", label: "Talk to sales", next: "A product specialist will reply within one business day with pricing and next steps." },
  { id: "trial", label: "Start a free trial", next: "Watch your inbox: your 14-day trial workspace is being set up now." },
  { id: "support", label: "Get support", next: "Our support team replies within 4 hours on weekdays. Urgent? Use live chat in the app." },
  { id: "partnership", label: "Partnerships", next: "Our partner team will review your details and reply within two business days." },
  { id: "billing", label: "Billing", next: "Our billing team will reply within one business day." },
];

// Topics where the message box is required (people need to tell us what's wrong / what they want).
export const MESSAGE_REQUIRED = ["support", "partnership", "billing"];
// Topics where company details are required.
export const COMPANY_REQUIRED = ["demo", "sales", "trial", "partnership"];

export const COMPANY_SIZES = ["Just me", "2–10", "11–50", "51–200", "201–1,000", "1,000+"];

export const CHANNELS = [
  { id: "sales", icon: MessagesSquare, title: "Sales", body: "Pricing, demos and choosing a plan.", email: "sales@dobis.com", phone: "+1 (555) 010-2040" },
  { id: "support", icon: Headphones, title: "Support", body: "Help with an existing account, 24/5.", email: "support@dobis.com", phone: "+1 (555) 010-2050" },
  { id: "partners", icon: Handshake, title: "Partners", body: "Resellers, consultants and integrations.", email: "partners@dobis.com" },
];

export const OFFICES = [
  { city: "Dubai", address: "Office 1204, Business Bay", hours: "Sun–Thu, 9:00–18:00 GST" },
  { city: "London", address: "18 Clerkenwell Road, EC1M", hours: "Mon–Fri, 9:00–17:30 GMT" },
  { city: "Bengaluru", address: "4th Floor, Indiranagar 100ft Road", hours: "Mon–Fri, 9:30–18:30 IST" },
];

export const CONTACT_FAQ = [
  { q: "How quickly will I hear back?", a: "Sales and demo requests get a reply within one business day. Support requests are answered within 4 hours on weekdays." },
  { q: "Is the demo really free?", a: "Yes. It's a 30-minute call focused on the apps you choose, with no obligation to buy." },
  { q: "Can you help us move from our current software?", a: "Yes. Guided imports are free on every plan, and our team migrates your data for you on Professional and Enterprise." },
  { q: "Do you work with local partners?", a: "We have certified implementation partners in 30+ countries who can set up Dobis on site. Ask us for an introduction." },
];
