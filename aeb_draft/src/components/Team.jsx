import { team } from '../content'
import './Team.css'

export default function Team() {
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

      <ul role="list" className="team__grid grid12">
        {team.map((person, index) => (
          <li key={person.name} className="person" data-reveal style={{ '--d': index % 3 }}>
            <figure>
              <div className="person__frame">
                <img src={person.photo} alt={`Portrait of ${person.name}`} loading="lazy" />
              </div>
              <figcaption>
                <span className="person__name">{person.name}</span>
                <span className="person__role small soft">{person.role}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  )
}
