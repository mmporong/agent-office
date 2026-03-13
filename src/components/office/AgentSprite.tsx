import { officeStatusLabels, type OfficeAgent } from '../../types/office'

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

export function AgentSprite({ agent, selected, onClick }: AgentSpriteProps) {
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
          <span
            className="agent-sprite__image"
            style={{
              backgroundImage: `url(${clawCatSpriteUrl})`,
              backgroundPosition: '0 0',
            }}
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
