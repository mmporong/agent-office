import { useEffect, useMemo, useState } from 'react'
import {
  journalStorageKey,
  seedJournalEntries,
  type JournalEntry,
} from '../data/operationsJournal'

type JournalEntryLike = JournalEntry | (Omit<JournalEntry, 'id'> & { id?: string })

function normalizeEntry(entry: JournalEntryLike): JournalEntry {
  return {
    ...entry,
    id: entry.id ?? `${entry.date}-${entry.meetingTitle}`,
  }
}

function mergeJournalEntries(storedEntries: JournalEntryLike[], seedEntries: JournalEntryLike[]) {
  const entryMap = new Map<string, JournalEntry>()

  for (const entry of seedEntries) {
    const normalized = normalizeEntry(entry)
    entryMap.set(normalized.id, normalized)
  }

  for (const entry of storedEntries) {
    const normalized = normalizeEntry(entry)
    entryMap.set(normalized.id, normalized)
  }

  return [...entryMap.values()].sort((a, b) => b.id.localeCompare(a.id))
}

function readStoredJournal(): JournalEntry[] {
  if (typeof window === 'undefined') {
    return seedJournalEntries
  }

  const raw = window.localStorage.getItem(journalStorageKey)
  if (!raw) {
    return seedJournalEntries
  }

  try {
    const parsed = JSON.parse(raw) as JournalEntryLike[]
    return mergeJournalEntries(parsed, seedJournalEntries)
  } catch {
    return seedJournalEntries
  }
}

export function usePersistentJournal() {
  const [entries] = useState<JournalEntry[]>(() => readStoredJournal())

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    window.localStorage.setItem(journalStorageKey, JSON.stringify(entries))
  }, [entries])

  const latestEntry = useMemo(() => entries[0], [entries])

  return {
    entries,
    latestEntry,
  }
}
