"use client";

import { Component, Suspense, useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import { Group, MathUtils } from "three";
import { ProductBody, ProductFallback } from "./KineticScene";
import SceneMetrics from "./SceneMetrics";

type Props = {
  progress: RefObject<number>;
  rotation: RefObject<number>;
  refresh: RefObject<() => void>;
  phase: number;
  turn: number;
  paused: boolean;
  active: boolean;
  balanced?: boolean;
  macro?: "none" | "bullet" | "brush";
  uncapped?: boolean;
  revealing: boolean;
  revealKey: number;
  onRevealStep: (step: "formula" | "brush") => void;
  onRevealComplete: () => void;
  onReady: () => void;
  onUnavailable: () => void;
};

class Boundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? <ProductFallback /> : this.props.children;
  }
}

function FrameUpdate({ phase, turn, paused, refresh: refreshRef, macro, uncapped, active, revealing, revealKey }: Props) {
  const invalidate = useThree((state) => state.invalidate);
  useEffect(() => {
    invalidate(2);
  }, [phase, turn, paused, macro, uncapped, active, revealing, revealKey, invalidate]);
  useEffect(() => {
    refreshRef.current = invalidate;
    return () => {
      refreshRef.current = () => {};
    };
  }, [refreshRef, invalidate]);
  return null;
}

function Sculpture(props: Props) {
  const { onReady } = props;
  const group = useRef<Group>(null);
  const { viewport, size } = useThree();
  const phone = size.width < 768;
  const revealTime = useRef(0);
  const lastRevealFrame = useRef<number | null>(null);
  const announcedBrush = useRef(false);
  const completed = useRef(false);
  const effectiveOpening = useRef(props.progress.current);

  // Refined luxury cosmetic scale with breathing room to guarantee zero clipping
  const baseScale = Math.min(viewport.height / (phone ? 5.2 : 4.4), viewport.width / (phone ? 3.4 : 4.8));

  useEffect(() => {
    onReady();
  }, [onReady]);

  useEffect(() => {
    revealTime.current = 0;
    announcedBrush.current = false;
    completed.current = false;
  }, [props.revealKey]);

  useEffect(() => {
    lastRevealFrame.current = null;
  }, [props.active, props.paused, props.revealKey]);

  useFrame((state, delta) => {
    if (!group.current) return;
    const clampedDelta = Math.min(delta, 0.032);
    const p = props.progress.current;
    const introducing = props.revealing && !completed.current;
    if (introducing && !props.paused) {
      const now = performance.now();
      if (lastRevealFrame.current !== null) revealTime.current += (now - lastRevealFrame.current) / 1000;
      lastRevealFrame.current = now;
    }
    const t = revealTime.current;
    // One 4.2-second camera study: formula, opposite-end brush, then the whole stick.
    const brushFocus = MathUtils.smootherstep(t, .8, 1.9);
    const settle = MathUtils.smootherstep(t, 2.65, 4.2);
    const closeFocus = introducing ? 1 - settle : 0;
    if (introducing && t >= 1.4 && !announcedBrush.current) {
      announcedBrush.current = true;
      props.onRevealStep("brush");
    }
    if (introducing && t >= 4.2) {
      completed.current = true;
      props.onRevealComplete();
    }

    const targetOpening = introducing ? .92 * MathUtils.smootherstep(t, .7, 1.65) : props.uncapped ? .92 : p;
    effectiveOpening.current = props.paused ? targetOpening : MathUtils.damp(effectiveOpening.current, targetOpening, 6, clampedDelta);

    const isMacro = props.macro && props.macro !== "none";
    const macroBullet = props.macro === "bullet";

    const targetScale = isMacro ? baseScale * 1.75 : baseScale * (1 + closeFocus * .35);

    // Elegant presentation tilt
    const normalZ = -0.34 + Math.sin(p * Math.PI) * 0.10;
    const targetZ = isMacro ? (macroBullet ? -0.12 : 0.14) : MathUtils.lerp(normalZ, MathUtils.lerp(-.12, .18, brushFocus), closeFocus);

    // Beautifully balanced on the left-center over the soft silk background, alongside the model portrait on the right
    const normalX = phone ? 0 : -viewport.width * 0.12;
    const targetX = isMacro ? 0 : normalX;
    const normalY = phone ? -.12 : .03;
    const targetY = isMacro
      ? (macroBullet ? -0.42 : 0.48)
      : MathUtils.lerp(normalY, baseScale * MathUtils.lerp(-.48, .4, brushFocus), closeFocus);

    // Smooth continuous axial turn along the Y axis showcasing the double-ended design
    const autoTurn = props.rotation.current + 0.12 + p * Math.PI * 0.85;
    const targetTurn = MathUtils.lerp(autoTurn, -.18 + brushFocus * .6, closeFocus);
    const targetTilt = 0.08;

    group.current.scale.setScalar(props.paused ? targetScale : MathUtils.damp(group.current.scale.x, targetScale, 4.5, clampedDelta));
    group.current.position.x = props.paused ? targetX : MathUtils.damp(group.current.position.x, targetX, 4, clampedDelta);
    group.current.position.y = props.paused ? targetY : MathUtils.damp(group.current.position.y, targetY, 4, clampedDelta);
    group.current.rotation.z = props.paused ? targetZ : MathUtils.damp(group.current.rotation.z, targetZ, 4, clampedDelta);
    group.current.rotation.y = props.paused ? targetTurn : MathUtils.damp(group.current.rotation.y, targetTurn, 3.5, clampedDelta);
    group.current.rotation.x = props.paused ? targetTilt : MathUtils.damp(group.current.rotation.x, targetTilt, 3.5, clampedDelta);

    // Every device rests after the reveal. Only scrolling and controls request more frames.
    if (!props.paused) {
      const remaining = Math.abs(group.current.scale.x - targetScale)
        + Math.abs(group.current.position.x - targetX) + Math.abs(group.current.position.y - targetY)
        + Math.abs(group.current.rotation.y - targetTurn) + Math.abs(group.current.rotation.x - targetTilt)
        + Math.abs(group.current.rotation.z - targetZ) + Math.abs(effectiveOpening.current - targetOpening);
      if (introducing || remaining > 0.001) state.invalidate();
    }
  });

  return (
    <group ref={group} scale={baseScale} position={[phone ? 0 : -viewport.width * 0.12, phone ? -0.12 : 0.03, 0.5]} rotation={[0.08, 0.12, -0.34]}>
      <ProductBody opening={effectiveOpening} quality={props.balanced ? "balanced" : "full"} />
    </group>
  );
}

export default function CoverScene(props: Props) {
  const { onUnavailable } = props;
  const [supported, setSupported] = useState<boolean | null>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    try {
      const context = canvas.getContext("webgl2");
      // This browser-only capability probe must run after hydration, outside render.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSupported(!!context);
      context?.getExtension("WEBGL_lose_context")?.loseContext();
    } catch {
      setSupported(false);
    }
    const change = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", change);
    return () => document.removeEventListener("visibilitychange", change);
  }, []);

  useEffect(() => {
    if (supported === false) onUnavailable();
  }, [supported, onUnavailable]);

  return (
    <div className="cover-canvas" role="img" aria-label="Artistic 3D view of NURRIE: white formula, pearl-white casing, rose-gold trim and natural blending brush">
      {supported !== true ? (
        <ProductFallback />
      ) : (
        <Boundary onError={props.onUnavailable}>
          <Canvas
            camera={{ position: [0, 0, 8.5], fov: 36 }}
            dpr={props.balanced ? 1 : [1, 1.5]}
            frameloop={!props.active || !visible ? "never" : "demand"}
            gl={{ alpha: true, antialias: true, powerPreference: props.balanced ? "low-power" : "high-performance" }}
            onCreated={({ gl }) => gl.domElement.addEventListener("webglcontextlost", () => setSupported(false), { once: true })}
          >
            {/* High-definition studio lighting tailored for cosmetic product sculpture */}
            <ambientLight intensity={0.55} color="#faf7f4" />
            <directionalLight position={[-3.8, 5.2, 4.2]} intensity={2.2} color="#ffffff" />
            <directionalLight position={[4.2, 1.8, 3.2]} intensity={1.5} color="#fff1e8" />
            {/* Silhouette rim light creates a defined crisp contour around the white bullet */}
            <directionalLight position={[-1.5, 4.0, -4.2]} intensity={2.2} color="#ffffff" />
            <directionalLight position={[2.5, -2.5, -3.0]} intensity={1.0} color="#f0dfd5" />
            <directionalLight position={[0, -3.2, 3.0]} intensity={0.9} color="#e5d5c8" />
            <Environment resolution={props.balanced ? 128 : 256} frames={1}>
              <Lightformer intensity={4.5} position={[-3, 3, 4]} scale={[2, 8, 1]} rotation={[0, 0.4, 0]} color="#ffffff" />
              <Lightformer intensity={3.5} position={[4, 2, 2]} scale={[2, 6, 1]} rotation={[0, -Math.PI / 2, 0]} color="#fff5ee" />
              <Lightformer intensity={2.8} position={[0, 6, -1]} scale={[6, 4, 1]} rotation={[Math.PI / 2, 0, 0]} color="#ffffff" />
              <Lightformer intensity={2.0} position={[-2, -3, 2]} scale={[4, 2, 1]} color="#f7ece3" />
            </Environment>
            {!props.balanced && <ContactShadows position={[0, -2.1, 0]} opacity={0.28} scale={8} blur={2.4} far={4} color="#34231c" />}
            <FrameUpdate {...props} active={props.active && visible} />
            <SceneMetrics />
            <Suspense fallback={null}>
              <Sculpture {...props} active={props.active && visible} />
            </Suspense>
          </Canvas>
        </Boundary>
      )}
    </div>
  );
}
