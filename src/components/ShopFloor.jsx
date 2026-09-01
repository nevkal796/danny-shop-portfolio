import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { boxFaces, floorPad, iso, pts, wallLeft, wallRight } from '../lib/iso'
import { shopZones } from '../data/zones'
import { contact, identity } from '../data/content'

const FACE = { top: '#40474f', right: '#2c3138', left: '#23272d' }
const HOT = { top: '#8d5429', right: '#63391a', left: '#4a2a12' }

function Box({ x, y, z = 0, w, d, h, hot, tint }) {
  const f = boxFaces(x, y, z, w, d, h)
  const c = hot ? HOT : tint || FACE
  return (
    <g>
      <polygon points={f.left} fill={c.left} />
      <polygon points={f.right} fill={c.right} />
      <polygon points={f.top} fill={c.top} />
    </g>
  )
}

// ── Per-zone furniture ──────────────────────────────────────
function ZoneObjects({ id, hot }) {
  const line = hot ? 'var(--orange)' : 'rgba(127,178,217,.45)'

  if (id === 'skills')
    return (
      <>
        {/* Pegboard hung on the back-right wall */}
        <polygon
          points={wallRight(2.4, 6.6, 1.15, 2.75)}
          fill={hot ? 'rgba(255,107,26,.30)' : '#1d2126'}
          stroke={line}
          strokeWidth="1.2"
        />
        {Array.from({ length: 7 }).map((_, i) =>
          Array.from({ length: 4 }).map((__, j) => {
            const [px, py] = iso(2.7 + i * 0.55, 0, 1.35 + j * 0.36)
            return (
              <circle
                key={`${i}-${j}`}
                cx={px}
                cy={py}
                r="2"
                fill={hot ? 'rgba(255,107,26,.55)' : 'rgba(232,230,225,.16)'}
              />
            )
          })
        )}
        {/* Workbench */}
        <Box x={2.6} y={0.25} w={4.2} d={1.1} h={0.75} hot={hot} />
      </>
    )

  if (id === 'experience')
    return (
      <>
        {[0, 1].map((i) => (
          <polygon
            key={i}
            points={wallLeft(1.5 + i * 1.4, 2.6 + i * 1.4, 1.35, 2.65)}
            fill={hot ? 'rgba(255,107,26,.28)' : '#d9d2c4'}
            stroke={line}
            strokeWidth="1.2"
          />
        ))}
      </>
    )

  if (id === 'education')
    return (
      <>
        <polygon
          points={wallLeft(5.2, 7.0, 1.5, 2.75)}
          fill={hot ? 'rgba(255,107,26,.28)' : '#4a3626'}
          stroke={line}
          strokeWidth="1.4"
        />
        <polygon
          points={wallLeft(5.45, 6.75, 1.65, 2.6)}
          fill={hot ? 'rgba(255,107,26,.4)' : '#efeade'}
        />
      </>
    )

  if (id === 'about')
    return (
      <>
        {/* Desk */}
        <Box x={2.0} y={5.9} w={2.0} d={1.1} h={0.78} hot={hot} />
        {/* Clipboard on top */}
        <polygon
          points={pts([
            [2.4, 6.15, 0.78],
            [3.2, 6.15, 0.78],
            [3.2, 6.75, 0.78],
            [2.4, 6.75, 0.78],
          ])}
          fill={hot ? 'var(--orange)' : '#efeade'}
        />
      </>
    )

  if (id === 'projects')
    return (
      <>
        {/* Drafting table */}
        <Box x={3.9} y={3.4} w={2.9} d={2.3} h={0.82} hot={hot} />
        {/* Blueprint sheets laid on it */}
        {[0, 1, 2].map((i) => (
          <polygon
            key={i}
            points={pts([
              [4.2 + i * 0.22, 3.7 + i * 0.16, 0.82],
              [5.6 + i * 0.22, 3.7 + i * 0.16, 0.82],
              [5.6 + i * 0.22, 4.9 + i * 0.16, 0.82],
              [4.2 + i * 0.22, 4.9 + i * 0.16, 0.82],
            ])}
            fill={hot ? 'rgba(255,107,26,.55)' : '#16324f'}
            stroke={hot ? 'var(--orange)' : 'rgba(127,178,217,.5)'}
            strokeWidth="1"
          />
        ))}
        {/* The aircraft, on a stand behind the table */}
        <Box x={5.9} y={4.3} w={0.35} d={0.35} h={1.05} hot={hot} />
        {/* Swept, tapered wing */}
        <polygon
          points={pts([
            [5.15, 4.54, 1.05],
            [5.94, 4.36, 1.05],
            [6.21, 4.36, 1.05],
            [6.9, 4.54, 1.05],
            [6.9, 4.66, 1.05],
            [6.21, 4.76, 1.05],
            [5.94, 4.76, 1.05],
            [5.15, 4.66, 1.05],
          ])}
          fill={hot ? 'var(--orange)' : '#aab2ba'}
          stroke="rgba(0,0,0,.45)"
          strokeWidth=".8"
        />
        {/* Tailplane */}
        <polygon
          points={pts([
            [5.68, 3.9, 1.05],
            [6.47, 3.9, 1.05],
            [6.47, 4.02, 1.05],
            [5.68, 4.02, 1.05],
          ])}
          fill={hot ? 'var(--orange)' : '#9aa2ab'}
          stroke="rgba(0,0,0,.45)"
          strokeWidth=".8"
        />
        {/* Fuselage, nose forward */}
        <polygon
          points={pts([
            [6.075, 5.45, 1.05],
            [6.21, 5.12, 1.05],
            [6.21, 3.82, 1.05],
            [5.94, 3.82, 1.05],
            [5.94, 5.12, 1.05],
          ])}
          fill={hot ? '#ffd0ad' : '#ccd2d8'}
          stroke="rgba(0,0,0,.45)"
          strokeWidth=".8"
        />
        {/* Tail fin */}
        <polygon
          points={pts([
            [6.07, 3.8, 1.05],
            [6.07, 4.28, 1.05],
            [6.07, 4.28, 1.5],
            [6.07, 3.8, 1.5],
          ])}
          fill={hot ? 'var(--orange)' : '#9aa2ab'}
          stroke="rgba(0,0,0,.45)"
          strokeWidth=".8"
        />
      </>
    )

  if (id === 'contact')
    return (
      <>
        <Box x={6.9} y={6.8} w={1.9} d={1.0} h={0.95} hot={hot} />
        <polygon
          points={pts([
            [7.2, 7.0, 0.95],
            [7.9, 7.0, 0.95],
            [7.9, 7.5, 0.95],
            [7.2, 7.5, 0.95],
          ])}
          fill={hot ? 'var(--orange)' : '#efeade'}
        />
      </>
    )

  return null
}

// Painter's order: farthest (smallest x+y) drawn first.
const DEPTH = ['experience', 'skills', 'education', 'about', 'projects', 'contact']

// Touch devices get no hover, so a first tap identifies the area and a
// second tap enters it. Pointing devices go straight in on click.
const CAN_HOVER =
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover)').matches

export default function ShopFloor() {
  const navigate = useNavigate()
  const [hover, setHover] = useState(null)

  // Client-side navigation keeps the previous page's scroll position, so
  // arriving from the exterior would drop you halfway down the room.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const activate = (id) => {
    if (CAN_HOVER || hover === id) navigate('/' + id)
    else setHover(id)
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
          <a
            href={contact.resumeHref}
            download={contact.resumeFilename}
            className="cur-lg sign-type rounded-[2px] px-3 py-[6px] text-[10px]"
            style={{ background: 'var(--orange)', color: 'var(--steel)' }}
          >
            Résumé ↓
          </a>
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
        {/* viewBox is cropped to the room's real extent (y 91–610 plus a
            margin) instead of the full 680, so the scene does not carry a
            band of empty space at the top and bottom on every screen. */}
        <svg viewBox="0 58 1000 580" className="w-full" role="group" aria-label="Shop floor map">
          <defs>
            <radialGradient id="coolPool" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#8fb8d8" stopOpacity=".22" />
              <stop offset="100%" stopColor="#8fb8d8" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="warmPool" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#ffb870" stopOpacity=".20" />
              <stop offset="100%" stopColor="#ffb870" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Walls — cool on the tool side, warm on the office side */}
          <polygon points={wallLeft(0, 9, 0, 3.1)} fill="#2b2521" />
          <polygon points={wallRight(0, 9, 0, 3.1)} fill="#272c33" />

          {/* Floor */}
          <polygon points={floorPad(0, 0, 9, 9)} fill="#191c20" />

          {/* Floor grid */}
          {Array.from({ length: 10 }).map((_, i) => (
            <g key={i} stroke="rgba(232,230,225,.05)" strokeWidth="1">
              <line
                x1={iso(i, 0)[0]} y1={iso(i, 0)[1]}
                x2={iso(i, 9)[0]} y2={iso(i, 9)[1]}
              />
              <line
                x1={iso(0, i)[0]} y1={iso(0, i)[1]}
                x2={iso(9, i)[0]} y2={iso(9, i)[1]}
              />
            </g>
          ))}

          {/* Light pools */}
          <ellipse cx={iso(4.5, 1)[0]} cy={iso(4.5, 1)[1]} rx="250" ry="120" fill="url(#coolPool)" />
          <ellipse cx={iso(1.5, 5.5)[0]} cy={iso(1.5, 5.5)[1]} rx="230" ry="115" fill="url(#warmPool)" />

          {/* Daylight spilling in from the open door behind the viewer */}
          <ellipse
            cx={iso(8.4, 8.4)[0]} cy={iso(8.4, 8.4)[1]}
            rx="220" ry="95" fill="url(#warmPool)" opacity=".8"
          />

          {/* Zones, far to near */}
          {ordered.map((z) => {
            const hot = hover === z.id
            const [lx, ly] = iso(z.labelAt[0], z.labelAt[1], z.labelZ)
            return (
              <g
                key={z.id}
                className="cur-lg"
                role="link"
                tabIndex={0}
                aria-label={`${z.name} — ${z.desc}`}
                onMouseEnter={() => setHover(z.id)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(z.id)}
                onBlur={() => setHover(null)}
                onClick={() => activate(z.id)}
                onKeyDown={(e) =>
                  (e.key === 'Enter' || e.key === ' ') &&
                  (e.preventDefault(), navigate('/' + z.id))
                }
              >
                {/* Bay marking — always visible, so the map reads as a map */}
                <polygon
                  points={floorPad(...z.pad)}
                  fill={hot ? 'rgba(255,107,26,.20)' : 'rgba(255,107,26,.045)'}
                  stroke={hot ? 'var(--orange)' : 'rgba(255,107,26,.38)'}
                  strokeWidth={hot ? 2 : 1.2}
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
              className="tech-type mt-2 text-[8px]"
              style={{ color: 'var(--chalk-faint)' }}
            >
              {CAN_HOVER ? 'CLICK TO ENTER' : 'TAP AGAIN TO ENTER'}
            </p>
          </div>
        </div>
       </div>
      </div>

      <p
        className="tech-type mx-auto max-w-6xl px-5 pb-10 pt-2 text-center text-[10px] sm:px-8"
        style={{ color: 'var(--chalk-faint)' }}
      >
        {CAN_HOVER
          ? 'Hover an area, then click to go in'
          : 'Tap an area to see what it is'}
      </p>
    </main>
  )
}
