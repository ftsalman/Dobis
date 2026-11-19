import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Search, X } from "lucide-react";
import { products, categories } from "../constants/products";
import ProductIcon from "@/components/ui/ProductIcon";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@lib/cn";

export default function ProductCatalog() {
  const [category, setCategory] = useState("All products");
  const [query, setQuery] = useState("");
  const visible = products.filter(
    (p) =>
      (category === "All products" || p.category === category) &&
      `${p.name} ${p.description} ${p.features.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase().trim()),
  );
  return (
    <section
      id="products"
      className="mx-auto max-w-7xl px-5 py-24 lg:px-10 lg:py-28"
    >
      <Reveal>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
              The Dobis ecosystem
            </p>
            <h2 className="text-4xl font-medium leading-[1.12] tracking-[-1.8px] md:text-5xl">
              Big ambitions.
              <br />
              <span className="text-muted">Meet your toolkit.</span>
            </h2>
          </div>
          <p className="max-w-sm text-base leading-7 text-muted">
            Start with what you need. Add what comes next.
            <br className="hidden md:block" /> Every product is better together.
          </p>
        </div>
      </Reveal>
      <div className="mb-8 mt-10 flex flex-col justify-between gap-5 xl:flex-row">
        <div
          className="flex flex-wrap gap-1.5"
          aria-label="Filter products by category"
        >
          {categories.map((name) => (
            <button
              key={name}
              aria-pressed={category === name}
              onClick={() => setCategory(name)}
              className={cn(
                "min-h-10 rounded-full px-4 py-2 text-xs font-medium transition-colors",
                category === name
                  ? "bg-ink text-white"
                  : "bg-paper text-muted hover:bg-brand-50 hover:text-brand-700",
              )}
            >
              {name}
            </button>
          ))}
        </div>
        <label className="flex min-h-10 items-center gap-2 rounded-full border border-line px-4 text-muted">
          <Search className="size-4" />
          <input
            aria-label="Search products"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find your next tool"
            className="min-w-0 bg-transparent text-xs outline-none"
          />
          {query && (
            <button aria-label="Clear search" onClick={() => setQuery("")}>
              <X className="size-4" />
            </button>
          )}
        </label>
      </div>
      <p className="sr-only" role="status">
        {visible.length} products found
      </p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="group flex min-h-64 flex-col rounded-2xl border border-line bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-100/40"
          >
            <div className="mb-6 flex items-center justify-between">
              <ProductIcon product={product} />
              <ArrowUpRight className="size-5 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-600" />
            </div>
            <h3 className="text-xl font-semibold tracking-tight">
              Dobis {product.name}
            </h3>
            <p className="mt-2 max-w-xs text-sm leading-6 text-muted">
              {product.description}
            </p>
            <span className="mt-6 text-[10px] font-medium uppercase tracking-wider text-muted">
              {product.category}
            </span>
          </Link>
        ))}
      </div>
      {visible.length === 0 && (
        <div className="rounded-2xl border border-dashed border-line p-12 text-center">
          <h3 className="font-semibold">No products found</h3>
          <p className="mt-2 text-sm text-muted">
            Try another keyword or explore every category.
          </p>
          <button
            onClick={() => {
              setQuery("");
              setCategory("All products");
            }}
            className="mt-5 font-semibold text-brand-600"
          >
            Reset filters
          </button>
        </div>
      )}
    </section>
  );
}
