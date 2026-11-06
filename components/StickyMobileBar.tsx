"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { sensoryAudio } from "./SensoryAudio";

export default function StickyMobileBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const firstAccess = document.getElementById("first-access");
      if (!firstAccess) {
        setVisible(scrollY > 500);
        return;
      }

      const rect = firstAccess.getBoundingClientRect();
      // Hide once the waitlist section comes into view so there's no duplicate UI
      const inWaitlist = rect.top < window.innerHeight * 0.75;
      setVisible(scrollY > 500 && !inWaitlist);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    sensoryAudio.capClick();
    const input = document.getElementById("email");
    if (input) {
      setTimeout(() => input.focus({ preventScroll: false }), 450);
    }
  };

  if (!visible) return null;

  return (
    <div className="sticky-mobile-bar" role="region" aria-label="Batch 01 Reserve Callout">
      <div className="sticky-bar-inner">
        <div className="sticky-meta">
          <span className="sticky-pulse" aria-hidden="true" />
          <div className="sticky-text">
            <span className="sticky-title">Batch 01</span>
            <span className="sticky-sub">84% Allocated</span>
          </div>
        </div>
        <a href="#first-access" className="sticky-action-btn" onClick={handleClick}>
          <span>Reserve Access</span>
          <ArrowUpRight size={15} />
        </a>
      </div>
    </div>
  );
}
