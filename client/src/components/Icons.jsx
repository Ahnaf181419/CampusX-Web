export function Icon({ name, className }) {
  if (name === "bus") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 17V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v11" />
        <path d="M5 11h14" />
        <path d="M3 17h18" />
        <circle cx="8" cy="19.5" r="1.4" />
        <circle cx="16" cy="19.5" r="1.4" />
        <path d="M7.5 14h.01M16.5 14h.01" />
      </svg>
    )
  }

  if (name === "bell") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 9.5a6 6 0 0 0-12 0c0 5-2 6.5-2 6.5h16s-2-1.5-2-6.5" />
        <path d="M10.3 19.5a2 2 0 0 0 3.4 0" />
      </svg>
    )
  }

  if (name === "calendar") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="4" y="5.5" width="16" height="15" rx="2" />
        <path d="M8 3.5v4M16 3.5v4M4 10.5h16" />
        <path d="M8.5 14.5h.01M12 14.5h.01M15.5 14.5h.01M8.5 17.5h.01M12 17.5h.01" />
      </svg>
    )
  }

  if (name === "door") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 21V4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21" />
        <path d="M4 21h16" />
        <circle cx="14.8" cy="12" r="1" />
      </svg>
    )
  }

  if (name === "question") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M9.6 9.3A2.5 2.5 0 0 1 14.5 10c0 1.8-2.5 2.2-2.5 4" />
        <path d="M12 17.2h.01" />
      </svg>
    )
  }

  if (name === "package") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 8l8-4.5L20 8v8l-8 4.5L4 16V8Z" />
        <path d="M4 8l8 4.5L20 8M12 12.5V20.5" />
      </svg>
    )
  }

  if (name === "tag") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 4h7l9 9-7 7-9-9V4Z" />
        <circle cx="8.5" cy="8.5" r="1.3" />
      </svg>
    )
  }

  if (name === "calculator") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M8.5 7h7" />
        <path d="M8.5 12h.01M12 12h.01M15.5 12h.01M8.5 15.5h.01M12 15.5h.01M15.5 15.5h.01M8.5 19h.01M12 19h.01M15.5 19h.01" />
      </svg>
    )
  }

  if (name === "chevronDown") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m6 9 6 6 6-6" />
      </svg>
    )
  }

  if (name === "arrowRight") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </svg>
    )
  }

  if (name === "arrowLeft") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M19 12H5" />
        <path d="m11 18-6-6 6-6" />
      </svg>
    )
  }

  return null
}
