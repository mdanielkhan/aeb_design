import { nav, social } from '../content'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="site-footer on-dark wrap">
      <img className="site-footer__logo" src="/images/logos/aeb-logo-white.png" alt="AEB Innovators" loading="lazy" />

      <nav aria-label="Footer">
        <ul role="list" className="site-footer__nav">
          {nav.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <ul role="list" className="site-footer__social" aria-label="AEB Innovators on social media">
        {social.map((item) => (
          <li key={item.label}>
            <a href={item.href} target="_blank" rel="noreferrer">
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <p className="site-footer__copy small soft">
        © {new Date().getFullYear()} AEB Innovators. Rawalpindi, Pakistan.
      </p>
    </footer>
  )
}
