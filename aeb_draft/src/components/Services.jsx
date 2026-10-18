import { services } from '../content'
import { ArrowIcon } from './Icons'
import './Services.css'

export default function Services({ onAsk }) {
  return (
    <section className="services wrap" id="services" aria-labelledby="services-title">
      <div className="services__head grid12">
        <div className="services__head-text" data-reveal>
          <p className="eyebrow">What we do</p>
          <h2 id="services-title" className="section-title">
            Six service lines, under one roof.
          </h2>
        </div>
        <p className="services__intro lead measure" data-reveal style={{ '--d': 1 }}>
          From a first marketplace store to smart CCTV analytics, each line is run by people who
          build it hands-on with you.
        </p>
      </div>

      <ol className="services__list" role="list">
        {services.map((service, index) => (
          <li key={service.id} data-reveal style={{ '--d': (index % 3) + 1 }}>
            <a
              className="services__row grid12"
              href="#contact"
              onClick={() => onAsk(service.id)}
              aria-describedby={`service-${service.id}-desc`}
            >
              <span className="services__num small" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="services__name">{service.title}</span>
              <span className="services__desc soft" id={`service-${service.id}-desc`}>
                {service.text}
              </span>
              <ArrowIcon className="services__arrow" />
            </a>
          </li>
        ))}
      </ol>
    </section>
  )
}
