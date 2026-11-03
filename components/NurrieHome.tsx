"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ColourReveal from "./ColourReveal";
import ImmersiveHero from "./ImmersiveHero";
import WaitlistForm from "./WaitlistForm";

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

function ProductImage({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <img
      className={className}
      src="/images/product-duo-1536.webp"
      srcSet="/images/product-duo-640.webp 640w, /images/product-duo-1024.webp 1024w, /images/product-duo-1536.webp 1536w"
      sizes="(max-width: 700px) 750px, 90vw"
      width={1536}
      height={1024}
      alt="NURRIE in pearl ivory and rose gold, showing the white foundation and built-in brush"
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      loading={priority ? "eager" : "lazy"}
    />
  );
}


export default function NurrieHome() {
  const root = useRef<HTMLDivElement>(null);
  const [ritual, setRitual] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.from(".ritual-portrait img", { scale: 1.08, ease: "none", scrollTrigger: { trigger: ".ritual-editorial", start: "top bottom", end: "bottom top", scrub: 0.6 } });
      }, root);
      return () => context.revert();
    });
    return () => {
      media.revert();
    };
  }, []);

  function onRitualKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? 0 : event.key === "End" ? rituals.length - 1 : (index + (event.key === "ArrowRight" ? 1 : rituals.length - 1)) % rituals.length;
    setRitual(next);
    document.getElementById(`ritual-tab-${next}`)?.focus();
  }

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div ref={root} id="top" className="nurrie-page">
        <main id="main">
      <ImmersiveHero />
      <section className="object-proof" id="the-stick" aria-labelledby="stick-heading">
        <div className="object-proof-heading"><h2 id="stick-heading">One object.<br/><em>Two sides of you.</em></h2><div><p>White colour-changing foundation at one end. A built-in blending brush at the other. Pearl ivory, wrapped in rose gold.</p><a className="text-link" href="#the-ritual">Explore the ritual <ArrowUpRight size={20}/></a></div></div>
        <figure className="object-proof-image"><ProductImage/><figcaption>Foundation. Brush. All together.</figcaption><div className="object-proof-label foundation-label">The white formula<span/></div><div className="object-proof-label brush-label"><span/>The blending brush</div></figure>
      </section>
      <ColourReveal />
      <section className="ritual-editorial" id="the-ritual" aria-labelledby="ritual-heading">
            <div className="ritual-portrait">
              <img
                src="/images/editorial-portrait-cocoa.webp"
                srcSet="/images/editorial-portrait-cocoa-640.webp 640w, /images/editorial-portrait-cocoa.webp 1122w"
                sizes="(max-width: 700px) 100vw, 52vw"
                width={1122}
                height={1402}
                alt="NURRIE editorial portrait in warm light, ivory silk and warm cocoa"
                decoding="async"
                loading="lazy"
              />
              <span>Beauty that adapts to you.</span>
            </div>
            <div className="ritual-copy">
              <h2 id="ritual-heading">Less routine.<br /><em>More you.</em></h2>
              <p>A white formula. A brush. A little time for yourself. NURRIE brings the ritual together, so you can take it anywhere.</p>
              <div className="ritual-interaction">
                <div className="ritual-tabs" role="tablist" aria-label="Explore the foundation stick ritual">
                  {rituals.map((item, index) => (
                    <button
                      key={item.title}
                      type="button"
                      role="tab"
                      id={`ritual-tab-${index}`}
                      aria-selected={ritual === index}
                      aria-controls={`ritual-panel-${index}`}
                      tabIndex={ritual === index ? 0 : -1}
                      onClick={() => setRitual(index)}
                      onKeyDown={(event) => onRitualKey(event, index)}
                    >
                      <span>{index + 1}</span>
                      {item.title}
                    </button>
                  ))}
                </div>
                <div className="ritual-description" role="tabpanel" id={`ritual-panel-${ritual}`} aria-labelledby={`ritual-tab-${ritual}`}>
                  <p>{rituals[ritual].description}</p>
                  <span>{rituals[ritual].note}</span>
                </div>
              </div>
              <a className="text-link" href="#first-access">Be here for the beginning <ArrowUpRight size={20} /></a>
            </div>
          </section>
          <section className="faq" aria-labelledby="faq-heading">
            <h2 id="faq-heading">Curious?<br /><em>So are we.</em></h2>
            <div className="faq-list">
              {questions.map(([question, answer]) => (
                <details key={question} name="nurrie-faq">
                  <summary>{question}<Plus className="plus" size={22} /><Minus className="minus" size={22} /></summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </section>
          <section className="first-access" id="first-access" aria-labelledby="access-heading">
            <div className="signup-copy">
              <h2 id="access-heading">Meet your<br /><em>next favourite.</em></h2>
              <p>Be first to discover the NURRIE colour-changing foundation stick. Leave your email for launch news and a closer look.</p>
            </div>
            <div className="signup-panel"><WaitlistForm /></div>
            <span className="signup-bottom">The first NURRIE release. Coming soon.</span>
          </section>
        </main>
        <footer className="site-footer">
          <div className="footer-top">
            <p>Made for the way<br />you become yourself.</p>
            <a className="text-link" href="/#top">Back to the beginning <ArrowUpRight size={20} /></a>
          </div>
          <a className="footer-wordmark" href="/#top" aria-label="NURRIE back to top">NURRIE</a>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} NURRIE</span>
            <span>Beauty, becoming.</span>
            <a href="/privacy">Privacy & your data</a>
          </div>
        </footer>
      </div>
    </>
  );
}
