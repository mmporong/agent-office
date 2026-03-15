import {
  projectSummary,
  shellStages,
  milestones,
  bridgeContracts,
  collectionPreview,
} from '../data/meowbeat'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './ProjectsPage.css'

const kicks = [
  { name: '먹이주기', desc: '리듬 노트를 먹이로 치환 — 판정에 따라 고양이가 먹는 반응' },
  { name: '냥냥합체', desc: '같은 티어 고양이 2마리를 합쳐 상위 티어 고양이로 진화' },
  { name: 'AI 음악', desc: 'Suno AI로 생성한 곡을 Python 파이프라인으로 자동 변환' },
  { name: '냥스타그램', desc: '고양이 포토 앨범 + SNS 스타일 공유 기능' },
  { name: '냥카페', desc: '고양이 카페 경영 — 가구 배치, 손님, 수익 시스템' },
]

export function ProjectsPage() {
  const containerRef = useScrollReveal()

  return (
    <div className="projects page-enter" ref={containerRef}>
      {/* 히어로 */}
      <section className="projects__hero">
        <div>
          <p className="projects__eyebrow">{projectSummary.platform}</p>
          <h1>{projectSummary.name}</h1>
          <p className="projects__tagline">{projectSummary.tagline}</p>
        </div>
        <div className="projects__tech">
          <span>{projectSummary.build}</span>
          <span>{projectSummary.focus}</span>
        </div>
      </section>

      {/* 기술 스택 */}
      <section className="projects__stack scroll-reveal">
        <h2>기술 스택</h2>
        <div className="projects__stack-list">
          {['Unity C#', 'React + TypeScript', 'Python (beat_extractor)', 'AI Pipeline (Suno)', 'WebGL Wrapper'].map(
            (tech) => (
              <span key={tech} className="projects__stack-item">{tech}</span>
            ),
          )}
        </div>
      </section>

      <div className="projects__grid">
        {/* 스프린트 진행 */}
        <section className="projects__milestones scroll-reveal">
          <h2>스프린트 진행</h2>
          <div className="projects__milestone-list">
            {milestones.map((ms, i) => (
              <article key={ms.title} className="projects__milestone-card card-hover">
                <div className="projects__milestone-header">
                  <span className="projects__milestone-index">{i + 1}</span>
                  <h3>{ms.title}</h3>
                </div>
                <p>{ms.summary}</p>
                <ul className="projects__deliverables">
                  {ms.deliverables.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* 개발 로드맵 */}
        <section className="projects__roadmap scroll-reveal">
          <h2>개발 로드맵</h2>
          <div className="projects__roadmap-list">
            {shellStages.map((stage, i) => (
              <div
                key={stage.id}
                className={`projects__roadmap-item ${stage.id === 'loading' ? 'projects__roadmap-item--active' : ''}`}
              >
                <span className="projects__roadmap-index">{i + 1}</span>
                <div>
                  <strong>{stage.label} — {stage.headline}</strong>
                  <p>{stage.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 킥 5선 */}
      <section className="projects__kicks scroll-reveal">
        <h2>차별화 킥 5선</h2>
        <div className="projects__kick-grid">
          {kicks.map((kick) => (
            <article key={kick.name} className="projects__kick-card card-hover">
              <h3>{kick.name}</h3>
              <p>{kick.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 갤러리 */}
      <section className="projects__gallery scroll-reveal">
        <h2>갤러리</h2>
        <div className="projects__gallery-grid">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="projects__gallery-slot">
              <span>screenshot {i}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 이벤트 시스템 */}
      <section className="projects__events scroll-reveal">
        <h2>이벤트 시스템 (Bridge Contracts)</h2>
        <div className="projects__event-grid">
          {bridgeContracts.map((c) => (
            <article key={c.name} className="projects__event-card card-hover">
              <span className="projects__event-dir">{c.direction}</span>
              <h3>{c.name}</h3>
              <code>{c.payload}</code>
              <p>{c.purpose}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 수집 미리보기 */}
      <section className="projects__collection scroll-reveal">
        <h2>고양이 수집</h2>
        <div className="projects__collection-grid">
          {collectionPreview.map((cat) => (
            <article key={cat.tier} className="projects__collection-card card-hover">
              <span className="projects__collection-tier">{cat.tier}</span>
              <strong>{cat.name}</strong>
              <p>{cat.mood}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
