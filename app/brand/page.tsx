"use client";

import { useState } from "react";
import { ArrowLeft, Check, Sparkles, Box, ShieldCheck, Eye } from "lucide-react";

type Concept = {
  id: string;
  num: string;
  title: string;
  style: string;
  inspiration: string;
  svgPath: string;
  description: string;
  details: string[];
};

const CONCEPTS: Concept[] = [
  {
    id: "concept-1",
    num: "01",
    title: "The Metamorphic Ligature",
    style: "Runway Editorial & Symmetrical Axis",
    inspiration: "NARS by Fabien Baron · Yves Saint Laurent · Mugler",
    svgPath: "/brand/concept-1-ligature.svg",
    description:
      "The twin 'R's in the center of NU-RR-IE are interlocked into a continuous sculptured ligature. As you look across the word, the letterforms seamlessly transition from foundation to buffer, symbolizing the white-to-skin tone transformation.",
    details: [
      "Center intertwined 'RR' creates an unmistakable, copyrightable brand signature",
      "Balances high-fashion drama with classical editorial weight",
      "Laser-etched along the circumference of the rose-gold collar",
    ],
  },
  {
    id: "concept-2",
    num: "02",
    title: "The Architectural Modernist",
    style: "Brutalist Quiet Luxury & Wide Geometry",
    inspiration: "The Row · Céline by Phoebe Philo · Gentle Monster",
    svgPath: "/brand/concept-2-architectural.svg",
    description:
      "Ultra-wide typographic tracking with razor-sharp geometric cuts and zero decorative noise. Carries the quiet, intimidating confidence of a €2,000 cashmere coat or a museum-grade design object. It never screams; it commands.",
    details: [
      "Generous letter-spacing gives an expansive, ultra-expensive presence",
      "Flat geometric horizontal planes echo the flat-top magnetic cap",
      "Hot-stamped in matte rose-gold foil onto uncoated textured boxes",
    ],
  },
  {
    id: "concept-3",
    num: "03",
    title: "The Tactile Organic ('nurrie')",
    style: "Contemporary Cult Luxury & Butter Skin",
    inspiration: "Rhode by Hailey Bieber · Glossier · Merit Beauté",
    svgPath: "/brand/concept-3-tactile-lowercase.svg",
    description:
      "Soft, approachable, and sculptural. Built on a hidden geometric harmony: the letter 'n' and 'u' are rotational reflections of each other, while the twin 'r's form a smooth organic wave. The dot on the 'i' is rendered in solid rose gold.",
    details: [
      "Feels like butter, cream, and human skin to the eye",
      "Geometric inversion (n ↔ u) creates subliminal rhythm",
      "Debossed directly into the matte silk-touch exterior casing",
    ],
  },
];

export default function BrandIdentityLab() {
  const [activeConcept, setActiveConcept] = useState<Concept>(CONCEPTS[0]);
  const [ground, setGround] = useState<"ivory" | "cocoa" | "rosegold">("ivory");
  const [effect, setEffect] = useState<"flat" | "deboss" | "foil">("flat");

  return (
    <div className={`brand-lab-page ground-${ground} effect-${effect}`}>
      <header className="brand-lab-nav">
        <a href="/" className="lab-back-link">
          <ArrowLeft size={16} /> Back to Live Experience
        </a>
        <div className="lab-meta-tag">
          <Sparkles size={13} /> NURRIE Haute-Beauté Identity Studio
        </div>
      </header>

      <main className="brand-lab-main">
        <div className="brand-lab-header">
          <span className="lab-eyebrow">Visual Architecture System</span>
          <h1>Why ordinary logos fail. And what makes NURRIE iconic.</h1>
          <p className="lab-intro">
            Standard brands stick a generic serif font next to an icon. Luxury houses—from Hermès to NARS and
            The Row—build custom typographic sculptures where the letterforms themselves embody the physical instrument.
          </p>
        </div>

        {/* Concept Switcher Tabs */}
        <div className="concept-selector-grid" role="tablist">
          {CONCEPTS.map((c) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={activeConcept.id === c.id}
              className={`concept-tab-card ${activeConcept.id === c.id ? "is-active" : ""}`}
              onClick={() => setActiveConcept(c)}
            >
              <div className="tab-top">
                <span className="tab-num">{c.num}</span>
                <span className="tab-style">{c.style}</span>
              </div>
              <h2 className="tab-title">{c.title}</h2>
              <span className="tab-inspire">Inspired by {c.inspiration}</span>
            </button>
          ))}
        </div>

        {/* Showcase Theater */}
        <div className="showcase-theater">
          {/* Controls Bar */}
          <div className="theater-controls-bar">
            <div className="control-group">
              <span className="control-label">Material Background</span>
              <div className="control-pills">
                <button
                  type="button"
                  className={`pill-btn ${ground === "ivory" ? "is-selected" : ""}`}
                  onClick={() => setGround("ivory")}
                >
                  Silk Ivory
                </button>
                <button
                  type="button"
                  className={`pill-btn ${ground === "cocoa" ? "is-selected" : ""}`}
                  onClick={() => setGround("cocoa")}
                >
                  Noir Cocoa
                </button>
                <button
                  type="button"
                  className={`pill-btn ${ground === "rosegold" ? "is-selected" : ""}`}
                  onClick={() => setGround("rosegold")}
                >
                  Rose Gold
                </button>
              </div>
            </div>

            <div className="control-group">
              <span className="control-label">Physical Treatment</span>
              <div className="control-pills">
                <button
                  type="button"
                  className={`pill-btn ${effect === "flat" ? "is-selected" : ""}`}
                  onClick={() => setEffect("flat")}
                >
                  Vector Pure
                </button>
                <button
                  type="button"
                  className={`pill-btn ${effect === "foil" ? "is-selected" : ""}`}
                  onClick={() => setEffect("foil")}
                >
                  Metallic Hot Foil
                </button>
                <button
                  type="button"
                  className={`pill-btn ${effect === "deboss" ? "is-selected" : ""}`}
                  onClick={() => setEffect("deboss")}
                >
                  Carton Deboss
                </button>
              </div>
            </div>
          </div>

          {/* Master Viewport */}
          <div className="theater-stage">
            <div className="stage-artwork-wrap">
              <img
                src={activeConcept.svgPath}
                alt={activeConcept.title}
                className="stage-vector"
              />
            </div>
          </div>

          {/* Concept Intellect & Production Specs */}
          <div className="concept-specs-row">
            <div className="spec-story">
              <h3>Design Rationale</h3>
              <p>{activeConcept.description}</p>
            </div>
            <div className="spec-features">
              <h3>Production & Packaging Application</h3>
              <ul>
                {activeConcept.details.map((item, idx) => (
                  <li key={idx}>
                    <Check size={14} className="check-icon" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Real-World Context Mockup Matrix */}
        <section className="mockup-matrix-section">
          <div className="matrix-heading">
            <span className="lab-eyebrow">Physical Applications</span>
            <h2>Tested across every luxury touchpoint.</h2>
          </div>

          <div className="matrix-cards-grid">
            <div className="matrix-card">
              <div className="card-tag">Touchpoint 01</div>
              <div className="card-visual visual-stick">
                <div className="simulated-stick-collar">
                  <span className="collar-rim" />
                  <span className="collar-engraving">{activeConcept.id === "concept-3" ? "nurrie" : "NURRIE"}</span>
                  <span className="collar-rim" />
                </div>
              </div>
              <h4>Laser Engraved Barrel</h4>
              <p>Subtle 0.2mm mechanical laser etch along the solid rose-gold central collar.</p>
            </div>

            <div className="matrix-card">
              <div className="card-tag">Touchpoint 02</div>
              <div className="card-visual visual-carton">
                <div className="simulated-box-top">
                  <span className="box-deboss">{activeConcept.id === "concept-3" ? "nurrie" : "NURRIE"}</span>
                </div>
              </div>
              <h4>Rigid Ivory Gift Box</h4>
              <p>Blind-debossed into heavy 380gsm FSC-certified linen-textured cardstock.</p>
            </div>

            <div className="matrix-card">
              <div className="card-tag">Touchpoint 03</div>
              <div className="card-visual visual-pouch">
                <div className="simulated-velvet">
                  <span className="pouch-foil">{activeConcept.id === "concept-3" ? "nurrie" : "NURRIE"}</span>
                </div>
              </div>
              <h4>Velvet Travel Pouch</h4>
              <p>Deep espresso velvet with semi-matte rose-gold hot stamp foil.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
