"use client";

import { PerformanceMonitor } from "@react-three/drei";
import { useState, Suspense } from "react";

export default function AdaptiveCanvas({
    children,
    fallback
}: {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}) {
    const [dpr, setDpr] = useState(1);
    const [downgrade, setDowngrade] = useState(false);

    // If performance tanks, cut the 3D scene completely for the 2D fallback
    if (downgrade && fallback) return <>{fallback}</>;

    return (
        <Suspense fallback={null}>
            <PerformanceMonitor
                onIncline={() => setDpr(2)}
                onDecline={() => setDpr(0.5)}
                onFallback={() => setDowngrade(true)}  // Hard downgrade to 2D
                flipflops={3}
                step={0.5}
            >
                {children}
            </PerformanceMonitor>
        </Suspense>
    );
}
