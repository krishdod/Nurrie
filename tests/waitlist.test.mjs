import test from "node:test";
import assert from "node:assert/strict";
import {
  createRemovalToken,
  hashRemovalToken,
  isRemovalToken,
  readWaitlistBody,
  requireSameOrigin,
  validateSignup,
} from "../lib/waitlist.ts";

const request = (body, headers = {}) => new Request("https://nurrie.example/api/waitlist", {
  method: "POST",
  headers: { "content-type": "application/json", origin: "https://nurrie.example", ...headers },
  body,
});

test("normalizes email and requires explicit consent", () => {
  assert.deepEqual(validateSignup({ email: "  Someone+launch@Example.COM ", consent: true, website: "" }), {
    honeypot: false, email: "someone+launch@example.com", existingToken: null,
  });
  for (const consent of [undefined, false, "true", 1]) {
    assert.throws(() => validateSignup({ email: "person@example.com", consent }), /agree/);
  }
});

test("rejects malformed and excessive addresses", () => {
  for (const email of ["bad", "a@b", "a b@example.com", "a..b@example.com", ".a@example.com", "a@-example.com", "a@example..com", "a@example.com@else.com", `${"a".repeat(65)}@example.com`]) {
    assert.throws(() => validateSignup({ email, consent: true }), /valid email/);
  }
});

test("honeypot is acknowledged without creating a signup payload", () => {
  assert.deepEqual(validateSignup({ website: "https://spam.example" }), { honeypot: true });
});

test("rejects missing and cross-site origins", () => {
  assert.doesNotThrow(() => requireSameOrigin(request("{}")));
  assert.throws(() => requireSameOrigin(request("{}", { origin: "https://evil.example" })), /website/);
  assert.throws(() => requireSameOrigin(request("{}", { origin: "null" })), /website/);
  assert.throws(() => requireSameOrigin(new Request("https://nurrie.example/api/waitlist")), /website/);
});

test("uses the public HTTP host when Next supplies an internal bind address", () => {
  const lan = (origin, extra = {}) => new Request("http://0.0.0.0:4173/api/waitlist", {
    headers: { host: "192.168.1.2:4173", origin, ...extra },
  });
  assert.doesNotThrow(() => requireSameOrigin(lan("http://192.168.1.2:4173")));
  assert.throws(() => requireSameOrigin(lan("https://evil.example")), /website/);
  assert.throws(() => requireSameOrigin(lan("https://evil.example", { "x-forwarded-host": "evil.example" })), /website/);
  assert.throws(() => requireSameOrigin(lan("http://0.0.0.0:4173")), /website/);
});

test("valid JSON parses and unsupported content types are rejected", async () => {
  assert.deepEqual(await readWaitlistBody(request('{"email":"a@example.com"}')), { email: "a@example.com" });
  await assert.rejects(readWaitlistBody(request("{}", { "content-type": "text/plain" })), { status: 415 });
  await assert.rejects(readWaitlistBody(request("not JSON")), { status: 400 });
});

test("enforces body limit even when content length is absent or misleading", async () => {
  await assert.rejects(readWaitlistBody(request("x".repeat(4097))), { status: 413 });
  await assert.rejects(readWaitlistBody(request("x".repeat(4097), { "content-length": "10" })), { status: 413 });
  await assert.rejects(readWaitlistBody(request("{}", { "content-length": "5000" })), { status: 413 });
});

test("tokens use independent 256-bit randomness and are stored as hashes", async () => {
  const first = createRemovalToken();
  const second = createRemovalToken();
  assert.equal(isRemovalToken(first), true);
  assert.notEqual(first, second);
  const digest = await hashRemovalToken(first);
  assert.equal(digest.length, 64);
  assert.notEqual(digest, first);
  assert.equal(await hashRemovalToken(first), digest);
  assert.equal(isRemovalToken("arbitrary"), false);
});

test("only a well-formed prior token is forwarded", () => {
  const token = createRemovalToken();
  assert.equal(validateSignup({ email: "a@example.com", consent: true, removalToken: token }).existingToken, token);
  assert.equal(validateSignup({ email: "a@example.com", consent: true, removalToken: "bad" }).existingToken, null);
});
