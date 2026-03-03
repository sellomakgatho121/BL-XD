"use client";

import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Radio, Server } from "lucide-react";

const STATUS_ITEMS = [
    { icon: Server, text: "AGENTS: PREPARING", color: "text-signal-lime" },
    { icon: Radio, text: "NETWORK: ENCRYPTED", color: "text-blue-400" },
    { icon: CheckCircle2, text: "CHANNEL: SECURE", color: "text-spectral-white" },
    { icon: AlertTriangle, text: "SYSTEM: BUILDING", color: "text-siren-red" },
    { icon: Server, text: "FRAMEWORK: ASSEMBLING", color: "text-signal-lime" },
    { icon: Radio, text: "WAITLIST: PROCESSING", color: "text-blue-400" },
];

export default function SystemStatus() {
    return (
        <div className="w-full border-t border-b border-spectral-white/10 bg-onyx py-2 overflow-hidden flex relative z-20">
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-onyx to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-onyx to-transparent z-10" />

            <motion.div
                className="flex whitespace-nowrap gap-8 sm:gap-16 items-center"
                animate={{ x: [0, -1000] }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 30 // Slow scroll
                }}
            >
                {/* Duplicated for seamless loop */}
                {[...STATUS_ITEMS, ...STATUS_ITEMS, ...STATUS_ITEMS].map((item, i) => (
                    <div key={i} className={`flex items-center gap-2 font-mono text-xs tracking-widest ${item.color} opacity-80`}>
                        <item.icon size={12} />
                        <span>{item.text}</span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
