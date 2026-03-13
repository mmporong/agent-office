$ErrorActionPreference = 'Stop'

$sourceRoot = 'C:\CatRush\Assets\Resources\Sprites\Cats'
$targetRoot = Join-Path $PSScriptRoot 'public\catrush-cats'

$indexByCharacterKey = @{
  ember = '01'
  leaf = '04'
  bloom = '07'
  spark = '10'
  wave = '13'
  moon = '16'
}

$assetByStatus = @{
  idle = @{ Folder = 'SleepingCat'; FileName = { param($index) "$index`_Sleep.png" } }
  planning = @{ Folder = 'WinkCat'; FileName = { param($index) "$index`_Wink.png" } }
  researching = @{ Folder = 'WinkCat'; FileName = { param($index) "$index`_Wink.png" } }
  building = @{ Folder = 'MoveCat'; FileName = { param($index) "$index.png" } }
  verifying = @{ Folder = 'Cat'; FileName = { param($index) "$index.png" } }
  blocked = @{ Folder = 'Cat'; FileName = { param($index) "$index.png" } }
  syncing = @{ Folder = 'MoveCat'; FileName = { param($index) "$index.png" } }
}

if (-not (Test-Path $sourceRoot)) {
  throw "Source folder not found: $sourceRoot"
}

New-Item -ItemType Directory -Path $targetRoot -Force | Out-Null

foreach ($status in $assetByStatus.Keys) {
  $statusConfig = $assetByStatus[$status]
  $targetStatusFolder = Join-Path $targetRoot $statusConfig.Folder
  New-Item -ItemType Directory -Path $targetStatusFolder -Force | Out-Null

  foreach ($characterKey in $indexByCharacterKey.Keys) {
    $index = $indexByCharacterKey[$characterKey]
    $fileName = & $statusConfig.FileName $index
    $sourceFile = Join-Path (Join-Path $sourceRoot $statusConfig.Folder) $fileName
    $targetFile = Join-Path $targetStatusFolder $fileName

    if (-not (Test-Path $sourceFile)) {
      throw "Missing sprite for ${characterKey} / ${status}: $sourceFile"
    }

    Copy-Item $sourceFile $targetFile -Force
    Write-Host "Copied $characterKey / $status -> $targetFile"
  }
}

Write-Host ''
Write-Host 'CatRush cat assets synced to public\catrush-cats.'
Write-Host 'Next: run push-to-agent-office.ps1 or publish-agent-office.ps1.'
