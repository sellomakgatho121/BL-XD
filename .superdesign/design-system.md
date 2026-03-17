# BL-XD Design System (Mantis-inspired)

## Foundation
- **Default mode**: dark
- **Visual language**: stark black/white, ultra-thin borders, rare neon accents, technical typography.

## Typography
- **Sans (structure / headlines / body)**: `Space Grotesk` via `--font-space-grotesk`
- **Mono (numbers / labels / metadata)**: `JetBrains Mono` via `--font-jetbrains-mono`
- **Usage**
  - Headlines: `font-sans` + tight tracking (often `tracking-tighter`)
  - Labels/metadata: `font-mono` + uppercase + wide tracking (e.g. `tracking-[0.18em]`)
  - Numbers: `font-mono` + `tabular-nums`

## Color tokens (CSS variables)
Defined in `src/app/globals.css`:
- **Background**: `--background` (onyx)
- **Foreground**: `--foreground` (spectral white)
- **Muted text**: `--spectral-dim`, `--spectral-muted`
- **Borders**: `--border` (white @ ~10%)
- **Accents (sparingly)**: `--signal-lime`, `--siren-red`

## Surfaces & borders
- **Cards/panels**: transparent/near-black with `backdrop-blur` and `border-white/10`
- **Radius**: `0px` everywhere (hard edges)

## Motion
- Prefer GPU-friendly transforms/opacity.
- Respect `prefers-reduced-motion` (already normalized in `globals.css`).

## UI primitives
- `Button`: sharp, thin-bordered, uppercase mono styling (see `src/components/ui/button.tsx`)
- `Card`: ultra-thin border, minimal blur (see `src/components/ui/card.tsx`)

