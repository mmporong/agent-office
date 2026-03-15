export type AgentStatus =
  | 'idle'
  | 'planning'
  | 'researching'
  | 'building'
  | 'verifying'
  | 'blocked'
  | 'syncing'

export type OfficeZoneId =
  | 'lounge'
  | 'pm-desk'
  | 'research-lab'
  | 'dev-desk'
  | 'qa-zone'
  | 'debug-corner'
  | 'briefing-board'

export interface OfficeAgent {
  id: string
  name: string
  role: string
  status: AgentStatus
  zone: OfficeZoneId
  taskSummary: string
  lastUpdate: string
  priority: 'low' | 'medium' | 'high'
  energy: number
  characterKey: 'ember' | 'leaf' | 'wave' | 'spark' | 'moon' | 'bloom' | 'pearl'
}

export interface OfficeZone {
  id: OfficeZoneId
  name: string
  description: string
  accent: string
}

export const officeStatusLabels: Record<AgentStatus, string> = {
  idle: '대기',
  planning: '기획',
  researching: '조사',
  building: '구현',
  verifying: '검증',
  blocked: '오류',
  syncing: '동기화',
}
