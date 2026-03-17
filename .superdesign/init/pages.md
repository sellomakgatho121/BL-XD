# Pages (dependency trees)

Dependency trees are used to decide which files MUST be passed as `--context-file` when creating drafts.

## / (Marketing Home)
Entry: `src/app/(marketing)/page.tsx`
Dependencies:
- `src/components/blacklight/grain-overlay.tsx`
- `src/components/blacklight/scanlines.tsx`
- `src/components/GlitchText.tsx`
- `src/components/blacklight/quantum-field.tsx`
- `src/components/blacklight/service-card.tsx`
- `src/components/blacklight/metric-card.tsx`
- `src/components/marketing/navigation.tsx`
- `src/components/ui/button.tsx`
- `src/lib/seo.ts`

## /admin/admin/dashboard (Admin Dashboard)
Entry: `src/app/(admin)/admin/dashboard/page.tsx`
Dependencies:
- `src/lib/supabase/client.ts`
- `src/components/ui/button.tsx`
- `src/app/(admin)/layout.tsx`
- `src/components/ui/notification-center.tsx`
- `src/components/ui/scroll-area.tsx`

## /portal/portal/dashboard (Portal Dashboard)
Entry: `src/app/(portal)/portal/dashboard/page.tsx`
Dependencies:
- `src/lib/supabase/client.ts`
- `src/components/ui/button.tsx`
- `src/app/(portal)/layout.tsx`

## /login
Entry: `src/app/(auth)/login/page.tsx`
Dependencies:
- (not expanded in this init pass)

## /register
Entry: `src/app/(auth)/register/page.tsx`
Dependencies:
- (not expanded in this init pass)

## Global styling/config (always include)
- `src/app/globals.css`
- `postcss.config.mjs`
- `src/lib/utils.ts`

