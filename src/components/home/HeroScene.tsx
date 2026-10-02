"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Image as DreiImage, Lightformer, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";

type Item = {
  url: string;
  pos: [number, number, number];
  h: number;
  ratio: number;
  rot?: number;
  speed?: number;
  mobile?: boolean;
};

const ITEMS: Item[] = [
  { url: "/img/hq/kera-cream.webp", pos: [-0.5, 0.05, 1.1], h: 2.3, ratio: 280 / 889, rot: 0.06, speed: 1.4, mobile: true },
  { url: "/img/hq/wax-red.webp", pos: [0.85, -0.8, 1.35], h: 1.3, ratio: 585 / 823, rot: -0.1, speed: 1.8, mobile: true },
  { url: "/img/hq/cck006.webp", pos: [1.05, 0.95, 0.9], h: 1.45, ratio: 758 / 900, rot: -0.35, speed: 1.2, mobile: true },
  { url: "/img/hq/curl-spray.webp", pos: [-1.3, -0.85, 0.75], h: 1.3, ratio: 217 / 799, rot: 0.18, speed: 2 },
  { url: "/img/hq/wax-blue.webp", pos: [-1.3, 1.2, -0.5], h: 0.9, ratio: 580 / 826, rot: 0.2, speed: 2.2 },
  { url: "/img/hq/kera-oil.webp", pos: [1.4, -0.05, 0.7], h: 0.95, ratio: 329 / 811, rot: -0.12, speed: 1.6 },
];

// Siçan mövqeyi bütün pəncərə üzrə izlənir (canvas üzərində olmasa da)
const pointer = { x: 0, y: 0 };

function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const { size } = useThree();
  // dar ekranlarda bütün kompozisiya kadra sığsın
  const fit = Math.min(1, size.width / size.height / 0.9);
  useFrame((_, dt) => {
    const g = group.current;
    if (!g) return;
    const scroll = Math.min(window.scrollY / window.innerHeight, 1.2);
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, pointer.x * 0.28 + scroll * 0.5, 3, dt);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -pointer.y * 0.16 + scroll * 0.15, 3, dt);
    g.position.y = THREE.MathUtils.damp(g.position.y, scroll * 1.2, 4, dt);
  });
  return (
    <group ref={group} scale={fit}>
      {children}
    </group>
  );
}

function Blob() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.z = state.clock.elapsedTime * 0.08;
  });
  return (
    <mesh ref={mesh} position={[0, 0.1, -1.8]} scale={1.75}>
      <icosahedronGeometry args={[1, 48]} />
      <MeshDistortMaterial color="#f1bcc6" roughness={0.12} metalness={0.32} distort={0.38} speed={1.6} envMapIntensity={1.4} />
    </mesh>
  );
}

function FloatingProduct({ item }: { item: Item }) {
  const ref = useRef<THREE.Mesh>(null);
  const [hover, setHover] = useState(false);
  useFrame((_, dt) => {
    if (!ref.current) return;
    const s = hover ? 1.08 : 1;
    ref.current.scale.x = THREE.MathUtils.damp(ref.current.scale.x, item.h * item.ratio * s, 6, dt);
    ref.current.scale.y = THREE.MathUtils.damp(ref.current.scale.y, item.h * s, 6, dt);
  });
  return (
    <Float speed={item.speed ?? 1.5} rotationIntensity={0.35} floatIntensity={0.9} floatingRange={[-0.08, 0.08]}>
      <DreiImage
        ref={ref}
        url={item.url}
        transparent
        toneMapped={false}
        position={item.pos}
        rotation={[0, 0, item.rot ?? 0]}
        scale={[item.h * item.ratio, item.h]}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      />
    </Float>
  );
}

function Ready({ onReady }: { onReady: () => void }) {
  useEffect(() => {
    const t = setTimeout(onReady, 120);
    return () => clearTimeout(t);
  }, [onReady]);
  return null;
}

export default function HeroScene({ onReady }: { onReady: () => void }) {
  // komponent yalnız brauzerdə yüklənir (ssr: false), ona görə window əlçatandır
  const [mobile] = useState(() => window.innerWidth < 640);
  const [visible, setVisible] = useState(true);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", move, { passive: true });
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    if (wrap.current) io.observe(wrap.current);
    return () => {
      window.removeEventListener("pointermove", move);
      io.disconnect();
    };
  }, []);

  const items = mobile ? ITEMS.filter((i) => i.mobile) : ITEMS;

  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        dpr={[1, mobile ? 1.5 : 2]}
        camera={{ position: [0, 0, 6.2], fov: 36 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={visible ? "always" : "never"}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 5]} intensity={1.4} color="#fff3ee" />
        <pointLight position={[-4, -2, 2]} intensity={18} color="#c2415e" />
        <Suspense fallback={null}>
          <Environment resolution={256} frames={1}>
            <Lightformer form="rect" intensity={3} position={[0, 4, 4]} scale={[8, 2, 1]} color="#ffffff" />
            <Lightformer form="ring" intensity={2.5} position={[-5, 0, 2]} scale={3} color="#f6c1cc" />
            <Lightformer form="rect" intensity={2} position={[5, -1, 1]} scale={[2, 6, 1]} color="#d9bd8c" />
            <Lightformer form="circle" intensity={1.5} position={[0, -4, 3]} scale={4} color="#8a7bea" />
          </Environment>
          <Rig>
            <Blob />
            {items.map((it) => (
              <FloatingProduct key={it.url} item={it} />
            ))}
            <Sparkles count={mobile ? 24 : 50} scale={[6, 4.5, 3]} size={2.6} speed={0.35} color="#d9bd8c" opacity={0.9} />
          </Rig>
          <Ready onReady={onReady} />
        </Suspense>
      </Canvas>
    </div>
  );
}
