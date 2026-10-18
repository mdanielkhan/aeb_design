import { useEffect, useRef, useState } from 'react'
import { Boxes, Cpu, GraduationCap, Megaphone, Phone, ShieldCheck, ShoppingCart } from 'lucide-react'
import { contact, nav, services } from '../content'
import { CloseIcon, WhatsAppIcon } from './Icons'
import './Header.css'

const megaIcons = {
  'shopping-cart': ShoppingCart,
  boxes: Boxes,
  megaphone: Megaphone,
  'graduation-cap': GraduationCap,
  cpu: Cpu,
  'shield-check': ShieldCheck,
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const menuButton = useRef(null)
  const panel = useRef(null)
  const megaItemRef = useRef(null)
  const servicesTriggerRef = useRef(null)

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

  // The Services mega menu: Esc closes and returns focus; a click outside closes it.
  useEffect(() => {
    if (!megaOpen) return
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setMegaOpen(false)
        servicesTriggerRef.current?.focus()
      }
    }
    const onPointerDown = (event) => {
      if (megaItemRef.current && !megaItemRef.current.contains(event.target)) {
        setMegaOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [megaOpen])

  return (
    <header className={`site-header${solid || open ? ' is-solid' : ''}`}>
      <div className="site-header__inner wrap">
        <a className="site-header__brand" href="#top" aria-label="AEB Innovators, back to top">
          <img src="/images/logos/aeb-logo-white.png" alt="" className="site-header__mark site-header__mark--light" />
          <img src="/images/logos/aeb-logo.png" alt="" className="site-header__mark site-header__mark--dark" />
        </a>

        <nav className="site-header__nav" aria-label="Primary">
          <ul role="list">
            {nav.map((item) =>
              item.label === 'Services' ? (
                <li
                  key={item.href}
                  ref={megaItemRef}
                  className="site-header__mega"
                  onMouseEnter={() => setMegaOpen(true)}
                  onMouseLeave={() => setMegaOpen(false)}
                >
                  <button
                    ref={servicesTriggerRef}
                    type="button"
                    className="site-header__mega-trigger"
                    aria-haspopup="true"
                    aria-expanded={megaOpen}
                    aria-controls="services-mega-panel"
                    onFocus={() => setMegaOpen(true)}
                    onClick={() => setMegaOpen(true)}
                  >
                    {item.label}
                  </button>

                  <div id="services-mega-panel" className="site-header__mega-panel on-dark" hidden={!megaOpen}>
                    <div className="site-header__mega-grid">
                      {services.map((service) => {
                        const Icon = megaIcons[service.icon]
                        return (
                          <a
                            key={service.id}
                            href="#services"
                            className="site-header__mega-item"
                            onClick={() => setMegaOpen(false)}
                          >
                            <Icon className="site-header__mega-icon" strokeWidth={1.5} aria-hidden="true" />
                            <span className="site-header__mega-item-text">
                              <span className="site-header__mega-item-title">{service.title}</span>
                              <span className="site-header__mega-item-note">{service.menuNote}</span>
                            </span>
                          </a>
                        )
                      })}
                    </div>
                    <a
                      className="site-header__mega-foot"
                      href={`https://wa.me/${contact.whatsappNumber}`}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => setMegaOpen(false)}
                    >
                      <WhatsAppIcon className="btn__mark" />
                      Not sure what you need? Chat with us on WhatsApp
                    </a>
                  </div>
                </li>
              ) : (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ),
            )}
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
