"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { ArrowUpRight, Check, MoveHorizontal, Pause, Play, RotateCcw } from "lucide-react";
import { sensoryAudio } from "./SensoryAudio";

type Shade = {
  id: string;
  num: string;
  name: string;
  tone: string;
  color: string;
  glow: string;
};

const SHADES: Shade[] = [
  { id: "alabaster", num: "01", name: "Alabaster", tone: "Fair Neutral", color: "#e8d8cb", glow: "rgba(232, 216, 203, 0.4)" },
  { id: "ochre", num: "02", name: "Ochre", tone: "Medium Honey", color: "#c69774", glow: "rgba(198, 151, 116, 0.45)" },
  { id: "sienna", num: "03", name: "Sienna", tone: "Deep Amber", color: "#925b3e", glow: "rgba(146, 91, 62, 0.45)" },
  { id: "espresso", num: "04", name: "Espresso", tone: "Rich Cocoa", color: "#4d2f21", glow: "rgba(77, 47, 33, 0.5)" },
];

export default function MetamorphosisStudio() {
  const [split, setSplit] = useState(52); // Percentage 0-100
  const [shade, setShade] = useState<Shade>(SHADES[1]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const autoPlayAnim = useRef<number | null>(null);
  const lastSoundTick = useRef<number>(50);

  const triggerAudioTick = useCallback((currentVal: number) => {
    if (Math.abs(currentVal - lastSoundTick.current) > 12) {
      sensoryAudio.brushSweep(0.35);
      lastSoundTick.current = currentVal;
    }
  }, []);

  const updateSplitFromPointer = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const relativeX = clientX - rect.left;
      const clampedPercent = Math.max(0, Math.min(100, (relativeX / rect.width) * 100));
      setSplit(Math.round(clampedPercent));
      triggerAudioTick(clampedPercent);
    },
    [triggerAudioTick]
  );

  const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    isDragging.current = true;
    if (isAutoPlaying) stopAutoPlay();
    e.currentTarget.setPointerCapture(e.pointerId);
    updateSplitFromPointer(e.clientX);
    sensoryAudio.capClick();
  };

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    updateSplitFromPointer(e.clientX);
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const startAutoPlay = () => {
    if (isAutoPlaying) {
      stopAutoPlay();
      return;
    }
    setIsAutoPlaying(true);
    sensoryAudio.tabChime();
    const startTime = performance.now();
    const cycleDuration = 3200;

    const loop = (now: number) => {
      const elapsed = now - startTime;
      const t = (elapsed % cycleDuration) / cycleDuration;
      const val = 50 + Math.sin(t * Math.PI * 2) * 38;
      setSplit(Math.round(val));
      triggerAudioTick(val);
      autoPlayAnim.current = requestAnimationFrame(loop);
    };

    autoPlayAnim.current = requestAnimationFrame(loop);
  };

  const stopAutoPlay = () => {
    if (autoPlayAnim.current) {
      cancelAnimationFrame(autoPlayAnim.current);
      autoPlayAnim.current = null;
    }
    setIsAutoPlaying(false);
  };

  useEffect(() => {
    return () => {
      if (autoPlayAnim.current) cancelAnimationFrame(autoPlayAnim.current);
    };
  }, []);

  const handleShadeSelect = (s: Shade) => {
    setShade(s);
    sensoryAudio.tabChime();
  };

  const handleReset = () => {
    stopAutoPlay();
    setSplit(50);
    sensoryAudio.capClick();
  };

  return (
    <section className="metamorphosis-studio" id="the-metamorphosis" aria-labelledby="studio-heading">
      <div className="studio-header">
        <span className="section-eyebrow">The Metamorphosis</span>
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
              {split < 25 ? "01 White Formula" : split > 75 ? "02 Skin Adapted" : `Blending • ${split}%`}
            </span>
          </div>

          <div className="lens-quick-actions">
            <button
              type="button"
              className={`lens-btn ${isAutoPlaying ? "is-active" : ""}`}
              onClick={startAutoPlay}
              aria-label={isAutoPlaying ? "Pause metamorphosis" : "Auto-play metamorphosis"}
            >
              {isAutoPlaying ? <Pause size={14} /> : <Play size={14} />}
              <span>{isAutoPlaying ? "Pause" : "Auto Blend"}</span>
            </button>
            <button
              type="button"
              className="lens-btn-icon"
              onClick={handleReset}
              aria-label="Reset slider"
              title="Reset to 50%"
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </div>

        <div
          ref={containerRef}
          className="split-lens-viewport"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          role="slider"
          aria-label="Before and After Formula Metamorphosis"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={split}
          tabIndex={0}
        >
          {/* Layer 1 (Underneath): Tone-Adapted Finish */}
          <div className="lens-layer lens-layer-blended">
            <img
              src="/images/editorial-portrait-cocoa.webp"
              alt="Model with blended finish"
              className="lens-image"
              loading="lazy"
            />
            <div
              className="lens-tint-overlay"
              style={{
                background: `radial-gradient(circle at 45% 42%, ${shade.glow} 0%, rgba(52, 35, 28, 0.4) 100%)`,
              }}
            />
            <div className="lens-watermark lens-watermark-right">
              <span className="watermark-tag">Finish</span>
              <span className="watermark-title">Skin-Adapted</span>
            </div>
          </div>

          {/* Layer 2 (Top, Clipped): Pristine White Formula */}
          <div
            className="lens-layer lens-layer-white"
            style={{
              clipPath: `polygon(0 0, ${split}% 0, ${split}% 100%, 0 100%)`,
            }}
          >
            <img
              src="/images/editorial-portrait-cocoa.webp"
              alt="Model with white formula"
              className="lens-image"
              loading="lazy"
            />
            <div className="white-formula-streak" />
            <div className="lens-watermark lens-watermark-left">
              <span className="watermark-tag">Touch</span>
              <span className="watermark-title">White Formula</span>
            </div>
          </div>

          <div className="split-divider-line" style={{ left: `${split}%` }} aria-hidden="true">
            <div className="divider-handle">
              <MoveHorizontal size={16} className="handle-arrows" />
              <span className="handle-label">{split}%</span>
            </div>
          </div>

          <div className="lens-instruction-pill">
            <MoveHorizontal size={14} />
            <span>Drag horizontally to reveal metamorphosis</span>
          </div>
        </div>

        <div className="studio-spectrum-bar">
          <div className="shade-swatch-strip" role="radiogroup" aria-label="Select tone">
            {SHADES.map((s) => (
              <button
                key={s.id}
                type="button"
                role="radio"
                aria-checked={shade.id === s.id}
                className={`shade-swatch-card ${shade.id === s.id ? "is-selected" : ""}`}
                onClick={() => handleShadeSelect(s)}
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