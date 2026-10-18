import { useEffect, useRef, useState } from 'react'
import { testimonials } from '../content'
import './Testimonials.css'

const AUTOPLAY_MS = 7000

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const current = testimonials[active]
  const timerRef = useRef(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (paused || reduced) return
    timerRef.current = setInterval(() => {
      setActive((value) => (value + 1) % testimonials.length)
    }, AUTOPLAY_MS)
    return () => clearInterval(timerRef.current)
  }, [paused, active])

  return (
    <section
      className="voices on-dark"
      id="testimonials"
      aria-labelledby="voices-title"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false)
      }}
    >
      <svg className="voices__motif" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <polygon points="14,8 34,42 -6,42" fill="none" stroke="currentColor" strokeWidth="0.4" />
        <polygon points="92,58 118,104 66,104" fill="none" stroke="currentColor" strokeWidth="0.4" />
      </svg>

      <div className="wrap voices__inner">
        <p className="eyebrow" data-reveal>
          What clients and partners say
        </p>
        <h2 id="voices-title" className="visually-hidden">
          Testimonials
        </h2>

        <div className="voices__grid">
          <figure className="voices__featured" data-reveal style={{ '--d': 1 }}>
            <img className="voices__avatar" src={current.photo} alt={current.photoAlt ?? ''} key={current.photo} />
            <div className="voices__featured-body" key={active}>
              {current.tag && <span className="voices__tag">{current.tag}</span>}
              <blockquote>
                <p className="voices__text">&ldquo;{current.quote}&rdquo;</p>
              </blockquote>
              <figcaption>
                <span className="voices__name">{current.name}</span>
                <span className="voices__role soft">{current.role}</span>
              </figcaption>
            </div>
          </figure>

          <div className="voices__list" role="tablist" aria-label="Choose a testimonial">
            {testimonials.map((item, index) => (
              <button
                key={item.name}
                type="button"
                role="tab"
                aria-selected={index === active}
                className={`voices__card${index === active ? ' is-active' : ''}`}
                onClick={() => setActive(index)}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
              >
                <img className="voices__card-avatar" src={item.photo} alt="" />
                <span className="voices__card-body">
                  <span className="voices__card-name">{item.name}</span>
                  <span className="voices__card-role small soft">{item.role}</span>
                  <span className="voices__card-excerpt small soft">{item.excerpt}</span>
                </span>
                {index === active && (
                  <span className="voices__progress">
                    <span
                      className="voices__progress-fill"
                      key={`${active}-${paused}`}
                      style={{ animationPlayState: paused ? 'paused' : 'running' }}
                    />
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
