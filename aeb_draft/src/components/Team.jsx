import { useEffect, useRef, useState } from 'react'
import { team } from '../content'
import { CloseIcon } from './Icons'
import './Team.css'

function Drawer({ person, onClose, returnFocusEl }) {
  const panelRef = useRef(null)
  const closeRef = useRef(null)

  useEffect(() => {
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab') return
      const focusable = panelRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (!focusable || focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
      returnFocusEl?.focus()
    }
  }, [onClose, returnFocusEl])

  return (
    <div className="person-drawer">
      <button type="button" className="person-drawer__scrim" onClick={onClose} aria-label="Close" />
      <div
        className="person-drawer__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="person-drawer-title"
        ref={panelRef}
      >
        <button ref={closeRef} type="button" className="person-drawer__close" onClick={onClose}>
          <CloseIcon className="person-drawer__close-icon" />
          <span className="visually-hidden">Close</span>
        </button>
        <img className="person-drawer__photo" src={person.photo} alt={`Portrait of ${person.name}`} />
        <div className="person-drawer__body">
          <h3 id="person-drawer-title" className="person-drawer__name">
            {person.name}
          </h3>
          <p className="person-drawer__role soft">{person.role}</p>
          {person.bio && <p className="person-drawer__bio">{person.bio}</p>}
          {person.skills && (
            <ul role="list" className="person-drawer__skills">
              {person.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Team() {
  const [openIndex, setOpenIndex] = useState(null)
  const [trigger, setTrigger] = useState(null)

  return (
    <section className="team wrap" id="team" aria-labelledby="team-title">
      <div className="team__head grid12">
        <div data-reveal>
          <p className="eyebrow">Team</p>
          <h2 id="team-title" className="section-title">
            The people behind the work.
          </h2>
        </div>
        <p className="team__note soft measure" data-reveal style={{ '--d': 1 }}>
          Led by founder Aleem Emmanuel Bahadur, with directors for business development in Asia
          and Liberia.
        </p>
      </div>

      <ul role="list" className="team__grid">
        {team.map((person, index) => (
          <li key={person.name} data-reveal style={{ '--d': index % 3 }}>
            <button
              type="button"
              className="person"
              onClick={(event) => {
                setOpenIndex(index)
                setTrigger(event.currentTarget)
              }}
            >
              <span className="person__frame">
                <img src={person.photo} alt={`Portrait of ${person.name}`} loading="lazy" />
              </span>
              <span className="person__caption">
                <span className="person__name">{person.name}</span>
                <span className="person__role small soft">{person.role}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {openIndex !== null && (
        <Drawer person={team[openIndex]} onClose={() => setOpenIndex(null)} returnFocusEl={trigger} />
      )}
    </section>
  )
}
