import axios from "axios";

/** Shared HTTP client. Set VITE_API_BASE_URL in .env; VITE_USE_MOCK=true keeps API modules on mock data. */
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

export const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";
