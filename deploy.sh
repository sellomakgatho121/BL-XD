#!/bin/bash

# Deployment script for Blacklight Web Designs
# Usage: ./deploy.sh [platform]
# Platforms: vercel (default), railway, netlify

PLATFORM=${1:-vercel}

echo "🚀 Deploying to $PLATFORM..."

# Pre-deployment checks
echo "📋 Running pre-deployment checks..."

# Check if build works
echo "Building application..."
if npm run build; then
    echo "✅ Build successful"
else
    echo "❌ Build failed. Please fix errors before deploying."
    exit 1
fi

# Deploy based on platform
case $PLATFORM in
    vercel)
        echo "🌐 Deploying to Vercel..."
        if command -v vercel &> /dev/null; then
            vercel --prod
        else
            echo "⚠️  Vercel CLI not found. Install with: npm i -g vercel"
            echo "📖 Or deploy via Git: Push to GitHub and import on vercel.com"
        fi
        ;;
    railway)
        echo "🚂 Deploying to Railway..."
        if command -v railway &> /dev/null; then
            railway up
        else
            echo "⚠️  Railway CLI not found. Install with: npm i -g @railway/cli"
        fi
        ;;
    netlify)
        echo "🌐 Deploying to Netlify..."
        if command -v netlify &> /dev/null; then
            netlify deploy --prod
        else
            echo "⚠️  Netlify CLI not found. Install with: npm i -g netlify-cli"
        fi
        ;;
    *)
        echo "❌ Unknown platform: $PLATFORM"
        echo "Supported platforms: vercel, railway, netlify"
        exit 1
        ;;
esac

echo "✅ Deployment complete!"
