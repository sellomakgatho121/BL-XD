"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function DistortionTransition({ children }: { children: ReactNode }) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                scale: 1.1,
                filter: "blur(20px) hue-rotate(90deg)" // Extreme initial state
            }}
            animate={{
                opacity: 1,
                scale: 1,
                filter: "blur(0px) hue-rotate(0deg)"
            }}
            transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1], // Expo out
                delay: 0.2
            }}
            className="relative will-change-transform"
        >
            {children}
        </motion.div>
    );
}
