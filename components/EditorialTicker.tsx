"use client";

const HIGHLIGHTS = [
  "Starts White · Finishes You",
  "One Double-Ended Instrument",
  "White Formula · Built-In Brush",
  "Intuitive Skin Tone Adaptation",
  "Batch 01 Inaugural Allocation",
  "Pearl White · Rose Gold",
  "Swipe · Blend · Be",
];

export default function EditorialTicker() {
  return (
    <aside className="editorial-ticker" aria-label="NURRIE product highlights">
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
