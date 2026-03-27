# Implementation Plan: WhatsApp AI Storefront

## Service Details
- **Name**: WhatsApp AI Storefront
- **Price**: From R12,000
- **Pricing Model**: Setup + per-conversation
- **Delivery**: 2-3 weeks
- **Priority**: FLAGSHP (Launch)

---

## Overview

A conversational AI-powered storefront that allows customers to browse products, ask questions, and make purchases directly through WhatsApp. Built for South African market with local language support and SA payment integrations.

---

## Technical Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│ WhatsApp        │────▶│  Next.js API   │────▶│  Supabase       │
│ Business API    │     │  (Webhooks)    │     │  (Database)     │
└─────────────────┘     └────────┬────────┘     └─────────────────┘
                                 │
                        ┌────────▼────────┐
                        │  OpenAI/Gemini │
                        │  (AI Engine)    │
                        └─────────────────┘
                                 │
                        ┌────────▼────────┐
                        │  Zapper/Snap   │
                        │  Scan APIs      │
                        └─────────────────┘
```

---

## Implementation Phases

### Phase 1: WhatsApp Business API Setup (Day 1)

#### Tasks
- [ ] Create Meta Developer Account
- [ ] Register WhatsApp Business API
- [ ] Configure phone number
- [ ] Set up webhook URL (ngrok for dev)
- [ ] Verify webhook endpoint
- [ ] Configure message templates

#### Files to Create
- `src/app/api/whatsapp/webhook/route.ts` - Webhook handler
- `src/app/api/whatsapp/message/route.ts` - Message processor

#### Files to Modify
- `src/lib/supabase/` - Add WhatsApp tables

---

### Phase 2: AI Conversation Engine (Day 2-3)

#### Tasks
- [ ] Design conversation flow schema
- [ ] Implement product catalog queries
- [ ] Build context management
- [ ] Add local language support (Zulu, Xhosa, Sotho, Afrikaans)
- [ ] Create AI response generation
- [ ] Implement conversation state machine

#### Files to Create
- `src/lib/whatsapp/conversation-flow.ts` - Conversation logic
- `src/lib/ai/whatsapp-agent.ts` - AI agent
- `src/lib/whatsapp/localization.ts` - Language support

#### Files to Modify
- `src/lib/supabase/` - Add product/catalog tables

---

### Phase 3: Product Catalog (Day 3-4)

#### Tasks
- [ ] Create product table schema
- [ ] Build catalog CRUD API
- [ ] Implement product search
- [ ] Create order management
- [ ] Add inventory tracking

#### Database Schema
```sql
-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY,
  business_id UUID REFERENCES businesses(id),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  images TEXT[],
  category TEXT,
  in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Conversations table
CREATE TABLE conversations (
  id UUID PRIMARY KEY,
  business_id UUID REFERENCES businesses(id),
  customer_phone TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  started_at TIMESTAMP DEFAULT NOW(),
  last_message_at TIMESTAMP
);

-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY,
  conversation_id UUID REFERENCES conversations(id),
  status TEXT DEFAULT 'pending',
  total DECIMAL(10,2) NOT NULL,
  payment_status TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

### Phase 4: Payment Integration (Day 4-5)

#### Tasks
- [ ] Integrate Zapper API
- [ ] Integrate SnapScan API
- [ ] Create payment link generation
- [ ] Build payment webhook handling
- [ ] Implement order confirmation
- [ ] Add receipt generation

#### Files to Create
- `src/lib/payments/zapper.ts` - Zapper integration
- `src/lib/payments/snapscan.ts` - SnapScan integration

---

### Phase 5: Admin Dashboard (Day 5-7)

#### Tasks
- [ ] Create business admin pages
- [ ] Build conversation analytics
- [ ] Implement customer management
- [ ] Create order management interface
- [ ] Add AI training interface
- [ ] Build reporting dashboard

#### Pages to Create
- `src/app/(admin)/admin/whatsapp/dashboard/page.tsx`
- `src/app/(admin)/admin/whatsapp/customers/page.tsx`
- `src/app/(admin)/admin/whatsapp/orders/page.tsx`
- `src/app/(admin)/admin/whatsapp/analytics/page.tsx`

---

### Phase 6: Testing & Deployment (Day 7-10)

#### Tasks
- [ ] Unit tests for conversation flows
- [ ] Integration tests for payments
- [ ] Load testing
- [ ] Security audit
- [ ] Performance optimization
- [ ] Production deployment

---

## Component Structure

```
src/
├── app/
│   └── api/
│       └── whatsapp/
│           ├── webhook/
│           │   └── route.ts
│           └── message/
│               └── route.ts
├── components/
│   └── whatsapp/
│       ├── ConversationList.tsx
│       ├── OrderDetails.tsx
│       └── AnalyticsDashboard.tsx
└── lib/
    ├── whatsapp/
    │   ├── client.ts
    │   ├── conversation-flow.ts
    │   ├── localization.ts
    │   └── types.ts
    ├── ai/
    │   └── whatsapp-agent.ts
    └── payments/
        ├── zapper.ts
        └── snapscan.ts
```

---

## Environment Variables

```env
# WhatsApp
WHATSAPP_PHONE_NUMBER_ID=
WHATSAPP_ACCESS_TOKEN=
WHATSAPP_BUSINESS_ACCOUNT_ID=
WHATSAPP_WEBHOOK_VERIFY_TOKEN=

# AI
OPENAI_API_KEY=
GEMINI_API_KEY=

# Payments
ZAPPER_API_KEY=
SNAPSCAN_MERCHANT_ID=
SNAPSCAN_API_KEY=

# Database
SUPABASE_URL=
SUPABASE_ANON_KEY=
```

---

## Pricing Tiers

### Starter (R12,000)
- WhatsApp Business API setup
- 1,000 conversations/month
- Basic product catalog (50 items)
- Zapper integration
- Email support

### Growth (R18,000)
- Everything in Starter
- 5,000 conversations/month
- Unlimited products
- Local language AI
- Priority support

### Enterprise (Custom)
- Unlimited conversations
- Multi-agent systems
- Custom integrations
- Dedicated account manager

---

## Success Metrics

- [ ] 80%+ query resolution without human
- [ ] <5 second response time
- [ ] Payment success rate >95%
- [ ] Customer satisfaction >4.5/5

---

## Timeline

| Day | Milestone |
|-----|-----------|
| 1 | WhatsApp API configured |
| 3 | AI conversation working |
| 5 | Payments integrated |
| 7 | Admin dashboard live |
| 10 | Full testing complete |

---

## Dependencies

- WhatsApp Business API
- OpenAI API / Gemini
- Supabase
- Zapper API
- SnapScan API

---

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| WhatsApp API approval delays | Apply early, use sandbox |
| AI hallucination | Human oversight, fallback rules |
| Payment failures | Multiple payment options |
| Language accuracy | Continuous training loop |
