"use client";

import { motion } from "framer-motion";
import { AsyncSplineCanvas } from "@/components/canvas/AsyncSplineCanvas";

/**
 * HeroBrutalist3D
 * Architecture: Option B (Typographic Brutalism + 3D)
 * Execution: Extreme typography scale overlapping a 3D Spline canvas. No safe-harbor split screens.
 */
export function HeroBrutalist3D() {
    return (
        <section className="relative w-full h-screen overflow-hidden bg-background">
            {/* 
        The 3D Canvas Layer 
        Using a placeholder Spline scene (a generic high-quality cube/shape animation) 
        This is placed firmly in the Z-background but allowed to bleed through the typography.
      */}
            <div className="absolute inset-0 z-0">
                <AsyncSplineCanvas
                    scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
                    className="opacity-90 mix-blend-screen"
                />
            </div>

            {/* 
        The Typographic Brutalism Layer
        Massive text, absolute positioning to break grid expectations, brutalist font weights.
      */}
            <div className="relative z-10 w-full h-full flex flex-col justify-end p-6 md:p-12 lg:p-24 pointer-events-none">

                <motion.div
                    initial={{ opacity: 0, y: 100, clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)" }}
                    animate={{ opacity: 1, y: 0, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                >
                    <h1 className="text-[12vw] leading-[0.85] font-black tracking-tighter text-foreground uppercase mix-blend-exclusion">
                        Radical <br />
                        <span className="text-primary">Physics.</span>
                    </h1>
                </motion.div>

                <motion.div
                    className="mt-8 md:mt-12 flex justify-between items-end w-full max-w-7xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                >
                    <p className="max-w-md text-sm md:text-base font-medium tracking-wide text-foreground/80 lowercase">
                        [ discarding safe harbors. engineering highly interactive, zero-radius immersive digital architecture. ]
                    </p>

                    <motion.button
                        className="pointer-events-auto group relative px-8 py-4 bg-foreground text-background font-bold tracking-widest uppercase text-xs overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="relative z-10 transition-colors duration-300 group-hover:text-primary">Enter Depth</span>
                        <div className="absolute inset-0 z-0 bg-background translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                    </motion.button>
                </motion.div>

            </div>
        </section>
    );
}
