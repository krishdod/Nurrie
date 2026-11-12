"use client";

import { useEffect, useRef, useState } from "react";
import type { TransformationFilmAsset } from "@/lib/transformation-film";

export default function TransformationFilm({ film }: { film: TransformationFilmAsset | null }) {
  const video = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const player = video.current;
    if (!player) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) player.pause();
    });
    const onVisibility = () => { if (document.hidden) player.pause(); };
    observer.observe(player);
    document.addEventListener("visibilitychange", onVisibility);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", onVisibility); };
  }, [film]);

  if (!film) return null;
  return (
    <section className="transformation-film" aria-labelledby="film-heading">
      <div className="film-heading">
        <span className="section-eyebrow">The transformation film · {film.durationLabel}</span>
        <h2 id="film-heading">From white.<br /><em>To the moment it’s you.</em></h2>
        <p>The NURRIE stick, applied and blended on skin. Watch the white formula in use.</p>
      </div>
      <figure>
        <video ref={video} controls playsInline preload="none" poster={film.poster} aria-label="NURRIE foundation application film" aria-describedby="film-description" onError={() => setFailed(true)}>
          {film.webm && <source src={film.webm} type="video/webm" />}
          <source src={film.mp4} type="video/mp4" />
          <track kind="captions" src={film.captions} srcLang="en" label="English" default />
        </video>
        <figcaption id="film-description">White formula. Built-in brush. Actual product application. Individual results may vary.</figcaption>
        {failed && <p role="status">The film couldn’t load. <a href={film.mp4}>Open the video directly</a>, or read the description below.</p>}
      </figure>
      <details className="film-transcript"><summary>Read the film description</summary><p>{film.transcript}</p></details>
    </section>
  );
}
