"use client";

const HIGHLIGHTS = [
  "Starts White · Finishes You",
  "One Double-Ended Instrument",
  "48,000 Micro-Filament Buffer",
  "Intuitive Skin Tone Adaptation",
  "Batch 01 Inaugural Allocation",
  "White Squalane Bullet · Built-In Brush",
  "Formulated in Paris · Engineered in Japan",
];

export default function EditorialTicker() {
  return (
    <aside className="editorial-ticker" aria-label="NURRIE Product & Engineering Highlights">
      <div className="ticker-track">
        <div className="ticker-group">
          {HIGHLIGHTS.map((item, idx) => (
            <span key={`t1-${idx}`} className="ticker-item">
              <span className="ticker-text">{item}</span>
              <span className="ticker-bullet" aria-hidden="true">◆</span>
            </span>
          ))}
        </div>
        <div className="ticker-group" aria-hidden="true">
          {HIGHLIGHTS.map((item, idx) => (
            <span key={`t2-${idx}`} className="ticker-item">
              <span className="ticker-text">{item}</span>
              <span className="ticker-bullet">◆</span>
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
