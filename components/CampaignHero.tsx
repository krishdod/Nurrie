"use client";

import { useEffect, useRef, useState } from "react";
import { PRODUCT } from "@/lib/product";
import { ArrowDown, ArrowUpRight, Sparkle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function CampaignHero() {
  const root = useRef<HTMLElement>(null);
  const [view, setView] = useState<"formula" | "face">("formula");
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.from(".campaign-image", { scale: 1.045, duration: 1.8, ease: "power3.out" });
        gsap.from(".campaign-copy > *", { y: 26, opacity: .35, duration: 1.1, stagger: .12, ease: "power3.out" });
        gsap.from(".campaign-wordmark span", { yPercent: 100, duration: 1.5, stagger: .055, ease: "power4.out" });
        gsap.to(".campaign-image img", { yPercent: -7, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: .6 } });
        gsap.to(".campaign-wordmark", { yPercent: -16, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: .6 } });
      }, root);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);

  return <section ref={root} className="campaign-cover" aria-labelledby="campaign-title" data-view={view}>
    <div className={`campaign-image campaign-image--face ${view === "face" ? "" : "is-inactive"}`} aria-hidden={view !== "face"}>
      <img src="/images/campaign-portrait-wide-v5.webp" srcSet="/images/campaign-portrait-wide-v5-1000.webp 1000w, /images/campaign-portrait-wide-v5.webp 1672w" sizes="100vw" width={1672} height={941} alt="NURRIE beauty campaign: warm skin, ivory silk and cocoa light" decoding="async" fetchPriority="low" />
    </div>
    <div className={`campaign-image campaign-image--product ${view === "formula" ? "" : "is-inactive"}`} aria-hidden={view !== "formula"}>
      <img src={PRODUCT.campaign} srcSet={PRODUCT.campaignSrcSet} sizes="100vw" width={1672} height={941} alt="The NURRIE stick in cocoa light: pure white foundation and pearl-white casing with rose-gold trim, beside its brush-end view" fetchPriority="high" />
    </div>
    <header className="campaign-nav">
      <a href="/" className="campaign-signature" aria-label="NURRIE home">N<span aria-hidden="true"><Sparkle size={16} fill="currentColor" strokeWidth={1}/></span></a>
      <nav aria-label="Main navigation"><a href="#the-stick">The foundation</a><a href="#the-ritual">The ritual</a></nav>
      <a href="#first-access" className="campaign-access">Get first access <span><ArrowUpRight size={20}/></span></a>
    </header>
    <div className="campaign-copy">
      <h1 id="campaign-title">{view === "formula" ? <>White.<br/><em>Until you.</em></> : <>Beauty,<br/><em>becoming.</em></>}</h1>
      <p>A foundation that starts white.<br/>A colour that becomes yours.</p>
      <a href="#the-stick" className="campaign-discover">Discover the colour-changing stick <ArrowDown size={20}/></a>
    </div>
    <div className="campaign-wordmark" aria-label="NURRIE">{"NURRIE".split("").map((letter, i) => <span key={i} aria-hidden="true">{letter}</span>)}</div>
    <div className="campaign-edge"><span><span className="campaign-made">Made for you. </span>Coming soon.</span><div className="campaign-scene-switch" role="group" aria-label="Choose the campaign view"><button type="button" aria-pressed={view === "formula"} onClick={() => setView("formula")}>The white formula</button><button type="button" aria-pressed={view === "face"} onClick={() => setView("face")}>The face</button></div></div>
  </section>;
}
