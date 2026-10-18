import { services } from '../content'
import './Services.css'

// Each service is placed in a tile of its own size and ground, so the
// section reads as a mosaic of unlike pieces rather than a row of cards.
const layout = {
  commerce: { area: 'commerce', tone: 'navy' },
  systems: { area: 'systems', tone: 'white' },
  security: { area: 'security', tone: 'blue' },
  training: { area: 'training', tone: 'paper', photo: true },
  ai: { area: 'ai', tone: 'white' },
  marketing: { area: 'marketing', tone: 'navy' },
}

export default function Services({ onAsk }) {
  return (
    <section className="services wrap" id="services" aria-labelledby="services-title">
      <div className="services__grid">
        <div className="services__head tile tile--paper" data-reveal>
          <h2 id="services-title" className="section-title">
            What we do
          </h2>
          <p className="lead services__intro">
            Six service lines under one roof, from a first marketplace store to smart CCTV analytics.
          </p>
        </div>

        <figure className="services__photo tile" data-reveal style={{ '--d': 1 }}>
          <img
            src="/images/lab-session.webp"
            alt="Participants at their computers during an AEB Innovators training session"
            width="1200"
            height="1200"
            loading="lazy"
          />
        </figure>

        {services.map((service, index) => {
          const place = layout[service.id]
          return (
            <article
              key={service.id}
              className={`tile tile--${place.tone} service${place.photo ? ' service--with-photo' : ''}`}
              style={{ gridArea: place.area, '--d': (index % 3) + 1 }}
              data-reveal
              aria-labelledby={`service-${service.id}`}
            >
              <div className="service__text">
                <h3 id={`service-${service.id}`} className="service__title">
                  {service.title}
                </h3>
                <p className="service__body">{service.text}</p>
                <a
                  className="service__ask"
                  href="#contact"
                  onClick={() => onAsk(service.id)}
                  aria-describedby={`service-${service.id}`}
                >
                  Ask about this
                </a>
              </div>
              {place.photo && (
                <img
                  className="service__photo"
                  src="/images/lab-future.webp"
                  alt="Trainees coding in front of an AEB Innovators ‘Future of Pakistan’ banner"
                  width="900"
                  height="1764"
                  loading="lazy"
                />
              )}
            </article>
          )
        })}
      </div>
    </section>
  )
}
