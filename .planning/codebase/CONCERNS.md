# Concerns & Risks

## Type Safety Issues

FIXED: All 8 instances of type suppression have been resolved:

| File | Line | Status |
|------|------|--------|
| `src/lib/seo.ts` | 48 | Fixed - proper type cast |
| `src/components/portfolio/LivePlayground.tsx` | 41, 109 | Fixed - proper typing |
| `src/components/content-studio/BlogGenerator.tsx` | 218, 317 | Fixed - proper type cast |
| `src/app/(admin)/admin/invoices/page.tsx` | 53 | Fixed - proper type cast |

**Note**: Some pre-existing type issues remain in `src/components/ui/button.tsx` (Radix UI type issues).

---

## Console Statements

Found 20 console statements (log/error/warn):

- **FIXED**: Content studio page had `console.log` - now converted to empty callbacks
- **Acceptable**: API routes use `console.error` - appropriate for error logging
- **Acceptable**: Email/API key missing warnings - appropriate

**Recommendation**: Consider proper logging service for production.

---

## Missing Tests

**No test framework configured**

See `TESTING.md` for recommendations.

---

## Dependencies

### Potential Concerns
- **Lenis** - Using dev version (`1.3.18-dev.1`)
- **Zod v4** - Early adopter, may have breaking changes
- **React 19** - Relatively new, some edge cases possible

### Outdated Patterns
- No explicit error boundaries implemented
- No loading.tsx files for Suspense boundaries (optional)

---

## Security Considerations

### Environment Variables
Ensure all secrets are in `.env.local` and NOT committed:
- Supabase keys
- API keys (OpenAI, Gemini, Resend)
- EmailJS credentials

### Middleware
- `src/middleware.ts` - Auth protection exists
- Verify RLS policies on Supabase

---

## Performance

### 3D Components
- Multiple Three.js scenes may impact performance
- Consider lazy loading R3F components
- Post-processing effects are computationally expensive

### Bundle Size
- Many large dependencies (Three.js, GSAP, Framer Motion)
- Consider dynamic imports for heavy features

---

## Code Quality

### Good Practices Observed
- TypeScript strict mode
- Proper error handling in API routes
- Separation of concerns (lib/utils, components)
- Copy-on-write for Shadcn UI

### Areas for Improvement
- Add test coverage
- Remove console.log from content-studio
- Fix type suppressions
- Add error boundaries
