import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import {
  agents as initialAgents,
  upcomingTasks,
} from '../data/agents'
import {
  readinessChecks,
} from '../data/meowbeat'
import { useUnityBridge } from '../hooks/useUnityBridge'
import { usePersistentJournal } from '../hooks/usePersistentJournal'
import type { AgentStatus, OfficeAgent, OfficeZoneId } from '../types/office'

const zoneByStatus: Record<AgentStatus, OfficeZoneId> = {
  idle: 'lounge',
  planning: 'pm-desk',
  researching: 'research-lab',
  building: 'dev-desk',
  verifying: 'qa-zone',
  blocked: 'debug-corner',
  syncing: 'briefing-board',
}

const taskLineByStatus: Record<AgentStatus, string> = {
  idle: '다음 작업을 기다리며 라운지에서 대기 중',
  planning: '우선순위와 범위를 정리하는 중',
  researching: '자료와 리스크를 조사하는 중',
  building: '실제 화면과 기능을 구현하는 중',
  verifying: '동작과 회귀를 검증하는 중',
  blocked: '문제 원인을 좁히며 막힘을 해소하는 중',
  syncing: '문서와 릴리즈 정보를 동기화하는 중',
}

type WorkDirective = {
  agentId: OfficeAgent['id']
  status: Exclude<AgentStatus, 'idle' | 'blocked'>
  note: string
}

const loungeNoteByAgentId: Record<OfficeAgent['id'], string> = {
  orchestrator: 'Orchestrator: 현재 진행 중인 작업이 없어 라운지에서 전체 흐름을 정리 중',
  'game-designer': 'Game Designer: 기획 요청이 없어 라운지에서 이코노미 밸런스를 검토 중',
  developer: 'Developer: 구현 요청이 없어 라운지에서 쉬며 다음 작업을 기다리는 중',
  'qa-tester': 'QA Tester: 검증할 빌드가 없어 라운지에서 테스트 메모를 정리 중',
  'content-writer': 'Content Writer: 콘텐츠 요청 전까지 라운지에서 초안을 다듬는 중',
  devops: 'DevOps: 배포할 변경이 없어 라운지에서 릴리즈 노트를 정리 중',
  'art-director': 'Art Director: 새 화면 요청 전까지 라운지에서 무드보드를 정리 중',
}

const workScenarios: WorkDirective[][] = [
  [
    { agentId: 'orchestrator', status: 'planning', note: 'Orchestrator: 오늘 처리할 작업 범위와 우선순위를 잠그는 중' },
    { agentId: 'game-designer', status: 'researching', note: 'Game Designer: 현재 작업 후보의 이코노미와 선행 조건을 점검 중' },
    { agentId: 'art-director', status: 'planning', note: 'Art Director: 구현 전 필요한 화면 흐름과 톤을 정리 중' },
  ],
  [
    { agentId: 'developer', status: 'building', note: 'Developer: 확정된 요구를 바탕으로 실제 시스템과 기능을 구현 중' },
    { agentId: 'art-director', status: 'planning', note: 'Art Director: 구현 단계에서 필요한 스프라이트 스펙을 보강 중' },
    { agentId: 'content-writer', status: 'researching', note: 'Content Writer: 개발 진행 상황을 데브로그 초안으로 정리 중' },
  ],
  [
    { agentId: 'developer', status: 'building', note: 'Developer: 마무리 수정과 연결 작업을 이어가는 중' },
    { agentId: 'qa-tester', status: 'verifying', note: 'QA Tester: 방금 나온 결과를 기준으로 회귀와 동작을 검증 중' },
    { agentId: 'devops', status: 'syncing', note: 'DevOps: 변경 사항을 문서와 배포 흐름에 반영하는 중' },
  ],
]

function updateAgent(agent: OfficeAgent, status: AgentStatus, note?: string): OfficeAgent {
  const energyDelta: Record<AgentStatus, number> = {
    idle: 5, planning: -2, researching: -4, building: -7,
    verifying: -3, blocked: -9, syncing: -2,
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

function sendAgentToLounge(agent: OfficeAgent, note?: string): OfficeAgent {
  return updateAgent(agent, 'idle', note ?? loungeNoteByAgentId[agent.id])
}

function applyWorkScenario(agents: OfficeAgent[], scenarioIndex: number, currentTask: string): OfficeAgent[] {
  const directives = workScenarios[scenarioIndex] ?? []
  const directiveByAgentId = new Map(directives.map((d) => [d.agentId, d]))
  return agents.map((agent) => {
    if (agent.status === 'blocked') return agent
    const directive = directiveByAgentId.get(agent.id)
    if (!directive) return sendAgentToLounge(agent)
    return updateAgent(agent, directive.status, `${directive.note} · ${currentTask}`)
  })
}

interface OfficeContextValue {
  officeAgents: OfficeAgent[]
  selectedAgent: OfficeAgent | undefined
  selectedAgentId: string
  setSelectedAgentId: (id: string) => void
  pulseCount: number
  activeScenarioIndex: number | null
  activeWorkers: number
  runWorkPulse: () => void
  sendAllIdle: () => void
  blockSelectedAgent: () => void
  // Unity bridge
  config: ReturnType<typeof useUnityBridge>['config']
  configAttached: boolean
  configError: string | null
  emitUnityEvent: ReturnType<typeof useUnityBridge>['emitUnityEvent']
  logEntries: ReturnType<typeof useUnityBridge>['logEntries']
  reloadConfig: ReturnType<typeof useUnityBridge>['reloadConfig']
  rewardGrantedCount: number
  runtimeReady: boolean
  sendWrapperCommand: ReturnType<typeof useUnityBridge>['sendWrapperCommand']
  // Journal
  journalEntries: ReturnType<typeof usePersistentJournal>['entries']
  latestEntry: ReturnType<typeof usePersistentJournal>['latestEntry']
  // Derived
  liveReadinessChecks: typeof readinessChecks
  phaseLabel: string
  riskLabel: string
}

const OfficeContext = createContext<OfficeContextValue | null>(null)

export function OfficeProvider({ children }: { children: ReactNode }) {
  const [officeAgents, setOfficeAgents] = useState<OfficeAgent[]>(() =>
    initialAgents.map((agent) => sendAgentToLounge(agent)),
  )
  const [selectedAgentId, setSelectedAgentId] = useState<string>(initialAgents[0]?.id ?? '')
  const [pulseCount, setPulseCount] = useState(0)
  const [activeTaskIndex, setActiveTaskIndex] = useState(0)
  const [activeScenarioIndex, setActiveScenarioIndex] = useState<number | null>(null)

  const bridge = useUnityBridge()
  const journal = usePersistentJournal()

  const selectedAgent = useMemo(
    () => officeAgents.find((a) => a.id === selectedAgentId) ?? officeAgents[0],
    [officeAgents, selectedAgentId],
  )

  const activeWorkers = useMemo(
    () => officeAgents.filter((a) => a.status !== 'idle' && a.status !== 'blocked').length,
    [officeAgents],
  )

  const liveReadinessChecks = useMemo(
    () =>
      readinessChecks.map((item) => {
        if (item.title === 'Unity WebGL 캔버스 마운트') {
          return bridge.configAttached
            ? { ...item, detail: `config.json 연결 완료 (${bridge.config?.buildVersion ?? '-'})`, status: 'ready' as const }
            : { ...item, detail: bridge.configError ?? 'config.json은 준비됐지만 실제 loader/data/framework/code 경로는 아직 비어 있음', status: bridge.configError ? ('blocked' as const) : ('pending' as const) }
        }
        if (item.title === '저장 전략' && bridge.runtimeReady) {
          return { ...item, detail: 'wrapper:lifecycle-change 및 save-requested 브리지 표면이 준비됨', status: 'ready' as const }
        }
        return item
      }),
    [bridge.config?.buildVersion, bridge.configAttached, bridge.configError, bridge.runtimeReady],
  )

  const phaseLabel = bridge.runtimeReady ? 'Runtime linked' : bridge.configAttached ? 'Build wired' : 'Local office sim'
  const riskLabel = bridge.configError
    ? 'Config blocked'
    : liveReadinessChecks.some((i) => i.status === 'blocked')
      ? 'Unity path missing'
      : 'Bridge pending'

  const runWorkPulse = () => {
    const nextPulse = pulseCount + 1
    const currentTask = upcomingTasks[activeTaskIndex] ?? '현재 진행 중인 작업 없음'

    if (activeScenarioIndex !== null && activeScenarioIndex >= workScenarios.length - 1) {
      setPulseCount(nextPulse)
      setActiveScenarioIndex(null)
      setActiveTaskIndex((c) => (c + 1) % upcomingTasks.length)
      setOfficeAgents((c) => c.map((a) => sendAgentToLounge(a, `${a.name}: ${currentTask} 단계를 마치고 라운지에서 쉬는 중`)))
      return
    }

    const nextScenarioIndex = activeScenarioIndex === null ? 0 : activeScenarioIndex + 1
    setPulseCount(nextPulse)
    setActiveScenarioIndex(nextScenarioIndex)
    setOfficeAgents((c) => applyWorkScenario(c, nextScenarioIndex, currentTask))
  }

  const sendAllIdle = () => {
    setPulseCount(0)
    setActiveTaskIndex(0)
    setActiveScenarioIndex(null)
    setOfficeAgents((c) => c.map((a) => sendAgentToLounge(a)))
  }

  const blockSelectedAgent = () => {
    if (!selectedAgent) return
    if (activeScenarioIndex === null) {
      setOfficeAgents((c) => c.map((a) =>
        a.id === selectedAgent.id ? sendAgentToLounge(a, `${a.name}: 아직 처리 중인 작업이 없어 라운지에서 대기 중`) : a,
      ))
      return
    }
    setOfficeAgents((c) => c.map((a) =>
      a.id === selectedAgent.id ? updateAgent(a, 'blocked', `${a.name}: 긴급 이슈를 디버그 중`) : a,
    ))
  }

  const value: OfficeContextValue = {
    officeAgents, selectedAgent, selectedAgentId, setSelectedAgentId,
    pulseCount, activeScenarioIndex, activeWorkers,
    runWorkPulse, sendAllIdle, blockSelectedAgent,
    config: bridge.config, configAttached: bridge.configAttached, configError: bridge.configError,
    emitUnityEvent: bridge.emitUnityEvent, logEntries: bridge.logEntries,
    reloadConfig: bridge.reloadConfig, rewardGrantedCount: bridge.rewardGrantedCount,
    runtimeReady: bridge.runtimeReady, sendWrapperCommand: bridge.sendWrapperCommand,
    journalEntries: journal.entries, latestEntry: journal.latestEntry,
    liveReadinessChecks, phaseLabel, riskLabel,
  }

  return <OfficeContext value={value}>{children}</OfficeContext>
}

export function useOffice() {
  const ctx = useContext(OfficeContext)
  if (!ctx) throw new Error('useOffice must be used within OfficeProvider')
  return ctx
}
