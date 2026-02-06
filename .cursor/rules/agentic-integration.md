# Agentic Integration Rule

When working on tasks, **automatically leverage the `.agent` folder** for enhanced capabilities.

## Core Principle

**Don't work solo** - Use agents, skills, and workflows from `.agent/` when they provide domain expertise or multiple perspectives.

## Quick Decision Tree

```
Task Complexity?
├── Simple (1 file, 1 domain)
│   └── Direct edit + load relevant skill
│
├── Medium (2-3 files, 1 domain)
│   └── Invoke domain agent (frontend-specialist, backend-specialist, etc.)
│
└── Complex (4+ files, 2+ domains)
    ├── Check for PLAN.md
    ├── If missing → Use project-planner agent
    └── If exists → Use orchestrator agent (3+ agents)
```

## Auto-Trigger Agents

| Trigger Words | Agent(s) | When |
|--------------|----------|------|
| "review", "audit" | `security-auditor` | Security checks |
| "build", "create" | `orchestrator` → domain agents | New features |
| "debug", "fix" | `debugger` → `test-engineer` | Bug fixes |
| "optimize", "performance" | `performance-optimizer` | Speed improvements |
| "test", "coverage" | `test-engineer` | Testing |
| "deploy", "production" | `devops-engineer` | Deployment |
| "design", "ui", "ux" | `frontend-specialist` + `ui-ux-pro-max` | Design work |

## File-Based Agent Routing

| File Pattern | Agent | Skills |
|--------------|-------|--------|
| `**/components/**/*.{tsx,jsx}` | `frontend-specialist` | `react-best-practices`, `frontend-design` |
| `**/api/**/*.{ts,js}` | `backend-specialist` | `api-patterns`, `nodejs-best-practices` |
| `**/prisma/**/*.prisma` | `database-architect` | `database-design` |
| `**/*.test.{ts,tsx}` | `test-engineer` | `testing-patterns` |
| `**/middleware.ts` | `security-auditor` | `vulnerability-scanner` |

## Required Actions

1. **Before complex tasks**: Check for `docs/PLAN.md` - if missing, use `project-planner` agent first
2. **When editing code**: Always include `test-engineer` agent for code changes
3. **When touching auth**: Always include `security-auditor` agent
4. **After changes**: Run `python .agent/scripts/checklist.py .` for validation
5. **For design work**: Check `.agent/.shared/ui-ux-pro-max/data/` for styles/palettes

## Context Passing (MANDATORY)

When invoking agents, **ALWAYS** include:
- Original user request
- Decisions made (from questions)
- Previous agent work
- Current plan state (PLAN.md if exists)
- Relevant file context

## Agent Boundaries (STRICT)

- `frontend-specialist` → Only UI/components/styles
- `backend-specialist` → Only API/server logic
- `test-engineer` → Only test files
- `security-auditor` → Only security review

**Violation**: If agent writes outside domain → STOP → Re-route to correct agent.

## Skills Auto-Load

Read skill files from `.agent/skills/{skill-name}/SKILL.md` when:
- React/Next.js code → `react-best-practices`
- Tailwind CSS → `tailwind-patterns`
- API routes → `api-patterns`
- Security code → `vulnerability-scanner`

## Validation

After code changes:
```bash
python .agent/scripts/checklist.py .  # Quick check
python .agent/scripts/verify_all.py . --url http://localhost:3000  # Full check
```

## Reference Files

- `.agent/AGENTIC_CAPABILITIES.md` - Full capabilities reference
- `.agent/AGENT_INTEGRATION_RULE.md` - Detailed integration guide
- `.agent/ARCHITECTURE.md` - System architecture
- `.agent/agents/orchestrator.md` - Orchestration details

## Quick Commands

```bash
# List agents
ls .agent/agents/

# List skills
ls .agent/skills/

# Read agent
cat .agent/agents/{agent-name}.md

# Run validation
python .agent/scripts/checklist.py .
```

---

**Remember**: Agents exist to enhance capabilities. Use them proactively based on task complexity and domain requirements.
