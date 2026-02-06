# Agentic Integration Rule

> Cursor rule for leveraging Antigravity Kit agents and skills

---

## Core Principle

When a task requires domain expertise, multiple perspectives, or complex coordination, **automatically leverage the `.agent` folder capabilities** instead of working solo.

---

## Auto-Detection Triggers

### Use Agents When You See:

| Trigger | Agent(s) | Workflow |
|---------|----------|----------|
| "review", "audit", "check" | `security-auditor`, `test-engineer` | `/enhance` |
| "build", "create", "implement" | `orchestrator` → domain agents | `/create` or `/orchestrate` |
| "debug", "fix", "error" | `debugger` → `test-engineer` | `/debug` |
| "optimize", "performance", "speed" | `performance-optimizer` | `/enhance` |
| "plan", "roadmap", "breakdown" | `project-planner` | `/plan` |
| "deploy", "production", "release" | `devops-engineer` | `/deploy` |
| "test", "coverage", "qa" | `test-engineer` | `/test` |
| "design", "ui", "ux" | `frontend-specialist` + `ui-ux-pro-max` | `/ui-ux-pro-max` |

---

## Agent Selection Matrix

### By File Type

| File Pattern | Agent | Skills |
|--------------|-------|--------|
| `**/components/**/*.{tsx,jsx}` | `frontend-specialist` | `react-best-practices`, `frontend-design` |
| `**/api/**/*.{ts,js}` | `backend-specialist` | `api-patterns`, `nodejs-best-practices` |
| `**/prisma/**/*.prisma` | `database-architect` | `database-design` |
| `**/*.test.{ts,tsx}` | `test-engineer` | `testing-patterns` |
| `**/middleware.ts` | `security-auditor` | `vulnerability-scanner` |
| `**/next.config.*` | `devops-engineer` | `deployment-procedures` |

### By Task Complexity

| Complexity | Approach | Agents |
|------------|----------|--------|
| **Simple** (1 file, 1 domain) | Direct edit | Single domain agent |
| **Medium** (2-3 files, 1 domain) | Single agent | Domain specialist |
| **Complex** (4+ files, 2+ domains) | Orchestration | `orchestrator` → 3+ agents |
| **Very Complex** (new feature) | Planning → Orchestration | `project-planner` → `orchestrator` |

---

## Workflow Integration

### Standard Flow

```
User Request
    ↓
Check Complexity
    ↓
Simple? → Direct Edit
    ↓
Complex? → Check for PLAN.md
    ↓
No PLAN.md? → /plan workflow
    ↓
PLAN.md exists? → /orchestrate workflow
    ↓
Invoke Agents
    ↓
Synthesize Results
```

### Enhancement Flow

```
/enhance request
    ↓
Load session state (session_manager.py)
    ↓
Identify affected files
    ↓
Select agents (by domain)
    ↓
Invoke agents in parallel
    ↓
Apply changes
    ↓
Run validation (checklist.py)
    ↓
Update preview
```

---

## Skill Auto-Loading

### Skills Load Automatically When:

| Context | Skill(s) |
|---------|----------|
| React/Next.js code | `react-best-practices`, `nextjs-react-expert` |
| Tailwind CSS | `tailwind-patterns` |
| API routes | `api-patterns` |
| Database code | `database-design` |
| Security code | `vulnerability-scanner` |
| Test files | `testing-patterns`, `tdd-workflow` |

**Action**: Read skill files from `.agent/skills/{skill-name}/SKILL.md` when context matches.

---

## Validation Integration

### Always Run After Changes:

```bash
# Quick check
python .agent/scripts/checklist.py .

# Full check (before deployment)
python .agent/scripts/verify_all.py . --url http://localhost:3000
```

### Skill-Specific Validation:

```bash
# Security
python .agent/skills/vulnerability-scanner/scripts/security_scan.py .

# Linting
python .agent/skills/lint-and-validate/scripts/lint_runner.py .

# E2E Tests
python .agent/skills/webapp-testing/scripts/playwright_runner.py .
```

---

## Context Passing Protocol

When invoking agents, **ALWAYS** include:

1. **Original Request**: Full user query
2. **Decisions Made**: Answers to any questions
3. **Previous Work**: What was done before
4. **Plan State**: Reference to PLAN.md if exists
5. **File Context**: Relevant files already read

**Example**:
```
Use the frontend-specialist agent:

CONTEXT:
- User Request: "Add dark mode toggle"
- Decisions: Toggle in header, persist in localStorage, use Tailwind dark: classes
- Previous Work: Already added theme context provider
- Plan: docs/PLAN.md exists with dark mode feature listed
- Files: src/app/layout.tsx, src/components/ThemeToggle.tsx

TASK: Review and enhance the dark mode implementation
```

---

## Agent Boundary Enforcement

### Strict Rules:

| Agent | CAN Do | CANNOT Do |
|-------|--------|-----------|
| `frontend-specialist` | Components, UI, styles | API routes, database, tests |
| `backend-specialist` | API, server logic, DB | UI components, styles |
| `test-engineer` | Test files, mocks | Production code |
| `security-auditor` | Security review | Feature implementation |

**Violation Detection**: If agent writes outside domain → STOP → Re-route to correct agent.

---

## Orchestration Requirements

### Minimum Agent Count: 3

For `/orchestrate` workflow:
- ✅ 3+ agents = Orchestration
- ❌ < 3 agents = Just delegation

### Required Agents by Task Type:

| Task | Required Agents |
|------|----------------|
| Web App Feature | `frontend-specialist`, `backend-specialist`, `test-engineer` |
| API Feature | `backend-specialist`, `security-auditor`, `test-engineer` |
| Database Change | `database-architect`, `backend-specialist`, `security-auditor` |
| Security Review | `security-auditor`, `penetration-tester`, `test-engineer` |

---

## UI/UX Pro Max Integration

When user requests design work:

1. **Check** `.agent/.shared/ui-ux-pro-max/data/` for:
   - `styles.csv` - 50 style systems
   - `colors.csv` - 21 color palettes
   - `typography.csv` - 50 fonts
   - `landing.csv` - Landing page patterns

2. **Use** `/ui-ux-pro-max` workflow for:
   - Style selection
   - Palette matching
   - Typography pairing
   - Component design

---

## Error Handling

### If Agent Fails:

1. **Check** agent file exists: `.agent/agents/{agent-name}.md`
2. **Verify** agent has required tools
3. **Review** agent description for correct usage
4. **Fallback** to direct implementation if agent unavailable

### If Skill Missing:

1. **Check** skill exists: `.agent/skills/{skill-name}/SKILL.md`
2. **Read** skill file for guidance
3. **Apply** skill principles manually
4. **Note** missing skill for future enhancement

---

## Performance Optimization

### Lazy Loading:

- **Don't** load all agents at once
- **Do** load agents on-demand based on task
- **Do** cache agent metadata after first read

### Parallel Execution:

- **Do** invoke independent agents in parallel
- **Don't** parallelize dependent agents
- **Do** use orchestrator for coordination

---

## Documentation

### Always Document:

1. **Which agents** were used
2. **Which skills** were applied
3. **Which scripts** were executed
4. **Results** from validation

**Format**:
```markdown
## Agentic Execution Summary

### Agents Invoked
- frontend-specialist: Built component structure
- test-engineer: Added test coverage
- security-auditor: Reviewed for vulnerabilities

### Skills Applied
- react-best-practices: Optimized re-renders
- testing-patterns: Used TDD approach

### Validation
- checklist.py: ✅ Passed
- security_scan.py: ✅ No vulnerabilities
```

---

## Quick Reference

```bash
# List all agents
ls .agent/agents/

# List all skills  
ls .agent/skills/

# Read agent
cat .agent/agents/{agent-name}.md

# Read skill
cat .agent/skills/{skill-name}/SKILL.md

# Run validation
python .agent/scripts/checklist.py .
```

---

**Remember**: Agents and skills exist to enhance capabilities. Use them proactively, not reactively.
