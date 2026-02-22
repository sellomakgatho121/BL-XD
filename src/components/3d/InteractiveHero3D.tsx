"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import { SceneProvider } from "./SceneProvider";
import { FloatingGeometry } from "./FloatingGeometry";
import { WireframeGrid } from "./WireframeGrid";
import { motion } from "framer-motion";

interface InteractiveHero3DProps {
  className?: string;
  /** Show floating geometry shapes */
  showGeometry?: boolean;
  /** Show deforming wireframe grid */
  showGrid?: boolean;
  /** Number of floating shapes */
  shapeCount?: number;
}

/**
 * InteractiveHero3D
 * Full-screen 3D hero scene combining floating brutalist geometry and
 * a reactive wireframe grid. All elements respond to pointer movement.
 * Architecture: R3F Canvas with SceneProvider, layered under page content.
 */
export function InteractiveHero3D({
  className = "",
  showGeometry = true,
  showGrid = true,
  shapeCount = 10,
}: InteractiveHero3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Intersection observer - only render 3D when in viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Delay R3F init slightly to avoid blocking first paint
  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(timer);
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 z-0 gpu-accelerated ${className}`}
    >
      {isReady && (
        <motion.div
          className="w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <SceneProvider
            fov={45}
            cameraPosition={[0, 0.5, 6]}
            transparent
          >
            {showGeometry && (
              <FloatingGeometry
                count={shapeCount}
                spread={7}
                primaryColor="#D7FF00"
                secondaryColor="#FF003C"
                mouseInfluence={0.6}
              />
            )}
            {showGrid && (
              <WireframeGrid
                segments={35}
                size={12}
                color="#D7FF00"
                deformStrength={1.2}
                deformRadius={3}
                waveAmplitude={0.12}
              />
            )}
          </SceneProvider>
        </motion.div>
      )}

      {/* Gradient fade at bottom to blend into page content */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--background)] to-transparent z-10 pointer-events-none" />
      {/* Subtle side vignettes */}
      <div className="absolute inset-0 bg-radial-[at_center] from-transparent to-[var(--background)]/60 z-10 pointer-events-none" />
    </div>
  );
}
