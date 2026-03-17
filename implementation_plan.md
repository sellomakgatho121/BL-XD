# BL-XD Redesign Implementation Plan (Mantis.works Inspired)

This plan outlines the overhaul of the BL-XD design system to match the high-end, experiential aesthetic of Mantis.works.

## User Review Required
> [!IMPORTANT]
> Please review the core design tokens below. Mantis.works relies heavily on stark contrasts, sophisticated typography, and WebGL/3D elements. I will be adjusting our Tailwind CSS configuration to match this vibe.

## Proposed Design System (Mantis Aesthetic)

**1. Typography**
- **Primary (Sans-serif):** A clean, structural geometric sans (similar to *Denim*, e.g., Inter or Roboto Mono for numbers).
- **Secondary (Monospace):** A technical monospace font (similar to *Graebenbach Mono*, e.g., JetBrains Mono or Space Grotesk) for labels, metadata, and technical accents.

**2. Color Palette (Dark Mode Default)**
- **Background:** Deep rich black (`#050505`) with subtle grain textures.
- **Foreground:** Stark spectral white (`#FDFDFD`) and muted grays (`#888888`) for secondary text.
- **Accents:** We will retain the `signal-lime` and `siren-red` but use them much more sparingly, relying primarily on high-contrast black & white and 3D visual elements (from Three.js/Spline) to provide color.

**3. Layout & Animation**
- Heavy use of fluid, GPU-accelerated GSAP animations.
- Smooth scrolling (via Lenis).
- Unconventional grid layouts with negative space and large typography.
- Glassmorphism will be reduced in favor of stark, solid technical UI borders.

## Proposed Changes

### Configuration
#### [MODIFY] `src/app/globals.css`
- Strip out all current complex gradient themes.
- Implement the stark black/white scale.
- Update CSS variables to support the new monochromatic + neon accent scheme.

#### [MODIFY] `tailwind.config.ts` (if applicable, or `postcss` config for v4)
- Add new font families (Sans and Mono).
- Update the spacing and typography scales for massive headline text.

### Layouts & Primitives
#### [MODIFY] `src/components/ui/button.tsx`
- Change from traditional rounded buttons to sharp, technical, thin-bordered rectangular buttons with monochrome hover states.

#### [MODIFY] `src/components/ui/card.tsx`
- Remove soft shadows and distinct background colors.
- Use ultra-thin (`1px`) borders with `border-white/10` and `backdrop-blur` for a minimalist container.

### Blacklight Custom Components
#### [MODIFY] `src/components/blacklight/metric-card.tsx`
- Redesign to feature massive numbers (Mono font) and extremely minimal labels (Sans-serif uppercase).

#### [MODIFY] `src/components/blacklight/scanlines.tsx`
- Ensure CRT effects remain minimal and don't overwhelm the stark typography.

## Verification Plan

### Manual Verification
- Deploy to local dev server and visually inspect the Home page, checking the typography contrast and structural alignment against the mental model of a high-end Awwwards studio site.
- Verify that 3D elements (Three.js/Spline) still function correctly atop the new monochromatic CSS layer.
