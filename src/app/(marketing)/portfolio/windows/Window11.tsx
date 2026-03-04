"use client";

import { useEffect, useState, useRef } from "react";

export default function Window11() {
    const [weight, setWeight] = useState(400);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // We update the font weight based on mouse X position over the container
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;

            const { left, width } = containerRef.current.getBoundingClientRect();
            const relativeX = Math.max(0, Math.min(1, (e.clientX - left) / width));

            // Map 0-1 to Font Weight 100-900 (assuming Inter supports variable weights 100-900)
            const newWeight = Math.round(100 + (relativeX * 800));
            setWeight(newWeight);
        };

        const node = containerRef.current;
        if (node) {
            node.addEventListener("mousemove", handleMouseMove);
        }

        return () => {
            if (node) {
                node.removeEventListener("mousemove", handleMouseMove);
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="w-full h-full bg-[#fdfdfd] text-[#111] flex flex-col items-center justify-center p-8 relative overflow-hidden"
        >
            <div className="absolute top-8 text-sm font-mono uppercase tracking-widest opacity-50">
                Move cursor horizontally to mutate typography
            </div>

            <div className="text-center w-full">
                {/* Using standard variable font style if variable font implies weight. Next.js fonts like Inter are variable by default if properly configured. */}
                <h1
                    className="text-7xl md:text-[10rem] tracking-tighter transition-[font-weight] duration-100 ease-out select-none"
                    style={{ fontWeight: weight, fontVariationSettings: `"wght" ${weight}` }}
                >
                    FLUIDITY
                </h1>

                <p className="text-2xl mt-8 max-w-xl mx-auto font-serif italic text-gray-500">
                    Typography reacts precisely to proximity, morphing identity instantly.
                </p>
            </div>

            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center border-t py-4">
                <span className="font-mono text-sm">Font Weight Axis</span>
                <span className="font-mono text-xl font-bold bg-[#111] text-white px-4 py-1 rounded-full">{weight}</span>
            </div>
        </div>
    );
}
