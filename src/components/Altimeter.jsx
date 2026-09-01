import { useEffect, useState } from 'react'

// Scroll depth read as altitude. Small, fixed, deliberately quiet.
export default function Altimeter() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    let raf = 0
    const read = () => {
      raf = 0
      const h = document.documentElement.scrollHeight - window.innerHeight
      setPct(h > 0 ? Math.min(100, Math.max(0, (window.scrollY / h) * 100)) : 0)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read)
    }
    read()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      className="pointer-events-none fixed bottom-5 right-5 z-30 hidden select-none sm:block"
      aria-hidden="true"
    >
      <svg viewBox="0 0 80 80" width="72" height="72">
        <circle
          cx="40" cy="40" r="37"
          fill="rgba(12,14,17,.82)"
          stroke="rgba(255,255,255,.14)" strokeWidth="1.5"
        />
        {Array.from({ length: 20 }).map((_, i) => {
          const major = i % 2 === 0
          const a = (i / 20) * 360 - 90
          const r1 = major ? 27 : 30
          const rad = (a * Math.PI) / 180
          return (
            <line
              key={i}
              x1={40 + Math.cos(rad) * r1}
              y1={40 + Math.sin(rad) * r1}
              x2={40 + Math.cos(rad) * 33}
              y2={40 + Math.sin(rad) * 33}
              stroke="rgba(232,230,225,.45)"
              strokeWidth={major ? 1.4 : 0.7}
            />
          )
        })}

        <text
          x="40" y="30" textAnchor="middle"
          fontFamily="'IBM Plex Mono', monospace" fontSize="6.5"
          letterSpacing="1" fill="var(--chalk-faint)"
        >
          ALT
        </text>

        {/* Needle */}
        <g
          className="needle"
          style={{ transform: `rotate(${(pct / 100) * 340}deg)`, transformOrigin: '40px 40px' }}
        >
          <path d="M40 13 L42.6 40 L37.4 40 Z" fill="var(--orange)" />
          <path d="M40 52 L41.6 40 L38.4 40 Z" fill="rgba(232,230,225,.35)" />
        </g>
        <circle cx="40" cy="40" r="3.4" fill="#2a2e33" stroke="rgba(255,255,255,.25)" />

        <text
          x="40" y="58" textAnchor="middle"
          fontFamily="'IBM Plex Mono', monospace" fontSize="8"
          fill="var(--chalk-dim)"
        >
          {String(Math.round(pct)).padStart(3, '0')}
        </text>
      </svg>
    </div>
  )
}
