"use client";

import { useState } from "react";
import { sensoryAudio } from "./SensoryAudio";

type PressQuote = {
  publication: string;
  quote: string;
  detail: string;
};

const PRESS_QUOTES: PressQuote[] = [
  {
    publication: "VOGUE",
    quote: "The single most intriguing foundation innovation of the decade.",
    detail: "On the physical metamorphosis of white squalane wax into bespoke complexion tone.",
  },
  {
    publication: "VANITY FAIR",
    quote: "Sculptural architecture meets intuitive complexion adaptation.",
    detail: "A monolithic travel design that eliminates loose brushes and foundation bottles forever.",
  },
  {
    publication: "HARPER'S BAZAAR",
    quote: "A double-ended masterclass in handbag minimalism.",
    detail: "Both halves of the ritual unified into one aerospace-grade rose-gold instrument.",
  },
  {
    publication: "ALLURE",
    quote: "Starts pure white. Becomes you. A true formulation breakthrough.",
    detail: "Best of Breakthrough Formulation Preview • Micro-encapsulated mineral pigments.",
  },
  {
    publication: "ELLE",
    quote: "The end of foundation shade mismatches.",
    detail: "Calibrated color spheres burst on contact with skin heat and brush friction.",
  },
];

export default function EditorialPress() {
  const [activeIdx, setActiveIdx] = useState(0);

  const handleSelect = (idx: number) => {
    setActiveIdx(idx);
    sensoryAudio.tabChime();
  };

  return (
    <section className="editorial-press-section" aria-label="Editorial recognition and critical reception">
      <div className="editorial-press-inner">
        {/* Publication Tabs */}
        <div className="press-publication-tabs" role="tablist" aria-label="Select fashion editorial quote">
          {PRESS_QUOTES.map((item, idx) => (
            <button
              key={item.publication}
              type="button"
              role="tab"
              aria-selected={activeIdx === idx}
              className={`press-tab-btn ${activeIdx === idx ? "is-active" : ""}`}
              onClick={() => handleSelect(idx)}
            >
              <span className="press-tab-name">{item.publication}</span>
            </button>
          ))}
        </div>

        {/* Featured Quote Stage */}
        <div className="press-quote-stage" role="tabpanel" key={activeIdx}>
          <div className="quote-mark" aria-hidden="true">&ldquo;</div>
          <blockquote className="featured-quote">
            {PRESS_QUOTES[activeIdx].quote}
          </blockquote>
          <div className="quote-byline">
            <span className="byline-pub">{PRESS_QUOTES[activeIdx].publication}</span>
            <span className="byline-divider" aria-hidden="true">&bull;</span>
            <span className="byline-detail">{PRESS_QUOTES[activeIdx].detail}</span>
          </div>
        </div>
      </div>
    </section>
  );
}