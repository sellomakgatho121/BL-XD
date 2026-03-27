# Directory Structure

## Root
```
.
├── src/                  # Source code
├── public/               # Static assets
├── supabase/             # Database migrations
├── docs/                 # Documentation
├── scripts/              # Build/deploy scripts
└── .agent/               # Agent configuration
```

## src/app (App Router)

| Path | Type | Purpose |
|------|------|---------|
| `layout.tsx` | Server | Root layout |
| `page.tsx` | Server | Home page |
| `auth/` | Route Group | Auth routes |
| `(admin)/admin/*` | Routes | Admin panel |
| `(marketing)/*` | Routes | Marketing pages |
| `api/*` | Route Handlers | API endpoints |
| `sitemap.ts` | Server | Sitemap |
| `robots.ts` | Server | Robots.txt |

## src/components

### UI Primitives (Shadcn)
```
components/ui/
├── button.tsx
├── card.tsx
├── dialog.tsx
├── form.tsx
├── input.tsx
├── textarea.tsx
├── select.tsx
├── tabs.tsx
├── sheet.tsx
├── badge.tsx
├── label.tsx
├── scroll-area.tsx
├── separator.tsx
├── file-upload.tsx
└── notification-center.tsx
```

### Business Components
```
components/blacklight/
├── Scene.tsx
├── quantum-field.tsx
├── metric-card.tsx
├── service-card.tsx
├── sprint-calculator.tsx
├── BrandSequence.tsx
├── CustomDistortionMask.tsx
├── GrainOverlay.tsx
├── Scanlines.tsx
└── ...
```

### Three.js / 3D
```
components/three/
├── Scene.tsx
├── HeroCanvas.tsx
├── BlacklightScene.tsx
├── BlacklightReveal.tsx
├── PostProcessingEffects.tsx
├── SmoothScroll.tsx
└── SuspenseFallback.tsx
```

### Showcases / Demos
```
components/showcases/
├── MemeticSimulator.tsx
├── CognitiveAnalyzer.tsx
├── SocialSequencer.tsx
├── LatencySimulator.tsx
└── BrandAura.tsx
```

### Annotations / Collaboration
```
components/annotations/
├── AnnotationCanvas.tsx
├── CursorPresence.tsx
├── CommentThread.tsx
└── FilePreview.tsx
```

### Content Studio (AI)
```
components/content-studio/
├── BlogGenerator.tsx
├── SocialGenerator.tsx
└── SEOOptimizer.tsx
```

### Marketing
```
components/marketing/
├── navigation.tsx
└── footer.tsx
```

### Blog & Portfolio
```
components/blog/
└── BlogCard.tsx

components/portfolio/
└── LivePlayground.tsx
```

### Analytics
```
components/analytics/
└── GoogleAnalytics.tsx
```

## src/lib

```
lib/
├── ai/
│   ├── gemini.ts
│   ├── content-generator.ts
│   └── lead-scoring.ts
├── supabase/
│   ├── client.ts
│   ├── server.ts
│   ├── middleware.ts
│   └── storage.ts
├── hooks/
│   └── useReducedMotion.ts
├── theme.ts
├── utils.ts
├── seo.ts
├── email.ts
├── notifications.ts
├── performance.ts
└── annotations.ts
```

## API Routes

```
src/app/api/
├── auth/
│   └── route.ts
├── projects/
│   ├── route.ts
│   └── [id]/
├── invoices/
│   ├── route.ts
│   └── [id]/
├── leads/
│   └── route.ts
├── contact/
│   └── route.ts
├── newsletter/
│   └── route.ts
├── messages/
│   └── route.ts
└── ai/
    ├── analyze-seo/
    ├── generate-social/
    └── generate-blog/
```
