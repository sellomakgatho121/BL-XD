"use client";

import { useEffect, useState } from "react";

export default function CRTOverlay() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="pointer-events-none fixed inset-0 z-50 h-full w-full overflow-hidden">
            {/* Scanlines */}
            <div
                className="absolute inset-0 z-10 opacity-10"
                style={{
                    background: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))",
                    backgroundSize: "100% 2px, 3px 100%"
                }}
            />

            {/* Flicker Animation Layer */}
            <div className="absolute inset-0 z-20 bg-white opacity-[0.02] animate-flicker"></div>

            {/* Vignette */}
            <div
                className="absolute inset-0 z-30"
                style={{
                    background: "radial-gradient(circle, rgba(0,0,0,0) 60%, rgba(0,0,0,0.6) 100%)"
                }}
            />

            {/* RGB Shift / Chromatic Aberration Edge (Simulated) */}
            <div className="absolute inset-0 z-40 mix-blend-screen opacity-30 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-1 bg-red-500/20 blur-[1px] transform translate-y-[2px]" />
                <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-500/20 blur-[1px] transform -translate-y-[2px]" />
            </div>

            <style jsx>{`
        @keyframes flicker {
          0% { opacity: 0.02; }
          5% { opacity: 0.05; }
          10% { opacity: 0.02; }
          15% { opacity: 0.06; }
          20% { opacity: 0.02; }
          50% { opacity: 0.02; }
          55% { opacity: 0.05; }
          60% { opacity: 0.02; }
          100% { opacity: 0.02; }
        }
        .animate-flicker {
          animation: flicker 0.15s infinite;
        }
      `}</style>
        </div>
    );
}
