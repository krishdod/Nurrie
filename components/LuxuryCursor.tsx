"use client";

import { useEffect, useRef } from "react";

export default function LuxuryCursor() {
  const layer = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const badge = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = layer.current;
    if (!root) return;
    const precise = matchMedia("(hover: hover) and (pointer: fine) and (min-width: 769px)");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const target = { x: 0, y: 0 };
    const position = { x: 0, y: 0 };
    let frame: number | null = null;
    let lastTime = 0;
    let visible = false;

    const hide = () => {
      root.style.opacity = "0";
      visible = false;
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      lastTime = 0;
    };

    const paint = (now: number) => {
      frame = null;
      const delta = lastTime ? Math.min(now - lastTime, 50) : 16;
      lastTime = now;
      const ease = 1 - Math.exp(-delta / 55);
      position.x += (target.x - position.x) * ease;
      position.y += (target.y - position.y) * ease;
      if (dot.current) dot.current.style.transform = `translate3d(${target.x}px,${target.y}px,0)`;
      const transform = `translate3d(${position.x}px,${position.y}px,0)`;
      if (ring.current) ring.current.style.transform = transform;
      if (badge.current) badge.current.style.transform = transform;
      // Once settled, no animation work runs until the pointer moves again.
      if (Math.hypot(target.x - position.x, target.y - position.y) > 0.1) {
        frame = requestAnimationFrame(paint);
      } else lastTime = 0;
    };

    const move = (event: PointerEvent) => {
      const element = event.target instanceof Element ? event.target : null;
      if (!precise.matches || reduced.matches || event.pointerType !== "mouse" || event.buttons ||
          element?.closest(".split-lens-viewport")) {
        hide();
        return;
      }
      target.x = event.clientX;
      target.y = event.clientY;
      if (!visible) {
        position.x = target.x;
        position.y = target.y;
        visible = true;
        root.style.opacity = "1";
      }
      const overStick = !!element?.closest(".cover-object");
      root.classList.toggle("has-badge", overStick);
      root.classList.toggle("is-hovering", overStick || !!element?.closest("button, a, input, [role='button'], details"));
      if (frame === null) frame = requestAnimationFrame(paint);
    };

    const visibility = () => { if (document.hidden) hide(); };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", hide, { passive: true });
    window.addEventListener("blur", hide);
    document.addEventListener("pointerleave", hide);
    document.addEventListener("visibilitychange", visibility);
    precise.addEventListener("change", hide);
    reduced.addEventListener("change", hide);
    return () => {
      hide();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", hide);
      window.removeEventListener("blur", hide);
      document.removeEventListener("pointerleave", hide);
      document.removeEventListener("visibilitychange", visibility);
      precise.removeEventListener("change", hide);
      reduced.removeEventListener("change", hide);
    };
  }, []);

  return (
    <div ref={layer} className="luxury-cursor-layer" style={{ opacity: 0 }} aria-hidden="true">
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className="cursor-ring" />
      <div ref={badge} className="cursor-badge"><span>DRAG TO TURN</span></div>
    </div>
  );
}
