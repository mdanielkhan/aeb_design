import { useEffect, useRef, useState } from 'react'
import { ArrowIcon, PlayIcon } from './Icons'
import './Gallery.css'

const FILM_ID = '6maNZnQOUPE'

const modules = [
  {
    type: 'tall',
    images: [{ src: '/images/founder-stage.webp', w: 1200, h: 1548, alt: 'Aleem Emmanuel Bahadur addressing an audience', pos: '50% 30%' }],
  },
  { type: 'film' },
  {
    type: 'tall',
    images: [{ src: '/images/lab-coding.webp', w: 900, h: 1494, alt: 'Trainees concentrating on code during a lab session', pos: '50% 50%' }],
  },
  {
    type: 'stack',
    images: [
      { src: '/images/panel.webp', w: 1600, h: 1136, alt: 'Panel discussion on stage featuring the CEO of AEB Innovators', pos: '50% 70%' },
      { src: '/images/lab-session.webp', w: 1200, h: 1200, alt: 'A training room of participants working at computers', pos: '50% 50%' },
    ],
  },
  {
    type: 'wide',
    images: [{ src: '/images/ceremony.webp', w: 1600, h: 640, alt: 'Certificate distribution ceremony group photograph', pos: '50% 40%' }],
  },
  {
    type: 'tall',
    images: [{ src: '/images/lab-future.webp', w: 900, h: 1764, alt: 'A trainee at work beside an AEB Innovators banner reading Future of Pakistan', pos: '50% 45%' }],
  },
  {
    type: 'tall',
    images: [{ src: '/images/founder-stage-2.webp', w: 1000, h: 1501, alt: 'The founder speaking with a microphone at a summit', pos: '50% 30%' }],
  },
]

function Film() {
  const [playing, setPlaying] = useState(false)
  if (playing) {
    return (
      <div className="gallery__film">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${FILM_ID}?autoplay=1&rel=0`}
          title="How AEB Innovators works, video"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>
    )
  }
  return (
    <button type="button" className="gallery__film gallery__film--poster" onClick={() => setPlaying(true)}>
      <img src="/images/film-poster.jpg" alt="" width="1280" height="720" loading="lazy" />
      <span className="gallery__film-label">
        <span className="gallery__play">
          <PlayIcon className="gallery__play-icon" />
        </span>
        <span>
          <span className="gallery__film-title">Watch how we work</span>
          <span className="gallery__film-meta">Plays on YouTube</span>
        </span>
      </span>
    </button>
  )
}

export default function Gallery() {
  const row = useRef(null)
  const [edges, setEdges] = useState({ start: true, end: false })

  useEffect(() => {
    const el = row.current
    if (!el) return
    const update = () =>
      setEdges({
        start: el.scrollLeft < 8,
        end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8,
      })
    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)

    // Drag to scroll with a mouse; touch and trackpads scroll natively.
    let startX = 0
    let startScroll = 0
    let dragging = false
    let moved = false
    const down = (event) => {
      if (event.pointerType !== 'mouse' || event.button !== 0) return
      dragging = true
      moved = false
      startX = event.clientX
      startScroll = el.scrollLeft
    }
    const move = (event) => {
      if (!dragging) return
      const dx = event.clientX - startX
      if (Math.abs(dx) > 4) {
        moved = true
        el.classList.add('is-dragging')
      }
      el.scrollLeft = startScroll - dx
    }
    const up = () => {
      dragging = false
      el.classList.remove('is-dragging')
    }
    const click = (event) => {
      if (moved) {
        event.preventDefault()
        event.stopPropagation()
        moved = false
      }
    }
    el.addEventListener('pointerdown', down)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    el.addEventListener('click', click, true)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      el.removeEventListener('pointerdown', down)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      el.removeEventListener('click', click, true)
    }
  }, [])

  const scrollBy = (direction) => {
    const el = row.current
    if (!el) return
    el.scrollBy({ left: direction * el.clientWidth * 0.7, behavior: 'smooth' })
  }

  return (
    <section className="gallery" aria-labelledby="gallery-title">
      <div className="gallery__head wrap">
        <h2 id="gallery-title" className="gallery__title" data-reveal>
          Inside our programmes
        </h2>
        <div className="gallery__controls" data-reveal style={{ '--d': 1 }}>
          <span className="gallery__count soft">Seven photographs and one film</span>
          <button
            type="button"
            className="gallery__arrow"
            onClick={() => scrollBy(-1)}
            disabled={edges.start}
            aria-label="Scroll gallery back"
          >
            <ArrowIcon className="gallery__arrow-icon" direction="left" />
          </button>
          <button
            type="button"
            className="gallery__arrow"
            onClick={() => scrollBy(1)}
            disabled={edges.end}
            aria-label="Scroll gallery forward"
          >
            <ArrowIcon className="gallery__arrow-icon" />
          </button>
        </div>
      </div>

      <div
        ref={row}
        className="gallery__row"
        tabIndex={0}
        role="region"
        aria-label="Photographs from AEB Innovators programmes, scroll sideways"
      >
        {modules.map((module, index) => (
          <div key={index} className={`gallery__module gallery__module--${module.type}`}>
            {module.type === 'film' ? (
              <Film />
            ) : (
              module.images.map((image) => (
                <img
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  width={image.w}
                  height={image.h}
                  loading="lazy"
                  draggable="false"
                  style={{ objectPosition: image.pos }}
                />
              ))
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
