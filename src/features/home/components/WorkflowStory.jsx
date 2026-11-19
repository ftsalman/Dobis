import { useEffect, useRef } from "react";
import {
  ArrowRight,
  Check,
  CircleDot,
  FileText,
  Flag,
  UsersRound,
} from "lucide-react";
import Button from "@/components/ui/Button";

const steps = [
  {
    icon: UsersRound,
    app: "DOBIS CRM",
    title: "A conversation becomes a customer.",
    text: "Your sales team closes a deal with the full history right where they need it.",
    detail: "Northstar Studio",
    status: "Opportunity won",
    color: "bg-violet-100 text-violet-700",
  },
  {
    icon: FileText,
    app: "DOBIS BOOKS",
    title: "The numbers find their place.",
    text: "Customer context moves into finance, ready for an invoice without another spreadsheet.",
    detail: "Invoice #1042",
    status: "Draft ready to review",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    icon: Flag,
    app: "DOBIS PROJECTS",
    title: "Your team takes it from here.",
    text: "Turn the promise into a shared project, with clear tasks, owners, and a plan.",
    detail: "Northstar onboarding",
    status: "Project ready to start",
    color: "bg-blue-100 text-blue-700",
  },
];
export default function WorkflowStory() {
  const scope = useRef(null);
  useEffect(() => {
    let media;
    let cancelled = false;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")])
      .then(([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);
        media = gsap.matchMedia();
        media.add(
          "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
          () => {
            const cards = scope.current.querySelectorAll(
              "[data-workflow-card]",
            );
            cards.forEach((card) =>
              gsap.fromTo(
                card,
                { y: 38 },
                {
                  y: 0,
                  ease: "none",
                  scrollTrigger: {
                    trigger: card,
                    start: "top 95%",
                    end: "top 55%",
                    scrub: 0.7,
                  },
                },
              ),
            );
            gsap.fromTo(
              scope.current.querySelector("[data-progress]"),
              { scaleX: 0 },
              {
                scaleX: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: scope.current,
                  start: "top 70%",
                  end: "bottom 80%",
                  scrub: 0.8,
                },
              },
            );
          },
          scope,
        );
      })
      .catch(() => {
        /* The story remains readable if optional motion cannot load. */
      });
    return () => {
      cancelled = true;
      media?.revert();
    };
  }, []);
  return (
    <section
      ref={scope}
      id="solutions"
      className="overflow-hidden bg-ink px-5 py-24 text-white lg:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-lime">
              Less friction. More flow.
            </p>
            <h2 className="max-w-xl text-4xl font-medium leading-[1.12] tracking-[-1.8px] md:text-5xl">
              Your business doesn’t
              <br />
              work in silos.
              <br />
              <span className="text-white/45">Your software shouldn’t.</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-7 text-white/65">
            One customer. One connected journey.
            <br />
            See the idea behind a workspace that keeps your whole team on the
            same page.
          </p>
        </div>
        <div className="relative mb-8 mt-14 h-px bg-white/15">
          <div data-progress className="absolute inset-0 origin-left bg-lime" />
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map(({ icon: Icon, ...step }, index) => (
            <article key={step.app} data-workflow-card>
              <div className="mb-7 flex items-center justify-between">
                <span className="font-mono text-xs text-white/45">
                  0{index + 1}
                </span>
                <CircleDot className="size-4 text-lime" />
              </div>
              <div className="rounded-xl border border-white/15 bg-white/5 p-5">
                <div className="flex items-center gap-3">
                  <span
                    className={`flex size-10 items-center justify-center rounded-xl ${step.color}`}
                  >
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <p className="text-[9px] tracking-widest text-white/50">
                      {step.app}
                    </p>
                    <p className="mt-1 text-sm font-medium">{step.detail}</p>
                  </div>
                </div>
                <div className="mt-5 flex items-center gap-2 border-t border-white/10 pt-4 text-xs text-white/65">
                  <Check className="size-3.5 text-lime" /> {step.status}
                </div>
              </div>
              <h3 className="mb-3 mt-7 max-w-64 text-xl font-medium leading-7">
                {step.title}
              </h3>
              <p className="max-w-sm text-sm leading-6 text-white/55">
                {step.text}
              </p>
            </article>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap items-center gap-5">
          <Button to="/workspace" variant="light">
            Explore the connected demo <ArrowRight className="size-4" />
          </Button>
          <span className="text-xs text-white/40">
            Illustrative workflow · No live automation
          </span>
        </div>
      </div>
    </section>
  );
}
