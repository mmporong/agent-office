$ErrorActionPreference = 'Stop'

$projectPath = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "Publishing project from: $projectPath"
Set-Location $projectPath

Write-Host ''
Write-Host '[1/2] Syncing CatRush cat assets...'
powershell -ExecutionPolicy Bypass -File (Join-Path $projectPath 'sync-catrush-cat-assets.ps1')

Write-Host ''
Write-Host '[2/2] Pushing repository to GitHub...'
powershell -ExecutionPolicy Bypass -File (Join-Path $projectPath 'push-to-agent-office.ps1')

Write-Host ''
Write-Host 'Publish flow complete.'
Write-Host 'GitHub Pages deployment will run automatically from the pushed main branch.'
