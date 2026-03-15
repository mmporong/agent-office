import { useNavigate } from 'react-router-dom'
import { currentProject } from '../data/agents'
import { projectSummary, shellStages } from '../data/meowbeat'
import { useOffice } from '../contexts/OfficeContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { withBasePath } from '../utils/publicPath'
import './HomePage.css'

export function HomePage() {
  const navigate = useNavigate()
  const { journalEntries, officeAgents } = useOffice()
  const containerRef = useScrollReveal()
  const recentEntries = journalEntries.slice(0, 3)

  return (
    <div className="home page-enter" ref={containerRef}>
      {/* 인트로 영역 */}
      <section className="home__intro">
        <div className="home__intro-text">
          <p className="home__eyebrow">indie game developer</p>
          <h1 className="home__title">mmporong / LIM Studio</h1>
          <p className="home__tagline">고양이와 리듬과 코드를 엮는 사람</p>
          <p className="home__stack">Unity · React · Python · AI</p>
          <a
            href="https://github.com/mmporong"
            target="_blank"
            rel="noopener noreferrer"
            className="home__github"
            aria-label="GitHub 프로필"
          >
            github.com/mmporong
          </a>
        </div>
        <div className="home__intro-mascot">
          <img
            src={withBasePath('catrush-cats/Cat/01.png')}
            alt="고양이 마스코트"
            className="home__cat-sprite"
          />
        </div>
      </section>

      {/* 현재 프로젝트 카드 */}
      <section className="home__project scroll-reveal">
        <div className="home__project-header">
          <div>
            <p className="home__eyebrow">현재 프로젝트</p>
            <h2>{projectSummary.name}</h2>
            <p className="home__project-tagline">{projectSummary.tagline}</p>
          </div>
          <div className="home__project-meta">
            <span>{projectSummary.platform}</span>
            <span>{currentProject.phase}</span>
          </div>
        </div>

        <div className="home__stages">
          {shellStages.map((stage, i) => (
            <div
              key={stage.id}
              className={`home__stage ${stage.id === 'loading' ? 'home__stage--active' : ''}`}
            >
              <span className="home__stage-index">{i + 1}</span>
              <div className="home__stage-body">
                <strong>{stage.label}</strong>
                <span className="home__stage-headline">{stage.headline}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 최근 업데이트 타임라인 */}
      <section className="home__timeline scroll-reveal">
        <h2>최근 업데이트</h2>
        <div className="home__timeline-list">
          {recentEntries.map((entry) => (
            <article key={entry.id} className="home__timeline-item">
              <div className="home__timeline-dot" />
              <div className="home__timeline-content">
                <time className="home__timeline-date">{entry.date}</time>
                <h3>{entry.researchTitle}</h3>
                <p>{entry.researchSummary}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 에이전트 상태 요약 */}
      <section className="home__agent-summary scroll-reveal">
        <div className="home__agent-summary-header">
          <h2>에이전트 오피스</h2>
          <button
            type="button"
            className="home__minimap-link"
            onClick={() => navigate('/office')}
          >
            오피스 들여다보기 →
          </button>
        </div>
        <div className="home__agent-grid">
          {officeAgents.map((agent) => (
            <article key={agent.id} className="home__agent-card">
              <img
                src={withBasePath(`catrush-cats/Cat/${
                  { ember: '01', leaf: '04', bloom: '07', spark: '10', wave: '13', moon: '16', coral: '01' }[agent.characterKey] ?? '01'
                }.png`)}
                alt={agent.name}
                className="home__agent-avatar"
              />
              <div className="home__agent-info">
                <strong>{agent.name}</strong>
                <span className={`home__agent-status home__agent-status--${agent.status}`}>
                  {agent.status === 'idle' ? '대기' :
                   agent.status === 'building' ? '작업 중' :
                   agent.status === 'planning' ? '계획 중' :
                   agent.status === 'researching' ? '조사 중' :
                   agent.status === 'verifying' ? '검증 중' :
                   agent.status === 'blocked' ? '막힘' :
                   agent.status === 'syncing' ? '동기화' : agent.status}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
