import { useState } from 'react'
import { Boxes, Cpu, GraduationCap, Megaphone, ShieldCheck, ShoppingCart } from 'lucide-react'
import { contact, services } from '../content'
import { WhatsAppIcon } from './Icons'
import './Services.css'

const icons = {
  'shopping-cart': ShoppingCart,
  boxes: Boxes,
  megaphone: Megaphone,
  'graduation-cap': GraduationCap,
  cpu: Cpu,
  'shield-check': ShieldCheck,
}

function Panel({ service }) {
  const Icon = icons[service.icon]
  const whatsappHref = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
    `Hi AEB Innovators, I'd like to discuss your "${service.title}" service.`,
  )}`
  return (
    <div className="services__panel-inner" key={service.id}>
      <div className="services__icon-tile" aria-hidden="true">
        <svg className="services__icon-grid" viewBox="0 0 80 80">
          <polygon points="40,6 70,66 10,66" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
        <Icon className="services__icon" strokeWidth={1.5} />
      </div>
      <h3 className="services__panel-title">{service.title}</h3>
      <p className="services__panel-text">{service.text}</p>
      <ul role="list" className="services__chips">
        {service.chips.map((chip) => (
          <li key={chip}>{chip}</li>
        ))}
      </ul>
      <a className="btn btn--primary services__panel-cta" href={whatsappHref} target="_blank" rel="noreferrer">
        <WhatsAppIcon className="btn__mark" />
        Discuss this service
      </a>
    </div>
  )
}

export default function Services() {
  const [active, setActive] = useState(0)
  const activeService = services[active]

  return (
    <section className="services on-dark" id="services" aria-labelledby="services-title">
      <div className="wrap">
        <div className="services__head" data-reveal>
          <p className="eyebrow">What we do</p>
          <h2 id="services-title" className="section-title">
            Six service lines, under one roof.
          </h2>
        </div>

        <div className="services__split">
          <div className="services__list" role="tablist" aria-label="Services" aria-orientation="vertical">
            {services.map((service, index) => (
              <div key={service.id} className="services__item-wrap">
                <button
                  type="button"
                  role="tab"
                  aria-selected={index === active}
                  aria-controls={`service-panel-${service.id}`}
                  className={`services__item${index === active ? ' is-active' : ''}`}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                >
                  <span className="services__item-num">{String(index + 1).padStart(2, '0')}</span>
                  <span className="services__item-text">
                    <span className="services__item-title">{service.title}</span>
                    <span className="services__item-short small">{service.short}</span>
                  </span>
                </button>
                <div className="services__accordion" id={`service-panel-${service.id}`} hidden={index !== active}>
                  <Panel service={service} />
                </div>
              </div>
            ))}
          </div>

          <div className="services__preview" id={`service-panel-${activeService.id}-desktop`}>
            <Panel service={activeService} />
          </div>
        </div>
      </div>
    </section>
  )
}
