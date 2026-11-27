import React from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { cn } from "@lib/cn";
import { STORIES } from "../constants/home";
import { Reveal } from "./Reveal";

export const Stories = () => (
  <section id="customers" className="px-4 py-24 sm:px-8 sm:py-32">
    <div className="mx-auto max-w-[1240px]">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <Reveal as="h2" className="font-display text-4xl font-extrabold tracking-[-0.04em] text-ink sm:text-[56px]">
          {STORIES.title}
        </Reveal>
        <Reveal delay={80}>
          <a href="#stories" className="group flex items-center gap-1 rounded-full bg-paper px-5 py-2.5 text-[15px] font-semibold text-ink transition-colors hover:bg-hero">
            All stories
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </Reveal>
      </div>

      <Reveal as="figure" delay={120} className="mt-14 max-w-4xl">
        <blockquote className="font-display text-[28px] font-bold leading-[1.2] tracking-[-0.03em] text-ink sm:text-[42px]">
          <span className="text-ink-soft/40">“</span>
          {STORIES.quote}
          <span className="text-ink-soft/40">”</span>
        </blockquote>
        <figcaption className="mt-6 flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-full bg-ink font-semibold text-white">
            {STORIES.author[0]}
          </span>
          <span>
            <span className="block font-semibold text-ink">{STORIES.author}</span>
            <span className="block text-sm text-ink-soft">{STORIES.role}</span>
          </span>
        </figcaption>
      </Reveal>

      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {STORIES.cards.map((card, i) => (
          <Reveal key={card.id} delay={i * 110}>
            <a href="#stories" className="group block">
              <div className={cn("relative aspect-[4/3] overflow-hidden rounded-[26px] bg-gradient-to-br", card.tone)}>
                {/* halftone cover that zooms on hover */}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(15,27,76,0.16)_2px,transparent_2.5px)] [background-size:18px_18px] transition-transform duration-700 [mask-image:radial-gradient(circle_at_70%_30%,#000,transparent_70%)] group-hover:scale-110" />
                <span className="absolute left-6 top-6 font-display text-2xl font-extrabold tracking-tight text-ink">
                  {card.company}
                </span>
                {card.video && (
                  <span className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-white/80 py-1.5 pl-1.5 pr-3 text-sm font-semibold text-ink backdrop-blur">
                    <span className="grid size-7 place-items-center rounded-full bg-ink text-white transition-transform duration-300 group-hover:scale-110">
                      <Play className="size-3 fill-current" />
                    </span>
                    {card.video}
                  </span>
                )}
              </div>
              <h3 className="mt-5 text-lg font-semibold leading-snug text-ink">{card.title}</h3>
              <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-ink-soft transition-colors group-hover:text-ink">
                Read story <ArrowUpRight className="size-4" />
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
