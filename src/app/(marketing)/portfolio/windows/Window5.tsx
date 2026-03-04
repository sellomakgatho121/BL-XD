"use client";

import { useRef, useEffect } from "react";
import { Box } from "lucide-react";

export default function Window5() {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div className="w-full h-full bg-[var(--neo-black)] text-[var(--neo-white)] flex flex-col items-center justify-center p-8 relative overflow-hidden">

            <div className="absolute top-4 left-4 font-mono text-sm tracking-widest uppercase opacity-50 z-10">
                WebGL / Spline Hybrid Test
            </div>

            {/* 2D Typography Layer */}
            <div className="text-center z-10 pointer-events-none mt-16">
                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter drop-shadow-[4px_4px_0px_var(--neo-black)]">
                    Dimensional
                </h2>
                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-[var(--neo-pink)] drop-shadow-[4px_4px_0px_var(--neo-black)] -mt-4">
                    Space
                </h2>
                <p className="mt-6 font-bold max-w-md mx-auto bg-[var(--neo-black)] p-4 border-2 border-[var(--neo-white)] pointer-events-auto shadow-[4px_4px_0px_var(--neo-blue)]">
                    Mix 2D sharp line art with optimized interactive 3D elements.
                </p>
            </div>

            {/* 3D Mockup Container (Would be Spline embed or R3F Canvas) */}
            <div
                ref={containerRef}
                className="absolute inset-0 w-full h-full flex items-center justify-center opacity-60 mix-blend-screen pointer-events-none"
            >
                <div className="w-[300px] h-[300px] border-8 border-[var(--neo-yellow)] flex items-center justify-center animate-spin-slow rounded-xl shadow-[0_0_50px_var(--neo-yellow)]">
                    <Box size={100} className="text-[var(--neo-yellow)] animate-pulse" />
                    <div className="absolute w-[400px] h-[400px] border-4 border-[var(--neo-blue)] border-dashed rounded-full animate-reverse-spin" />
                </div>
            </div>

            <div className="absolute bottom-8 right-8 z-10">
                <div className="bg-[var(--neo-white)] text-[var(--neo-black)] font-bold px-4 py-2 uppercase border-2 border-[var(--neo-black)] shadow-[4px_4px_0px_var(--neo-green)]">
                    FPS: 60 (Optimized)
                </div>
            </div>
        </div>
    );
}
