"use client";

import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { Suspense, ReactNode } from "react";

interface SceneProviderProps {
  children: ReactNode;
  className?: string;
  /** Camera field of view */
  fov?: number;
  /** Camera position [x, y, z] */
  cameraPosition?: [number, number, number];
  /** Enable transparent background (overlays on page) */
  transparent?: boolean;
}

/**
 * SceneProvider
 * Shared React Three Fiber Canvas wrapper with performance-tuned defaults.
 * Uses devicePixelRatio clamping and flat tone mapping for the Blacklight aesthetic.
 */
export function SceneProvider({
  children,
  className = "",
  fov = 50,
  cameraPosition = [0, 0, 5],
  transparent = true,
}: SceneProviderProps) {
  return (
    <Canvas
      className={className}
      camera={{ position: cameraPosition, fov }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: transparent,
        powerPreference: "high-performance",
      }}
      flat
      style={{ background: transparent ? "transparent" : "#0A0A0A" }}
    >
      <Suspense fallback={null}>
        {children}
        <Preload all />
      </Suspense>
    </Canvas>
  );
}
