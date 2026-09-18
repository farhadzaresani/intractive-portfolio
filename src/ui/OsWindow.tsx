import type { ReactNode } from 'react'
import { usePortfolio } from '../data/portfolioContext'

type Props = {
  title: string
  children: ReactNode
}

export function OsWindow({ title, children }: Props) {
  const { closePanel } = usePortfolio()

  return (
    <div className="os-window" role="dialog" aria-label={title}>
      <header className="os-window__bar">
        <span className="os-window__title">{title}</span>
        <button type="button" className="os-window__close" onClick={closePanel} aria-label="Close">
          ×
        </button>
      </header>
      <div className="os-window__body">{children}</div>
    </div>
  )
}
