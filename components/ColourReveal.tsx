"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ColourReveal() {
  const [blend, setBlend] = useState(0);
  const manual = useRef(false);
  const section = useRef<HTMLElement>(null);
  const filterId = `cream-colour-${useId().replace(/:/g, "")}`;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      ScrollTrigger.create({
        trigger: section.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          if (!manual.current) setBlend(Math.round(self.progress * 100));
        },
      });
    });
    return () => media.revert();
  }, []);

  const progress = blend / 100;
  const stage = blend < 15 ? "White at first." : blend < 85 ? "The colour comes alive." : "A skin-toned finish.";

  return (
    <section ref={section} className="colour-chapter" id="the-blend" aria-labelledby="change-heading">
      <div className="change-stage" style={{ "--blend": progress } as CSSProperties}>
        <div className="change-copy">
          <h2 id="change-heading">White.<br /><span>Then, yours.</span></h2>
          <p>It begins with the unexpected: a white foundation. As you apply and blend, the colour changes, adapting to your skin tone.</p>
          <p className="change-signoff">The transformation is in the blend.</p>
        </div>
        <div className="blend-experience">
          <div className="cream-study" role="img" aria-label={stage}>
            <svg width="0" height="0" aria-hidden="true" className="cream-filter">
              <defs>
                <filter id={filterId} colorInterpolationFilters="sRGB">
                  <feColorMatrix type="matrix" values={`${1 - progress * 0.22} 0 0 0 0 0 ${1 - progress * 0.4} 0 0 0 0 0 ${1 - progress * 0.54} 0 0 0 0 0 1 0`} />
                </filter>
              </defs>
            </svg>
            <span className="cream-word" aria-hidden="true">{blend < 50 ? "white." : "yours."}</span>
            <img
              className="cream-image"
              src="/images/cream-swipe.webp"
              width={900}
              height={700}
              alt=""
              loading="lazy"
              decoding="async"
              style={{ filter: `url(#${filterId})` }}
            />
            <span className="cream-state" aria-hidden="true">{stage}</span>
          </div>
          <div className="blend-controller">
            <label htmlFor="blend-control">Slide to see the change <ArrowRight size={18} /><span>{blend}%</span></label>
            <input
              id="blend-control"
              type="range"
              min="0"
              max="100"
              value={blend}
              onChange={(event) => {
                manual.current = true;
                setBlend(Number(event.target.value));
              }}
              aria-valuetext={`${blend}% blended. ${stage}`}
            />
            <div className="blend-endpoints"><span>White formula</span><span>After blending</span></div>
            <div className="blend-caption">
              <p>Illustration only. This is not a shade match or a product result.</p>
              <button
                type="button"
                onClick={() => {
                  manual.current = false;
                  setBlend(0);
                }}
                aria-label="Reset colour change"
              >
                <RotateCcw size={16} />
              </button>
            </div>
          </div>
        </div>
        <span className="change-footnote">A different beginning. A very personal finish.</span>
      </div>
    </section>
  );
}
