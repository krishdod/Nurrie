"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { ArrowUpRight, Check, MoveHorizontal, RotateCcw, Sparkles, Wand2 } from "lucide-react";
import { sensoryAudio } from "./SensoryAudio";

type Shade = {
  id: string;
  name: string;
  tone: string;
  color: string;
  bgLight: string;
  undertone: string;
};

const SHADES: Shade[] = [
  { id: "01", name: "Alabaster", tone: "Fair Neutral", color: "#e8d8cb", bgLight: "#f4ece5", undertone: "Cool ivory with soft rose undertone" },
  { id: "02", name: "Ochre", tone: "Medium Honey", color: "#c69774", bgLight: "#e5ccb8", undertone: "Warm golden with neutral olive balance" },
  { id: "03", name: "Sienna", tone: "Deep Amber", color: "#925b3e", bgLight: "#c89b80", undertone: "Rich warm terracotta and caramel undertone" },
  { id: "04", name: "Espresso", tone: "Rich Cocoa", color: "#4d2f21", bgLight: "#845e4c", undertone: "Deep espresso with neutral espresso depth" },
];

export default function MetamorphosisLab() {
  const [shade, setShade] = useState<Shade>(SHADES[1]);
  const [blend, setBlend] = useState(0); // 0 (pure white) to 1 (fully skin adapted)
  const [isBlending, setIsBlending] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const strokes = useRef<Array<{ x: number; y: number; r: number; pressure: number }>>([]);
  const animFrame = useRef<number>(0);

  // Initial demo ribbon strokes for immediate visual delight
  const initDefaultStrokes = useCallback((width: number, height: number) => {
    const list: Array<{ x: number; y: number; r: number; pressure: number }> = [];
    const count = 45;
    const startX = width * 0.18;
    const endX = width * 0.82;
    const centerY = height * 0.5;

    for (let i = 0; i < count; i++) {
      const t = i / (count - 1);
      const x = startX + (endX - startX) * t;
      const y = centerY + Math.sin(t * Math.PI * 1.5) * (height * 0.14) + Math.cos(t * Math.PI * 4) * 6;
      const pressure = Math.sin(t * Math.PI) * 0.4 + 0.6;
      list.push({ x, y, r: 28 * pressure, pressure });
    }
    strokes.current = list;
  }, []);

  // Render canvas with smooth cream-to-skin pigment metamorphosis
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width / (window.devicePixelRatio || 1);
    const height = canvas.height / (window.devicePixelRatio || 1);
    const dpr = window.devicePixelRatio || 1;

    ctx.save();
    ctx.scale(dpr, dpr);

    // 1. Organic skin substrate background
    const bgGrad = ctx.createRadialGradient(width * 0.5, height * 0.45, 10, width * 0.5, height * 0.5, width * 0.65);
    bgGrad.addColorStop(0, shade.bgLight);
    bgGrad.addColorStop(1, "#34231c");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Subtle skin grain texture
    ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
    for (let i = 0; i < 200; i++) {
      const sx = (i * 137.5) % width;
      const sy = (i * 93.3) % height;
      ctx.fillRect(sx, sy, 1.5, 1.5);
    }

    // 2. Render foundation ribbon strokes
    const pts = strokes.current;
    if (pts.length > 1) {
      // Color interpolation: pure white (#ffffff) -> target skin tone (shade.color)
      const targetRgb = hexToRgb(shade.color);
      const whiteRgb = { r: 255, g: 255, b: 255 };

      const currR = Math.round(whiteRgb.r + (targetRgb.r - whiteRgb.r) * blend);
      const currG = Math.round(whiteRgb.g + (targetRgb.g - whiteRgb.g) * blend);
      const currB = Math.round(whiteRgb.b + (targetRgb.b - whiteRgb.b) * blend);
      const strokeColor = `rgb(${currR}, ${currG}, ${currB})`;

      // Outer soft blend halo
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        const rad = p.r * (1 + blend * 0.45);
        const halo = ctx.createRadialGradient(p.x, p.y, rad * 0.2, p.x, p.y, rad);
        halo.addColorStop(0, `rgba(${currR}, ${currG}, ${currB}, ${0.85 - blend * 0.15})`);
        halo.addColorStop(0.7, `rgba(${currR}, ${currG}, ${currB}, ${0.45 * (1 - blend * 0.3)})`);
        halo.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
        ctx.fill();
      }

      // Specular cosmetic wax sheen (stronger when white, softens to dewy skin finish as blended)
      if (blend < 0.85) {
        ctx.lineWidth = 14 * (1 - blend * 0.6);
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.45 * (1 - blend)})`;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.beginPath();
        ctx.moveTo(pts[0].x - 2, pts[0].y - 3);
        for (let i = 1; i < pts.length; i++) {
          ctx.lineTo(pts[i].x - 2, pts[i].y - 3);
        }
        ctx.stroke();
      }

      // Micro-pigment bursts indicator particles (visible during the active blend transition)
      if (blend > 0.15 && blend < 0.85) {
        ctx.fillStyle = `rgba(${targetRgb.r}, ${targetRgb.g}, ${targetRgb.b}, 0.75)`;
        for (let i = 0; i < pts.length; i += 3) {
          const p = pts[i];
          const angle = i * 2.4;
          const dist = p.r * 0.8 * blend;
          const px = p.x + Math.cos(angle) * dist;
          const py = p.y + Math.sin(angle) * dist;
          ctx.beginPath();
          ctx.arc(px, py, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    ctx.restore();
  }, [shade, blend]);

  // Canvas resize setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    initDefaultStrokes(rect.width, rect.height);
    renderCanvas();

    const onResize = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
      initDefaultStrokes(r.width, r.height);
      renderCanvas();
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [initDefaultStrokes, renderCanvas]);

  useEffect(() => {
    renderCanvas();
  }, [blend, shade, renderCanvas]);

  // Interactive drawing handlers
  const handlePointerDown = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    strokes.current = [{ x, y, r: 24, pressure: 0.8 }];
    sensoryAudio.brushSweep(0.6);
    renderCanvas();
  };

  const handlePointerMove = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const last = strokes.current[strokes.current.length - 1];
    if (last && Math.hypot(x - last.x, y - last.y) < 6) return;

    strokes.current.push({ x, y, r: 24, pressure: 0.8 });
    if (strokes.current.length % 5 === 0) sensoryAudio.brushSweep(0.4);
    renderCanvas();
  };

  const handlePointerUp = () => {
    isDrawing.current = false;
  };

  // Automated luxury blend animation
  const triggerAutoBlend = () => {
    if (isBlending) return;
    setIsBlending(true);
    sensoryAudio.capClick();
    const start = performance.now();
    const initial = blend;
    const target = blend > 0.5 ? 0 : 1;
    const duration = 1200;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / duration);
      // Smooth cubic in-out curve
      const eased = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      setBlend(initial + (target - initial) * eased);

      if (progress % 0.25 < 0.05) sensoryAudio.brushSweep(0.5);

      if (progress < 1) {
        animFrame.current = requestAnimationFrame(tick);
      } else {
        setIsBlending(false);
      }
    };
    animFrame.current = requestAnimationFrame(tick);
  };

  const handleShadeSelect = (s: Shade) => {
    setShade(s);
    sensoryAudio.tabChime();
  };

  const handleReset = () => {
    setBlend(0);
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      initDefaultStrokes(rect.width, rect.height);
      renderCanvas();
    }
    sensoryAudio.capClick();
  };

  return (
    <section className="metamorphosis-lab" id="the-metamorphosis" aria-labelledby="lab-heading">
      <div className="lab-header">
        <span className="section-eyebrow">Interactive Formulation Lab</span>
        <h2 id="lab-heading">
          Starts white.
          <br />
          Becomes you.
        </h2>
        <p className="lab-intro">
          Experience the physical metamorphosis in real-time. Pure white on first contact, 
          the micro-encapsulated formula intuitively bursts and adapts to your exact skin tone upon blending.
        </p>
      </div>

      <div className="lab-stage">
        {/* Left Column: Interactive Formulation Controls */}
        <div className="lab-controls">
          <div className="control-group">
            <span className="group-label">Select Skin Tone Spectrum</span>
            <div className="shade-chips" role="radiogroup" aria-label="Choose skin tone spectrum">
              {SHADES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  role="radio"
                  aria-checked={shade.id === s.id}
                  className={`shade-chip ${shade.id === s.id ? "is-active" : ""}`}
                  onClick={() => handleShadeSelect(s)}
                >
                  <span className="chip-swatch" style={{ backgroundColor: s.color }}>
                    {shade.id === s.id && <Check size={14} className="chip-check" />}
                  </span>
                  <div className="chip-copy">
                    <span className="chip-name">{s.name}</span>
                    <span className="chip-tone">{s.tone}</span>
                  </div>
                </button>
              ))}
            </div>
            <p className="undertone-hint">{shade.undertone}</p>
          </div>

          <div className="control-group">
            <div className="blend-slider-header">
              <span className="group-label">Formula Blend State</span>
              <span className="blend-percent">{Math.round(blend * 100)}% Adapted</span>
            </div>
            <div className="slider-track-wrap">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={blend}
                onChange={(e) => {
                  setBlend(parseFloat(e.target.value));
                  if (Math.random() < 0.2) sensoryAudio.brushSweep(0.3);
                }}
                className="blend-slider"
                aria-label="Adjust formula blend level from white to skin adapted"
              />
              <div className="slider-endpoints">
                <span>01 White Formula</span>
                <span>02 Intuitively Blended</span>
              </div>
            </div>
          </div>

          <div className="lab-actions">
            <button
              type="button"
              className="lab-button lab-button-blend"
              onClick={triggerAutoBlend}
              disabled={isBlending}
            >
              <Wand2 size={17} />
              <span>{blend > 0.5 ? "Reset to White Formula" : "Blend with Built-in Brush"}</span>
            </button>
            <button
              type="button"
              className="lab-button lab-button-reset"
              onClick={handleReset}
              aria-label="Reset swatch canvas"
            >
              <RotateCcw size={16} />
            </button>
          </div>

          <div className="telemetry-card">
            <div className="telemetry-row">
              <span className="telemetry-label">Pigment Status</span>
              <span className="telemetry-value">
                {blend < 0.15 ? "Pure White Satin" : blend < 0.85 ? "Micro-Pigments Bursting" : "Fully Tone-Adapted"}
              </span>
            </div>
            <div className="telemetry-row">
              <span className="telemetry-label">Applicator End</span>
              <span className="telemetry-value">{blend < 0.35 ? "White Foundation Bullet" : "Built-In Precision Brush"}</span>
            </div>
            <div className="telemetry-row">
              <span className="telemetry-label">Finish</span>
              <span className="telemetry-value">Dewy Luminous Velvet</span>
            </div>
          </div>
        </div>

        {/* Right Column: Swatch Canvas & Drawing Surface */}
        <div className="lab-canvas-container">
          <canvas
            ref={canvasRef}
            className="swatch-canvas"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          />
          <div className="canvas-instruction-pill" aria-hidden="true">
            <MoveHorizontal size={16} />
            <span>Swipe across canvas to draw stroke &bull; Adjust slider to blend</span>
          </div>
          <div className="canvas-status-badge">
            <Sparkles size={14} />
            <span>Live Metamorphosis Simulation</span>
          </div>
        </div>
      </div>

      <div className="lab-footer-note">
        <span>Artistic formulation demonstration. Designed for intuitive adaptation to diverse natural skin undertones.</span>
        <a href="#the-ritual" className="text-link">
          Explore the three-step ritual <ArrowUpRight size={18} />
        </a>
      </div>
    </section>
  );
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const clean = hex.replace("#", "");
  const num = parseInt(clean, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}
