"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { useReducedMotion, useIsMobile } from "@/lib/hooks/useReducedMotion";

const BlacklightScene = dynamic(
  () => import("./BlacklightScene"),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-[#0A0A0A]" />,
  }
);

interface HeroCanvasProps {
  className?: string;
}

export function HeroCanvas({ className = "" }: HeroCanvasProps) {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  return (
    <div className={`absolute inset-0 ${className}`}>
      <Suspense fallback={<div className="absolute inset-0 bg-[#0A0A0A]" />}>
        <BlacklightScene isMobile={isMobile} reducedMotion={reducedMotion} />
      </Suspense>
    </div>
  );
}

export default HeroCanvas;
