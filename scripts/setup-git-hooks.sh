#!/bin/bash

# Setup Git Hooks for Auto-commit Workflow
# Installs pre-commit and post-commit hooks for seamless Vercel integration

set -e

echo "🔧 Setting up Git hooks for auto-commit workflow..."
echo ""

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Not a Git repository. Exiting."
    exit 1
fi

# Get git hooks directory
HOOKS_DIR=$(git rev-parse --git-dir)/hooks
echo "📁 Git hooks directory: $HOOKS_DIR"

# Create pre-commit hook
echo "📝 Creating pre-commit hook..."
cat > "$HOOKS_DIR/pre-commit" << 'EOF'
#!/bin/bash

# Pre-commit hook for auto-formatting and validation
echo "🔍 Running pre-commit checks..."

# Run linting if package.json has lint script
if [ -f "package.json" ] && grep -q '"lint"' package.json; then
    echo "📋 Running linter..."
    npm run lint || {
        echo "❌ Linting failed. Please fix issues before committing."
        exit 1
    }
fi

# Auto-format with prettier if available
if command -v prettier >/dev/null 2>&1; then
    echo "💅 Auto-formatting with Prettier..."
    prettier --write . || echo "⚠️  Prettier formatting failed, continuing..."
fi

echo "✅ Pre-commit checks passed."
EOF

# Create post-commit hook
echo "📝 Creating post-commit hook..."
cat > "$HOOKS_DIR/post-commit" << 'EOF'
#!/bin/bash

# Post-commit hook for automatic push to trigger Vercel deployment
echo "🚀 Post-commit: Checking if auto-push is needed..."

# Get current branch
CURRENT_BRANCH=$(git branch --show-current)

# Check if auto-push is enabled (via environment variable or config)
if [ "$AUTO_PUSH_ENABLED" = "true" ] || git config --get --bool hooks.autopush >/dev/null 2>&1; then
    echo "⬆️  Auto-pushing to trigger Vercel deployment..."
    
    if git push origin $CURRENT_BRANCH; then
        echo "✅ Auto-push successful! Vercel deployment triggered."
    else
        echo "❌ Auto-push failed. Please push manually."
    fi
else
    echo "💡 Auto-push is disabled. Enable with:"
    echo "   git config hooks.autopush true"
    echo "   or set AUTO_PUSH_ENABLED=true environment variable"
fi
EOF

# Make hooks executable
chmod +x "$HOOKS_DIR/pre-commit"
chmod +x "$HOOKS_DIR/post-commit"

echo ""
echo "✅ Git hooks installed successfully!"
echo ""
echo "🔧 Available hooks:"
echo "   - pre-commit: Runs linting and auto-formatting"
echo "   - post-commit: Auto-push to trigger Vercel (when enabled)"
echo ""
echo "💡 Enable auto-push with:"
echo "   git config hooks.autopush true"
echo ""
echo "🚀 Or use npm scripts:"
echo "   npm run auto-commit  # Stage, commit, and push"
echo "   npm run deploy        # Alias for auto-commit"
