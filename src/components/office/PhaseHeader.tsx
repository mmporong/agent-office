interface PhaseHeaderProps {
  studioName: string
  projectName: string
  phaseLabel: string
  riskLabel: string
}

export function PhaseHeader({
  studioName,
  projectName,
  phaseLabel,
  riskLabel,
}: PhaseHeaderProps) {
  return (
    <header className="phase-header">
      <div>
        <p className="phase-header__eyebrow">{studioName}</p>
        <h1>{projectName}</h1>
      </div>

      <div className="phase-header__chips">
        <span className="phase-chip">{phaseLabel}</span>
        <span className="phase-chip phase-chip--risk">{riskLabel}</span>
      </div>
    </header>
  )
}
