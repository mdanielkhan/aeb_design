import { steps } from '../content'
import './Process.css'

export default function Process() {
  return (
    <section className="process on-dark" id="process" aria-labelledby="process-title">
      <div className="wrap">
        <div className="process__head" data-reveal>
          <p className="eyebrow">How we work</p>
          <h2 id="process-title" className="section-title">
            Four stages, every time.
          </h2>
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

        <p className="process__note small soft" data-reveal>
          The same four stages run a training cohort, a marketplace launch or an ERP rollout.
        </p>
      </div>
    </section>
  )
}
