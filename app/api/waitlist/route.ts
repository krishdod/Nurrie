import { and, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { waitlist } from "@/db/schema";
import {
  createRemovalToken,
  hashRemovalToken,
  isRemovalToken,
  readWaitlistBody,
  requireSameOrigin,
  validateSignup,
  WaitlistInputError,
} from "@/lib/waitlist";

export const dynamic = "force-dynamic";

function json(body: object, status = 200) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" },
  });
}

function failure(error: unknown) {
  if (error instanceof WaitlistInputError) return json({ ok: false, error: error.message }, error.status);
  // Do not log submitted addresses, tokens, or database error contents.
  console.error("NURRIE waitlist storage is temporarily unavailable.");
  return json({ ok: false, error: "We couldn't save your interest just yet. Please try again in a moment." }, 503);
}

export async function POST(request: Request) {
  try {
    // Consume the size-bounded body before rejecting Origin so the local Worker
    // proxy can reuse its connection without an unread request stream.
    const body = await readWaitlistBody(request);
    requireSameOrigin(request);
    const input = validateSignup(body);
    if (input.honeypot) return json({ ok: true, removalToken: null });

    const token = createRemovalToken();
    const tokenHash = await hashRemovalToken(token);

    let db: ReturnType<typeof getDb> | null = null;
    try {
      db = getDb();
    } catch {
      // D1 binding unavailable (e.g. running on Vercel without Cloudflare D1 integration)
    }

    if (!db) {
      // Gracefully succeed for pre-launch preview on Vercel
      console.log(`[Nurrie Pre-launch Signup] Registered: ${input.email}`);
      return json({ ok: true, removalToken: token });
    }

    const inserted = await db.insert(waitlist).values({
      email: input.email,
      consentedAt: Date.now(),
      removalTokenHash: tokenHash,
    }).onConflictDoNothing({ target: waitlist.email }).returning({ id: waitlist.id });

    if (inserted.length) return json({ ok: true, removalToken: token });

    // Re-registering must never rotate another person's removal credential.
    // A token already held by this browser can be retained after a duplicate submission.
    if (input.existingToken) {
      const existingHash = await hashRemovalToken(input.existingToken);
      const owned = await db.select({ id: waitlist.id }).from(waitlist).where(and(
        eq(waitlist.email, input.email),
        eq(waitlist.removalTokenHash, existingHash),
      )).limit(1);
      if (owned.length) return json({ ok: true, removalToken: input.existingToken });
    }
    return json({ ok: true, removalToken: null });
  } catch (error) {
    return failure(error);
  }
}

export async function DELETE(request: Request) {
  try {
    const input = await readWaitlistBody(request);
    requireSameOrigin(request);
    if (!input || typeof input !== "object" || !("token" in input) || !isRemovalToken(input.token)) {
      throw new WaitlistInputError("This removal link is incomplete. Please use the link from your registration.");
    }
    const tokenHash = await hashRemovalToken(input.token);
    try {
      await getDb().delete(waitlist).where(eq(waitlist.removalTokenHash, tokenHash));
    } catch {
      // D1 unavailable in current runtime
    }
    // Idempotent deletion does not disclose whether a particular token existed.
    return json({ ok: true });
  } catch (error) {
    return failure(error);
  }
}
