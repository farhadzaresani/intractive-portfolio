import { usePortfolio } from '../data/portfolioContext'
import { dosApps } from '../data/resume'
import { AboutPanel } from './panels/AboutPanel'
import { ContactPanel } from './panels/ContactPanel'
import { SkillsPanel } from './panels/SkillsPanel'
import { WorkPanel } from './panels/WorkPanel'

/** FZ-DOS drawn on the CRT glass (positioned by the 3D screen) */
export function Hud() {
  const { phase, monitorFocused, activePanel, openPanel, closePanel, blurMonitor, viewReady } =
    usePortfolio()

  if (phase !== 'room' || !monitorFocused || !viewReady) return null

  return (
    <div id="crt-overlay" className="crt-on-screen" role="application" aria-label="FZ-DOS">
      <header className="crt-ui__bar">
        <span>FZ-DOS v1.0</span>
        <button type="button" className="crt-ui__exit" onClick={blurMonitor}>
          EXIT
        </button>
      </header>

      <div className="crt-on-screen__body">
        {!activePanel && (
          <>
            <p className="crt-ui__prompt">
              C:\PORTFOLIO&gt; dir /w
              <span className="dos-cursor">_</span>
            </p>
            <div className="crt-ui__icons">
              {dosApps.map((app) => (
                <button
                  key={app.id}
                  type="button"
                  className="crt-ui__icon"
                  onClick={() => openPanel(app.id)}
                >
                  <span
                    className="crt-ui__icon-box"
                    style={{ borderColor: app.color, color: app.color }}
                  >
                    {app.label.slice(0, 1)}
                  </span>
                  <span className="crt-ui__icon-name">{app.file}</span>
                </button>
              ))}
            </div>
          </>
        )}

        {activePanel && (
          <div className="crt-ui__panel">
            {activePanel === 'about' && <AboutPanel />}
            {activePanel === 'work' && <WorkPanel />}
            {activePanel === 'skills' && <SkillsPanel />}
            {activePanel === 'contact' && <ContactPanel />}
            <button type="button" className="crt-ui__back" onClick={closePanel}>
              ← BACK
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
