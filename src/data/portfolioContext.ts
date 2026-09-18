import { createContext, useContext } from 'react'
import type { PanelId } from './resume'

export type AppPhase = 'boot' | 'room'

export type PortfolioState = {
  phase: AppPhase
  activePanel: PanelId | null
  hoveredMonitor: PanelId | null
  enter: () => void
  openPanel: (id: PanelId) => void
  closePanel: () => void
  setHoveredMonitor: (id: PanelId | null) => void
}

export const PortfolioContext = createContext<PortfolioState | null>(null)

export function usePortfolio() {
  const ctx = useContext(PortfolioContext)
  if (!ctx) throw new Error('usePortfolio must be used within PortfolioProvider')
  return ctx
}
