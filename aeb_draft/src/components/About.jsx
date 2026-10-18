import { pillars } from '../content'
import './About.css'

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
        <div className="founder__grid wrap grid12">
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
          </div>
        </div>
      </section>
    </>
  )
}
