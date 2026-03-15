import { useState, useMemo, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { chroniclePhases } from '../data/chronicle'
import { useOffice } from '../contexts/OfficeContext'
import './LogPage.css'

type CategoryFilter = 'all' | 'research' | 'meeting' | 'decision'

export function LogPage() {
  const { journalEntries } = useOffice()
  const [searchParams] = useSearchParams()
  const entryParam = searchParams.get('entry')
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all')
  const [expandedId, setExpandedId] = useState<string | null>(entryParam)
  const detailRef = useRef<HTMLDivElement | null>(null)

  const uniqueMonths = useMemo(() => {
    const months = new Set(journalEntries.map((e) => e.date.slice(0, 7)))
    return [...months]
  }, [journalEntries])
  const [monthFilter, setMonthFilter] = useState<string>('all')

  const filtered = useMemo(() => {
    let entries = journalEntries
    if (monthFilter !== 'all') {
      entries = entries.filter((e) => e.date.startsWith(monthFilter))
    }
    return entries
  }, [journalEntries, monthFilter])

  const expandedEntry = useMemo(
    () => filtered.find((e) => e.id === expandedId) ?? null,
    [filtered, expandedId]
  )

  useEffect(() => {
    if (entryParam) {
      setExpandedId(entryParam)
    }
  }, [entryParam])

  useEffect(() => {
    if (expandedId && detailRef.current) {
      requestAnimationFrame(() => {
        detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      })
    }
  }, [expandedId])

  function handleCardClick(id: string) {
    setExpandedId((prev) => (prev === id ? null : id))
  }

  return (
    <div className="log page-enter">
      {/* 헤더 */}
      <header className="log__header">
        <h1>Log</h1>
        <p className="log__subtitle">개발 과정 기록</p>
      </header>

      {/* 타임라인 스트립 */}
      <div className="log__timeline-strip">
        {chroniclePhases.map((phase, i) => (
          <div key={phase.title} className="log__timeline-item">
            <span className="log__timeline-num">{i + 1}</span>
            <div>
              <strong>{phase.title}</strong>
              <p>{phase.summary}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 필터 */}
      <div className="log__filters">
        <select
          className="log__select"
          value={monthFilter}
          onChange={(e) => setMonthFilter(e.target.value)}
          aria-label="월 필터"
        >
          <option value="all">전체 기간</option>
          {uniqueMonths.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
        <div className="log__tags">
          {(['all', 'research', 'meeting', 'decision'] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              className={`log__tag ${categoryFilter === cat ? 'log__tag--active' : ''}`}
              onClick={() => setCategoryFilter(cat)}
            >
              {cat === 'all' ? '전체' : cat === 'research' ? '리서치' : cat === 'meeting' ? '회의' : '결정'}
            </button>
          ))}
        </div>
      </div>

      {/* 카드 그리드 — 카드 + 인라인 상세 */}
      <section className="log__section">
        <div className="log__card-grid">
          {filtered.map((entry) => {
            const isActive = expandedId === entry.id
            return (
              <div key={entry.id} className="log__card-wrapper">
                <article
                  className={`log__card ${isActive ? 'log__card--active' : ''}`}
                  onClick={() => handleCardClick(entry.id)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isActive}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleCardClick(entry.id) }}
                >
                  <span className="log__card-tag">리서치</span>
                  <h3 className="log__card-title">{entry.researchTitle}</h3>
                  <p className="log__card-desc">{entry.researchSummary}</p>
                  <div className="log__card-meta">
                    <span>{entry.meetingItems.length}개 회의 노트</span>
                    <span>{entry.date}</span>
                  </div>
                </article>

                {isActive && expandedEntry && (
                  <div className="log__detail-inline" ref={detailRef}>
                    {(categoryFilter === 'all' || categoryFilter === 'research') && (
                      <div className="log__detail">
                        <p>{expandedEntry.researchSummary}</p>
                        <ul className="log__items">
                          {expandedEntry.researchItems.map((item) => (
                            <li key={item.title}>
                              <strong>{item.title}</strong>
                              <p>{item.description}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {(categoryFilter === 'all' || categoryFilter === 'meeting') && (
                      <div className="log__detail">
                        <h3>{expandedEntry.meetingTitle}</h3>
                        <p>{expandedEntry.meetingSummary}</p>
                        <ul className="log__items">
                          {expandedEntry.meetingItems.map((item) => (
                            <li key={`${expandedEntry.date}-${item.speaker}`}>
                              <strong>{item.speaker}</strong>
                              <p>{item.note}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {(categoryFilter === 'all' || categoryFilter === 'decision') && (
                      <div className="log__detail">
                        <h3>회의 결정</h3>
                        <ul className="log__items">
                          {expandedEntry.decisions.map((item) => (
                            <li key={item.title}>
                              <strong>{item.title}</strong>
                              <p>{item.description}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
