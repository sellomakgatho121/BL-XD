# PROJECT KNOWLEDGE BASE

**Generated:** 2026-02-09
**Stack:** Next.js 15 (App Router), React 19, Supabase, Tailwind CSS v4, Shadcn UI

## OVERVIEW
Private web application built with Next.js 15 and Supabase. Features a custom deployment pipeline and extensive documentation. Uses React 19 Server Components and Tailwind v4 for styling.

## STRUCTURE
```
.
├── src/
│   ├── app/          # App Router: routes, layouts, pages
│   ├── components/   # UI Library (shadcn/ui) & business components
│   └── lib/          # Utilities, Supabase client, shared logic
├── docs/             # "Blacklight Web Designs" documentation
├── scripts/          # Custom deployment & git automation scripts
├── supabase/         # Database migrations & config
└── public/           # Static assets
```

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| **Routes/Pages** | `src/app` | Next.js App Router structure |
| **UI Components** | `src/components` | Shadcn UI + custom components |
| **Database/Auth** | `src/lib/supabase`, `supabase/` | Supabase client & migrations |
| **Deployment** | `scripts/` | Custom bash scripts for CI/CD |
| **Docs/Specs** | `docs/Blacklight Web Designs` | Business logic & requirements |

## CONVENTIONS
- **Framework**: Next.js 15 with React 19 (Server Components by default).
- **Styling**: Tailwind CSS v4.
- **State**: React Hook Form + Zod for validation.
- **Database**: Supabase with SSR support.

## COMMANDS
```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint

# Deployment (Custom)
npm run deploy       # Trigger auto-commit & deploy
npm run deploy:retry # Retry failed deployment
```

## NOTES
- **React 19**: Uses latest React features (Actions, etc.).
- **Tailwind v4**: New engine, check `postcss` config if needed.
- **Deployment**: seemingly handled by custom scripts rather than standard Vercel git integration alone (or wraps it).

---

## src/components

**OVERVIEW**
Shadcn UI primitives and Blacklight business components for the application.

**WHERE TO LOOK**
| Task | Location | Notes |
|------|----------|-------|
| **UI Primitives** | `src/components/ui/` | Shadcn UI: button, card, dialog, form, input, etc. |
| **Business Components** | `src/components/blacklight/` | Domain-specific: service-card, metric-card, quantum-field |
| **Marketing Components** | `src/components/marketing/` | Navigation and marketing-specific UI |
| **Shared Business Logic** | `src/components/*.tsx` | ClientGuide, GlitchText, MysteryReveal, NewsletterForm |

**CONVENTIONS**
- **Shadcn UI**: Copy-on-write pattern—fork into `src/components/ui/`, customize per project needs.
- **Tailwind v4**: Use `@theme` directives; prefer utility classes over component variants.
- **Naming**: `ui/` for primitives, `blacklight/` for business-specific reusable components.
- **Client vs Server**: Default to Server Components; add `"use client"` only for interactivity.

**ANTI-PATTERNS**
- ✗ Don't modify Shadcn UI directly in `node_modules`—always fork to `src/components/ui/`.
- ✗ Avoid mixing UI primitives with business logic in the same component.
- ✗ Don't add `"use client"` directive unnecessarily—let React 19 Server Components handle static content.
