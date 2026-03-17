# Theme & Tokens

## `src/app/globals.css`
```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));

:root {
  /* Mantis Aesthetic - High Contrast Monochrome */
  --onyx: #050505;
  --onyx-light: #0d0d0d;
  --spectral-white: #fdfdfd;
  --spectral-dim: #888888;
  --spectral-muted: #9a9a9a;
  --signal-lime: #D7FF00; /* Keeping as rare accent */
  --signal-lime-dim: rgba(215, 255, 0, 0.12);
  --siren-red: #FF003C;   /* Keeping as rare accent */

  /* Hard Edges */
  --radius: 0px;
  --radius-sm: 0px;
  --radius-md: 0px;
  --radius-lg: 0px;

  /* Shadcn - Primitive Tokens */
  --background: var(--onyx);
  --foreground: var(--spectral-white);
  --card: rgba(13, 13, 13, 0.35);
  --card-foreground: var(--spectral-white);
  --popover: rgba(13, 13, 13, 0.72);
  --popover-foreground: var(--spectral-white);

  /* High contrast accents */
  --primary: var(--spectral-white);
  --primary-foreground: var(--onyx);
  --secondary: #1a1a1a;
  --secondary-foreground: var(--spectral-white);
  --muted: #1a1a1a;
  --muted-foreground: #888888;
  --accent: #262626;
  --accent-foreground: var(--spectral-white);
  --destructive: #FF003C;
  --border: rgba(255, 255, 255, 0.1);
  --input: rgba(255, 255, 255, 0.15);
  --ring: var(--spectral-white);

  /* Charts */
  --chart-1: #ffffff;
  --chart-2: #888888;
  --chart-3: #D7FF00;
  --chart-4: #444444;
  --chart-5: #222222;
}

/* Dark mode matches root exactly, enforcing dark mode by default aesthetic */
.dark {
  --background: var(--onyx);
  --foreground: var(--spectral-white);
  --card: rgba(13, 13, 13, 0.35);
  --card-foreground: var(--spectral-white);
  --popover: rgba(13, 13, 13, 0.72);
  --popover-foreground: var(--spectral-white);
  --primary: var(--spectral-white);
  --primary-foreground: var(--onyx);
  --secondary: #1a1a1a;
  --secondary-foreground: var(--spectral-white);
  --muted: #1a1a1a;
  --muted-foreground: #888888;
  --accent: #262626;
  --accent-foreground: var(--spectral-white);
  --destructive: #FF003C;
  --border: rgba(255, 255, 255, 0.1);
  --input: rgba(255, 255, 255, 0.15);
  --ring: var(--spectral-white);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-onyx: var(--onyx);
  --color-spectral-white: var(--spectral-white);

  --font-sans: var(--font-space-grotesk), var(--font-inter), system-ui, sans-serif;
  --font-mono: var(--font-jetbrains-mono), monospace;

  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar: var(--sidebar);
  --color-chart-5: var(--chart-5);
  --color-chart-4: var(--chart-4);
  --color-chart-3: var(--chart-3);
  --color-chart-2: var(--chart-2);
  --color-chart-1: var(--chart-1);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --radius-none: 0px;
  --radius-sm: 0px;
  --radius-md: 0px;
  --radius-lg: 0px;
  --radius-xl: 0px;
  --radius-2xl: 0px;
  --radius-3xl: 0px;
  --radius-4xl: 0px;
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}

/* Performance and Base Rules */
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: var(--font-space-grotesk), var(--font-inter), system-ui, sans-serif;
  margin: 0;
  background-color: var(--background);
  color: var(--foreground);
  position: relative;
  /* GPU acceleration for smoother scrolling */
  overscroll-behavior: none;
}

/* Minimal grain texture */
body::after {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  opacity: 0.03;
  background-image: url("https://grainy-gradients.vercel.app/noise.svg");
  z-index: 9999;
  transform: translateZ(0);
}

.gpu-accelerated {
  transform: translateZ(0);
  will-change: transform;
  backface-visibility: hidden;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

@layer utilities {
  .font-mono-numbers {
    font-family: var(--font-jetbrains-mono);
    font-feature-settings: "tnum" on;
  }

  .glass-panel {
    background: rgba(13, 13, 13, 0.4);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
}
```

## `postcss.config.mjs`
```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```
