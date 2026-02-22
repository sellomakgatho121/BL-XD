# Blacklight Web Designs: Design System Reference

> **Version:** 1.0
> **Last Updated:** February 2026
> **Status:** Active

---

## Core Philosophy

The Blacklight design system rejects the "Modern SaaS Safe Harbor" -- no bento grids, no mesh gradients, no safe blues. Every element conveys precision, performance, and psychological intent. The system draws inspiration from terminal interfaces, circuit boards, and forensic tools: sharp, functional, and visually commanding.

---

## Color System: "The Midnight Spectrum"

### Primary Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--onyx` | `#0A0A0A` | Base background, deepest black with grain texture |
| `--signal-lime` | `#D7FF00` | Primary accent, CTAs, active states, positive metrics |
| `--siren-red` | `#FF003C` | Urgency, alerts, destructive actions, status badges |
| `--spectral-white` | `#FDFDFD` | Primary text, pure contrast |

### Extended Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--onyx-light` | `#1A1A1A` | Card backgrounds, elevated surfaces |
| `--signal-lime-dim` | `rgba(215, 255, 0, 0.1)` | Subtle highlight backgrounds |
| `--siren-red-dim` | `rgba(255, 0, 60, 0.1)` | Alert backgrounds |
| `--spectral-dim` | `rgba(253, 253, 253, 0.6)` | Secondary text |
| `--spectral-muted` | `rgba(253, 253, 253, 0.4)` | Tertiary text, labels |
| `--border` | `rgba(253, 253, 253, 0.08)` | Borders, dividers |

### Rules
- **No purple.** Ever.
- **No safe blue** as primary. Blue-400 acceptable only as a supporting system status color.
- Selection highlight: `bg-signal-lime text-onyx` on all pages.

---

## Typography: "Command & Control"

### Scale

| Size | Class | Usage |
|------|-------|-------|
| 96px | `text-8xl` | Hero headlines (desktop) |
| 64px | `text-7xl` | Hero headlines (tablet) |
| 48px | `text-5xl` | Section headlines |
| 32px | `text-4xl` | Sub-headlines |
| 24px | `text-2xl` | Card titles |
| 20px | `text-xl` | Large body |
| 16px | `text-base` | Body |
| 14px | `text-sm` | Small text, nav links |
| 12px | `text-xs` | Labels, mono captions |
| 10px | `text-[10px]` | Micro labels, footer metadata |

### Font Families

- **Display/Headlines:** Geist Sans (`font-black`, weight 900, tracking-tighter)
- **Technical/Mono:** Geist Mono (`font-mono`, for labels, metrics, code, status text)
- **Body:** Geist Sans (weight 400-600, leading-relaxed)

### Rules
- Headlines always use `tracking-tighter` (negative letter-spacing)
- Labels and captions always uppercase: `uppercase tracking-wider` or `tracking-widest`
- Technical data uses `font-mono`

---

## Geometry: "Technical Sharpness"

### Border Radius
- **Default:** `0px` (brutalist, sharp edges everywhere)
- **Exception:** Scroll indicator pill (`rounded-full`)
- All Shadcn UI components overridden to `--radius: 0px`

### Layout Patterns
- **Asymmetric grids:** `grid-cols-[1fr_400px]` (70/30 hero split)
- **Staggered cards:** 2-column with alternating alignment
- **Negative space:** Used as a weapon to create tension
- **Max width:** `max-w-7xl` (1280px) for content containment

### Borders
- Default: `border-[var(--border)]` (8% white opacity)
- Hover: `border-[var(--signal-lime)]/50`
- Active: `border-[var(--signal-lime)]`

---

## Motion System

### Easing Functions

| Name | Value | Usage |
|------|-------|-------|
| Expo Out | `[0.16, 1, 0.3, 1]` | Entrance animations |
| Elastic | `[0.34, 1.56, 0.64, 1]` | Interactive feedback |
| Expo In | `[0.7, 0, 0.84, 0]` | Exit animations |

### Duration Scale

| Name | Duration | Usage |
|------|----------|-------|
| Micro | 150ms | Button hover, icon toggle |
| Standard | 300ms | Page element transitions |
| Dramatic | 800ms | Hero entrance, page distortion |
| Cinematic | 1000ms+ | Showcase gallery transitions |

### Animation Patterns

- **Staggered reveals:** Children animate in with `delay: i * 0.1`
- **Scroll-triggered:** Use `whileInView` with `viewport={{ once: true }}`
- **Distortion entrance:** `DistortionTransition` component (blur + hue-rotate)
- **Glitch text:** `GlitchText` component with intensity levels (low/medium/high)
- **Gradient pulse:** `animate-pulse` on blurred gradient backgrounds

---

## Signature Components

### Visual Effects (always present)
1. **GrainOverlay** -- 3% opacity, fixed position grain texture
2. **Scanlines** -- CRT-style horizontal/vertical lines
3. **Grid Pattern** -- Fixed 40px grid, 15% opacity
4. **Selection Colors** -- `selection:bg-[var(--signal-lime)] selection:text-[var(--onyx)]`

### Interactive Elements
1. **GlitchText** -- Text with randomized character replacement on hover
2. **QuantumField** -- Particle/node system with connecting lines
3. **ShowcaseGallery** -- Auto-rotating interactive demo carousel
4. **SystemStatus** -- Horizontal scrolling ticker bar
5. **DistortionTransition** -- Page entrance with blur/hue-rotate animation

### UI Primitives
- All buttons: `rounded-none font-mono uppercase tracking-wider`
- Primary CTA: `bg-[var(--signal-lime)] text-[var(--onyx)]`
- Secondary CTA: `border-[var(--spectral-white)]/20`
- Cards: `border border-[var(--border)] bg-[var(--card)]` with hover glow

---

## Page Structure Template

Every marketing page follows this structure:

```
<GrainOverlay />
<Scanlines />
<Grid Pattern Background />
<Navigation />
<DistortionTransition>
  <Hero Section />
  <SystemStatus /> (optional)
  <Content Sections />
  <CTA Section />
</DistortionTransition>
<Footer />
```

---

## Responsive Breakpoints

| Breakpoint | Width | Context |
|-----------|-------|---------|
| Default | < 640px | Mobile first |
| `sm` | 640px | Small tablets |
| `md` | 768px | Tablets, 2-column layouts |
| `lg` | 1024px | Desktop, hero split layout |
| `xl` | 1280px | Wide desktop, TOC sidebar |

---

## Accessibility Standards

- **WCAG AA** minimum, **AAA** targeted
- All interactive elements keyboard accessible
- Focus rings: `ring-[var(--signal-lime)]`
- Color contrast: Signal Lime on Onyx passes AAA (contrast ratio > 7:1)
- Screen reader text provided for icon-only buttons
- Motion: Respect `prefers-reduced-motion` media query
