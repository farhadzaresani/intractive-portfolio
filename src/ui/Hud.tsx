import { usePortfolio } from '../data/portfolioContext'
import { AboutPanel } from './panels/AboutPanel'
import { ContactPanel } from './panels/ContactPanel'
import { SkillsPanel } from './panels/SkillsPanel'
import { WorkPanel } from './panels/WorkPanel'

export function Hud() {
  const { phase, activePanel, closePanel, openPanel } = usePortfolio()
  if (phase !== 'room') return null

  return (
    <>
      <nav className="hud" aria-label="Portfolio navigation">
        <button type="button" className={activePanel === 'about' ? 'is-active' : ''} onClick={() => openPanel('about')}>
          ABOUT
        </button>
        <button type="button" className={activePanel === 'work' ? 'is-active' : ''} onClick={() => openPanel('work')}>
          WORK
        </button>
        <button type="button" className={activePanel === 'skills' ? 'is-active' : ''} onClick={() => openPanel('skills')}>
          SKILLS
        </button>
        <button
          type="button"
          className={activePanel === 'contact' ? 'is-active' : ''}
          onClick={() => openPanel('contact')}
        >
          CONTACT
        </button>
        {activePanel && (
          <button type="button" className="hud__back" onClick={closePanel}>
            ESC
          </button>
        )}
      </nav>

      {activePanel && (
        <div className="panel-layer">
          {activePanel === 'about' && <AboutPanel />}
          {activePanel === 'work' && <WorkPanel />}
          {activePanel === 'skills' && <SkillsPanel />}
          {activePanel === 'contact' && <ContactPanel />}
        </div>
      )}
    </>
  )
}
