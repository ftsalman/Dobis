import React from "react";
import { Faq } from "@/components/Faq";
import { HOME_FAQ } from "../constants/home";
import { Reveal } from "./Reveal";

/** The questions a first-time visitor asks before they'll sign up. */
export const HomeFaq = () => (
  <section id="faq" className="scroll-mt-24 px-4 pb-24 sm:px-8 sm:pb-32">
    <div className="mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-[1fr_2fr]">
      <Reveal as="h2" className="text-[40px] font-bold leading-[1.02] tracking-[-0.03em] text-ink sm:text-[56px]">
        Questions, answered
      </Reveal>
      <Reveal delay={100}>
        <Faq items={HOME_FAQ} />
      </Reveal>
    </div>
  </section>
);
