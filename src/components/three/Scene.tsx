"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { SuspenseFallback } from "./SuspenseFallback";

interface SceneProps {
  children: React.ReactNode;
  className?: string;
  camera?: {
    position: [number, number, number];
    fov?: number;
  };
}

export function Scene({ children, className = "", camera = { position: [0, 0, 5], fov: 50 } }: SceneProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={camera}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{
          background: "transparent",
        }}
      >
        <Suspense fallback={null}>
          {children}
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}

export function SceneWithFallback({ 
  children, 
  className = "", 
  camera = { position: [0, 0, 5], fov: 50 },
  fallbackClassName = ""
}: SceneProps & { fallbackClassName?: string }) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={camera}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{
          background: "transparent",
        }}
      >
        <Suspense fallback={<SuspenseFallback className={fallbackClassName} />}>
          {children}
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}

export { SuspenseFallback };
