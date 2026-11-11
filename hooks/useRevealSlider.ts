"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";

const INITIAL = 65;
const clamp = (value: number) => Math.max(0, Math.min(100, value));
type Motion = { from: number; to: number; start: number; duration: number; repeat: boolean };
type Gesture = { id: number; x: number; y: number; left: number; width: number; offset: number; active: boolean };

/** One animation clock owns the reveal. Pointer events never render the React tree. */
export function useRevealSlider() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const whiteRef = useRef<HTMLDivElement>(null);
  const whiteContentRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const readoutRef = useRef<HTMLSpanElement>(null);
  const position = useRef(INITIAL);
  const target = useRef(INITIAL);
  const frame = useRef<number | null>(null);
  const motion = useRef<Motion | null>(null);
  const gesture = useRef<Gesture | null>(null);
  const width = useRef(1);
  const reduced = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const paint = useCallback((value: number) => {
    const next = clamp(value);
    position.current = next;
    // Opposing transforms move the crop while keeping the photograph perfectly still.
    if (whiteRef.current) whiteRef.current.style.transform = `translate3d(${next - 100}%,0,0)`;
    if (whiteContentRef.current) whiteContentRef.current.style.transform = `translate3d(${100 - next}%,0,0)`;
    if (dividerRef.current) dividerRef.current.style.transform = `translate3d(${next}%,0,0)`;
    const x = width.current * next / 100;
    const inset = Math.min(42, width.current / 2);
    const offset = Math.max(inset, Math.min(width.current - inset, x)) - x;
    handleRef.current?.style.setProperty("--handle-offset", `${offset}px`);
    const rounded = Math.round(next);
    if (viewportRef.current?.getAttribute("aria-valuenow") !== String(rounded)) {
      viewportRef.current?.setAttribute("aria-valuenow", String(rounded));
      viewportRef.current?.setAttribute("aria-valuetext", `${rounded}% white formula, ${100 - rounded}% blended view`);
      if (readoutRef.current) readoutRef.current.textContent = `${rounded}%`;
    }
  }, []);

  const tick = useCallback(function tick(now: number) {
    frame.current = null;
    const current = motion.current;
    if (!current) {
      paint(target.current);
      return;
    }
    const t = Math.min(1, (now - current.start) / current.duration);
    const eased = current.repeat ? (1 - Math.cos(Math.PI * t)) / 2 : 1 - Math.pow(1 - t, 3);
    paint(current.from + (current.to - current.from) * eased);
    if (t === 1) {
      if (!current.repeat) {
        motion.current = null;
        return;
      }
      motion.current = { from: current.to, to: current.to === 12 ? 88 : 12, start: now, duration: 3000, repeat: true };
    }
    frame.current = requestAnimationFrame(tick);
  }, [paint]);

  const stop = useCallback(() => {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;
    motion.current = null;
    target.current = position.current;
    setIsPlaying(false);
  }, []);

  const moveTo = useCallback((value: number) => {
    stop();
    target.current = clamp(value);
    if (reduced.current) {
      paint(target.current);
      return;
    }
    motion.current = { from: position.current, to: target.current, start: performance.now(), duration: 320, repeat: false };
    frame.current = requestAnimationFrame(tick);
  }, [paint, stop, tick]);

  const togglePlay = useCallback(() => {
    const wasPlaying = motion.current?.repeat;
    stop();
    if (wasPlaying) return;
    if (reduced.current) {
      paint(position.current >= 50 ? 12 : 88);
      return;
    }
    const to = position.current >= 50 ? 12 : 88;
    motion.current = { from: position.current, to, start: performance.now(), duration: Math.max(1200, Math.abs(to - position.current) / 76 * 3000), repeat: true };
    setIsPlaying(true);
    frame.current = requestAnimationFrame(tick);
  }, [paint, stop, tick]);

  const updatePointer = useCallback((clientX: number) => {
    const current = gesture.current;
    if (!current) return;
    target.current = clamp((clientX - current.left + current.offset) / current.width * 100);
    if (frame.current === null) frame.current = requestAnimationFrame(tick);
  }, [tick]);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary || event.button !== 0) return;
    stop();
    const rect = event.currentTarget.getBoundingClientRect();
    width.current = rect.width;
    const handleBounds = handleRef.current?.getBoundingClientRect();
    const onHandle = handleBounds && event.clientX >= handleBounds.left && event.clientX <= handleBounds.right &&
      event.clientY >= handleBounds.top && event.clientY <= handleBounds.bottom;
    // Preserve the grab point, including when the handle is inset at a 0/100% endpoint.
    const offset = onHandle ? position.current / 100 * rect.width - (event.clientX - rect.left) : 0;
    gesture.current = { id: event.pointerId, x: event.clientX, y: event.clientY, left: rect.left, width: rect.width, offset, active: event.pointerType !== "touch" };
    event.currentTarget.setPointerCapture(event.pointerId);
    // Touch waits for horizontal intent so a vertical page swipe never shifts the reveal.
    if (gesture.current.active) {
      event.currentTarget.focus({ preventScroll: true });
      event.currentTarget.dataset.dragging = "true";
      updatePointer(event.clientX);
    }
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const current = gesture.current;
    if (!current || current.id !== event.pointerId) return;
    if (!current.active) {
      const dx = Math.abs(event.clientX - current.x);
      const dy = Math.abs(event.clientY - current.y);
      if (Math.max(dx, dy) < 8) return;
      if (dy > dx) {
        gesture.current = null;
        if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
        return;
      }
      current.active = true;
      event.currentTarget.dataset.dragging = "true";
    }
    updatePointer(event.clientX);
  };

  const endPointer = (event: PointerEvent<HTMLDivElement>) => {
    const current = gesture.current;
    if (!current || current.id !== event.pointerId) return;
    if (event.type === "pointerup") {
      if (current.active) updatePointer(event.clientX);
      else if (Math.hypot(event.clientX - current.x, event.clientY - current.y) < 8) {
        moveTo((event.clientX - current.left + current.offset) / current.width * 100);
      }
    }
    gesture.current = null;
    delete event.currentTarget.dataset.dragging;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 10 : 1;
    const values: Record<string, number> = {
      ArrowRight: position.current + step, ArrowUp: position.current + step,
      ArrowLeft: position.current - step, ArrowDown: position.current - step,
      PageUp: position.current + 10, PageDown: position.current - 10, Home: 0, End: 100,
    };
    if (event.key in values) {
      event.preventDefault();
      stop();
      paint(values[event.key]);
    } else if (event.key === "Escape" || event.key === " ") {
      event.preventDefault();
      if (event.key === "Escape") stop();
      else togglePlay();
    }
  };

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    reduced.current = preference.matches;
    const preferenceChange = () => { reduced.current = preference.matches; stop(); };
    const resize = new ResizeObserver(([entry]) => {
      width.current = entry.contentRect.width;
      paint(position.current);
    });
    resize.observe(viewport);
    const visibility = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) stop(); });
    visibility.observe(viewport);
    const suspend = () => {
      if (document.hidden) {
        stop();
        gesture.current = null;
        delete viewport.dataset.dragging;
      }
    };
    preference.addEventListener("change", preferenceChange);
    document.addEventListener("visibilitychange", suspend);
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
      resize.disconnect();
      visibility.disconnect();
      preference.removeEventListener("change", preferenceChange);
      document.removeEventListener("visibilitychange", suspend);
    };
  }, [paint, stop]);

  return { viewportRef, whiteRef, whiteContentRef, dividerRef, handleRef, readoutRef, isPlaying, togglePlay, moveTo, stop,
    sliderEvents: { onPointerDown, onPointerMove, onPointerUp: endPointer, onPointerCancel: endPointer, onLostPointerCapture: endPointer, onKeyDown } };
}
