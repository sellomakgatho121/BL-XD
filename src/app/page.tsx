"use client";

import { useState } from "react";
import Scene from "@/components/blacklight/Scene";
import BrandSequence from "@/components/blacklight/BrandSequence";

export default function Page() {
  const [sequenceComplete, setSequenceComplete] = useState(false);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-onyx">
      {/* 2D to 3D Pre-loader Sequence */}
      {!sequenceComplete && (
        <BrandSequence onComplete={() => setSequenceComplete(true)} />
      )}

      {/* The Interactive 3D Spatial Canvas (Now handles all UI via Drei HTML) */}
      <Scene />
    </main>
  );
}
