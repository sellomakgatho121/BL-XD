"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface GlitchTextProps {
    text: string;
    className?: string;
    intensity?: "low" | "medium" | "high";
    triggerOnHover?: boolean;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

export default function GlitchText({ text, className = "", intensity = "medium", triggerOnHover = false }: GlitchTextProps) {
    const [displayText, setDisplayText] = useState(text);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        // Determine corruption frequency
        // If triggerOnHover is true: only corrupt when hovering (and do it fast 50ms)
        // If triggerOnHover is false: use standard background interval
        const speed = isHovering && triggerOnHover ? 50 : (intensity === "high" ? 1000 : intensity === "medium" ? 2500 : 5000);
        const corruptionChance = isHovering && triggerOnHover ? 1.0 : 0.1; // 100% chance on hover

        const corruptInterval = setInterval(() => {
            // Logic for background glitch
            if (!isHovering && triggerOnHover) {
                if (displayText !== text) setDisplayText(text); // Reset if not hovering
                return;
            }

            if (Math.random() > corruptionChance) {
                setDisplayText(text);
                return;
            }

            const charsArray = text.split("");
            // scramble more chars on hover
            const scrambleCount = isHovering && triggerOnHover ? 3 : 1;

            for (let i = 0; i < scrambleCount; i++) {
                const randomIndex = Math.floor(Math.random() * charsArray.length);
                const randomChar = CHARS[Math.floor(Math.random() * CHARS.length)];
                if (charsArray[randomIndex] !== " ") {
                    charsArray[randomIndex] = randomChar;
                }
            }

            setDisplayText(charsArray.join(""));

            // Reset quickly unless hovering
            if (!isHovering) {
                setTimeout(() => setDisplayText(text), 100);
            }

        }, speed);

        return () => clearInterval(corruptInterval);
    }, [text, intensity, isHovering, triggerOnHover, displayText]);

    // Framer Motion variant for visual displacement (the "Shake")
    const shakeVariants = {
        idle: { x: 0, y: 0, skewX: 0 },
        glitch: {
            x: [0, -2, 2, -1, 1, 0],
            y: [0, 1, -1, 0],
            skewX: [0, 5, -5, 0],
            transition: {
                repeat: Infinity,
                repeatType: "mirror" as const, // Fix: Use consistent string literal
                duration: 0.2,
                repeatDelay: isHovering && triggerOnHover ? 0 : (intensity === "high" ? 0.5 : intensity === "medium" ? 2 : 5)
            }
        }
    };

    return (
        <motion.span
            className={`relative inline-block ${className}`}
            variants={shakeVariants}
            animate="glitch"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <span className="relative z-10">{displayText}</span>

            {/* RGB Split Layers (Ghosting) */}
            <motion.span
                className="absolute top-0 left-0 -z-10 opacity-50 text-siren-red mix-blend-screen"
                animate={{ x: [-2, 2, -1, 0], opacity: [0, 0.5, 0] }}
                transition={{ repeat: Infinity, duration: 0.2, repeatDelay: 3 }}
            >
                {displayText}
            </motion.span>
            <motion.span
                className="absolute top-0 left-0 -z-10 opacity-50 text-blue-500 mix-blend-screen"
                animate={{ x: [2, -2, 1, 0], opacity: [0, 0.5, 0] }}
                transition={{ repeat: Infinity, duration: 0.3, repeatDelay: 2.5 }}
            >
                {displayText}
            </motion.span>
        </motion.span>
    );
}
