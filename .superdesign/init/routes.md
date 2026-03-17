# Routes (Next.js App Router)

Framework: **Next.js (App Router)**. Routes are file-based under `src/app`.

## Root layouts
- `/` base layout: `src/app/layout.tsx`
- Admin group layout: `src/app/(admin)/layout.tsx`
- Portal group layout: `src/app/(portal)/layout.tsx`

## Marketing routes
- `/` (marketing landing): `src/app/(marketing)/page.tsx`
- `/contact`: `src/app/(marketing)/contact/page.tsx`
- `/pricing`: `src/app/(marketing)/pricing/page.tsx`
- `/process`: `src/app/(marketing)/process/page.tsx`
- `/services`: `src/app/(marketing)/services/page.tsx`
- `/services/spark`: `src/app/(marketing)/services/spark/page.tsx`
- `/services/growth`: `src/app/(marketing)/services/growth/page.tsx`
- `/services/shop`: `src/app/(marketing)/services/shop/page.tsx`
- `/portfolio`: `src/app/(marketing)/portfolio/page.tsx`
- `/portfolio/[slug]`: `src/app/(marketing)/portfolio/[slug]/page.tsx`
- `/blog`: `src/app/(marketing)/blog/page.tsx`
- `/blog/[slug]`: `src/app/(marketing)/blog/[slug]/page.tsx`

## Auth routes
- `/login`: `src/app/(auth)/login/page.tsx`
- `/register`: `src/app/(auth)/register/page.tsx`
- `/reset-password`: `src/app/(auth)/reset-password/page.tsx`
- `/auth`: `src/app/auth/page.tsx`

## Admin routes
- `/admin/admin/dashboard`: `src/app/(admin)/admin/dashboard/page.tsx`
- `/admin/admin/leads`: `src/app/(admin)/admin/leads/page.tsx`
- `/admin/admin/projects/[id]`: `src/app/(admin)/admin/projects/[id]/page.tsx`
- `/admin/admin/invoices`: `src/app/(admin)/admin/invoices/page.tsx`
- `/admin/admin/team`: `src/app/(admin)/admin/team/page.tsx`
- `/admin/admin/social`: `src/app/(admin)/admin/social/page.tsx`
- `/admin/admin/content-studio`: `src/app/(admin)/admin/content-studio/page.tsx`

## Portal routes
- `/portal/portal/dashboard`: `src/app/(portal)/portal/dashboard/page.tsx`
- `/portal/portal/projects/[id]`: `src/app/(portal)/portal/projects/[id]/page.tsx`
- `/portal/portal/invoices`: `src/app/(portal)/portal/invoices/page.tsx`
- `/portal/portal/invoices/[id]`: `src/app/(portal)/portal/invoices/[id]/page.tsx`

## Notes
- Some routes include the group segment in the URL (e.g. `/admin/admin/...`, `/portal/portal/...`) based on folder naming.

