"use client";

import { useEffect, useState } from "react";
import { Gamepad2, AlertTriangle } from "lucide-react";

export default function Window3() {
    const [pos, setPos] = useState({ x: 50, y: 50 });
    const [score, setScore] = useState(0);

    // Handle keyboard movement
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const speed = 5;
            setPos(prev => {
                let newX = prev.x;
                let newY = prev.y;
                if (e.key === "ArrowUp" || e.key === "w") newY = Math.max(0, prev.y - speed);
                if (e.key === "ArrowDown" || e.key === "s") newY = Math.min(90, prev.y + speed);
                if (e.key === "ArrowLeft" || e.key === "a") newX = Math.max(0, prev.x - speed);
                if (e.key === "ArrowRight" || e.key === "d") newX = Math.min(95, prev.x + speed);

                // Very basic collision/score mechanic could go here

                return { x: newX, y: newY };
            });
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <div className="w-full h-full bg-[var(--neo-black)] text-[var(--neo-green)] p-6 flex flex-col relative overflow-hidden font-mono">
            {/* Top Nav Fallback */}
            <div className="flex justify-between items-center border-b-2 border-[var(--neo-green)] pb-4 mb-4 select-none">
                <div className="font-bold flex items-center gap-2">
                    <Gamepad2 /> LEVEL 1
                </div>
                <div className="flex gap-4 text-sm font-bold">
                    <button className="hover:bg-[var(--neo-green)] hover:text-[var(--neo-black)] px-2 transition-colors">Start</button>
                    <button className="hover:bg-[var(--neo-green)] hover:text-[var(--neo-black)] px-2 transition-colors">Options</button>
                </div>
            </div>

            <div className="flex-1 border-2 border-[var(--neo-green)] border-dashed relative">
                <div className="absolute top-4 left-4 opacity-50 text-sm">
                    Use WASD or Arrows to move.
                    <br />
                    (Requires focus / clicking inside)
                </div>

                {/* Character */}
                <div
                    className="absolute w-12 h-12 bg-[var(--neo-green)] text-[var(--neo-black)] font-black flex items-center justify-center transition-all duration-100 ease-out shadow-[0_0_15px_var(--neo-green)]"
                    style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                >
                    [O_O]
                </div>

                {/* Target Zone */}
                <div
                    className="absolute right-10 bottom-10 w-24 h-24 border-4 border-double border-[var(--neo-green)] flex items-center justify-center animate-pulse cursor-pointer group hover:bg-[var(--neo-green)]"
                    onClick={() => setScore(s => s + 100)}
                >
                    <span className="font-bold text-center group-hover:text-[var(--neo-black)] text-sm">CLICK TO<br />SCORE</span>
                </div>
            </div>

            <div className="mt-4 flex justify-between items-center font-bold">
                <span>SCORE: {score.toString().padStart(6, '0')}</span>
                <div className="flex items-center gap-2 text-[var(--neo-yellow)]">
                    <AlertTriangle size={16} /> Beta
                </div>
            </div>
        </div>
    );
}
