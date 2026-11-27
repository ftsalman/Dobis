import React from "react";
import { CtaButton } from "@/features/home/components/CtaButton";
import { Reveal } from "@/components/Reveal";

/** Closing call to action for inner pages: blue band, title, line of copy, two buttons. */
export const CtaBand = ({
  title = "Ready to run your business on doBis?",
  body = "Free for up to 3 users, no card needed. Or talk to us and we'll set it up for you.",
  primary = { label: "Start free", href: "/pricing" },
  secondary = { label: "Book a demo", href: "/book-demo" },
}) => (
  <section className="px-2.5 pb-2.5">
    <Reveal className="rounded-[28px] bg-flow px-6 py-20 text-center sm:py-24">
      <h2 className="mx-auto max-w-3xl text-[36px] font-bold leading-[1.05] tracking-[-0.03em] text-canvas sm:text-[52px]">{title}</h2>
      <p className="mx-auto mt-5 max-w-xl text-lg text-canvas/85">{body}</p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <CtaButton href={primary.href} tone="light" arrow>
          {primary.label}
        </CtaButton>
        <CtaButton href={secondary.href} className="border-canvas/40 bg-transparent text-canvas hover:border-canvas hover:bg-white/10">
          {secondary.label}
        </CtaButton>
      </div>
    </Reveal>
  </section>
);
