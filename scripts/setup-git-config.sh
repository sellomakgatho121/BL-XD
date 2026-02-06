#!/bin/bash

# Git Configuration Setup Script
# Automatically configures Git user identity for this repository

set -e

GIT_NAME="sellomakgatho121"
GIT_EMAIL="sellomakgatho121@gmail.com"

echo "🔧 Setting up Git configuration..."

# Check if Git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

# Set local repository config
echo "📝 Configuring repository-level Git settings..."
git config user.name "$GIT_NAME"
git config user.email "$GIT_EMAIL"

# Verify local config
LOCAL_NAME=$(git config user.name)
LOCAL_EMAIL=$(git config user.email)

if [ "$LOCAL_NAME" = "$GIT_NAME" ] && [ "$LOCAL_EMAIL" = "$GIT_EMAIL" ]; then
    echo "✅ Repository Git config set successfully!"
    echo "   Name: $LOCAL_NAME"
    echo "   Email: $LOCAL_EMAIL"
else
    echo "⚠️  Warning: Could not verify repository config"
fi

# Check if global config exists
GLOBAL_NAME=$(git config --global user.name 2>/dev/null || echo "")
GLOBAL_EMAIL=$(git config --global user.email 2>/dev/null || echo "")

if [ -z "$GLOBAL_NAME" ] || [ -z "$GLOBAL_EMAIL" ]; then
    echo ""
    echo "🌐 Global Git config not set. Would you like to set it? (y/n)"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        git config --global user.name "$GIT_NAME"
        git config --global user.email "$GIT_EMAIL"
        echo "✅ Global Git config set successfully!"
    else
        echo "⏭️  Skipping global config"
    fi
else
    echo ""
    echo "✅ Global Git config already set:"
    echo "   Name: $GLOBAL_NAME"
    echo "   Email: $GLOBAL_EMAIL"
fi

# Display current configuration
echo ""
echo "📋 Current Git Configuration:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Repository-level:"
git config --local --list | grep -E "(user.name|user.email)" || echo "  (none)"
echo ""
echo "Global-level:"
git config --global --list 2>/dev/null | grep -E "(user.name|user.email)" || echo "  (none)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

echo ""
echo "✨ Git configuration complete!"
echo ""
echo "💡 Tip: Future commits will now use: $GIT_NAME <$GIT_EMAIL>"
