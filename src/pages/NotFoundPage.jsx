import React from "react";
import { PageHeader } from "@/components/PageHeader";

/** Shown inside the site layout, so visitors keep the nav and footer to find their way back. */
export const NotFoundPage = () => (
  <PageHeader
    eyebrow="404"
    title="We couldn't find that page"
    intro="It may have moved, or the link may be wrong. Try the homepage, browse all apps, or get in touch."
    actions={[
      { label: "Go to homepage", href: "/" },
      { label: "Browse all apps", href: "/apps" },
    ]}
    className="min-h-[70vh]"
  />
);
