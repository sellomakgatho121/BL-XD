#!/bin/bash

# Trigger Vercel Deployment via Webhook
# Uses Vercel's deployment hook to trigger immediate deployment

set -e

# Vercel deployment hook URL
VERCEL_HOOK_URL="https://api.vercel.com/v1/integrations/deploy/prj_hpsbTHBK7aDbJQUcfqouJsyLBg8e/kXfXVvC2Kc"

echo "🚀 Triggering Vercel deployment via webhook..."
echo ""

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Not a Git repository. Exiting."
    exit 1
fi

# Get current branch and latest commit info
CURRENT_BRANCH=$(git branch --show-current)
LATEST_COMMIT=$(git rev-parse --short HEAD)
COMMIT_MESSAGE=$(git log --oneline -1)

echo "📍 Branch: $CURRENT_BRANCH"
echo "📝 Commit: $LATEST_COMMIT - $COMMIT_MESSAGE"
echo ""

# Trigger deployment
echo "⬆️  Sending deployment request to Vercel..."
RESPONSE=$(curl -s -X POST "$VERCEL_HOOK_URL" \
  -H "Content-Type: application/json")

# Check response
if echo "$RESPONSE" | grep -q '"job"'; then
    JOB_ID=$(echo "$RESPONSE" | grep -o '"id":"[^"]*"' | cut -d'"' -f4)
    STATE=$(echo "$RESPONSE" | grep -o '"state":"[^"]*"' | cut -d'"' -f4)
    echo ""
    echo "✅ Deployment triggered successfully!"
    echo "🆔 Job ID: $JOB_ID"
    echo "📊 Status: $STATE"
    echo ""
    echo "📊 Monitor deployment at:"
    echo "   https://vercel.com/dashboard"
else
    echo ""
    echo "❌ Failed to trigger deployment"
    echo "🔍 Response: $RESPONSE"
    echo ""
    echo "💡 Possible issues:"
    echo "   - Invalid webhook URL"
    echo "   - Network connectivity"
    echo "   - Vercel project permissions"
    exit 1
fi
