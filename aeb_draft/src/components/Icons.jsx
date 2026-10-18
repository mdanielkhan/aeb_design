// Small functional glyphs only: direction, play, close. No decorative icons.

export function ArrowIcon({ className = 'btn__mark', direction = 'right' }) {
  const rotate = { right: 0, down: 90, left: 180, up: 270 }[direction]
  return (
    <svg
      className={className}
      viewBox="0 0 12 12"
      aria-hidden="true"
      focusable="false"
      style={rotate ? { rotate: `${rotate}deg` } : undefined}
    >
      <path d="M1 6h9M6.5 2.5 10 6l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

export function PlayIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M7 4.5v15L19.5 12Z" fill="currentColor" />
    </svg>
  )
}

export function CloseIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="m5 5 14 14M19 5 5 19" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

export function WhatsAppIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12 2.5a9.3 9.3 0 0 0-8 14l-1 4.1 4.2-1A9.3 9.3 0 1 0 12 2.5Zm0 1.8a7.5 7.5 0 0 1 6.5 11.3 7.5 7.5 0 0 1-11.9 1.8l-.3-.3-2.3.6.6-2.2-.2-.3A7.5 7.5 0 0 1 12 4.3Zm-2.9 3.6c-.2 0-.5 0-.6.3-.2.2-.7.7-.7 1.7s.7 2 .9 2.1c.1.2 1.7 2.6 4.2 3.6 2 .9 2.4.7 2.9.6.4 0 1.3-.5 1.5-1s.2-.9.1-1c-.1-.1-.2-.2-.5-.3l-1.9-.9c-.3-.1-.5-.1-.6.1l-.5.6c-.1.2-.3.2-.5.1-.3-.1-1.1-.4-2.1-1.3-.8-.7-1.3-1.5-1.4-1.8-.1-.2 0-.4.1-.5l.4-.5c.1-.2.1-.3.2-.5a.5.5 0 0 0 0-.5l-.8-1.9c-.2-.4-.4-.4-.5-.4h-.3Z"
      />
    </svg>
  )
}
