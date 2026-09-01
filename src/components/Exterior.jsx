import { useCallback, useEffect, useRef, useState } from 'react'
import GarageDoor from './GarageDoor'
import HobbiesSign from './HobbiesSign'
import { contact, identity } from '../data/content'
import { prefersReducedMotion } from '../lib/motion'

const DOOR_MS = 1020

export default function Exterior({ onEnter, openHobbies }) {
  const [opening, setOpening] = useState(false)
  const timer = useRef(null)
  // Ref, not state: keeping `opening` out of go()'s deps means the wheel
  // effect below never re-runs and never cancels the pending timer.
  const openingRef = useRef(false)

  // zone === null -> through the door onto the shop floor.
  // zone === 'projects' etc -> the shortcut straight to a section.
  const go = useCallback(
    (zone = null) => {
      if (openingRef.current) return
      openingRef.current = true
      if (prefersReducedMotion()) return onEnter(zone)
      setOpening(true)
      timer.current = setTimeout(() => onEnter(zone), DOOR_MS)
    },
    [onEnter]
  )

  useEffect(() => () => clearTimeout(timer.current), [])

  // Coming back out of the shop should put you at the front of the building,
  // not wherever you happened to be scrolled to inside.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Deliberately no scroll-to-enter. Scrolling means "show me more of this
  // page", and trackpad momentum keeps firing wheel events after you hit the
  // bottom, so any bottom-of-page trigger fires on a normal fast scroll and
  // reads as random. Entering is a click: the door, or the plan beside it.

  return (
    <main
      className="grain corrugated relative min-h-screen w-full overflow-hidden"
      style={{ color: 'var(--chalk)' }}
    >
      {/* Night sky wash above the roofline */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[38vh]"
        style={{
          background:
            'linear-gradient(180deg, rgba(10,14,22,.95) 0%, rgba(20,22,26,.35) 70%, transparent 100%)',
        }}
      />
      {/* Wall light over the signage */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[52vh]"
        style={{
          background:
            'radial-gradient(ellipse 42% 60% at 50% 8%, rgba(255,184,112,.16), transparent 70%)',
        }}
      />

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-5 py-8 sm:px-8">
        {/* ── HANGING SHOP SIGN ─────────────────────────────── */}
        <header className="flex flex-col items-center">
          <div className="flex w-[190px] justify-between px-3">
            {[0, 1].map((i) => (
              <span
                key={i}
                className="block w-[3px]"
                style={{
                  height: 26,
                  background:
                    'repeating-linear-gradient(180deg,#7b828a 0 4px,#3a4047 4px 8px)',
                }}
              />
            ))}
          </div>

          <div className="anim-sway">
            <div
              className="grain plate relative rounded-[2px] px-7 py-4 text-center sm:px-12 sm:py-5"
              style={{ maxWidth: 620 }}
            >
              <p
                className="tech-type text-[9px]"
                style={{ color: 'var(--orange)' }}
              >
                {identity.shopNo}
              </p>
              <h1
                className="sign-type mt-1 text-3xl leading-none sm:text-5xl"
                style={{ color: 'var(--chalk)' }}
              >
                {identity.first} {identity.last}
              </h1>
              <div
                className="mx-auto my-2 h-px w-16"
                style={{ background: 'rgba(232,230,225,.25)' }}
              />
              <p
                className="sign-type text-[10px] sm:text-xs"
                style={{ color: 'var(--chalk-dim)' }}
              >
                {identity.discipline}
              </p>
              <p
                className="mt-2 text-[12px] sm:text-sm"
                style={{ color: 'var(--chalk-dim)' }}
              >
                {identity.tagline}
              </p>
            </div>
          </div>
        </header>

        {/* ── FACADE ────────────────────────────────────────── */}
        <div className="mt-10 flex flex-1 flex-col items-center justify-center gap-12 lg:mt-4 lg:flex-row lg:gap-20">
          <div className="order-2 flex justify-center lg:order-1">
            <HobbiesSign highlight={openHobbies} />
          </div>

          <div className="order-1 w-full max-w-[420px] lg:order-2">
            <GarageDoor opening={opening} onOpen={() => go(null)} />
          </div>
        </div>

        {/* ── FRONT DESK STRIP ──────────────────────────────── */}
        <footer className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-white/10 pt-5">
          {contact.resumeHref && (
            <a
              className="cur-lg sign-type rounded-[2px] px-4 py-2 text-[11px] transition-transform duration-150 hover:-translate-y-[1px]"
              style={{
                background: 'var(--orange)',
                color: 'var(--steel)',
                boxShadow: '0 6px 18px rgba(255,107,26,.28)',
              }}
              href={contact.resumeHref}
              download={contact.resumeFilename}
            >
              Spec sheet ↓ résumé
            </a>
          )}
          <a
            className="sign-type text-[11px] transition-colors hover:text-[color:var(--orange)]"
            style={{ color: 'var(--chalk-dim)' }}
            href={contact.linkedin}
            target="_blank"
            rel="noreferrer noopener"
          >
            LinkedIn
          </a>
          <a
            className="sign-type text-[11px] transition-colors hover:text-[color:var(--orange)]"
            style={{ color: 'var(--chalk-dim)' }}
            href={`mailto:${contact.email}`}
          >
            {contact.email}
          </a>
          <button
            className="tech-type text-[10px] underline underline-offset-4 transition-colors hover:text-[color:var(--chalk)]"
            style={{ color: 'var(--chalk-faint)' }}
            onClick={() => onEnter(null)}
          >
            Skip intro
          </button>
        </footer>
      </div>
    </main>
  )
}
