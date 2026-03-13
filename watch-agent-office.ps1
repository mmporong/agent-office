$ErrorActionPreference = 'Stop'

$projectPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$state = [hashtable]::Synchronized(@{
  Pending = $false
  LastEvent = Get-Date
  Publishing = $false
})

function Register-Watcher {
  param(
    [string]$Path,
    [bool]$IncludeSubdirectories = $true,
    [string]$Filter = '*'
  )

  if (-not (Test-Path $Path)) {
    Write-Host "Skipping missing watch path: $Path"
    return $null
  }

  $watcher = New-Object System.IO.FileSystemWatcher
  $watcher.Path = $Path
  $watcher.Filter = $Filter
  $watcher.IncludeSubdirectories = $IncludeSubdirectories
  $watcher.NotifyFilter = [System.IO.NotifyFilters]'FileName, DirectoryName, LastWrite, CreationTime'
  $watcher.EnableRaisingEvents = $true

  $action = {
    $state.Pending = $true
    $state.LastEvent = Get-Date
  }

  Register-ObjectEvent -InputObject $watcher -EventName Changed -Action $action | Out-Null
  Register-ObjectEvent -InputObject $watcher -EventName Created -Action $action | Out-Null
  Register-ObjectEvent -InputObject $watcher -EventName Deleted -Action $action | Out-Null
  Register-ObjectEvent -InputObject $watcher -EventName Renamed -Action $action | Out-Null

  return $watcher
}

$watchers = @()
$watchers += Register-Watcher -Path (Join-Path $projectPath 'src')
$watchers += Register-Watcher -Path (Join-Path $projectPath 'public\unity')
$watchers += Register-Watcher -Path (Join-Path $projectPath '.github\workflows')
$watchers += Register-Watcher -Path 'C:\CatRush\Assets\Resources\Sprites\Cats'
$watchers += Register-Watcher -Path $projectPath -IncludeSubdirectories $false -Filter 'README.md'
$watchers += Register-Watcher -Path $projectPath -IncludeSubdirectories $false -Filter 'vite.config.ts'
$watchers += Register-Watcher -Path $projectPath -IncludeSubdirectories $false -Filter 'package.json'
$watchers += Register-Watcher -Path $projectPath -IncludeSubdirectories $false -Filter 'index.html'

Write-Host "Watching agent-office sources from: $projectPath"
Write-Host 'Changes in src, public\unity, workflow files, root config files, and C:\CatRush\Assets\Resources\Sprites\Cats will auto-publish.'
Write-Host 'Keep this window open. Press Ctrl+C to stop.'

while ($true) {
  Start-Sleep -Seconds 2

  if (-not $state.Pending -or $state.Publishing) {
    continue
  }

  $secondsSinceLastEvent = ((Get-Date) - $state.LastEvent).TotalSeconds
  if ($secondsSinceLastEvent -lt 3) {
    continue
  }

  $state.Pending = $false
  $state.Publishing = $true

  try {
    Write-Host ''
    Write-Host "Detected changes at $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss'). Starting auto publish..."
    powershell -ExecutionPolicy Bypass -File (Join-Path $projectPath 'publish-agent-office.ps1')
    Write-Host 'Auto publish finished.'
  } catch {
    Write-Host "Auto publish failed: $($_.Exception.Message)"
  } finally {
    $state.Publishing = $false
  }
}
