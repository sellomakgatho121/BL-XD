# Phase 1: Foundation & Testing

## Objective
Set up testing infrastructure, add error boundaries, and fix remaining type issues.

## Context
- Project: BL-XD (Blacklight Web Designs)
- Stack: Next.js 16, React 19, Tailwind CSS v4, Supabase
- Current state: Functional app with no tests, some type issues remain

## Goals
1. Add testing framework (Vitest + React Testing Library)
2. Create error boundaries
3. Fix remaining type issues in UI components
4. Add utility tests

---

## Tasks

### 1.1 Set Up Testing Framework
**Type**: Setup
**Priority**: High

- [ ] Install Vitest and dependencies
- [ ] Configure Vitest with Next.js/React
- [ ] Add test scripts to package.json
- [ ] Create test utilities

**Files to modify**: `package.json`, `vite.config.ts` (create)

### 1.2 Add Utility Tests
**Type**: Test
**Priority**: High

- [ ] Test `cn()` utility in `src/lib/utils.ts`
- [ ] Test date formatters
- [ ] Test validation schemas

**Files to test**: `src/lib/utils.ts`, `src/lib/*.ts`

### 1.3 Create Error Boundaries
**Type**: Feature
**Priority**: Medium

- [ ] Create ErrorBoundary component
- [ ] Add to root layout
- [ ] Add to admin routes

**Files to create**: `src/components/ErrorBoundary.tsx`
**Files to modify**: `src/app/layout.tsx`, `src/app/(admin)/layout.tsx`

### 1.4 Fix Button Type Issues
**Type**: Fix
**Priority**: Medium

- [ ] Fix Radix UI button type errors in `src/components/ui/button.tsx`

**Files to modify**: `src/components/ui/button.tsx`

### 1.5 Component Tests
**Type**: Test
**Priority**: Medium

- [ ] Test Button component
- [ ] Test Card component
- [ ] Test basic UI components

**Files to test**: `src/components/ui/*.tsx`

---

## Verification

### Success Criteria
- [ ] `npm test` runs without errors
- [ ] At least 5 tests passing
- [ ] Error boundaries catch render errors
- [ ] No TypeScript errors in main app code

### Test Commands
```bash
npm test          # Run tests
npm run test:ui  # Run with UI (if configured)
```

---

## Dependencies
- vitest
- @vitejs/plugin-react
- @testing-library/react
- @testing-library/jest-dom
- jsdom

---

## Risks
- React 19 testing compatibility (may need specific versions)
- Radix UI type issues are upstream, may need workarounds

---

## Estimate
- Setup: 30 min
- Error boundaries: 20 min
- Fix button types: 15 min
- Tests: 1 hour
- **Total**: ~2 hours
