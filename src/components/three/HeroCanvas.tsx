"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamically import the 3D scene with SSR disabled
const BlacklightScene = dynamic(
  () => import("./BlacklightScene"),
  { 
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-[#0A0A0A]" />
  }
);

interface HeroCanvasProps {
  className?: string;
}

export function HeroCanvas({ className = "" }: HeroCanvasProps) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Suspense fallback={<div className="absolute inset-0 bg-[#0A0A0A]" />}>
        <BlacklightScene />
      </Suspense>
    </div>
  );
}

export default HeroCanvas;
