# Global Rules

## Core Principles

### 1. Code Quality Standards
- **Clean Code**: Follow SOLID principles and clean code practices
- **Type Safety**: Use TypeScript with strict mode enabled
- **Error Handling**: Implement proper error boundaries and try-catch blocks
- **Testing**: Write tests for all critical functionality
- **Documentation**: Document complex logic and APIs

### 2. Performance Standards
- **Web Vitals**: Meet Core Web Vitals thresholds (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- **Bundle Size**: Keep JavaScript bundles under 250KB gzipped
- **Image Optimization**: Use modern formats (WebP, AVIF) with proper sizing
- **Caching**: Implement proper caching strategies
- **Database Optimization**: Use indexes and query optimization

### 3. Security Standards
- **Input Validation**: Validate all user inputs
- **Authentication**: Implement proper auth flows
- **Authorization**: Role-based access control
- **Data Protection**: Encrypt sensitive data
- **Dependencies**: Keep dependencies updated and scan for vulnerabilities

### 4. Accessibility Standards
- **WCAG 2.1 AA**: Meet accessibility guidelines
- **Semantic HTML**: Use proper HTML5 semantic elements
- **Keyboard Navigation**: Ensure keyboard accessibility
- **Screen Readers**: Proper ARIA labels and roles
- **Color Contrast**: Meet contrast ratio requirements

### 5. Development Workflow
- **Git Flow**: Use proper branching strategy
- **Code Reviews**: All code must be reviewed
- **CI/CD**: Automated testing and deployment
- **Environment Management**: Separate dev, staging, prod
- **Monitoring**: Implement proper logging and monitoring

## Technology-Specific Rules

### React/Next.js
- Server Components by default
- Client Components only when necessary
- Proper state management patterns
- SEO optimization
- Error boundaries

### TypeScript
- Strict mode enabled
- No implicit any
- Proper type definitions
- Generic patterns
- Type guards

### Database
- Proper schema design
- Migration management
- Query optimization
- Connection pooling
- Data integrity

## Anti-Patterns
- Hardcoded values
- Direct DOM manipulation
- Synchronous operations
- Memory leaks
- Security vulnerabilities

## Enforcement
- ESLint configuration
- Prettier formatting
- Husky pre-commit hooks
- Automated testing
- Code review checklist
