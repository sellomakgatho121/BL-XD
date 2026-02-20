"use client";

import { useEffect, useRef, useState } from "react";
import { Application } from "@splinetool/runtime";
import { motion, AnimatePresence } from "framer-motion";

function SplineFallback() {
    return (
        <motion.div
            className="absolute inset-0 w-full h-full flex items-center justify-center bg-onyx border border-border"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="w-16 h-16 border-t-2 border-primary rounded-full animate-spin" />
        </motion.div>
    );
}

interface AsyncSplineCanvasProps {
    scene: string;
    className?: string;
}

/**
 * AsyncSplineCanvas
 * Loads Spline 3D scenes asynchronously using the raw @splinetool/runtime core engine.
 * This completely bypasses Next 15 ESM resolution errors found in the react wrapper.
 */
export function AsyncSplineCanvas({ scene, className = "" }: AsyncSplineCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let app: Application | null = null;
        let isActive = true;

        if (canvasRef.current) {
            // Initialize the core 3D engine
            app = new Application(canvasRef.current);
            app.load(scene)
                .then(() => {
                    if (isActive) {
                        setLoading(false);
                    }
                })
                .catch((error) => {
                    console.error("Failed to load Spline scene:", error);
                    if (isActive) {
                        setLoading(false);
                    }
                });
        }

        return () => {
            isActive = false;
            if (app) app.dispose();
        };
    }, [scene]);

    return (
        <div className={`relative w-full h-full ${className} gpu-accelerated`}>
            <AnimatePresence>
                {loading && <SplineFallback />}
            </AnimatePresence>

            {/* We apply pointer-events-auto so the canvas can capture interactions */}
            <div className="absolute inset-0 z-0 pointer-events-auto">
                <canvas ref={canvasRef} className="w-full h-full outline-none" style={{ display: "block" }} />
            </div>

            {/* A subtle overlay to integrate the 3D canvas with our harsh contrast environment */}
            <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
        </div>
    );
}
