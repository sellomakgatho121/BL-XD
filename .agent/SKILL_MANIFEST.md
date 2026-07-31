# BL-XD Agent Skill Manifest

> Auto-generated manifest of `.agent/` skills available for agent orchestration.

## Overview

BL-XD uses an agent harness with 22 agents, 30+ skills, and 11 workflows. Skills provide domain expertise across the full stack — frontend, backend, 3D, security, deployment, and design.

## Core Agents

| Agent | Focus Area | Trigger |
|-------|-----------|---------|
| `security-auditor` | Security reviews, vulnerability scanning | "review", "audit" |
| `orchestrator` | Multi-agent coordination | "build", "create" |
| `debugger` | Bug diagnosis and fix | "debug", "fix" |
| `performance-optimizer` | Speed and bundle optimization | "optimize", "performance" |
| `test-engineer` | Testing and coverage | "test", "coverage" |
| `devops-engineer` | Deployment and CI/CD | "deploy", "production" |
| `frontend-specialist` | React/Next.js UI development | "design", "ui", "ux" |
| `backend-specialist` | API and data layer | File pattern `**/api/**` |
| `database-architect` | Schema and queries | File pattern `**/*.sql` |
| `project-planner` | Task breakdown and planning | Complex tasks |
| `ui-ux-pro-max` | Visual design, UX | "redesign", "style" |

## Key Skills by Category

### Frontend
- `react-best-practices` — React 19 + Next.js 15 patterns
- `frontend-design` — Component architecture and styling
- `tailwind-patterns` — Tailwind v4 utility patterns
- `shadcn` — Shadcn UI customization
- `threejs-fundamentals` — Three.js 3D scene setup
- `framer-motion` — Animation patterns

### Backend / API
- `api-patterns` — Next.js API routes, server actions
- `nodejs-best-practices` — Server-side patterns
- `supabase` — Supabase SSR auth and storage

### Database
- `database-design` — Schema design and migrations
- `drizzle-orm` — Drizzle ORM query patterns

### Security
- `vulnerability-scanner` — OWASP top 10 scanning
- `auth-patterns` — Auth.js v5 configuration

### DevOps
- `docker-expert` — Containerization
- `ci-cd-patterns` — GitHub Actions workflows
- `vercel-deploy` — Vercel deployment patterns

### Design
- `design-it` — Design system application
- `ui-components` — Component library patterns
- `a11y-ux` — Accessibility compliance

### Testing
- `vitest` — Unit and component testing
- `e2e-testing` — End-to-end test patterns
- `playwright` — Browser automation

## Skill Invocation

Skills are auto-discovered from `.agent/skills/` and loaded as `aas:skill-name`. Use via:

```
Skill tool: skill: "aas:react-best-practices"
```

Or trigger via agent routing:
- File pattern `src/components/**/*.tsx` → `frontend-specialist`
- File pattern `src/lib/db/**` → `database-architect`
- File pattern `*.test.*` → `test-engineer`

## Workflows

| Workflow | Purpose |
|----------|---------|
| `plan` | Architecture and task planning |
| `create` | New feature generation |
| `debug` | Bug diagnosis and fix |
| `deploy` | Deployment orchestration |
| `enhance` | Feature enhancement |
| `preview` | Code review and preview |
| `test` | Test generation and execution |
| `orchestrate` | Multi-agent coordination |
| `brainstorm` | Ideation and exploration |
| `status` | Project status report |
| `ui-ux-pro-max` | Full design sprint |

## Integration Points

- **MCP**: Filesystem, Memory, GitHub servers available
- **Memory**: Mem0 persistent memory via `memory_agent.py`
- **Deploy**: Vercel auto-deploy from main branch
- **CI**: GitHub Actions (lint + test gate)
