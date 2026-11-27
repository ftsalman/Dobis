import React, { useEffect } from "react";
import { ArrowRight, CalendarClock, Mail, MapPin, Phone } from "lucide-react";
import { Faq } from "@/components/Faq";
import { Reveal } from "@/components/Reveal";
import { SmartLink } from "@/components/SmartLink";
import { ContactForm } from "../components/ContactForm";
import { CHANNELS, CONTACT_FAQ, OFFICES } from "../constants/contact";

export const ContactPage = () => {
  useEffect(() => {
    document.title = "Contact · doBis";
    return () => {
      document.title = "doBis · All-in-one business software";
    };
  }, []);

  return (
    <>
      <section className="px-4 pb-20 pt-32 sm:px-8 sm:pt-40">
        <div className="mx-auto max-w-[1320px]">
          <p className="animate-rise font-label text-xs uppercase tracking-[0.2em] text-ink/60">Contact</p>
          <h1
            className="mt-5 max-w-3xl animate-rise text-[46px] font-extrabold leading-[1.02] tracking-[-0.025em] text-ink sm:text-[72px]"
            style={{ animationDelay: "100ms" }}
          >
            Let's talk about your business.
          </h1>
          <p className="mt-6 max-w-xl animate-rise text-lg text-ink-soft sm:text-xl" style={{ animationDelay: "200ms" }}>
            Questions about plans, a trial, or an account you already have? Send us a note and the right team will reply.
          </p>

          <div className="mt-12 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
            <div className="animate-rise rounded-[28px] bg-card p-6 ring-1 ring-line sm:p-8" style={{ animationDelay: "250ms" }}>
              <ContactForm />
            </div>

            <aside className="space-y-4">
              <SmartLink
                href="/book-demo"
                className="group flex items-center gap-4 rounded-[24px] bg-flow p-6 text-canvas transition-colors hover:bg-flow-hover"
              >
                <CalendarClock className="size-7 shrink-0" />
                <span className="flex-1">
                  <span className="block text-[17px] font-semibold">Want a demo instead?</span>
                  <span className="block text-[14px] text-canvas/80">Pick a 30-minute slot in your calendar now.</span>
                </span>
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </SmartLink>

              {CHANNELS.map(({ id, icon: Icon, title, body, email, phone }) => (
                <Reveal key={id} className="rounded-[24px] bg-card p-6 ring-1 ring-line">
                  <div className="flex items-center gap-3">
                    <Icon className="size-5 text-flow" />
                    <h2 className="text-[17px] font-semibold text-ink">{title}</h2>
                  </div>
                  <p className="mt-1.5 text-[14.5px] text-ink-soft">{body}</p>
                  <div className="mt-4 space-y-1.5 text-[14.5px]">
                    <a href={`mailto:${email}`} className="flex items-center gap-2 font-medium text-ink hover:text-flow">
                      <Mail className="size-4 text-ink/40" /> {email}
                    </a>
                    {phone && (
                      <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="flex items-center gap-2 font-medium text-ink hover:text-flow">
                        <Phone className="size-4 text-ink/40" /> {phone}
                      </a>
                    )}
                  </div>
                </Reveal>
              ))}
            </aside>
          </div>

          <ul className="mt-4 grid gap-4 sm:grid-cols-3">
            {OFFICES.map((o, i) => (
              <Reveal as="li" key={o.city} delay={i * 80} className="rounded-[24px] bg-line/50 p-6">
                <p className="flex items-center gap-2 font-label text-[11.5px] uppercase tracking-[0.14em] text-ink/50">
                  <MapPin className="size-3.5" /> Office
                </p>
                <p className="mt-3 text-[22px] font-medium tracking-[-0.03em] text-ink">{o.city}</p>
                <p className="mt-1 text-[14.5px] text-ink-soft">{o.address}</p>
                <p className="mt-1 text-[13.5px] text-ink/50">{o.hours}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-8">
        <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <p className="font-label text-xs uppercase tracking-[0.2em] text-ink/60">FAQ</p>
            <h2 className="mt-4 text-[36px] font-bold leading-[1.04] tracking-[-0.03em] text-ink sm:text-[52px]">Good to know</h2>
          </div>
          <Faq items={CONTACT_FAQ} />
        </div>
      </section>
    </>
  );
};
