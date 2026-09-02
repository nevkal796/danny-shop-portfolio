import { memo } from 'react'
import { boxFaces, iso, pts, wallLeft, wallRight } from '../../lib/iso'
import { shopZones } from '../../data/zones'
import { MACHINE_DARK, SHOP, WOOD } from './palette'

// Static hangar scenery. No props and no state, so React.memo means a
// hover never re-renders any of it.
//
// Anything tall stays inside x 1.8–7.2 / y 1.0–7.8 so it never reaches the
// four bounding-box corners the info card needs.

const RACK = ['#2f5f8a', '#234a6d', '#1a3750']
const CRATE = ['#c08d52', '#956d3d', '#70522d']
const CHEST = ['#c0392b', '#8e2a20', '#6d2018']

function Box({ x, y, z = 0, w, d, h, c = MACHINE_DARK }) {
  const f = boxFaces(x, y, z, w, d, h)
  return (
    <g>
      <polygon points={f.left} fill={c[2]} />
      <polygon points={f.right} fill={c[1]} />
      <polygon points={f.top} fill={c[0]} />
    </g>
  )
}

/** A painted walkway: wash between two solid yellow edge stripes. */
function Lane({ x, y, w, d, along = 'x' }) {
  const strip = (a, b, c, e) =>
    pts([[a, b], [a + c, b], [a + c, b + e], [a, b + e]])
  return (
    <g>
      <polygon points={strip(x, y, w, d)} fill={SHOP.laneWash} />
      {along === 'x' ? (
        <>
          <polygon points={strip(x, y, w, 0.1)} fill={SHOP.lane} />
          <polygon points={strip(x, y + d - 0.1, w, 0.1)} fill={SHOP.lane} />
        </>
      ) : (
        <>
          <polygon points={strip(x, y, 0.1, d)} fill={SHOP.lane} />
          <polygon points={strip(x + w - 0.1, y, 0.1, d)} fill={SHOP.lane} />
        </>
      )}
    </g>
  )
}

// ── Walls. Drawn before the floor. ──────────────────────────
export const SceneryWalls = memo(function SceneryWalls() {
  return (
    <>
      <defs>
        <radialGradient id="coolPool" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity=".16" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="warmPool" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#ffd9a8" stopOpacity=".18" />
          <stop offset="100%" stopColor="#ffd9a8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="daylight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity=".96" />
          <stop offset="100%" stopColor="#cfe4f5" stopOpacity=".6" />
        </linearGradient>
        <radialGradient id="doorSpill" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#eaf5ff" stopOpacity=".34" />
          <stop offset="100%" stopColor="#eaf5ff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Pale interior. Warm on the office side, cool on the tool side. */}
      <polygon points={wallLeft(0, 9, 0, 3.1)} fill={SHOP.wallOffice} />
      <polygon points={wallRight(0, 9, 0, 3.1)} fill={SHOP.wallTool} />
      {/* Skirting, so the walls meet the floor rather than float */}
      <polygon points={wallLeft(0, 9, 0, 0.16)} fill="rgba(0,0,0,.16)" />
      <polygon points={wallRight(0, 9, 0, 0.16)} fill="rgba(0,0,0,.13)" />
    </>
  )
})

// ── Everything above the floor. Drawn after it. ─────────────
export const SceneryDetail = memo(function SceneryDetail() {
  return (
    <>
      {/* Floor grid */}
      {Array.from({ length: 10 }).map((_, i) => (
        <g key={i} stroke={SHOP.grid} strokeWidth="1">
          <line x1={iso(i, 0)[0]} y1={iso(i, 0)[1]} x2={iso(i, 9)[0]} y2={iso(i, 9)[1]} />
          <line x1={iso(0, i)[0]} y1={iso(0, i)[1]} x2={iso(9, i)[0]} y2={iso(9, i)[1]} />
        </g>
      ))}

      {/* Oil stains, so the epoxy is not showroom clean */}
      <g className="shop-detail" fill="#22405c" opacity=".7">
        <ellipse cx={iso(5.4, 7.4)[0]} cy={iso(5.4, 7.4)[1]} rx="26" ry="11" />
        <ellipse cx={iso(2.1, 2.4)[0]} cy={iso(2.1, 2.4)[1]} rx="18" ry="8" />
        <ellipse cx={iso(8.2, 1.9)[0]} cy={iso(8.2, 1.9)[1]} rx="14" ry="6" />
      </g>

      {/* ── Painted walkways. The structure in a busy room. ── */}
      <Lane x={1.9} y={2.05} w={6.9} d={0.85} along="x" />
      <Lane x={7.15} y={2.9} w={0.85} d={3.5} along="y" />

      {/* Bay numbers stencilled on the slab */}
      <g className="shop-detail">
        {shopZones.map((z, i) => {
          const [tx, ty] = iso(z.pad[0] + 0.34, z.pad[1] + z.pad[3] - 0.3)
          return (
            <text
              key={z.id}
              x={tx} y={ty}
              fontFamily="'IBM Plex Mono', monospace"
              fontSize="11" letterSpacing="1.5"
              fill={SHOP.stencil}
            >
              {String(i + 1).padStart(2, '0')}
            </text>
          )
        })}
      </g>

      {/* Overhead light wash */}
      <ellipse cx={iso(4.5, 1)[0]} cy={iso(4.5, 1)[1]} rx="250" ry="120" fill="url(#coolPool)" />
      <ellipse cx={iso(1.5, 5.5)[0]} cy={iso(1.5, 5.5)[1]} rx="230" ry="115" fill="url(#warmPool)" />

      {/* ── Hangar door, office wall. Decorative. ─────────── */}
      <polygon points={wallLeft(7.4, 8.9, 0, 2.4)} fill="url(#daylight)" />
      <polygon points={wallLeft(7.4, 8.9, 2.4, 3.1)} fill="#8d949c" />
      {[0, 1, 2].map((i) => (
        <polygon
          key={i}
          points={wallLeft(7.4, 8.9, 2.5 + i * 0.2, 2.56 + i * 0.2)}
          fill="rgba(0,0,0,.18)"
        />
      ))}
      <ellipse
        cx={iso(1.9, 7.9)[0]} cy={iso(1.9, 7.9)[1]}
        rx="210" ry="92" fill="url(#doorSpill)"
      />

      {/* ── Ceiling services ──────────────────────────────── */}
      <g className="shop-detail" strokeLinecap="round">
        {/* Fluorescent strips in rows */}
        {[2.4, 4.6, 6.8].map((x) => {
          const [ax, ay] = iso(x, 1.0, 3.85)
          const [bx, by] = iso(x, 7.8, 3.85)
          return (
            <g key={`t${x}`}>
              <line x1={ax} y1={ay} x2={bx} y2={by} stroke="#bfe4ff" strokeWidth="9" opacity=".16" />
              <line x1={ax} y1={ay} x2={bx} y2={by} stroke="#f4fbff" strokeWidth="3.4" />
            </g>
          )
        })}
        {/* Ducting and a red pipe run, crossing the other way */}
        {[2.2, 5.6].map((y, i) => {
          const [ax, ay] = iso(1.4, y, 4.16)
          const [bx, by] = iso(7.6, y, 4.16)
          const [cx, cy] = iso(1.4, y + 0.32, 4.06)
          const [dx, dy] = iso(7.6, y + 0.32, 4.06)
          return (
            <g key={`d${y}`}>
              <line x1={ax} y1={ay} x2={bx} y2={by} stroke="#98a1ab" strokeWidth={i ? 5 : 7.5} />
              <line x1={ax} y1={ay - 2} x2={bx} y2={by - 2} stroke="#c3cbd3" strokeWidth="1.4" />
              <line x1={cx} y1={cy} x2={dx} y2={dy} stroke="#a83f34" strokeWidth="2.4" />
            </g>
          )
        })}
        {/* Cable tray */}
        {(() => {
          const [ax, ay] = iso(1.4, 3.9, 4.0)
          const [bx, by] = iso(7.6, 3.9, 4.0)
          return (
            <g>
              <line x1={ax} y1={ay} x2={bx} y2={by} stroke="#6f7883" strokeWidth="3.6" />
              <line x1={ax} y1={ay + 3} x2={bx} y2={by + 3} stroke="#525b65" strokeWidth="1.6" />
            </g>
          )
        })()}
        {/* Yellow gantry crane on its rail */}
        {(() => {
          const [r1x, r1y] = iso(1.2, 4.55, 4.34)
          const [r2x, r2y] = iso(7.8, 4.55, 4.34)
          const [hx, hy] = iso(4.6, 4.55, 4.34)
          return (
            <g>
              <line x1={r1x} y1={r1y} x2={r2x} y2={r2y} stroke="#d9a92b" strokeWidth="6.5" />
              <line x1={r1x} y1={r1y + 5} x2={r2x} y2={r2y + 5} stroke="#8f6d16" strokeWidth="2.6" />
              <rect x={hx - 11} y={hy - 6} width="22" height="11" rx="1.5" fill="#c79a24" />
              <line x1={hx} y1={hy + 5} x2={hx} y2={hy + 30} stroke="#7d858e" strokeWidth="1.4" />
              <path d={`M${hx} ${hy + 30} a4 4 0 1 0 4 4`} fill="none" stroke="#9aa3ac" strokeWidth="2" />
            </g>
          )
        })()}
      </g>

      {/* ── Racking. Clear of the walkway and the card corners. */}
      <g className="shop-detail">
        <Box x={8.05} y={3.4} w={0.14} d={2.6} h={2.4} c={RACK} />
        <Box x={8.86} y={3.4} w={0.14} d={2.6} h={2.4} c={RACK} />
        {[0, 1, 2].map((lvl) => (
          <g key={lvl}>
            <Box x={8.05} y={3.4} z={lvl * 0.78} w={0.95} d={2.6} h={0.1} c={RACK} />
            <Box x={8.15} y={3.6} z={lvl * 0.78 + 0.1} w={0.75} d={0.95} h={0.45} c={CRATE} />
            <Box x={8.15} y={4.8} z={lvl * 0.78 + 0.1} w={0.75} d={0.9} h={0.4} c={CRATE} />
          </g>
        ))}
      </g>

      {/* ── Props ─────────────────────────────────────────── */}
      <Box x={7.4} y={0.4} w={1.3} d={1.0} h={1.25} c={CHEST} />
      {[0, 1, 2].map((i) => {
        const [hx, hy] = iso(7.4, 1.4, 0.35 + i * 0.28)
        const [gx, gy] = iso(8.7, 1.4, 0.35 + i * 0.28)
        return <line key={i} x1={hx} y1={hy} x2={gx} y2={gy} stroke="rgba(0,0,0,.4)" strokeWidth="1.6" />
      })}

      <Box x={0.2} y={0.2} w={1.2} d={0.95} h={0.16} c={WOOD} />
      <Box x={0.32} y={0.32} z={0.16} w={0.9} d={0.7} h={0.55} c={CRATE} />
      <Box x={0.4} y={0.4} z={0.71} w={0.7} d={0.55} h={0.4} c={CRATE} />
      {(() => {
        const [dx, dy] = iso(1.75, 0.55, 0)
        return (
          <g>
            <ellipse cx={dx} cy={dy - 22} rx="15" ry="7" fill="#3579b3" />
            <rect x={dx - 15} y={dy - 22} width="30" height="22" fill="#2a628f" />
            <ellipse cx={dx} cy={dy} rx="15" ry="7" fill="#1f4d70" />
            <rect x={dx - 15} y={dy - 15} width="30" height="2" fill="rgba(0,0,0,.25)" />
          </g>
        )
      })()}

      {/* Parts bins on a shelf above the bench */}
      <g className="shop-detail">
        <polygon points={wallRight(2.9, 6.1, 2.86, 2.92)} fill="#8d949c" />
        {['#d95f3b', '#3f8fbf', '#d9b13b', '#4f9d5f'].map((c, i) => (
          <polygon key={c} points={wallRight(3.0 + i * 0.78, 3.62 + i * 0.78, 2.92, 3.08)} fill={c} />
        ))}
      </g>

      {/* Safety kit — the red and green a real shop always has */}
      <g className="shop-detail">
        <polygon points={wallRight(8.1, 8.45, 1.5, 2.15)} fill="#b5352a" />
        <polygon points={wallRight(0.5, 0.95, 1.6, 2.1)} fill="#2f8f52" />
        <polygon points={wallRight(0.56, 0.89, 1.78, 1.92)} fill="#eef6f0" />
      </g>

      {/* Shop fan, broom, cable run */}
      <g className="shop-detail">
        <Box x={4.75} y={7.95} w={0.3} d={0.3} h={0.55} />
        {(() => {
          const [fx, fy] = iso(4.9, 8.1, 0.95)
          const [b1x, b1y] = iso(7.0, 0.3, 0)
          const [b2x, b2y] = iso(7.0, 0.3, 1.5)
          const [c1x, c1y] = iso(7.3, 1.7, 0)
          const [c2x, c2y] = iso(6.4, 2.9, 0)
          return (
            <g>
              <circle cx={fx} cy={fy} r="15" fill="#414a54" stroke="#8b939c" strokeWidth="1.2" />
              <circle cx={fx} cy={fy} r="9.5" fill="none" stroke="#aab2bb" strokeWidth="1" />
              <circle cx={fx} cy={fy} r="3.4" fill="#c3cad2" />
              <line x1={b1x} y1={b1y} x2={b2x} y2={b2y} stroke="#a8813f" strokeWidth="2.4" />
              <rect x={b1x - 8} y={b1y - 7} width="16" height="7" rx="1" fill="#6d5330" />
              <path
                d={`M${c1x} ${c1y} Q ${(c1x + c2x) / 2} ${(c1y + c2y) / 2 + 14} ${c2x} ${c2y}`}
                fill="none" stroke="#1b2c3d" strokeWidth="2.6" strokeLinecap="round"
              />
            </g>
          )
        })()}
      </g>
    </>
  )
})
