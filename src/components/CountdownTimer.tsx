"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export default function CountdownTimer({ targetDate }: { targetDate: string }) {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +new Date(targetDate) - +new Date();
            let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

            if (difference > 0) {
                timeLeft = {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                };
            }
            return timeLeft;
        };

        const initialTimer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 0);

        const intervalTimer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => {
            clearTimeout(initialTimer);
            clearInterval(intervalTimer);
        };
    }, [targetDate]);

    return (
        <div className="flex flex-wrap gap-4 sm:gap-8 font-mono text-spectral-white">
            <TimeUnit value={timeLeft.days} label="CYCLES" />
            <TimeUnit value={timeLeft.hours} label="HOURS" />
            <TimeUnit value={timeLeft.minutes} label="MINS" />
            <TimeUnit value={timeLeft.seconds} label="SECS" />
        </div>
    );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
    // Pad with zero
    const formattedValue = value < 10 ? `0${value}` : value.toString();

    return (
        <div className="flex flex-col items-center">
            <div className="relative overflow-hidden bg-onyx border border-spectral-white/10 px-4 py-2 sm:px-6 sm:py-4">
                {/* Animated digit with glitch effect on change could go here, for now using AnimatePresence key */}
                <AnimatePresence mode="popLayout">
                    <motion.span
                        key={formattedValue}
                        initial={{ y: 20, opacity: 0, filter: "blur(5px)" }}
                        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                        exit={{ y: -20, opacity: 0, filter: "blur(5px)" }}
                        transition={{ duration: 0.3, ease: "backOut" }}
                        className="block text-4xl sm:text-6xl font-black tracking-tighter text-signal-lime"
                    >
                        {formattedValue}
                    </motion.span>
                </AnimatePresence>

                {/* Scanline decoration */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-20 pointer-events-none" />
            </div>
            <span className="mt-2 text-[10px] tracking-[0.2em] text-spectral-white/40">{label}</span>
        </div>
    );
}
