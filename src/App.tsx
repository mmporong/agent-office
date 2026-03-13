import { useMemo, useState } from 'react'
import './App.css'
import { AgentStatusCard } from './components/office/AgentStatusCard'
import { OfficeMap } from './components/office/OfficeMap'
import { PhaseHeader } from './components/office/PhaseHeader'
import { TaskTicker } from './components/office/TaskTicker'
import {
  agents as initialAgents,
  currentProject,
  todayGoals,
  upcomingTasks,
} from './data/agents'
import {
  bridgeContracts,
  collectionPreview,
  launchBlockers,
  milestones,
  readinessChecks,
} from './data/catMergeCafe'
import {
  chroniclePhases,
  cliAgentGroups,
  supportAgentRoles,
} from './data/chronicle'
import { journalMemoryRules } from './data/operationsJournal'
import { usePersistentJournal } from './hooks/usePersistentJournal'
import { useUnityBridge } from './hooks/useUnityBridge'
import type { AgentStatus, OfficeAgent, OfficeZoneId } from './types/office'

const zoneByStatus: Record<AgentStatus, OfficeZoneId> = {
  idle: 'lounge',
  planning: 'pm-desk',
  researching: 'research-lab',
  building: 'dev-desk',
  verifying: 'qa-zone',
  blocked: 'debug-corner',
  syncing: 'briefing-board',
}

const workCycle: AgentStatus[] = [
  'planning',
  'researching',
  'building',
  'verifying',
  'syncing',
  'idle',
]

const taskLineByStatus: Record<AgentStatus, string> = {
  idle: '다음 작업을 기다리며 라운지에서 대기 중',
  planning: '우선순위와 범위를 정리하는 중',
  researching: '자료와 리스크를 조사하는 중',
  building: '실제 화면과 기능을 구현하는 중',
  verifying: '동작과 회귀를 검증하는 중',
  blocked: '문제 원인을 좁히며 막힘을 해소하는 중',
  syncing: '문서와 릴리즈 정보를 동기화하는 중',
}

type ViewTab = 'office' | 'chronicle' | 'agents'

function updateAgent(agent: OfficeAgent, status: AgentStatus, note?: string): OfficeAgent {
  const energyDelta: Record<AgentStatus, number> = {
    idle: 5,
    planning: -2,
    researching: -4,
    building: -7,
    verifying: -3,
    blocked: -9,
    syncing: -2,
  }

  return {
    ...agent,
    status,
    zone: zoneByStatus[status],
    taskSummary: note ?? `${agent.name}: ${taskLineByStatus[status]}`,
    lastUpdate: '방금 갱신됨',
    energy: Math.max(28, Math.min(100, agent.energy + energyDelta[status])),
  }
}

function App() {
  const [officeAgents, setOfficeAgents] = useState<OfficeAgent[]>(initialAgents)
  const [selectedAgentId, setSelectedAgentId] = useState<string>(
    initialAgents[0]?.id ?? '',
  )
  const [pulseCount, setPulseCount] = useState(0)
  const [activeTab, setActiveTab] = useState<ViewTab>('office')

  const {
    config,
    configAttached,
    configError,
    emitUnityEvent,
    logEntries,
    reloadConfig,
    rewardGrantedCount,
    runtimeReady,
    sendWrapperCommand,
  } = useUnityBridge()
  const { entries: journalEntries, latestEntry } = usePersistentJournal()

  const selectedAgent = useMemo(
    () => officeAgents.find((agent) => agent.id === selectedAgentId) ?? officeAgents[0],
    [officeAgents, selectedAgentId],
  )

  const liveReadinessChecks = useMemo(
    () =>
      readinessChecks.map((item) => {
        if (item.title === 'Unity WebGL 캔버스 마운트') {
          return configAttached
            ? {
                ...item,
                detail: `config.json 연결 완료 (${config?.buildVersion ?? '-'})`,
                status: 'ready' as const,
              }
            : {
                ...item,
                detail:
                  configError ??
                  'config.json은 준비됐지만 실제 loader/data/framework/code 경로는 아직 비어 있음',
                status: configError ? ('blocked' as const) : ('pending' as const),
              }
        }

        if (item.title === '저장 전략' && runtimeReady) {
          return {
            ...item,
            detail: 'wrapper:lifecycle-change 및 save-requested 브리지 표면이 준비됨',
            status: 'ready' as const,
          }
        }

        return item
      }),
    [config?.buildVersion, configAttached, configError, runtimeReady],
  )

  const phaseLabel = runtimeReady
    ? 'Runtime linked'
    : configAttached
      ? 'Build wired'
      : 'Local office sim'

  const riskLabel = configError
    ? 'Config blocked'
    : liveReadinessChecks.some((item) => item.status === 'blocked')
      ? 'Unity path missing'
      : 'Bridge pending'

  const runWorkPulse = () => {
    setPulseCount((count) => count + 1)
    setOfficeAgents((current) =>
      current.map((agent, index) => {
        const status = workCycle[(index + pulseCount + 1) % workCycle.length]
        return updateAgent(agent, status)
      }),
    )
  }

  const sendAllIdle = () => {
    setOfficeAgents((current) =>
      current.map((agent) =>
        updateAgent(agent, 'idle', `${agent.name}: 대기 상태로 복귀`),
      ),
    )
  }

  const blockSelectedAgent = () => {
    if (!selectedAgent) {
      return
    }

    setOfficeAgents((current) =>
      current.map((agent) =>
        agent.id === selectedAgent.id
          ? updateAgent(agent, 'blocked', `${agent.name}: 긴급 이슈를 디버그 중`)
          : agent,
      ),
    )
  }

  return (
    <div className="office-shell">
      <PhaseHeader
        studioName="LIM Studio Agent Office"
        projectName={currentProject.name}
        phaseLabel={phaseLabel}
        riskLabel={riskLabel}
      />

      <div className="tab-bar" role="tablist" aria-label="Local site views">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'office'}
          className={`tab-button ${activeTab === 'office' ? 'tab-button--active' : ''}`}
          onClick={() => setActiveTab('office')}
        >
          Office
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'chronicle'}
          className={`tab-button ${activeTab === 'chronicle' ? 'tab-button--active' : ''}`}
          onClick={() => setActiveTab('chronicle')}
        >
          Chronicle
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'agents'}
          className={`tab-button ${activeTab === 'agents' ? 'tab-button--active' : ''}`}
          onClick={() => setActiveTab('agents')}
        >
          Agents
        </button>
      </div>

      {activeTab === 'office' ? (
        <div className="office-layout">
          <section className="office-panel office-panel--map">
            <div className="office-panel__header">
              <div>
                <p className="office-eyebrow">Star Office aligned layout</p>
                <h1>스타 오피스형 픽셀 사무실</h1>
              </div>
              <div className="office-project-chip">
                <span>현재 프로젝트</span>
                <strong>{currentProject.phase}</strong>
              </div>
            </div>

            <div className="office-scene">
              <OfficeMap
                agents={officeAgents}
                selectedAgentId={selectedAgent?.id}
                onSelectAgent={setSelectedAgentId}
              />

              <div className="scene-toolbar">
                <button type="button" className="scene-button" onClick={runWorkPulse}>
                  업무 라운드 진행
                </button>
                <button type="button" className="scene-button" onClick={sendAllIdle}>
                  전원 대기 전환
                </button>
                <button
                  type="button"
                  className="scene-button scene-button--warn"
                  onClick={blockSelectedAgent}
                >
                  선택 에이전트 막힘 재현
                </button>
                <button
                  type="button"
                  className="scene-button"
                  onClick={() =>
                    emitUnityEvent('unity:runtime-ready', {
                      buildVersion: config?.buildVersion ?? 'mock-build',
                      saveVersion: 'v1',
                    })
                  }
                >
                  runtime-ready 시뮬레이션
                </button>
                <button
                  type="button"
                  className="scene-button"
                  onClick={() =>
                    emitUnityEvent('unity:reward-consumed', {
                      placement: 'office-preview',
                      granted: true,
                      transactionId: `office-${rewardGrantedCount + 1}`,
                    })
                  }
                >
                  reward callback
                </button>
              </div>
            </div>

            <div className="office-footer-panels">
              <section className="briefing-card">
                <div className="briefing-card__header">
                  <h2>브리핑 보드</h2>
                  <span className={`runtime-badge ${runtimeReady ? 'runtime-badge--ready' : ''}`}>
                    {runtimeReady ? 'runtime ready' : 'runtime waiting'}
                  </span>
                </div>
                <div className="contract-grid">
                  {bridgeContracts.slice(0, 4).map((contract) => (
                    <article key={contract.name} className="contract-card">
                      <span className="contract-card__direction">{contract.direction}</span>
                      <h4>{contract.name}</h4>
                      <p>{contract.purpose}</p>
                    </article>
                  ))}
                </div>
              </section>

              <section className="briefing-card">
                <div className="briefing-card__header">
                  <h2>Cat Merge Cafe 진행</h2>
                  <span className="runtime-badge">{rewardGrantedCount} rewards</span>
                </div>
                <div className="milestone-grid">
                  {milestones.map((milestone) => (
                    <article key={milestone.title} className="milestone-card">
                      <div className="milestone-card__header">
                        <span className="milestone-card__index">{milestone.title.slice(1, 2)}</span>
                        <h4>{milestone.title}</h4>
                      </div>
                      <p>{milestone.summary}</p>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          </section>

          <aside className="office-sidebar">
            <section className="office-panel">
              <div className="office-panel__header office-panel__header--compact">
                <div>
                  <p className="office-eyebrow">선택된 에이전트</p>
                  <h2>상태 패널</h2>
                </div>
              </div>
              {selectedAgent ? <AgentStatusCard agent={selectedAgent} /> : null}
            </section>

            <section className="office-panel">
              <div className="office-panel__header office-panel__header--compact">
                <div>
                  <p className="office-eyebrow">오늘의 목표</p>
                  <h2>운영 보드</h2>
                </div>
              </div>
              <ul className="office-checklist">
                {todayGoals.map((goal) => (
                  <li key={goal}>{goal}</li>
                ))}
              </ul>
            </section>

            <section className="office-panel">
              <div className="office-panel__header office-panel__header--compact">
                <div>
                  <p className="office-eyebrow">다음 작업</p>
                  <h2>Task Ticker</h2>
                </div>
              </div>
              <TaskTicker items={upcomingTasks} />
            </section>

            <section className="office-panel">
              <div className="office-panel__header office-panel__header--compact">
                <div>
                  <p className="office-eyebrow">Wrapper / Build</p>
                  <h2>로컬 실행 상태</h2>
                </div>
                <button
                  type="button"
                  className="scene-button scene-button--small"
                  onClick={() => void reloadConfig()}
                >
                  config reload
                </button>
              </div>
              <dl className="config-grid">
                <div>
                  <dt>product</dt>
                  <dd>{config?.productName ?? 'missing'}</dd>
                </div>
                <div>
                  <dt>platform</dt>
                  <dd>{config?.platform ?? 'missing'}</dd>
                </div>
                <div>
                  <dt>canvas</dt>
                  <dd>{config?.canvasId ?? 'missing'}</dd>
                </div>
                <div>
                  <dt>loader</dt>
                  <dd>{config?.loaderUrl || 'not set'}</dd>
                </div>
              </dl>
              <ul className="status-list">
                {liveReadinessChecks.map((item) => (
                  <li key={item.title} className="status-list__item">
                    <span className={`status-dot status-dot--${item.status}`} />
                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section className="office-panel">
              <div className="office-panel__header office-panel__header--compact">
                <div>
                  <p className="office-eyebrow">Recent office log</p>
                  <h2>브리지 로그</h2>
                </div>
                <button
                  type="button"
                  className="scene-button scene-button--small"
                  onClick={() =>
                    sendWrapperCommand('wrapper:request-save', {
                      reason: 'office-manual',
                      slot: 'autosave',
                    })
                  }
                >
                  save ping
                </button>
              </div>
              <ul className="log-list">
                {logEntries.map((entry) => (
                  <li key={entry.id} className="log-list__item">
                    <div className="log-list__meta">
                      <strong>{entry.name}</strong>
                      <span>{entry.direction}</span>
                      <time>{entry.timestamp}</time>
                    </div>
                    <p>{entry.detail}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section className="office-panel">
              <div className="office-panel__header office-panel__header--compact">
                <div>
                  <p className="office-eyebrow">Cat roster</p>
                  <h2>수집 미리보기</h2>
                </div>
              </div>
              <div className="collection-grid">
                {collectionPreview.map((item) => (
                  <article key={item.tier} className="collection-card">
                    <span>{item.tier}</span>
                    <strong>{item.name}</strong>
                    <p>{item.mood}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="office-panel">
              <div className="office-panel__header office-panel__header--compact">
                <div>
                  <p className="office-eyebrow">Release blockers</p>
                  <h2>주의 포인트</h2>
                </div>
              </div>
              <ul className="blocker-list">
                {launchBlockers.map((blocker) => (
                  <li key={blocker}>{blocker}</li>
                ))}
              </ul>
            </section>
          </aside>
        </div>
      ) : null}

      {activeTab === 'chronicle' ? (
        <div className="info-layout">
          <section className="office-panel">
            <div className="office-panel__header">
              <div>
                <p className="office-eyebrow">Chronicle research</p>
                <h1>계획 수립과 진행 흐름</h1>
              </div>
              <div className="office-project-chip">
                <span>현재 포지션</span>
                <strong>Agent Office + Wrapper</strong>
              </div>
            </div>
            <div className="story-grid">
              {chroniclePhases.map((phase) => (
                <article key={phase.title} className="story-card">
                  <h3>{phase.title}</h3>
                  <p>{phase.summary}</p>
                  <div className="story-detail">
                    <strong>구현 상세</strong>
                    <p>{phase.implementationDetail}</p>
                  </div>
                  <div className="story-detail">
                    <strong>주요 로직</strong>
                    <p>{phase.coreLogic}</p>
                  </div>
                  <ul className="story-list">
                    {phase.outcomes.map((outcome) => (
                      <li key={outcome.title}>
                        <strong>{outcome.title}</strong>
                        <p>{outcome.description}</p>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <div className="journal-list">
              {journalEntries.map((entry) => (
                <article key={entry.id} className="journal-card">
                  <div className="journal-card__header">
                    <div>
                      <p className="office-eyebrow">Daily research log</p>
                      <h2>{entry.date}</h2>
                    </div>
                    <span className="runtime-badge">{entry.meetingItems.length} meeting notes</span>
                  </div>

                  <div className="journal-section">
                    <h3>{entry.researchTitle}</h3>
                    <p>{entry.researchSummary}</p>
                    <ul className="story-list">
                      {entry.researchItems.map((item) => (
                        <li key={item.title}>
                          <strong>{item.title}</strong>
                          <p>{item.description}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="journal-section">
                    <h3>{entry.meetingTitle}</h3>
                    <p>{entry.meetingSummary}</p>
                    <ul className="story-list">
                      {entry.meetingItems.map((item) => (
                        <li key={`${entry.date}-${item.speaker}`}>
                          <strong>{item.speaker}</strong>
                          <p>{item.note}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="journal-section">
                    <h3>회의 결정</h3>
                    <ul className="story-list">
                      {entry.decisions.map((item) => (
                        <li key={item.title}>
                          <strong>{item.title}</strong>
                          <p>{item.description}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <aside className="office-sidebar">
            <section className="office-panel">
              <div className="office-panel__header office-panel__header--compact">
                <div>
                  <p className="office-eyebrow">완료된 흐름</p>
                  <h2>세션 누적 성과</h2>
                </div>
              </div>
              <ul className="office-checklist">
                <li>resume 문서 복구 및 작업 대상 확정</li>
                <li>Unity wrapper / bridge 스캐폴딩 구축</li>
                <li>Star-Office 기반 Agent Office 화면화</li>
                <li>Chronicle / Agents 탭을 포함한 웹 문맥 정리</li>
                <li>Chronicle / 인계 문서 최신화</li>
              </ul>
            </section>

            <section className="office-panel">
              <div className="office-panel__header office-panel__header--compact">
                <div>
                  <p className="office-eyebrow">웹 메모리 규칙</p>
                  <h2>데이터 보존 원칙</h2>
                </div>
              </div>
              <ul className="story-list story-list--panel">
                {journalMemoryRules.map((rule) => (
                  <li key={rule.title}>
                    <strong>{rule.title}</strong>
                    <p>{rule.description}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section className="office-panel">
              <div className="office-panel__header office-panel__header--compact">
                <div>
                  <p className="office-eyebrow">현재 블로커</p>
                  <h2>다음 핵심 작업</h2>
                </div>
              </div>
              <ul className="blocker-list">
                {launchBlockers.map((blocker) => (
                  <li key={blocker}>{blocker}</li>
                ))}
              </ul>
              <ul className="task-ticker">
                {upcomingTasks.map((task) => (
                  <li key={task}>{task}</li>
                ))}
              </ul>
            </section>
          </aside>
        </div>
      ) : null}

      {activeTab === 'agents' ? (
        <div className="info-layout">
          <section className="office-panel">
            <div className="office-panel__header">
              <div>
                <p className="office-eyebrow">Agent structure</p>
                <h1>운영 에이전트와 서브 에이전트</h1>
              </div>
              <div className="office-project-chip">
                <span>핵심 오피스 인원</span>
                <strong>{officeAgents.length} agents</strong>
              </div>
            </div>
            <div className="agent-grid agent-grid--wide">
              {officeAgents.map((agent) => (
                <article key={agent.id} className="story-card">
                  <div className="agent-grid__header">
                    <h3>{agent.name}</h3>
                    <span className={`status-badge status-badge--${agent.status}`}>
                      {agent.status}
                    </span>
                  </div>
                  <p>{agent.role}</p>
                  <div className="story-detail">
                    <strong>현재 포지션</strong>
                    <p>{agent.zone}에서 역할 중심 작업을 수행 중이다.</p>
                  </div>
                  <div className="story-detail">
                    <strong>조사 / 실행 메모</strong>
                    <p>{agent.taskSummary}</p>
                  </div>
                  <div className="story-detail">
                    <strong>운영 상태</strong>
                    <p>현재 상태는 `{agent.status}`이며, 에너지 지표는 {agent.energy}로 표시된다.</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <aside className="office-sidebar">
            {latestEntry ? (
              <section className="office-panel">
                <div className="office-panel__header office-panel__header--compact">
                  <div>
                    <p className="office-eyebrow">최근 회의</p>
                    <h2>{latestEntry.date} 결정 메모</h2>
                  </div>
                </div>
                <ul className="story-list story-list--panel">
                  {latestEntry.decisions.map((item) => (
                    <li key={item.title}>
                      <strong>{item.title}</strong>
                      <p>{item.description}</p>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <section className="office-panel">
              <div className="office-panel__header office-panel__header--compact">
                <div>
                  <p className="office-eyebrow">보조 역할</p>
                  <h2>온디맨드 에이전트</h2>
                </div>
              </div>
              <div className="story-grid story-grid--compact">
                {supportAgentRoles.map((agent) => (
                  <article key={agent.name} className="story-card">
                    <h3>{agent.name}</h3>
                    <p>{agent.role}</p>
                    <div className="story-detail">
                      <strong>조사 메모</strong>
                      <p>{agent.detail}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="office-panel">
              <div className="office-panel__header office-panel__header--compact">
                <div>
                  <p className="office-eyebrow">CLI sub-agents</p>
                  <h2>추천 활용 그룹</h2>
                </div>
              </div>
              <div className="story-grid story-grid--compact">
                {cliAgentGroups.map((group) => (
                  <article key={group.title} className="story-card">
                    <h3>{group.title}</h3>
                    <p>{group.summary}</p>
                    <ul className="story-list">
                      {group.agents.map((agent) => (
                        <li key={agent.title}>
                          <strong>{agent.title}</strong>
                          <p>{agent.description}</p>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>
          </aside>
        </div>
      ) : null}
    </div>
  )
}

export default App
