"use client";

import { Component, Suspense, useEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Center, ContactShadows, Environment, Lightformer, Text3D } from "@react-three/drei";
import { BackSide, BufferGeometry, CatmullRomCurve3, Color, Float32BufferAttribute, Group, LatheGeometry, MathUtils, Vector2, Vector3 } from "three";

const FONT = "/fonts/optimer-regular.json";

type SceneProps = { paused?: boolean; onReady?: () => void; className?: string; variant?: "centered" | "editorial" };

class SceneBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

/** The product always stays readable if WebGL is unavailable or disabled. */
export function ProductFallback() {
  return (
    <img
      src="/images/product-duo-1024.webp"
      alt="Two views of NURRIE's pearl ivory and rose gold double-ended foundation stick: white foundation and blending brush"
      width={1024}
      height={683}
      style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center" }}
    />
  );
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return reduced;
}

function Lettering({ paused, scrollProgress }: { paused: boolean; scrollProgress: RefObject<number> }) {
  const group = useRef<Group>(null);
  const elapsed = useRef(0);
  const narrow = useThree((state) => state.size.width / state.size.height < 1);
  useFrame((state, delta) => {
    if (!group.current || paused) return;
    elapsed.current += Math.min(delta, 0.05);
    const scroll = scrollProgress.current;
    group.current.rotation.y = MathUtils.damp(group.current.rotation.y, -0.12 + state.pointer.x * 0.16, 2.5, delta);
    group.current.rotation.z = MathUtils.damp(group.current.rotation.z, -0.15 + scroll * 0.22, 2, delta);
    group.current.position.y = MathUtils.damp(group.current.position.y, 0.35 + (scroll - 0.5) * 0.3 + Math.sin(elapsed.current * 0.35) * 0.035, 2.5, delta);
  });
  return (
    <group ref={group} position={[0.05, 0.35, -1.1]} rotation={[0.06, -0.12, -0.1]} scale={narrow ? 0.78 : 1}>
      <Center>
        <Text3D font={FONT} size={1.12} height={0.24} curveSegments={12} bevelEnabled bevelThickness={0.02} bevelSize={0.018} bevelSegments={4} letterSpacing={-0.035}>
          NURRIE
          <meshPhysicalMaterial color="#785544" metalness={0.38} roughness={0.24} clearcoat={0.6} clearcoatRoughness={0.22} />
        </Text3D>
      </Center>
    </group>
  );
}

function RoseGold() {
  return <meshPhysicalMaterial color="#d4a18c" metalness={0.96} roughness={0.14} clearcoat={0.7} clearcoatRoughness={0.16} />;
}

function Pearl() {
  return <meshPhysicalMaterial color="#f5eee3" metalness={0.06} roughness={0.3} clearcoat={0.52} clearcoatRoughness={0.27} />;
}

function Brush() {
  const { bristles, core } = useMemo(() => {
    const positions: number[] = [];
    const colors: number[] = [];
    const root = new Color("#35271f");
    const tip = new Color("#e0cbb3");
    const color = new Color();
    const count = 2800;
    // A golden-angle disk makes the bristle field dense and deterministic.
    for (let i = 0; i < count; i++) {
      const radius = Math.sqrt((i + 0.5) / count);
      const theta = i * 2.399963229728653;
      const variance = Math.sin(i * 11.731) * 0.018 + Math.cos(i * 3.14159) * 0.006;
      const point = (t: number) => {
        const spread = radius * (0.29 + 0.27 * Math.sin(t * Math.PI / 2));
        const bend = Math.sin(t * Math.PI) * 0.014 * Math.sin(i * 0.8);
        return [Math.cos(theta) * spread + bend, 1.02 + t * (0.89 - 0.29 * Math.pow(radius, 2.7) + variance), Math.sin(theta) * spread + bend * 0.5];
      };
      for (let segment = 0; segment < 5; segment++) {
        for (const t of [segment / 5, (segment + 1) / 5]) {
          positions.push(...point(t));
          color.copy(root).lerp(tip, Math.pow(t, 2.1));
          colors.push(color.r, color.g, color.b);
        }
      }
    }
    const bristles = new BufferGeometry();
    bristles.setAttribute("position", new Float32BufferAttribute(positions, 3));
    bristles.setAttribute("color", new Float32BufferAttribute(colors, 3));
    const core = new LatheGeometry([
      new Vector2(0, 1.01), new Vector2(0.29, 1.01), new Vector2(0.37, 1.2),
      new Vector2(0.47, 1.43), new Vector2(0.53, 1.6), new Vector2(0.49, 1.7),
      new Vector2(0.4, 1.79), new Vector2(0.26, 1.86), new Vector2(0.12, 1.89), new Vector2(0, 1.9),
    ], 64);
    const vertexColors = [];
    const vertices = core.getAttribute("position");
    for (let i = 0; i < vertices.count; i++) {
      const t = MathUtils.clamp((vertices.getY(i) - 1.01) / 0.89, 0, 1);
      color.copy(root).lerp(tip, Math.pow(t, 2.2));
      vertexColors.push(color.r, color.g, color.b);
    }
    core.setAttribute("color", new Float32BufferAttribute(vertexColors, 3));
    return { bristles, core };
  }, []);
  useEffect(() => () => { bristles.dispose(); core.dispose(); }, [bristles, core]);
  return (
    <group>
      <mesh geometry={core}><meshStandardMaterial vertexColors roughness={1} /></mesh>
      <lineSegments geometry={bristles}><lineBasicMaterial vertexColors transparent opacity={0.88} /></lineSegments>
    </group>
  );
}

export function ProductBody({ brush = false, opening }: { brush?: boolean; opening?: RefObject<number> }) {
  const cap = useRef<Group>(null);
  const lowerBrush = useRef<Group>(null);
  useFrame(() => {
    if (!opening || !cap.current) return;
    const amount = MathUtils.smoothstep(opening.current, 0.12, 0.58);
    cap.current.position.set(amount * (0.35 + opening.current * 0.35), -1.54 + amount * 0.8, amount * 0.5);
    cap.current.rotation.z = amount * 0.55;
    if (lowerBrush.current) lowerBrush.current.visible = amount > 0.02;
  });
  const { shell, upperTrim, lowerTrim, capProfile, bulletProfile } = useMemo(() => {
    const positions: number[] = [];
    const indices: number[] = [];
    const upperPoints: Vector3[] = [];
    const lowerPoints: Vector3[] = [];
    const segments = 96;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      const upper = 0.66 - 0.24 * (1 + Math.sin(theta));
      const x = Math.sin(theta) * 0.433;
      const z = Math.cos(theta) * 0.433;
      positions.push(x, -1.11, z, x, upper, z);
      upperPoints.push(new Vector3(x * 1.008, upper, z * 1.008));
      lowerPoints.push(new Vector3(x * 1.008, -0.74 - 0.35 * Math.sin(theta), z * 1.008));
      if (i < segments) {
        const a = i * 2;
        indices.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
      }
    }
    const shell = new BufferGeometry();
    shell.setAttribute("position", new Float32BufferAttribute(positions, 3));
    shell.setIndex(indices);
    shell.computeVertexNormals();
    return {
      shell,
      upperTrim: new CatmullRomCurve3(upperPoints),
      lowerTrim: new CatmullRomCurve3(lowerPoints),
      capProfile: [new Vector2(0, -1.96), new Vector2(0.34, -1.96), new Vector2(0.407, -1.94), new Vector2(0.434, -1.89), new Vector2(0.434, -1.12), new Vector2(0, -1.12)],
      bulletProfile: [new Vector2(0, 1.07), new Vector2(0.315, 1.07), new Vector2(0.315, 1.43), new Vector2(0.31, 1.48), new Vector2(0.275, 1.52), new Vector2(0.17, 1.54), new Vector2(0, 1.55)],
    };
  }, []);
  useEffect(() => () => shell.dispose(), [shell]);

  return (
    <group>
      <mesh position={[0, -0.2, 0]}><cylinderGeometry args={[0.428, 0.428, 1.83, 80]} /><RoseGold /></mesh>
      <mesh geometry={shell}><Pearl /></mesh>
      <mesh><tubeGeometry args={[upperTrim, 96, 0.012, 6, true]} /><RoseGold /></mesh>
      <mesh><tubeGeometry args={[lowerTrim, 96, 0.009, 6, true]} /><RoseGold /></mesh>
      <group ref={cap} position={[0, -1.54, 0]}><mesh position={[0, 1.54, 0]}><latheGeometry args={[capProfile, 80]} /><Pearl /></mesh></group>
      {opening && <group ref={lowerBrush} visible={false}>
        <mesh position={[0, -1.16, 0]}><cylinderGeometry args={[0.34, 0.34, 0.2, 64]} /><RoseGold /></mesh>
        <group position={[0, -0.17, 0]} rotation={[0, 0, Math.PI]}><Brush /></group>
      </group>}
      <mesh position={[0, -1.114, 0]}><cylinderGeometry args={[0.434, 0.434, 0.012, 80]} /><RoseGold /></mesh>
      <mesh position={[0, 0.76, 0]}><cylinderGeometry args={[0.396, 0.414, 0.16, 80]} /><RoseGold /></mesh>
      <mesh position={[0, 0.98, 0]}><cylinderGeometry args={[0.346, 0.346, 0.35, 80]} /><RoseGold /></mesh>
      {brush ? <Brush /> : (
        <mesh><latheGeometry args={[bulletProfile, 80]} /><meshPhysicalMaterial color="#fffdf7" roughness={0.37} clearcoat={0.28} metalness={0} /></mesh>
      )}
      <SceneBoundary fallback={null}>
        <Suspense fallback={null}>
          <group position={[0.025, -0.2, 0.435]} rotation={[0, 0, Math.PI / 2]}>
            <Center>
              <Text3D font={FONT} size={0.195} height={0.002} curveSegments={8} letterSpacing={0.012}>
                NURRIE
                <meshPhysicalMaterial color="#70452f" metalness={0.5} roughness={0.35} />
              </Text3D>
            </Center>
          </group>
        </Suspense>
      </SceneBoundary>
    </group>
  );
}

function FoundationStick({ paused, onReady, scrollProgress }: { paused: boolean; onReady?: () => void; scrollProgress: RefObject<number> }) {
  const duo = useRef<Group>(null);
  const foundation = useRef<Group>(null);
  const brush = useRef<Group>(null);
  const elapsed = useRef(0);
  useEffect(() => { onReady?.(); }, [onReady]);
  useFrame((state, delta) => {
    if (!duo.current || paused) return;
    elapsed.current += Math.min(delta, 0.05);
    const time = elapsed.current;
    const scroll = scrollProgress.current - 0.5;
    duo.current.rotation.x = MathUtils.damp(duo.current.rotation.x, 0.025 + state.pointer.y * 0.075, 2.5, delta);
    duo.current.rotation.y = MathUtils.damp(duo.current.rotation.y, -0.08 + state.pointer.x * 0.28 + scroll * 0.2, 2.5, delta);
    duo.current.position.y = Math.sin(time * 0.55) * 0.035 + scroll * 0.12;
    if (foundation.current) foundation.current.rotation.z = MathUtils.damp(foundation.current.rotation.z, -0.12 - scroll * 0.055 + Math.sin(time * 0.36) * 0.012, 2.5, delta);
    if (brush.current) brush.current.rotation.z = MathUtils.damp(brush.current.rotation.z, 0.1 + scroll * 0.055 + Math.sin(time * 0.36 + 1.5) * 0.012, 2.5, delta);
  });
  return (
    <group ref={duo} rotation={[0.025, -0.08, 0]}>
      <group ref={foundation} position={[-0.63, 0.11, 0.45]} rotation={[0.025, 0.12, -0.12]}><ProductBody /></group>
      <group ref={brush} position={[0.68, -0.02, -0.08]} rotation={[-0.02, -0.14, 0.1]}><ProductBody brush /></group>
    </group>
  );
}

function EditorialStage({ paused, onReady, scrollProgress, variant }: { paused: boolean; onReady?: () => void; scrollProgress: RefObject<number>; variant: "centered" | "editorial" }) {
  const { viewport, size } = useThree();
  const wide = variant === "editorial" && size.width / size.height > 1.6;
  const offset = wide ? viewport.width * 0.23 : 0;
  return (
    <group position={[offset, 0, 0]}>
      <SceneBoundary fallback={null}>
        <Suspense fallback={null}><Lettering paused={paused} scrollProgress={scrollProgress} /></Suspense>
      </SceneBoundary>
      <FoundationStick paused={paused} onReady={onReady} scrollProgress={scrollProgress} />
      <ContactShadows position={[0.05, -2.13, 0]} opacity={0.24} scale={6} blur={2.6} far={4} resolution={256} frames={1} color="#685046" />
    </group>
  );
}

export default function KineticScene({ paused = false, onReady, className, variant = "editorial" }: SceneProps) {
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [supported, setSupported] = useState<boolean | null>(null);
  const [inViewport, setInViewport] = useState(true);
  const container = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);
  const contextCleanup = useRef<(() => void) | null>(null);

  useEffect(() => {
    let frame = 0;
    const measureProgress = () => {
      frame = 0;
      if (!container.current) return;
      const bounds = container.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      // Zero as this scene enters the viewport; one when it has fully passed.
      scrollProgress.current = MathUtils.clamp(
        (viewportHeight - bounds.top) / Math.max(viewportHeight + bounds.height, 1),
        0,
        1,
      );
    };
    const scheduleMeasure = () => { if (!frame) frame = requestAnimationFrame(measureProgress); };
    measureProgress();
    window.addEventListener("scroll", scheduleMeasure, { passive: true });
    window.addEventListener("resize", scheduleMeasure);
    const resizeObserver = new ResizeObserver(scheduleMeasure);
    if (container.current) resizeObserver.observe(container.current);
    return () => {
      window.removeEventListener("scroll", scheduleMeasure);
      window.removeEventListener("resize", scheduleMeasure);
      resizeObserver.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const probe = document.createElement("canvas");
    try {
      const context = probe.getContext("webgl2");
      setSupported(Boolean(context));
      context?.getExtension("WEBGL_lose_context")?.loseContext();
    } catch {
      setSupported(false);
    }
    const visibility = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", visibility);
    const observer = new IntersectionObserver(([entry]) => setInViewport(entry.isIntersecting));
    if (container.current) observer.observe(container.current);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      contextCleanup.current?.();
    };
  }, []);

  useEffect(() => { if (supported === false) onReady?.(); }, [supported, onReady]);

  const still = paused || reducedMotion || !visible || !inViewport;
  return (
    <div ref={container} className={className} style={{ width: "100%", height: "100%" }} role="img" aria-label="Two three-dimensional views of NURRIE's pearl ivory and rose gold double-ended stick, showing the white foundation and the soft blending brush">
      {supported !== true ? <ProductFallback /> : (
        <SceneBoundary fallback={<ProductFallback />}>
          <Canvas
            camera={{ position: [0, 0.07, 7.5], fov: 35 }}
            dpr={[1, 1.5]}
            frameloop={still ? "demand" : "always"}
            gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
            onCreated={({ gl }) => {
              const canvas = gl.domElement;
              const lost = () => setSupported(false);
              canvas.addEventListener("webglcontextlost", lost);
              contextCleanup.current = () => canvas.removeEventListener("webglcontextlost", lost);
            }}
            fallback={<ProductFallback />}
            style={{ touchAction: "pan-y" }}
          >
            <ambientLight intensity={0.5} />
            <directionalLight position={[-3, 5, 5]} intensity={2.8} color="#fffaf4" />
            <directionalLight position={[4, 1, -3]} intensity={2.2} color="#ffe4d1" />
            <Environment resolution={256} frames={1}>
              <mesh scale={40}><sphereGeometry args={[1, 24, 24]} /><meshBasicMaterial color="#a99b90" side={BackSide} /></mesh>
              <Lightformer intensity={5} position={[-3, 2, 4]} scale={[0.9, 6, 1]} rotation={[0, 0.4, 0]} />
              <Lightformer intensity={3} position={[4, 1, 1]} scale={[0.7, 5, 1]} rotation={[0, -Math.PI / 2, 0]} />
              <Lightformer intensity={3} position={[0, 5, -2]} scale={[5, 3, 1]} rotation={[Math.PI / 2, 0, 0]} />
              <Lightformer intensity={1.4} position={[0, 0, 6]} scale={[5, 5, 1]} />
              <Lightformer intensity={0.02} position={[-1.4, 0, 3]} scale={[0.24, 6, 1]} />
            </Environment>
            <EditorialStage paused={still} onReady={onReady} scrollProgress={scrollProgress} variant={variant} />
          </Canvas>
        </SceneBoundary>
      )}
    </div>
  );
}

