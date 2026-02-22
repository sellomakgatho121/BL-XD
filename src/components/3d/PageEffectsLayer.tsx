"use client";

import { MouseGlow } from "./MouseGlow";
import { InteractiveHero3D } from "./InteractiveHero3D";

export type EffectIntensity = "full" | "medium" | "subtle";

interface PageEffectsLayerProps {
  intensity: EffectIntensity;
  /** Override: show the full 3D hero scene (landing page only) */
  showHero?: boolean;
}

/**
 * Intensity presets for the Blacklight 3D effect system.
 * "full" = landing page (max everything)
 * "medium" = inner pages (services, portfolio, pricing, process)
 * "subtle" = functional pages (contact, blog)
 */
const INTENSITY_CONFIG = {
  full: {
    mouseGlow: { size: 500, opacity: 0.05, blur: 100 },
    hero: { shapeCount: 10, showGrid: true },
  },
  medium: {
    mouseGlow: { size: 350, opacity: 0.035, blur: 80 },
    hero: { shapeCount: 5, showGrid: false },
  },
  subtle: {
    mouseGlow: { size: 250, opacity: 0.02, blur: 60 },
    hero: null,
  },
} as const;

/**
 * PageEffectsLayer
 * Renders the appropriate level of 3D/interactive effects based on intensity.
 * Follows the "ripple outward" principle: most intense on landing page,
 * decreasing as the user navigates deeper into the site.
 */
export function PageEffectsLayer({
  intensity = "medium",
  showHero = false,
}: PageEffectsLayerProps) {
  const config = INTENSITY_CONFIG[intensity];

  return (
    <>
      {/* Cursor-following glow - always present, varies in size/opacity */}
      <MouseGlow
        color="#D7FF00"
        size={config.mouseGlow.size}
        opacity={config.mouseGlow.opacity}
        blur={config.mouseGlow.blur}
      />

      {/* 3D Hero scene - only for pages that request it */}
      {showHero && config.hero && (
        <InteractiveHero3D
          showGeometry={true}
          showGrid={config.hero.showGrid}
          shapeCount={config.hero.shapeCount}
        />
      )}
    </>
  );
}
