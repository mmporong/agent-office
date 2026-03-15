import { useState, useMemo } from 'react'
import { chroniclePhases } from '../data/chronicle'
import { journalMemoryRules } from '../data/operationsJournal'
import { useOffice } from '../contexts/OfficeContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './ChroniclePage.css'

type CategoryFilter = 'all' | 'research' | 'meeting' | 'decision'

export function ChroniclePage() {
  const { journalEntries } = useOffice()
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const containerRef = useScrollReveal()

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

  return (
    <div className="chronicle page-enter" ref={containerRef}>
      <div className="chronicle__main">
        {/* 헤더 + 필터 */}
        <section className="chronicle__header">
          <div>
            <p className="chronicle__eyebrow">chronicle research</p>
            <h1>계획 수립과 진행 흐름</h1>
          </div>
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
        </section>

        {/* 크로니클 페이즈 */}
        <section className="chronicle__phases scroll-reveal">
          <h2>프로젝트 진행 단계</h2>
          <div className="chronicle__phase-grid">
            {chroniclePhases.map((phase) => (
              <article key={phase.title} className="chronicle__phase-card card-hover">
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

        {/* 저널 카드 리스트 */}
        <section className="chronicle__entries">
          {filtered.map((entry) => (
            <article
              key={entry.id}
              className={`chronicle__entry scroll-reveal card-hover ${expandedId === entry.id ? 'chronicle__entry--expanded' : ''}`}
            >
              <button
                type="button"
                className="chronicle__entry-header"
                onClick={() => setExpandedId(expandedId === entry.id ? null : entry.id)}
                aria-expanded={expandedId === entry.id}
              >
                <div>
                  <p className="chronicle__eyebrow">daily research log</p>
                  <h2>{entry.date}</h2>
                  <h3>{entry.researchTitle}</h3>
                </div>
                <span className="chronicle__badge">{entry.meetingItems.length} meeting notes</span>
              </button>

              {expandedId === entry.id && (
                <div className="chronicle__entry-body">
                  {(categoryFilter === 'all' || categoryFilter === 'research') && (
                    <div className="chronicle__section">
                      <h3>{entry.researchTitle}</h3>
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
                    <div className="chronicle__section">
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
                    <div className="chronicle__section">
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
      </div>

      {/* 사이드바 */}
      <aside className="chronicle__sidebar">
        <section className="chronicle__sidebar-panel">
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
      </aside>
    </div>
  )
}
