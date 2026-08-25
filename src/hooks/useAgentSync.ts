import { useCallback, useEffect, useRef, useState } from 'react'
import type { AgentStatus } from '../types/office'
import { withBasePath } from '../utils/publicPath'

export interface ExternalAgentState {
  status: AgentStatus
  task: string
}

export interface StatusPayload {
  lastUpdated: string
  source: string
  agents: Record<string, ExternalAgentState>
}

export type SyncMode = 'auto' | 'manual'

interface UseAgentSyncResult {
  syncMode: SyncMode
  setSyncMode: (mode: SyncMode) => void
  externalState: StatusPayload | null
  lastSyncTime: string | null
  syncError: string | null
  forceSync: () => void
}

const POLL_INTERVAL_MS = 30_000

const VALID_STATUSES: Set<string> = new Set([
  'idle', 'planning', 'researching', 'building', 'verifying', 'blocked', 'syncing',
])

function isValidPayload(data: unknown): data is StatusPayload {
  if (typeof data !== 'object' || data === null) return false
  const obj = data as Record<string, unknown>
  if (typeof obj.lastUpdated !== 'string') return false
  if (typeof obj.agents !== 'object' || obj.agents === null) return false

  const agents = obj.agents as Record<string, unknown>
  for (const val of Object.values(agents)) {
    if (typeof val !== 'object' || val === null) return false
    const agent = val as Record<string, unknown>
    if (typeof agent.status !== 'string' || !VALID_STATUSES.has(agent.status)) return false
    if (typeof agent.task !== 'string') return false
    if (agent.task.length > 200) return false
  }

  return true
}

export function useAgentSync(): UseAgentSyncResult {
  const [syncMode, setSyncMode] = useState<SyncMode>(() => {
    try {
      const stored = localStorage.getItem('dev-studio-sync-mode')
      return stored === 'manual' ? 'manual' : 'auto'
    } catch {
      return 'auto'
    }
  })
  const [externalState, setExternalState] = useState<StatusPayload | null>(null)
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null)
  const [syncError, setSyncError] = useState<string | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const fetchStatus = useCallback(async () => {
    try {
      const url = `${withBasePath('status.json')}?t=${Date.now()}`
      const res = await fetch(url)

      if (!res.ok) {
        setSyncError(`status.json 응답 오류 (HTTP ${res.status})`)
        return
      }

      const data: unknown = await res.json()

      if (!isValidPayload(data)) {
        setSyncError('status.json 형식이 올바르지 않음')
        return
      }

      setExternalState(data)
      setLastSyncTime(new Date().toLocaleTimeString('ko-KR'))
      setSyncError(null)
    } catch (err) {
      setSyncError(`status.json 요청 실패 (${err instanceof Error ? err.message : '네트워크 오류'})`)
    }
  }, [])

  const handleSetSyncMode = useCallback((mode: SyncMode) => {
    setSyncMode(mode)
    try {
      localStorage.setItem('dev-studio-sync-mode', mode)
    } catch { /* noop */ }
  }, [])

  useEffect(() => {
    if (syncMode !== 'auto') {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }

    void fetchStatus()
    intervalRef.current = setInterval(() => void fetchStatus(), POLL_INTERVAL_MS)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [syncMode, fetchStatus])

  return {
    syncMode,
    setSyncMode: handleSetSyncMode,
    externalState,
    lastSyncTime,
    syncError,
    forceSync: fetchStatus,
  }
}
