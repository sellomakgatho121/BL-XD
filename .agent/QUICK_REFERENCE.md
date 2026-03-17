# 🚀 Agentic Capabilities Quick Reference

> One-page cheat sheet for using agents, skills, and workflows

---

## 🎯 Agent Selection (By Task)

| Task | Agent | Command |
|------|-------|---------|
| **UI Component** | `frontend-specialist` | "Use frontend-specialist to..." |
| **API Endpoint** | `backend-specialist` | "Use backend-specialist to..." |
| **Database** | `database-architect` | "Use database-architect to..." |
| **Security** | `security-auditor` | "Use security-auditor to..." |
| **Testing** | `test-engineer` | "Use test-engineer to..." |
| **Deploy** | `devops-engineer` | "Use devops-engineer to..." |
| **Debug** | `debugger` | "Use debugger to..." |
| **Performance** | `performance-optimizer` | "Use performance-optimizer to..." |
| **Complex Feature** | `orchestrator` | "Use orchestrator to coordinate..." |

---

## 🔄 Workflows (Slash Commands)

```
/brainstorm    - Discover requirements
/create        - Build new features
/debug         - Fix bugs systematically
/deploy        - Deploy to production
/enhance       - Update existing code
/orchestrate   - Coordinate 3+ agents
/plan          - Create task breakdown
/preview       - Manage preview server
/status        - Check project health
/test          - Run tests
/ui-ux-pro-max - Design with 50 styles
```

---

## 📚 Key Skills

| Domain | Skills |
|--------|--------|
| **Frontend** | `react-best-practices`, `frontend-design`, `tailwind-patterns` |
| **Backend** | `api-patterns`, `nodejs-best-practices` |
| **Database** | `database-design` |
| **Security** | `vulnerability-scanner`, `red-team-tactics` |
| **Testing** | `testing-patterns`, `webapp-testing`, `tdd-workflow` |

---

## 🛠️ Validation Scripts

```bash
# Quick check
python .agent/scripts/checklist.py .

# Full verification
python .agent/scripts/verify_all.py . --url http://localhost:3000

# Agent discovery
python .agent/scripts/agent_discovery.py suggest "add user authentication"
```

---

## 🎨 UI/UX Pro Max

Access 50 styles, 21 palettes, 50 fonts:
- Data: `.agent/.shared/ui-ux-pro-max/data/`
- Workflow: `/ui-ux-pro-max`

---

## ⚡ Quick Rules

1. **Complex task?** → Check for `docs/PLAN.md` first
2. **Code changes?** → Always include `test-engineer`
3. **Auth changes?** → Always include `security-auditor`
4. **3+ domains?** → Use `orchestrator` (minimum 3 agents)
5. **After changes?** → Run `checklist.py`

---

## 📖 Full Docs

- `AGENTIC_CAPABILITIES.md` - Complete reference
- `AGENT_INTEGRATION_RULE.md` - Integration guide
- `ARCHITECTURE.md` - System architecture

---

**Pro Tip**: Use `agent_discovery.py` to find the right agent for any task!
