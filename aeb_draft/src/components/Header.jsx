import { useEffect, useRef, useState } from 'react'
import { contact, nav } from '../content'
import { ArrowIcon, CloseIcon } from './Icons'
import './Header.css'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [tucked, setTucked] = useState(false)
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

  // Tuck the bar away while reading downwards; bring it back on any scroll up.
  useEffect(() => {
    let last = window.scrollY
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const y = window.scrollY
        if (Math.abs(y - last) < 6) return
        setTucked(y > last && y > 480)
        last = y
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  // Close the panel if the viewport grows past the phone layout.
  useEffect(() => {
    const query = window.matchMedia('(min-width: 900px)')
    const onChange = () => query.matches && setOpen(false)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  return (
    <header className={`site-header${tucked && !open ? ' is-tucked' : ''}`}>
      <a className="site-header__brand" href="#top" aria-label="AEB Innovators, back to top">
        <img src="/images/logos/aeb-logo-white.png" alt="" width="600" height="189" />
      </a>

      <nav className="site-header__tab" aria-label="Primary">
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
          {contact.phoneDisplay}
        </a>
        <a className="btn btn--primary site-header__cta" href="#contact">
          Contact us
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

      <div
        id="mobile-menu"
        ref={panel}
        className="mobile-menu on-dark"
        hidden={!open}
      >
        <div className="mobile-menu__top">
          <img src="/images/logos/aeb-logo-white.png" alt="AEB Innovators" width="600" height="189" />
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
        <nav aria-label="Mobile">
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
        <div className="mobile-menu__foot">
          <a className="btn btn--primary" href="#contact" onClick={() => setOpen(false)}>
            Start a conversation
            <ArrowIcon />
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
