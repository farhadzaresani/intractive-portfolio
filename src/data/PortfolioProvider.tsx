import { useMemo, useState, type ReactNode } from 'react'
import type { PanelId } from './resume'
import { PortfolioContext, type AppPhase } from './portfolioContext'

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<AppPhase>('boot')
  const [monitorFocused, setMonitorFocused] = useState(false)
  const [activePanel, setActivePanel] = useState<PanelId | null>(null)
  const [hoveredMonitor, setHoveredMonitor] = useState(false)
  const [viewReady, setViewReady] = useState(false)

  const value = useMemo(
    () => ({
      phase,
      monitorFocused,
      activePanel,
      hoveredMonitor,
      viewReady,
      enter: () => setPhase('room'),
      focusMonitor: () => {
        setViewReady(false)
        setMonitorFocused(true)
      },
      blurMonitor: () => {
        setActivePanel(null)
        setViewReady(false)
        setMonitorFocused(false)
      },
      openPanel: (id: PanelId) => setActivePanel(id),
      closePanel: () => setActivePanel(null),
      setHoveredMonitor,
      setViewReady,
    }),
    [phase, monitorFocused, activePanel, hoveredMonitor, viewReady],
  )

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>
}
