import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  LayoutDashboard,
  Plus,
  Search,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import Brand from "@/components/ui/Brand";
import Button from "@/components/ui/Button";
import ProductIcon from "@/components/ui/ProductIcon";
import { products } from "@/features/products/constants/products";
import useWorkspace from "../hooks/useWorkspace";
import { money, moveDeal } from "../utils/workspace";
import { stages } from "../constants/demoData";
import NewDealDialog from "../components/NewDealDialog";
import { cn } from "@lib/cn";

const navItems = ["overview", "crm", "books", "projects"];
export default function WorkspacePage() {
  const [params, setParams] = useSearchParams();
  const active = navItems.includes(params.get("app"))
    ? params.get("app")
    : "overview";
  const [query, setQuery] = useState("");
  const [adding, setAdding] = useState(false);
  const [notice, setNotice] = useState("");
  const { data, warning, update } = useWorkspace();
  const select = (app) => {
    setParams({ app });
    setQuery("");
    setNotice("");
  };
  const matches = (text) =>
    text.toLowerCase().includes(query.toLowerCase().trim());
  const deals = data.deals.filter((d) => matches(`${d.name} ${d.company}`));
  const invoices = data.invoices.filter((i) =>
    matches(`${i.id} ${i.customer}`),
  );
  const tasks = data.tasks.filter((t) => matches(`${t.title} ${t.project}`));
  const pipeline = data.deals
    .filter((d) => d.stage !== "Won")
    .reduce((sum, d) => sum + d.value, 0);
  const revenue = data.invoices
    .filter((i) => i.status === "Paid")
    .reduce((sum, i) => sum + i.value, 0);
  const pending = data.invoices
    .filter((i) => i.status === "Pending")
    .reduce((sum, i) => sum + i.value, 0);
  const complete = data.tasks.filter((t) => t.done).length;
  const move = (id, stage) => {
    update((previous) => moveDeal(previous, id, stage));
    setNotice(
      stage === "Won"
        ? "Deal won. Its invoice and onboarding task are ready in Books and Projects."
        : `Deal moved to ${stage}.`,
    );
  };
  return (
    <div className="min-h-dvh bg-paper">
      <a
        href="#workspace-main"
        className="fixed left-4 top-4 z-50 -translate-y-24 rounded-lg bg-ink p-3 text-white focus:translate-y-0"
      >
        Skip to workspace
      </a>
      <header className="flex min-h-20 items-center justify-between gap-4 border-b border-line bg-white px-5 md:px-8">
        <Brand />
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-brand-50 px-3 py-1 text-[10px] font-semibold text-brand-700">
            DEMO WORKSPACE
          </span>
          <Link
            to="/"
            className="flex items-center gap-2 rounded-lg p-2 text-xs text-muted"
          >
            <ArrowLeft className="size-4" />
            <span className="hidden sm:inline">Back to website</span>
          </Link>
        </div>
      </header>
      <div className="flex flex-col lg:flex-row">
        <aside className="border-b border-line bg-white p-4 lg:min-h-[calc(100dvh-80px)] lg:w-60 lg:shrink-0 lg:border-b-0 lg:border-r lg:p-6">
          <div className="mb-8 hidden items-center gap-3 lg:flex">
            <span className="flex size-10 items-center justify-center rounded-xl bg-ink text-sm font-semibold text-white">
              NS
            </span>
            <div>
              <p className="text-sm font-semibold">Northstar Studio</p>
              <p className="mt-1 text-[10px] text-muted">Sample organization</p>
            </div>
          </div>
          <nav
            aria-label="Workspace navigation"
            className="flex gap-2 overflow-x-auto lg:flex-col"
          >
            {navItems.map((id) => (
              <button
                key={id}
                aria-current={active === id ? "page" : undefined}
                onClick={() => select(id)}
                className={cn(
                  "flex min-h-11 shrink-0 items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium",
                  active === id
                    ? "bg-brand-50 text-brand-700"
                    : "text-muted hover:bg-paper",
                )}
              >
                {id === "overview" ? (
                  <LayoutDashboard className="mx-1 size-4" />
                ) : (
                  <ProductIcon
                    product={products.find((p) => p.id === id)}
                    className="size-6 rounded-md [&>svg]:size-3.5"
                  />
                )}
                {id === "overview"
                  ? "Overview"
                  : products.find((p) => p.id === id).name}
              </button>
            ))}
          </nav>
          <div className="mt-12 hidden rounded-2xl bg-paper p-4 lg:block">
            <Sparkles className="mb-3 size-5 text-brand-600" />
            <p className="text-xs font-medium">Try a connected workflow</p>
            <p className="mt-2 text-xs leading-5 text-muted">
              Move a CRM deal to Won. Find its invoice in Books and its
              onboarding task in Projects.
            </p>
          </div>
        </aside>
        <main
          id="workspace-main"
          className="mx-auto w-full min-w-0 max-w-7xl flex-1 p-5 md:p-9"
        >
          <div className="mb-6 rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-xs leading-5 text-brand-800">
            Interactive frontend demo · Fictional records saved in this browser
            · No live accounts, payments, or integrations
          </div>
          <div className="mb-8 flex flex-wrap items-center justify-between gap-5">
            <div>
              <p className="mb-2 flex items-center gap-1 text-xs text-muted">
                Workspace <ChevronRight className="size-3" />{" "}
                {active === "overview"
                  ? "Overview"
                  : products.find((p) => p.id === active).name}
              </p>
              <h1 className="text-3xl font-semibold tracking-[-1px]">
                {
                  {
                    overview: "Your business, at a glance.",
                    crm: "Make your next connection.",
                    books: "A little financial clarity.",
                    projects: "Keep good work moving.",
                  }[active]
                }
              </h1>
            </div>
            {active === "crm" && (
              <Button onClick={() => setAdding(true)}>
                <Plus className="size-4" /> New deal
              </Button>
            )}
          </div>
          {warning && (
            <p
              role="alert"
              className="mb-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-900"
            >
              {warning}
            </p>
          )}
          <p
            role="status"
            aria-live="polite"
            className={cn(
              "text-sm text-emerald-800",
              notice && "mb-5 rounded-lg bg-emerald-50 p-3",
            )}
          >
            {notice}
          </p>
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {active === "overview" ? (
              <>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {[
                    ["Open pipeline", money(pipeline), "crm"],
                    ["Collected revenue", money(revenue), "books"],
                    ["Awaiting payment", money(pending), "books"],
                    [
                      "Tasks complete",
                      `${complete} / ${data.tasks.length}`,
                      "projects",
                    ],
                  ].map(([label, value, destination]) => (
                    <button
                      key={label}
                      onClick={() => select(destination)}
                      className="rounded-2xl border border-line bg-white p-6 text-left transition hover:border-brand-300"
                    >
                      <div className="flex justify-between">
                        <p className="text-xs text-muted">{label}</p>
                        <ArrowUpRight className="size-4 text-muted" />
                      </div>
                      <p className="mt-4 text-3xl font-semibold tracking-tight">
                        {value}
                      </p>
                      <p className="mt-4 text-[10px] text-muted">
                        From your demo records
                      </p>
                    </button>
                  ))}
                </div>
                <div className="mt-8 grid gap-6 xl:grid-cols-[1.3fr_1fr]">
                  <section className="rounded-2xl border border-line bg-white p-6">
                    <div className="mb-6 flex items-center justify-between">
                      <h2 className="font-semibold">Your sales pipeline</h2>
                      <button
                        onClick={() => select("crm")}
                        className="text-xs font-medium text-brand-700"
                      >
                        View CRM →
                      </button>
                    </div>
                    <div className="grid gap-6">
                      {stages.map((stage) => {
                        const count = data.deals.filter(
                          (d) => d.stage === stage,
                        ).length;
                        return (
                          <div key={stage}>
                            <div className="mb-2 flex justify-between text-xs">
                              <span>{stage}</span>
                              <span className="text-muted">
                                {count} {count === 1 ? "deal" : "deals"}
                              </span>
                            </div>
                            <div className="h-2.5 overflow-hidden rounded-full bg-paper">
                              <div
                                className="h-full rounded-full bg-brand-500"
                                style={{
                                  width: `${data.deals.length ? (count / data.deals.length) * 100 : 0}%`,
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                  <section className="rounded-2xl bg-ink p-7 text-white">
                    <Sparkles className="mb-6 size-7 text-lime" />
                    <p className="text-[10px] uppercase tracking-widest text-white/50">
                      One workspace. More possibilities.
                    </p>
                    <h2 className="my-3 text-2xl font-medium leading-8">
                      From “nice to meet you”
                      <br />
                      to “let’s get started.”
                    </h2>
                    <p className="text-sm leading-6 text-white/60">
                      Close a deal, prepare an invoice, and kick off a project.
                      Try the complete journey with demo data.
                    </p>
                    <Button
                      onClick={() => select("crm")}
                      variant="light"
                      className="mt-7"
                    >
                      Start in CRM <ArrowRight className="size-4" />
                    </Button>
                  </section>
                </div>
                <section className="mt-8 rounded-2xl border border-line bg-white p-6">
                  <h2 className="mb-5 font-semibold">Up next</h2>
                  {data.tasks
                    .filter((t) => !t.done)
                    .slice(0, 3)
                    .map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center justify-between gap-4 border-t border-line py-4"
                      >
                        <div>
                          <p className="text-sm">{task.title}</p>
                          <p className="mt-1 text-xs text-muted">
                            {task.project}
                          </p>
                        </div>
                        <button
                          onClick={() => select("projects")}
                          className="rounded-lg p-2 text-brand-600"
                          aria-label={`View ${task.title}`}
                        >
                          <ArrowRight className="size-4" />
                        </button>
                      </div>
                    ))}
                  {data.tasks.every((t) => t.done) && (
                    <p className="text-sm text-muted">
                      All caught up. Your tasks are complete.
                    </p>
                  )}
                </section>
              </>
            ) : (
              <>
                <label className="mb-6 flex max-w-md items-center gap-3 rounded-xl border border-line bg-white px-4 py-3">
                  <Search className="size-4 text-muted" />
                  <input
                    aria-label={`Search ${active}`}
                    placeholder={`Search ${active === "crm" ? "deals or companies" : active === "books" ? "invoices or customers" : "tasks or projects"}…`}
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    className="w-full text-sm outline-none"
                  />
                </label>
                {active === "crm" && (
                  <>
                    <p className="mb-4 text-xs text-muted">
                      Change a deal’s stage to move it through the pipeline.
                      Marking it Won creates an invoice and task once.
                    </p>
                    <div className="grid items-start gap-4 md:grid-cols-2 xl:grid-cols-4">
                      {stages.map((stage) => (
                        <section
                          key={stage}
                          className="rounded-2xl border border-line bg-white/40 p-3"
                        >
                          <h2 className="mb-4 flex justify-between px-1 text-sm font-semibold">
                            {stage}
                            <span className="rounded-full bg-white px-2 text-xs text-muted">
                              {deals.filter((d) => d.stage === stage).length}
                            </span>
                          </h2>
                          <div className="grid gap-3">
                            {deals
                              .filter((d) => d.stage === stage)
                              .map((deal) => (
                                <article
                                  key={deal.id}
                                  className="rounded-xl border border-line bg-white p-4"
                                >
                                  <p className="text-[10px] text-muted">
                                    {deal.company}
                                  </p>
                                  <h3 className="mb-4 mt-2 text-sm font-semibold">
                                    {deal.name}
                                  </h3>
                                  <p className="text-lg font-semibold tracking-tight">
                                    {money(deal.value)}
                                  </p>
                                  <label className="mt-5 block">
                                    <span className="sr-only">
                                      Stage for {deal.name}
                                    </span>
                                    <select
                                      value={deal.stage}
                                      onChange={(event) =>
                                        move(deal.id, event.target.value)
                                      }
                                      className="w-full rounded-lg border border-line bg-paper p-2 text-xs"
                                    >
                                      {stages.map((s) => (
                                        <option key={s}>{s}</option>
                                      ))}
                                    </select>
                                  </label>
                                </article>
                              ))}
                            {!deals.some((d) => d.stage === stage) && (
                              <p className="rounded-xl border border-dashed border-line px-3 py-8 text-center text-xs text-muted">
                                No deals in this stage
                              </p>
                            )}
                          </div>
                        </section>
                      ))}
                    </div>
                  </>
                )}
                {active === "books" && (
                  <div className="overflow-x-auto rounded-2xl border border-line bg-white">
                    <table className="w-full min-w-[620px] text-left text-sm">
                      <caption className="border-b border-line p-5 text-left text-xs text-muted">
                        Demo invoices · “Mark paid” changes local sample data
                        only.
                      </caption>
                      <thead className="border-b border-line bg-paper/50 text-xs text-muted">
                        <tr>
                          {[
                            "Invoice",
                            "Customer",
                            "Amount",
                            "Status",
                            "Action",
                          ].map((heading) => (
                            <th key={heading} className="px-5 py-4 font-medium">
                              {heading}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {invoices.map((invoice) => (
                          <tr
                            key={invoice.id}
                            className="border-b border-line last:border-0"
                          >
                            <td
                              className="max-w-40 truncate px-5 py-5"
                              title={invoice.id}
                            >
                              {invoice.id}
                            </td>
                            <td className="px-5 py-5">{invoice.customer}</td>
                            <td className="px-5 py-5 font-medium">
                              {money(invoice.value)}
                            </td>
                            <td className="px-5 py-5">
                              <span
                                className={cn(
                                  "rounded-full px-2.5 py-1 text-xs",
                                  invoice.status === "Paid"
                                    ? "bg-emerald-50 text-emerald-800"
                                    : "bg-amber-50 text-amber-800",
                                )}
                              >
                                {invoice.status}
                              </span>
                            </td>
                            <td className="px-5 py-5">
                              {invoice.status === "Pending" ? (
                                <button
                                  aria-label={`Mark ${invoice.id} paid`}
                                  onClick={() => {
                                    update((previous) => ({
                                      ...previous,
                                      invoices: previous.invoices.map((i) =>
                                        i.id === invoice.id
                                          ? { ...i, status: "Paid" }
                                          : i,
                                      ),
                                    }));
                                    setNotice(
                                      `${invoice.id} marked paid in this demo. No payment was processed.`,
                                    );
                                  }}
                                  className="min-h-10 rounded-lg border border-line px-3 text-xs font-medium hover:bg-brand-50"
                                >
                                  Mark paid
                                </button>
                              ) : (
                                <span className="flex items-center gap-1 text-xs text-emerald-700">
                                  <Check className="size-4" /> Recorded
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {!invoices.length && (
                      <p className="p-10 text-center text-sm text-muted">
                        No invoices match your search.
                      </p>
                    )}
                  </div>
                )}
                {active === "projects" && (
                  <div className="rounded-2xl border border-line bg-white p-5">
                    <div className="mb-5 flex flex-wrap justify-between gap-3">
                      <h2 className="font-semibold">Team tasks</h2>
                      <span className="text-xs text-muted">
                        {complete} of {data.tasks.length} complete
                      </span>
                    </div>
                    {tasks.map((task) => (
                      <label
                        key={task.id}
                        className="flex cursor-pointer items-center gap-4 border-t border-line py-5"
                      >
                        <input
                          type="checkbox"
                          checked={task.done}
                          onChange={() => {
                            update((previous) => ({
                              ...previous,
                              tasks: previous.tasks.map((t) =>
                                t.id === task.id ? { ...t, done: !t.done } : t,
                              ),
                            }));
                            setNotice(
                              task.done ? "Task reopened." : "Task completed.",
                            );
                          }}
                          className="size-5 shrink-0 accent-brand-600"
                        />
                        <span className="flex-1">
                          <span
                            className={cn(
                              "block text-sm font-medium",
                              task.done && "text-muted line-through",
                            )}
                          >
                            {task.title}
                          </span>
                          <span className="mt-1 block text-xs text-muted">
                            {task.project}
                          </span>
                        </span>
                        <span
                          className={cn(
                            "hidden rounded-full px-3 py-1 text-xs sm:block",
                            task.done
                              ? "bg-emerald-50 text-emerald-800"
                              : "bg-paper text-muted",
                          )}
                        >
                          {task.done ? "Done" : "To do"}
                        </span>
                      </label>
                    ))}
                    {!tasks.length && (
                      <p className="p-10 text-center text-sm text-muted">
                        No tasks match your search.
                      </p>
                    )}
                  </div>
                )}
              </>
            )}
          </motion.div>
        </main>
      </div>
      {adding && (
        <NewDealDialog
          onClose={() => setAdding(false)}
          onAdd={(deal) => {
            update((previous) => ({
              ...previous,
              deals: [...previous.deals, deal],
            }));
            setNotice(`${deal.name} added to your pipeline.`);
          }}
        />
      )}
    </div>
  );
}
