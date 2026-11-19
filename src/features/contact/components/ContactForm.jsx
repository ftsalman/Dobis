import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AlertCircle, ArrowRight, Check, CircleCheckBig, LoaderCircle } from "lucide-react";
import { cn } from "@lib/cn";
import { ALL_APPS } from "@/constants/apps";
import { SmartLink } from "@/components/SmartLink";
import { useDebounce } from "@/hooks/useDebounce";
import { submitContact } from "../api/contactApi";
import { COMPANY_REQUIRED, COMPANY_SIZES, MESSAGE_REQUIRED, TOPICS } from "../constants/contact";
import { MESSAGE_MAX, isPersonalEmail, validateContact } from "../utils/validate";

const DRAFT_KEY = "dobis-contact-draft";
const EMPTY = {
  topic: "demo",
  name: "",
  email: "",
  company: "",
  size: "",
  phone: "",
  apps: [],
  message: "",
  consent: false,
  updates: false,
  website: "", // honeypot: real people never see or fill this
};
const SHOW_APPS = ["demo", "sales", "trial"];

const readDraft = () => {
  try {
    return JSON.parse(localStorage.getItem(DRAFT_KEY)) ?? {};
  } catch {
    return {};
  }
};
const writeDraft = (v) => {
  try {
    if (v) localStorage.setItem(DRAFT_KEY, JSON.stringify(v));
    else localStorage.removeItem(DRAFT_KEY);
  } catch {
    /* storage unavailable: drafts are a convenience only */
  }
};

/** Draft first, then anything the link carried (?topic, ?plan, ?apps, ?users, ?billing, ?currency). */
const initialValues = (params) => {
  const draft = readDraft();
  const v = { ...EMPTY, ...draft, consent: false, website: "" };
  const topic = params.get("topic");
  if (TOPICS.some((t) => t.id === topic)) v.topic = topic;

  const apps = (params.get("apps") ?? "").split(",").filter((id) => ALL_APPS.some((a) => a.id === id));
  if (apps.length) v.apps = apps;

  const lines = [];
  const plan = params.get("plan");
  if (plan) lines.push(`I'm interested in the ${plan[0].toUpperCase()}${plan.slice(1)} plan.`);
  if (params.get("users") && apps.length) {
    const names = ALL_APPS.filter((a) => apps.includes(a.id)).map((a) => a.name);
    lines.push(
      `Quote request: ${params.get("users")} users on ${params.get("billing") ?? "yearly"} billing (${params.get("currency") ?? "USD"}) for ${names.join(", ")}.`,
    );
  }
  if (lines.length) v.message = lines.join("\n");
  return v;
};

const inputClass = (invalid) =>
  cn(
    "w-full rounded-xl bg-canvas px-4 py-3 text-[16px] text-ink ring-1 outline-none transition-shadow placeholder:text-ink/35 focus:ring-2",
    invalid ? "ring-red-500 focus:ring-red-500" : "ring-line focus:ring-flow",
  );

const Field = ({ id, label, required, error, hint, children, className }) => (
  <div className={className}>
    <label htmlFor={id} className="mb-2 flex items-baseline justify-between text-[14px] font-medium text-ink">
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

const Success = ({ result, onReset }) => {
  const topic = TOPICS.find((t) => t.id === result.topic);
  return (
    <div className="animate-stage-in py-6 text-center" role="status">
      <span className="mx-auto grid size-16 place-items-center rounded-full bg-flow/10 text-flow">
        <CircleCheckBig className="size-8" />
      </span>
      <h2 className="mt-6 text-[30px] font-medium tracking-[-0.04em] text-ink sm:text-[36px]">Thanks, {result.firstName}!</h2>
      <p className="mx-auto mt-3 max-w-md text-[17px] text-ink-soft">{topic?.next}</p>
      <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-canvas px-4 py-2 font-mono text-[13px] text-ink ring-1 ring-line">
        Reference <span className="font-semibold">{result.reference}</span>
      </p>
      <p className="mt-2 text-[13.5px] text-ink/50">We've also sent a copy to {result.email}.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={onReset}
          className="rounded-full bg-canvas px-6 py-3 text-[15px] font-semibold text-ink ring-1 ring-line hover:bg-line"
        >
          Send another message
        </button>
        <SmartLink href="/" className="rounded-full bg-flow px-6 py-3 text-[15px] font-semibold text-canvas hover:bg-flow-hover">
          Back to home
        </SmartLink>
      </div>
    </div>
  );
};

/**
 * Contact form: topic-aware validation (errors show after a field is left or on submit), a
 * draft saved in this browser, prefill from pricing links, a spam honeypot, and
 * sending / sent / failed states.
 */
export const ContactForm = () => {
  const [params] = useSearchParams();
  const [values, setValues] = useState(() => initialValues(params));
  const [touched, setTouched] = useState(() => new Set());
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | failed
  const [result, setResult] = useState(null);
  const formRef = useRef(null);

  // ?topic=… can change while the page stays mounted (e.g. a navbar link to support).
  const linkTopic = params.get("topic");
  const [seenTopic, setSeenTopic] = useState(linkTopic);
  if (linkTopic !== seenTopic) {
    setSeenTopic(linkTopic);
    if (TOPICS.some((t) => t.id === linkTopic)) setValues((v) => ({ ...v, topic: linkTopic }));
  }

  const errors = useMemo(() => validateContact(values), [values]);
  const show = (field) => (submitted || touched.has(field)) && errors[field];

  // Autosave a draft (never the consent box or the honeypot).
  const debounced = useDebounce(values, 500);
  useEffect(() => {
    if (status === "sent") return;
    const { consent: _c, website: _w, ...rest } = debounced;
    const blank = !rest.name && !rest.email && !rest.company && !rest.message;
    writeDraft(blank ? null : rest);
  }, [debounced, status]);

  const set = (field) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setValues((v) => ({ ...v, [field]: value }));
  };
  const blur = (field) => () => setTouched((t) => new Set(t).add(field));
  const toggleApp = (id) =>
    setValues((v) => ({ ...v, apps: v.apps.includes(id) ? v.apps.filter((a) => a !== id) : [...v.apps, id] }));

  const aria = (field) => ({
    name: field,
    "aria-invalid": Boolean(show(field)),
    "aria-describedby": show(field) ? `${field}-error` : undefined,
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const firstBad = Object.keys(errors)[0];
    if (firstBad) {
      formRef.current.querySelector(`[name="${firstBad}"]`)?.focus();
      return;
    }
    const firstName = values.name.trim().split(/\s+/)[0];
    // Bots fill the hidden field; pretend it worked and send nothing.
    if (values.website) {
      setResult({ reference: "DB-000000", firstName, email: values.email, topic: values.topic });
      setStatus("sent");
      return;
    }
    setStatus("sending");
    try {
      const { website: _w, ...payload } = values;
      const res = await submitContact({ ...payload, plan: params.get("plan") ?? undefined, page: window.location.pathname });
      setResult({ reference: res.reference, firstName, email: values.email.trim(), topic: values.topic });
      setStatus("sent");
      writeDraft(null);
    } catch {
      setStatus("failed");
    }
  };

  const reset = () => {
    setValues({ ...EMPTY, topic: values.topic });
    setTouched(new Set());
    setSubmitted(false);
    setResult(null);
    setStatus("idle");
  };

  if (status === "sent" && result) return <Success result={result} onReset={reset} />;

  const needCompany = COMPANY_REQUIRED.includes(values.topic);
  const needMessage = MESSAGE_REQUIRED.includes(values.topic);
  const personal = needCompany && values.email.includes("@") && isPersonalEmail(values.email);
  const sending = status === "sending";

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-6">
      <fieldset>
        <legend className="mb-3 text-[14px] font-medium text-ink">How can we help?</legend>
        <div role="radiogroup" aria-label="Topic" className="flex flex-wrap gap-2">
          {TOPICS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="radio"
              aria-checked={values.topic === t.id}
              onClick={() => setValues((v) => ({ ...v, topic: t.id }))}
              className={cn(
                "rounded-full px-4 py-2 text-[14.5px] font-medium transition-colors",
                values.topic === t.id ? "bg-flow text-canvas" : "bg-canvas text-ink ring-1 ring-line hover:ring-flow/40",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Full name" required error={show("name")}>
          <input id="name" autoComplete="name" value={values.name} onChange={set("name")} onBlur={blur("name")} {...aria("name")} className={inputClass(show("name"))} />
        </Field>
        <Field
          id="email"
          label={needCompany ? "Work email" : "Email"}
          required
          error={show("email")}
          hint={personal && !show("email") ? <span className="text-[12.5px] font-normal text-ink/50">A work email speeds things up</span> : null}
        >
          <input id="email" type="email" autoComplete="email" value={values.email} onChange={set("email")} onBlur={blur("email")} {...aria("email")} className={inputClass(show("email"))} />
        </Field>
        <Field id="company" label="Company" required={needCompany} error={show("company")}>
          <input id="company" autoComplete="organization" value={values.company} onChange={set("company")} onBlur={blur("company")} {...aria("company")} className={inputClass(show("company"))} />
        </Field>
        <Field id="size" label="Company size" required={needCompany} error={show("size")}>
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

      {SHOW_APPS.includes(values.topic) && (
        <fieldset className="animate-stage-in">
          <legend className="mb-3 text-[14px] font-medium text-ink">
            Which apps are you interested in? <span className="font-normal text-ink/45">(optional)</span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {ALL_APPS.map((app) => {
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
        </fieldset>
      )}

      <Field
        id="message"
        label={values.topic === "support" ? "What's going on?" : "Message"}
        required={needMessage}
        error={show("message")}
        hint={
          <span className={cn("font-mono text-[12px] font-normal", values.message.length > MESSAGE_MAX ? "text-red-600" : "text-ink/45")}>
            {values.message.length}/{MESSAGE_MAX}
          </span>
        }
      >
        <textarea
          id="message"
          rows={5}
          value={values.message}
          onChange={set("message")}
          onBlur={blur("message")}
          {...aria("message")}
          placeholder={values.topic === "support" ? "Which app, what you expected, and what happened instead." : "Tell us about your business and what you'd like to achieve."}
          className={cn(inputClass(show("message")), "resize-y")}
        />
      </Field>

      {/* honeypot: hidden from people and screen readers */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={set("website")} />
      </div>

      <div className="space-y-3">
        <label className="flex items-start gap-3 text-[14.5px] text-ink">
          <input type="checkbox" checked={values.consent} onChange={set("consent")} onBlur={blur("consent")} {...aria("consent")} className="mt-0.5 size-5 shrink-0 accent-[var(--color-flow)]" />
          <span>
            I agree to Dobis storing my details to reply to this request, as described in the{" "}
            <SmartLink href="#privacy" className="font-medium text-flow underline-offset-2 hover:underline">
              privacy policy
            </SmartLink>
            . <span className="text-flow">*</span>
          </span>
        </label>
        {show("consent") && (
          <p id="consent-error" className="flex items-center gap-1.5 pl-8 text-[13.5px] text-red-600">
            <AlertCircle className="size-3.5" /> {errors.consent}
          </p>
        )}
        <label className="flex items-start gap-3 text-[14.5px] text-ink-soft">
          <input type="checkbox" checked={values.updates} onChange={set("updates")} className="mt-0.5 size-5 shrink-0 accent-[var(--color-flow)]" />
          Send me occasional product news. Unsubscribe anytime.
        </label>
      </div>

      {status === "failed" && (
        <p role="alert" className="flex items-start gap-2.5 rounded-2xl bg-red-50 p-4 text-[14.5px] text-red-700">
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          <span>
            We couldn't send your message. Please try again, or email us at{" "}
            <a href="mailto:hello@dobis.com" className="font-semibold underline">
              hello@dobis.com
            </a>
            . Your details are still here.
          </span>
        </p>
      )}
      {submitted && Object.keys(errors).length > 0 && status !== "failed" && (
        <p role="alert" className="text-[14.5px] text-red-600">
          Please fix the {Object.keys(errors).length === 1 ? "highlighted field" : `${Object.keys(errors).length} highlighted fields`} above.
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-[13px] text-ink/50">Draft saved on this device as you type.</p>
        <button
          type="submit"
          disabled={sending}
          className="flex items-center gap-2 rounded-full bg-flow px-7 py-4 text-[16px] font-semibold text-canvas transition-colors hover:bg-flow-hover disabled:cursor-wait disabled:opacity-70"
        >
          {sending ? (
            <>
              <LoaderCircle className="size-4 animate-spin" /> Sending…
            </>
          ) : (
            <>
              {TOPICS.find((t) => t.id === values.topic)?.label ?? "Send"} <ArrowRight className="size-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};
