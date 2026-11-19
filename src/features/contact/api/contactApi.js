import { apiClient, USE_MOCK } from "@/services/apiClient";

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Sends a contact request. Resolves with { reference } (shown to the user).
 * Mock mode (VITE_USE_MOCK=true) waits briefly and returns a fake reference; an email
 * containing "fail@" simulates a server error so the error state can be tested.
 * Real mode POSTs to `${VITE_API_BASE_URL}/contact`; the backend must return { reference }.
 */
export const submitContact = async (payload) => {
  if (USE_MOCK) {
    await wait(1100);
    if (payload.email.includes("fail@")) throw new Error("Mock failure");
    return { reference: `DB-${Date.now().toString(36).slice(-6).toUpperCase()}` };
  }
  const { data } = await apiClient.post("/contact", payload);
  return data;
};
