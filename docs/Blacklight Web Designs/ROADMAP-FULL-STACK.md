# Blacklight Web Designs: Comprehensive Development Roadmap

> **Project:** Full-Stack Website & Client Portal  
> **Agency:** Blacklight Web Designs  
> **Target Launch:** Q2 2026  
> **Status:** Strategic Planning Phase

---

## 📋 Executive Summary

Building the definitive digital presence for Blacklight Web Designs—a top-tier South African web design agency targeting SMEs. The site must embody our "Midnight Spectrum" philosophy while delivering enterprise-grade performance and an uncompromising user experience that converts leads into clients.

### Core Inheritance from Coming Soon Page
- **Uncompromising Visual Quality:** The coming soon page established our baseline—everything must meet or exceed that standard
- **Performance Obsession:** Sub-100ms interactions, 90+ Lighthouse scores
- **Technical Sharpness:** Sharp geometry (0-2px radius), high-contrast palette, grain textures
- **Motion Philosophy:** Staggered reveals, elastic easing, 3D button transforms
- **Psychological Precision:** Every element mapped to emotion and cognitive load

---

## 🏗️ Phase 1: Foundation & Architecture (Weeks 1-2)

### 1.1 Technical Stack Definition

**Frontend Framework**
- **Next.js 16+** with App Router (Turbopack enabled)
- **React 19** with Server Components
- **Tailwind CSS v4** with custom "Midnight Spectrum" theme
- **Framer Motion** for orchestrated animations
- **shadcn/ui** as base component library (heavily customized)

**Backend & Database**
- **Supabase** (PostgreSQL + Auth + Storage + Realtime)
- **Row Level Security (RLS)** for multi-tenant isolation
- **Edge Functions** for serverless API routes

**Authentication & CMS**
- **Supabase Auth** (email + OAuth providers)
- **Custom Admin Dashboard** for content management
- **Sanity.io** (optional) for rich content if needed

**Analytics & Monitoring**
- **Vercel Analytics** for Web Vitals
- **Plausible** (privacy-focused) for visitor insights
- **Sentry** for error tracking

**Development Tools**
- **TypeScript** (strict mode)
- **ESLint + Prettier** (custom config)
- **Playwright** for E2E testing
- **Vitest** for unit testing

### 1.2 Design System Setup

**Color System (CSS Variables)**
```css
:root {
  --onyx: #0A0A0A;
  --signal-lime: #D7FF00;
  --siren-red: #FF003C;
  --spectral-white: #FDFDFD;
  --onyx-light: #1A1A1A;
  --signal-lime-dim: rgba(215, 255, 0, 0.1);
}
```

**Typography Scale**
- **Display:** Clash Display / Space Grotesk (400-700)
- **Technical:** JetBrains Mono (code, metrics, microcopy)
- **Body:** Inter (400-600)
- **Scale:** 12px → 16px → 20px → 24px → 32px → 48px → 64px → 96px

**Motion System**
- **Entrance:** `cubic-bezier(0.16, 1, 0.3, 1)` (Expo Out)
- **Interaction:** `cubic-bezier(0.34, 1.56, 0.64, 1)` (Elastic)
- **Exit:** `cubic-bezier(0.7, 0, 0.84, 0)` (Expo In)
- **Durations:** Micro (150ms), Standard (300ms), Dramatic (800ms)

**Component Tokens**
- Border radius: 0px (default), 2px (buttons)
- Shadows: None (flat aesthetic)
- Grain overlay: 5% opacity, fixed position
- Scanlines: 2px horizontal, 3px vertical

### 1.3 Project Structure

```
app/
├── (marketing)/              # Public marketing pages
│   ├── page.tsx              # Landing page
│   ├── services/
│   ├── portfolio/
│   ├── process/
│   ├── pricing/
│   └── blog/
├── (auth)/                   # Authentication flows
│   ├── login/
│   ├── register/
│   └── reset-password/
├── (portal)/                 # Client portal (protected)
│   ├── dashboard/
│   ├── projects/
│   ├── invoices/
│   └── messages/
├── (admin)/                  # Admin dashboard (protected)
│   ├── dashboard/
│   ├── leads/
│   ├── projects/
│   ├── content/
│   └── analytics/
├── api/                      # API routes
components/
├── ui/                       # Base shadcn components
├── blacklight/               # Custom agency components
│   ├── grain-overlay.tsx
│   ├── scanlines.tsx
│   ├── glitch-text.tsx
│   ├── quantum-field.tsx
│   ├── asymmetric-grid.tsx
│   └── metric-card.tsx
├── marketing/                # Marketing-specific
└── portal/                   # Client portal-specific
lib/
├── supabase/                 # Database clients
├── auth/                     # Auth helpers
├── utils/                    # Utilities
└── constants/                # Site constants
styles/
├── globals.css
└── animations.css
public/
├── fonts/
├── images/
└── assets/
```

---

## 🎨 Phase 2: Marketing Site (Weeks 3-5)

### 2.1 Landing Page Architecture

**Hero Section: "The Reveal"**
- **Layout:** Extreme asymmetric (70/30 split)
- **Visual:** Animated grain + scanlines overlay
- **Headline:** Glitch-reveal animation on load
- **CTA:** 3D-transform button with Signal Lime glow
- **Interaction:** Mouse-follow quantum particles (subtle, performant)
- **Copy:** "Revealing the unseen brilliance of your brand"

**Trust Section: "Maestro Metrics"**
- **Layout:** Horizontal scrolling ticker (pause on hover)
- **Content:** Lighthouse scores, Core Web Vitals, client count
- **Style:** Technical readout aesthetic (monospace, Signal Lime)

**Service Showcase: "The Spectrum"**
- **Layout:** Staggered card grid (90/10 asymmetric)
- **Cards:** 
  - Spark Tier (R3,500) - Entrepreneurs
  - Growth Tier (R8,500) - SMEs  
  - Shop Tier (R18,500) - E-commerce
  - Diagnostic (R1,500) - Quick wins
- **Interaction:** Hover expands card, reveals "Technical Proof" snippet
- **Animation:** Staggered Y-axis reveal with elastic easing

**Portfolio Teaser: "Proof of Concept"**
- **Layout:** 3-column masonry (interactive fragments)
- **Entries:** Live hero sections (not screenshots)
- **Metrics:** Side-by-side Lighthouse comparisons
- **Filter:** By industry (retail, services, tech)

**Process Section: "Socratic Discovery"**
- **Layout:** Vertical timeline with alternating alignment
- **Steps:** 
  1. Constraints Analysis
  2. Soul Identification  
  3. Technical Architecture
  4. Radical Implementation
  5. Performance Verification
- **Visual:** Progress-connected nodes with Signal Lime pulse

**Lead Capture: "The Inquiry"**
- **Layout:** Full-width, high-contrast form
- **Fields:** Name, Email, Business Type, Budget Range, Project Brief
- **Interaction:** Form fields reveal with typewriter effect
- **Submit:** Success state triggers confetti + redirect to booking

**Footer: "The Signal"**
- **Layout:** 4-column (Brand, Services, Resources, Connect)
- **Social:** LinkedIn, Instagram, GitHub
- **Newsletter:** Minimalist signup with Signal Lime focus ring

### 2.2 Service Detail Pages

**Individual Service Pages**
- URL: `/services/[tier]`
- **Hero:** Full-bleed technical aesthetic with tier-specific accent
- **Content:**
  - What's included (checklist with animated reveals)
  - Process breakdown (step-by-step)
  - Deliverables list
  - Pricing (transparent)
  - FAQ accordion
  - CTA to book consultation
- **Technical Proof:** Show actual code snippets, performance profiles

### 2.3 Portfolio/Case Studies

**Portfolio Listing Page**
- URL: `/portfolio`
- **Layout:** Filterable grid (industry, service tier, year)
- **Cards:** Live interactive fragment + metrics overlay
- **Sort:** By recency, performance score, complexity

**Individual Case Study Page**
- URL: `/portfolio/[slug]`
- **Sections:**
  1. **Hero:** Full project interactive demo
  2. **Challenge:** Problem statement with client context
  3. **Approach:** Socratic discovery process
  4. **Solution:** Technical architecture + design decisions
  5. **Results:** Before/after metrics (Lighthouse, TTI, conversions)
  6. **Technical Proof:** Code snippets, animation breakdowns
  7. **Testimonial:** Client quote with video (if available)
  8. **Next Project:** Related case studies

### 2.4 Process/About Page

**The "Blacklight" Philosophy**
- **Layout:** Scrollytelling experience
- **Content:**
  - Mission & values
  - Design philosophy (rejecting templates)
  - Performance obsession
  - Psychological precision
- **Visual:** Abstract particle systems representing "revealing unseen"

### 2.5 Blog/Content Hub

**Content Strategy**
- Categories: Technical (performance), Design (psychology), Business (SA market)
- **Post Layout:** 
  - Hero image with grain overlay
  - Reading progress bar (Signal Lime)
  - Sticky table of contents
  - Code blocks with syntax highlighting
  - "Technical Proof" callouts
- **SEO:** Optimized for "web design South Africa", "fast websites SA"

---

## 🔐 Phase 3: Authentication & Portal (Weeks 6-7)

### 3.1 Authentication System

**Auth Flows**
- Email/password with Supabase Auth
- OAuth: Google, GitHub
- Magic link option
- Password reset

**Protected Routes**
- Middleware-based route protection
- Role-based access (client vs admin)

### 3.2 Client Portal

**Dashboard Overview**
- Active projects with status indicators
- Recent messages/notifications
- Upcoming milestones
- Quick actions (request change, book call)

**Project Management**
- Project timeline view (Gantt-style)
- Deliverables list with approval workflow
- File uploads/reviews
- Revision tracking
- Invoices & payments

**Communication Hub**
- Threaded messaging with agency
- File attachments
- Meeting scheduling integration (Calendly)

### 3.3 Admin Dashboard

**Lead Management**
- Inquiry inbox with status tracking
- Lead scoring (automated)
- Follow-up reminders
- Conversion funnel analytics

**Project Management**
- All projects overview
- Team workload visualization
- Deadline tracking
- Client communication logs

**Content Management**
- Portfolio entries CRUD
- Blog posts editor
- Pricing updates
- Testimonials management

**Analytics**
- Traffic sources
- Lead conversion rates
- Popular services
- Revenue tracking

---

## 🛠️ Phase 4: Backend & Integrations (Weeks 8-9)

### 4.1 Database Schema

**Core Tables**
```sql
-- Leads/Inquiries
leads (id, name, email, business_type, budget_range, message, status, created_at)

-- Projects
projects (id, client_id, title, description, tier, status, start_date, deadline, budget)

-- Deliverables
deliverables (id, project_id, title, description, status, due_date, approved_at)

-- Invoices
invoices (id, project_id, amount, status, due_date, paid_at)

-- Portfolio
portfolio_items (id, title, slug, client_name, industry, tier, hero_html, metrics_json, published)

-- Blog
posts (id, title, slug, content, category, published_at, seo_meta)

-- Users (Supabase Auth)
users (id, email, role, created_at) -- extends supabase auth

-- Clients
clients (id, user_id, business_name, contact_info, tier_preference)
```

### 4.2 API Routes

**Public APIs**
- `POST /api/inquiry` - Submit lead form
- `GET /api/portfolio` - List portfolio items
- `GET /api/posts` - List blog posts

**Protected APIs (Client)**
- `GET /api/projects` - User's projects
- `GET /api/deliverables` - Project deliverables
- `POST /api/messages` - Send message

**Protected APIs (Admin)**
- `POST /api/admin/projects` - Create project
- `PUT /api/admin/leads/[id]` - Update lead status
- `POST /api/admin/portfolio` - Create portfolio entry

### 4.3 Third-Party Integrations

**Essential**
- **Supabase** - Database, Auth, Storage, Realtime
- **Resend** - Transactional emails (inquiry confirmations, updates)
- **Calendly** - Consultation booking
- **Stripe/Payfast** - Payment processing (future)

**Analytics**
- **Vercel Analytics** - Performance monitoring
- **Plausible** - Privacy-focused analytics

**Communication**
- **Slack Webhooks** - New lead notifications
- **Discord** - Internal team notifications

---

## 🧪 Phase 5: Testing & Quality Assurance (Week 10)

### 5.1 Testing Strategy

**Unit Tests (Vitest)**
- Utility functions
- Component logic
- Form validation

**E2E Tests (Playwright)**
- Lead submission flow
- Authentication flows
- Portal navigation
- Admin CRUD operations

**Visual Regression**
- Chromatic or Percy for UI consistency

### 5.2 Performance Audits

**Lighthouse Targets**
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

**Core Web Vitals**
- LCP: < 1.2s
- FID: < 100ms
- CLS: < 0.1

### 5.3 Accessibility Audit

**WCAG 2.1 AA Compliance**
- Keyboard navigation
- Screen reader testing
- Color contrast verification
- Focus management

---

## 🚀 Phase 6: Deployment & Launch (Week 11)

### 6.1 Pre-Launch Checklist

**Technical**
- [ ] All tests passing
- [ ] Performance audits passed
- [ ] Security scan completed
- [ ] SSL certificates configured
- [ ] Environment variables set
- [ ] Database migrations run

**Content**
- [ ] Portfolio entries populated
- [ ] Blog posts published (3 minimum)
- [ ] Pricing accurate
- [ ] Contact forms tested
- [ ] Email templates verified

**Marketing**
- [ ] SEO meta tags complete
- [ ] Social share images generated
- [ ] Google Analytics connected
- [ ] Sitemap submitted
- [ ] 301 redirects configured (if needed)

### 6.2 Deployment Strategy

**Vercel Production**
- Production branch: `main`
- Auto-deploy on push
- Preview deployments for PRs

**Database**
- Supabase production project
- Row Level Security policies verified
- Backup schedule configured

**Monitoring**
- Sentry error tracking
- Vercel Analytics dashboard
- Uptime monitoring (UptimeRobot)

### 6.3 Post-Launch

**Immediate (Day 1)**
- Monitor error rates
- Check form submissions
- Verify email deliveries
- Test all user flows

**Week 1**
- Review analytics
- Gather initial feedback
- Hotfix any critical issues
- Announce on social media

**Month 1**
- Performance review
- Content additions (2-3 blog posts)
- Portfolio updates
- Iterate based on data

---

## 📊 Success Metrics

### Technical KPIs
- **Lighthouse Score:** 95+ across all pages
- **Time to Interactive:** < 1.5s on 3G
- **Conversion Rate:** 5%+ (inquiry to consultation)
- **Uptime:** 99.9%

### Business KPIs
- **Leads per Month:** 20+ qualified inquiries
- **Conversion Rate:** 15%+ (lead to client)
- **Average Project Value:** R8,500+
- **Client Retention:** 80%+ maintenance renewals

### Marketing KPIs
- **Organic Traffic:** 500+ monthly visits
- **Bounce Rate:** < 40%
- **Time on Site:** 3+ minutes average
- **Social Engagement:** 100+ interactions per post

---

## 🎯 Agent Coordination Strategy

Using the Antigravity Kit architecture, here's how we'll orchestrate development:

### Primary Agents

| Phase | Lead Agent | Supporting Agents |
|-------|------------|-------------------|
| 1-2 | `project-planner` | `frontend-specialist`, `database-architect` |
| 3-5 | `frontend-specialist` | `backend-specialist`, `test-engineer` |
| 6-7 | `backend-specialist` | `database-architect`, `security-auditor` |
| 8-9 | `devops-engineer` | `backend-specialist`, `seo-specialist` |
| 10 | `test-engineer` | `qa-automation-engineer`, `performance-optimizer` |
| 11 | `devops-engineer` | `seo-specialist`, `product-owner` |

### Workflow Usage

```
/plan            # Phase planning and task breakdown
/create            # Feature implementation
/test              # Validation and QA
/deploy            # Production deployment
/enhance          # Post-launch optimizations
```

---

## 📝 Immediate Next Steps

1. **Approve Roadmap** - Review and finalize this document
2. **Initialize Project** - Run Next.js 16 scaffolding with shadcn/ui
3. **Setup Supabase** - Create project, define schema
4. **Design Tokens** - Implement Midnight Spectrum in Tailwind
5. **Component Library** - Build base Blacklight components
6. **Begin Phase 2** - Start with Landing page development

---

## 🌐 Domain & Branding

**Primary Domain:** `blacklightdesigns.co.za` (or .com if available)
**Staging:** `staging.blacklightdesigns.co.za`

**Email Setup**
- `hello@blacklightdesigns.co.za` - General inquiries
- `projects@blacklightdesigns.co.za` - Client communication
- `admin@blacklightdesigns.co.za` - Internal notifications

---

*This roadmap is a living document. Iterate based on learnings, market feedback, and technical discoveries.*

**Document Version:** 1.0  
**Last Updated:** February 2026  
**Next Review:** Post-Phase 2 Completion
