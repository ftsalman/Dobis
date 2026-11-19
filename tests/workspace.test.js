import test from "node:test";
import assert from "node:assert/strict";
import { initialWorkspace } from "../src/features/workspace/constants/demoData.js";
import {
  createDeal,
  isWorkspace,
  moveDeal,
} from "../src/features/workspace/utils/workspace.js";

test("winning a deal creates an invoice and onboarding task without mutating the original", () => {
  const before = structuredClone(initialWorkspace);
  const next = moveDeal(initialWorkspace, "d1", "Won");
  assert.equal(next.deals.find((d) => d.id === "d1").stage, "Won");
  assert.equal(next.invoices.find((i) => i.dealId === "d1").value, 12500);
  assert.equal(
    next.tasks.find((t) => t.dealId === "d1").project,
    "Northstar Studio onboarding",
  );
  assert.deepEqual(initialWorkspace, before);
  assert.ok(isWorkspace(next));
});
test("reopening and re-winning a deal does not duplicate connected records", () => {
  const won = moveDeal(initialWorkspace, "d1", "Won");
  const reopened = moveDeal(won, "d1", "Proposal");
  const again = moveDeal(reopened, "d1", "Won");
  assert.equal(again.invoices.filter((i) => i.dealId === "d1").length, 1);
  assert.equal(again.tasks.filter((t) => t.dealId === "d1").length, 1);
});
test("invalid and unknown stage transitions are handled safely", () => {
  assert.throws(() => moveDeal(initialWorkspace, "d1", "Unknown"));
  assert.equal(moveDeal(initialWorkspace, "missing", "Won"), initialWorkspace);
});
test("new deals normalize inputs and reject invalid values", () => {
  assert.deepEqual(
    createDeal(
      { name: " Launch ", company: " Demo Co ", value: "450.25" },
      "new",
    ),
    {
      id: "new",
      name: "Launch",
      company: "Demo Co",
      value: 450.25,
      stage: "New",
    },
  );
  for (const value of [
    "0",
    "0.001",
    "10.999",
    "-1",
    "NaN",
    "Infinity",
    "100000001",
  ])
    assert.throws(() =>
      createDeal({ name: "Launch", company: "Demo", value }, "new"),
    );
  assert.throws(() =>
    createDeal({ name: "   ", company: "Demo", value: 10 }, "new"),
  );
});
test("stored data validation rejects malformed, duplicate, and incompatible records", () => {
  assert.ok(isWorkspace(initialWorkspace));
  for (const value of [
    null,
    {},
    { ...initialWorkspace, deals: [null] },
    { ...initialWorkspace, invoices: [{ id: "bad" }] },
    {
      ...initialWorkspace,
      tasks: [{ ...initialWorkspace.tasks[0], done: "yes" }],
    },
    {
      ...initialWorkspace,
      deals: [...initialWorkspace.deals, initialWorkspace.deals[0]],
    },
  ])
    assert.equal(isWorkspace(value), false);
});
