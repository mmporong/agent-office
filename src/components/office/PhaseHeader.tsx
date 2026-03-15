interface PhaseHeaderProps {
  studioName: string
  projectName: string
  phaseLabel?: string
  riskLabel?: string
}

export function PhaseHeader({
  studioName,
  projectName,
}: PhaseHeaderProps) {
  return (
    <header className="phase-header">
      <div>
        <p className="phase-header__eyebrow">{studioName}</p>
        <h1>{projectName}</h1>
      </div>
    </header>
  )
}
