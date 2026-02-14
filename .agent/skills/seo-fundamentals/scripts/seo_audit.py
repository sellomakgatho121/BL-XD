#!/usr/bin/env python3
"""
SEO Audit Script
Checks for SEO optimization and best practices.

Usage:
    python seo_audit.py <project_path>
"""

import os
import sys
import json
import re
from pathlib import Path
from datetime import datetime

def check_meta_tags(project_path: Path) -> dict:
    """Check for essential meta tags in HTML/JSX files."""
    result = {"passed": True, "issues": [], "warnings": []}
    
    # Only check actual pages, not components or API routes
    page_files = []
    
    # Find page files specifically (exclude API routes)
    for file_path in project_path.rglob("page.tsx"):
        if ('ui/' not in str(file_path) and 
            'showcases/' not in str(file_path) and 
            'components/' not in str(file_path) and
            'api/' not in str(file_path)):
            page_files.append(file_path)
    
    # Only check root layout and marketing layouts
    for file_path in project_path.rglob("layout.tsx"):
        if ('ui/' not in str(file_path) and 
            'showcases/' not in str(file_path) and 
            'components/' not in str(file_path) and
            'api/' not in str(file_path)):
            page_files.append(file_path)
    
    for file_path in project_path.rglob("*.html"):
        if 'public/' in str(file_path):
            page_files.append(file_path)
    
    for file_path in page_files:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read().lower()
                
                # Check for essential meta tags
                if '<title>' not in content and 'title:' not in content:
                    result["issues"].append(f"{file_path.relative_to(project_path)}: Missing title")
                    result["passed"] = False
                
                if 'meta name="description"' not in content and 'description:' not in content:
                    result["issues"].append(f"{file_path.relative_to(project_path)}: Missing meta description")
                    result["passed"] = False
                
                if 'meta name="viewport"' not in content and 'viewport:' not in content:
                    result["issues"].append(f"{file_path.relative_to(project_path)}: Missing viewport meta")
                    result["passed"] = False
                    
        except Exception as e:
            result["warnings"].append(f"Could not read {file_path}: {str(e)}")
    
    return result

def check_sitemap(project_path: Path) -> dict:
    """Check for sitemap.xml."""
    result = {"passed": True, "issues": []}
    
    sitemap_path = project_path / "public" / "sitemap.xml"
    if not sitemap_path.exists():
        result["issues"].append("Missing sitemap.xml in public folder")
        result["passed"] = False
    
    return result

def check_robots_txt(project_path: Path) -> dict:
    """Check for robots.txt."""
    result = {"passed": True, "issues": []}
    
    robots_path = project_path / "public" / "robots.txt"
    if not robots_path.exists():
        result["issues"].append("Missing robots.txt in public folder")
        result["passed"] = False
    
    return result

def check_heading_structure(project_path: Path) -> dict:
    """Check for proper heading hierarchy."""
    result = {"passed": True, "issues": [], "warnings": []}
    
    # Only check actual pages, not components
    page_files = []
    
    # Find page files specifically
    for file_path in project_path.rglob("page.tsx"):
        if 'ui/' not in str(file_path) and 'showcases/' not in str(file_path) and 'components/' not in str(file_path):
            page_files.append(file_path)
    
    for file_path in project_path.rglob("layout.tsx"):
        if 'ui/' not in str(file_path) and 'showcases/' not in str(file_path) and 'components/' not in str(file_path):
            page_files.append(file_path)
    
    for file_path in project_path.rglob("*.html"):
        if 'public/' in str(file_path):
            page_files.append(file_path)
    
    for file_path in page_files:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                
                # Check for h1 tags
                h1_count = len(re.findall(r'<h1[^>]*>', content, re.IGNORECASE))
                if h1_count == 0:
                    result["issues"].append(f"{file_path.relative_to(project_path)}: No H1 tag found")
                    result["passed"] = False
                elif h1_count > 1:
                    result["warnings"].append(f"{file_path.relative_to(project_path)}: Multiple H1 tags found")
                
        except Exception as e:
            result["warnings"].append(f"Could not read {file_path}: {str(e)}")
    
    return result

def check_image_alt_tags(project_path: Path) -> dict:
    """Check for alt tags on images."""
    result = {"passed": True, "issues": [], "warnings": []}
    
    # Only check actual pages, not components
    page_files = []
    
    # Find page files specifically
    for file_path in project_path.rglob("page.tsx"):
        if 'ui/' not in str(file_path) and 'showcases/' not in str(file_path) and 'components/' not in str(file_path):
            page_files.append(file_path)
    
    for file_path in project_path.rglob("layout.tsx"):
        if 'ui/' not in str(file_path) and 'showcases/' not in str(file_path) and 'components/' not in str(file_path):
            page_files.append(file_path)
    
    for file_path in project_path.rglob("*.html"):
        if 'public/' in str(file_path):
            page_files.append(file_path)
    
    for file_path in page_files:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                
                # Find img tags without alt
                img_tags = re.findall(r'<img[^>]*>', content, re.IGNORECASE)
                for img in img_tags:
                    if 'alt=' not in img.lower():
                        result["issues"].append(f"{file_path.relative_to(project_path)}: Image without alt tag: {img[:50]}...")
                        result["passed"] = False
                        
        except Exception as e:
            result["warnings"].append(f"Could not read {file_path}: {str(e)}")
    
    return result

def main():
    if len(sys.argv) < 2:
        print("Usage: python seo_audit.py <project_path>")
        sys.exit(1)
    
    project_path = Path(sys.argv[1]).resolve()
    
    if not project_path.exists():
        print(f"Error: Project path {project_path} does not exist")
        sys.exit(1)
    
    print(f"\n{'='*50}")
    print(f"[SEO AUDIT] SEO Optimization Check")
    print(f"{'='*50}")
    print(f"Project: {project_path}")
    print(f"Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"{'-'*50}")
    
    # Run all SEO checks
    checks = [
        ("Meta Tags", check_meta_tags(project_path)),
        ("Sitemap", check_sitemap(project_path)),
        ("Robots.txt", check_robots_txt(project_path)),
        ("Heading Structure", check_heading_structure(project_path)),
        ("Image Alt Tags", check_image_alt_tags(project_path)),
    ]
    
    results = []
    all_passed = True
    
    for check_name, check_result in checks:
        status = "PASS" if check_result["passed"] else "FAIL"
        print(f"  [{status}] {check_name}")
        
        if check_result["issues"]:
            for issue in check_result["issues"]:
                print(f"    [!] {issue}")
        
        if check_result["warnings"]:
            for warning in check_result["warnings"]:
                print(f"    [*] {warning}")
        
        results.append({
            "name": check_name,
            "passed": check_result["passed"],
            "issues": check_result.get("issues", []),
            "warnings": check_result.get("warnings", [])
        })
        
        if not check_result["passed"]:
            all_passed = False
    
    print(f"\n{'='*50}")
    print(f"SUMMARY")
    print(f"{'='*50}")
    
    for result in results:
        status = "✅ PASS" if result["passed"] else "❌ FAIL"
        print(f"{status} {result['name']}")
    
    overall_status = "✅ PASS" if all_passed else "❌ FAIL"
    print(f"\nOverall Status: {overall_status}")
    
    output = {
        "script": "seo_audit",
        "project": str(project_path),
        "timestamp": datetime.now().isoformat(),
        "checks": results,
        "passed": all_passed
    }
    
    print(f"\n{json.dumps(output, indent=2)}")
    sys.exit(0 if all_passed else 1)

if __name__ == "__main__":
    main()
