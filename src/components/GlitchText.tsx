"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef, useCallback, memo } from "react";

interface GlitchTextProps {
    text: string;
    className?: string;
    intensity?: "low" | "medium" | "high";
    triggerOnHover?: boolean;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

// Memoized component to prevent unnecessary re-renders
const GlitchText = memo(function GlitchText({ 
    text, 
    className = "", 
    intensity = "medium", 
    triggerOnHover = false 
}: GlitchTextProps) {
    const [displayText, setDisplayText] = useState(text);
    const [isHovering, setIsHovering] = useState(false);
    const [isGlitching, setIsGlitching] = useState(false);
    const frameRef = useRef<number | undefined>(undefined);
    const lastTimeRef = useRef(0);
    const textRef = useRef(text);
    const glitchCountRef = useRef(0);

    // Keep text ref in sync without causing re-renders
    useEffect(() => {
        textRef.current = text;
    }, [text]);

    // Glitch effect - optimized with frame skipping and batched updates
    useEffect(() => {
        // Don't run if triggerOnHover is true and we're not hovering
        if (triggerOnHover && !isHovering) {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }
            return;
        }

        const glitchSpeed = intensity === "high" ? 60 : intensity === "medium" ? 100 : 150;
        const numCharsToChange = intensity === "high" ? 2 : intensity === "medium" ? 1 : 1;
        const maxGlitchesBeforeReset = 8; // Reset text periodically to prevent drift

        const glitch = (timestamp: number) => {
            if (timestamp - lastTimeRef.current > glitchSpeed) {
                setIsGlitching(true);
                glitchCountRef.current++;
                
                // Scramble characters
                const chars = textRef.current.split("");
                const changedIndices = new Set<number>();
                
                for (let i = 0; i < numCharsToChange && changedIndices.size < chars.length; i++) {
                    let idx;
                    do {
                        idx = Math.floor(Math.random() * chars.length);
                    } while (changedIndices.has(idx) && chars[idx] === " ");
                    
                    if (chars[idx] !== " ") {
                        changedIndices.add(idx);
                        chars[idx] = CHARS[Math.floor(Math.random() * CHARS.length)];
                    }
                }
                
                setDisplayText(chars.join(""));
                lastTimeRef.current = timestamp;
                
                // Periodically reset to prevent text from becoming completely scrambled
                if (glitchCountRef.current >= maxGlitchesBeforeReset) {
                    glitchCountRef.current = 0;
                    setDisplayText(textRef.current);
                    setIsGlitching(false);
                }
            }
            frameRef.current = requestAnimationFrame(glitch);
        };

        frameRef.current = requestAnimationFrame(glitch);
        
        return () => {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }
        };
    }, [isHovering, triggerOnHover, intensity]);

    const handleMouseEnter = useCallback(() => {
        setIsHovering(true);
        glitchCountRef.current = 0;
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsHovering(false);
        // Immediately reset text and stop glitching
        setDisplayText(textRef.current);
        setIsGlitching(false);
        glitchCountRef.current = 0;
        if (frameRef.current) {
            cancelAnimationFrame(frameRef.current);
        }
    }, []);

    return (
        <motion.span
            className={`relative inline-block ${className}`}
            animate={isGlitching ? {
                x: [0, -1, 1, 0],
                skewX: [0, 1, -1, 0],
            } : {
                x: 0,
                skewX: 0,
            }}
            transition={{ duration: 0.08 }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ willChange: "transform" }}
        >
            <span className="relative z-10">
                {displayText}
            </span>

            {/* Ghost layers - simplified for performance */}
            {isGlitching && (
                <>
                    <span
                        className="absolute top-0 left-0 -z-10 text-siren-red opacity-50"
                        style={{ transform: "translateX(-1px)" }}
                    >
                        {displayText}
                    </span>
                    <span
                        className="absolute top-0 left-0 -z-10 text-blue-500 opacity-50"
                        style={{ transform: "translateX(1px)" }}
                    >
                        {displayText}
                    </span>
                </>
            )}
        </motion.span>
    );
});

export default GlitchText;
