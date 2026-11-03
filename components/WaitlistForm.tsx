"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";

const SESSION_KEY = "nurrie-interest-removal";

type WaitlistResult = { ok?: boolean; error?: string; removalToken?: string | null };

async function readWaitlistResponse(response: Response): Promise<WaitlistResult> {
  try {
    return (await response.json()) as WaitlistResult;
  } catch {
    return {};
  }
}

export default function WaitlistForm() {
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "removing" | "removed">("idle");
  const [error, setError] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [removalUrl, setRemovalUrl] = useState("");

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(SESSION_KEY);
      if (saved) {
        setToken(saved);
        setRemovalUrl(`${window.location.origin}/privacy#${saved}`);
      }
    } catch {
      /* Optional browser storage. */
    }
  }, []);

  function rememberToken(nextToken: string) {
    setToken(nextToken);
    setRemovalUrl(`${window.location.origin}/privacy#${nextToken}`);
    try {
      sessionStorage.setItem(SESSION_KEY, nextToken);
    } catch {
      /* The private link is also shown. */
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("saving");
    setError("");
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.get("email"),
          consent: data.get("consent") === "on",
          website: data.get("website"),
          removalToken: token,
        }),
      });
      const result = await readWaitlistResponse(response);
      if (!response.ok || !result.ok) throw new Error(result.error || "We couldn’t save your interest. Please try again.");
      if (result.removalToken) rememberToken(result.removalToken);
      setStatus("success");
      form.reset();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "We couldn’t connect. Please try again.");
      setStatus("idle");
    }
  }

  async function remove() {
    if (!token) return;
    setStatus("removing");
    setError("");
    try {
      const response = await fetch("/api/waitlist", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const result = await readWaitlistResponse(response);
      if (!response.ok || result.ok !== true) throw new Error(result.error || "We couldn’t remove your email. Please try again.");
      setToken(null);
      setStatus("removed");
      try {
        sessionStorage.removeItem(SESSION_KEY);
      } catch {
        /* No stored token to clear. */
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Please try again.");
      setStatus("success");
    }
  }

  if (["success", "removing", "removed"].includes(status)) {
    return (
      <div className="form-result" aria-live="polite">
        <div className="success-symbol"><Check size={25} strokeWidth={1.4} /></div>
        <h3>{status === "removed" ? "As you wish." : "You’re in the first chapter."}</h3>
        <p>{status === "removed" ? "Your email has been removed from our interest list." : "Your interest is registered. We’ll share launch news when we’re ready."}</p>
        {token && (
          <>
            <p className="small-copy">Keep your <a href={removalUrl}>private removal link</a> if you’d like to leave the list later.</p>
            <button type="button" className="text-button" onClick={remove} disabled={status === "removing"}>
              {status === "removing" ? "Removing…" : "Remove my email"}
            </button>
          </>
        )}
        {!token && status === "success" && (
          <p className="small-copy">Already registered? Your original private removal link still works. See <a href="/privacy">privacy & your data</a> for details.</p>
        )}
        {status === "removed" && (
          <button type="button" className="text-button" onClick={() => setStatus("idle")}>Return to signup <ArrowRight size={16} /></button>
        )}
        {error && <p className="form-error" role="alert">{error}</p>}
      </div>
    );
  }

  return (
    <form className="waitlist-form" onSubmit={submit}>
      <label htmlFor="email">Your email address</label>
      <div className="email-row">
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          maxLength={254}
          required
          disabled={status === "saving"}
          aria-describedby="signup-note signup-error"
        />
        <button type="submit" className="submit-button" disabled={status === "saving"}>
          {status === "saving" ? "Joining…" : "Join the list"}
          <ArrowUpRight size={23} strokeWidth={1.5} />
        </button>
      </div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input name="website" id="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      </div>
      <label className="consent">
        <input type="checkbox" name="consent" required disabled={status === "saving"} />
        <span>I’d like product and launch news from NURRIE. I’ve read the <a href="/privacy">privacy note</a>.</span>
      </label>
      <p id="signup-note" className="small-copy">Just the first word on what’s next. No purchase required.</p>
      <p id="signup-error" className="form-error" role={error ? "alert" : undefined}>{error}</p>
      <noscript><p>Enable JavaScript to register your interest using this form.</p></noscript>
    </form>
  );
}
