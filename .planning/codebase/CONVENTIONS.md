# Code Conventions

## Component Patterns

### Server vs Client Components
- **Default**: Server Components (React 19 default)
- **Add "use client"** only for:
  - Interactive state (useState, useReducer)
  - Event handlers (onClick, onChange)
  - Browser APIs
  - Custom hooks using client-only features

### Component Structure
```tsx
// Component file
import { cn } from "@/lib/utils"

interface ComponentProps {
  className?: string
  children?: React.ReactNode
}

export function Component({ className, children }: ComponentProps) {
  return (
    <div className={cn("base-classes", className)}>
      {children}
    </div>
  )
}
```

## Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `QuantumField.tsx` |
| Utilities | camelCase | `getUserData.ts` |
| Hooks | camelCase with "use" prefix | `useReducedMotion.ts` |
| Constants | SCREAMING_SNAKE | `MAX_UPLOAD_SIZE` |
| Files | kebab-case | `my-component.tsx` |

## Import Patterns

### Absolute Imports (@/...)
```typescript
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme/ThemeClient"
```

### Relative Imports
- Use for same-level imports
- Avoid deep relative paths (>3 levels)

## Styling

### Tailwind CSS v4
- Use `@theme` directives for custom design tokens
- Prefer utility classes over component variants
- Use `cn()` from lib/utils for class merging

### Example
```tsx
<div className={cn(
  "flex items-center justify-between",
  isActive && "bg-primary text-white"
)} />
```

## TypeScript

- Always define prop interfaces
- Avoid `any` type
- Use strict null checks
- Prefer interfaces over types for object shapes

## Shadcn UI

### Copy-on-Write
- Components copied to `src/components/ui/`
- Customize directly in copied files
- Do NOT modify node_modules

### Adding New Components
```bash
npx shadcn@latest add button
```

## Error Handling

- Try/catch with specific error types
- User-friendly error messages
- Console errors in development only
- Never leave empty catch blocks

## Testing

- No test files found in project
- Consider adding Vitest or Jest
- Follow Test-Driven Development for new features

## Linting

- ESLint 9 with Next.js config
- Run `npm run lint` before commits
- Fix warnings (no lint errors allowed)
