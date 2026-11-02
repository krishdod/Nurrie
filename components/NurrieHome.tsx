"use client";

import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Minus, Pause, Play, Plus } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ColourReveal from "./ColourReveal";
import WaitlistForm from "./WaitlistForm";

const KineticScene = lazy(() => import("./KineticScene"));
const rituals = [
  { title: "Swipe", description: "Start with the white foundation. Apply the stick where you want coverage.", note: "An unexpected first touch." },
  { title: "Blend", description: "Turn to the built-in brush. As you blend, the white formula changes to a skin-toned finish.", note: "This is where the change happens." },
  { title: "Be", description: "Replace the caps, take your stick with you, and get on with being you.", note: "Your skin. Your point of view." },
];
const questions = [
  ["White foundation? Tell me more.", "That’s the NURRIE signature. The foundation starts white and changes colour as you apply and blend it, adapting to your skin tone. Full ingredients, tone suitability and application details will be shared ahead of launch."],
  ["One stick, with the brush too?", "Yes. The double-ended design brings white colour-changing foundation and a built-in blending brush together. The two product views on this page show both ends of the same design."],
  ["When can I meet NURRIE?", "Our first release is on its way. Join the list for the launch date, pricing and availability when they’re ready. Registration is free and does not place an order or reserve stock."],
  ["What happens when I join?", "Your email and consent are saved for NURRIE product and launch updates. No automatic email is sent at this stage. You can leave the list using the private removal link shown after signup."],
];

function ProductImage({ className = "" }: { className?: string }) {
  return <img className={className} src="/images/product-duo-1536.webp" srcSet="/images/product-duo-640.webp 640w, /images/product-duo-1024.webp 1024w, /images/product-duo-1536.webp 1536w" sizes="(max-width: 700px) 750px, 90vw" width={1536} height={1024} alt="NURRIE in pearl ivory and rose gold, showing the white foundation and built-in brush" fetchPriority="high" />;
}

export default function NurrieHome() {
  const root = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [ritual, setRitual] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    setMounted(true);
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    update(); preference.addEventListener("change", update);
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.from(".monument span", {yPercent:24, rotationX:18, duration:1.15, stagger:.045, ease:"power3.out"});
        gsap.to(".hero-visual img", {yPercent:5, scale:1.06, ease:"none", scrollTrigger:{trigger:".campaign-hero",start:"top top",end:"bottom top",scrub:.6}});
        gsap.from(".ritual-portrait img", {scale:1.08, ease:"none", scrollTrigger:{trigger:".ritual-editorial",start:"top bottom",end:"bottom top",scrub:.6}});
      }, root);
      return () => context.revert();
    });
    return () => {preference.removeEventListener("change", update); media.revert();};
  }, []);

  return <div ref={root} id="top" className="nurrie-page">
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header">
      <a className="header-brand" href="/" aria-label="NURRIE home">Beauty, becoming.</a>
      <nav aria-label="Main navigation"><a href="#the-change">The change</a><a href="#the-stick">The stick</a><a href="#the-ritual">The ritual</a></nav>
      <a className="header-invitation" href="#first-access">Join the first drop <ArrowUpRight size={17}/></a>
    </header>
    <main id="main">
      <section className="campaign-hero" aria-labelledby="hero-heading">
        <div className="monument" aria-label="NURRIE">{"NURRIE".split("").map((letter,index)=><span key={index} aria-hidden="true">{letter}</span>)}</div>
        <div className="hero-visual"><ProductImage /></div>
        <div className="hero-copy"><h1 id="hero-heading">Starts white.<br />Becomes <em>you.</em></h1><p>The colour-changing foundation stick.<br />White at first. Your skin tone as you blend.</p><a href="#first-access" className="button button-rose">Get first access <ArrowUpRight size={20}/></a><span className="launch-note">Something personal is coming.</span></div>
        <a className="hero-discover" href="#the-change"><span>Discover<br />the change</span><ArrowDown size={22}/></a>
        <span className="hero-photo-note">One stick. Both sides of your ritual.</span>
      </section>
      <ColourReveal />
      <section className="object-chapter" id="the-stick" aria-labelledby="stick-heading">
        <div className="object-scene" aria-label="Interactive NURRIE product design">{mounted ? <Suspense fallback={<div className="scene-loading"><ProductImage /></div>}><KineticScene variant="editorial" paused={paused}/></Suspense> : <div className="scene-loading"><ProductImage /></div>}</div>
        <div className="object-copy"><h2 id="stick-heading">Two ends.<br />One ritual.</h2><p>Colour-changing foundation.<br />A built-in blending brush.<br />An object made for your everyday.</p><a className="text-link" href="#the-ritual">Find your rhythm <ArrowUpRight size={20}/></a></div>
        <div className="object-bottom"><p>Pearl ivory. Rose gold.<br />A little light, from every angle.</p><div className="motion-controls"><span>{reducedMotion ? "Motion reduced" : "Move your cursor. Catch the light."}</span>{!reducedMotion && <button type="button" className="motion-button" onClick={()=>setPaused(!paused)} aria-label={paused ? "Play product animation" : "Pause product animation"} aria-pressed={paused}>{paused ? <Play size={17}/> : <Pause size={17}/>}</button>}</div></div>
      </section>
      <section className="ritual-editorial" id="the-ritual" aria-labelledby="ritual-heading">
        <div className="ritual-portrait"><img src="/images/editorial-portrait-cocoa.webp" srcSet="/images/editorial-portrait-cocoa-640.webp 640w, /images/editorial-portrait-cocoa.webp 1122w" sizes="(max-width: 700px) 100vw, 52vw" width={1122} height={1402} alt="NURRIE editorial portrait in warm light, ivory silk and warm cocoa" loading="lazy"/><span>Beauty that adapts to you.</span></div>
        <div className="ritual-copy"><h2 id="ritual-heading">Less routine.<br /><em>More you.</em></h2><p>A white formula. A brush. A little time for yourself. NURRIE brings the ritual together, so you can take it anywhere.</p><div className="ritual-interaction"><div className="ritual-tabs" role="tablist" aria-label="Explore the foundation stick ritual">{rituals.map((item,index)=><button key={item.title} type="button" role="tab" id={`ritual-tab-${index}`} aria-selected={ritual===index} aria-controls={`ritual-panel-${index}`} tabIndex={ritual===index?0:-1} onClick={()=>setRitual(index)} onKeyDown={event=>{if(["ArrowLeft","ArrowRight","Home","End"].includes(event.key)){event.preventDefault();const next=event.key==="Home"?0:event.key==="End"?2:(index+(event.key==="ArrowRight"?1:2))%3;setRitual(next);document.getElementById(`ritual-tab-${next}`)?.focus();}}}><span>{index+1}</span>{item.title}</button>)}</div><div className="ritual-description" role="tabpanel" id={`ritual-panel-${ritual}`} aria-labelledby={`ritual-tab-${ritual}`}><p>{rituals[ritual].description}</p><span>{rituals[ritual].note}</span></div></div><a className="text-link" href="#first-access">Be here for the beginning <ArrowUpRight size={20}/></a></div>
      </section>
      <section className="faq" aria-labelledby="faq-heading"><h2 id="faq-heading">Curious?<br /><em>So are we.</em></h2><div className="faq-list">{questions.map(([question,answer])=><details key={question}><summary>{question}<Plus className="plus" size={22}/><Minus className="minus" size={22}/></summary><p>{answer}</p></details>)}</div></section>
      <section className="first-access" id="first-access" aria-labelledby="access-heading"><div className="signup-copy"><h2 id="access-heading">Meet your<br /><em>next favourite.</em></h2><p>Be first to discover the NURRIE colour-changing foundation stick. Leave your email for launch news and a closer look.</p></div><div className="signup-panel"><WaitlistForm/></div><span className="signup-bottom">The first NURRIE release. Coming soon.</span></section>
    </main>
    <footer className="site-footer"><div className="footer-top"><p>Made for the way<br />you become yourself.</p><a className="text-link" href="/#top">Back to the beginning <ArrowUpRight size={20}/></a></div><a className="footer-wordmark" href="/#top" aria-label="NURRIE back to top">NURRIE</a><div className="footer-bottom"><span>© {new Date().getFullYear()} NURRIE</span><span>Beauty, becoming.</span><a href="/privacy">Privacy & your data</a></div></footer>
  </div>;
}

