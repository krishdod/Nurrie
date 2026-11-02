"use client";

import { lazy, Suspense, useEffect, useState, type FormEvent } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Minus, Pause, Play, Plus } from "lucide-react";
import ColourReveal from "./ColourReveal";

const KineticScene = lazy(() => import("./KineticScene"));
const SESSION_KEY = "nurrie-interest-removal";
const rituals = [
  { title: "Swipe.", description: "Begin with the white foundation. Apply the stick where you want coverage.", note: "It starts with a clean slate." },
  { title: "Blend.", description: "Turn to the built-in brush and blend. The white formula changes colour as you work it into your skin.", note: "The transformation is in the blend." },
  { title: "Be.", description: "A skin-toned finish, and a moment that’s yours. Replace the caps and take your day with you.", note: "Your skin. Your point of view." },
];
const questions = [
  ["Why is the foundation white?", "That’s the NURRIE signature. The foundation starts white and changes colour as you apply and blend it, adapting to your skin tone. The stick pairs this colour-changing formula with a brush at the other end."],
  ["Is the brush part of the stick?", "Yes. NURRIE has a double-ended design, with the white foundation on one end and a built-in blending brush on the other. Both product views on this page show the two ends of that design."],
  ["When will the foundation stick launch?", "We’re still preparing our first release. Join the list and we’ll share the launch date when it’s ready. Registration is free and doesn’t place an order or reserve stock."],
  ["What should I know before choosing it?", "We’ll share the full ingredients, application guidance, tone suitability, pricing, and availability ahead of launch. The interactive colour reveal is a visual explanation, not a personalised shade recommendation."],
  ["What happens when I join the list?", "Your email is saved to NURRIE’s interest list for product and launch updates. You won’t be charged, and no confirmation email is sent at this stage. You can remove your registration using the private link shown after signup."],
];

function WaitlistForm() {
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "removing" | "removed">("idle");
  const [error, setError] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [removalUrl, setRemovalUrl] = useState("");
  useEffect(() => {
    try { const saved = sessionStorage.getItem(SESSION_KEY); if (saved) { setToken(saved); setRemovalUrl(`${window.location.origin}/privacy#${saved}`); } } catch { /* Optional browser storage. */ }
  }, []);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = event.currentTarget; const data = new FormData(form); setStatus("saving"); setError("");
    try {
      const response = await fetch("/api/waitlist", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: data.get("email"), consent: data.get("consent") === "on", website: data.get("website"), removalToken: token }) });
      const result = await response.json() as { ok?: boolean; error?: string; removalToken?: string | null };
      if (!response.ok || !result.ok) throw new Error(result.error || "We couldn’t save your interest. Please try again.");
      const nextToken = result.removalToken || null; setToken(nextToken);
      if (nextToken) { setRemovalUrl(`${window.location.origin}/privacy#${nextToken}`); try { sessionStorage.setItem(SESSION_KEY, nextToken); } catch { /* The private link is also shown. */ } }
      setStatus("success"); form.reset();
    } catch (cause) { setError(cause instanceof Error ? cause.message : "We couldn’t connect. Please try again."); setStatus("idle"); }
  }
  async function remove() {
    if (!token) return; setStatus("removing"); setError("");
    try {
      const response = await fetch("/api/waitlist", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token }) });
      if (!response.ok) throw new Error("We couldn’t remove your email. Please try again.");
      setToken(null); setStatus("removed"); try { sessionStorage.removeItem(SESSION_KEY); } catch { /* No stored token to clear. */ }
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Please try again."); setStatus("success"); }
  }
  if (["success", "removing", "removed"].includes(status)) return (
    <div className="form-result" aria-live="polite">
      <div className="success-symbol"><Check size={25} strokeWidth={1.4} /></div>
      <h3>{status === "removed" ? "As you wish." : "You’re in the first chapter."}</h3>
      <p>{status === "removed" ? "Your email has been removed from our interest list." : "Your interest is registered. We’ll share launch news when we’re ready."}</p>
      {token && <><p className="small-copy">Keep your <a href={removalUrl}>private removal link</a> if you’d like to leave the list later.</p><button className="text-button" onClick={remove} disabled={status === "removing"}>{status === "removing" ? "Removing…" : "Remove my email"}</button></>}
      {!token && status === "success" && <p className="small-copy">Already registered? Your original private removal link still works. See <a href="/privacy">privacy & your data</a> for details.</p>}
      {status === "removed" && <button className="text-button" onClick={() => setStatus("idle")}>Return to signup <ArrowRight size={16} /></button>}
      {error && <p className="form-error" role="alert">{error}</p>}
    </div>
  );
  return (
    <form className="waitlist-form" onSubmit={submit}>
      <label htmlFor="email">Your email address</label>
      <div className="email-row"><input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" maxLength={254} required disabled={status === "saving"} aria-describedby="signup-note signup-error" /><button type="submit" className="submit-button" disabled={status === "saving"}>{status === "saving" ? "Joining…" : "Join the list"}<ArrowUpRight size={23} strokeWidth={1.5} /></button></div>
      <div className="honeypot" aria-hidden="true"><label htmlFor="website">Website</label><input name="website" id="website" tabIndex={-1} autoComplete="off" /></div>
      <label className="consent"><input type="checkbox" name="consent" required disabled={status === "saving"} /><span>I’d like product and launch news from NURRIE. I’ve read the <a href="/privacy">privacy note</a>.</span></label>
      <p id="signup-note" className="small-copy">Just the first word on what’s next. No purchase required.</p>
      <p id="signup-error" className="form-error" role={error ? "alert" : undefined}>{error}</p>
      <noscript><p>Enable JavaScript to register your interest using this form.</p></noscript>
    </form>
  );
}

export default function NurrieHome() {
  const [mounted, setMounted] = useState(false); const [paused, setPaused] = useState(false); const [ritual, setRitual] = useState(0); const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    setMounted(true);
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    update(); preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header"><a href="#" className="wordmark" aria-label="NURRIE home">NURRIE</a><nav aria-label="Main navigation"><a href="#the-change">The colour change</a><a href="#the-stick">The stick</a></nav><a className="nav-cta" href="#first-access">Get first access <ArrowUpRight size={17} strokeWidth={1.5} /></a></header>
      <main id="main">
        <section className="hero" aria-labelledby="hero-heading">
          <div className="hero-copy"><h1 id="hero-heading">Starts white.<br />Becomes you.</h1><p>The colour-changing foundation stick that adapts to your skin tone as you blend. With a brush at the other end.</p><a href="#first-access" className="button button-dark">Be first to meet NURRIE <ArrowUpRight size={20} strokeWidth={1.5} /></a><span className="launch-note">White formula. Your transformation. Coming soon.</span></div>
          <div className="hero-product-photo"><img src="/images/product-duo-1536.webp" srcSet="/images/product-duo-640.webp 640w, /images/product-duo-1024.webp 1024w, /images/product-duo-1536.webp 1536w" sizes="(max-width: 680px) 615px, 1035px" alt="NURRIE in pearl ivory and rose gold: white foundation at one end, a blending brush at the other" width={1536} height={1024} fetchPriority="high" /><span>One stick. Both sides of your ritual.</span></div>
          <div className="hero-bottom"><a href="#the-change">Discover the change <ArrowDown size={17} strokeWidth={1.5} /></a><span>Beauty that adapts to you.</span><span className="edition">NURRIE / The first chapter</span></div>
        </section>
        <section className="transformation" id="the-change" aria-labelledby="change-heading"><div className="change-copy"><h2 id="change-heading">The beauty<br />is in the change.</h2><p>White in the stick. A colour that comes into its own on your skin.</p><p>As you apply and blend, the formula changes from white to a skin-toned finish. It’s the idea at the heart of NURRIE: foundation that adapts to you.</p><a className="text-link" href="#first-access">Follow the transformation <ArrowUpRight size={18} /></a></div><ColourReveal /></section>
        <section className="introduction" id="the-stick" aria-labelledby="stick-heading">
          <div className="section-heading"><h2 id="stick-heading">Two ends.<br />One beautiful ritual.</h2><p>Colour-changing foundation on one end. A blending brush on the other. Wrapped in pearl ivory, with rose-gold accents that catch the light.</p></div>
          <div className="design-stage"><div className="design-caption"><h3>A little object.<br />Thought through.</h3><p>The white formula is the beginning.<br />The brush brings it together.</p><span>Explore the sculptural design.</span></div><div className="design-scene"><div className="scene-wrap" aria-label="Interactive three-dimensional NURRIE double-ended foundation stick">{mounted ? <Suspense fallback={<div className="scene-loading"><span>N</span></div>}><KineticScene paused={paused} /></Suspense> : <div className="scene-loading"><span>N</span></div>}</div></div><div className="design-motion">{reducedMotion ? <span>Motion reduced</span> : <button type="button" className="motion-button" onClick={() => setPaused(!paused)} aria-label={paused ? "Play product animation" : "Pause product animation"} aria-pressed={paused}>{paused ? <Play size={16} /> : <Pause size={16} />}</button>}</div></div>
          <div className="product-note"><p>The colour-changing stick</p><p>Foundation. Brush. Together.<br />The first NURRIE release.</p><a href="#first-access" className="text-link">Join the first chapter <ArrowUpRight size={19} /></a></div>
        </section>
        <section className="ritual" aria-labelledby="ritual-heading"><div className="ritual-intro"><h2 id="ritual-heading">A moment.<br />Then, your day.</h2><p>A simple ritual is the starting point.<br />You decide the rest.</p></div><div className="ritual-interaction"><div className="ritual-tabs" role="tablist" aria-label="Explore the foundation stick ritual">{rituals.map((item, index) => <button key={item.title} id={`ritual-tab-${index}`} type="button" role="tab" aria-selected={ritual === index} aria-controls={`ritual-panel-${index}`} tabIndex={ritual === index ? 0 : -1} onClick={() => setRitual(index)} onKeyDown={event => { if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) { event.preventDefault(); const next = event.key === "Home" ? 0 : event.key === "End" ? 2 : (index + (event.key === "ArrowRight" ? 1 : 2)) % 3; setRitual(next); document.getElementById(`ritual-tab-${next}`)?.focus(); } }}>{item.title}</button>)}</div><div key={ritual} role="tabpanel" id={`ritual-panel-${ritual}`} aria-labelledby={`ritual-tab-${ritual}`} className="ritual-description"><p>{rituals[ritual].description}</p><span>{rituals[ritual].note}</span></div></div></section>
        <section className="first-access" id="first-access" aria-labelledby="access-heading"><div className="signup-copy"><h2 id="access-heading">Your next chapter<br />starts here.</h2><p>Be first to discover NURRIE’s colour-changing foundation stick. Join the list for launch details and the first look at what comes next.</p></div><WaitlistForm /></section>
        <section className="faq" aria-labelledby="faq-heading"><h2 id="faq-heading">A few things<br />you might wonder.</h2><div className="faq-list">{questions.map(([question, answer]) => <details key={question}><summary>{question}<span className="faq-icons"><Plus className="plus" size={21} strokeWidth={1.4} /><Minus className="minus" size={21} strokeWidth={1.4} /></span></summary><p>{answer}</p></details>)}</div></section>
      </main>
      <footer className="site-footer"><div className="footer-top"><p>Beauty that<br />adapts to you.</p><a href="#first-access" className="text-link">Be part of the beginning <ArrowUpRight size={20} /></a></div><a className="footer-wordmark" href="#" aria-label="NURRIE back to top">NURRIE</a><div className="footer-bottom"><span>© {new Date().getFullYear()} NURRIE</span><span>The colour-changing foundation stick. Coming soon.</span><a href="/privacy">Privacy & your data</a></div></footer>
    </>
  );
}

