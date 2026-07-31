# Blacklight Web Designs (BL-XD)

**Next.js 15 design agency website** — private SaaS with Supabase backend, 3D visuals, and custom deployment pipeline.

## Key Files

| Area | Path | Purpose |
|------|------|---------|
| **Routes** | `src/app/(marketing)/` | Public site (home, services, portfolio, blog, contact, pricing, process) |
| **Routes** | `src/app/(admin)/` | Admin dashboard, content studio, leads, invoices, team, projects |
| **Routes** | `src/app/(auth)/` | Login, register, reset-password |
| **Routes** | `src/app/(portal)/` | Client portal (dashboard, invoices, projects) |
| **Routes** | `src/app/lab/` | 3D experiments (brutalist, organic, spatial) |
| **UI** | `src/components/ui/` | Shadcn UI primitives (button, card, dialog, form, input, etc.) |
| **Business** | `src/components/blacklight/` | Domain components (service-card, metric-card, quantum-field, sprint-calculator) |
| **Marketing** | `src/components/marketing/` | Navigation, footer |
| **Showcases** | `src/components/showcases/` | BrandAura, CognitiveAnalyzer, MemeticSimulator, SocialSequencer |
| **3D** | `src/components/lab/` | BrutalistScene, OrganicScene, SpatialScene |
| **Data Store** | `src/lib/db/store.ts` | In-memory store with Neon Postgres fallback |
| **Auth** | `src/lib/auth/config.ts` | Auth.js v5 config |
| **Supabase** | `src/lib/supabase/` | Client, server, storage clients |
| **AI** | `src/lib/ai/` | Gemini integration, content generator, lead scoring |
| **Lib** | `src/lib/utils.ts` | `cn()` helper (clsx + tailwind-merge) |
| **Middleware** | `src/middleware.ts` | Route protection |
| **Deploy** | `scripts/` | Auto-commit, Vercel deploy, git hooks |
| **Agent Config** | `.agent/` | 22 agents, 30+ skills, 11 workflows |
| **Memory** | `memory_agent.py` | Mem0-based persistent memory agent |

## Stack

- **Framework**: Next.js 15 (App Router), React 19
- **Styling**: Tailwind CSS v4, Shadcn UI (Radix primitives)
- **Animation**: Framer Motion 12, GSAP 3.14, Lenis (smooth scroll), react-three-fiber
- **3D**: Three.js 0.183, Drei, Postprocessing, Custom Shader Material
- **Database**: In-memory store (default), optional Neon Postgres via DATABASE_URL
- **Auth**: Auth.js v5 (NextAuth) with Supabase SSR
- **AI**: Google Gemini AI, OpenAI
- **Email**: Resend, EmailJS
- **Deploy**: Vercel (auto-deploy from main), custom deploy scripts
- **Validation**: Zod 4, React Hook Form
- **Agent**: OpenClaude with `.agent/` harness (22 agents, 30+ skills)

## Conventions

- **Server Components** by default — `"use client"` only for interactivity, hooks, or browser APIs
- **Shadcn UI** fork pattern — copy to `src/components/ui/`, customize there, never edit node_modules
- **Route groups** — `(marketing)`, `(admin)`, `(auth)`, `(portal)` with layout nesting
- **Data store** — in-memory Map-based store, swap to Neon by setting `DATABASE_URL`
- **CSS** — Tailwind v4 `@theme` directives, utility classes over component variants
- **Components** — `ui/` for primitives, `blacklight/` for domain, `marketing/` for marketing, `showcases/` for demos

## Commands

```bash
npm run dev       # Start dev server (localhost:3000)
npm run build     # Production build
npm run start     # Start production server
npm run lint      # ESLint (Next.js + TypeScript config)
npm test          # Vitest (when configured)
npm run deploy    # Auto-commit + push to deploy
```

## Common Pitfalls

- **React 19 + Next.js 15:** Some libraries (e.g., `@studio-freight/react-lenis`) may have peer dep warnings — check compatibility before upgrading
- **Tailwind v4:** Different from v3 — uses `@import "tailwindcss"` instead of `@tailwind` directives. Check PostCSS config if styles break
- **Three.js on mobile:** WebGL can crash on low-end devices — wrap 3D scenes in error boundaries and use `useReducedMotion`
- **In-memory store:** Resets on server restart — data is ephemeral. Set `DATABASE_URL` for persistence
- **Shadcn UI updates:** Components are forked to `src/components/ui/` — they won't auto-update with `npx shadcn@latest`
- **legacy-peer-deps=true:** `.npmrc` uses this — be aware when adding new deps
