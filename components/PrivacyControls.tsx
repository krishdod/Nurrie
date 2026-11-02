"use client";

import { useEffect, useState, type FormEvent } from "react";

const SESSION_KEY = "nurrie-interest-removal";
const TOKEN_PATTERN = /^[a-f0-9]{64}$/;

/** Accept only this site's fragment-based links or an original raw token. */
function parseRemovalToken(value: string, origin: string): string | null {
  const trimmed = value.trim();
  if (TOKEN_PATTERN.test(trimmed)) return trimmed;
  if (trimmed.startsWith("#") && TOKEN_PATTERN.test(trimmed.slice(1))) return trimmed.slice(1);
  try {
    const url = new URL(trimmed, origin);
    if (url.origin !== origin || url.pathname.replace(/\/$/, "") !== "/privacy" || url.search) return null;
    const token = url.hash.slice(1);
    return TOKEN_PATTERN.test(token) ? token : null;
  } catch {
    return null;
  }
}

export default function PrivacyControls() {
  const [link, setLink] = useState("");
  const [status, setStatus] = useState<"idle" | "removing" | "removed">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    function restoreLink() {
      let value = window.location.hash;
      if (!value) {
        try { value = sessionStorage.getItem(SESSION_KEY) ?? ""; }
        catch { /* A saved private link also works without browser storage. */ }
      }
      const token = value ? parseRemovalToken(value, window.location.origin) : null;
      if (token) {
        setLink(`${window.location.origin}/privacy#${token}`);
        setError("");
      } else if (value) {
        setError("This link looks incomplete. Paste the full private removal link from your registration.");
      }
    }
    restoreLink();
    window.addEventListener("hashchange", restoreLink);
    return () => window.removeEventListener("hashchange", restoreLink);
  }, []);

  async function remove(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const token = parseRemovalToken(link, window.location.origin);
    if (!token) {
      setError("Paste your complete NURRIE private removal link or the original removal token.");
      return;
    }
    setError("");
    setStatus("removing");
    try {
      const response = await fetch("/api/waitlist", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const result = await response.json();
      if (!response.ok || !result || typeof result !== "object" || !("ok" in result) || result.ok !== true) {
        throw new Error("We couldn't remove your email yet. Please try again in a moment.");
      }
      try {
        if (sessionStorage.getItem(SESSION_KEY) === token) sessionStorage.removeItem(SESSION_KEY);
      } catch { /* The server deletion has succeeded even if storage is unavailable. */ }
      if (window.location.hash === `#${token}`) {
        window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
      }
      setLink("");
      setStatus("removed");
    } catch {
      setStatus("idle");
      setError("We couldn't remove your email yet. Please check your connection and try again.");
    }
  }

  return (
    <section className="removal-box" aria-labelledby="removal-heading">
      <h2 id="removal-heading">Leave the list</h2>
      {status === "removed" ? (
        <div role="status">
          <p>Any registration associated with this private link has been removed from the launch list.</p>
          <a href="/" className="button button-dark">Back to NURRIE</a>
        </div>
      ) : (
        <form onSubmit={remove} aria-busy={status === "removing"}>
          <p id="removal-help">Use the private link from your registration. If it is available in this browser session, it is filled in below.</p>
          <label htmlFor="removal-link">Private removal link or token</label>
          <input
            id="removal-link"
            name="removal-link"
            type="text"
            value={link}
            onChange={(event) => { setLink(event.target.value); setError(""); }}
            placeholder="Paste your private removal link"
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            maxLength={2048}
            required
            disabled={status === "removing"}
            aria-describedby={`removal-help${error ? " removal-error" : ""}`}
            aria-invalid={error ? true : undefined}
          />
          {error && <p id="removal-error" className="form-error" role="alert">{error}</p>}
          <button className="button button-dark" type="submit" disabled={status === "removing"}>
            {status === "removing" ? "Removing your email…" : "Remove my email"}
          </button>
          <p className="small-copy">This removes the registration associated with the link. You can register again whenever you choose.</p>
        </form>
      )}
    </section>
  );
}
