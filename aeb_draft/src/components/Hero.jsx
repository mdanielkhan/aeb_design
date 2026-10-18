import { ArrowIcon } from './Icons'
import './Hero.css'

// Gutterless masthead: AEB's own photographs butted against flat brand tiles.
const tiles = [
  { kind: 'navy', area: 'a' },
  {
    kind: 'photo',
    area: 'b',
    src: '/images/ceremony.webp',
    alt: 'Graduates holding their certificates at an AEB Innovators certificate distribution ceremony with the Rhemati Development Foundation',
    width: 1600,
    height: 640,
    position: '50% 30%',
    drift: true,
  },
  { kind: 'blue', area: 'c' },
  {
    kind: 'photo',
    area: 'd',
    src: '/images/founder-stage.webp',
    alt: 'Founder Aleem Emmanuel Bahadur speaking at a business summit',
    width: 1200,
    height: 1548,
    position: '50% 25%',
  },
  {
    kind: 'photo',
    area: 'e',
    src: '/images/lab-coding.webp',
    alt: 'Trainees working on laptops during a digital skills session',
    width: 900,
    height: 1494,
    position: '50% 40%',
  },
  { kind: 'yellow', area: 'f' },
  {
    kind: 'photo',
    area: 'g',
    src: '/images/panel.webp',
    alt: 'Panel discussion with Aleem Emmanuel, CEO of AEB Innovators, on stage',
    width: 1600,
    height: 1136,
    position: '50% 78%',
  },
]

export default function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__band">
        {tiles.map((tile, index) => (
          <div
            key={tile.area}
            className={`hero__tile hero__tile--${tile.kind}`}
            style={{ gridArea: tile.area, '--i': index }}
          >
            {tile.kind === 'photo' && (
              <img
                src={tile.src}
                alt={tile.alt}
                width={tile.width}
                height={tile.height}
                fetchPriority={index === 1 ? 'high' : undefined}
                className={tile.drift ? 'is-drifting' : undefined}
                style={{ objectPosition: tile.position }}
              />
            )}
          </div>
        ))}
      </div>

      <div className="hero__body wrap axis-grid">
        <p className="hero__standfirst">
          AEB Innovators turns ideas into sustainable enterprises, with mentorship, digital skills and
          access to markets for young people and emerging entrepreneurs across Pakistan.
        </p>

        <div className="on-axis">
          <h1 id="hero-title" className="hero__title lines">
            <span className="line">
              <span data-line style={{ '--i': 0 }}>
                Ideas into
              </span>
            </span>
            <span className="line">
              <span data-line style={{ '--i': 1 }}>
                enterprises.
              </span>
            </span>
          </h1>

          <div className="hero__actions">
            <a className="btn btn--primary" href="#contact">
              Start a conversation
              <ArrowIcon />
            </a>
            <a className="text-link" href="#services">
              See what we do
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
