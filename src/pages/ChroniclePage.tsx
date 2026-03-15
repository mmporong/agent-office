import { useState, useMemo, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { chroniclePhases } from '../data/chronicle'
import { journalMemoryRules } from '../data/operationsJournal'
import { useOffice } from '../contexts/OfficeContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './ChroniclePage.css'

type CategoryFilter = 'all' | 'research' | 'meeting' | 'decision'

export function ChroniclePage() {
  const { journalEntries } = useOffice()
  const [searchParams] = useSearchParams()
  const entryParam = searchParams.get('entry')
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all')
  const [expandedId, setExpandedId] = useState<string | null>(entryParam)
  const containerRef = useScrollReveal()
  const entryRefs = useRef<Record<string, HTMLElement | null>>({})

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

  // URL 파라미터로 전달된 entry 자동 펼침 + 스크롤
  useEffect(() => {
    if (entryParam) {
      setExpandedId(entryParam)
      // DOM 렌더 후 스크롤
      requestAnimationFrame(() => {
        const el = entryRefs.current[entryParam]
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      })
    }
  }, [entryParam])

  return (
    <div className="chronicle page-enter" ref={containerRef}>
      {/* 헤더 */}
      <header className="chronicle__header">
        <h1>Chronicle</h1>
        <p className="chronicle__subtitle">계획 수립과 진행 흐름</p>
      </header>

      {/* 필터 */}
      <div className="chronicle__filters">
        <select
          className="chronicle__select"
          value={monthFilter}
          onChange={(e) => setMonthFilter(e.target.value)}
          aria-label="월 필터"
        >
          <option value="all">전체 기간</option>
          {uniqueMonths.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
        <div className="chronicle__tags">
          {(['all', 'research', 'meeting', 'decision'] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              className={`chronicle__tag ${categoryFilter === cat ? 'chronicle__tag--active' : ''}`}
              onClick={() => setCategoryFilter(cat)}
            >
              {cat === 'all' ? '전체' : cat === 'research' ? '리서치' : cat === 'meeting' ? '회의' : '결정'}
            </button>
          ))}
        </div>
      </div>

      {/* 프로젝트 진행 단계 */}
      <section className="chronicle__section scroll-reveal">
        <h2>프로젝트 진행 단계</h2>
        <div className="chronicle__phase-list">
          {chroniclePhases.map((phase) => (
            <article key={phase.title} className="chronicle__phase-item">
              <h3>{phase.title}</h3>
              <p>{phase.summary}</p>
              <div className="chronicle__phase-detail">
                <strong>구현 상세</strong>
                <p>{phase.implementationDetail}</p>
              </div>
              <div className="chronicle__phase-detail">
                <strong>주요 로직</strong>
                <p>{phase.coreLogic}</p>
              </div>
              <ul className="chronicle__outcomes">
                {phase.outcomes.map((o) => (
                  <li key={o.title}>
                    <strong>{o.title}</strong>
                    <p>{o.description}</p>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* 저널 엔트리 리스트 — scroll-reveal 제거, 항상 보임 */}
      <section className="chronicle__section">
        <h2>개발 일지</h2>
        {filtered.map((entry) => (
          <article
            key={entry.id}
            ref={(el) => { entryRefs.current[entry.id] = el }}
            className={`chronicle__entry ${expandedId === entry.id ? 'chronicle__entry--expanded' : ''}`}
          >
            <button
              type="button"
              className="chronicle__entry-header"
              onClick={() => setExpandedId(expandedId === entry.id ? null : entry.id)}
              aria-expanded={expandedId === entry.id}
            >
              <div>
                <time className="chronicle__date">{entry.date}</time>
                <h3 className="chronicle__entry-title">{entry.researchTitle}</h3>
              </div>
              <div className="chronicle__entry-actions">
                <span className="chronicle__badge">{entry.meetingItems.length}개 회의 노트</span>
                <span className={`chronicle__expand-icon ${expandedId === entry.id ? 'chronicle__expand-icon--open' : ''}`}>
                  ▼
                </span>
              </div>
            </button>

            {expandedId === entry.id && (
              <div className="chronicle__entry-body">
                {(categoryFilter === 'all' || categoryFilter === 'research') && (
                  <div className="chronicle__detail">
                    <p>{entry.researchSummary}</p>
                    <ul className="chronicle__items">
                      {entry.researchItems.map((item) => (
                        <li key={item.title}>
                          <strong>{item.title}</strong>
                          <p>{item.description}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {(categoryFilter === 'all' || categoryFilter === 'meeting') && (
                  <div className="chronicle__detail">
                    <h3>{entry.meetingTitle}</h3>
                    <p>{entry.meetingSummary}</p>
                    <ul className="chronicle__items">
                      {entry.meetingItems.map((item) => (
                        <li key={`${entry.date}-${item.speaker}`}>
                          <strong>{item.speaker}</strong>
                          <p>{item.note}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {(categoryFilter === 'all' || categoryFilter === 'decision') && (
                  <div className="chronicle__detail">
                    <h3>회의 결정</h3>
                    <ul className="chronicle__items">
                      {entry.decisions.map((item) => (
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
          </article>
        ))}
      </section>

      {/* 데이터 보존 원칙 */}
      <section className="chronicle__section chronicle__rules-section scroll-reveal">
        <h2>데이터 보존 원칙</h2>
        <ul className="chronicle__rules">
          {journalMemoryRules.map((rule) => (
            <li key={rule.title}>
              <strong>{rule.title}</strong>
              <p>{rule.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
