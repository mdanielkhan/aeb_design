import { useId, useState } from 'react'
import { audiences, contact, services } from '../content'
import { ArrowIcon } from './Icons'
import './Contact.css'

// There is no form backend, so the form composes a ready-to-send message and
// hands it to the visitor's email app or WhatsApp. The visitor sees exactly
// what will be sent before choosing.

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function compose({ name, email, phone, organisation, audience, picked, message }) {
  const chosen = services.filter((s) => picked.includes(s.id)).map((s) => s.title)
  const subjectTopic = chosen.length ? chosen.join(', ') : 'General enquiry'
  const subject = `Enquiry from ${name || 'a visitor'}: ${subjectTopic}`
  const lines = [
    'Hello AEB Innovators,',
    '',
    message || '(Your message)',
    '',
    chosen.length ? `Interested in: ${chosen.join('; ')}` : null,
    audience ? `Reaching out as: ${audience}` : null,
    organisation ? `Organisation: ${organisation}` : null,
    '',
    name || '(Your name)',
    email || null,
    phone || null,
  ].filter((line) => line !== null)
  return { subject, body: lines.join('\n') }
}

export default function Contact({ picked, setPicked }) {
  const formId = useId()
  const [fields, setFields] = useState({ name: '', email: '', phone: '', organisation: '', message: '' })
  const [audience, setAudience] = useState('')
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('')

  const update = (key) => (event) => {
    setFields((current) => ({ ...current, [key]: event.target.value }))
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }))
  }

  const toggle = (id) =>
    setPicked((current) => (current.includes(id) ? current.filter((x) => x !== id) : [...current, id]))

  const draft = compose({ ...fields, audience, picked })

  const validate = () => {
    const next = {}
    if (!fields.name.trim()) next.name = 'Enter your name so we know who to reply to.'
    if (!fields.email.trim()) next.email = 'Enter your email address.'
    else if (!emailPattern.test(fields.email.trim())) next.email = 'Enter an email address like name@example.com.'
    if (!fields.message.trim()) next.message = 'Tell us briefly what you need.'
    setErrors(next)
    const first = Object.keys(next)[0]
    if (first) document.getElementById(`${formId}-${first}`)?.focus()
    return !first
  }

  const sendEmail = (event) => {
    event.preventDefault()
    if (!validate()) return
    const href = `mailto:${contact.email}?subject=${encodeURIComponent(draft.subject)}&body=${encodeURIComponent(draft.body)}`
    window.location.href = href
    setStatus(
      `Your email app should now open with this message addressed to ${contact.email}. If nothing opened, copy the preview and send it from any email account.`,
    )
  }

  const sendWhatsApp = () => {
    if (!validate()) return
    const text = `${draft.subject}\n\n${draft.body}`
    window.open(`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
    setStatus('WhatsApp opened in a new tab with your message filled in. Press send there to deliver it.')
  }

  const field = (key, label, props = {}) => (
    <div className={`field${errors[key] ? ' field--error' : ''}`}>
      <label htmlFor={`${formId}-${key}`}>{label}</label>
      {props.multiline ? (
        <textarea
          id={`${formId}-${key}`}
          rows={5}
          value={fields[key]}
          onChange={update(key)}
          aria-invalid={Boolean(errors[key])}
          aria-describedby={errors[key] ? `${formId}-${key}-error` : undefined}
          required={props.required}
        />
      ) : (
        <input
          id={`${formId}-${key}`}
          type={props.type ?? 'text'}
          value={fields[key]}
          onChange={update(key)}
          autoComplete={props.autoComplete}
          aria-invalid={Boolean(errors[key])}
          aria-describedby={errors[key] ? `${formId}-${key}-error` : undefined}
          required={props.required}
        />
      )}
      {errors[key] && (
        <p className="field__error" id={`${formId}-${key}-error`}>
          {errors[key]}
        </p>
      )}
    </div>
  )

  return (
    <section className="contact wrap" id="contact" aria-labelledby="contact-title">
      <div className="axis-grid contact__grid">
        <div className="contact__side">
          <h2 id="contact-title" className="section-title" data-reveal>
            Let’s talk.
          </h2>
          <p className="contact__statement lead" data-reveal style={{ '--d': 1 }}>
            Tell us what you need and who it’s for: a training cohort, a store, a system or a security
            setup.
          </p>

          <dl className="contact__details" data-reveal style={{ '--d': 2 }}>
            <div>
              <dt>Call</dt>
              <dd>
                <a className="text-link" href={contact.phoneHref}>
                  {contact.phoneDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>
                <a className="text-link" href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
              </dd>
            </div>
            <div>
              <dt>WhatsApp</dt>
              <dd>
                <a className="text-link" href={`https://wa.me/${contact.whatsappNumber}`} target="_blank" rel="noreferrer">
                  Message us on WhatsApp
                </a>
              </dd>
            </div>
            <div>
              <dt>Visit</dt>
              <dd>{contact.address}</dd>
            </div>
            <div>
              <dt>Office hours</dt>
              <dd>{contact.hours}</dd>
            </div>
          </dl>
        </div>

        <form className="composer on-axis" onSubmit={sendEmail} noValidate data-reveal style={{ '--d': 1 }}>
          <fieldset className="chips">
            <legend>I’m reaching out as</legend>
            <div className="chips__list">
              {audiences.map((item) => (
                <label key={item} className="chip">
                  <input
                    type="radio"
                    name="audience"
                    value={item}
                    checked={audience === item}
                    onChange={() => setAudience(item)}
                    onClick={() => audience === item && setAudience('')}
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="chips">
            <legend>I’m interested in</legend>
            <div className="chips__list">
              {services.map((service) => (
                <label key={service.id} className="chip">
                  <input
                    type="checkbox"
                    checked={picked.includes(service.id)}
                    onChange={() => toggle(service.id)}
                  />
                  <span>{service.title}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="composer__fields">
            {field('name', 'Your name', { autoComplete: 'name', required: true })}
            {field('email', 'Email address', { type: 'email', autoComplete: 'email', required: true })}
            {field('phone', 'Phone (optional)', { type: 'tel', autoComplete: 'tel' })}
            {field('organisation', 'Organisation (optional)', { autoComplete: 'organization' })}
          </div>
          {field('message', 'What do you need?', { multiline: true, required: true })}

          <div className="composer__preview" aria-live="polite">
            <p className="composer__preview-label">Your message will read</p>
            <p className="composer__subject">{draft.subject}</p>
          </div>

          <div className="composer__actions">
            <button type="submit" className="btn btn--primary">
              Send by email
              <ArrowIcon />
            </button>
            <button type="button" className="btn btn--dark" onClick={sendWhatsApp}>
              Send on WhatsApp
            </button>
          </div>

          <p className="composer__status small" role="status">
            {status}
          </p>
        </form>
      </div>
    </section>
  )
}
