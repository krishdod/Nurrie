"use client";

import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** A single material gesture connects the product to the colour study. */
export default function CreamRibbon() {
  const section = useRef<HTMLElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(".cream-ribbon-image", {
        xPercent: -11, yPercent: 8, rotation: -9, scale: 1.04,
      }, {
        xPercent: 11, yPercent: -8, rotation: 7, scale: .96,
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top bottom",
          end: "bottom top",
          scrub: .65,
          onToggle: ({ isActive }) => {
            const image = section.current?.querySelector<HTMLElement>(".cream-ribbon-image");
            if (image) image.style.willChange = isActive ? "transform" : "auto";
          },
        },
      });
    });
    return () => media.revert();
  }, { scope: section });

  return (
    <section className="cream-bridge" id="the-white-ribbon" ref={section} aria-labelledby="cream-heading">
      <h2 id="cream-heading"><span>White is only</span>{" "}<span>the beginning.</span></h2>
      <div className="cream-ribbon-field" aria-hidden="true">
        <img
          className="cream-ribbon-image"
          src="/images/cream-ribbon-1600.webp"
          srcSet="/images/cream-ribbon-800.webp 800w, /images/cream-ribbon-1600.webp 1600w"
          sizes="(max-width: 768px) 150vw, 110vw"
          width={1600}
          height={819}
          alt=""
          loading="lazy"
          decoding="async"
        />
      </div>
      <a className="cream-bridge-link" href="#the-metamorphosis">Explore the change <ArrowDown size={18} aria-hidden="true" /></a>
    </section>
  );
}
