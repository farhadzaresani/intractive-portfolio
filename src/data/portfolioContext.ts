import { createContext, useContext } from 'react'
import type { PanelId } from './resume'

export type AppPhase = 'boot' | 'room'

export type PortfolioState = {
  phase: AppPhase
  /** Camera zoomed into the CRT / DOS desktop open */
  monitorFocused: boolean
  activePanel: PanelId | null
  hoveredMonitor: boolean
  /** Camera has finished moving in — DOS UI can sit still on the glass */
  viewReady: boolean
  enter: () => void
  focusMonitor: () => void
  blurMonitor: () => void
  openPanel: (id: PanelId) => void
  closePanel: () => void
  setHoveredMonitor: (v: boolean) => void
  setViewReady: (v: boolean) => void
}

export const PortfolioContext = createContext<PortfolioState | null>(null)

export function usePortfolio() {
  const ctx = useContext(PortfolioContext)
  if (!ctx) throw new Error('usePortfolio must be used within PortfolioProvider')
  return ctx
}
