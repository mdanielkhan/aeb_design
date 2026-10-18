import { useEffect, useRef, useState } from 'react'
import { Phone } from 'lucide-react'
import { contact, nav } from '../content'
import { CloseIcon, WhatsAppIcon } from './Icons'
import './Header.css'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  const menuButton = useRef(null)
  const panel = useRef(null)

  useEffect(() => {
    if (!open) return
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        menuButton.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    panel.current?.querySelector('a')?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  // Transparent over the hero; solid once the page has scrolled past it.
  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => setSolid(window.scrollY > 48))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  // Close the mobile panel if the viewport grows past the phone layout.
  useEffect(() => {
    const query = window.matchMedia('(min-width: 900px)')
    const onChange = () => query.matches && setOpen(false)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  return (
    <header className={`site-header${solid || open ? ' is-solid' : ''}`}>
      <div className="site-header__inner wrap">
        <a className="site-header__brand" href="#top" aria-label="AEB Innovators, back to top">
          <img src="/images/logos/aeb-logo-white.png" alt="" className="site-header__mark site-header__mark--light" />
          <img src="/images/logos/aeb-logo.png" alt="" className="site-header__mark site-header__mark--dark" />
        </a>

        <nav className="site-header__nav" aria-label="Primary">
          <ul role="list">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__end">
          <a className="site-header__phone" href={contact.phoneHref}>
            <Phone className="site-header__phone-icon" strokeWidth={1.75} aria-hidden="true" />
            {contact.phoneDisplay}
          </a>
          <span className="site-header__divider" aria-hidden="true" />
          <a
            className="btn btn--primary site-header__cta"
            href={`https://wa.me/${contact.whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
          >
            <WhatsAppIcon className="btn__mark" />
            WhatsApp us
          </a>
        </div>

        <button
          ref={menuButton}
          type="button"
          className="site-header__menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      <div id="mobile-menu" ref={panel} className="mobile-menu on-dark" hidden={!open}>
        <div className="mobile-menu__top wrap">
          <img src="/images/logos/aeb-logo-white.png" alt="AEB Innovators" className="mobile-menu__logo" />
          <button
            type="button"
            className="mobile-menu__close"
            onClick={() => {
              setOpen(false)
              menuButton.current?.focus()
            }}
          >
            <CloseIcon className="mobile-menu__close-icon" />
            <span className="visually-hidden">Close menu</span>
          </button>
        </div>
        <nav className="wrap" aria-label="Mobile">
          <ul role="list" className="mobile-menu__links">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mobile-menu__foot wrap">
          <a
            className="btn btn--primary"
            href={`https://wa.me/${contact.whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
          >
            <WhatsAppIcon className="btn__mark" />
            WhatsApp us
          </a>
          <a className="text-link" href={contact.phoneHref}>
            {contact.phoneDisplay}
          </a>
          <a className="text-link" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
        </div>
      </div>
    </header>
  )
}
