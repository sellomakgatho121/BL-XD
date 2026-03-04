"use client";

import { useEffect, useState } from "react";

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
        <div className="flex flex-wrap gap-4 sm:gap-8 font-mono text-[var(--neo-white)]">
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

    // Use a unique key to force re-render and trigger animation on value change
    return (
        <div className="flex flex-col items-center">
            <div className="relative overflow-hidden bg-[var(--neo-black)] border border-[var(--neo-cyan)]/20 px-4 py-2 sm:px-6 sm:py-4 shadow-[4px_4px_0px_var(--neo-cyan)]">
                <span
                    key={formattedValue}
                    className="block text-4xl sm:text-6xl font-black tracking-tighter text-[var(--neo-cyan)] animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-300"
                >
                    {formattedValue}
                </span>

                {/* Scanline decoration */}
                <div className="absolute inset-0 bg-[var(--neo-cyan)]/5 pointer-events-none animate-[pulse_2s_ease-in-out_infinite]" />
            </div>
            <span className="mt-3 text-[10px] tracking-[0.2em] font-bold text-[var(--neo-white)]/80 uppercase">{label}</span>
        </div>
    );
}
