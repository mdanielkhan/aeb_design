import { steps } from '../content'
import './Process.css'

// The sequence is written, not counted: each stage starts further right,
// so the four lines descend as a staircase that lands on the page's axis.
export default function Process() {
  return (
    <section className="process on-dark" id="process" aria-labelledby="process-title">
      <div className="process__inner wrap">
        <h2 id="process-title" className="visually-hidden">
          How we work
        </h2>
        <ol role="list" className="process__steps">
          {steps.map((step, index) => (
            <li
              key={step.line}
              className="process__step"
              style={{ '--step': index }}
              data-reveal
            >
              <h3 className="process__line">{step.line}</h3>
              <p className="process__text">{step.text}</p>
            </li>
          ))}
        </ol>
        <p className="process__note small" data-reveal>
          The same four stages run a training cohort, a marketplace launch or an ERP rollout.
        </p>
      </div>
    </section>
  )
}
