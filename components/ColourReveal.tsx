"use client";

import { useState, type CSSProperties } from "react";
import { RotateCcw } from "lucide-react";

export default function ColourReveal() {
  const [blend, setBlend] = useState(0);
  const progress = blend / 100;
  const mix = (from: number, to: number) => Math.round(from + (to - from) * progress);
  const colour = `rgb(${mix(250, 191)}, ${mix(247, 143)}, ${mix(240, 111)})`;
  const stage = blend < 10 ? "Starts white." : blend < 85 ? "The colour begins to change." : "Blended into a skin-toned finish.";
  return (
    <div className="colour-reveal">
      <div className="reveal-surface" style={{ "--formula-colour": colour, "--blend": progress } as CSSProperties} role="img" aria-label={stage}>
        <svg className="formula-art" viewBox="0 0 420 300" aria-hidden="true">
          <defs>
            <linearGradient id="cream-light" x1="0" y1="0" x2="1" y2=".8">
              <stop offset="0" stopColor="#fff" stopOpacity=".65" />
              <stop offset=".38" stopColor="#fff" stopOpacity="0" />
              <stop offset="1" stopColor="#633b25" stopOpacity=".17" />
            </linearGradient>
            <filter id="cream-grain" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence type="fractalNoise" baseFrequency=".65" numOctaves="3" seed="8" result="grain" />
              <feColorMatrix in="grain" type="saturate" values="0" />
              <feComposite in2="SourceGraphic" operator="in" />
              <feBlend in="SourceGraphic" mode="soft-light" />
            </filter>
            <path id="cream-shape" d="M114 203 C100 185 109 159 132 137 C158 110 204 78 253 62 C275 54 300 56 305 72 C312 94 289 114 269 130 C246 149 207 180 174 207 C158 221 133 222 121 215 L141 196 L115 211 L133 189 Z" />
          </defs>
          <g className="cream-body">
            <use href="#cream-shape" fill="var(--formula-colour)" />
            <use href="#cream-shape" fill="url(#cream-light)" />
            <use className="cream-grain" href="#cream-shape" fill="var(--formula-colour)" filter="url(#cream-grain)" opacity=".14" />
            <g className="cream-ridges" fill="none" strokeLinecap="round">
              <path d="M132 185 C170 144 237 91 280 76" stroke="#fff" strokeOpacity=".45" strokeWidth="3" />
              <path d="M127 177 C169 133 224 93 269 72" stroke="#fff" strokeOpacity=".28" strokeWidth="1" />
              <path d="M148 197 C176 168 246 113 281 93" stroke="#fff" strokeOpacity=".36" strokeWidth="2" />
              <path d="M158 195 C196 163 238 131 265 108" stroke="#976d52" strokeOpacity=".16" strokeWidth="1.5" />
              <path d="M140 179 C181 139 225 111 260 89" stroke="#976d52" strokeOpacity=".12" strokeWidth="2" />
              <path d="M175 187 C209 158 244 132 262 115" stroke="#fff" strokeOpacity=".28" strokeWidth="1" />
            </g>
          </g>
        </svg>
        <span className="reveal-step" aria-hidden="true">{blend < 10 ? "01 / THE FIRST SWIPE" : blend < 85 ? "02 / THE BLEND" : "03 / THE COLOUR CHANGE"}</span>
        <span className="reveal-stage" aria-hidden="true">{blend < 10 ? "White" : blend < 85 ? "Blending" : "Skin-toned"}</span>
      </div>
      <div className="reveal-controls">
        <label htmlFor="blend-control">Slide to blend <span>{blend}%</span></label>
        <input id="blend-control" type="range" min="0" max="100" value={blend} onChange={event => setBlend(Number(event.target.value))} aria-valuetext={`${blend}% blended. ${stage}`} />
        <div className="reveal-scale"><span>White formula</span><span>After blending</span></div>
        <button className="text-button" type="button" onClick={() => setBlend(0)}><RotateCcw size={14} /> Start again</button>
      </div>
      <p className="reveal-note">An illustration of the colour change, not a shade match or a product result.</p>
    </div>
  );
}
