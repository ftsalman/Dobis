import { useState } from "react";
import Dialog from "@/components/ui/Dialog";
import Button from "@/components/ui/Button";
import { createDeal } from "../utils/workspace";

export default function NewDealDialog({ onClose, onAdd }) {
  const [error, setError] = useState("");
  const submit = (event) => {
    event.preventDefault();
    try {
      const form = Object.fromEntries(new FormData(event.currentTarget));
      onAdd(createDeal(form, crypto.randomUUID()));
      onClose();
    } catch (cause) {
      setError(cause.message);
    }
  };
  return (
    <Dialog title="A new opportunity." onClose={onClose}>
      <p className="mb-6 text-sm leading-6 text-muted">
        Add a sample deal to your pipeline. Use fictional details; everything
        stays in this browser.
      </p>
      <form onSubmit={submit} className="grid gap-5">
        {[
          ["name", "Deal name", "Website redesign", "text"],
          ["company", "Company", "Northstar Studio", "text"],
          ["value", "Deal value (USD)", "12500", "number"],
        ].map(([name, label, placeholder, type]) => (
          <label key={name} className="grid gap-2 text-sm font-medium">
            {label}
            <input
              name={name}
              type={type}
              required
              maxLength={180}
              min={type === "number" ? 0.01 : undefined}
              max={type === "number" ? 100000000 : undefined}
              step={type === "number" ? "0.01" : undefined}
              placeholder={placeholder}
              className="min-h-12 rounded-xl border border-line px-4 font-normal focus:border-brand-500"
            />
          </label>
        ))}
        {error && (
          <p role="alert" className="text-sm text-rose-700">
            {error}
          </p>
        )}
        <Button type="submit" className="mt-2">
          Create demo deal
        </Button>
      </form>
    </Dialog>
  );
}
