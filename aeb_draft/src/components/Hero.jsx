import { contact, partners } from '../content'
import { WhatsAppIcon } from './Icons'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero on-dark" id="top" aria-labelledby="hero-title">
      <div className="hero__inner wrap">
        <p className="eyebrow" data-reveal>
          Digital enablement &amp; entrepreneurship
        </p>
        <h1 id="hero-title" className="hero__title" data-reveal style={{ '--d': 1 }}>
          We turn ideas into sustainable enterprises.
        </h1>
        <p className="hero__lead measure" data-reveal style={{ '--d': 2 }}>
          Mentorship, digital skills training and access to markets for young people, institutions
          and corporates building Pakistan&rsquo;s digital economy.
        </p>
        <div className="hero__actions" data-reveal style={{ '--d': 3 }}>
          <a className="btn btn--primary" href={`https://wa.me/${contact.whatsappNumber}`} target="_blank" rel="noreferrer">
            <WhatsAppIcon className="btn__mark" />
            Chat on WhatsApp
          </a>
          <a className="text-link" href="#services">
            See our services
          </a>
        </div>
      </div>

      <div className="hero__trust wrap" data-reveal style={{ '--d': 4 }}>
        <p className="small soft hero__trust-label">Our network includes</p>
        <ul role="list" className="hero__logos">
          {partners.map((partner) => (
            <li key={partner.name}>
              <img src={partner.logo} alt={partner.name} loading="lazy" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
