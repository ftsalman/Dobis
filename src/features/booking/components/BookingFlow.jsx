import React, { useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CalendarPlus,
  Check,
  CircleCheckBig,
  Clock,
  Copy,
  Download,
  LoaderCircle,
  Video,
} from "lucide-react";
import { cn } from "@lib/cn";
import { ADDONS, ALL_APPS } from "@/constants/apps";
import { SmartLink } from "@/components/SmartLink";
import { bookDemo } from "../api/bookingApi";
import { COMPANY_SIZES, DEMO_MINUTES, STEPS } from "../constants/booking";
import {
  buildSlots,
  dayKey,
  detectTimezone,
  endOf,
  formatLongDate,
  formatTime,
  googleCalendarUrl,
  icsFile,
  offsetLabel,
  timezoneOptions,
} from "../utils/slots";
import { isPersonalEmail, validateBooking } from "../utils/validate";
import { SlotPicker } from "./SlotPicker";

const DEMO_APPS = [...ALL_APPS, ...ADDONS];
const EMPTY = { email: "", firstName: "", lastName: "", company: "", size: "", phone: "", apps: [], reason: "", consent: false, website: "" };

const inputClass = (invalid) =>
  cn(
    "w-full rounded-xl bg-canvas px-4 py-3 text-[16px] text-ink ring-1 outline-none transition-shadow placeholder:text-ink/35 focus:ring-2",
    invalid ? "ring-red-500 focus:ring-red-500" : "ring-line focus:ring-flow",
  );

const Field = ({ id, label, required, error, hint, className, children }) => (
  <div className={className}>
    <label htmlFor={id} className="mb-2 flex items-baseline justify-between gap-2 text-[14px] font-medium text-ink">
      <span>
        {label}
        {required ? <span className="text-flow"> *</span> : <span className="font-normal text-ink/45"> (optional)</span>}
      </span>
      {hint}
    </label>
    {children}
    {error && (
      <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-[13.5px] text-red-600">
        <AlertCircle className="size-3.5 shrink-0" /> {error}
      </p>
    )}
  </div>
);

const Stepper = ({ step }) => (
  <ol className="flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.1em]">
    {STEPS.map((label, i) => (
      <li key={label} className="flex items-center gap-2">
        <span
          className={cn(
            "flex items-center gap-1.5 rounded-full px-2.5 py-1 transition-colors",
            i === step ? "bg-ink text-canvas" : i < step ? "bg-flow/10 text-flow" : "text-ink/40",
          )}
          aria-current={i === step ? "step" : undefined}
        >
          {i < step ? <Check className="size-3" strokeWidth={3} /> : <span>0{i + 1}</span>}
          <span className={cn(i !== step && "hidden sm:inline")}>{label}</span>
        </span>
        {i < STEPS.length - 1 && <span className="h-px w-3 bg-line sm:w-5" />}
      </li>
    ))}
  </ol>
);

/** Selected time, shown above the form and on the confirmation. */
const SlotSummary = ({ slot, tz, hour12, onChange }) => (
  <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-flow/[0.07] p-4 ring-1 ring-flow/15">
    <div className="flex items-center gap-3">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-flow text-canvas">
        <Clock className="size-[18px]" />
      </span>
      <div>
        <p className="text-[15px] font-semibold text-ink">{formatLongDate(slot, tz)}</p>
        <p className="text-[14px] text-ink-soft">
          {formatTime(slot, tz, hour12)} – {formatTime(endOf(slot), tz, hour12)} · {offsetLabel(tz, slot)}
        </p>
      </div>
    </div>
    {onChange && (
      <button type="button" onClick={onChange} className="text-[14px] font-semibold text-flow hover:text-flow-hover">
        Change
      </button>
    )}
  </div>
);

const Confirmation = ({ result, slot, tz, hour12, onReset }) => {
  const [copied, setCopied] = useState(false);
  const title = "Dobis product demo";
  const details = `Your ${DEMO_MINUTES}-minute Dobis demo.\nJoin: ${result.meetingUrl}\nReference: ${result.reference}`;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(result.meetingUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked: the link is still visible to copy by hand */
    }
  };

  return (
    <div className="animate-stage-in" role="status">
      <div className="text-center">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-flow/10 text-flow">
          <CircleCheckBig className="size-8" />
        </span>
        <h2 className="mt-6 text-[30px] font-medium leading-tight tracking-[-0.04em] text-ink sm:text-[38px]">
          You're booked, {result.firstName}.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[16px] text-ink-soft">
          A calendar invite is on its way to <span className="font-medium text-ink">{result.email}</span>. We'll tailor the call to what you told us.
        </p>
      </div>

      <div className="mt-8 space-y-3">
        <SlotSummary slot={slot} tz={tz} hour12={hour12} />
        <div className="flex items-center gap-3 rounded-2xl bg-canvas p-4 ring-1 ring-line">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-ink text-canvas">
            <Video className="size-[18px]" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] text-ink-soft">Video call link</p>
            <p className="truncate font-mono text-[13.5px] text-ink">{result.meetingUrl}</p>
          </div>
          <button
            type="button"
            onClick={copy}
            className="flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-[13.5px] font-semibold text-ink ring-1 ring-line hover:bg-line"
          >
            {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />} {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-2 sm:grid-cols-2">
        <a
          href={googleCalendarUrl({ start: slot, title, details })}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 rounded-full bg-flow py-3.5 text-[15px] font-semibold text-canvas transition-colors hover:bg-flow-hover"
        >
          <CalendarPlus className="size-4" /> Add to Google Calendar
        </a>
        <a
          href={icsFile({ start: slot, title, details, reference: result.reference })}
          download="dobis-demo.ics"
          className="flex items-center justify-center gap-2 rounded-full bg-canvas py-3.5 text-[15px] font-semibold text-ink ring-1 ring-line transition-colors hover:bg-line"
        >
          <Download className="size-4" /> Outlook / Apple (.ics)
        </a>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6 text-[14px]">
        <span className="font-mono text-[12.5px] text-ink/55">
          Ref <span className="font-semibold text-ink">{result.reference}</span>
        </span>
        <div className="flex gap-4">
          <button type="button" onClick={onReset} className="font-semibold text-ink-soft hover:text-ink">
            Book another time
          </button>
          <SmartLink href="/pricing" className="font-semibold text-flow hover:text-flow-hover">
            See pricing →
          </SmartLink>
        </div>
      </div>
    </div>
  );
};

/** Three-step demo booking: pick a slot, add details, get a confirmation with calendar links. */
export const BookingFlow = () => {
  const [params] = useSearchParams();
  const [detected] = useState(detectTimezone);
  const tzOptions = useMemo(() => timezoneOptions(detected), [detected]);

  const [tz, setTz] = useState(detected);
  const [hour12, setHour12] = useState(() => !/^(en-GB|de|fr|es|it|nl|pt|ru|pl|sv|fi|da|nb)/i.test(navigator.language || ""));
  const [step, setStep] = useState(0);
  const [day, setDay] = useState(null);
  const [slot, setSlot] = useState(null);
  const [values, setValues] = useState(() => {
    const apps = (params.get("apps") ?? "").split(",").filter((id) => DEMO_APPS.some((a) => a.id === id));
    const plan = params.get("plan");
    return { ...EMPTY, apps, reason: plan ? `Interested in the ${plan[0].toUpperCase()}${plan.slice(1)} plan.` : "" };
  });
  const [touched, setTouched] = useState(() => new Set());
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | failed | taken
  const [result, setResult] = useState(null);
  const [takenSlots, setTakenSlots] = useState(() => new Set());
  const cardRef = useRef(null);
  const formRef = useRef(null);

  // Rebuilt when the timezone changes; slots someone else grabbed while this page was open stay greyed out.
  const slots = useMemo(() => {
    const map = buildSlots(tz);
    if (takenSlots.size) for (const list of map.values()) for (const s of list) if (takenSlots.has(s.start.getTime())) s.taken = true;
    return map;
  }, [tz, takenSlots]);
  const todayKey = dayKey(new Date(), tz);

  // Default to the first day with an open slot; a day picked in one timezone may not exist in another.
  const firstOpen = useMemo(() => [...slots.keys()].sort().find((k) => slots.get(k).some((s) => !s.taken)) ?? null, [slots]);
  const activeDay = day && slots.has(day) ? day : firstOpen;

  const errors = useMemo(() => validateBooking(values), [values]);
  const show = (f) => (submitted || touched.has(f)) && errors[f];
  const set = (f) => (e) => setValues((v) => ({ ...v, [f]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));
  const blur = (f) => () => setTouched((t) => new Set(t).add(f));
  const aria = (f) => ({ name: f, "aria-invalid": Boolean(show(f)), "aria-describedby": show(f) ? `${f}-error` : undefined });
  const toggleApp = (id) => setValues((v) => ({ ...v, apps: v.apps.includes(id) ? v.apps.filter((a) => a !== id) : [...v.apps, id] }));

  const go = (n) => {
    setStep(n);
    cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const firstBad = Object.keys(errors)[0];
    if (firstBad) {
      formRef.current.querySelector(`[name="${firstBad}"]`)?.focus();
      return;
    }
    const firstName = values.firstName.trim();
    if (values.website) {
      // honeypot filled: pretend it worked
      setResult({ reference: "DM-000000", meetingUrl: "https://meet.dobis.com", firstName, email: values.email });
      setStatus("sent");
      go(2);
      return;
    }
    setStatus("sending");
    try {
      const { website: _w, consent: _c, ...rest } = values;
      const res = await bookDemo({ ...rest, start: slot.toISOString(), minutes: DEMO_MINUTES, timezone: tz, plan: params.get("plan") ?? undefined });
      setResult({ ...res, firstName, email: values.email.trim() });
      setStatus("sent");
      go(2);
    } catch (err) {
      if (err.code === "SLOT_TAKEN") {
        setTakenSlots((s) => new Set(s).add(slot.getTime()));
        setSlot(null);
        setStatus("taken");
        go(0);
      } else {
        setStatus("failed");
      }
    }
  };

  const reset = () => {
    setValues((v) => ({ ...EMPTY, email: v.email, firstName: v.firstName, lastName: v.lastName, company: v.company, size: v.size, phone: v.phone }));
    setSlot(null);
    setDay(null);
    setTouched(new Set());
    setSubmitted(false);
    setStatus("idle");
    setResult(null);
    go(0);
  };

  const sending = status === "sending";
  const personal = values.email.includes("@") && isPersonalEmail(values.email);

  return (
    <div ref={cardRef} className="scroll-mt-28 rounded-[28px] bg-card p-5 shadow-[0_40px_90px_-50px_rgba(35,35,35,0.45)] ring-1 ring-line sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {["AK", "SR", "ML"].map((i, n) => (
              <span
                key={i}
                className={cn(
                  "grid size-9 place-items-center rounded-full font-mono text-[11px] font-semibold ring-2 ring-card",
                  ["bg-flow text-canvas", "bg-ink text-canvas", "bg-dot text-ink"][n],
                )}
              >
                {i}
              </span>
            ))}
          </div>
          <div>
            <p className="text-[15px] font-semibold text-ink">Dobis product demo</p>
            <p className="flex items-center gap-1.5 text-[13px] text-ink-soft">
              <Clock className="size-3.5" /> {DEMO_MINUTES} min · <Video className="size-3.5" /> Video call
            </p>
          </div>
        </div>
        <Stepper step={step} />
      </div>

      <div className="pt-6">
        {/* ---------- step 1: time ---------- */}
        {step === 0 && (
          <div className="animate-stage-in">
            {status === "taken" && (
              <p role="alert" className="mb-5 flex items-start gap-2.5 rounded-2xl bg-amber-50 p-4 text-[14.5px] text-amber-800 ring-1 ring-amber-200">
                <AlertCircle className="mt-0.5 size-4 shrink-0" />
                Someone just booked that time. Please pick another; your details are saved.
              </p>
            )}
            <SlotPicker
              slots={slots}
              todayKey={todayKey}
              tz={tz}
              tzOptions={tzOptions}
              onTz={setTz}
              hour12={hour12}
              onHour12={setHour12}
              day={activeDay}
              onDay={setDay}
              slot={slot}
              onSlot={setSlot}
            />
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
              <p className="text-[14px] text-ink-soft" aria-live="polite">
                {slot ? (
                  <>
                    <span className="font-semibold text-ink">{formatLongDate(slot, tz)}</span> at{" "}
                    <span className="font-semibold text-ink">{formatTime(slot, tz, hour12)}</span>
                  </>
                ) : (
                  "No time selected yet"
                )}
              </p>
              <button
                type="button"
                disabled={!slot}
                onClick={() => {
                  setStatus("idle");
                  go(1);
                }}
                className="flex items-center gap-2 rounded-full bg-flow px-6 py-3.5 text-[15px] font-semibold text-canvas transition-all hover:bg-flow-hover disabled:cursor-not-allowed disabled:bg-ink/15 disabled:text-ink/40"
              >
                Continue <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        )}

        {/* ---------- step 2: details ---------- */}
        {step === 1 && slot && (
          <form ref={formRef} onSubmit={onSubmit} noValidate className="animate-stage-in space-y-6">
            <SlotSummary slot={slot} tz={tz} hour12={hour12} onChange={() => go(0)} />

            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                id="email"
                label="Work email"
                required
                error={show("email")}
                className="sm:col-span-2"
                hint={personal && !show("email") ? <span className="text-[12.5px] font-normal text-ink/50">A work email helps us prepare</span> : null}
              >
                <input id="email" type="email" autoComplete="email" placeholder="you@company.com" value={values.email} onChange={set("email")} onBlur={blur("email")} {...aria("email")} className={inputClass(show("email"))} />
              </Field>
              <Field id="firstName" label="First name" required error={show("firstName")}>
                <input id="firstName" autoComplete="given-name" value={values.firstName} onChange={set("firstName")} onBlur={blur("firstName")} {...aria("firstName")} className={inputClass(show("firstName"))} />
              </Field>
              <Field id="lastName" label="Last name" required error={show("lastName")}>
                <input id="lastName" autoComplete="family-name" value={values.lastName} onChange={set("lastName")} onBlur={blur("lastName")} {...aria("lastName")} className={inputClass(show("lastName"))} />
              </Field>
              <Field id="company" label="Company" required error={show("company")}>
                <input id="company" autoComplete="organization" value={values.company} onChange={set("company")} onBlur={blur("company")} {...aria("company")} className={inputClass(show("company"))} />
              </Field>
              <Field id="size" label="Company size" required error={show("size")}>
                <select id="size" value={values.size} onChange={set("size")} onBlur={blur("size")} {...aria("size")} className={cn(inputClass(show("size")), !values.size && "text-ink/40")}>
                  <option value="">Choose…</option>
                  {COMPANY_SIZES.map((s) => (
                    <option key={s} value={s} className="text-ink">
                      {s} {s === "Just me" ? "" : "people"}
                    </option>
                  ))}
                </select>
              </Field>
              <Field id="phone" label="Phone" error={show("phone")} className="sm:col-span-2">
                <input id="phone" type="tel" autoComplete="tel" placeholder="+971 50 123 4567" value={values.phone} onChange={set("phone")} onBlur={blur("phone")} {...aria("phone")} className={inputClass(show("phone"))} />
              </Field>
            </div>

            <fieldset>
              <legend className="mb-3 text-[14px] font-medium text-ink">
                What should we show you? <span className="font-normal text-ink/45">(optional)</span>
              </legend>
              {[
                ["Dobis apps", ALL_APPS],
                ["Partner add-ons", ADDONS],
              ].map(([label, list]) => (
              <div key={label} className="mt-1 first-of-type:mt-0">
              <p className="mb-2 mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-ink/45">{label}</p>
              <div className="flex flex-wrap gap-2">
                {list.map((app) => {
                  const on = values.apps.includes(app.id);
                  return (
                    <button
                      key={app.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggleApp(app.id)}
                      className={cn(
                        "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13.5px] font-medium transition-colors",
                        on ? "bg-ink text-canvas" : "bg-canvas text-ink ring-1 ring-line hover:ring-ink/30",
                      )}
                    >
                      {on ? <Check className="size-3.5" strokeWidth={3} /> : <app.icon className="size-3.5 opacity-60" />}
                      {app.name}
                    </button>
                  );
                })}
              </div>
              </div>
              ))}
            </fieldset>

            <Field id="reason" label="Reason for interest" required error={show("reason")}>
              <textarea
                id="reason"
                rows={3}
                value={values.reason}
                onChange={set("reason")}
                onBlur={blur("reason")}
                {...aria("reason")}
                placeholder="What are you using today, and what would you like to fix?"
                className={cn(inputClass(show("reason")), "resize-y")}
              />
            </Field>

            {/* honeypot */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor="website">Website</label>
              <input id="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={set("website")} />
            </div>

            <div>
              <label className="flex items-start gap-3 text-[14.5px] text-ink">
                <input type="checkbox" checked={values.consent} onChange={set("consent")} onBlur={blur("consent")} {...aria("consent")} className="mt-0.5 size-5 shrink-0 accent-[var(--color-flow)]" />
                <span>
                  I agree to Dobis using my details to arrange this demo, as described in the{" "}
                  <SmartLink href="#privacy" className="font-medium text-flow underline-offset-2 hover:underline">
                    privacy policy
                  </SmartLink>
                  . <span className="text-flow">*</span>
                </span>
              </label>
              {show("consent") && (
                <p id="consent-error" className="mt-1.5 flex items-center gap-1.5 pl-8 text-[13.5px] text-red-600">
                  <AlertCircle className="size-3.5" /> {errors.consent}
                </p>
              )}
            </div>

            {status === "failed" && (
              <p role="alert" className="flex items-start gap-2.5 rounded-2xl bg-red-50 p-4 text-[14.5px] text-red-700">
                <AlertCircle className="mt-0.5 size-4 shrink-0" />
                <span>
                  We couldn't book that slot. Please try again, or email{" "}
                  <a href="mailto:sales@dobis.com" className="font-semibold underline">
                    sales@dobis.com
                  </a>
                  . Your details are still here.
                </span>
              </p>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
              <button type="button" onClick={() => go(0)} className="flex items-center gap-1.5 text-[14.5px] font-semibold text-ink-soft hover:text-ink">
                <ArrowLeft className="size-4" /> Back
              </button>
              <button
                type="submit"
                disabled={sending}
                className="flex items-center gap-2 rounded-full bg-flow px-7 py-4 text-[16px] font-semibold text-canvas transition-colors hover:bg-flow-hover disabled:cursor-wait disabled:opacity-70"
              >
                {sending ? (
                  <>
                    <LoaderCircle className="size-4 animate-spin" /> Booking…
                  </>
                ) : (
                  <>
                    Confirm booking <ArrowRight className="size-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* ---------- step 3: confirmed ---------- */}
        {step === 2 && result && slot && <Confirmation result={result} slot={slot} tz={tz} hour12={hour12} onReset={reset} />}
      </div>
    </div>
  );
};
