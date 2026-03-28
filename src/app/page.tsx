"use client";

import { useState, useEffect } from "react";
import Scene from "@/components/blacklight/Scene";
import BrandSequence from "@/components/blacklight/BrandSequence";
import ComingSoon from "@/components/screens/ComingSoon";
import dynamic from "next/dynamic";

const MarketingPage = dynamic(() => import("@/components/screens/MarketingLanding"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-onyx flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-signal-lime/30 border-t-signal-lime rounded-full animate-spin" />
    </div>
  ),
});

const LAUNCH_DATE = "2026-06-01T00:00:00";

export default function Page() {
  const [sequenceComplete, setSequenceComplete] = useState(false);
  const [isLaunched, setIsLaunched] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const now = new Date();
    const launch = new Date(LAUNCH_DATE);
    setIsLaunched(now >= launch);
  }, []);

  if (!mounted) {
    return (
      <main className="relative w-screen h-screen overflow-hidden bg-onyx">
        <BrandSequence onComplete={() => {}} />
        <Scene />
      </main>
    );
  }

  if (isLaunched) {
    return <MarketingPage />;
  }

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-onyx">
      {!sequenceComplete && (
        <BrandSequence onComplete={() => setSequenceComplete(true)} />
      )}
      <Scene />
    </main>
  );
}
