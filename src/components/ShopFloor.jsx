import { Fragment, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { floorPad, iso } from '../lib/iso'
import {
  SceneryBack,
  SceneryFront,
  SceneryMid,
  SceneryWalls,
} from './shop/Scenery'
import ZoneObjects from './shop/ZoneObjects'
import { SHOP } from './shop/palette'
import { shopZones } from '../data/zones'
import { contact, identity } from '../data/content'

// Painter's order: farthest (smallest x+y) drawn first.
const DEPTH = ['experience', 'skills', 'education', 'about', 'projects', 'contact']

export default function ShopFloor() {
  const navigate = useNavigate()
  const [hover, setHover] = useState(null)

  // Which zone is "armed" — tapped once and awaiting a confirming tap.
  // Touch only; a mouse never arms anything.
  const [armed, setArmed] = useState(null)
  const pointerType = useRef('mouse')

  // Client-side navigation keeps the previous page's scroll position, so
  // arriving from the exterior would drop you halfway down the room.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Two-tap on touch: the first tap raises the card, the second goes in.
  //
  // This deliberately does NOT test the hover state. Mobile browsers fire a
  // synthetic mouseover before click, so `hover` is already set by the time
  // click runs — keying off it would send the very first tap straight in.
  // `armed` is only ever set from a real touch pointer, so it can't be
  // spoofed by that synthetic mouse event.
  const activate = (id) => {
    const touch =
      pointerType.current === 'touch' || pointerType.current === 'pen'
    if (!touch || armed === id) {
      navigate('/' + id)
      return
    }
    setArmed(id)
    setHover(id)
  }

  // Tapping bare floor backs out of a pending selection.
  const clearSelection = () => {
    if (pointerType.current === 'touch' || pointerType.current === 'pen') {
      setArmed(null)
      setHover(null)
    }
  }

  const ordered = DEPTH.map((id) => shopZones.find((z) => z.id === id))
  const active = shopZones.find((z) => z.id === hover)

  // Hold the last hovered zone so the card fades out where it appeared
  // rather than snapping to a default corner on the way out.
  const lastRef = useRef(null)
  if (active) lastRef.current = active
  const shown = active ?? lastRef.current

  // The room is a diamond, so the four corners of its bounding box are
  // empty. Drop the card into whichever corner is nearest the zone: that
  // keeps it beside what it describes and clear of the furniture.
  const corner = (() => {
    if (!shown) return { left: true, top: true }
    const [zx, zy] = iso(shown.labelAt[0], shown.labelAt[1], 0)
    return { left: zx < 500, top: zy < 350 }
  })()

  return (
    <main className="concrete-floor grain relative min-h-screen">
      {/* Chrome */}
      <div className="mx-auto max-w-6xl px-5 pt-4 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => navigate('/')}
            className="cur-md sign-type text-[11px] transition-colors hover:text-[color:var(--orange)]"
            style={{ color: 'var(--chalk-dim)' }}
          >
            ← Back outside
          </button>
          {contact.resumeHref && (
            <a
              href={contact.resumeHref}
              download={contact.resumeFilename}
              className="cur-lg sign-type rounded-[2px] px-3 py-[6px] text-[10px]"
              style={{ background: 'var(--orange)', color: 'var(--steel)' }}
            >
              Résumé ↓
            </a>
          )}
        </div>

        <div className="mt-4 text-center">
          <h1 className="sign-type text-3xl sm:text-4xl" style={{ color: 'var(--chalk)' }}>
            The Shop Floor
          </h1>
          <p className="tech-type mt-2 text-[10px]" style={{ color: 'var(--chalk-faint)' }}>
            {identity.first}&rsquo;s workshop · pick an area
          </p>
        </div>
      </div>

      {/* ── THE SCENE ────────────────────────────────────── */}
      <div className="mx-auto max-w-5xl px-3 sm:px-8">
       <div className="relative">
        {/* Cropped to the room's real extent, with headroom at the top for
            the roof trusses and for the info card's upper corner slots. */}
        <svg viewBox="0 -30 1000 668" className="w-full" role="group" aria-label="Shop floor map">
          {/* Scenery dims while a bay is selected, so a busy room stays
              readable. Both children are memoized and take no props, so
              only this wrapper re-renders. */}
          <g
            style={{
              opacity: hover ? 0.42 : 1,
              transition: 'opacity 180ms ease',
            }}
          >
            <SceneryWalls />

            {/* Floor. Tapping bare floor cancels a pending selection. */}
            <polygon
              points={floorPad(0, 0, 9, 9)}
              fill={SHOP.floor}
              onPointerDown={(e) => (pointerType.current = e.pointerType)}
              onClick={clearSelection}
            />

            <SceneryBack />
          </g>

          {/* Zones, far to near, with the nearer scenery layers spliced in
              at their real depth. Props are not all behind the bays: the
              tool chest sits in front of the bookshelf, the fan and racking
              in front of the drafting table. */}
          {ordered.map((z) => {
            const hot = hover === z.id
            const [lx, ly] = iso(z.labelAt[0], z.labelAt[1], z.labelZ)
            return (
              <Fragment key={z.id}>
                {z.id === 'about' && (
                  <g style={{ opacity: hover ? 0.42 : 1, transition: 'opacity 180ms ease' }}>
                    <SceneryMid />
                  </g>
                )}
                {z.id === 'contact' && (
                  <g style={{ opacity: hover ? 0.42 : 1, transition: 'opacity 180ms ease' }}>
                    <SceneryFront />
                  </g>
                )}
              <g
                className="cur-lg"
                role="link"
                tabIndex={0}
                aria-label={`${z.name} — ${z.desc}`}
                onPointerDown={(e) => (pointerType.current = e.pointerType)}
                onMouseEnter={() => setHover(z.id)}
                // On touch the card must stay up until the confirming tap,
                // so only a real mouse is allowed to dismiss it.
                onMouseLeave={() => {
                  if (pointerType.current === 'mouse') setHover(null)
                }}
                onFocus={() => setHover(z.id)}
                onBlur={() => setHover(null)}
                onClick={() => activate(z.id)}
                onKeyDown={(e) =>
                  (e.key === 'Enter' || e.key === ' ') &&
                  (e.preventDefault(), navigate('/' + z.id))
                }
                style={{
                  opacity: hover && !hot ? 0.42 : 1,
                  transition: 'opacity 180ms ease',
                }}
              >
                {/* Bay marking. Yellow is permanent floor paint; orange is
                    reserved for the bay you are actually selecting. */}
                <polygon
                  points={floorPad(...z.pad)}
                  fill={hot ? 'rgba(255,107,26,.24)' : SHOP.bayFill}
                  stroke={hot ? 'var(--orange)' : SHOP.bayLine}
                  strokeWidth={hot ? 2.2 : 1.3}
                  strokeDasharray="7 5"
                  style={{ transition: 'fill 160ms ease, stroke 160ms ease' }}
                />
                <ZoneObjects id={z.id} hot={hot} />

                {/* Label pin, floating clear of the furniture.
                    Hidden on mobile, where it would scale below legibility;
                    there a tap raises the popup instead. */}
                <g className="hidden sm:inline">
                  <line
                    x1={lx} y1={ly + 10} x2={lx} y2={ly + 26}
                    stroke={hot ? 'var(--orange)' : 'rgba(232,230,225,.30)'}
                    strokeWidth="1"
                  />
                  <circle
                    cx={lx} cy={ly + 27} r="2.2"
                    fill={hot ? 'var(--orange)' : 'rgba(232,230,225,.45)'}
                  />
                  <rect
                    x={lx - 54} y={ly - 10} width="108" height="20" rx="2"
                    fill={hot ? 'var(--orange)' : 'rgba(10,12,15,.88)'}
                    stroke={hot ? 'var(--orange)' : 'rgba(232,230,225,.22)'}
                  />
                  <text
                    x={lx} y={ly + 4} textAnchor="middle"
                    fontFamily="'IBM Plex Mono', monospace" fontSize="9.5" letterSpacing="1.4"
                    fill={hot ? '#14161a' : 'var(--chalk)'}
                  >
                    {z.plate}
                  </text>
                </g>
              </g>
              </Fragment>
            )
          })}
        </svg>

        {/* The hovered area, called out in the corner nearest it and clear
            of the room, so the furniture it describes stays visible.
            Pointer events off: it can never steal the hover it describes. */}
        <div
          className="pointer-events-none absolute w-[168px] transition-opacity duration-150 sm:w-[196px]"
          aria-live="polite"
          style={{
            opacity: active ? 1 : 0,
            left: corner.left ? '0%' : undefined,
            right: corner.left ? undefined : '0%',
            top: corner.top ? '1%' : undefined,
            bottom: corner.top ? undefined : '1%',
          }}
        >
          <div
            className="rounded-[2px] border px-3 py-[10px] text-center"
            style={{
              background: '#06080B',
              borderColor: 'rgba(255,107,26,.85)',
              boxShadow:
                '0 16px 40px rgba(0,0,0,.92), inset 0 1px 0 rgba(255,255,255,.05)',
            }}
          >
            <p className="tech-type text-[8.5px]" style={{ color: 'var(--orange)' }}>
              {shown?.plate ?? ''}
            </p>
            <p
              className="sign-type mt-[3px] text-[15px] leading-none"
              style={{ color: 'var(--chalk)' }}
            >
              {shown?.name ?? ''}
            </p>
            <p
              className="mt-[6px] text-[10.5px] leading-snug"
              style={{ color: 'var(--chalk-dim)' }}
            >
              {shown?.desc ?? ''}
            </p>
            <p
              className="tech-type hover-only mt-2 text-[8px]"
              style={{ color: 'var(--chalk-faint)' }}
            >
              CLICK TO ENTER
            </p>
            <p
              className="tech-type touch-only mt-2 text-[8px]"
              style={{ color: 'var(--orange)' }}
            >
              TAP AGAIN TO ENTER
            </p>
          </div>
        </div>
       </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-10 pt-2 text-center sm:px-8">
        <p
          className="tech-type hover-only text-[10px]"
          style={{ color: 'var(--chalk-faint)' }}
        >
          Hover an area, then click to go in
        </p>

        {/* Mobile only: the two-tap rule, spelled out. */}
        <p
          className="tech-type touch-only mx-auto max-w-[300px] text-[10px] leading-relaxed"
          style={{ color: 'var(--chalk-faint)' }}
        >
          <span style={{ color: 'var(--orange)' }}>Tap once</span> to see what
          an area is —{' '}
          <span style={{ color: 'var(--orange)' }}>tap again</span> to go in
        </p>
      </div>
    </main>
  )
}
