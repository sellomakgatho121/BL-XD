"use client";

import { ReactNode, useEffect, useState } from "react";

export default function DistortionTransition({ children }: { children: ReactNode }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div
            className={`relative will-change-transform transition-all duration-[800ms] ease-out delay-200 ${mounted
                    ? "opacity-100 scale-100 blur-none hue-rotate-0"
                    : "opacity-0 scale-110 blur-[20px] hue-rotate-90"
                }`}
        >
            {children}
        </div>
    );
}
