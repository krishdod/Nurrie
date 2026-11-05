"use client";

import { PRODUCT } from "@/lib/product";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, MoveHorizontal, RotateCcw } from "lucide-react";

/** A visual invitation to uncover the product, never a simulated skin result. */
export default function ProductReveal() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const brushImage = useRef<HTMLImageElement | null>(null);
  const down = useRef(false);
  const previous = useRef<{ x: number; y: number } | null>(null);
  const strokes = useRef(0);
  const [ready, setReady] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const coat = useCallback(() => {
    const surface = canvas.current;
    const context = surface?.getContext("2d");
    if (!surface || !context || !stage.current) return;
    const { width, height } = stage.current.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    surface.width = Math.round(width * ratio);
    surface.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.globalCompositeOperation = "source-over";
    context.fillStyle = "#e7ded2";
    context.fillRect(0, 0, width, height);
    if (brushImage.current?.naturalWidth) {
      const imageWidth = Math.max(width * .9, height * 1.3);
      context.drawImage(brushImage.current, (width - imageWidth) / 2, (height - imageWidth * 7 / 9) / 2, imageWidth, imageWidth * 7 / 9);
    }
    // A single opening gives the hand a place to continue the reveal.
    context.globalCompositeOperation = "destination-out";
    if (brushImage.current?.naturalWidth) {
      const narrow = width < 700;
      context.drawImage(brushImage.current, width * (narrow ? .12 : .3), height * .16, width * (narrow ? .76 : .4), height * .67);
    }
    strokes.current = 0;
  }, []);

  useEffect(() => {
    const image = new Image();
    brushImage.current = image;
    image.onload = () => { coat(); setReady(true); };
    image.onerror = () => setRevealed(true);
    image.src = "/images/cream-swipe.webp";
    const observer = new ResizeObserver(() => coat());
    if (stage.current) observer.observe(stage.current);
    return () => { observer.disconnect(); image.onload = null; image.onerror = null; };
  }, [coat]);

  function brush(x: number, y: number) {
    const context = canvas.current?.getContext("2d");
    if (!context || !stage.current || revealed) return;
    const bounds = stage.current.getBoundingClientRect();
    const point = { x: x - bounds.left, y: y - bounds.top };
    context.globalCompositeOperation = "destination-out";
    const from = previous.current ?? point;
    const distance = Math.hypot(point.x - from.x, point.y - from.y);
    const brushSize = bounds.width < 700 ? 155 : 220;
    const steps = Math.max(1, Math.ceil(distance / 14));
    const angle = distance > 0 ? Math.atan2(point.y - from.y, point.x - from.x) : 0;
    if (brushImage.current?.naturalWidth) for (let i = 0; i <= steps; i++) {
      context.save();
      context.translate(from.x + (point.x - from.x) * i / steps, from.y + (point.y - from.y) * i / steps);
      context.rotate(angle + Math.PI / 4);
      context.drawImage(brushImage.current, -brushSize / 2, -brushSize * .4, brushSize, brushSize * .8);
      context.restore();
    }
    if (previous.current) strokes.current += Math.hypot(point.x - previous.current.x, point.y - previous.current.y);
    previous.current = point;
    if (strokes.current > bounds.width * 2.8) setRevealed(true);
  }

  function moveCursor(x: number, y: number) {
    if (!stage.current || !cursor.current) return;
    const bounds = stage.current.getBoundingClientRect();
    cursor.current.style.transform = `translate3d(${x - bounds.left}px, ${y - bounds.top}px, 0)`;
  }

  return <section className="product-reveal" id="the-stick" aria-labelledby="reveal-heading">
    <div className="reveal-intro"><h2 id="reveal-heading">Starts white.<br/><em>Becomes you.</em></h2><div><p>Not the beginning you expected. Exactly where your story starts.</p><p>NURRIE’s white foundation changes colour as you apply and blend, adapting to your skin tone. With a built-in brush, the ritual is already in your hands.</p><a className="text-link" href="#the-change">Explore the stick in 3D <ArrowUpRight size={20}/></a></div></div>
    <div ref={stage} className={`reveal-stage ${revealed ? "is-revealed" : ""}`}>
      <img className="reveal-product-photo" src={PRODUCT.image} srcSet={PRODUCT.srcSet} sizes="100vw" width={1536} height={1024} alt="NURRIE stick: pure white foundation, pearl-white casing, rose-gold trim and built-in brush" loading="lazy" />
      <canvas ref={canvas} className={ready ? "is-ready" : ""} aria-hidden="true" onPointerEnter={event => { moveCursor(event.clientX, event.clientY); cursor.current?.classList.add("is-visible"); }} onPointerLeave={() => cursor.current?.classList.remove("is-visible")} onPointerDown={event => { if (event.button !== 0) return; down.current = true; previous.current = null; cursor.current?.classList.add("is-brushing"); event.currentTarget.setPointerCapture(event.pointerId); brush(event.clientX, event.clientY); }} onPointerMove={event => { moveCursor(event.clientX, event.clientY); if (down.current) brush(event.clientX, event.clientY); }} onPointerUp={() => { down.current = false; previous.current = null; cursor.current?.classList.remove("is-brushing"); }} onPointerCancel={() => { down.current = false; previous.current = null; cursor.current?.classList.remove("is-brushing"); }}/>
      <div ref={cursor} className="reveal-cursor" aria-hidden="true"><span><MoveHorizontal size={20}/><span>Hold & brush</span></span></div>
      <div className="reveal-instruction"><span>{revealed ? "One stick. Both sides of the ritual." : "A little touch changes everything."}</span><button type="button" onClick={() => { if (revealed) { coat(); setRevealed(false); } else setRevealed(true); }}>{revealed ? <><RotateCcw size={17}/>Try the reveal again</> : <><MoveHorizontal size={20}/>Reveal the stick</>}</button></div>
      <span className="reveal-gesture">{revealed ? "White foundation + blending brush" : "Swipe across the surface, or use the button"}</span>
    </div>
    <p className="reveal-caption">A visual story of transformation. Not a shade match or a product-result demonstration.</p>
  </section>;
}
