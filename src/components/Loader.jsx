import { useEffect, useRef, useState } from 'react'
import { identity } from '../data/content'

const ROUTE = 'M 44 128 C 180 44, 372 26, 548 58'
const DRAW_MS = 950
const HOLD_MS = 1350

export default function Loader({ onDone }) {
  const [pct, setPct] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const raf = useRef(0)

  useEffect(() => {
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min(1, (now - start) / DRAW_MS)
      setPct(Math.round(t * 100))
      if (t < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)

    const fade = setTimeout(() => setLeaving(true), HOLD_MS)
    const done = setTimeout(onDone, HOLD_MS + 420)
    return () => {
      cancelAnimationFrame(raf.current)
      clearTimeout(fade)
      clearTimeout(done)
    }
  }, [onDone])

  return (
    <div
      className={`grain fixed inset-0 z-50 flex flex-col items-center justify-center bg-[--steel] px-6 transition-opacity duration-[420ms] ${
        leaving ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ background: 'var(--steel)' }}
    >
      <p className="sign-type text-[--chalk-dim] text-xs sm:text-sm md:text-base">
        Arriving at destination
      </p>

      <svg
        viewBox="0 0 600 170"
        className="mt-6 w-full max-w-[600px]"
        aria-hidden="true"
      >
        <defs>
          <path id="route" d={ROUTE} />
        </defs>

        {/* Faint full route, so the arc reads before it is flown. */}
        <path
          d={ROUTE}
          fill="none"
          stroke="var(--cyan)"
          strokeOpacity="0.16"
          strokeWidth="1"
          strokeDasharray="4 5"
        />

        {/* Route, drawing itself in. Linear — it is a machine. */}
        <path
          d={ROUTE}
          fill="none"
          stroke="var(--cyan)"
          strokeWidth="1.6"
          strokeOpacity="0.85"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset="1"
          style={{ animation: `draw ${DRAW_MS}ms linear forwards` }}
        />

        {/* Aircraft travelling the route. */}
        <polygon points="0,-5 14,0 0,5 3.5,0" fill="var(--chalk)">
          <animateMotion
            dur={`${DRAW_MS}ms`}
            fill="freeze"
            rotate="auto"
            calcMode="linear"
          >
            <mpath href="#route" />
          </animateMotion>
        </polygon>

        {/* Origin mark */}
        <circle cx="44" cy="128" r="3" fill="none" stroke="var(--cyan)" strokeWidth="1.2" />

        {/* Destination pin. */}
        <g
          style={{
            opacity: 0,
            animation: `pin-drop 320ms cubic-bezier(.2,.8,.3,1) ${DRAW_MS}ms forwards`,
          }}
        >
          <path
            d="M548 40 a9 9 0 0 1 9 9 c0 7 -9 17 -9 17 s-9 -10 -9 -17 a9 9 0 0 1 9 -9 z"
            fill="var(--orange)"
          />
          <circle cx="548" cy="49" r="3.4" fill="var(--steel)" />
        </g>
      </svg>

      <div className="mt-4 flex w-full max-w-[600px] items-center gap-4">
        <div className="h-px flex-1 bg-white/10">
          <div
            className="h-px bg-[--orange]"
            style={{ width: `${pct}%`, background: 'var(--orange)' }}
          />
        </div>
        <span
          className="tech-type text-[11px] tabular-nums"
          style={{ color: 'var(--chalk-faint)' }}
        >
          {String(pct).padStart(3, '0')}%
        </span>
      </div>

      <p
        className="sign-type mt-8 text-lg sm:text-2xl"
        style={{
          color: 'var(--chalk)',
          opacity: 0,
          animation: `pin-drop 400ms ease-out ${DRAW_MS + 120}ms forwards`,
        }}
      >
        {identity.first} {identity.last} — the shop
      </p>

      <style>{`
        @keyframes pin-drop {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
