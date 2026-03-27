# Implementation Plan: AI Landing + GEO

## Service Details
- **Name**: AI Landing + GEO
- **Price**: R4,500 (Fixed)
- **Delivery**: 48 hours
- **Priority**: HIGH (Launch)
- **Target**: Side hustles, MVPs, local businesses

---

## Overview

A quick-start GEO-optimized landing page with AgentCard schema markup that makes businesses discoverable in AI search engines (ChatGPT, Perplexity, Claude) - the new era of "SEO" for AI.

---

## Technical Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│ Client         │────▶│  Landing Page   │────▶│  AgentCard     │
│ Submission     │     │  Generator     │     │  Schema        │
└─────────────────┘     └────────┬────────┘     └─────────────────┘
                                 │
                        ┌────────▼────────┐
                        │  Next.js        │
                        │  Static Build   │
                        └─────────────────┘
                                 │
                        ┌────────▼────────┐
                        │  AI Search      │
                        │  Indexing       │
                        └─────────────────┘
```

---

## Implementation Phases

### Phase 1: Landing Page Template System (Day 1)

#### Tasks
- [ ] Create modular landing page components
- [ ] Build section library (hero, features, testimonials, CTA)
- [ ] Implement theme customization
- [ ] Add mobile-first responsive design
- [ ] Create PWA configuration
- [ ] Build form submission system

#### Components to Create
```
src/components/landing/
├── sections/
│   ├── Hero.tsx
│   ├── Features.tsx
│   ├── Testimonials.tsx
│   ├── Pricing.tsx
│   ├── Contact.tsx
│   └── CTASection.tsx
├── forms/
│   └── ClientForm.tsx
└── LandingPage.tsx
```

#### Template Variants
- [ ] Startup/MVP
- [ ] Local Business
- [ ] Consultant/Professional
- [ ] E-commerce

---

### Phase 2: AgentCard Schema Markup (Day 1)

#### Tasks
- [ ] Research AI search ranking factors
- [ ] Create AgentCard JSON-LD schema
- [ ] Implement structured data for:
  - Person/Business
  - Products/Services
  - Reviews
  - FAQ
  - How-to
- [ ] Build schema generator component
- [ ] Test with AI search simulators

#### AgentCard Schema Structure
```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Business Name",
  "description": "...",
  "serviceType": ["Web Design", "AI Consulting"],
  "areaServed": "South Africa",
  "priceRange": "R4,500 - R50,000",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "127"
  },
  "FAQ": [...],
  "HowTo": [...]
}
```

---

### Phase 3: Client Onboarding Flow (Day 1-2)

#### Tasks
- [ ] Create client information form
- [ ] Build content questionnaire
- [ ] Implement image/assets collection
- [ ] Create review/approval workflow
- [ ] Set up automated confirmation emails

#### Onboarding Form Fields
- Business name & tagline
- Services offered
- Target audience
- Key messages
- Pricing
- Contact details
- Social links
- Images/assets

---

### Phase 4: 48-Hour Delivery System (Day 2)

#### Tasks
- [ ] Document delivery checklist
- [ ] Create template population script
- [ ] Build automated build system
- [ ] Implement quality checklist
- [ ] Set up client review portal

#### Automation Pipeline
```
Client Form → Content Review → Template Population 
→ Auto-Build → QA Check → Client Review → Deploy
```

---

### Phase 5: SEO & Performance Optimization (Day 2)

#### Tasks
- [ ] Implement core web vitals optimization
- [ ] Add meta tags & Open Graph
- [ ] Create sitemap.xml
- [ ] Build robots.txt
- [ ] Add canonical URLs
- [ ] Implement lazy loading

---

## Deliverables Per Client

### Standard Package (R4,500)
- [ ] Custom landing page (5 sections max)
- [ ] Mobile-first responsive design
- [ ] AgentCard schema markup
- [ ] Basic SEO optimization
- [ ] Contact form integration
- [ ] 48-hour delivery
- [ ] 1 revision round

### Premium Package (R7,500)
- [ ] Everything in Standard
- [ ] Up to 10 sections
- [ ] Blog integration
- [ ] Google Analytics setup
- [ ] 2 revision rounds
- [ ] 30-day support

---

## Technical Implementation

### Route Structure
```
src/app/
├── (marketing)/
│   └── [slug]/
│       └── page.tsx       # Dynamic landing pages
├── api/
│   ├── landing/
│   │   ├── submit/route.ts    # Form submission
│   │   ├── build/route.ts     # Trigger build
│   │   └── deploy/route.ts    # Deploy page
│   └── schema/
│       └── [slug]/route.ts    # Dynamic schema
```

### Key Components

#### LandingPage.tsx
```tsx
interface LandingPageProps {
  business: BusinessData;
  sections: Section[];
  theme: ThemeConfig;
}

export default function LandingPage({ business, sections, theme }) {
  return (
    <div className={theme.colors}>
      {sections.map(section => (
        <SectionRenderer key={section.id} {...section} />
      ))}
      <AgentCardSchema data={business} />
    </div>
  );
}
```

#### AgentCardGenerator.tsx
```tsx
export function generateAgentCardSchema(business: BusinessData) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": business.name,
    "description": business.tagline,
    "serviceType": business.services,
    "areaServed": {
      "@type": "Country",
      "name": "South Africa"
    },
    "priceRange": business.priceRange,
    // ... more fields
  };
}
```

---

## AI Search Optimization Checklist

### Content Optimization
- [ ] Clear value proposition in first 100 words
- [ ] Service descriptions in natural language
- [ ] FAQ section with common questions
- [ ] Testimonials/case studies
- [ ] Pricing transparency

### Schema Markup
- [ ] Organization schema
- [ ] Service schema
- [ ] FAQ schema
- [ ] Review/aggregate rating
- [ ] FAQPage schema
- [ ] HowTo schema (for processes)

### Technical SEO
- [ ] Fast load time (<3s)
- [ ] Mobile-optimized
- [ ] Semantic HTML
- [ ] Alt text on images
- [ ] Internal linking

---

## Timeline

| Hour | Milestone |
|------|-----------|
| 0-4 | Client onboarding form |
| 4-24 | Template system |
| 24-36 | Schema generator |
| 36-48 | Delivery pipeline |

---

## Tools & Dependencies

- Next.js 15 (Static Export)
- Tailwind CSS v4
- Vercel (Deployment)
- Resend (Emails)
- Supabase (Data)

---

## Pricing & Margins

### Costs
- Hosting: ~R50/month
- Domain: ~R250/year
- Time: ~8 hours total

### Margin
- R4,500 - R1,500 (costs + time) = R3,000 gross profit
- 67% margin

### Scalability
- Once template system built, each additional landing page takes ~2 hours
- Can batch 3-4 landings per week
- Monthly capacity: 15-20 landings

---

## Success Metrics

- [ ] 48-hour delivery guaranteed
- [ ] Core web vitals: Green
- [ ] AI search discoverable (test with Perplexity)
- [ ] Client satisfaction >4.5/5
