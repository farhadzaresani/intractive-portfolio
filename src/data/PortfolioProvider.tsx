import { useMemo, useState, type ReactNode } from 'react'
import type { PanelId } from './resume'
import { PortfolioContext, type AppPhase } from './portfolioContext'

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<AppPhase>('boot')
  const [activePanel, setActivePanel] = useState<PanelId | null>(null)
  const [hoveredMonitor, setHoveredMonitor] = useState<PanelId | null>(null)

  const value = useMemo(
    () => ({
      phase,
      activePanel,
      hoveredMonitor,
      enter: () => setPhase('room'),
      openPanel: (id: PanelId) => setActivePanel(id),
      closePanel: () => setActivePanel(null),
      setHoveredMonitor,
    }),
    [phase, activePanel, hoveredMonitor],
  )

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>
}
