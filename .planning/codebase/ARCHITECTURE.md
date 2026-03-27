# Architecture

## Overview
Next.js 15 App Router application with route groups, server/client components, and API routes.

## Route Groups

### (admin)
- `/admin/dashboard` - Admin dashboard
- `/admin/team` - Team management
- `/admin/projects` - Project management
- `/admin/leads` - Lead management
- `/admin/invoices` - Invoice management
- `/admin/content-studio` - AI content tools

### (auth)
- `/login` - User login
- `/register` - User registration
- `/reset-password` - Password reset

### (marketing)
- `/` - Home page
- `/services` - Service pages (growth, shop, spark)
- `/portfolio` - Portfolio with slug support
- `/blog` - Blog with slug support
- `/pricing` - Pricing information
- `/process` - Process/ methodology
- `/contact` - Contact form

### (portal)
- Portal layout wrapper

---

## Component Architecture

### Server Components (Default)
- Route pages
- Layouts
- Data fetching components

### Client Components (with "use client")
- Interactive UI components
- State management
- Event handlers

---

## Key Directories

```
src/
├── app/                    # Next.js App Router
│   ├── (admin)/           # Admin route group
│   ├── (auth)/             # Auth route group
│   ├── (marketing)/        # Marketing route group
│   ├── (portal)/           # Portal route group
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/
│   ├── ui/               # Shadcn UI primitives
│   ├── blacklight/       # Business components
│   ├── three/            # Three.js/R3F components
│   ├── showcases/        # Demo/showcase components
│   ├── annotations/      # Collaboration features
│   ├── marketing/        # Marketing components
│   ├── blog/             # Blog components
│   ├── portfolio/        # Portfolio components
│   ├── content-studio/  # AI content tools
│   └── analytics/        # Analytics components
└── lib/
    ├── ai/               # AI integrations
    ├── supabase/         # Supabase clients
    ├── hooks/            # Custom hooks
    └── *.ts              # Utilities
```

---

## Data Flow

1. **Client** → **API Route** → **Supabase**
2. **Client** → **API Route** → **AI Service** → **Client**
3. **Server Component** → **Supabase** → **Render**

---

## Authentication Flow

1. User visits protected route
2. Middleware checks session
3. Redirect to /login if no session
4. Supabase handles auth state
5. Client components receive session via context
