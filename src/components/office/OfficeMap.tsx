import { officeZones } from '../../data/agents'
import type { OfficeAgent, OfficeZoneId } from '../../types/office'
import { AgentSprite } from './AgentSprite'

interface OfficeMapProps {
  agents: OfficeAgent[]
  selectedAgentId?: string
  onSelectAgent: (agentId: string) => void
}

const assetBaseUrl =
  'https://raw.githubusercontent.com/ringhyacinth/Star-Office-UI/f29c107e9728a72f2635f10b4e8203b29b37221d/frontend'

type ImageAsset = {
  className: string
  kind: 'image'
  src: string
  alt: string
}

type FrameAsset = {
  className: string
  kind: 'frame'
  src: string
  frameWidth: number
  frameHeight: number
  scale: number
  alt: string
}

const decorativeAssets: Array<ImageAsset | FrameAsset> = [
  {
    className: 'office-room__asset office-room__asset--sofa',
    kind: 'image',
    src: `${assetBaseUrl}/sofa-idle-v3.png`,
    alt: 'Star Office sofa',
  },
  {
    className: 'office-room__asset office-room__asset--desk',
    kind: 'image',
    src: `${assetBaseUrl}/desk-v3.webp`,
    alt: 'Star Office desk',
  },
  {
    className: 'office-room__asset office-room__asset--flower',
    kind: 'frame',
    src: `${assetBaseUrl}/flowers-bloom-v2.webp`,
    frameWidth: 128,
    frameHeight: 128,
    scale: 0.6,
    alt: 'Star Office flower',
  },
  {
    className: 'office-room__asset office-room__asset--poster',
    kind: 'frame',
    src: `${assetBaseUrl}/posters-spritesheet.webp`,
    frameWidth: 160,
    frameHeight: 160,
    scale: 0.56,
    alt: 'Star Office poster',
  },
  {
    className: 'office-room__asset office-room__asset--coffee',
    kind: 'frame',
    src: `${assetBaseUrl}/coffee-machine-v3-grid.webp`,
    frameWidth: 230,
    frameHeight: 230,
    scale: 0.37,
    alt: 'Star Office coffee machine',
  },
  {
    className: 'office-room__asset office-room__asset--server',
    kind: 'frame',
    src: `${assetBaseUrl}/serverroom-spritesheet.webp`,
    frameWidth: 180,
    frameHeight: 251,
    scale: 0.7,
    alt: 'Star Office server room',
  },
  {
    className: 'office-room__asset office-room__asset--sync',
    kind: 'frame',
    src: `${assetBaseUrl}/sync-animation-v3-grid.webp`,
    frameWidth: 256,
    frameHeight: 256,
    scale: 0.48,
    alt: 'Star Office sync animation',
  },
  {
    className: 'office-room__asset office-room__asset--plant-a',
    kind: 'frame',
    src: `${assetBaseUrl}/plants-spritesheet.webp`,
    frameWidth: 160,
    frameHeight: 160,
    scale: 0.44,
    alt: 'Star Office plant',
  },
  {
    className: 'office-room__asset office-room__asset--plant-b',
    kind: 'frame',
    src: `${assetBaseUrl}/plants-spritesheet.webp`,
    frameWidth: 160,
    frameHeight: 160,
    scale: 0.44,
    alt: 'Star Office plant',
  },
  {
    className: 'office-room__asset office-room__asset--plant-c',
    kind: 'frame',
    src: `${assetBaseUrl}/plants-spritesheet.webp`,
    frameWidth: 160,
    frameHeight: 160,
    scale: 0.44,
    alt: 'Star Office plant',
  },
]

const zoneAnchorById: Record<OfficeZoneId, { left: number; top: number; area: string }> = {
  lounge: { left: 52, top: 20, area: 'breakroom' },
  'pm-desk': { left: 17, top: 49, area: 'writing' },
  'research-lab': { left: 18, top: 35, area: 'researching' },
  'dev-desk': { left: 16, top: 63, area: 'executing' },
  'qa-zone': { left: 30, top: 63, area: 'checking' },
  'debug-corner': { left: 81, top: 21, area: 'error' },
  'briefing-board': { left: 81, top: 76, area: 'syncing' },
}

const loungeSlotOffsets = [
  { left: 0, top: 10, behavior: 'rest' },
  { left: 88, top: 6, behavior: 'roam', variant: 'a' },
  { left: 176, top: 14, behavior: 'rest' },
  { left: 264, top: 8, behavior: 'roam', variant: 'b' },
  { left: 44, top: 116, behavior: 'roam', variant: 'c' },
  { left: 132, top: 120, behavior: 'rest' },
  { left: 220, top: 112, behavior: 'roam', variant: 'a' },
] as const

export function OfficeMap({
  agents,
  selectedAgentId,
  onSelectAgent,
}: OfficeMapProps) {
  return (
    <div className="office-map">
      <div className="office-room">
        {decorativeAssets.map((asset) =>
          asset.kind === 'image' ? (
            <img key={asset.className} className={asset.className} src={asset.src} alt={asset.alt} />
          ) : (
            <span
              key={asset.className}
              className={`${asset.className} office-room__asset-frame`}
              aria-label={asset.alt}
              role="img"
              style={{
                width: `${asset.frameWidth * asset.scale}px`,
                height: `${asset.frameHeight * asset.scale}px`,
              }}
            >
              <span
                className="office-room__asset-frame-inner"
                style={{
                  width: `${asset.frameWidth}px`,
                  height: `${asset.frameHeight}px`,
                  backgroundImage: `url(${asset.src})`,
                  transform: `scale(${asset.scale})`,
                }}
              />
            </span>
          ),
        )}

        {officeZones.map((zone) => {
          const zoneAgents = agents.filter((agent) => agent.zone === zone.id)
          const anchor = zoneAnchorById[zone.id]

          return (
            <section
              key={zone.id}
              className={`office-area office-area--${zone.id} office-area--${zone.accent}`}
              style={{ left: `${anchor.left}%`, top: `${anchor.top}%` }}
            >
              <header className="office-area__label">
                <strong>{zone.name}</strong>
                <span>{anchor.area}</span>
              </header>

              <div className="office-area__agents">
                {zoneAgents.length > 0 ? (
                  zoneAgents.map((agent, index) => {
                    const loungeSlot = loungeSlotOffsets[index % loungeSlotOffsets.length]
                    const isLoungeAgent = zone.id === 'lounge' && agent.status === 'idle'
                    const isRoaming = isLoungeAgent && loungeSlot.behavior === 'roam'
                    const left = isLoungeAgent ? loungeSlot.left : (index % 2) * 88
                    const top = isLoungeAgent ? loungeSlot.top : Math.floor(index / 2) * 112

                    return (
                      <div
                        key={agent.id}
                        className={`office-area__agent-slot ${
                          isRoaming
                            ? `office-area__agent-slot--lounge office-area__agent-slot--roam-${loungeSlot.variant}`
                            : ''
                        }`}
                        style={{
                          left: `${left}px`,
                          top: `${top}px`,
                        }}
                      >
                        <AgentSprite
                          agent={agent}
                          selected={agent.id === selectedAgentId}
                          running={isRoaming || agent.status === 'building' || agent.status === 'syncing'}
                          onClick={() => onSelectAgent(agent.id)}
                        />
                      </div>
                    )
                  })
                ) : (
                  <div className="office-area__empty">empty</div>
                )}
              </div>
            </section>
          )
        })}

        <div className="office-room__plaque">
          <strong>LIM Studio</strong>
          <span>Agent Office</span>
        </div>
      </div>
    </div>
  )
}
