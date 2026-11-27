import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Command,
  LayoutDashboard,
  Plus,
  Search,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ProductIcon from "@/components/ui/ProductIcon";
import { products } from "@/features/products/constants/products";
import { cn } from "@lib/cn";

const views = {
  crm: {
    label: "Sales overview",
    metric: "$48,250",
    caption: "Pipeline value",
    secondary: "12",
    secondaryLabel: "Open opportunities",
    rows: [
      ["Website redesign", "Proposal", "$12,500"],
      ["Brand partnership", "Qualified", "$8,750"],
      ["Growth retainer", "Won", "$4,200"],
    ],
  },
  books: {
    label: "Finance overview",
    metric: "$32,840",
    caption: "Revenue this month",
    secondary: "8",
    secondaryLabel: "Invoices to follow up",
    rows: [
      ["INV–1042 · Northstar", "Paid", "$5,200"],
      ["INV–1043 · Forma", "Pending", "$3,800"],
      ["INV–1044 · Studio Co.", "Paid", "$2,450"],
    ],
  },
  projects: {
    label: "Project overview",
    metric: "24 / 32",
    caption: "Tasks completed",
    secondary: "4",
    secondaryLabel: "Active projects",
    rows: [
      ["Website launch", "In progress", "Jun 24"],
      ["Brand guidelines", "Review", "Jun 26"],
      ["Campaign kickoff", "Done", "Jun 28"],
    ],
  },
};
export default function WorkspacePreview() {
  const [active, setActive] = useState("crm");
  const view = views[active];
  return (
    <div className="relative mx-auto w-full max-w-[650px] text-left">
      <div className="relative rounded-[22px] border border-white/70 bg-white p-1.5 shadow-[0_25px_80px_-20px_rgba(15,27,76,0.23)]">
        <div className="flex items-center justify-between rounded-t-2xl border-b border-line bg-paper/80 px-4 py-3">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="size-2 rounded-full bg-rose-300" />
            <span className="size-2 rounded-full bg-amber-300" />
            <span className="size-2 rounded-full bg-emerald-300" />
          </span>
          <span className="flex items-center gap-1.5 text-[10px] font-medium text-muted">
            <Command className="size-3" /> doBis workspace
          </span>
          <span className="rounded bg-brand-50 px-1.5 py-0.5 text-[9px] text-brand-700">
            DEMO
          </span>
        </div>
        <div className="flex min-h-[362px]">
          <aside className="flex w-14 shrink-0 flex-col items-center gap-4 border-r border-line py-5 sm:w-16">
            <Command className="mb-2 size-6 text-brand-600" />
            <LayoutDashboard className="size-4 text-muted" />
            {products.slice(0, 3).map((p) => (
              <button
                key={p.id}
                aria-label={`Preview ${p.name}`}
                aria-pressed={active === p.id}
                onClick={() => setActive(p.id)}
                className={cn(
                  "rounded-xl p-1",
                  active === p.id && "ring-2 ring-brand-400 ring-offset-2",
                )}
              >
                <ProductIcon
                  product={p}
                  className="size-8 rounded-lg [&>svg]:size-4"
                />
              </button>
            ))}
            <Link
              aria-label="Open full workspace"
              to="/workspace"
              className="mt-auto rounded-lg p-2 text-muted"
            >
              <Plus className="size-4" />
            </Link>
          </aside>
          <div className="min-w-0 flex-1 p-4 sm:p-6">
            <div className="mb-6 flex items-center justify-between">
              <span className="flex items-center gap-2 text-[10px] text-muted">
                Workspace <span>/</span>{" "}
                <span className="font-medium text-ink">
                  {products.find((p) => p.id === active).name}
                </span>
              </span>
              <span className="flex size-6 items-center justify-center rounded-full bg-brand-100 text-[8px] font-bold text-brand-700">
                JD
              </span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <div className="mb-4 flex items-end justify-between gap-2">
                  <div>
                    <p className="text-[10px] text-muted">
                      A little clarity for your day.
                    </p>
                    <h2 className="mt-1 text-lg font-semibold tracking-tight sm:text-xl">
                      {view.label}
                    </h2>
                  </div>
                  <span className="hidden items-center gap-1 rounded-md border border-line px-2 py-1 text-[9px] sm:flex">
                    This month <ChevronDown className="size-3" />
                  </span>
                </div>
                <div className="mb-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-brand-50 p-3.5">
                    <p className="text-[10px] text-muted">{view.caption}</p>
                    <p className="mt-2 text-[23px] font-semibold tracking-tight">
                      {view.metric}
                    </p>
                    <span className="mt-1 inline-flex items-center text-[9px] text-emerald-700">
                      <ArrowUpRight className="size-3" /> 18.6% from last month
                    </span>
                  </div>
                  <div className="rounded-xl border border-line p-3.5">
                    <p className="text-[10px] text-muted">
                      {view.secondaryLabel}
                    </p>
                    <p className="mt-2 text-[23px] font-semibold">
                      {view.secondary}
                    </p>
                    <div
                      className="mt-2 flex h-5 items-end gap-1"
                      aria-hidden="true"
                    >
                      {[30, 50, 35, 60, 55, 70, 65, 90, 80, 100].map(
                        (height, i) => (
                          <span
                            key={i}
                            style={{ height: `${height}%` }}
                            className="w-full rounded-t-sm bg-brand-300"
                          />
                        ),
                      )}
                    </div>
                  </div>
                </div>
                <div className="mb-2 flex justify-between text-[10px] font-semibold">
                  <span>Recent activity</span>
                  <Search className="size-3 text-muted" />
                </div>
                <div>
                  {view.rows.map(([name, status, value]) => (
                    <div
                      key={name}
                      className="grid grid-cols-[1fr_auto] items-center gap-2 border-b border-line/70 py-2.5 text-[9px] sm:grid-cols-[1fr_70px_50px]"
                    >
                      <span className="truncate font-medium">{name}</span>
                      <span className="hidden rounded-full bg-paper px-2 py-1 text-center text-muted sm:block">
                        {status}
                      </span>
                      <span className="text-right text-muted">{value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="flex items-center justify-between rounded-b-2xl border-t border-line bg-paper/60 px-4 py-2.5 text-[9px] text-muted">
          <span className="flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-emerald-500" /> One
            connected workspace
          </span>
          <Link
            to="/workspace"
            className="flex items-center gap-1 font-medium text-brand-700"
          >
            Try the demo <ArrowUpRight className="size-3" />
          </Link>
        </div>
      </div>
      <div className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-2xl border border-line bg-white p-3 shadow-lg sm:-left-6">
        <span className="flex size-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
          <Check className="size-4" />
        </span>
        <div>
          <p className="text-xs font-semibold">Deal won. Next step, handled.</p>
          <p className="mt-0.5 text-[10px] text-muted">
            CRM → Books → Projects
          </p>
        </div>
        <Sparkles className="ml-3 size-4 text-brand-500" />
      </div>
    </div>
  );
}
