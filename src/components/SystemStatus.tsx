"use client";

import { AlertTriangle, CheckCircle2, Radio, Server } from "lucide-react";

const STATUS_ITEMS = [
    { icon: Server, text: "AGENTS: PREPARING", color: "text-[var(--neo-cyan)]" },
    { icon: Radio, text: "NETWORK: ENCRYPTED", color: "text-[var(--neo-red)]" },
    { icon: CheckCircle2, text: "CHANNEL: SECURE", color: "text-[var(--neo-white)]" },
    { icon: AlertTriangle, text: "SYSTEM: BUILDING", color: "text-[var(--neo-red)]" },
    { icon: Server, text: "FRAMEWORK: ASSEMBLING", color: "text-[var(--neo-cyan)]" },
    { icon: Radio, text: "WAITLIST: PROCESSING", color: "text-[var(--neo-black)]" },
];

export default function SystemStatus() {
    return (
        <div className="w-full border-t border-b border-[var(--neo-white)]/10 bg-[var(--neo-black)] py-2 overflow-hidden flex relative z-20">
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[var(--neo-black)] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[var(--neo-black)] to-transparent z-10 pointer-events-none" />

            {/* Seamless scrolling marquee */}
            <div className="flex whitespace-nowrap gap-8 sm:gap-16 items-center animate-[scroll_30s_linear_infinite] w-max">
                {/* Duplicated for seamless loop */}
                {[...STATUS_ITEMS, ...STATUS_ITEMS, ...STATUS_ITEMS, ...STATUS_ITEMS].map((item, i) => (
                    <div key={i} className={`flex items-center gap-2 font-mono text-xs tracking-widest ${item.color} opacity-80 uppercase leading-none`}>
                        <item.icon size={12} strokeWidth={3} />
                        <span>{item.text}</span>
                    </div>
                ))}
            </div>

            {/* 
              Tailwind arbitrary keyframes:
              @keyframes scroll {
                0% { transform: translateX(0); }
                100% { transform: translateX(calc(-50% - 2rem)); } // Using -50% for 4 sets guarantees perfect loop
              }
              (Assumed to be in globals.css, if not we inline the animation)
            */}
            <style jsx global>{`
              @keyframes scroll {
                0% { transform: translateX(0); }
                100% { transform: translateX(calc(-50% - 2rem)); }
              }
            `}</style>
        </div>
    );
}
