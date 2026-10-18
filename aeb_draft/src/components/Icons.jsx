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
