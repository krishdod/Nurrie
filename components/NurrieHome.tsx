"use client";

import { PRODUCT } from "@/lib/product";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LivingCover from "./LivingCover";
import MetamorphosisStudio from "./MetamorphosisStudio";
import LuxuryCursor from "./LuxuryCursor";
import WaitlistForm from "./WaitlistForm";
import { sensoryAudio } from "./SensoryAudio";

const rituals = [
  { title: "Swipe", description: "Start with the white foundation. Apply the stick where you want coverage.", note: "An unexpected first touch." },
  { title: "Blend", description: "Turn to the built-in brush. As you blend, the white formula changes to a skin-toned finish.", note: "This is where the change happens." },
  { title: "Be", description: "Replace the caps, take your stick with you, and get on with being you.", note: "Your skin. Your point of view." },
];

const questions = [
  [
    "White foundation? Tell me more.",
    "That's the NURRIE signature. The foundation starts white and changes colour as you apply and blend it, adapting to your skin tone. Full ingredients, tone suitability and application details will be shared ahead of launch.",
  ],
  [
    "One stick, with the brush too?",
    "Yes. The double-ended design brings white colour-changing foundation and a built-in blending brush together. The two product views on this page show both ends of the same design.",
  ],
  [
    "When can I meet NURRIE?",
    "Our first release is on its way. Join the list for the launch date, pricing and availability when they're ready. Registration is free and does not place an order or reserve stock.",
  ],
  [
    "What happens when I join?",
    "Your email and consent are saved for NURRIE product and launch updates. No automatic email is sent at this stage. You can leave the list using the private removal link shown after signup.",
  ],
];

export default function NurrieHome() {
  const root = useRef<HTMLDivElement>(null);
  const [ritual, setRitual] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.from(".ritual-life img", { scale: 1.08, ease: "none", scrollTrigger: { trigger: ".ritual-editorial", start: "top bottom", end: "bottom top", scrub: 0.6 } });
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
    sensoryAudio.tabChime();
    document.getElementById(`ritual-tab-${next}`)?.focus();
  }

  return (
    <>
      <LuxuryCursor />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div ref={root} id="top" className="nurrie-page nurrie-campaign nurrie-living">
        <main id="main">
          <LivingCover />

          <section className="product-diptych" id="the-stick" aria-labelledby="diptych-heading">
            <div className="diptych-heading">
              <span className="section-eyebrow">The Architecture</span>
              <h2 id="diptych-heading">
                A different
                <br />
                starting point.
              </h2>
              <p>NURRIE starts with white foundation. As you apply and blend, the colour changes, adapting to your skin tone.</p>
            </div>
            <div className="diptych-fields">
              <figure className="diptych-product">
                <img
                  src={PRODUCT.image}
                  srcSet={PRODUCT.srcSet}
                  sizes="(max-width:700px) 100vw, 62vw"
                  width={1536}
                  height={1024}
                  alt={PRODUCT.alt}
                  loading="lazy"
                />
                <figcaption>
                  <span>The white formula.</span>
                  <span>The built-in brush.</span>
                </figcaption>
              </figure>
              <figure className="diptych-person">
                <img
                  src="/images/editorial-portrait-cocoa.webp"
                  width={1122}
                  height={1402}
                  alt="NURRIE editorial portrait in warm light"
                  loading="lazy"
                />
                <figcaption>
                  Made for the way
                  <br />
                  you become yourself.
                </figcaption>
              </figure>
            </div>
            <div className="diptych-foot">
              <p>
                One double-ended design.
                <br />
                Both sides of your ritual.
              </p>
              <a className="text-link" href="#the-metamorphosis">
                Touch the formula <ArrowUpRight size={20} />
              </a>
              <span>
                Artistic product views.
                <br />
                Full details before launch.
              </span>
            </div>
          </section>

          <MetamorphosisStudio />

          <section className="ritual-editorial" id="the-ritual" aria-labelledby="ritual-heading">
            <div className="ritual-portrait" data-ritual={ritual}>
              <div className={`ritual-frame ritual-formula ${ritual === 0 ? "is-current" : ""}`} aria-hidden={ritual !== 0}>
                <img src="/images/ritual-swipe.webp" width={768} height={1024} alt="NURRIE white colour-changing foundation stick with rose-gold collar" loading="lazy" />
              </div>
              <div className={`ritual-frame ritual-brush ${ritual === 1 ? "is-current" : ""}`} aria-hidden={ritual !== 1}>
                <img src="/images/ritual-blend.webp" width={768} height={1024} alt="NURRIE built-in blending brush with rose-gold collar and turned-down branding" loading="lazy" />
              </div>
              <div className={`ritual-frame ritual-be ${ritual === 2 ? "is-current" : ""}`} aria-hidden={ritual !== 2}>
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
              </div>
              <div className="ritual-image-caption">
                <span>{ritual === 0 ? "White at first." : ritual === 1 ? "The other half of the ritual." : "Beauty that adapts to you."}</span>
              </div>
            </div>
            <div className="ritual-copy">
              <span className="section-eyebrow">The Ritual</span>
              <h2 id="ritual-heading">
                Your ritual.
                <br />
                Rewritten.
              </h2>
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
                      onClick={() => {
                        setRitual(index);
                        sensoryAudio.tabChime();
                      }}
                      onKeyDown={(event) => onRitualKey(event, index)}
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
                <div key={ritual} className="ritual-description" role="tabpanel" id={`ritual-panel-${ritual}`} aria-labelledby={`ritual-tab-${ritual}`} tabIndex={0}>
                  <p>{rituals[ritual].description}</p>
                  <span>{rituals[ritual].note}</span>
                </div>
              </div>
              <a className="text-link" href="#first-access">
                Be here for the beginning <ArrowUpRight size={20} />
              </a>
            </div>
          </section>

          <section className="faq" id="the-faq" aria-labelledby="faq-heading">
            <div className="faq-header">
              <span className="section-eyebrow">Transparency</span>
              <h2 id="faq-heading">
                Good questions.
                <br />
                Honest answers.
              </h2>
              <p className="faq-intro">
                NURRIE starts with white foundation that intuitively adapts to your skin tone upon application. 
                Everything you need to know ahead of our inaugural pre-launch release.
              </p>
              <div className="faq-concierge">
                <span className="concierge-tag">Priority Allocation</span>
                <p>Have questions regarding shade compatibility, formulation, or release timelines?</p>
                <a href="#first-access" className="text-link">
                  Join the pre-launch list <ArrowUpRight size={18} />
                </a>
              </div>
            </div>

            <div className="faq-list">
              {questions.map(([question, answer]) => (
                <details key={question} name="nurrie-faq">
                  <summary spellCheck={false}>
                    <span className="faq-question-text">{question}</span>
                    <span className="faq-icon-badge" aria-hidden="true">
                      <Plus className="plus" size={18} />
                      <Minus className="minus" size={18} />
                    </span>
                  </summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="first-access" id="first-access" aria-labelledby="access-heading">
            <div className="invitation-object" aria-hidden="true">
              <img src="/images/invitation-duo-centered.webp" width={1136} height={1024} alt="Both views of the NURRIE double-ended foundation stick standing side by side" loading="lazy" />
            </div>
            <div className="signup-copy">
              <span className="invitation-pill">Pre-Launch Edition</span>
              <h2 id="access-heading">
                Be here for
                <br />
                the beginning.
              </h2>
              <p>Be first to discover the NURRIE colour-changing foundation stick. Leave your email for launch news and priority batch allocation.</p>
              <ul className="invitation-perks">
                <li>
                  <span>01</span> First-run allocation notice before public release
                </li>
                <li>
                  <span>02</span> Complete shade-adaptation & formulation guide
                </li>
                <li>
                  <span>03</span> Private invitation to the first release
                </li>
              </ul>
            </div>
            <div className="signup-panel">
              <WaitlistForm />
            </div>
            <span className="signup-bottom">The first NURRIE release. Coming soon.</span>
          </section>
        </main>

        <footer className="site-footer">
          <div className="footer-top">
            <p>
              Made for the way
              <br />
              you become yourself.
            </p>
            <a className="text-link" href="/#top">
              Back to the beginning <ArrowUpRight size={20} />
            </a>
          </div>
          <a className="footer-wordmark" href="/#top" aria-label="NURRIE back to top">
            NURRIE
          </a>
          <div className="footer-bottom">
            <span>&copy; {new Date().getFullYear()} NURRIE</span>
            <span>Beauty, becoming.</span>
            <a href="/privacy">Privacy & your data</a>
          </div>
        </footer>
      </div>
    </>
  );
}
