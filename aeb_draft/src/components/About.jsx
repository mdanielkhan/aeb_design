import { network, pillars } from '../content'
import './About.css'

export default function About() {
  return (
    <>
      <section className="intro wrap" id="about" aria-labelledby="about-title">
        <h2 id="about-title" className="visually-hidden">
          Who we are
        </h2>
        <p className="intro__lead lead" data-reveal>
          AEB Innovators LLP is a Pakistan-based digital enablement and entrepreneurship company,
          registered under the SECP, working across business, non-profit, corporate and institutional
          sectors.
        </p>

        <ul role="list" className="intro__pillars">
          {pillars.map((pillar, index) => (
            <li key={pillar.title} data-reveal style={{ '--d': index + 1 }}>
              <strong>{pillar.title}</strong> <span className="soft">{pillar.text}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="founder on-dark" aria-labelledby="founder-title">
        <div className="founder__inner wrap axis-grid">
          <figure className="founder__portrait" data-reveal>
            <img
              src="/images/founder-portrait.webp"
              alt="Aleem Emmanuel Bahadur, founder of AEB Innovators, speaking into a microphone"
              width="1000"
              height="1174"
              loading="lazy"
            />
          </figure>

          <div className="on-axis founder__text">
            <h2 id="founder-title" className="section-title" data-reveal>
              Founded by Aleem Emmanuel Bahadur.
            </h2>

            <p className="founder__statement lead" data-reveal style={{ '--d': 1 }}>
              A pioneer in entrepreneurship ecosystem development, Aleem has spent more than 17 years
              leading high-impact initiatives and mentoring startups across Pakistan.
            </p>

            <p className="founder__body" data-reveal style={{ '--d': 2 }}>
              We envision a world where young minds and emerging entrepreneurs from underrepresented
              communities are equipped with the tools, skills and platforms to thrive in the digital
              economy, and to lead meaningful change in their communities. AEB Innovators stands at the
              crossroads of technology, mentorship and inclusive growth, and Aleem remains an advocate and
              promoter of e-commerce-based platforms.
            </p>

            <dl className="founder__facts" data-reveal style={{ '--d': 3 }}>
              <div>
                <dt>Registered</dt>
                <dd>SECP, as a limited liability partnership</dd>
              </div>
              <div>
                <dt>Based in</dt>
                <dd>Rawalpindi, Pakistan</dd>
              </div>
              <div>
                <dt>Business development</dt>
                <dd>Asia and Liberia</dd>
              </div>
              <div>
                <dt>Founder’s experience</dt>
                <dd>17+ years</dd>
              </div>
            </dl>

            <div className="founder__records" data-reveal style={{ '--d': 4 }}>
              <div>
                <h3 className="founder__record-title">Recognition</h3>
                <ul role="list">
                  <li>
                    <span>Università di Siena, Italy: research on Service Entrepreneurship</span>
                    <span className="founder__year">2026</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="founder__record-title">Organisations in our network</h3>
                <ul role="list">
                  {network.map((name) => (
                    <li key={name}>{name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
