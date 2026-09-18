import { education, profile } from '../../data/resume'
import { OsWindow } from '../OsWindow'

export function AboutPanel() {
  return (
    <OsWindow title="ABOUT.EXE">
      <p className="panel-lead">{profile.summary}</p>
      <p className="panel-meta">
        {profile.location} · {profile.title}
      </p>
      <h3 className="panel-h">Education</h3>
      <ul className="panel-list">
        {education.map((ed) => (
          <li key={ed.degree + ed.field}>
            <strong>
              {ed.degree} — {ed.field}
            </strong>
            <span>
              {ed.school} · {ed.years}
            </span>
          </li>
        ))}
      </ul>
    </OsWindow>
  )
}
