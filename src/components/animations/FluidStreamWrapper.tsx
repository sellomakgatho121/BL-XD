"use client";

import { motion, useScroll, useTransform, useSpring, Variants } from "framer-motion";
import { useRef } from "react";

interface FluidStreamWrapperProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    staggerChildren?: number;
}

const streamVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 100,
        rotateX: 45, // Add a slight 3D rotation flip for entrance
        scale: 0.95
    },
    visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 20,
            mass: 1.2
        }
    }
};

/**
 * FluidStreamWrapper
 * Drives the continuous cinematic experience by orchestrating staggered, 
 * depth-aware entrances as elements scroll into view.
 */
export function FluidStreamWrapper({ children, className = "", delay = 0, staggerChildren = 0.1 }: FluidStreamWrapperProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Smooth the scroll progress to give it weight
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Parallax subtle drift effect tied to scroll
    const yDrift = useTransform(smoothProgress, [0, 1], ["0%", "-15%"]);

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
                visible: { transition: { staggerChildren, delayChildren: delay } }
            }}
            style={{ y: yDrift }}
            className={`gpu-accelerated ${className}`}
        >
            {/* We map over children to apply the streamVariants if this component is used as a parent to multiple items */}
            <motion.div variants={streamVariants} className="w-full h-full">
                {children}
            </motion.div>
        </motion.div>
    );
}
