import { COMPANY_REQUIRED, MESSAGE_REQUIRED } from "../constants/contact";

export const MESSAGE_MAX = 1000;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const FREE_MAIL = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com", "aol.com", "proton.me"];

/** Returns { field: message } for every invalid field (empty object = valid). */
export const validateContact = (v) => {
  const errors = {};
  if (v.name.trim().length < 2) errors.name = "Please enter your full name.";
  if (!v.email.trim()) errors.email = "Please enter your email address.";
  else if (!EMAIL.test(v.email.trim())) errors.email = "That email address doesn't look right.";
  if (COMPANY_REQUIRED.includes(v.topic) && !v.company.trim()) errors.company = "Please tell us your company name.";
  if (COMPANY_REQUIRED.includes(v.topic) && !v.size) errors.size = "Please choose your company size.";
  if (v.phone.trim() && v.phone.replace(/\D/g, "").length < 7) errors.phone = "Please enter a full phone number, or leave it empty.";
  const msg = v.message.trim();
  if (MESSAGE_REQUIRED.includes(v.topic) && msg.length < 10) errors.message = "Please tell us a little more (at least 10 characters).";
  if (msg.length > MESSAGE_MAX) errors.message = `Please keep your message under ${MESSAGE_MAX} characters.`;
  if (!v.consent) errors.consent = "Please agree so we can reply to you.";
  return errors;
};

/** Soft hint (not an error) when a personal email is used for a business request. */
export const isPersonalEmail = (email) => FREE_MAIL.includes(email.trim().toLowerCase().split("@")[1] ?? "");
