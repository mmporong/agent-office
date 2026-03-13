import { useEffect, useMemo, useState } from 'react'
import { officeStatusLabels, type OfficeAgent } from '../../types/office'
import { withBasePath } from '../../utils/publicPath'

interface AgentSpriteProps {
  agent: OfficeAgent
  selected: boolean
  onClick: () => void
}

const assetBaseUrl =
  'https://raw.githubusercontent.com/ringhyacinth/Star-Office-UI/f29c107e9728a72f2635f10b4e8203b29b37221d/frontend'

const characterSigilByKey: Record<OfficeAgent['characterKey'], string> = {
  ember: 'FLR',
  leaf: 'MSS',
  wave: 'AQU',
  spark: 'VLT',
  moon: 'NXT',
  bloom: 'LUX',
}

const characterTitleByKey: Record<OfficeAgent['characterKey'], string> = {
  ember: 'flame partner',
  leaf: 'moss tactician',
  wave: 'aqua checker',
  spark: 'volt builder',
  moon: 'night runner',
  bloom: 'lumen stylist',
}

const clawCatSpriteUrl = `${assetBaseUrl}/guest_anim_1.webp`

const spriteIndexByCharacterKey: Record<OfficeAgent['characterKey'], string> = {
  ember: '01',
  leaf: '04',
  bloom: '07',
  spark: '10',
  wave: '13',
  moon: '16',
}

const catAssetByStatus: Record<
  OfficeAgent['status'],
  { folder: string; fileName: (index: string) => string }
> = {
  idle: { folder: 'SleepingCat', fileName: (index) => `${index}_Sleep.png` },
  planning: { folder: 'Cat', fileName: (index) => `${index}.png` },
  researching: { folder: 'WinkCat', fileName: (index) => `${index}_Wink.png` },
  building: { folder: 'MoveCat', fileName: (index) => `${index}.png` },
  verifying: { folder: 'HandCat', fileName: (index) => `${index}_Hand.png` },
  blocked: { folder: 'BallCat', fileName: (index) => `${index}.png` },
  syncing: { folder: 'BackCat', fileName: (index) => `${index}_Back.png` },
}

export function AgentSprite({ agent, selected, onClick }: AgentSpriteProps) {
  const spriteUrl = useMemo(() => {
    const spriteIndex = spriteIndexByCharacterKey[agent.characterKey]
    const asset = catAssetByStatus[agent.status]
    return withBasePath(`catrush-cats/${asset.folder}/${asset.fileName(spriteIndex)}`)
  }, [agent.characterKey, agent.status])

  const [imageSrc, setImageSrc] = useState(spriteUrl)

  useEffect(() => {
    setImageSrc(spriteUrl)
  }, [spriteUrl])

  return (
    <button
      type="button"
      className={`agent-sprite ${selected ? 'agent-sprite--selected' : ''}`}
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
            onError={() => setImageSrc(clawCatSpriteUrl)}
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
