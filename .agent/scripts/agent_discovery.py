#!/usr/bin/env python3
"""
Agent Discovery Helper
Quickly find agents, skills, and workflows by capability or keyword.
"""

import os
import re
import json
from pathlib import Path
from typing import List, Dict, Optional

AGENT_DIR = Path(__file__).parent.parent / "agents"
SKILL_DIR = Path(__file__).parent.parent / "skills"
WORKFLOW_DIR = Path(__file__).parent.parent / "workflows"


def read_agent_metadata(agent_path: Path) -> Dict:
    """Extract metadata from agent markdown file."""
    content = agent_path.read_text()
    metadata = {}
    
    # Extract frontmatter
    if content.startswith("---"):
        parts = content.split("---", 2)
        if len(parts) >= 3:
            frontmatter = parts[1]
            for line in frontmatter.split("\n"):
                if ":" in line:
                    key, value = line.split(":", 1)
                    key = key.strip()
                    value = value.strip()
                    if key == "name":
                        metadata["name"] = value
                    elif key == "description":
                        metadata["description"] = value
                    elif key == "tools":
                        metadata["tools"] = [t.strip() for t in value.split(",")]
                    elif key == "skills":
                        metadata["skills"] = [s.strip() for s in value.split(",")]
    
    return metadata


def find_agents_by_keyword(keyword: str) -> List[Dict]:
    """Find agents matching keyword in name or description."""
    matches = []
    keyword_lower = keyword.lower()
    
    for agent_file in AGENT_DIR.glob("*.md"):
        metadata = read_agent_metadata(agent_file)
        if not metadata:
            continue
            
        name = metadata.get("name", agent_file.stem)
        description = metadata.get("description", "")
        
        if (keyword_lower in name.lower() or 
            keyword_lower in description.lower()):
            matches.append({
                "name": name,
                "file": agent_file.name,
                "description": description,
                "tools": metadata.get("tools", []),
                "skills": metadata.get("skills", [])
            })
    
    return matches


def find_agents_by_domain(domain: str) -> List[str]:
    """Find agents for a specific domain."""
    domain_map = {
        "frontend": ["frontend-specialist"],
        "backend": ["backend-specialist"],
        "database": ["database-architect"],
        "security": ["security-auditor", "penetration-tester"],
        "testing": ["test-engineer", "qa-automation-engineer"],
        "devops": ["devops-engineer"],
        "mobile": ["mobile-developer"],
        "performance": ["performance-optimizer"],
        "seo": ["seo-specialist"],
        "planning": ["project-planner", "product-manager"],
        "debugging": ["debugger"],
        "orchestration": ["orchestrator"]
    }
    
    return domain_map.get(domain.lower(), [])


def list_all_agents() -> List[Dict]:
    """List all available agents."""
    agents = []
    
    for agent_file in sorted(AGENT_DIR.glob("*.md")):
        metadata = read_agent_metadata(agent_file)
        if metadata:
            agents.append({
                "name": metadata.get("name", agent_file.stem),
                "file": agent_file.name,
                "description": metadata.get("description", ""),
                "tools": metadata.get("tools", []),
                "skills": metadata.get("skills", [])
            })
    
    return agents


def list_all_skills() -> List[str]:
    """List all available skills."""
    skills = []
    
    for skill_dir in sorted(SKILL_DIR.iterdir()):
        if skill_dir.is_dir():
            skill_file = skill_dir / "SKILL.md"
            if skill_file.exists():
                skills.append(skill_dir.name)
    
    return skills


def list_all_workflows() -> List[str]:
    """List all available workflows."""
    workflows = []
    
    for workflow_file in sorted(WORKFLOW_DIR.glob("*.md")):
        workflows.append(workflow_file.stem)
    
    return workflows


def suggest_agents_for_task(task_description: str) -> List[str]:
    """Suggest agents based on task description."""
    task_lower = task_description.lower()
    suggestions = []
    
    # Keyword matching
    if any(word in task_lower for word in ["ui", "component", "design", "frontend", "react"]):
        suggestions.append("frontend-specialist")
    
    if any(word in task_lower for word in ["api", "backend", "server", "endpoint"]):
        suggestions.append("backend-specialist")
    
    if any(word in task_lower for word in ["database", "schema", "prisma", "sql"]):
        suggestions.append("database-architect")
    
    if any(word in task_lower for word in ["security", "auth", "vulnerability", "audit"]):
        suggestions.append("security-auditor")
    
    if any(word in task_lower for word in ["test", "coverage", "qa"]):
        suggestions.append("test-engineer")
    
    if any(word in task_lower for word in ["deploy", "production", "ci/cd", "docker"]):
        suggestions.append("devops-engineer")
    
    if any(word in task_lower for word in ["mobile", "ios", "android", "react-native"]):
        suggestions.append("mobile-developer")
    
    if any(word in task_lower for word in ["performance", "optimize", "speed", "slow"]):
        suggestions.append("performance-optimizer")
    
    if any(word in task_lower for word in ["plan", "roadmap", "breakdown", "milestone"]):
        suggestions.append("project-planner")
    
    if any(word in task_lower for word in ["debug", "fix", "error", "bug"]):
        suggestions.append("debugger")
    
    # If multiple domains, suggest orchestrator
    if len(suggestions) >= 3:
        suggestions.insert(0, "orchestrator")
    
    return list(set(suggestions))  # Remove duplicates


def main():
    """CLI interface."""
    import sys
    
    if len(sys.argv) < 2:
        print("Usage:")
        print("  python agent_discovery.py list                    # List all agents")
        print("  python agent_discovery.py skills                  # List all skills")
        print("  python agent_discovery.py workflows               # List all workflows")
        print("  python agent_discovery.py search <keyword>        # Search agents")
        print("  python agent_discovery.py domain <domain>         # Find by domain")
        print("  python agent_discovery.py suggest <task_desc>   # Suggest agents")
        return
    
    command = sys.argv[1]
    
    if command == "list":
        agents = list_all_agents()
        print(f"\n📋 Available Agents ({len(agents)}):\n")
        for agent in agents:
            print(f"  • {agent['name']}")
            print(f"    {agent['description']}")
            if agent.get('skills'):
                print(f"    Skills: {', '.join(agent['skills'][:3])}")
            print()
    
    elif command == "skills":
        skills = list_all_skills()
        print(f"\n🧩 Available Skills ({len(skills)}):\n")
        for skill in skills:
            print(f"  • {skill}")
    
    elif command == "workflows":
        workflows = list_all_workflows()
        print(f"\n🔄 Available Workflows ({len(workflows)}):\n")
        for workflow in workflows:
            print(f"  • /{workflow}")
    
    elif command == "search":
        if len(sys.argv) < 3:
            print("Error: Please provide a keyword")
            return
        keyword = sys.argv[2]
        matches = find_agents_by_keyword(keyword)
        print(f"\n🔍 Agents matching '{keyword}':\n")
        for match in matches:
            print(f"  • {match['name']}")
            print(f"    {match['description']}")
            print()
    
    elif command == "domain":
        if len(sys.argv) < 3:
            print("Error: Please provide a domain")
            return
        domain = sys.argv[2]
        agents = find_agents_by_domain(domain)
        print(f"\n🎯 Agents for '{domain}':\n")
        for agent in agents:
            print(f"  • {agent}")
    
    elif command == "suggest":
        if len(sys.argv) < 3:
            print("Error: Please provide a task description")
            return
        task = " ".join(sys.argv[2:])
        suggestions = suggest_agents_for_task(task)
        print(f"\n💡 Suggested agents for: '{task}'\n")
        for agent in suggestions:
            print(f"  • {agent}")
    
    else:
        print(f"Unknown command: {command}")
        print("Run without arguments for usage help")


if __name__ == "__main__":
    main()
