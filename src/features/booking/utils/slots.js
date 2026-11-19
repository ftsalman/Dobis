import { DEMO_MINUTES, LEAD_HOURS, LOCAL_HOURS, TEAM_HOURS_UTC, TIMEZONES, WINDOW_DAYS } from "../constants/booking";

const STEP_MS = 30 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

// Some browsers still report legacy zone names.
const ALIASES = { "Asia/Calcutta": "Asia/Kolkata", "Asia/Saigon": "Asia/Ho_Chi_Minh", "Asia/Katmandu": "Asia/Kathmandu", "Etc/UTC": "UTC" };

/** The visitor's timezone, or UTC if the browser won't say. */
export const detectTimezone = () => {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
    return ALIASES[tz] ?? tz;
  } catch {
    return "UTC";
  }
};

export const timezoneOptions = (detected) => (TIMEZONES.includes(detected) ? TIMEZONES : [detected, ...TIMEZONES]);

/** "GMT+4"-style offset label for a zone at a given moment. */
export const offsetLabel = (tz, at = new Date()) => {
  try {
    const part = new Intl.DateTimeFormat("en-US", { timeZone: tz, timeZoneName: "shortOffset" })
      .formatToParts(at)
      .find((p) => p.type === "timeZoneName");
    return part?.value ?? tz;
  } catch {
    return tz;
  }
};

export const zoneName = (tz) => tz.split("/").pop().replace(/_/g, " ");

/** Calendar date of an instant in a timezone, as "YYYY-MM-DD". */
export const dayKey = (date, tz) =>
  new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit" }).format(date);

/** Splits "YYYY-MM-DD" into numbers. */
export const parseKey = (key) => {
  const [y, m, d] = key.split("-").map(Number);
  return { y, m, d };
};

export const keyOf = (y, m, d) => `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

// Stand-in for real availability: roughly one slot in five is already taken, the same one on every visit.
const isTaken = (ms) => {
  let h = Math.floor(ms / STEP_MS);
  h = ((h ^ (h >>> 7)) * 2654435761) >>> 0;
  return h % 5 === 0;
};

/**
 * Every demo slot from now + LEAD_HOURS to WINDOW_DAYS ahead, grouped by calendar day in `tz`.
 * Returns Map<"YYYY-MM-DD", { start: Date, taken: boolean }[]>.
 */
export const buildSlots = (tz, now = new Date()) => {
  const byDay = new Map();
  const first = Math.ceil((now.getTime() + LEAD_HOURS * 3600 * 1000) / STEP_MS) * STEP_MS;
  const last = now.getTime() + WINDOW_DAYS * DAY_MS;
  const endLimit = TEAM_HOURS_UTC.close * 60 - DEMO_MINUTES;
  const localHour = new Intl.DateTimeFormat("en-US", { timeZone: tz, hour: "numeric", hourCycle: "h23" });

  for (let t = first; t <= last; t += STEP_MS) {
    const d = new Date(t);
    if (!TEAM_HOURS_UTC.days.includes(d.getUTCDay())) continue;
    const mins = d.getUTCHours() * 60 + d.getUTCMinutes();
    if (mins < TEAM_HOURS_UTC.open * 60 || mins > endLimit) continue;
    const h = Number(localHour.format(d));
    if (h < LOCAL_HOURS.from || h >= LOCAL_HOURS.to) continue;
    const key = dayKey(d, tz);
    if (!byDay.has(key)) byDay.set(key, []);
    byDay.get(key).push({ start: d, taken: isTaken(t) });
  }
  return byDay;
};

/** Six-row month grid of keys (null for padding cells), weeks starting Monday. */
export const monthGrid = (y, m) => {
  const firstWeekday = (new Date(Date.UTC(y, m - 1, 1)).getUTCDay() + 6) % 7;
  const days = new Date(Date.UTC(y, m, 0)).getUTCDate();
  const cells = Array.from({ length: firstWeekday }, () => null);
  for (let d = 1; d <= days; d += 1) cells.push(keyOf(y, m, d));
  while (cells.length % 7) cells.push(null);
  return cells;
};

export const formatTime = (date, tz, hour12) =>
  new Intl.DateTimeFormat("en-US", { timeZone: tz, hour: "numeric", minute: "2-digit", hour12 }).format(date);

export const formatLongDate = (date, tz) =>
  new Intl.DateTimeFormat("en-US", { timeZone: tz, weekday: "long", month: "long", day: "numeric" }).format(date);

export const formatMonth = (y, m) =>
  new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(Date.UTC(y, m - 1, 1)));

export const endOf = (start) => new Date(start.getTime() + DEMO_MINUTES * 60 * 1000);

/* ---------- add-to-calendar ---------- */

const icsStamp = (d) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

export const googleCalendarUrl = ({ start, title, details }) =>
  `https://calendar.google.com/calendar/render?${new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${icsStamp(start)}/${icsStamp(endOf(start))}`,
    details,
  })}`;

export const icsFile = ({ start, title, details, reference }) => {
  const esc = (s) => s.replace(/[\\;,]/g, (c) => `\\${c}`).replace(/\n/g, "\\n");
  const body = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Dobis//Demo booking//EN",
    "BEGIN:VEVENT",
    `UID:${reference}@dobis.com`,
    `DTSTAMP:${icsStamp(new Date())}`,
    `DTSTART:${icsStamp(start)}`,
    `DTEND:${icsStamp(endOf(start))}`,
    `SUMMARY:${esc(title)}`,
    `DESCRIPTION:${esc(details)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(body)}`;
};
