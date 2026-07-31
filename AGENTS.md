# Blacklight Web Designs — Agent Briefing

> Use this file to orient yourself in the BL-XD codebase. Sections are ordered by context priority — scan top-to-bottom as needed.

## Overview

Private design agency website (blacklightwebdesigns.co.za) built with Next.js 15 + React 19. Features 3D visuals (Three.js), Supabase authentication, an admin dashboard, client portal, AI-powered content studio, and custom deployment pipeline.

## Key Files

| Priority | File | Purpose |
|----------|------|---------|
| P0 | `src/app/(marketing)/page.tsx` | Homepage — main entry point |
| P0 | `src/lib/db/store.ts` | Data store (in-memory + Neon Postgres fallback) |
| P0 | `src/middleware.ts` | Auth routing / route protection |
| P1 | `src/lib/auth/config.ts` | Auth.js v5 configuration |
| P1 | `src/lib/supabase/client.ts` | Supabase SSR client |
| P1 | `src/components/marketing/navigation.tsx` | Site navigation |
| P1 | `src/app/(admin)/admin/page.tsx` | Admin dashboard |
| P2 | `src/lib/ai/gemini.ts` | Gemini AI integration |
| P2 | `src/components/lab/` | 3D experimental scenes |
| P2 | `src/components/showcases/` | Interactive showcase components |

## Stack

- **Framework**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4, Shadcn UI (Radix primitives)
- **Animation**: Framer Motion 12, GSAP 3.14, Lenis, react-three-fiber
- **3D**: Three.js 0.183, Drei, Postprocessing, Custom Shader Material
- **Auth**: Auth.js v5 (NextAuth) with Supabase SSR
- **Database**: In-memory store (default) or Neon Postgres via DATABASE_URL
- **AI**: Google Gemini AI, OpenAI
- **Email**: Resend, EmailJS
- **Deploy**: Vercel (auto-deploy from main), custom scripts/ directory
- **Validation**: Zod 4 + React Hook Form
- **Agent**: `.agent/` with 22 agents, 30+ skills, 11 workflows

## Patterns

- **Server Components by default** — `"use client"` only for interactivity/hooks/browser APIs
- **Shadcn fork pattern** — copy to `src/components/ui/`, customize there
- **Route groups** — `(marketing)`, `(admin)`, `(auth)`, `(portal)` with nested layouts
- **Data store** — in-memory Map patterns, swap to Neon by setting `DATABASE_URL`
- **Tailwind v4** — uses `@import "tailwindcss"`, `@theme` directives, not v3 `@tailwind`

## Commands

```bash
npm run dev       # Dev server at localhost:3000
npm run build     # Production build
npm run start     # Production server
npm run lint      # ESLint (Next.js + TS config)
npm test          # Vitest
npm run deploy    # Auto-commit + push to Vercel
```

## Common Pitfalls

- **React 19 + Next.js 15**: Some libraries have peer dep warnings — check compatibility before upgrades
- **Tailwind v4 syntax**: Different from v3 — `@import "tailwindcss"` not `@tailwind base/components/utilities`
- **Three.js on mobile**: WebGL crashes on low-end devices — wrap 3D in error boundaries, check `useReducedMotion`
- **In-memory store**: Resets on server restart — set `DATABASE_URL` for persistence
- **Shadcn UI**: Components forked to `src/components/ui/` won't auto-update with `npx shadcn@latest`
- **legacy-peer-deps=true**: `.npmrc` uses this — be aware when adding new dependencies

## Agent Configuration

`.agent/` directory contains 22 agents, 30+ skills, and 11 workflows. Skills are namespaced under `.agent/skills/` and available as `aas:name` or via the agent workflow system. Key workflows: `plan`, `create`, `debug`, `deploy`, `enhance`, `preview`, `test`.

Memory persistence via `memory_agent.py` (Mem0) and `memory_mcp.py` (FastMCP server).
