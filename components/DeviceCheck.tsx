"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const subscribeDevice = () => () => {};
const getDevice = () => /Android/i.test(navigator.userAgent) ? "Android browser" : "Desktop / non-Android browser — not an Android hardware test";

type SceneStats = { calls: number; triangles: number; lines: number; dpr: number };
export default function DeviceCheck() {
  const [metrics, setMetrics] = useState({ lcp: 0, cls: 0, blocking: 0, interaction: 0, js: 0 });
  const [scene, setScene] = useState<SceneStats | null>(null);
  const [sample, setSample] = useState<{ fps: number; slow: number } | null>(null);
  const [running, setRunning] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const device = useSyncExternalStore(subscribeDevice, getDevice, () => "Checking browser…");
  const cancel = useRef<() => void>(() => {});

  useEffect(() => {
    const observers: PerformanceObserver[] = [];
    let cls = 0, blocking = 0;
    const observe = (type: string, callback: (entries: PerformanceEntry[]) => void) => {
      if (!PerformanceObserver.supportedEntryTypes.includes(type)) return;
      const observer = new PerformanceObserver(list => callback(list.getEntries()));
      observer.observe({ type, buffered: true });
      observers.push(observer);
    };
    observe("largest-contentful-paint", entries => setMetrics(m => ({ ...m, lcp: entries.at(-1)!.startTime })));
    observe("layout-shift", entries => {
      for (const entry of entries) {
        const shift = entry as PerformanceEntry & { hadRecentInput: boolean; value: number };
        if (!shift.hadRecentInput) cls += shift.value;
      }
      setMetrics(m => ({ ...m, cls }));
    });
    observe("longtask", entries => {
      for (const entry of entries) blocking += Math.max(0, entry.duration - 50);
      setMetrics(m => ({ ...m, blocking }));
    });
    observe("event", entries => setMetrics(m => ({ ...m, interaction: Math.max(m.interaction, ...entries.map(e => e.duration)) })));
    const updateBytes = () => {
      const js = performance.getEntriesByType("resource").reduce((total, entry) => {
        const resource = entry as PerformanceResourceTiming;
        return total + (/\.js(?:\?|$)/.test(resource.name) ? resource.encodedBodySize : 0);
      }, 0);
      setMetrics(m => ({ ...m, js }));
    };
    observe("resource", updateBytes);
    const stats = (event: Event) => setScene((event as CustomEvent<SceneStats>).detail);
    const visibility = () => { if (document.hidden) { cancel.current(); setRunning(false); } };
    window.addEventListener("nurrie:scene-stats", stats);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observers.forEach(observer => observer.disconnect());
      window.removeEventListener("nurrie:scene-stats", stats);
      document.removeEventListener("visibilitychange", visibility);
      cancel.current();
    };
  }, []);

  function measure() {
    cancel.current();
    setRunning(true);
    setSample(null);
    let id = 0, first = 0, previous = 0, count = 0, slow = 0;
    const frame = (now: number) => {
      if (document.hidden) { setRunning(false); return; }
      if (!first) first = now;
      if (previous) { count++; if (now - previous > 50) slow++; }
      previous = now;
      if (now - first < 10000) id = requestAnimationFrame(frame);
      else { setSample({ fps: Math.round(count / ((now - first) / 1000)), slow }); setRunning(false); }
    };
    id = requestAnimationFrame(frame);
    cancel.current = () => cancelAnimationFrame(id);
  }

  return (
    <aside className="device-check" aria-label="Device performance check">
      <details open={expanded} onToggle={event => setExpanded(event.currentTarget.open)}>
        <summary>Device performance check</summary>
        <p>{device}</p>
        <dl>
          <div><dt>LCP (this load)</dt><dd>{Math.round(metrics.lcp)} ms</dd></div>
          <div><dt>JS payload loaded</dt><dd>{Math.round(metrics.js / 1024)} KB</dd></div>
          <div><dt>Layout shift total</dt><dd>{metrics.cls.toFixed(3)}</dd></div>
          <div><dt>Long-task excess</dt><dd>{Math.round(metrics.blocking)} ms</dd></div>
          <div><dt>Longest observed event</dt><dd>{Math.round(metrics.interaction)} ms</dd></div>
          <div><dt>3D draw calls / triangles</dt><dd>{scene ? `${scene.calls} / ${scene.triangles}` : "Not loaded"}</dd></div>
          <div><dt>3D line segments / DPR</dt><dd>{scene ? `${scene.lines} / ${scene.dpr}` : "Not loaded"}</dd></div>
          <div><dt>10-second frame sample</dt><dd>{sample ? `${sample.fps} fps · ${sample.slow} frames >50 ms` : running ? "Measuring…" : "Not measured"}</dd></div>
        </dl>
        <button type="button" disabled={running} onClick={measure}>{running ? "Use the site for 10 seconds…" : "Measure 10 seconds"}</button>
        <p>Local diagnostic. No results are sent. Run on your Android phone for hardware results. Event timing and frame samples are not a field INP score.</p>
      </details>
    </aside>
  );
}
