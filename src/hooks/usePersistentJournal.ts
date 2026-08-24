import { useEffect, useMemo, useState } from 'react'
import { journalStorageKey, type JournalEntry } from '../data/operationsJournal'
import { withBasePath } from '../utils/publicPath'

// 회의록은 public/data/operations-journal.json 에서 fetch 로드한다.
// (2026-08-08 이전에는 operationsJournal.ts 에 인라인돼 실빌드 단일 청크의 91%를 차지했다)
const journalUrl = 'data/operations-journal.json'

type JournalEntryLike = JournalEntry | (Omit<JournalEntry, 'id'> & { id?: string })

function normalizeEntry(entry: JournalEntryLike): JournalEntry {
  return {
    ...entry,
    id: entry.id ?? `${entry.date}-${entry.meetingTitle}`,
  }
}

function mergeJournalEntries(storedEntries: JournalEntryLike[], seedEntries: JournalEntryLike[]) {
  const entryMap = new Map<string, JournalEntry>()

  // 브라우저에만 있는 기록을 먼저 깔고 원본 JSON으로 덮는다.
  // (원본이 진실의 소스이므로 서버에서 수정한 회의록이 옛 localStorage 사본에 가려지면 안 된다)
  for (const entry of storedEntries) {
    const normalized = normalizeEntry(entry)
    entryMap.set(normalized.id, normalized)
  }

  for (const entry of seedEntries) {
    const normalized = normalizeEntry(entry)
    entryMap.set(normalized.id, normalized)
  }

  return [...entryMap.values()].sort((a, b) => b.id.localeCompare(a.id))
}

function readStoredEntries(): JournalEntryLike[] {
  if (typeof window === 'undefined') {
    return []
  }

  const raw = window.localStorage.getItem(journalStorageKey)
  if (!raw) {
    return []
  }

  try {
    return JSON.parse(raw) as JournalEntryLike[]
  } catch {
    return []
  }
}

export function usePersistentJournal() {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [seedIds, setSeedIds] = useState<Set<string>>(() => new Set())

  useEffect(() => {
    let cancelled = false

    fetch(withBasePath(journalUrl))
      .then((response) => {
        if (!response.ok) {
          // 404/500을 빈 저널로 무음 폴백하지 않도록 명시적으로 실패 처리한다 (8/24)
          throw new Error(`journal fetch failed: HTTP ${response.status}`)
        }
        return response.json() as Promise<JournalEntryLike[]>
      })
      .then((seedEntries) => {
        if (cancelled) return
        setSeedIds(new Set(seedEntries.map((entry) => normalizeEntry(entry).id)))
        setEntries(mergeJournalEntries(readStoredEntries(), seedEntries))
      })
      .catch(() => {
        // 원본 로드 실패 시 브라우저에 남아 있는 기록만으로 복구한다
        if (cancelled) return
        setEntries(mergeJournalEntries(readStoredEntries(), []))
      })

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined' || entries.length === 0) {
      return
    }

    // 원본 JSON에 이미 있는 회의록은 다시 저장하지 않는다.
    // 전량 되쓰기는 약 3.4 MB를 차지해 5 MB 쿼터를 곧 넘기고, 그때 아래 catch가
    // 조용히 삼켜 무증상으로 영속성만 사라진다. 브라우저 전용 기록만 남긴다.
    const localOnlyEntries = entries.filter((entry) => !seedIds.has(entry.id))

    try {
      window.localStorage.setItem(journalStorageKey, JSON.stringify(localOnlyEntries))
    } catch {
      // 저장소 용량 초과 시에도 화면 표시는 유지한다
    }
  }, [entries, seedIds])

  const latestEntry = useMemo(() => entries[0], [entries])

  return {
    entries,
    latestEntry,
  }
}
