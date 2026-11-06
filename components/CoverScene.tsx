"use client";

import { Component, Suspense, useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import { Group, MathUtils } from "three";
import { ProductBody, ProductFallback } from "./KineticScene";

type Props = {
  progress: RefObject<number>;
  rotation: RefObject<number>;
  refresh: RefObject<() => void>;
  phase: number;
  turn: number;
  paused: boolean;
  active: boolean;
  macro?: "none" | "bullet" | "brush";
  uncapped?: boolean;
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

function FrameUpdate({ phase, turn, paused, refresh }: { phase: number; turn: number; paused: boolean; refresh: RefObject<() => void> }) {
  const invalidate = useThree((state) => state.invalidate);
  useEffect(() => {
    invalidate();
  }, [phase, turn, paused, invalidate]);
  useEffect(() => {
    refresh.current = invalidate;
    return () => {
      refresh.current = () => {};
    };
  }, [refresh, invalidate]);
  return null;
}

function Sculpture(props: Props) {
  const group = useRef<Group>(null);
  const { viewport, size } = useThree();
  const phone = size.width < 768;
  const clock = useRef(0);
  const effectiveOpening = useRef(props.progress.current);

  // Refined luxury cosmetic scale with breathing room to guarantee zero clipping
  const baseScale = Math.min(viewport.height / (phone ? 5.2 : 4.4), viewport.width / (phone ? 3.4 : 4.8));

  useEffect(() => {
    props.onReady();
  }, [props.onReady]);

  useFrame((state, delta) => {
    if (!group.current) return;
    const clampedDelta = Math.min(delta, 0.032);
    const p = props.progress.current;
    if (!props.paused) clock.current += clampedDelta;

    const targetOpening = props.uncapped ? 0.92 : p;
    effectiveOpening.current = props.paused ? targetOpening : MathUtils.damp(effectiveOpening.current, targetOpening, 6, clampedDelta);

    const isMacro = props.macro && props.macro !== "none";
    const macroBullet = props.macro === "bullet";

    const targetScale = isMacro ? baseScale * 1.75 : baseScale;

    // Elegant presentation tilt
    const normalZ = -0.34 + Math.sin(p * Math.PI) * 0.10;
    const targetZ = isMacro ? (macroBullet ? -0.12 : 0.14) : normalZ;

    // Beautifully balanced on the left-center over the soft silk background, alongside the model portrait on the right
    const normalX = phone ? 0 : -viewport.width * 0.12;
    const targetX = isMacro ? 0 : normalX;
    const targetY = isMacro
      ? (macroBullet ? -0.42 : 0.48)
      : (phone ? -0.12 : 0.03) + (props.paused ? 0 : Math.sin(clock.current * 0.5) * 0.02);

    // Smooth continuous axial turn along the Y axis showcasing the double-ended design
    const autoTurn = props.rotation.current + 0.12 + p * Math.PI * 0.85;

    group.current.scale.setScalar(props.paused ? targetScale : MathUtils.damp(group.current.scale.x, targetScale, 4.5, clampedDelta));
    group.current.position.x = props.paused ? targetX : MathUtils.damp(group.current.position.x, targetX, 4, clampedDelta);
    group.current.position.y = props.paused ? targetY : MathUtils.damp(group.current.position.y, targetY, 4, clampedDelta);
    group.current.rotation.z = props.paused ? targetZ : MathUtils.damp(group.current.rotation.z, targetZ, 4, clampedDelta);
    group.current.rotation.y = props.paused ? autoTurn : MathUtils.damp(group.current.rotation.y, autoTurn + state.pointer.x * 0.15, 3.5, clampedDelta);
    group.current.rotation.x = props.paused ? 0.08 : MathUtils.damp(group.current.rotation.x, 0.08 + state.pointer.y * 0.05, 3.5, clampedDelta);
  });

  return (
    <group ref={group} scale={baseScale} position={[phone ? 0 : -viewport.width * 0.12, phone ? -0.12 : 0.03, 0.5]} rotation={[0.08, 0.12, -0.34]}>
      <ProductBody opening={effectiveOpening} capSeparation={0.9} />
    </group>
  );
}

export default function CoverScene(props: Props) {
  const [supported, setSupported] = useState<boolean | null>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    try {
      const context = canvas.getContext("webgl2");
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
    if (supported === false) props.onUnavailable();
  }, [supported, props.onUnavailable]);

  return (
    <div className="cover-canvas" role="img" aria-label="Artistic 3D view of NURRIE: white formula, pearl-white casing, rose-gold trim and natural blending brush">
      {supported !== true ? (
        <ProductFallback />
      ) : (
        <Boundary onError={props.onUnavailable}>
          <Canvas
            camera={{ position: [0, 0, 8.5], fov: 36 }}
            dpr={[1, 1.5]}
            frameloop={!props.active || !visible ? "never" : props.paused ? "demand" : "always"}
            gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
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
            <Environment resolution={256}>
              <Lightformer intensity={4.5} position={[-3, 3, 4]} scale={[2, 8, 1]} rotation={[0, 0.4, 0]} color="#ffffff" />
              <Lightformer intensity={3.5} position={[4, 2, 2]} scale={[2, 6, 1]} rotation={[0, -Math.PI / 2, 0]} color="#fff5ee" />
              <Lightformer intensity={2.8} position={[0, 6, -1]} scale={[6, 4, 1]} rotation={[Math.PI / 2, 0, 0]} color="#ffffff" />
              <Lightformer intensity={2.0} position={[-2, -3, 2]} scale={[4, 2, 1]} color="#f7ece3" />
            </Environment>
            <ContactShadows position={[0, -2.1, 0]} opacity={0.28} scale={8} blur={2.4} far={4} color="#34231c" />
            <FrameUpdate phase={props.phase} turn={props.turn} paused={props.paused} refresh={props.refresh} />
            <Suspense fallback={null}>
              <Sculpture {...props} />
            </Suspense>
          </Canvas>
        </Boundary>
      )}
    </div>
  );
}
