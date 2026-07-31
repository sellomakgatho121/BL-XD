"use client";

import { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function FloatingGeom({
  position,
  shape,
  color,
  scale = 1,
  speed = 1,
  scrollProgress,
}: {
  position: [number, number, number];
  shape: "box" | "icosahedron" | "octahedron" | "torus";
  color: string;
  scale?: number;
  speed?: number;
  scrollProgress: { current: number };
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const baseZ = useRef(position[2]);

  useFrame((state) => {
    if (!mesh.current) return;
    const scroll = scrollProgress.current;
    const scrollFactor = 1 + scroll * 2;

    mesh.current.rotation.x = state.clock.elapsedTime * 0.1 * speed * scrollFactor;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.15 * speed * scrollFactor;
    mesh.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 0.3 * speed) * 0.3;
    mesh.current.position.z = baseZ.current - scroll * 3;
  });

  const geom = useMemo(() => {
    switch (shape) {
      case "box":
        return <boxGeometry args={[1.2, 1.2, 1.2]} />;
      case "icosahedron":
        return <icosahedronGeometry args={[0.9, 0]} />;
      case "octahedron":
        return <octahedronGeometry args={[0.8, 0]} />;
      case "torus":
        return <torusGeometry args={[1, 0.3, 16, 32]} />;
    }
  }, [shape]);

  return (
    <Float speed={1.5 * speed} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={mesh} position={position} scale={scale}>
        {geom}
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.25}
          roughness={0.2}
          metalness={0.9}
          wireframe
          distort={0.2}
        />
      </mesh>
    </Float>
  );
}

// 3D GLB Model Centerpiece — loads and displays the brand's 3D model
function GLBModel({ scrollProgress }: { scrollProgress: { current: number } }) {
  const groupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  const { scene } = useGLTF("/centerpiece.glb");
  const modelRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    if (!groupRef.current || !scene) return;
    // Clone the loaded scene so we own it
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    groupRef.current.add(clone);
    modelRef.current = clone;
    return () => {
      if (modelRef.current && groupRef.current) {
        groupRef.current.remove(modelRef.current);
      }
    };
  }, [scene]);

  useFrame((state) => {
    if (!groupRef.current || !modelRef.current) return;
    const scroll = scrollProgress.current;
    const t = state.clock.elapsedTime;

    modelRef.current.rotation.y = t * 0.03 + pointer.x * 0.5 + scroll * 0.2;
    modelRef.current.rotation.x = Math.sin(t * 0.02) * 0.04 - pointer.y * 0.25;

    groupRef.current.position.y = Math.sin(t * 0.12) * 0.08;
    const s = 1 + scroll * 0.15;
    groupRef.current.scale.setScalar(s);
  });

  return (
    <group ref={groupRef} position={[0, 0, -0.5]} />
  );
}

// Loading placeholder while GLB loads
function ModelFallback() {
  return (
    <mesh>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshPhysicalMaterial color="#1E1E35" transparent opacity={0.5} />
    </mesh>
  );
}

function CameraController({ scrollProgress }: { scrollProgress: { current: number } }) {
  const { camera } = useThree();

  useFrame(() => {
    const p = scrollProgress.current;
    camera.position.y = p * 1.5;
    camera.position.z = 10 - p * 4;
    camera.lookAt(0, 0, -3);
  });

  return null;
}

function Scene({ scrollProgress }: { scrollProgress: { current: number } }) {
  const shapes: {
    position: [number, number, number];
    shape: "box" | "icosahedron" | "octahedron" | "torus";
    color: string;
    scale: number;
    speed: number;
  }[] = useMemo(
    () => [
      { position: [-2.5, 1.2, -4], shape: "icosahedron", color: "#CCFF00", scale: 1.2, speed: 0.8 },
      { position: [2.8, -0.8, -3], shape: "octahedron", color: "#00F0FF", scale: 1, speed: 1.0 },
      { position: [-1.8, -1.5, -6], shape: "torus", color: "#CCFF00", scale: 1.3, speed: 0.6 },
      { position: [2, 1.8, -5], shape: "box", color: "#FF006E", scale: 0.9, speed: 1.2 },
      { position: [0, -1, -7], shape: "icosahedron", color: "#00F0FF", scale: 1.5, speed: 0.5 },
    ],
    []
  );

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#CCFF00" />
      <pointLight position={[-10, -10, -5]} intensity={0.3} color="#00F0FF" />
      <Suspense fallback={<ModelFallback />}>
        <GLBModel scrollProgress={scrollProgress} />
      </Suspense>
      {shapes.map((s, i) => (
        <FloatingGeom key={i} {...s} scrollProgress={scrollProgress} />
      ))}
      <CameraController scrollProgress={scrollProgress} />
    </>
  );
}

function WebGLCheck({ children }: { children: React.ReactNode }) {
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
      if (!gl) setSupported(false);
    } catch {
      setSupported(false);
    }
  }, []);

  if (!supported) {
    return (
      <div className="absolute inset-0 bg-gradient-to-b from-bl-deep via-bl-surface to-bl-deep" />
    );
  }

  return <>{children}</>;
}

export default function HeroScene() {
  const scrollProgress = useRef(0);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: triggerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          scrollProgress.current = self.progress;
        },
      });
    }, triggerRef.current ?? undefined);

    return () => ctx.revert();
  }, []);

  return (
    <WebGLCheck>
      <div ref={triggerRef} className="absolute inset-0 -z-10">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 75, near: 0.1, far: 30 }}
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            failIfMajorPerformanceCaveat: false,
          }}
          style={{ background: "transparent" }}
        >
          <Scene scrollProgress={scrollProgress} />
        </Canvas>
      </div>
    </WebGLCheck>
  );
}
