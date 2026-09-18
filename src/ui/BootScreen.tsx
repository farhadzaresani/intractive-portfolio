import { usePortfolio } from '../data/portfolioContext'
import { profile } from '../data/resume'

export function BootScreen() {
  const { phase, enter } = usePortfolio()
  if (phase !== 'boot') return null

  return (
    <div className="boot">
      <div className="boot__glow" aria-hidden />
      <div className="boot__content">
        <p className="boot__os">FZ-OS v1.1</p>
        <h1 className="boot__brand">{profile.name.toUpperCase()}</h1>
        <p className="boot__tag">{profile.title}</p>
        <button type="button" className="boot__cta" onClick={enter}>
          ENTER
        </button>
        <p className="boot__hint">click the CRT monitor to open FZ-DOS</p>
      </div>
    </div>
  )
}
