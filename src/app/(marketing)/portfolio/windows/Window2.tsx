"use client";

import { useEffect, useRef, useState } from "react";
import { MousePointer2, Smile } from "lucide-react";

export default function Window2() {
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const [clickCount, setClickCount] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setCoords({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <div
            ref={containerRef}
            className="w-full h-full bg-[var(--neo-yellow)] flex items-center justify-center relative overflow-hidden cursor-none"
            onMouseMove={handleMouseMove}
            onClick={() => setClickCount(c => c + 1)}
        >
            {/* Custom Cursor */}
            <div
                className="absolute w-12 h-12 border-4 border-[var(--neo-black)] bg-[var(--neo-pink)] rounded-full pointer-events-none z-50 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out shadow-[4px_4px_0px_var(--neo-blue)]"
                style={{ left: coords.x, top: coords.y }}
            >
                <MousePointer2 size={16} className="text-[var(--neo-white)]" />
            </div>

            <div className="text-center z-10 p-8 border-8 border-[var(--neo-black)] bg-[var(--neo-white)] transform hover:rotate-2 transition-transform select-none neo-shadow shadow-[12px_12px_0px_var(--neo-blue)]">
                <Smile size={64} className="mx-auto mb-4" />
                <h2 className="text-5xl font-black uppercase mb-4 tracking-tighter">Joy in UI</h2>
                <p className="font-bold text-xl mb-6">Interaction breeds connection.</p>
                <div className="bg-[var(--neo-black)] text-[var(--neo-white)] p-4 font-mono font-bold">
                    CLICKS RECORDED: {clickCount}
                </div>
            </div>

            {/* Floating decorative elements reacting to mouse roughly */}
            <div
                className="absolute w-32 h-32 border-8 border-[var(--neo-black)] bg-transparent opacity-30 transition-all duration-500 rounded-full"
                style={{ left: coords.x * 0.2, top: coords.y * 0.8 }}
            />
            <div
                className="absolute w-48 h-12 border-4 border-[var(--neo-black)] bg-[var(--neo-blue)] opacity-50 transition-all duration-700"
                style={{ right: coords.x * 0.3, bottom: coords.y * 0.4 }}
            />
        </div>
    );
}
