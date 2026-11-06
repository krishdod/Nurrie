"use client";

import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Layers, Pause, Play, RotateCw, Volume2, VolumeX, ZoomIn } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PRODUCT } from "@/lib/product";
import { useSensoryAudio } from "./SensoryAudio";

const CoverScene = lazy(() => import("./CoverScene"));

const chapters = [
  { name: "White", title: <>White.<br />Until you.</>, copy: "Meet the colour-changing foundation stick. White at first. Your skin tone as you blend." },
  { name: "Blend", title: <>One stick.<br />Both sides.</>, copy: "Swipe the white formula. Turn to the built-in brush. The change is in your hands." },
  { name: "You", title: <>Becomes<br />you.</>, copy: "As you apply and blend, the white foundation changes colour, adapting to your skin tone." },
];

function PhotoFallback() {
  return (
    <div className="cover-fallback">
      <img src={PRODUCT.fallback} alt={PRODUCT.alt} width={1024} height={683} />
    </div>
  );
}

export default function LivingCover() {
  const section = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const rotation = useRef(0);
  const refresh = useRef<() => void>(() => {});
  const pointer = useRef<{ id: number; startX: number; startY: number; startRot: number; captured: boolean } | null>(null);
  const sound = useSensoryAudio();
  const [phase, setPhase] = useState(0);
  const [turn, setTurn] = useState(0);
  const [macro, setMacro] = useState<"none" | "bullet" | "brush">("none");
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [active, setActive] = useState(true);
  const [uncapped, setUncapped] = useState(false);

  const update = useCallback((p: number) => {
    progress.current = p;
    refresh.current();
    if (section.current) {
      section.current.style.setProperty("--cover-progress", String(p));
      // Cinematic crossfade: pure ivory ground at Chapter 1 -> warm emergence at Chapter 2 -> radiant model at Chapter 3
      const portraitOpacity = p < 0.28 ? 0 : Math.min(1, Math.pow((p - 0.28) / 0.44, 1.3));
      section.current.style.setProperty("--portrait-opacity", String(portraitOpacity));
    }
    setPhase(p < 0.33 ? 0 : p < 0.68 ? 1 : 2);
  }, []);

  useEffect(() => {
    setMounted(true);
    gsap.registerPlugin(ScrollTrigger);
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const preference = () => setReduced(query.matches);
    preference();
    query.addEventListener("change", preference);

    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        ScrollTrigger.create({
          trigger: section.current,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => update(self.progress),
        });
      }, section);
      return () => context.revert();
    });

    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { threshold: 0 });
    if (section.current) observer.observe(section.current);

    return () => {
      media.revert();
      observer.disconnect();
      query.removeEventListener("change", preference);
    };
  }, [update]);

  const onReady = useCallback(() => setReady(true), []);
  const onUnavailable = useCallback(() => setReady(false), []);

  function choose(index: number) {
    update(index / 2);
    if (!section.current) return;
    const bounds = section.current.getBoundingClientRect();
    const maxScroll = bounds.height - window.innerHeight;
    if (maxScroll > 0) {
      window.scrollTo({
        top: window.scrollY + bounds.top + maxScroll * (index / 2),
        behavior: "smooth",
      });
    }
  }

  return (
    <section ref={section} className="living-cover" data-phase={phase} aria-label="White. Blend. You. The NURRIE foundation story">
      <div className="living-stage">
        <div className="cover-portrait" aria-hidden="true">
          <picture>
            <source media="(max-width: 768px)" srcSet="/images/editorial-portrait-cocoa.webp" />
            <img
              src="/images/campaign-portrait-wide-v5.webp"
              width={1672}
              height={941}
              alt=""
              decoding="async"
            />
          </picture>
        </div>

        <header className="living-nav">
          <a className="living-logo" href="/" aria-label="NURRIE home">
            NURRIE
          </a>
          <nav aria-label="Main navigation">
            <a href="#the-stick">The stick</a>
            <a href="#the-metamorphosis">Metamorphosis</a>
            <a href="#the-ritual">The ritual</a>
            <a href="#the-faq">FAQ</a>
          </nav>
          <div className="nav-actions">
            <button
              type="button"
              className={`nav-audio-btn ${sound.active ? "is-active" : ""}`}
              onClick={sound.toggle}
              aria-label={sound.active ? "Mute sensory soundscape" : "Enable sensory soundscape"}
              title="Toggle tactile soundscape"
            >
              {sound.active ? <Volume2 size={16} /> : <VolumeX size={16} />}
              <span>{sound.active ? "Sound: On" : "Sound: Off"}</span>
            </button>
            <a className="living-access" href="#first-access">
              First access <ArrowUpRight size={18} />
            </a>
          </div>
        </header>

        <div className="cover-chapters" role="group" aria-label="Choose a chapter">
          {chapters.map((chapter, index) => (
            <button key={chapter.name} type="button" aria-pressed={phase === index} onClick={() => choose(index)}>
              <span className="chapter-num">0{index + 1}</span>
              <span className="chapter-name">{chapter.name}</span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </button>
          ))}
        </div>

        <div
          className={`cover-object ${ready ? "is-ready" : ""}`}
          onPointerDown={(event) => {
            if (event.button !== 0) return;
            pointer.current = {
              id: event.pointerId,
              startX: event.clientX,
              startY: event.clientY,
              startRot: rotation.current,
              captured: false,
            };
          }}
          onPointerMove={(event) => {
            const p = pointer.current;
            if (!p || p.id !== event.pointerId) return;
            const dx = event.clientX - p.startX;
            const dy = event.clientY - p.startY;

            if (!p.captured) {
              if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 8) {
                pointer.current = null;
                return;
              }
              if (Math.abs(dx) > 8) {
                p.captured = true;
                try {
                  event.currentTarget.setPointerCapture(event.pointerId);
                } catch {
                  /* Optional pointer capture */
                }
              }
            }

            if (p.captured) {
              rotation.current = p.startRot + dx * 0.009;
              setTurn(rotation.current);
            }
          }}
          onPointerUp={(event) => {
            if (pointer.current?.captured) {
              try {
                event.currentTarget.releasePointerCapture(event.pointerId);
              } catch {
                /* Optional release */
              }
            }
            pointer.current = null;
          }}
          onPointerCancel={() => {
            pointer.current = null;
          }}
        >
          {mounted ? (
            <Suspense fallback={<PhotoFallback />}>
              <CoverScene
                progress={progress}
                rotation={rotation}
                refresh={refresh}
                phase={phase}
                turn={turn}
                macro={macro}
                uncapped={uncapped}
                paused={paused || reduced}
                active={active}
                onReady={onReady}
                onUnavailable={onUnavailable}
              />
            </Suspense>
          ) : (
            <PhotoFallback />
          )}
        </div>

        {macro !== "none" && (
          <div className="cover-macro-banner" aria-live="polite">
            <span className="macro-tag">3D Detail Inspection</span>
            <p className="macro-text">
              {macro === "bullet"
                ? "White Foundation Bullet • Pure satin wax, adapts intuitively upon blending"
                : "Built-In Blending Brush • Ultra-dense microfibers engineered for seamless finish"}
            </p>
            <button
              type="button"
              className="macro-exit-btn"
              onClick={() => {
                setMacro("none");
                sound.capClick();
              }}
            >
              Exit Macro
            </button>
          </div>
        )}

        <div className="cover-copy" aria-live="polite">
          <h1>{chapters[phase].title}</h1>
          <p>{chapters[phase].copy}</p>
        </div>

        <div className="cover-tools">
          <span className="tools-hint">
            {ready
              ? macro !== "none"
                ? "Macro inspection active"
                : uncapped
                ? "Both ends revealed in 3D"
                : "Drag stick to rotate"
              : "Double-ended stick"}
          </span>
          <button
            type="button"
            className={`tools-uncap-toggle ${uncapped ? "is-active" : ""}`}
            aria-label={uncapped ? "Snap magnetic cap closed" : "Uncap both ends in 3D"}
            title={uncapped ? "Snap cap closed" : "Uncap both ends in 3D"}
            disabled={!ready}
            onClick={() => {
              setUncapped(!uncapped);
              sound.capClick();
            }}
          >
            <Layers size={17} />
          </button>
          <button
            type="button"
            className={`tools-macro-toggle ${macro !== "none" ? "is-active" : ""}`}
            aria-label={macro === "none" ? "Inspect 3D macro detail" : "Cycle macro focus"}
            title="Inspect 3D details"
            disabled={!ready}
            onClick={() => {
              const next = macro === "none" ? "bullet" : macro === "bullet" ? "brush" : "none";
              setMacro(next);
              sound.capClick();
            }}
          >
            <ZoomIn size={17} />
          </button>
          <button
            type="button"
            aria-label="Turn the stick"
            disabled={!ready}
            onClick={() => {
              rotation.current += Math.PI / 2;
              setTurn(rotation.current);
              sound.capClick();
            }}
          >
            <RotateCw size={17} />
          </button>
          <button
            type="button"
            aria-label={reduced ? "Motion reduced" : paused ? "Play motion" : "Pause motion"}
            disabled={!ready || reduced}
            aria-pressed={paused || reduced}
            onClick={() => {
              setPaused(!paused);
              sound.tabChime();
            }}
          >
            {paused || reduced ? <Play size={16} /> : <Pause size={16} />}
          </button>
        </div>

        <div className="cover-edge">
          <span>Artistic 3D view. White formula. Rose gold. Built-in brush.</span>
          <a href="#the-stick">
            {phase === 2 ? "Meet the stick" : "Scroll to unfold"}
            <ArrowDown size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
