export const REASON_MAX = 1000;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const FREE_MAIL = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com", "aol.com", "proton.me"];

/** Returns { field: message } for every invalid field (empty object = valid). Order matches the form. */
export const validateBooking = (v) => {
  const errors = {};
  if (!v.email.trim()) errors.email = "Please enter your work email.";
  else if (!EMAIL.test(v.email.trim())) errors.email = "That email address doesn't look right.";
  if (!v.firstName.trim()) errors.firstName = "Please enter your first name.";
  if (!v.lastName.trim()) errors.lastName = "Please enter your last name.";
  if (!v.company.trim()) errors.company = "Please tell us your company name.";
  if (!v.size) errors.size = "Please choose your company size.";
  if (v.phone.trim() && v.phone.replace(/\D/g, "").length < 7) errors.phone = "Please enter a full phone number, or leave it empty.";
  const reason = v.reason.trim();
  if (reason.length < 5) errors.reason = "Tell us a little about what you need.";
  else if (reason.length > REASON_MAX) errors.reason = `Please keep this under ${REASON_MAX} characters.`;
  if (!v.consent) errors.consent = "Please agree so we can send your invite.";
  return errors;
};

/** Soft hint (not an error) when a personal email is used. */
export const isPersonalEmail = (email) => FREE_MAIL.includes(email.trim().toLowerCase().split("@")[1] ?? "");
