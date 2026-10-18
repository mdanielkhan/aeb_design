import { team } from '../content'
import './Team.css'

export default function Team() {
  return (
    <section className="team" id="team" aria-labelledby="team-title">
      <div className="team__head wrap axis-grid">
        <p className="team__note" data-reveal>
          Led by founder Aleem Emmanuel Bahadur, with directors for business development in Asia and
          Liberia.
        </p>
        <h2 id="team-title" className="section-title on-axis" data-reveal style={{ '--d': 1 }}>
          The people behind the work.
        </h2>
      </div>

      <ul role="list" className="team__strip">
        {team.map((person, index) => (
          <li key={person.name} className="person" data-reveal style={{ '--d': index }}>
            <figure>
              <div className="person__frame">
                <img
                  src={person.photo}
                  alt={`Portrait of ${person.name}`}
                  width="800"
                  height="605"
                  loading="lazy"
                />
              </div>
              <figcaption>
                <span className="person__name">{person.name}</span>
                <span className="person__role">{person.role}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  )
}
