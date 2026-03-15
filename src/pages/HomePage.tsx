import { useNavigate, Link } from 'react-router-dom'
import { currentProject } from '../data/agents'
import { projectSummary, shellStages } from '../data/meowbeat'
import { useOffice } from '../contexts/OfficeContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { OfficeMap } from '../components/office/OfficeMap'
import { withBasePath } from '../utils/publicPath'
import './HomePage.css'

export function HomePage() {
  const navigate = useNavigate()
  const {
    journalEntries,
    officeAgents,
    selectedAgentId,
    setSelectedAgentId,
    activeWorkers,
  } = useOffice()
  const containerRef = useScrollReveal()
  const recentEntries = journalEntries.slice(0, 6)

  return (
    <div className="home page-enter" ref={containerRef}>
      {/* Hero */}
      <section className="home__hero">
        <div className="home__hero-text">
          <p className="home__label">indie game developer</p>
          <h1>mmporong / LIM Studio</h1>
          <p className="home__tagline">고양이와 리듬과 코드를 엮는 사람</p>
          <p className="home__stack">Unity · React · Python · AI</p>
        </div>
        <div className="home__hero-mascot">
          <img
            src={withBasePath('catrush-cats/Cat/01.png')}
            alt="고양이 마스코트"
            className="home__cat-sprite"
          />
        </div>
      </section>

      {/* 픽셀 사무실 */}
      <section className="home__section scroll-reveal">
        <div className="home__section-header">
          <h2>에이전트 오피스</h2>
          <Link to="/office" className="home__link-btn">
            오피스 전체보기 →
          </Link>
        </div>
        <div className="home__office-overview">
          <div className="home__office-map-wrap">
            <OfficeMap
              agents={officeAgents}
              selectedAgentId={selectedAgentId}
              onSelectAgent={setSelectedAgentId}
            />
          </div>
          <div className="home__office-status">
            <div className="home__office-stat">
              <span className="home__office-stat-num">{officeAgents.length}</span>
              <span>전체 에이전트</span>
            </div>
            <div className="home__office-stat">
              <span className="home__office-stat-num">{activeWorkers}</span>
              <span>현재 작업 중</span>
            </div>
            <div className="home__agent-list">
              {officeAgents.map((agent) => (
                <button
                  key={agent.id}
                  type="button"
                  className={`home__agent-row ${agent.id === selectedAgentId ? 'home__agent-row--selected' : ''}`}
                  onClick={() => setSelectedAgentId(agent.id)}
                >
                  <img
                    src={withBasePath(`catrush-cats/Cat/${
                      { ember: '01', leaf: '04', bloom: '07', spark: '10', wave: '13', moon: '16', pearl: '02' }[agent.characterKey] ?? '01'
                    }.png`)}
                    alt={agent.name}
                    className="home__agent-thumb"
                  />
                  <span className="home__agent-name">{agent.name}</span>
                  <span className={`home__agent-badge home__agent-badge--${agent.status}`}>
                    {agent.status === 'idle' ? '대기' :
                     agent.status === 'building' ? '작업 중' :
                     agent.status === 'planning' ? '계획 중' :
                     agent.status === 'researching' ? '조사 중' :
                     agent.status === 'verifying' ? '검증 중' :
                     agent.status === 'blocked' ? '막힘' :
                     agent.status === 'syncing' ? '동기화' : agent.status}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 현재 프로젝트 */}
      <section className="home__section scroll-reveal">
        <div className="home__section-header">
          <h2>현재 프로젝트</h2>
          <Link to="/projects" className="home__link-btn">
            프로젝트 상세 →
          </Link>
        </div>
        <Link to="/projects" className="home__project-card">
          <div className="home__project-top">
            <div>
              <h3>{projectSummary.name}</h3>
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
                <span className="home__stage-num">{i + 1}</span>
                <div>
                  <strong>{stage.label}</strong>
                  <span className="home__stage-desc">{stage.headline}</span>
                </div>
              </div>
            ))}
          </div>
        </Link>
      </section>

      {/* 최근 업데이트 */}
      <section className="home__section scroll-reveal">
        <div className="home__section-header">
          <h2>최근 업데이트</h2>
          <Link to="/chronicle" className="home__link-btn">
            크로니클 전체보기 →
          </Link>
        </div>
        <div className="home__update-grid">
          {recentEntries.map((entry) => (
            <article
              key={entry.id}
              className="home__update-card"
              onClick={() => navigate('/chronicle')}
            >
              <time>{entry.date}</time>
              <h3>{entry.researchTitle}</h3>
              <p>{entry.researchSummary}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
