"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { useRevealSlider } from "@/hooks/useRevealSlider";
import { ArrowUpRight, Check, MoveHorizontal, Pause, Play, RotateCcw } from "lucide-react";
import { sensoryAudio } from "./SensoryAudio";

type Shade = {
  id: string;
  num: string;
  name: string;
  tone: string;
  color: string;
  filter: string;
  tintBg: string;
};

const SHADES: Shade[] = [
  {
    id: "alabaster",
    num: "01",
    name: "Alabaster",
    tone: "Fair Neutral",
    color: "#f0dfd2",
    filter: "brightness(1.15) contrast(1.02) sepia(0.08) saturate(0.92)",
    tintBg: "radial-gradient(circle at 45% 42%, rgba(248, 235, 224, 0.55) 0%, rgba(235, 212, 195, 0.3) 50%, rgba(52, 35, 28, 0.25) 100%)",
  },
  {
    id: "ochre",
    num: "02",
    name: "Ochre",
    tone: "Medium Honey",
    color: "#c69774",
    filter: "brightness(1.02) contrast(1.05) sepia(0.18) saturate(1.14)",
    tintBg: "radial-gradient(circle at 45% 42%, rgba(215, 168, 128, 0.5) 0%, rgba(185, 135, 95, 0.3) 50%, rgba(52, 35, 28, 0.35) 100%)",
  },
  {
    id: "sienna",
    num: "03",
    name: "Sienna",
    tone: "Deep Amber",
    color: "#925b3e",
    filter: "brightness(0.92) contrast(1.09) sepia(0.26) saturate(1.24)",
    tintBg: "radial-gradient(circle at 45% 42%, rgba(165, 98, 62, 0.55) 0%, rgba(125, 70, 42, 0.35) 50%, rgba(45, 25, 18, 0.45) 100%)",
  },
  {
    id: "espresso",
    num: "04",
    name: "Espresso",
    tone: "Rich Cocoa",
    color: "#4d2f21",
    filter: "brightness(0.82) contrast(1.15) sepia(0.34) saturate(1.3)",
    tintBg: "radial-gradient(circle at 45% 42%, rgba(98, 54, 36, 0.6) 0%, rgba(68, 35, 22, 0.4) 50%, rgba(35, 18, 12, 0.55) 100%)",
  },
];

export default function MetamorphosisStudio() {
  const [shade, setShade] = useState<Shade>(SHADES[1]);
  const swatches = useRef<(HTMLButtonElement | null)[]>([]);
  const { viewportRef, whiteRef, whiteContentRef, dividerRef, handleRef, readoutRef, isPlaying, togglePlay, moveTo, stop, sliderEvents } = useRevealSlider();

  const handleShadeSelect = (next: Shade) => {
    stop();
    setShade(next);
    sensoryAudio.tabChime();
  };

  const handleShadeKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % SHADES.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index + SHADES.length - 1) % SHADES.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = SHADES.length - 1;
    else return;
    event.preventDefault();
    handleShadeSelect(SHADES[next]);
    swatches.current[next]?.focus();
  };

  return (
    <section className="metamorphosis-studio" id="the-metamorphosis" aria-labelledby="studio-heading">
      <div className="studio-header">
        <h2 id="studio-heading">
          White to begin.
          <br />
          Yours to finish.
        </h2>
        <p className="studio-intro">
          White on first contact. As you blend with the built-in brush, the formula intuitively adapts to your natural tone.
        </p>
      </div>

      <div className="studio-lens-card">
        <div className="lens-top-bar">
          <div className="lens-status">
            <span className="status-dot" style={{ backgroundColor: shade.color }} />
            <span className="status-text">
              {`${shade.num} ${shade.name} · ${shade.tone}`}
            </span>
          </div>

          <div className="lens-quick-actions">
            <button
              type="button"
              className={`lens-btn ${isPlaying ? "is-active" : ""}`}
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause metamorphosis" : "Auto-play metamorphosis"}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              <span>{isPlaying ? "Pause" : "Auto Blend"}</span>
            </button>
            <button
              type="button"
              className="lens-btn-icon"
              onClick={() => moveTo(50)}
              aria-label="Reset slider"
              title="Reset to 50%"
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </div>

        <div
          ref={viewportRef}
          className="split-lens-viewport"
          {...sliderEvents}
          role="slider"
          aria-label="Before and After Formula Metamorphosis"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={65}
          aria-valuetext="65% white formula, 35% blended view"
          aria-orientation="horizontal"
          aria-describedby="reveal-help reveal-keyboard-help reveal-caption"
          tabIndex={0}
        >
          {/* Static tone layers crossfade; filters are never animated while dragging. */}
          {SHADES.map((tone) => (
            <div
              key={tone.id}
              className={`lens-layer lens-layer-blended ${shade.id === tone.id ? "is-current" : ""}`}
              aria-hidden="true"
            >
              <img
                src="/images/editorial-portrait-cocoa.webp"
                alt=""
                className="lens-image"
                style={{ filter: tone.filter }}
                loading="lazy"
                decoding="async"
                draggable={false}
              />
              <div className="lens-tint-overlay" style={{ background: tone.tintBg }} />
              <div className="lens-watermark lens-watermark-right">
                <span className="watermark-tag">Blended view</span>
                <span className="watermark-title">{tone.name}</span>
                <span className="watermark-desc">{tone.tone}</span>
              </div>
            </div>
          ))}

          <div ref={whiteRef} className="lens-layer lens-layer-white" aria-hidden="true">
            <div ref={whiteContentRef} className="lens-white-content">
              <img
                src="/images/editorial-portrait-cocoa.webp"
                alt=""
                className="lens-image"
                loading="lazy"
                decoding="async"
                draggable={false}
              />
              <div className="white-formula-streak" />
              <div className="lens-watermark lens-watermark-left">
                <span className="watermark-tag">First touch</span>
                <span className="watermark-title">White Formula</span>
              </div>
            </div>
          </div>

          <div ref={dividerRef} className="split-divider-line" aria-hidden="true">
            <div ref={handleRef} className="divider-handle">
              <MoveHorizontal size={16} className="handle-arrows" />
              <span ref={readoutRef} className="handle-label">65%</span>
            </div>
          </div>

          <div className="lens-instruction-pill" id="reveal-help">
            <MoveHorizontal size={14} />
            <span>Slide to blend. Scroll to explore.</span>
          </div>
        </div>

        <div className="reveal-presets" role="group" aria-label="Compare formula views">
          <button type="button" onClick={() => moveTo(100)}>See white formula</button>
          <button type="button" onClick={() => moveTo(0)}>See blended view</button>
        </div>
        <span className="sr-only" id="reveal-keyboard-help">Use arrow keys to adjust, Home or End for either view, and Space to play or pause.</span>
        <p className="reveal-caption" id="reveal-caption">An illustration of the colour-changing concept. Not a shade match or product result.</p>

        <div className="studio-spectrum-bar">
          <div className="spectrum-bar-header">
            <div className="spectrum-title-col">
              <span className="spectrum-eyebrow">Adaptive Spectrum</span>
              <h3 className="spectrum-title">Explore the tones</h3>
            </div>
            <div className="quick-match-tabs" role="group" aria-label="Choose a tone depth">
              <button
                type="button"
                className={`quick-match-pill ${shade.id === "alabaster" ? "is-active" : ""}`}
                onClick={() => handleShadeSelect(SHADES[0])}
                aria-pressed={shade.id === "alabaster"}
              >
                Fair
              </button>
              <button
                type="button"
                className={`quick-match-pill ${shade.id === "ochre" ? "is-active" : ""}`}
                onClick={() => handleShadeSelect(SHADES[1])}
                aria-pressed={shade.id === "ochre"}
              >
                Medium
              </button>
              <button
                type="button"
                className={`quick-match-pill ${shade.id === "sienna" ? "is-active" : ""}`}
                onClick={() => handleShadeSelect(SHADES[2])}
                aria-pressed={shade.id === "sienna"}
              >
                Deep
              </button>
              <button
                type="button"
                className={`quick-match-pill ${shade.id === "espresso" ? "is-active" : ""}`}
                onClick={() => handleShadeSelect(SHADES[3])}
                aria-pressed={shade.id === "espresso"}
              >
                Rich
              </button>
            </div>
          </div>

          <div className="shade-swatch-strip" role="radiogroup" aria-label="Select tone">
            {SHADES.map((s, index) => (
              <button
                key={s.id}
                type="button"
                role="radio"
                aria-checked={shade.id === s.id}
                tabIndex={shade.id === s.id ? 0 : -1}
                ref={(element) => { swatches.current[index] = element; }}
                onKeyDown={(event) => handleShadeKey(event, index)}
                className={`shade-swatch-card ${shade.id === s.id ? "is-selected" : ""}`}
                onClick={() => handleShadeSelect(s)}
                style={{ touchAction: "manipulation" }}
              >
                <span className="swatch-bullet" style={{ backgroundColor: s.color }}>
                  {shade.id === s.id && <Check size={12} className="swatch-check" />}
                </span>
                <div className="swatch-meta">
                  <span className="swatch-name">{s.name}</span>
                  <span className="swatch-tone">{s.tone}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="studio-architecture">
        <div className="arch-header">
          <span className="section-eyebrow">The Instrument</span>
          <h3>One design. Both sides.</h3>
          <p>White colour-changing foundation on one end. A custom buffing brush on the other.</p>
        </div>

        <div className="arch-minimal-strip">
          <div className="arch-pillar">
            <span className="pillar-num">01</span>
            <h4>The Formula</h4>
            <p>Pure white squalane wax holding micro-pigments until blended.</p>
          </div>
          <div className="arch-pillar">
            <span className="pillar-num">02</span>
            <h4>The Axis</h4>
            <p>Solid rose-gold collar with tactile magnetic closures.</p>
          </div>
          <div className="arch-pillar">
            <span className="pillar-num">03</span>
            <h4>The Buffer</h4>
            <p>48,000 micro-filaments angled to buff without absorbing.</p>
          </div>
        </div>

        <div className="studio-foot-cta">
          <span>First allocation releasing soon.</span>
          <a href="#first-access" className="text-link">
            Join the pre-launch list <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
