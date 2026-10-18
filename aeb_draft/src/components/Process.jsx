import { steps } from '../content'
import './Process.css'

export default function Process() {
  return (
    <section className="process" id="process" aria-labelledby="process-title">
      <div className="wrap">
        <div className="process__head" data-reveal>
          <div className="process__head-left">
            <p className="eyebrow">How we work</p>
            <h2 id="process-title" className="section-title">
              Four stages, every time.
            </h2>
          </div>
          <div className="process__head-right">
            <p className="process__intro soft">
              Every engagement follows the same four stages, from the first conversation to
              long-term support. We listen first, design around what we heard, build hands-on, and
              stay on to help you scale.
            </p>
            <ul role="list" className="process__tags">
              <li>Training cohort</li>
              <li>Marketplace launch</li>
              <li>ERP rollout</li>
            </ul>
          </div>
        </div>

        <ol role="list" className="process__timeline">
          {steps.map((step, index) => (
            <li key={step.line} className="process__step" data-reveal style={{ '--d': index }}>
              <span className="process__num" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="process__node" aria-hidden="true" />
              <h3 className="process__title">{step.line}</h3>
              <p className="process__text small soft">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
