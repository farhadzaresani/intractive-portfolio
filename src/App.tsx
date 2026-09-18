import { useEffect } from 'react'
import { PortfolioProvider } from './data/PortfolioProvider'
import { usePortfolio } from './data/portfolioContext'
import { Scene } from './experience/Scene'
import { BootScreen } from './ui/BootScreen'
import { Hud } from './ui/Hud'
import './styles/global.css'

function EscListener() {
  const { activePanel, closePanel, monitorFocused, blurMonitor } = usePortfolio()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (activePanel) closePanel()
      else if (monitorFocused) blurMonitor()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activePanel, closePanel, monitorFocused, blurMonitor])

  return null
}

function AppShell() {
  return (
    <div className="app">
      <div className="canvas-wrap">
        <Scene />
      </div>
      <div className="vignette" aria-hidden />
      <div className="scanlines" aria-hidden />
      <BootScreen />
      <Hud />
      <EscListener />
    </div>
  )
}

export default function App() {
  return (
    <PortfolioProvider>
      <AppShell />
    </PortfolioProvider>
  )
}
