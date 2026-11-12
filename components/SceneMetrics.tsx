"use client";

import { useEffect } from "react";
import { addAfterEffect, useThree } from "@react-three/fiber";

export default function SceneMetrics() {
  const gl = useThree(state => state.gl);
  useEffect(() => {
    if (new URLSearchParams(location.search).get("check") !== "performance") return;
    let last = 0;
    // Read the main scene after rendering, not the preceding contact-shadow pass.
    const remove = addAfterEffect(now => {
      if (now - last < 1000) return;
      last = now;
      window.dispatchEvent(new CustomEvent("nurrie:scene-stats", { detail: {
        calls: gl.info.render.calls, triangles: gl.info.render.triangles,
        lines: gl.info.render.lines, dpr: gl.getPixelRatio(),
      } }));
    });
    return remove;
  }, [gl]);
  return null;
}
