"use client";

import { useEffect, useState } from "react";

/**
 * CRTOverlay
 * Simulates retro CRT scanlines, vignette, and chromatic aberration.
 * Performance: Removed the infinite 0.15s CSS flicker animation that forced
 * compositor repaints every ~7ms for a nearly invisible opacity change (0.02→0.04).
 * Static opacity is visually identical but eliminates continuous paint cost.
 */
export default function CRTOverlay() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="pointer-events-none fixed inset-0 z-50 h-full w-full overflow-hidden">
            {/* Scanlines — static background, no animation needed */}
            <div
                className="crt-scanlines absolute inset-0 z-10"
            />

            {/* Static flicker layer — fixed opacity, no animation loop */}
            <div className="absolute inset-0 z-20 opacity-[0.03] bg-white" />

            {/* Vignette */}
            <div className="crt-vignette absolute inset-0 z-30" />

            {/* RGB Shift / Chromatic Aberration Edge */}
            <div className="absolute inset-0 z-40 mix-blend-screen opacity-30 pointer-events-none">
                <div
                    className="absolute top-0 left-0 w-full h-1 bg-red-500/20 blur-[1px]"
                    style={{ transform: "translateY(2px)" }}
                />
                <div
                    className="absolute bottom-0 left-0 w-full h-1 bg-blue-500/20 blur-[1px]"
                    style={{ transform: "translateY(-2px)" }}
                />
            </div>
        </div>
    );
}
