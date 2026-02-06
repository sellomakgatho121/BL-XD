# Git Configuration Setup Script (PowerShell)
# Automatically configures Git user identity for this repository

$GitName = "sellomakgatho121"
$GitEmail = "sellomakgatho121@gmail.com"

Write-Host "🔧 Setting up Git configuration..." -ForegroundColor Cyan

# Check if Git is installed
try {
    $null = git --version
} catch {
    Write-Host "❌ Git is not installed. Please install Git first." -ForegroundColor Red
    exit 1
}

# Set local repository config
Write-Host "📝 Configuring repository-level Git settings..." -ForegroundColor Yellow
git config user.name $GitName
git config user.email $GitEmail

# Verify local config
$LocalName = git config user.name
$LocalEmail = git config user.email

if ($LocalName -eq $GitName -and $LocalEmail -eq $GitEmail) {
    Write-Host "✅ Repository Git config set successfully!" -ForegroundColor Green
    Write-Host "   Name: $LocalName" -ForegroundColor Gray
    Write-Host "   Email: $LocalEmail" -ForegroundColor Gray
} else {
    Write-Host "⚠️  Warning: Could not verify repository config" -ForegroundColor Yellow
}

# Check if global config exists
try {
    $GlobalName = git config --global user.name
    $GlobalEmail = git config --global user.email
} catch {
    $GlobalName = $null
    $GlobalEmail = $null
}

if (-not $GlobalName -or -not $GlobalEmail) {
    Write-Host ""
    $response = Read-Host "🌐 Global Git config not set. Would you like to set it? (y/n)"
    if ($response -match "^[Yy]$") {
        git config --global user.name $GitName
        git config --global user.email $GitEmail
        Write-Host "✅ Global Git config set successfully!" -ForegroundColor Green
    } else {
        Write-Host "⏭️  Skipping global config" -ForegroundColor Yellow
    }
} else {
    Write-Host ""
    Write-Host "✅ Global Git config already set:" -ForegroundColor Green
    Write-Host "   Name: $GlobalName" -ForegroundColor Gray
    Write-Host "   Email: $GlobalEmail" -ForegroundColor Gray
}

# Display current configuration
Write-Host ""
Write-Host "📋 Current Git Configuration:" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host "Repository-level:" -ForegroundColor Yellow
git config --local --list | Select-String -Pattern "(user.name|user.email)" | ForEach-Object { Write-Host "  $_" -ForegroundColor Gray }
Write-Host ""
Write-Host "Global-level:" -ForegroundColor Yellow
try {
    git config --global --list | Select-String -Pattern "(user.name|user.email)" | ForEach-Object { Write-Host "  $_" -ForegroundColor Gray }
} catch {
    Write-Host "  (none)" -ForegroundColor Gray
}
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray

Write-Host ""
Write-Host "✨ Git configuration complete!" -ForegroundColor Green
Write-Host ""
Write-Host "💡 Tip: Future commits will now use: $GitName <$GitEmail>" -ForegroundColor Cyan
