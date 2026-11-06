"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import {
  ArrowUpRight,
  Check,
  MoveHorizontal,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Sliders,
  Layers,
  ShieldCheck,
  Feather,
} from "lucide-react";
import { sensoryAudio } from "./SensoryAudio";

type Shade = {
  id: string;
  num: string;
  name: string;
  tone: string;
  color: string;
  glow: string;
  description: string;
  metrics: {
    adaptationSpeed: string;
    undertoneFamily: string;
    capsuleDensity: string;
  };
};

const SHADES: Shade[] = [
  {
    id: "alabaster",
    num: "01",
    name: "Alabaster",
    tone: "Fair Neutral",
    color: "#e8d8cb",
    glow: "rgba(232, 216, 203, 0.4)",
    description: "Formulated for porcelain to fair complexions with cool rose and soft neutral undertones.",
    metrics: {
      adaptationSpeed: "1.2 seconds",
      undertoneFamily: "Cool Rose & Neutral Pearl",
      capsuleDensity: "12 μm Encapsulation",
    },
  },
  {
    id: "ochre",
    num: "02",
    name: "Ochre",
    tone: "Medium Honey",
    color: "#c69774",
    glow: "rgba(198, 151, 116, 0.45)",
    description: "Formulated for light-medium to golden complexions with warm amber and subtle olive balance.",
    metrics: {
      adaptationSpeed: "1.4 seconds",
      undertoneFamily: "Golden Warm & Olive Balance",
      capsuleDensity: "12 μm Encapsulation",
    },
  },
  {
    id: "sienna",
    num: "03",
    name: "Sienna",
    tone: "Deep Amber",
    color: "#925b3e",
    glow: "rgba(146, 91, 62, 0.45)",
    description: "Formulated for tan to deep rich complexions with sunlit terracotta and caramel depth.",
    metrics: {
      adaptationSpeed: "1.3 seconds",
      undertoneFamily: "Terracotta & Sunlit Caramel",
      capsuleDensity: "12 μm Encapsulation",
    },
  },
  {
    id: "espresso",
    num: "04",
    name: "Espresso",
    tone: "Rich Cocoa",
    color: "#4d2f21",
    glow: "rgba(77, 47, 33, 0.5)",
    description: "Formulated for deep and rich espresso complexions with multidimensional cocoa undertones.",
    metrics: {
      adaptationSpeed: "1.5 seconds",
      undertoneFamily: "Pure Cocoa & Neutral Espresso",
      capsuleDensity: "12 μm Encapsulation",
    },
  },
];

type Hotspot = {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  detail: string;
  specs: string;
};

const HOTSPOTS: Hotspot[] = [
  {
    id: "bullet",
    num: "01",
    title: "White Metamorphic Bullet",
    subtitle: "Micro-encapsulated pigment suspension",
    detail: "Pure white on initial swipe. Color spheres remain hermetically sealed in squalane wax until buffed.",
    specs: "Zero air oxidation • 12μm cellulose capsules • Squalane carrier",
  },
  {
    id: "collar",
    num: "02",
    title: "Monolithic Rose Gold Axis",
    subtitle: "Aerospace aluminum & magnetic seal",
    detail: "Precision diamond-turned rose-gold collar with tactile dual-end magnetic snap closures.",
    specs: "Anodized 6063 alloy • Dual magnetic lock • Pocket ergonomic balance",
  },
  {
    id: "brush",
    num: "03",
    title: "48,000 Micro-Buffing Fibers",
    subtitle: "Angled kabuki blending head",
    detail: "Cruelty-free synthetic filaments cut at 15° to burst capsules and melt formula seamlessly into pores.",
    specs: "0.05mm ultra-fine bristles • Zero product absorption • Hypoallergenic",
  },
];

export default function MetamorphosisStudio() {
  const [split, setSplit] = useState(52); // Percentage from 0 to 100
  const [shade, setShade] = useState<Shade>(SHADES[1]);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot>(HOTSPOTS[0]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const autoPlayAnim = useRef<number | null>(null);
  const lastSoundTick = useRef<number>(50);

  // Sound feedback on significant split drag
  const triggerAudioTick = useCallback(
    (currentVal: number) => {
      if (Math.abs(currentVal - lastSoundTick.current) > 12) {
        sensoryAudio.brushSweep(0.35);
        lastSoundTick.current = currentVal;
      }
    },
    []
  );

  // Update split position from client X
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

  // Automated metamorphosis sweep
  const startAutoPlay = () => {
    if (isAutoPlaying) {
      stopAutoPlay();
      return;
    }
    setIsAutoPlaying(true);
    sensoryAudio.tabChime();
    const startTime = performance.now();
    const startVal = split;
    const cycleDuration = 3200; // ms for a full back-and-forth

    const loop = (now: number) => {
      const elapsed = now - startTime;
      const t = (elapsed % cycleDuration) / cycleDuration;
      // Smooth sine wave between 12% and 88%
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
      {/* Editorial Header */}
      <div className="studio-header">
        <div className="studio-eyebrow-wrap">
          <span className="studio-pill">
            <Sparkles size={14} /> 2026 Formulation Innovation
          </span>
          <span className="studio-sub-eyebrow">Interactive Metamorphosis Lens</span>
        </div>
        <h2 id="studio-heading">
          White to begin.
          <br />
          Yours to finish.
        </h2>
        <p className="studio-intro">
          Watch the physical transformation unfold. Our micro-encapsulated formula glides onto the skin in pure,
          pristine white. The instant the built-in buffing brush makes contact, the pigment spheres gently burst,
          intuitively melting into your exact natural tone.
        </p>
      </div>

      {/* Main Interactive Stage: Before/After Metamorphosis Lens */}
      <div className="studio-lens-card">
        {/* Top Control Bar */}
        <div className="lens-top-bar">
          <div className="lens-status">
            <span className="status-dot" style={{ backgroundColor: shade.color }} />
            <span className="status-text">
              {split < 20
                ? "State 01: Pristine White Formula (Intact)"
                : split > 80
                ? "State 02: Fully Adapted Velvet Finish"
                : `Metamorphosis in Progress • ${split}% Blended`}
            </span>
          </div>

          <div className="lens-quick-actions">
            <button
              type="button"
              className={`lens-btn ${isAutoPlaying ? "is-active" : ""}`}
              onClick={startAutoPlay}
              aria-label={isAutoPlaying ? "Pause metamorphosis demo" : "Auto-play metamorphosis demo"}
            >
              {isAutoPlaying ? <Pause size={15} /> : <Play size={15} />}
              <span>{isAutoPlaying ? "Pause Motion" : "Auto Metamorphose"}</span>
            </button>
            <button
              type="button"
              className="lens-btn-icon"
              onClick={handleReset}
              aria-label="Reset split slider to center"
              title="Reset to 50%"
            >
              <RotateCcw size={15} />
            </button>
          </div>
        </div>

        {/* The Split Canvas Frame */}
        <div
          ref={containerRef}
          className="split-lens-viewport"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          role="slider"
          aria-label="Interactive Before and After Formula Metamorphosis"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={split}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") {
              setSplit((prev) => Math.max(0, prev - 5));
              sensoryAudio.brushSweep(0.3);
            } else if (e.key === "ArrowRight") {
              setSplit((prev) => Math.min(100, prev + 5));
              sensoryAudio.brushSweep(0.3);
            }
          }}
        >
          {/* Layer 1 (Underneath): The Blended Tone-Adapted State */}
          <div className="lens-layer lens-layer-blended">
            <img
              src="/images/editorial-portrait-cocoa.webp"
              alt="Model with NURRIE foundation seamlessly adapted into natural skin tone"
              className="lens-image"
              loading="lazy"
            />
            {/* Tone-matched radiant finish overlay */}
            <div
              className="lens-tint-overlay"
              style={{
                background: `radial-gradient(circle at 45% 42%, ${shade.glow} 0%, rgba(52, 35, 28, 0.4) 100%)`,
              }}
            />
            <div className="lens-watermark lens-watermark-right">
              <span className="watermark-tag">State 02</span>
              <span className="watermark-title">Skin-Adapted Finish</span>
              <span className="watermark-desc">Luminous Dewy Velvet</span>
            </div>
          </div>

          {/* Layer 2 (Top, Clipped): The Pure White Formula State */}
          <div
            className="lens-layer lens-layer-white"
            style={{
              clipPath: `polygon(0 0, ${split}% 0, ${split}% 100%, 0 100%)`,
            }}
          >
            <img
              src="/images/editorial-portrait-cocoa.webp"
              alt="Model with pure white NURRIE formula swipe before blending"
              className="lens-image"
              loading="lazy"
            />
            {/* White formula streak simulation overlay over the cheekbone */}
            <div className="white-formula-streak" />
            <div className="lens-watermark lens-watermark-left">
              <span className="watermark-tag">State 01</span>
              <span className="watermark-title">White Formula Touch</span>
              <span className="watermark-desc">Micro-Capsules Intact</span>
            </div>
          </div>

          {/* Split Hairline Divider & Interactive Drag Pill */}
          <div
            className="split-divider-line"
            style={{ left: `${split}%` }}
            aria-hidden="true"
          >
            <div className="divider-handle">
              <MoveHorizontal size={18} className="handle-arrows" />
              <span className="handle-label">{split}%</span>
            </div>
          </div>

          {/* Touch instruction hint */}
          <div className="lens-instruction-pill">
            <MoveHorizontal size={14} />
            <span>Drag slider horizontally to reveal metamorphosis</span>
          </div>
        </div>

        {/* Tone Spectrum Selector Bar */}
        <div className="studio-spectrum-bar">
          <div className="spectrum-label-group">
            <span className="spectrum-title">Select Tone Profile</span>
            <span className="spectrum-subtitle">4 Intuitive Complexion Archetypes</span>
          </div>

          <div className="shade-swatch-strip" role="radiogroup" aria-label="Select tone archetype">
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
                  {shade.id === s.id && <Check size={13} className="swatch-check" />}
                </span>
                <div className="swatch-meta">
                  <div className="swatch-name-row">
                    <span className="swatch-num">{s.num}</span>
                    <span className="swatch-name">{s.name}</span>
                  </div>
                  <span className="swatch-tone">{s.tone}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Shade Telemetry Detail */}
        <div className="shade-telemetry-banner">
          <div className="telemetry-info">
            <span className="telemetry-tag">Complexion Analysis</span>
            <p className="telemetry-desc">{shade.description}</p>
          </div>
          <div className="telemetry-pills">
            <div className="pill-item">
              <span className="pill-label">Adaptation Rate</span>
              <span className="pill-val">{shade.metrics.adaptationSpeed}</span>
            </div>
            <div className="pill-item">
              <span className="pill-label">Undertone Harmony</span>
              <span className="pill-val">{shade.metrics.undertoneFamily}</span>
            </div>
            <div className="pill-item">
              <span className="pill-label">Capsule Technology</span>
              <span className="pill-val">{shade.metrics.capsuleDensity}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dual Precision Engineering: Architectural Dissection */}
      <div className="studio-architecture">
        <div className="arch-header">
          <span className="section-eyebrow">Dual Precision Engineering</span>
          <h3>Anatomy of a revolution.</h3>
          <p>
            Two complementary ends engineered into a single seamless travel monolith. No dirty fingers.
            No separate brushes cluttering your bag.
          </p>
        </div>

        <div className="arch-grid">
          {/* Visual of the Duo Stick */}
          <div className="arch-visual-card">
            <img
              src="/images/product-white-v7-1536.webp"
              alt="NURRIE double-ended foundation stick showing both the white formula end and the built-in blending brush"
              className="arch-duo-photo"
              loading="lazy"
            />
            <div className="arch-badge">
              <Layers size={14} /> Double-Ended Monolith
            </div>
          </div>

          {/* Interactive Architectural Hotspot Cards */}
          <div className="arch-hotspot-list">
            {HOTSPOTS.map((spot) => (
              <div
                key={spot.id}
                className={`arch-hotspot-card ${activeHotspot.id === spot.id ? "is-active" : ""}`}
                onClick={() => {
                  setActiveHotspot(spot);
                  sensoryAudio.capClick();
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setActiveHotspot(spot);
                    sensoryAudio.capClick();
                  }
                }}
                tabIndex={0}
                role="button"
                aria-pressed={activeHotspot.id === spot.id}
              >
                <div className="hotspot-card-top">
                  <span className="hotspot-num">{spot.num}</span>
                  <div className="hotspot-titles">
                    <h4>{spot.title}</h4>
                    <span className="hotspot-subtitle">{spot.subtitle}</span>
                  </div>
                </div>
                <p className="hotspot-detail">{spot.detail}</p>
                <div className="hotspot-specs-row">
                  <ShieldCheck size={14} />
                  <span>{spot.specs}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Formulation Purity Callout */}
        <div className="arch-purity-row">
          <div className="purity-item">
            <Feather size={20} className="purity-icon" />
            <div className="purity-copy">
              <strong>Zero Animal Byproducts</strong>
              <span>100% Vegan synthetic micro-fibers and plant squalane wax.</span>
            </div>
          </div>
          <div className="purity-item">
            <ShieldCheck size={20} className="purity-icon" />
            <div className="purity-copy">
              <strong>Non-Oxidizing Formula</strong>
              <span>White outer barrier shields color pigments from oxygen until applied.</span>
            </div>
          </div>
          <div className="purity-item">
            <Sparkles size={20} className="purity-icon" />
            <div className="purity-copy">
              <strong>Universal Complexion Match</strong>
              <span>Patented color spheres calibrated for cool, neutral, warm, and olive tones.</span>
            </div>
          </div>
        </div>

        <div className="studio-foot-cta">
          <span>Be among the first to hold the dual-ended design.</span>
          <a href="#first-access" className="text-link">
            Request priority allocation <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}