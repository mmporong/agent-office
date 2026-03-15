import {
  projectSummary,
  shellStages,
  milestones,
  bridgeContracts,
  collectionPreview,
} from '../data/meowbeat'
import {
  problems,
  antiPatterns,
  strategies,
  caseStudies,
  results,
  tierLayers,
} from '../data/aiArchitecture'
import { useState } from 'react'
import './WorkPage.css'

const kicks = [
  { name: '먹이주기', desc: '리듬 노트를 먹이로 치환 — 판정에 따라 고양이가 먹는 반응' },
  { name: '냥냥합체', desc: '같은 티어 고양이 2마리를 합쳐 상위 티어 고양이로 진화' },
  { name: 'AI 음악', desc: 'Suno AI로 생성한 곡을 Python 파이프라인으로 자동 변환' },
  { name: '냥스타그램', desc: '고양이 포토 앨범 + SNS 스타일 공유 기능' },
  { name: '냥카페', desc: '고양이 카페 경영 — 가구 배치, 손님, 수익 시스템' },
]

const techStack = [
  { label: 'Unity C#' },
  { label: 'React + TypeScript' },
  { label: 'Python' },
  { label: 'AI Pipeline (Suno)' },
  { label: 'WebGL Wrapper' },
]

const workSections = [
  { id: 'roadmap', tag: '개발', title: '개발 로드맵', summary: 'Phase 0~3 + Post-Launch 4단계 개발 계획' },
  { id: 'sprint', tag: '개발', title: '스프린트 진행', summary: '8개 스프린트 코드 구현 현황' },
  { id: 'kicks', tag: '기획', title: '차별화 킥 5선', summary: '먹이주기, 냥냥합체, AI음악, 냥스타그램, 냥카페' },
  { id: 'ai-arch', tag: 'Devlog', title: 'AI 최적화 아키텍처', summary: '문제 → 전략 → 규칙 → 구조 → 적용 → 결과' },
  { id: 'techdetail', tag: '기술', title: '기술 상세', summary: 'Bridge Contracts 6개 + 고양이 수집 시스템' },
]

function SectionDetail({ id }: { id: string }) {
  switch (id) {
    case 'roadmap':
      return (
        <>
          <h2>개발 로드맵</h2>
          <div className="work__roadmap-list">
            {shellStages.map((stage, i) => (
              <div
                key={stage.id}
                className={`work__roadmap-item ${stage.id === 'loading' ? 'work__roadmap-item--active' : ''}`}
              >
                <span className="work__roadmap-num">{i + 1}</span>
                <div>
                  <strong>{stage.label} — {stage.headline}</strong>
                  <p>{stage.description}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )

    case 'sprint':
      return (
        <>
          <h2>스프린트 진행</h2>
          <div className="work__milestone-list">
            {milestones.map((ms, i) => (
              <article key={ms.title} className="work__milestone-item">
                <div className="work__milestone-header">
                  <span className="work__milestone-num">{i + 1}</span>
                  <h3>{ms.title}</h3>
                </div>
                <p>{ms.summary}</p>
                <div className="work__deliverables">
                  {ms.deliverables.map((d) => (
                    <span key={d} className="work__deliverable">{d}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </>
      )

    case 'kicks':
      return (
        <>
          <h2>차별화 킥 5선</h2>
          <div className="work__kick-grid">
            {kicks.map((kick) => (
              <article key={kick.name} className="work__kick-card">
                <h3>{kick.name}</h3>
                <p>{kick.desc}</p>
              </article>
            ))}
          </div>
        </>
      )

    case 'ai-arch':
      return (
        <>
          <h2>AI 최적화 아키텍처</h2>

          {/* 1. 문제 정의 */}
          <div className="work__arch-section">
            <h3>문제 정의 — AI 코딩 도구의 Unity 한계</h3>
            <p className="work__section-desc">
              AI 코딩 도구를 Unity 개발에 적용하면서 반복적으로 마주친 5가지 문제.
              공통 원인: AI 도구가 프로젝트의 아키텍처 규칙을 모른다.
            </p>
            <div className="work__problem-grid">
              {problems.map((p) => (
                <article key={p.num} className="work__problem-card">
                  <span className="work__problem-num">{p.num}</span>
                  <h3>{p.title}</h3>
                  <p>{p.symptom}</p>
                </article>
              ))}
            </div>
          </div>

          {/* 2. 해결 전략 */}
          <div className="work__arch-section">
            <h3>해결 — 4가지 AI 최적화 전략</h3>
            {strategies.map((s) => (
              <div key={s.id} className="work__strategy">
                <h4>{s.title}</h4>
                <p className="work__strategy-desc">{s.description}</p>
                <pre className="work__code">
                  <code>{s.code.join('\n')}</code>
                </pre>
                <div className="work__metrics">
                  {s.metrics.map((m) => (
                    <div key={m.label} className="work__metric">
                      <span className="work__metric-value">{m.value}</span>
                      <span className="work__metric-label">{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 3. Anti-Pattern 규칙 */}
          <div className="work__arch-section">
            <h3>Anti-Pattern 규칙 10개</h3>
            <p className="work__section-desc">AI hallucination 차단을 위한 "DO NOT" 규칙</p>
            <ul className="work__rules">
              {antiPatterns.map((rule) => (
                <li key={rule} className="work__rule">{rule}</li>
              ))}
            </ul>
          </div>

          {/* 4. 4-tier 구조 */}
          <div className="work__arch-section">
            <h3>Assembly Definition 4-tier 구조</h3>
            <div className="work__tier-diagram">
              {tierLayers.map((layer, i) => (
                <div key={layer.tag} className="work__tier-row">
                  <div className="work__tier-card">
                    <span className="work__tier-tag">{layer.tag}</span>
                    <strong>{layer.name}</strong>
                    <span className="work__tier-desc">{layer.desc}</span>
                  </div>
                  {i < tierLayers.length - 1 && (
                    <div className="work__tier-arrow">↓ 참조</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 5. 적용 사례 */}
          <div className="work__arch-section">
            <h3>실제 적용 — 2개 프로젝트</h3>
            <div className="work__case-grid">
              {caseStudies.map((cs) => (
                <article key={cs.name} className="work__case-card">
                  <span className="work__case-genre">{cs.genre}</span>
                  <h4>{cs.name}</h4>
                  <ul>
                    {cs.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>

          {/* 6. 정량적 결과 */}
          <div className="work__arch-section">
            <h3>결과 — 정량적 효과</h3>
            <div className="work__result-list">
              {results.map((r) => (
                <div key={r.effect} className="work__result-item">
                  <strong>{r.effect}</strong>
                  <p>{r.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 7. 핵심 인사이트 */}
          <div className="work__arch-section">
            <blockquote className="work__quote">
              이 작업의 본질은 "좋은 코드를 짜는 것"이 아니라,
              AI가 좋은 코드를 짜도록 환경을 설계하는 것이었다.
            </blockquote>
            <div className="work__insight-grid">
              <div className="work__insight-item">
                <strong>CLAUDE.md</strong>
                <p>AI에게 "무엇을 하지 말 것"을 알려주는 가드레일</p>
              </div>
              <div className="work__insight-item">
                <strong>Assembly Definition</strong>
                <p>AI가 규칙을 어겼을 때 컴파일러가 즉시 알려주는 자동 피드백 루프</p>
              </div>
              <div className="work__insight-item">
                <strong>ScriptableObject</strong>
                <p>AI가 하드코딩 대신 선택할 수 있는 구조화된 대안</p>
              </div>
              <div className="work__insight-item">
                <strong>ServiceLocator</strong>
                <p>AI가 서비스를 찾을 때 항상 동일한 패턴을 따르게 하는 단일 접근점</p>
              </div>
            </div>
          </div>
        </>
      )

    case 'techdetail':
      return (
        <>
          <h2>기술 상세</h2>
          <div className="work__sub-section">
            <h3>이벤트 시스템 (Bridge Contracts)</h3>
            <div className="work__event-grid">
              {bridgeContracts.map((c) => (
                <article key={c.name} className="work__event-card">
                  <span className="work__event-dir">{c.direction}</span>
                  <h4>{c.name}</h4>
                  <code>{c.payload}</code>
                  <p>{c.purpose}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="work__sub-section">
            <h3>고양이 수집</h3>
            <div className="work__collection-grid">
              {collectionPreview.map((cat) => (
                <article key={cat.tier} className="work__collection-card">
                  <span className="work__collection-tier">{cat.tier}</span>
                  <strong>{cat.name}</strong>
                  <p>{cat.mood}</p>
                </article>
              ))}
            </div>
          </div>
        </>
      )

    default:
      return null
  }
}

export function WorkPage() {
  const [activeSection, setActiveSection] = useState('roadmap')

  return (
    <div className="work page-enter">
      {/* 프로젝트 Hero */}
      <header className="work__hero">
        <h1>{projectSummary.name}</h1>
        <p className="work__tagline">{projectSummary.tagline}</p>
        <div className="work__tech">
          {techStack.map((tech) => (
            <span key={tech.label} className="work__tech-pill">
              {tech.label}
            </span>
          ))}
        </div>
      </header>

      {/* 사이드바 + 콘텐츠 패널 */}
      <div className="work__layout">
        <nav className="work__sidebar">
          {workSections.map((section) => (
            <button
              key={section.id}
              type="button"
              className={`work__nav-item ${activeSection === section.id ? 'work__nav-item--active' : ''}`}
              onClick={() => setActiveSection(section.id)}
            >
              <span className="work__nav-tag">{section.tag}</span>
              <span className="work__nav-title">{section.title}</span>
            </button>
          ))}
        </nav>
        <div className="work__panel">
          <SectionDetail id={activeSection} />
        </div>
      </div>
    </div>
  )
}
