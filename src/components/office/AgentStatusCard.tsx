import { officeStatusLabels, type OfficeAgent } from '../../types/office'

interface AgentStatusCardProps {
  agent: OfficeAgent
}

const priorityLabel: Record<OfficeAgent['priority'], string> = {
  low: '낮음',
  medium: '보통',
  high: '높음',
}

export function AgentStatusCard({ agent }: AgentStatusCardProps) {
  return (
    <article className="status-card">
      <header className="status-card__header">
        <div>
          <p className="status-card__role">{agent.role}</p>
          <h3>{agent.name}</h3>
        </div>
        <span className={`status-badge status-badge--${agent.status}`}>
          {officeStatusLabels[agent.status]}
        </span>
      </header>

      <dl className="status-card__meta">
        <div>
          <dt>현재 작업</dt>
          <dd>{agent.taskSummary}</dd>
        </div>
        <div>
          <dt>최근 갱신</dt>
          <dd>{agent.lastUpdate}</dd>
        </div>
        <div>
          <dt>우선순위</dt>
          <dd>{priorityLabel[agent.priority]}</dd>
        </div>
        <div>
          <dt>에너지</dt>
          <dd>{agent.energy}%</dd>
        </div>
      </dl>

      <div className="status-card__energy">
        <div className="status-card__energy-bar">
          <div style={{ width: `${agent.energy}%` }} />
        </div>
      </div>
    </article>
  )
}
