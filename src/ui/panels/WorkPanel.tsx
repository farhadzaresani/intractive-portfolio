import { experience } from '../../data/resume'
import { OsWindow } from '../OsWindow'

export function WorkPanel() {
  return (
    <OsWindow title="WORK.LOG">
      <ul className="work-list">
        {experience.map((job) => (
          <li key={job.company + job.period} className="work-item">
            <div className="work-item__head">
              <strong>
                {job.role} @ {job.company}
              </strong>
              <span>{job.period}</span>
            </div>
            <p className="work-item__project">{job.project}</p>
            <ul className="panel-list panel-list--tight">
              {job.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <p className="work-item__stack">{job.stack.join(' · ')}</p>
          </li>
        ))}
      </ul>
    </OsWindow>
  )
}
