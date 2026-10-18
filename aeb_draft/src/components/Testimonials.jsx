import { useRef, useState } from 'react'
import { testimonials } from '../content'
import './Testimonials.css'

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const tabs = useRef([])
  const current = testimonials[active]

  const onKeyDown = (event) => {
    const keys = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }
    let next = null
    if (event.key in keys) next = (active + keys[event.key] + testimonials.length) % testimonials.length
    if (event.key === 'Home') next = 0
    if (event.key === 'End') next = testimonials.length - 1
    if (next === null) return
    event.preventDefault()
    setActive(next)
    tabs.current[next]?.focus()
  }

  return (
    <section className="voices on-dark" id="testimonials" aria-labelledby="voices-title">
      <div className="voices__people">
        <h2 id="voices-title" className="voices__title" data-reveal>
          What clients and partners say
        </h2>

        <div className="voices__switch" role="tablist" aria-label="Choose a testimonial" onKeyDown={onKeyDown}>
          {testimonials.map((item, index) => (
            <button
              key={item.name}
              ref={(node) => (tabs.current[index] = node)}
              type="button"
              role="tab"
              id={`voice-tab-${index}`}
              aria-selected={index === active}
              aria-controls="voice-panel"
              tabIndex={index === active ? 0 : -1}
              className="voices__tab"
              onClick={() => setActive(index)}
            >
              <img src={item.photo} alt="" width="96" height="96" loading="lazy" />
              <span>
                <span className="voices__name">{item.name}</span>
                <span className="voices__role">{item.role}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <div
        className="voices__quote"
        id="voice-panel"
        role="tabpanel"
        aria-labelledby={`voice-tab-${active}`}
      >
        <figure key={active} className="voices__figure">
          <blockquote>
            <p>“{current.quote}”</p>
          </blockquote>
          <figcaption>
            <span className="voices__dash" aria-hidden="true" />
            <span>
              <span className="voices__name">{current.name}</span>
              <span className="voices__role">{current.role}</span>
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
