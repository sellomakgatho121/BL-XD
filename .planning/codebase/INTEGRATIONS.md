# Integrations

## Supabase

### Client Setup
- `src/lib/supabase/client.ts` - Browser client
- `src/lib/supabase/server.ts` - Server-side client
- `src/lib/supabase/middleware.ts` - Auth middleware

### Features
- Authentication (auth pages: login, register, reset-password)
- Database operations
- Storage (file uploads)
- Row Level Security (RLS)

### Routes
- `/api/auth/*` - Auth endpoints

---

## AI Services

### Google Gemini
- **File**: `src/lib/ai/gemini.ts`
- **Usage**: Content generation, analysis

### OpenAI
- **Integration**: `src/lib/ai/content-generator.ts`, `src/lib/ai/lead-scoring.ts`
- **Features**:
  - Content generation
  - Lead scoring/analysis

### AI API Routes
- `/api/ai/analyze-seo` - SEO analysis
- `/api/ai/generate-social` - Social media content
- `/api/ai/generate-blog` - Blog content generation

---

## Email Services

### Resend
- **File**: `src/lib/email.ts`
- **Usage**: Transactional emails

### EmailJS
- **Package**: @emailjs/browser, @emailjs/nodejs
- **Usage**: Client/server email sending

---

## Analytics

### Google Analytics
- **Component**: `src/components/analytics/GoogleAnalytics.tsx`
- **Implementation**: Client-side tracking

---

## External Services

### Calendly
- **Component**: `src/components/CalendlyEmbed.tsx`
- **Usage**: Meeting scheduling embed

---

## API Routes Summary

| Endpoint | Purpose |
|----------|---------|
| `/api/auth/*` | Authentication |
| `/api/projects` | Project CRUD |
| `/api/leads` | Lead management |
| `/api/invoices` | Invoice operations |
| `/api/contact` | Contact form |
| `/api/newsletter` | Newsletter signup |
| `/api/messages` | Message handling |
| `/api/ai/*` | AI-powered features |

---

## Environment Variables (Expected)

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `GEMINI_API_KEY`
- `OPENAI_API_KEY`
- `RESEND_API_KEY`
- `EMAILJS_*`
- `NEXT_PUBLIC_GA_ID`
