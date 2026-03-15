import { useEffect, useMemo, useState } from 'react'
import { officeStatusLabels, type OfficeAgent } from '../../types/office'
import { withBasePath } from '../../utils/publicPath'

interface AgentSpriteProps {
  agent: OfficeAgent
  selected: boolean
  running?: boolean
  onClick: () => void
}

const characterSigilByKey: Record<OfficeAgent['characterKey'], string> = {
  ember: 'FLR',
  leaf: 'MSS',
  wave: 'AQU',
  spark: 'VLT',
  moon: 'NXT',
  bloom: 'LUX',
  pearl: 'INK',
}

const characterTitleByKey: Record<OfficeAgent['characterKey'], string> = {
  ember: 'flame partner',
  leaf: 'moss tactician',
  wave: 'aqua checker',
  spark: 'volt builder',
  moon: 'night runner',
  bloom: 'lumen stylist',
  pearl: 'ink weaver',
}

const spriteIndexByCharacterKey: Record<OfficeAgent['characterKey'], string> = {
  ember: '01',
  leaf: '04',
  bloom: '07',
  spark: '10',
  wave: '13',
  moon: '16',
  pearl: '02',
}

type SpriteAsset = { folder: string; fileName: (index: string) => string }

const catAssetByStatus: Record<OfficeAgent['status'], SpriteAsset> = {
  idle: { folder: 'SleepingCat', fileName: (index) => `${index}_Sleep.png` },
  planning: { folder: 'WinkCat', fileName: (index) => `${index}_Wink.png` },
  researching: { folder: 'WinkCat', fileName: (index) => `${index}_Wink.png` },
  building: { folder: 'RunningCat', fileName: (index) => `${index}.png` },
  verifying: { folder: 'Cat', fileName: (index) => `${index}.png` },
  blocked: { folder: 'Cat', fileName: (index) => `${index}.png` },
  syncing: { folder: 'RunningCat', fileName: (index) => `${index}.png` },
}

const moveCatAsset: SpriteAsset = {
  folder: 'MoveCat',
  fileName: (index) => `${index}.png`,
}

export function AgentSprite({ agent, selected, running = false, onClick }: AgentSpriteProps) {
  const spriteCandidates = useMemo(() => {
    const spriteIndex = spriteIndexByCharacterKey[agent.characterKey]
    const primaryAsset =
      running && agent.status === 'idle'
        ? { folder: 'RunningCat', fileName: (index: string) => `${index}.png` }
        : catAssetByStatus[agent.status]
    const fallbackAsset =
      primaryAsset.folder === 'RunningCat' ? moveCatAsset : null

    return [
      withBasePath(`catrush-cats/${primaryAsset.folder}/${primaryAsset.fileName(spriteIndex)}`),
      ...(fallbackAsset
        ? [withBasePath(`catrush-cats/${fallbackAsset.folder}/${fallbackAsset.fileName(spriteIndex)}`)]
        : []),
      withBasePath(`catrush-cats/Cat/${spriteIndex}.png`),
    ]
  }, [agent.characterKey, agent.status, running])

  const [imageSrc, setImageSrc] = useState(spriteCandidates[0])

  useEffect(() => {
    setImageSrc(spriteCandidates[0])
  }, [spriteCandidates])

  const handleImageError = () => {
    const currentIndex = spriteCandidates.indexOf(imageSrc)
    const nextSrc = spriteCandidates[currentIndex + 1]
    if (nextSrc && nextSrc !== imageSrc) {
      setImageSrc(nextSrc)
    }
  }

  return (
    <button
      type="button"
      className={`agent-sprite ${selected ? 'agent-sprite--selected' : ''} ${running ? 'agent-sprite--running' : ''}`}
      onClick={onClick}
    >
      <span className={`agent-sprite__bubble agent-sprite__bubble--${agent.status}`}>
        {officeStatusLabels[agent.status]}
      </span>
      <span className={`agent-sprite__portrait agent-sprite__portrait--${agent.characterKey}`}>
        <span className="agent-sprite__shadow" />
        <span
          className="agent-sprite__image-frame"
          aria-label={agent.name}
          role="img"
        >
          <img
            className="agent-sprite__image"
            src={imageSrc}
            alt={agent.name}
            onError={handleImageError}
          />
        </span>
        <span className="agent-sprite__badge">
          <span className="agent-sprite__sigil">{characterSigilByKey[agent.characterKey]}</span>
        </span>
      </span>
      <span className="agent-sprite__nameplate">
        <span className="agent-sprite__name">{agent.name}</span>
        <span className="agent-sprite__title">{characterTitleByKey[agent.characterKey]}</span>
      </span>
    </button>
  )
}
