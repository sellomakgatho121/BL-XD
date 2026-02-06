#!/bin/bash

# Fix Git Author Identity Script
# Updates author information for recent commits

set -e

GIT_NAME="sellomakgatho121"
GIT_EMAIL="sellomakgatho121@gmail.com"
AUTHOR="$GIT_NAME <$GIT_EMAIL>"

echo "🔧 Fixing Git author identity for recent commits..."
echo ""

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Not a Git repository. Exiting."
    exit 1
fi

# Show current commits with unknown authors
echo "📋 Checking recent commits..."
echo ""
git log --format="%h | %an <%ae> | %s" -10

echo ""
echo "⚠️  This will update the author of recent commits."
echo "   New author: $AUTHOR"
echo ""
read -p "How many commits to update? (default: 1): " num_commits
num_commits=${num_commits:-1}

if ! [[ "$num_commits" =~ ^[0-9]+$ ]] || [ "$num_commits" -lt 1 ]; then
    echo "❌ Invalid number. Exiting."
    exit 1
fi

echo ""
read -p "Update author for last $num_commits commit(s)? (y/n): " confirm

if [[ ! "$confirm" =~ ^[Yy]$ ]]; then
    echo "⏭️  Cancelled."
    exit 0
fi

# Update commits
if [ "$num_commits" -eq 1 ]; then
    echo ""
    echo "🔄 Updating last commit..."
    git commit --amend --author="$AUTHOR" --no-edit
    echo "✅ Last commit updated!"
else
    echo ""
    echo "🔄 Starting interactive rebase for last $num_commits commits..."
    echo "   In the editor, change 'pick' to 'edit' for commits you want to update"
    echo "   Then run: git commit --amend --author=\"$AUTHOR\" --no-edit && git rebase --continue"
    echo ""
    read -p "Continue with interactive rebase? (y/n): " rebase_confirm
    
    if [[ "$rebase_confirm" =~ ^[Yy]$ ]]; then
        GIT_SEQUENCE_EDITOR="sed -i '' '1,${num_commits}s/^pick/edit/'" git rebase -i HEAD~$num_commits
        
        # For each commit, update author
        for i in $(seq 1 $num_commits); do
            echo ""
            echo "🔄 Updating commit $i of $num_commits..."
            git commit --amend --author="$AUTHOR" --no-edit
            if [ $i -lt $num_commits ]; then
                git rebase --continue
            fi
        done
        
        echo "✅ All commits updated!"
    else
        echo "⏭️  Cancelled."
        exit 0
    fi
fi

echo ""
echo "📋 Updated commits:"
git log --format="%h | %an <%ae> | %s" -$num_commits

echo ""
echo "✨ Done!"
echo ""
echo "⚠️  Note: If you've already pushed these commits, you'll need to force push:"
echo "   git push --force-with-lease"
