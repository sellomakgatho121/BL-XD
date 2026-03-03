#!/bin/bash

# Retry Vercel Deployment Script
# Creates an empty commit and pushes to trigger Vercel deployment

set -e

echo "🔄 Retrying Vercel deployment..."
echo ""

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Not a Git repository. Exiting."
    exit 1
fi

# Get current branch
CURRENT_BRANCH=$(git branch --show-current)
echo "📍 Current branch: $CURRENT_BRANCH"

# Create empty commit to trigger deployment
echo "📝 Creating deployment trigger commit..."
git commit --allow-empty -m "chore: trigger Vercel deployment [$(date +%Y-%m-%d\ %H:%M:%S)]"

# Push to GitHub
echo ""
echo "⬆️  Pushing to GitHub..."
if git push origin $CURRENT_BRANCH; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "🚀 Vercel deployment triggered!"
    echo "   Check status at: https://vercel.com/dashboard"
    echo ""
    echo "📊 Latest commit:"
    git log --oneline -1
else
    echo ""
    echo "❌ Push failed. Please check:"
    echo "   1. GitHub authentication (use GitHub CLI or SSH)"
    echo "   2. Network connectivity"
    echo "   3. Repository permissions"
    echo ""
    echo "💡 Alternative: Push manually with:"
    echo "   git push origin $CURRENT_BRANCH"
    exit 1
fi
