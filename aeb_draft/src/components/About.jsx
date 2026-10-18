import { Boxes, Cpu, GraduationCap, Megaphone, ShieldCheck, ShoppingCart } from 'lucide-react'
import { contact, pillars, services } from '../content'
import { WhatsAppIcon } from './Icons'
import './About.css'

const serveTags = ['Business', 'Non-profit', 'Corporate', 'Institutional']

const serviceIcons = {
  'shopping-cart': ShoppingCart,
  boxes: Boxes,
  megaphone: Megaphone,
  'graduation-cap': GraduationCap,
  cpu: Cpu,
  'shield-check': ShieldCheck,
}

export default function About() {
  return (
    <>
      <section className="intro wrap" id="about" aria-labelledby="about-title">
        <h2 id="about-title" className="visually-hidden">
          Who we are
        </h2>
        <p className="intro__lead lead measure" data-reveal>
          AEB Innovators LLP is a Pakistan-based digital enablement and entrepreneurship company,
          registered under the SECP, working across business, non-profit, corporate and
          institutional sectors.
        </p>

        <ul role="list" className="intro__pillars grid12">
          {pillars.map((pillar, index) => (
            <li key={pillar.title} data-reveal style={{ '--d': index + 1 }}>
              <strong>{pillar.title}</strong> <span className="soft">{pillar.text}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="founder" aria-labelledby="founder-title">
        <div className="founder__grid wrap">
          <figure className="founder__portrait" data-reveal>
            <img
              src="/images/founder-portrait.webp"
              alt="Aleem Emmanuel Bahadur, founder of AEB Innovators, speaking into a microphone"
              width="1000"
              height="1174"
              loading="lazy"
            />
          </figure>

          <div className="founder__text" data-reveal style={{ '--d': 1 }}>
            <p className="eyebrow">Founder</p>
            <h2 id="founder-title" className="section-title">
              Aleem Emmanuel Bahadur
            </h2>

            <p className="founder__statement lead measure">
              A pioneer in entrepreneurship ecosystem development, Aleem has spent more than 17
              years leading high-impact initiatives and mentoring startups across Pakistan.
            </p>

            <p className="founder__body measure">
              We envision a world where young minds and emerging entrepreneurs from
              underrepresented communities are equipped with the tools, skills and platforms to
              thrive in the digital economy, and to lead meaningful change in their communities.
            </p>

            <dl className="founder__stats">
              <div className="founder__stat">
                <dt className="small soft">Founder&rsquo;s experience</dt>
                <dd>17+ years</dd>
              </div>
              <div className="founder__stat">
                <dt className="small soft">Registered</dt>
                <dd>SECP LLP</dd>
              </div>
              <div className="founder__stat">
                <dt className="small soft">Based in</dt>
                <dd>Rawalpindi</dd>
              </div>
            </dl>

            <blockquote className="founder__pull">
              <p>
                &ldquo;AEB Innovators stands at the crossroads of technology, mentorship and
                inclusive growth.&rdquo;
              </p>
            </blockquote>

            <div className="founder__serve">
              <p className="founder__block-label small soft">Who we serve</p>
              <ul role="list" className="founder__tags">
                {serveTags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>

            <div className="founder__do">
              <p className="founder__block-label small soft">What we do</p>
              <ul role="list" className="founder__service-chips">
                {services.map((service) => {
                  const Icon = serviceIcons[service.icon]
                  return (
                    <li key={service.id}>
                      <a href="#services">
                        <Icon aria-hidden="true" strokeWidth={1.5} />
                        {service.title}
                      </a>
                    </li>
                  )
                })}
              </ul>
              <a
                className="btn btn--primary founder__whatsapp"
                href={`https://wa.me/${contact.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
              >
                <WhatsAppIcon className="btn__mark" />
                Talk to us on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
