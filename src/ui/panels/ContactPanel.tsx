import { profile } from '../../data/resume'
import { OsWindow } from '../OsWindow'

export function ContactPanel() {
  return (
    <OsWindow title="CONTACT.MAIL">
      <p className="panel-lead">Open a channel.</p>
      <ul className="contact-list">
        <li>
          <span>Email</span>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </li>
        <li>
          <span>Phone</span>
          <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a>
        </li>
        <li>
          <span>GitHub</span>
          <a href={profile.github} target="_blank" rel="noreferrer">
            farhadzaresani
          </a>
        </li>
        <li>
          <span>Base</span>
          <span>{profile.location}</span>
        </li>
      </ul>
    </OsWindow>
  )
}
