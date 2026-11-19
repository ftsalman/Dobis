import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { products } from "@/features/products/constants/products";
import Dialog from "@/components/ui/Dialog";
import Button from "@/components/ui/Button";
import ProductIcon from "@/components/ui/ProductIcon";
import { cn } from "@lib/cn";

export default function SuiteBuilder({ onClose }) {
  const [selected, setSelected] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("dobis-suite-v1"));
      if (
        Array.isArray(saved) &&
        saved.length > 0 &&
        saved.every((id) => products.some((p) => p.id === id))
      )
        return [...new Set(saved)];
    } catch {
      /* A fresh selection is still available when storage is blocked. */
    }
    return ["crm", "books", "projects"];
  });
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const total = products
    .filter((p) => selected.includes(p.id))
    .reduce((sum, p) => sum + p.price, 0);
  const save = () => {
    try {
      localStorage.setItem("dobis-suite-v1", JSON.stringify(selected));
      setSaved(true);
    } catch {
      setError(
        "Your browser could not save the selection. You can still explore the demo.",
      );
    }
  };
  return (
    <Dialog
      title={
        saved
          ? "Your suite is taking shape."
          : "A suite that fits your business."
      }
      onClose={onClose}
    >
      {saved ? (
        <div>
          <span className="mb-5 inline-flex size-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <Check />
          </span>
          <p className="leading-7 text-muted">
            Your {selected.length}-product selection is saved on this browser.
            Explore the demo workspace to see how sales, finance, and projects
            can fit together.
          </p>
          <Button to="/workspace" onClick={onClose} className="mt-6">
            Open demo workspace <ArrowRight className="size-4" />
          </Button>
          <p className="mt-4 text-xs text-muted">
            No account or subscription has been created.
          </p>
        </div>
      ) : (
        <>
          <p className="mb-5 text-sm leading-6 text-muted">
            Pick the tools you need today. These are illustrative per-user
            monthly prices, not a checkout.
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {products.map((p) => (
              <button
                key={p.id}
                aria-pressed={selected.includes(p.id)}
                onClick={() =>
                  setSelected((previous) =>
                    previous.includes(p.id)
                      ? previous.filter((id) => id !== p.id)
                      : [...previous, p.id],
                  )
                }
                className={cn(
                  "flex items-center gap-3 rounded-xl border p-3 text-left",
                  selected.includes(p.id)
                    ? "border-brand-500 bg-brand-50"
                    : "border-line",
                )}
              >
                <ProductIcon
                  product={p}
                  className="size-9 rounded-lg [&>svg]:size-4"
                />
                <span className="flex-1">
                  <strong className="block text-sm">{p.name}</strong>
                  <span className="text-xs text-muted">${p.price} / month</span>
                </span>
                {selected.includes(p.id) && (
                  <Check className="size-4 text-brand-600" />
                )}
              </button>
            ))}
          </div>
          <div className="my-6 flex justify-between border-t border-line pt-5">
            <span className="text-sm text-muted">
              {selected.length} products · per user / month
            </span>
            <strong>${total}</strong>
          </div>
          {error && (
            <p role="alert" className="mb-3 text-sm text-rose-700">
              {error}
            </p>
          )}
          <Button disabled={!selected.length} onClick={save} className="w-full">
            Save my demo suite <ArrowRight className="size-4" />
          </Button>
        </>
      )}
    </Dialog>
  );
}
