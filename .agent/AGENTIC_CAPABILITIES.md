# 🤖 Agentic Capabilities Reference

> Quick reference for leveraging the Antigravity Kit agent system

---

## 🚀 Quick Start

### Using Agents Directly

```typescript
// In your conversation, invoke agents like this:
"Use the frontend-specialist agent to review the React components"
"Use the security-auditor agent to audit authentication"
"Use the orchestrator agent to coordinate a full-stack feature"
```

### Using Workflows (Slash Commands)

```
/brainstorm    - Socratic discovery for requirements
/create        - Create new features with proper structure
/debug         - Systematic debugging with multiple agents
/deploy        - Production deployment with checks
/enhance       - Iterative feature updates
/orchestrate   - Multi-agent coordination (3+ agents)
/plan          - Task breakdown and planning
/preview       - Preview server management
/status        - Project health check
/test          - Run test suite
/ui-ux-pro-max - Design with 50 styles, 21 palettes
```

---

## 🎯 Agent Selection Guide

### By Task Type

| Task | Primary Agent | Supporting Agents |
|------|--------------|-------------------|
| **UI Component** | `frontend-specialist` | `test-engineer`, `performance-optimizer` |
| **API Endpoint** | `backend-specialist` | `security-auditor`, `test-engineer` |
| **Database Schema** | `database-architect` | `backend-specialist`, `security-auditor` |
| **Security Review** | `security-auditor` | `penetration-tester` (if needed) |
| **Bug Fix** | `debugger` | `test-engineer` |
| **Performance** | `performance-optimizer` | `frontend-specialist` or `backend-specialist` |
| **Mobile App** | `mobile-developer` | `test-engineer` |
| **Full Feature** | `orchestrator` | Coordinates multiple agents |
| **Planning** | `project-planner` | `product-manager` (if needed) |

### By Domain

| Domain | Agents | Skills |
|--------|--------|--------|
| **Frontend** | `frontend-specialist` | `react-best-practices`, `frontend-design`, `tailwind-patterns` |
| **Backend** | `backend-specialist` | `api-patterns`, `nodejs-best-practices` |
| **Database** | `database-architect` | `database-design`, `prisma-expert` |
| **Security** | `security-auditor`, `penetration-tester` | `vulnerability-scanner`, `red-team-tactics` |
| **Testing** | `test-engineer`, `qa-automation-engineer` | `testing-patterns`, `webapp-testing`, `tdd-workflow` |
| **DevOps** | `devops-engineer` | `deployment-procedures`, `docker-expert` |
| **Mobile** | `mobile-developer` | `mobile-design` |
| **SEO** | `seo-specialist` | `seo-fundamentals`, `geo-fundamentals` |
| **Performance** | `performance-optimizer` | `performance-profiling` |

---

## 🔄 Orchestration Patterns

### Pattern 1: Feature Development
```
1. project-planner → Create PLAN.md
2. frontend-specialist → Build UI
3. backend-specialist → Build API
4. database-architect → Schema design
5. test-engineer → Tests
6. security-auditor → Security review
```

### Pattern 2: Code Review
```
1. explorer-agent → Map affected files
2. frontend-specialist → UI review
3. backend-specialist → Logic review
4. security-auditor → Security check
5. test-engineer → Test coverage
```

### Pattern 3: Bug Investigation
```
1. debugger → Root cause analysis
2. explorer-agent → Find related code
3. test-engineer → Reproduce & fix
4. security-auditor → Check for vulnerabilities
```

### Pattern 4: Performance Audit
```
1. performance-optimizer → Profiling
2. frontend-specialist → UI optimizations
3. backend-specialist → API optimizations
4. test-engineer → Performance tests
```

---

## 📚 Skills Reference

### Frontend Skills
- `react-best-practices` - 57 Next.js/React optimization rules
- `frontend-design` - UI/UX patterns, design systems
- `tailwind-patterns` - Tailwind CSS v4 utilities
- `web-design-guidelines` - 100+ accessibility/UX rules
- `ui-ux-pro-max` - 50 styles, 21 palettes, 50 fonts

### Backend Skills
- `api-patterns` - REST, GraphQL, tRPC patterns
- `nodejs-best-practices` - Node.js async, modules
- `python-patterns` - Python standards, FastAPI

### Testing Skills
- `testing-patterns` - Jest, Vitest strategies
- `webapp-testing` - E2E with Playwright
- `tdd-workflow` - Test-driven development

### Security Skills
- `vulnerability-scanner` - OWASP, security auditing
- `red-team-tactics` - Offensive security

### Architecture Skills
- `architecture` - System design patterns
- `app-builder` - Full-stack scaffolding
- `plan-writing` - Task breakdown

---

## 🛠️ Scripts & Validation

### Master Scripts

```bash
# Quick validation (core checks)
python .agent/scripts/checklist.py .

# Full verification (all checks + Lighthouse + E2E)
python .agent/scripts/verify_all.py . --url http://localhost:3000

# Session management
python .agent/scripts/session_manager.py info
```

### Skill-Level Scripts

Available in `.agent/skills/{skill-name}/scripts/`:
- `security_scan.py` - Security audit
- `lint_runner.py` - Linting validation
- `playwright_runner.py` - E2E testing
- And more...

---

## 🎨 UI/UX Pro Max

The `ui-ux-pro-max` workflow provides:
- **50 Styles** - Pre-designed style systems
- **21 Palettes** - Color schemes
- **50 Fonts** - Typography options
- **Data Files** - Charts, icons, landing pages

Access via `/ui-ux-pro-max` workflow or `.agent/.shared/ui-ux-pro-max/data/`

---

## 🔍 Agent Discovery

### Find Agents by Capability

```bash
# Search for agents
grep -r "description:" .agent/agents/

# Find skills for a domain
ls .agent/skills/ | grep frontend
```

### Agent Metadata

Each agent file contains:
- `name` - Agent identifier
- `description` - When to use
- `tools` - Available tools
- `skills` - Loaded skills

---

## 💡 Best Practices

### When to Use Orchestration

✅ **Use orchestrator when:**
- Task touches 3+ domains
- Need multiple perspectives
- Comprehensive review needed
- Complex feature development

❌ **Don't orchestrate for:**
- Simple single-file changes
- Quick fixes
- Single-domain tasks

### Agent Invocation Protocol

1. **Check for PLAN.md** - Always verify plan exists
2. **Select appropriate agents** - Match domain to agent
3. **Pass full context** - Include user request, decisions, previous work
4. **Respect boundaries** - Agents stay in their domain
5. **Synthesize results** - Combine findings into unified report

### Context Passing

When invoking agents, always include:
- Original user request
- Decisions made (from questions)
- Previous agent work
- Current plan state

---

## 📖 Further Reading

- `ARCHITECTURE.md` - Full system architecture
- `agents/orchestrator.md` - Orchestration details
- `workflows/orchestrate.md` - Workflow procedures
- `skills/parallel-agents/SKILL.md` - Multi-agent patterns

---

## 🚨 Critical Rules

1. **No agents without PLAN.md** (for complex tasks)
2. **Respect agent boundaries** (frontend ≠ backend)
3. **Always include test-engineer** (for code changes)
4. **Security audit last** (after implementation)
5. **Synthesize results** (unified report, not separate outputs)

---

## 🎯 Quick Commands

```bash
# View all agents
ls .agent/agents/

# View all skills
ls .agent/skills/

# View all workflows
ls .agent/workflows/

# Read agent details
cat .agent/agents/frontend-specialist.md

# Read skill details
cat .agent/skills/react-best-practices/SKILL.md
```

---

**Remember**: Agents are tools. Use them strategically based on task complexity and domain requirements.
