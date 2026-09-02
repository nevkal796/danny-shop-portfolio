import { boxFaces, iso, pts, wallLeft, wallRight } from '../../lib/iso'
import { CORK, HOT, MACHINE, MACHINE_DARK, PANEL, WOOD } from './palette'

// Each bay's furniture. Every one has to be recognisable at a glance —
// a flat pale rectangle on a wall reads as a window, not as a poster.

function Box({ x, y, z = 0, w, d, h, c }) {
  const f = boxFaces(x, y, z, w, d, h)
  return (
    <g>
      <polygon points={f.left} fill={c[2]} />
      <polygon points={f.right} fill={c[1]} />
      <polygon points={f.top} fill={c[0]} />
    </g>
  )
}

const pick = (hot, normal) => (hot ? HOT : normal)

export default function ZoneObjects({ id, hot }) {
  // ── SKILLS: pegboard wall + a lathe with a lit control panel ──
  if (id === 'skills')
    return (
      <>
        <polygon
          points={wallRight(2.4, 6.6, 1.15, 2.75)}
          fill={hot ? 'rgba(240,138,60,.45)' : '#33404b'}
          stroke={hot ? '#f08a3c' : '#5d6f7d'}
          strokeWidth="1.2"
        />
        {/* Hanging tools, so the board reads as a tool wall */}
        {Array.from({ length: 7 }).map((_, i) => {
          const bx = 2.75 + i * 0.55
          const [ax, ay] = iso(bx, 0, 2.5)
          const [cx, cy] = iso(bx, 0, 1.95)
          return (
            <g key={i} stroke={hot ? '#ffd9b8' : '#aab6c0'} strokeWidth="1.6" strokeLinecap="round">
              <line x1={ax} y1={ay} x2={cx} y2={cy} />
              {i % 2 === 0 ? (
                <circle cx={cx} cy={cy} r="3.2" fill="none" />
              ) : (
                <line x1={cx - 4} y1={cy} x2={cx + 4} y2={cy} />
              )}
            </g>
          )
        })}
        {/* Lathe */}
        <Box x={2.6} y={0.25} w={4.2} d={1.1} h={0.75} c={pick(hot, MACHINE)} />
        <Box x={2.75} y={0.35} z={0.75} w={1.5} d={0.85} h={0.5} c={pick(hot, MACHINE_DARK)} />
        {/* Control panel with indicator lights */}
        <polygon
          points={pts([[3.05, 0.3, 0.85], [3.95, 0.3, 0.85], [3.95, 0.3, 1.2], [3.05, 0.3, 1.2]])}
          fill={PANEL[1]}
        />
        {['#e0503a', '#4fbf6a', '#e8c33a'].map((c, i) => {
          const [px, py] = iso(3.22 + i * 0.26, 0.29, 1.08)
          return <circle key={c} cx={px} cy={py} r="2.4" fill={c} />
        })}
        {/* Handwheel + name plate */}
        {(() => {
          const [hx, hy] = iso(6.0, 0.3, 0.95)
          return (
            <g>
              <circle cx={hx} cy={hy} r="7.5" fill="none" stroke={hot ? '#ffd9b8' : '#4e5761'} strokeWidth="2.2" />
              <circle cx={hx} cy={hy} r="1.8" fill={hot ? '#ffd9b8' : '#4e5761'} />
            </g>
          )
        })()}
        <polygon
          points={pts([[4.4, 0.3, 0.9], [5.4, 0.3, 0.9], [5.4, 0.3, 1.1], [4.4, 0.3, 1.1]])}
          fill="#2b333b"
        />
      </>
    )

  // ── EXPERIENCE: a cork bulletin board with pinned papers ──────
  if (id === 'experience')
    return (
      <>
        {/* Frame + cork */}
        <polygon points={wallLeft(1.35, 4.25, 1.15, 2.85)} fill={hot ? HOT[2] : WOOD[2]} />
        <polygon
          points={wallLeft(1.5, 4.1, 1.28, 2.72)}
          fill={hot ? 'rgba(240,138,60,.55)' : CORK[0]}
        />
        {/* Pinned notes at slight angles, with coloured pins */}
        {[
          [1.68, 2.32, 1.55, 2.28, '#f4efe4'],
          [2.42, 3.06, 1.72, 2.45, '#ffffff'],
          [3.16, 3.72, 1.42, 2.12, '#f4efe4'],
          [1.78, 2.34, 2.42, 2.66, '#ffffff'],
          [2.62, 3.28, 2.38, 2.62, '#f7f2e8'],
        ].map(([y1, y2, z1, z2, fill], i) => (
          <g key={i}>
            <polygon points={wallLeft(y1, y2, z1, z2)} fill={fill} opacity={hot ? 0.95 : 1} />
            {(() => {
              const [px, py] = iso(0, (y1 + y2) / 2, z2 - 0.06)
              return <circle cx={px} cy={py} r="2.6" fill={['#e0503a', '#3f8fbf', '#4fbf6a', '#e8c33a', '#e0503a'][i]} />
            })()}
          </g>
        ))}
      </>
    )

  // ── EDUCATION: a scholarly corner — bookshelf + diploma ───────
  if (id === 'education')
    return (
      <>
        {/* Framed diploma, unmistakably framed */}
        <polygon points={wallLeft(5.35, 6.75, 1.95, 2.85)} fill={hot ? HOT[2] : '#4a3626'} />
        <polygon points={wallLeft(5.5, 6.6, 2.06, 2.74)} fill={hot ? 'rgba(240,138,60,.5)' : '#f6f1e4'} />
        {[0, 1, 2].map((i) => {
          const [ax, ay] = iso(0, 5.62, 2.6 - i * 0.14)
          const [bx, by] = iso(0, 6.48, 2.6 - i * 0.14)
          return <line key={i} x1={ax} y1={ay} x2={bx} y2={by} stroke="#b7ab93" strokeWidth="1.1" />
        })}
        {/* Bookshelf */}
        <Box x={0.05} y={5.2} w={0.55} d={1.85} h={1.75} c={pick(hot, WOOD)} />
        {[0, 1, 2].map((shelf) => (
          <g key={shelf}>
            {Array.from({ length: 9 }).map((_, i) => {
              const y1 = 5.32 + i * 0.19
              const spines = ['#b5493c', '#2f6f8f', '#c58f2e', '#4f7f52', '#7a4f86', '#a8563a']
              return (
                <polygon
                  key={i}
                  points={pts([
                    [0.6, y1, 0.22 + shelf * 0.52],
                    [0.6, y1 + 0.15, 0.22 + shelf * 0.52],
                    [0.6, y1 + 0.15, 0.62 + shelf * 0.52],
                    [0.6, y1, 0.62 + shelf * 0.52],
                  ])}
                  fill={hot ? '#ffcda6' : spines[(i + shelf) % spines.length]}
                />
              )
            })}
          </g>
        ))}
        {/* Graduation cap on top */}
        {(() => {
          const [cx, cy] = iso(0.32, 6.1, 1.75)
          return (
            <g>
              <polygon
                points={`${cx - 11},${cy} ${cx},${cy - 6} ${cx + 11},${cy} ${cx},${cy + 6}`}
                fill={hot ? '#ffcda6' : '#23282e'}
              />
              <line x1={cx + 9} y1={cy + 1} x2={cx + 12} y2={cy + 9} stroke="#e8c33a" strokeWidth="1.6" />
            </g>
          )
        })()}
      </>
    )

  // ── ABOUT: desk, clipboard, mug, chair ───────────────────────
  if (id === 'about')
    return (
      <>
        <Box x={2.0} y={5.9} w={2.0} d={1.1} h={0.78} c={pick(hot, WOOD)} />
        <polygon
          points={pts([[2.35, 6.12, 0.78], [3.15, 6.12, 0.78], [3.15, 6.72, 0.78], [2.35, 6.72, 0.78]])}
          fill={hot ? '#ffd9b8' : '#f6f1e4'}
        />
        {/* Mug */}
        {(() => {
          const [mx, my] = iso(3.55, 6.25, 0.78)
          return (
            <g>
              <rect x={mx - 3.4} y={my - 8} width="6.8" height="8" rx="1.2" fill={hot ? '#ffd9b8' : '#e0503a'} />
              <ellipse cx={mx} cy={my - 8} rx="3.4" ry="1.5" fill="#f7ded4" />
            </g>
          )
        })()}
        {/* Chair */}
        <Box x={2.55} y={7.15} w={0.7} d={0.7} h={0.42} c={pick(hot, MACHINE_DARK)} />
        <polygon
          points={pts([[2.55, 7.78, 0.42], [3.25, 7.78, 0.42], [3.25, 7.78, 1.12], [2.55, 7.78, 1.12]])}
          fill={hot ? HOT[1] : MACHINE_DARK[1]}
        />
      </>
    )

  // ── PROJECTS: drafting table, blueprints, aircraft, mill ──────
  if (id === 'projects')
    return (
      <>
        <Box x={3.9} y={3.4} w={2.9} d={2.3} h={0.82} c={pick(hot, MACHINE)} />
        {[0, 1, 2].map((i) => (
          <polygon
            key={i}
            points={pts([
              [4.2 + i * 0.22, 3.7 + i * 0.16, 0.82],
              [5.6 + i * 0.22, 3.7 + i * 0.16, 0.82],
              [5.6 + i * 0.22, 4.9 + i * 0.16, 0.82],
              [4.2 + i * 0.22, 4.9 + i * 0.16, 0.82],
            ])}
            fill={hot ? 'rgba(240,138,60,.65)' : '#16324f'}
            stroke={hot ? '#ffd9b8' : 'rgba(127,178,217,.55)'}
            strokeWidth="1"
          />
        ))}
        {/* Mill column behind the table */}
        <Box x={6.15} y={3.5} z={0.82} w={0.6} d={0.6} h={1.25} c={pick(hot, MACHINE_DARK)} />
        {/* Aircraft on a stand */}
        <Box x={5.9} y={4.3} w={0.35} d={0.35} h={1.05} c={pick(hot, MACHINE_DARK)} />
        <polygon
          points={pts([
            [5.15, 4.54, 1.05], [5.94, 4.36, 1.05], [6.21, 4.36, 1.05], [6.9, 4.54, 1.05],
            [6.9, 4.66, 1.05], [6.21, 4.76, 1.05], [5.94, 4.76, 1.05], [5.15, 4.66, 1.05],
          ])}
          fill={hot ? '#ffcda6' : '#e6ebef'}
          stroke="rgba(0,0,0,.35)"
          strokeWidth=".8"
        />
        <polygon
          points={pts([[5.68, 3.9, 1.05], [6.47, 3.9, 1.05], [6.47, 4.02, 1.05], [5.68, 4.02, 1.05]])}
          fill={hot ? '#ffcda6' : '#cfd6dc'}
          stroke="rgba(0,0,0,.35)" strokeWidth=".8"
        />
        <polygon
          points={pts([
            [6.075, 5.45, 1.05], [6.21, 5.12, 1.05], [6.21, 3.82, 1.05],
            [5.94, 3.82, 1.05], [5.94, 5.12, 1.05],
          ])}
          fill={hot ? '#ffe0c4' : '#f2f5f7'}
          stroke="rgba(0,0,0,.35)" strokeWidth=".8"
        />
        <polygon
          points={pts([[6.07, 3.8, 1.05], [6.07, 4.28, 1.05], [6.07, 4.28, 1.5], [6.07, 3.8, 1.5]])}
          fill={hot ? '#ffcda6' : '#dbe1e6'}
          stroke="rgba(0,0,0,.35)" strokeWidth=".8"
        />
      </>
    )

  // ── CONTACT: front counter with a work-order pad and a bell ───
  if (id === 'contact')
    return (
      <>
        <Box x={6.9} y={6.8} w={1.9} d={1.0} h={0.95} c={pick(hot, WOOD)} />
        <polygon
          points={pts([[7.15, 6.98, 0.95], [7.85, 6.98, 0.95], [7.85, 7.5, 0.95], [7.15, 7.5, 0.95]])}
          fill={hot ? '#ffd9b8' : '#f6f1e4'}
        />
        {(() => {
          const [bx, by] = iso(8.35, 7.1, 0.95)
          return (
            <g>
              <ellipse cx={bx} cy={by} rx="6" ry="2.6" fill={hot ? '#ffcda6' : '#9aa3ac'} />
              <path
                d={`M${bx - 6} ${by} a6 5 0 0 1 12 0`}
                fill={hot ? '#ffd9b8' : '#c3cad2'}
              />
            </g>
          )
        })()}
      </>
    )

  return null
}
