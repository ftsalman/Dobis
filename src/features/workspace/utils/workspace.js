import { stages } from "../constants/demoData.js";

const validText = (value) =>
  typeof value === "string" && value.trim().length > 0 && value.length <= 240;
const validValue = (value) =>
  Number.isFinite(value) &&
  value >= 0.01 &&
  value <= 100000000 &&
  Math.abs(Math.round(value * 100) - value * 100) < 0.00001;
const validDealId = (id) => id === null || validText(id);
export function isWorkspace(value) {
  return Boolean(
    value &&
    ["deals", "invoices", "tasks"].every(
      (key) =>
        Array.isArray(value[key]) &&
        value[key].length <= 1000 &&
        new Set(value[key].map((item) => item?.id)).size === value[key].length,
    ) &&
    value.deals.every(
      (d) =>
        d &&
        validText(d.id) &&
        validText(d.name) &&
        validText(d.company) &&
        validValue(d.value) &&
        stages.includes(d.stage),
    ) &&
    value.invoices.every(
      (i) =>
        i &&
        validText(i.id) &&
        validText(i.customer) &&
        validValue(i.value) &&
        ["Pending", "Paid"].includes(i.status) &&
        validDealId(i.dealId),
    ) &&
    value.tasks.every(
      (t) =>
        t &&
        validText(t.id) &&
        validText(t.title) &&
        validText(t.project) &&
        typeof t.done === "boolean" &&
        validDealId(t.dealId),
    ),
  );
}
export function createDeal(input, id) {
  const deal = {
    id,
    name: input.name.trim(),
    company: input.company.trim(),
    value: Number(input.value),
    stage: "New",
  };
  if (
    !validText(deal.id) ||
    !validText(deal.name) ||
    !validText(deal.company) ||
    !validValue(deal.value)
  )
    throw new Error(
      "Enter a deal name, company, and a value between $0.01 and $100,000,000.",
    );
  return deal;
}
export function moveDeal(workspace, id, stage) {
  if (!stages.includes(stage)) throw new Error("Choose a valid sales stage.");
  const deal = workspace.deals.find((item) => item.id === id);
  if (!deal) return workspace;
  const next = {
    ...workspace,
    deals: workspace.deals.map((item) =>
      item.id === id ? { ...item, stage } : item,
    ),
  };
  if (stage === "Won") {
    if (!workspace.invoices.some((invoice) => invoice.dealId === id))
      next.invoices = [
        ...workspace.invoices,
        {
          id: `INV-${id}`,
          dealId: id,
          customer: deal.company,
          value: deal.value,
          status: "Pending",
        },
      ];
    if (!workspace.tasks.some((task) => task.dealId === id))
      next.tasks = [
        ...workspace.tasks,
        {
          id: `TASK-${id}`,
          dealId: id,
          title: "Schedule customer kickoff",
          project: `${deal.company} onboarding`,
          done: false,
        },
      ];
  }
  return next;
}
export const money = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
