"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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
 * Performance: Uses IntersectionObserver to defer WebGL init until canvas is near-viewport.
 * Uses requestIdleCallback to yield to critical render work.
 */
export function AsyncSplineCanvas({ scene, className = "" }: AsyncSplineCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const appRef = useRef<Application | null>(null);
    const [loading, setLoading] = useState(true);
    const [inView, setInView] = useState(false);

    // IntersectionObserver: only init Spline when within 200px of viewport
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "200px" }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    // Initialize Spline only after inView triggers
    useEffect(() => {
        if (!inView || !canvasRef.current) return;

        let isActive = true;

        const initSpline = () => {
            if (!canvasRef.current || !isActive) return;

            const app = new Application(canvasRef.current);
            appRef.current = app;

            app.load(scene)
                .then(() => {
                    if (isActive) setLoading(false);
                })
                .catch((error) => {
                    console.error("Failed to load Spline scene:", error);
                    if (isActive) setLoading(false);
                });
        };

        // Yield to critical render work via requestIdleCallback
        if ("requestIdleCallback" in window) {
            const id = requestIdleCallback(initSpline, { timeout: 3000 });
            return () => {
                isActive = false;
                cancelIdleCallback(id);
                if (appRef.current) appRef.current.dispose();
            };
        } else {
            // Fallback for Safari
            const timer = setTimeout(initSpline, 100);
            return () => {
                isActive = false;
                clearTimeout(timer);
                if (appRef.current) appRef.current.dispose();
            };
        }
    }, [inView, scene]);

    return (
        <div ref={containerRef} className={`relative w-full h-full ${className} gpu-accelerated`}>
            <AnimatePresence>
                {loading && <SplineFallback />}
            </AnimatePresence>

            <div className="absolute inset-0 z-0 pointer-events-auto">
                <canvas ref={canvasRef} className="w-full h-full outline-none" style={{ display: "block" }} />
            </div>

            <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
        </div>
    );
}
