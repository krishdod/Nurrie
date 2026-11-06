"use client";

import { useEffect, useRef, useState } from "react";

export default function LuxuryCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const badge = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(false);
  const [badgeText, setBadgeText] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const mouse = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    // Only enable on precise pointing devices (mouse / trackpad)
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };

      if (dot.current) {
        dot.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveStick = target.closest(".cover-object");
      const interactiveCanvas = target.closest(".lab-canvas-container, .swatch-canvas");
      const isClickable = target.closest("button, a, input, [role='button'], details");

      if (interactiveStick) {
        setBadgeText("DRAG TO TURN");
        setIsHovering(true);
      } else if (interactiveCanvas) {
        setBadgeText("SWIPE TO BLEND");
        setIsHovering(true);
      } else if (isClickable) {
        setBadgeText(null);
        setIsHovering(true);
      } else {
        setBadgeText(null);
        setIsHovering(false);
      }
    };

    const onMouseLeave = () => {
      setVisible(false);
    };

    const onMouseEnter = () => {
      setVisible(true);
    };

    // Smooth spring loop for the lagging ring / badge
    const loop = () => {
      const ease = 0.18;
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * ease;

      if (ring.current) {
        ring.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }
      if (badge.current) {
        badge.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    rafId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`luxury-cursor-layer ${isHovering ? "is-hovering" : ""} ${badgeText ? "has-badge" : ""}`} aria-hidden="true">
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className="cursor-ring" />
      {badgeText && (
        <div ref={badge} className="cursor-badge">
          <span>{badgeText}</span>
        </div>
      )}
    </div>
  );
}
