import test from "node:test";
import assert from "node:assert/strict";
import { SCENARIOS, classify } from "../src/classify.js";

test("same network has a normal result", () => {
  assert.equal(classify(...Object.values(SCENARIOS.same)).level, "normal");
});

test("missing families and split networks are distinguished", () => {
  assert.equal(classify(SCENARIOS.ipv6_missing.ipv4, SCENARIOS.ipv6_missing.ipv6).title, "IPv6 unavailable");
  assert.equal(classify(SCENARIOS.mixed.ipv4, SCENARIOS.mixed.ipv6).title, "Mixed network signals");
  assert.equal(classify(SCENARIOS.different.ipv4, SCENARIOS.different.ipv6).title, "Different network signals");
  assert.equal(classify(SCENARIOS.unavailable.ipv4, SCENARIOS.unavailable.ipv6).level, "unavailable");
});
