export const MAX_WAITLIST_BODY_BYTES = 4096;

export class WaitlistInputError extends Error {
  status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
    this.name = "WaitlistInputError";
  }
}

/** Public writes are only accepted from the site's own browser origin. */
export function requireSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin) {
    throw new WaitlistInputError("Please register from the NURRIE website.", 403);
  }
}

/** Check the actual stream size, not just the caller-supplied Content-Length. */
export async function readWaitlistBody(request: Request): Promise<unknown> {
  if (!/^application\/json(?:\s*;|$)/i.test(request.headers.get("content-type") ?? "")) {
    throw new WaitlistInputError("Please submit the registration form again.", 415);
  }
  const declaredLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_WAITLIST_BODY_BYTES) {
    throw new WaitlistInputError("That request is too large. Please try again.", 413);
  }
  if (!request.body) throw new WaitlistInputError("Please enter your email address.");

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > MAX_WAITLIST_BODY_BYTES) {
        await reader.cancel();
        throw new WaitlistInputError("That request is too large. Please try again.", 413);
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  try {
    return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
  } catch {
    throw new WaitlistInputError("We couldn't read that request. Please try again.");
  }
}

export function isRemovalToken(value: unknown): value is string {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}

export function validateSignup(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new WaitlistInputError("Please enter your email address.");
  }
  const input = value as Record<string, unknown>;
  // A filled hidden field indicates automated submission. Acknowledge without storing it.
  if (typeof input.website === "string" && input.website.trim()) return { honeypot: true as const };
  if (typeof input.email !== "string") {
    throw new WaitlistInputError("Please enter a valid email address.");
  }
  const email = input.email.trim().toLowerCase();
  const [local, domain, extra] = email.split("@");
  const validLocal = !!local && local.length <= 64 &&
    /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+$/i.test(local) &&
    !local.startsWith(".") && !local.endsWith(".") && !local.includes("..");
  const validDomain = !!domain && domain.length <= 253 && domain.includes(".") &&
    domain.split(".").every((label) => /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i.test(label));
  if (email.length > 254 || extra !== undefined || !validLocal || !validDomain) {
    throw new WaitlistInputError("Please enter a valid email address.");
  }
  if (input.consent !== true) {
    throw new WaitlistInputError("Please agree to receive NURRIE launch updates.");
  }
  return {
    honeypot: false as const,
    email,
    existingToken: isRemovalToken(input.removalToken) ? input.removalToken : null,
  };
}

export function createRemovalToken() {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function hashRemovalToken(token: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(token));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}
