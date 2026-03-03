#!/bin/bash

# Push to GitHub and trigger Vercel deployment
# This script pushes commits to GitHub, which will automatically trigger Vercel deployment

set -e

echo "🚀 Pushing commits to GitHub..."
echo ""

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Not a Git repository. Exiting."
    exit 1
fi

# Check current branch
CURRENT_BRANCH=$(git branch --show-current)
echo "📍 Current branch: $CURRENT_BRANCH"

# Check if there are commits to push
LOCAL_COMMITS=$(git log origin/$CURRENT_BRANCH..HEAD --oneline 2>/dev/null | wc -l | tr -d ' ')

if [ "$LOCAL_COMMITS" -eq 0 ]; then
    echo "✅ No commits to push. Branch is up to date."
    echo ""
    echo "💡 If Vercel isn't deploying, check:"
    echo "   1. Vercel project is connected to this repository"
    echo "   2. Production branch is set to '$CURRENT_BRANCH'"
    echo "   3. Auto-deploy is enabled in Vercel settings"
    exit 0
fi

echo "📦 Found $LOCAL_COMMITS commit(s) to push:"
git log origin/$CURRENT_BRANCH..HEAD --oneline
echo ""

# Push to GitHub
echo "⬆️  Pushing to GitHub..."
if git push origin $CURRENT_BRANCH; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "🔄 Vercel will automatically deploy when:"
    echo "   - Repository is connected in Vercel dashboard"
    echo "   - Production branch matches: $CURRENT_BRANCH"
    echo "   - Auto-deploy is enabled"
    echo ""
    echo "📊 Check deployment status at:"
    echo "   https://vercel.com/dashboard"
else
    echo ""
    echo "❌ Push failed. Common issues:"
    echo "   1. Authentication required (use GitHub CLI or SSH)"
    echo "   2. Network connectivity issues"
    echo "   3. Repository permissions"
    echo ""
    echo "💡 Try:"
    echo "   - Use GitHub CLI: gh auth login"
    echo "   - Or switch to SSH: git remote set-url origin git@github.com:sellomakgatho121/BL-XD.git"
    exit 1
fi
