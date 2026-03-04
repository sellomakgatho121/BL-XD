"use client";

import { ReactNode } from "react";

const grainAnimation = `
  @keyframes grain-shift {
    0% { background-position: 0% 0%; }
    100% { background-position: 100% 100%; }
  }
`;

interface GrainOverlayProps {
  opacity?: number;
  blendMode?: "normal" | "multiply" | "overlay" | "soft-light";
}

export default function GrainOverlay({
  opacity = 0.05,
  blendMode = "overlay",
}: GrainOverlayProps) {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9998]"
      style={{
        opacity,
        mixBlendMode: blendMode,
        backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
        transform: "translateZ(0)",
      }}
    />
  );
}

// Alternative: Animated grain component for more dynamic texture
export function AnimatedGrain({ opacity = 0.03 }: { opacity?: number }) {
  return (
    <>
      <style>{`@keyframes grain-shift { 0% { background-position: 0% 0%; } 100% { background-position: 100% 100%; } }`}</style>
      <div
        className="pointer-events-none fixed inset-0 z-[9998]"
        style={{
          opacity,
          backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
          transform: "translateZ(0)",
          animation: "grain-shift 0.5s linear infinite alternate",
        }}
      />
    </>
  );
}
