import { apiClient, USE_MOCK } from "@/services/apiClient";

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Books a demo slot. Resolves with { reference, meetingUrl }.
 * Mock mode (VITE_USE_MOCK=true) waits briefly and returns fake values; an email containing
 * "fail@" simulates a server error and "taken@" simulates the slot being booked by someone else.
 * Real mode POSTs to `${VITE_API_BASE_URL}/bookings`; a 409 response means the slot was taken.
 */
export const bookDemo = async (payload) => {
  if (USE_MOCK) {
    await wait(1100);
    if (payload.email.includes("fail@")) throw new Error("Mock failure");
    if (payload.email.includes("taken@")) throw Object.assign(new Error("Slot taken"), { code: "SLOT_TAKEN" });
    const reference = `DM-${Date.now().toString(36).slice(-6).toUpperCase()}`;
    return { reference, meetingUrl: `https://meet.dobis.com/${reference.toLowerCase()}` };
  }
  try {
    const { data } = await apiClient.post("/bookings", payload);
    return data;
  } catch (err) {
    if (err.response?.status === 409) throw Object.assign(new Error("Slot taken"), { code: "SLOT_TAKEN" });
    throw err;
  }
};
