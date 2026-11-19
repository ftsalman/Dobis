import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { getProduct, products } from "../constants/products";
import ProductIcon from "@/components/ui/ProductIcon";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import WorkspacePreview from "@/features/home/components/WorkspacePreview";
import { NotFoundPage } from "@/pages/NotFoundPage";

export default function ProductPage() {
  const { slug } = useParams();
  const product = getProduct(slug);
  if (!product) return <NotFoundPage />;
  return (
    <>
      <section className="bg-paper px-5 py-16 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <Link
            to="/#products"
            className="mb-12 inline-flex items-center gap-2 text-sm text-muted"
          >
            <ArrowLeft className="size-4" /> All products
          </Link>
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <Reveal>
              <div className="mb-7 flex items-center gap-3">
                <ProductIcon product={product} />
                <span className="font-semibold">Dobis {product.name}</span>
                <span className="rounded-full border border-line px-2 py-1 text-[10px] text-muted">
                  PRODUCT CONCEPT
                </span>
              </div>
              <h1 className="max-w-xl text-5xl font-medium leading-[1.08] tracking-[-2.5px] md:text-6xl">
                {product.tagline}
              </h1>
              <p className="mt-7 max-w-md text-lg leading-8 text-muted">
                {product.description}
              </p>
              <Button
                to={`/workspace?app=${["crm", "books", "projects"].includes(product.id) ? product.id : "overview"}`}
                className="mt-8"
              >
                Explore workspace demo <ArrowRight className="size-4" />
              </Button>
              <p className="mt-4 text-xs text-muted">
                Illustrative product experience. No account required.
              </p>
            </Reveal>
            <WorkspacePreview />
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-700">
          Designed around your day
        </p>
        <h2 className="mt-4 text-3xl font-medium tracking-tight">
          The right tools. A little more headspace.
        </h2>
        <div className="mt-9 grid gap-4 md:grid-cols-2">
          {product.features.map((feature, i) => (
            <div
              key={feature}
              className="flex items-center gap-5 rounded-2xl border border-line p-6"
            >
              <span className="font-mono text-xs text-muted">0{i + 1}</span>
              <Check className="size-5 text-brand-600" />
              <h3 className="font-medium">{feature}</h3>
            </div>
          ))}
        </div>
        <p className="mt-5 text-xs text-muted">
          Proposed capabilities for the production roadmap; the demo implements
          selected CRM, invoice, and task interactions.
        </p>
        <h2 className="mb-7 mt-20 text-3xl font-medium tracking-tight">
          Make the connection.
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {products
            .filter((p) => p.id !== product.id)
            .slice(0, 3)
            .map((p) => (
              <Link
                key={p.id}
                to={`/products/${p.id}`}
                className="flex items-center gap-4 rounded-xl bg-paper p-5 hover:bg-brand-50"
              >
                <ProductIcon product={p} />
                <span className="flex-1 font-medium">Dobis {p.name}</span>
                <ArrowRight className="size-4" />
              </Link>
            ))}
        </div>
      </section>
    </>
  );
}
