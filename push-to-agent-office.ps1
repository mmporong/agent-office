$ErrorActionPreference = 'Stop'

$projectPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$targetRemote = 'https://github.com/mmporong/agent-office.git'

Write-Host "Project path: $projectPath"
Set-Location $projectPath

if (Test-Path '.git') {
  Write-Host 'Standalone git repository already exists in unity-webgl-wrapper.'
} else {
  Write-Host 'Initializing standalone git repository in unity-webgl-wrapper...'
  git init
}

$hasOrigin = $false
try {
  git remote get-url origin | Out-Null
  $hasOrigin = $true
} catch {
  $hasOrigin = $false
}

if ($hasOrigin) {
  $currentOrigin = git remote get-url origin
  if ($currentOrigin -ne $targetRemote) {
    Write-Host "Updating origin remote to $targetRemote"
    git remote set-url origin $targetRemote
  } else {
    Write-Host 'Origin remote already set correctly.'
  }
} else {
  Write-Host "Adding origin remote: $targetRemote"
  git remote add origin $targetRemote
}

Write-Host 'Adding files...'
git add .

$hasCommits = $true
try {
  git rev-parse --verify HEAD | Out-Null
} catch {
  $hasCommits = $false
}

if ($hasCommits) {
  Write-Host 'Creating/update commit if there are changes...'
  git commit -m "Update agent office site" 2>$null
  if ($LASTEXITCODE -ne 0) {
    Write-Host 'No new commit created (possibly no staged changes).'
  }
} else {
  Write-Host 'Creating initial commit...'
  git commit -m "Initial commit"
}

Write-Host 'Renaming branch to main...'
git branch -M main

Write-Host 'Pushing to GitHub...'
git push -u origin main

Write-Host ''
Write-Host 'Push complete.'
Write-Host 'Next: add PAGES_PUBLISH_TOKEN to the source repo and run Deploy Pages Mirror.'
