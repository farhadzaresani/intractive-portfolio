import { skills } from '../../data/resume'
import { OsWindow } from '../OsWindow'

const groups: { label: string; items: string[] }[] = [
  { label: 'Core', items: skills.core },
  { label: 'Frameworks', items: skills.frameworks },
  { label: 'State', items: skills.state },
  { label: 'UI', items: skills.ui },
  { label: 'Quality', items: skills.quality },
  { label: 'Practices', items: skills.practices },
]

export function SkillsPanel() {
  return (
    <OsWindow title="SKILLS.SYS">
      <div className="skills-grid">
        {groups.map((g) => (
          <div key={g.label} className="skills-group">
            <h3 className="panel-h">{g.label}</h3>
            <p className="skills-tags">{g.items.join('  /  ')}</p>
          </div>
        ))}
      </div>
    </OsWindow>
  )
}
