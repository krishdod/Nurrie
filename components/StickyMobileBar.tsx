"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

export default function StickyMobileBar() {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState("the-stick");

  useEffect(() => {
    const hero = document.querySelector(".living-cover");
    const signup = document.getElementById("first-access");
    const studio = document.querySelector(".studio-lens-card");
    const blocked = new Set<Element>();
    let pastHero = false;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === hero) pastHero = !entry.isIntersecting && entry.boundingClientRect.bottom <= 0;
        else if (entry.isIntersecting) blocked.add(entry.target);
        else blocked.delete(entry.target);
      }
      setVisible(pastHero && blocked.size === 0);
    }, { threshold: 0 });
    for (const element of [hero, signup, studio]) if (element) observer.observe(element);

    const chapters = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) setCurrent(entry.target.id);
    }, { rootMargin: "-20% 0px -60% 0px" });
    for (const id of ["the-stick", "the-metamorphosis", "the-ritual", "the-faq"]) {
      const element = document.getElementById(id);
      if (element) chapters.observe(element);
    }
    return () => { observer.disconnect(); chapters.disconnect(); };
  }, []);

  if (!visible) return null;

  return (
    <nav className="mobile-journey" aria-label="Quick navigation">
      <a href="#the-stick" aria-current={current === "the-stick" ? "location" : undefined}>The stick</a>
      <a href="#the-metamorphosis" aria-current={current === "the-metamorphosis" ? "location" : undefined}>The change</a>
      <a href="#first-access" className="mobile-journey-join">Join the list <ArrowUpRight size={17} aria-hidden="true" /></a>
    </nav>
  );
}
