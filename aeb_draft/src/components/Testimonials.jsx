import { useState } from 'react'
import { testimonials } from '../content'
import { ArrowIcon } from './Icons'
import './Testimonials.css'

const quotes = testimonials.filter((item) => item.role !== 'Assistant Professor')
const recognition = testimonials.find((item) => item.role === 'Assistant Professor')

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const current = quotes[active]

  const go = (direction) => setActive((value) => (value + direction + quotes.length) % quotes.length)

  return (
    <section className="voices on-dark" id="testimonials" aria-labelledby="voices-title">
      <div className="wrap voices__inner">
        <div className="voices__head">
          <p className="eyebrow">What clients and partners say</p>
          <h2 id="voices-title" className="visually-hidden">
            Testimonials
          </h2>
        </div>

        <div className="voices__quote" aria-live="polite">
          <figure key={active}>
            <blockquote>
              <p className="voices__text">&ldquo;{current.quote}&rdquo;</p>
            </blockquote>
            <figcaption>
              <span className="voices__name">{current.name}</span>
              <span className="voices__role soft">{current.role}</span>
            </figcaption>
          </figure>
        </div>

        <div className="voices__controls">
          <button type="button" className="voices__arrow" onClick={() => go(-1)} aria-label="Previous testimonial">
            <ArrowIcon className="voices__arrow-icon" direction="left" />
          </button>
          <span className="small soft voices__count">
            {active + 1} / {quotes.length}
          </span>
          <button type="button" className="voices__arrow" onClick={() => go(1)} aria-label="Next testimonial">
            <ArrowIcon className="voices__arrow-icon" />
          </button>
        </div>

        {recognition && (
          <p className="voices__recognition small">
            <span className="voices__recognition-mark" aria-hidden="true" />
            {recognition.quote} &mdash; {recognition.name}, {recognition.role}
          </p>
        )}
      </div>
    </section>
  )
}
