# Testing

## Current State

**No test framework configured**

The project does not currently have a testing setup. Dependencies found:
- No Jest
- No Vitest
- No React Testing Library
- No Playwright (as a dependency)

## Recommendations

### For Unit Tests
- **Vitest** - Fast, Vite-native testing
- **@testing-library/react** - React component testing

### For E2E Tests
- **Playwright** - Already available in OpenCode skills
- **Cypress** - Alternative

### For Visual Regression
- **Chromatic** - Cloud visual testing
- **Playwright** with screenshot comparison

## Testing Scripts to Add

```json
{
  "test": "vitest",
  "test:ui": "vitest --ui",
  "test:coverage": "vitest --coverage",
  "test:e2e": "playwright test"
}
```

## Test Structure

Recommended structure:
```
src/
├── __tests__/
│   ├── components/
│   ├── lib/
│   └── utils/
├── components/
│   └── Button.spec.tsx
└── ...
```

## Priority Test Coverage

1. **Utils** - `cn()`, date formatters, validators
2. **Lib** - AI helpers, Supabase wrappers
3. **Components** - UI primitives, business logic
4. **API Routes** - Response validation, error handling
5. **Integration** - Auth flow, data persistence
