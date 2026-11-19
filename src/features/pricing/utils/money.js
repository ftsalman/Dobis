import { CURRENCIES, MONTHLY_UPLIFT } from "../constants/pricing";

/** USD price per user per month for the chosen billing cycle. */
export const cyclePrice = (usd, billing) => (billing === "monthly" ? usd * (1 + MONTHLY_UPLIFT) : usd);

/** Formats a USD amount in the chosen currency, rounded to a whole unit. */
export const formatMoney = (usd, code) => {
  const cur = CURRENCIES.find((c) => c.code === code) ?? CURRENCIES[0];
  return new Intl.NumberFormat(cur.locale, {
    style: "currency",
    currency: cur.code,
    maximumFractionDigits: 0,
  }).format(Math.round(usd * cur.rate));
};

/** Best-guess currency from the browser language (e.g. en-IN -> INR); USD otherwise. */
export const guessCurrency = () => {
  const lang = (typeof navigator !== "undefined" && navigator.language) || "en-US";
  if (/-IN$/i.test(lang) || /^(hi|ml|ta|te|kn|mr|bn)\b/i.test(lang)) return "INR";
  if (/-AE$/i.test(lang) || /^ar\b/i.test(lang)) return "AED";
  if (/-GB$/i.test(lang)) return "GBP";
  if (/^(de|fr|es|it|nl|pt|fi|el|et|lv|lt|sk|sl)\b/i.test(lang)) return "EUR";
  return "USD";
};
