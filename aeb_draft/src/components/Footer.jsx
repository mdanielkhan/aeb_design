import { contact, nav, social } from '../content'
import { ArrowIcon } from './Icons'
import './Footer.css'

export default function Footer() {
  const [user, domain] = contact.email.split('@')
  return (
    <footer className="site-footer on-dark">
      <div className="site-footer__top wrap">
        <img
          className="site-footer__logo"
          src="/images/logos/aeb-logo-white.png"
          alt="AEB Innovators"
          width="600"
          height="189"
          loading="lazy"
        />
        <p className="site-footer__note">
          AEB Innovators LLP, registered under the SECP: a digital enablement company working for
          business, non-profit, corporate and institutional sectors.
        </p>
        <p className="site-footer__note">
          {contact.address}
          <br />
          {contact.hours}
        </p>
        <a className="site-footer__top-link text-link" href="#top">
          Back to top
          <ArrowIcon className="site-footer__up" direction="up" />
        </a>
      </div>

      <div className="site-footer__display wrap">
        <p className="site-footer__ask">Write to us any time</p>
        <a className="site-footer__email" href={`mailto:${contact.email}`}>
          <span>{user}</span>
          <span>@{domain}</span>
        </a>
        <a className="site-footer__phone text-link" href={contact.phoneHref}>
          or call {contact.phoneDisplay}
        </a>
      </div>

      <div className="site-footer__meta wrap">
        <nav aria-label="Footer">
          <ul role="list">
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
        <p>© {new Date().getFullYear()} AEB Innovators. All rights reserved. Rawalpindi, Pakistan.</p>
      </div>
    </footer>
  )
}
