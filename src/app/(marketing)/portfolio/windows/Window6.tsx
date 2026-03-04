"use client";

import { useEffect, useRef } from "react";

export default function Window6() {
    const gradientRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let rafId: number;
        const handleMouseMove = (e: MouseEvent) => {
            if (!gradientRef.current) return;
            const { left, top, width, height } = gradientRef.current.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;

            // Use requestAnimationFrame for smooth non-blocking updates
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                if (gradientRef.current) {
                    gradientRef.current.style.setProperty('--mouse-x', `${x * 100}%`);
                    gradientRef.current.style.setProperty('--mouse-y', `${y * 100}%`);
                }
            });
        };

        const el = gradientRef.current;
        if (el) {
            el.addEventListener('mousemove', handleMouseMove);
        }
        return () => {
            if (el) el.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <div
            ref={gradientRef}
            className="w-full h-full relative overflow-hidden flex items-center justify-center group"
            style={{
                // Default values for CSS variables
                '--mouse-x': '50%',
                '--mouse-y': '50%',
                background: `radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--neo-pink) 0%, var(--neo-blue) 40%, var(--neo-black) 100%)`
            } as React.CSSProperties}
        >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] mix-blend-overlay pointer-events-none" />

            <div className="z-10 text-center pointer-events-none p-8 border-4 border-[var(--neo-white)] bg-[var(--neo-black)]/40 backdrop-blur-md shadow-[10px_10px_0px_var(--neo-black)] mix-blend-hard-light">
                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-widest text-[var(--neo-white)] animate-pulse">Fluid</h2>
                <p className="font-bold text-xl mt-4 text-[var(--neo-yellow)] tracking-wider">Reacts to Movement</p>
            </div>
        </div>
    );
}
