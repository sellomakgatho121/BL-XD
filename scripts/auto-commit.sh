#!/bin/bash

# Auto-commit script for development workflow
# Automatically stages, commits, and pushes changes to trigger Vercel deployment

set -e

echo "🤖 Auto-commit script running..."
echo ""

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Not a Git repository. Exiting."
    exit 1
fi

# Get current branch
CURRENT_BRANCH=$(git branch --show-current)
echo "📍 Current branch: $CURRENT_BRANCH"

# Check for changes
if git diff --quiet && git diff --cached --quiet; then
    echo "✅ No changes to commit."
    exit 0
fi

# Show what will be committed
echo "📋 Changes to be committed:"
git status --porcelain
echo ""

# Stage all changes
echo "📦 Staging changes..."
git add .

# Generate commit message based on changes
COMMIT_MSG="chore: auto-sync changes [$(date +%Y-%m-%d\ %H:%M:%S)]"

# Check if there are package.json changes for version bump
if git diff --cached package.json >/dev/null 2>&1; then
    COMMIT_MSG="chore: update dependencies [$(date +%Y-%m-%d\ %H:%M:%S)]"
fi

# Check if there are source code changes
if git diff --cached --name-only | grep -E "\.(js|jsx|ts|tsx)$" >/dev/null 2>&1; then
    COMMIT_MSG="feat: update source code [$(date +%Y-%m-%d\ %H:%M:%S)]"
fi

# Create commit
echo "📝 Creating commit: $COMMIT_MSG"
git commit -m "$COMMIT_MSG"

# Push to trigger Vercel deployment
echo ""
echo "⬆️  Pushing to GitHub..."
if git push origin $CURRENT_BRANCH; then
    echo ""
    echo "✅ Auto-commit successful!"
    echo "🚀 Vercel deployment triggered automatically."
    echo "📊 Check deployment at: https://vercel.com/dashboard"
else
    echo ""
    echo "❌ Push failed. Please check your Git authentication."
    echo "💡 Try: gh auth login or check SSH keys"
    exit 1
fi
