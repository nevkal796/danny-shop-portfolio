import { memo } from 'react'
import { boxFaces, iso, pts, wallLeft, wallRight } from '../../lib/iso'

// Static hangar scenery. No props and no state, so React.memo means a
// hover never re-renders any of it — only the zone groups and the card.
//
// Anything tall is kept away from the four corners of the scene's bounding
// box: the info card lives there, and it needs them clear.

const STEEL = ['#40474f', '#2c3138', '#23272d']
const RACK = ['#2f5f8a', '#234a6d', '#1a3750']
const CRATE = ['#b8894f', '#8f693b', '#6d4f2c']
const PALLET = ['#7a6242', '#5d4a32', '#463825']
const CHEST = ['#c0392b', '#8e2a20', '#6d2018']

function Box({ x, y, z = 0, w, d, h, c = STEEL }) {
  const f = boxFaces(x, y, z, w, d, h)
  return (
    <g>
      <polygon points={f.left} fill={c[2]} />
      <polygon points={f.right} fill={c[1]} />
      <polygon points={f.top} fill={c[0]} />
    </g>
  )
}

/** Pendant lamp hung from the roof on a long stem. */
function Lamp({ x, y, to = 2.9, glow = '#dff0ff' }) {
  const [tx, ty] = iso(x, y, 3.95)
  const [hx, hy] = iso(x, y, to)
  return (
    <g>
      <line x1={tx} y1={ty} x2={hx} y2={hy} stroke="#5b636c" strokeWidth="1.6" />
      <ellipse cx={hx} cy={hy} rx="15" ry="7" fill="#454c55" />
      <ellipse cx={hx} cy={hy + 4} rx="10" ry="4.5" fill={glow} opacity=".85" />
    </g>
  )
}

// ── Walls. Drawn before the floor. ──────────────────────────
export const SceneryWalls = memo(function SceneryWalls() {
  return (
    <>
      <defs>
        <radialGradient id="coolPool" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#8fb8d8" stopOpacity=".22" />
          <stop offset="100%" stopColor="#8fb8d8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="warmPool" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#ffb870" stopOpacity=".20" />
          <stop offset="100%" stopColor="#ffb870" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="daylight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d6ebff" stopOpacity=".92" />
          <stop offset="100%" stopColor="#8fb8d8" stopOpacity=".42" />
        </linearGradient>
        <radialGradient id="doorSpill" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#dff0ff" stopOpacity=".30" />
          <stop offset="100%" stopColor="#dff0ff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Cool on the tool side, warm on the office side */}
      <polygon points={wallLeft(0, 9, 0, 3.1)} fill="#2b2521" />
      <polygon points={wallRight(0, 9, 0, 3.1)} fill="#272c33" />
    </>
  )
})

// ── Everything above the floor. Drawn after it. ─────────────
export const SceneryDetail = memo(function SceneryDetail() {
  return (
    <>
      {/* Floor grid */}
      {Array.from({ length: 10 }).map((_, i) => (
        <g key={i} stroke="rgba(232,230,225,.05)" strokeWidth="1">
          <line x1={iso(i, 0)[0]} y1={iso(i, 0)[1]} x2={iso(i, 9)[0]} y2={iso(i, 9)[1]} />
          <line x1={iso(0, i)[0]} y1={iso(0, i)[1]} x2={iso(9, i)[0]} y2={iso(9, i)[1]} />
        </g>
      ))}

      {/* Oil stains and scuffs, so the concrete is not perfectly clean */}
      <g className="shop-detail" fill="#12151a" opacity=".55">
        <ellipse cx={iso(5.4, 7.4)[0]} cy={iso(5.4, 7.4)[1]} rx="26" ry="11" />
        <ellipse cx={iso(2.1, 2.4)[0]} cy={iso(2.1, 2.4)[1]} rx="18" ry="8" />
        <ellipse cx={iso(7.9, 2.6)[0]} cy={iso(7.9, 2.6)[1]} rx="14" ry="6" />
      </g>

      {/* Overhead light pools */}
      <ellipse cx={iso(4.5, 1)[0]} cy={iso(4.5, 1)[1]} rx="250" ry="120" fill="url(#coolPool)" />
      <ellipse cx={iso(1.5, 5.5)[0]} cy={iso(1.5, 5.5)[1]} rx="230" ry="115" fill="url(#warmPool)" />

      {/* ── Hangar door, on the office wall. Decorative. ──── */}
      <polygon points={wallLeft(7.4, 8.9, 0, 2.4)} fill="url(#daylight)" />
      {/* Door leaf, rolled part way up */}
      <polygon points={wallLeft(7.4, 8.9, 2.4, 3.1)} fill="#1f242a" />
      {[0, 1, 2].map((i) => (
        <polygon
          key={i}
          points={wallLeft(7.4, 8.9, 2.5 + i * 0.2, 2.56 + i * 0.2)}
          fill="rgba(255,255,255,.06)"
        />
      ))}
      {/* Daylight pouring across the concrete */}
      <ellipse
        cx={iso(1.9, 7.9)[0]} cy={iso(1.9, 7.9)[1]}
        rx="210" ry="92" fill="url(#doorSpill)"
      />

      {/* ── Roof structure. ────────────────────────────────
          A lattice, not separate beams: in isometric a lone line running
          along one axis is depth-ambiguous and reads as lying on the floor.
          Crossing members make it unmistakably a ceiling plane.
          Kept inside x 1.8–7.2 / y 1.0–7.8 so it never reaches the four
          bounding-box corners the info card needs. */}
      <g className="shop-detail" strokeLinecap="round">
        {[1.8, 3.6, 5.4, 7.2].map((x) => {
          const [ax, ay] = iso(x, 1.0, 4.0)
          const [bx, by] = iso(x, 7.8, 4.0)
          return (
            <line key={`x${x}`} x1={ax} y1={ay} x2={bx} y2={by}
              stroke="#5e6771" strokeWidth="2.6" />
          )
        })}
        {[1.0, 3.3, 5.6, 7.8].map((y) => {
          const [ax, ay] = iso(1.8, y, 4.0)
          const [bx, by] = iso(7.2, y, 4.0)
          return (
            <line key={`y${y}`} x1={ax} y1={ay} x2={bx} y2={by}
              stroke="#4d555e" strokeWidth="2" />
          )
        })}
      </g>

      {/* ── Racking. Mid-floor, right side, clear of corners. */}
      <g className="shop-detail">
        <Box x={7.3} y={3.4} z={0} w={0.14} d={2.6} h={2.5} c={RACK} />
        <Box x={8.66} y={3.4} z={0} w={0.14} d={2.6} h={2.5} c={RACK} />
        {[0, 1, 2].map((lvl) => (
          <g key={lvl}>
            <Box x={7.3} y={3.4} z={lvl * 0.82} w={1.5} d={2.6} h={0.1} c={RACK} />
            <Box x={7.45} y={3.6} z={lvl * 0.82 + 0.1} w={1.15} d={1.0} h={0.14} c={PALLET} />
            <Box x={7.55} y={3.7} z={lvl * 0.82 + 0.24} w={0.9} d={0.8} h={0.5} c={CRATE} />
            <Box x={7.5} y={4.9} z={lvl * 0.82 + 0.1} w={1.05} d={0.9} h={0.45} c={CRATE} />
          </g>
        ))}
      </g>

      {/* ── Props ─────────────────────────────────────────── */}

      {/* Red rolling tool chest */}
      <Box x={7.4} y={0.4} z={0} w={1.3} d={1.0} h={1.25} c={CHEST} />
      {[0, 1, 2].map((i) => {
        const [hx, hy] = iso(7.4, 1.4, 0.35 + i * 0.28)
        const [gx, gy] = iso(8.7, 1.4, 0.35 + i * 0.28)
        return (
          <line
            key={i}
            x1={hx} y1={hy} x2={gx} y2={gy}
            stroke="rgba(0,0,0,.45)" strokeWidth="1.6"
          />
        )
      })}

      {/* Pallet with crates, and a blue drum beside it */}
      <Box x={0.2} y={0.2} z={0} w={1.2} d={0.95} h={0.16} c={PALLET} />
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

      {/* Parts bins on a shelf above the workbench */}
      <g className="shop-detail">
        <polygon points={wallRight(2.9, 6.1, 2.86, 2.92)} fill="#4a5058" />
        {['#d95f3b', '#3f8fbf', '#d9b13b', '#4f9d5f'].map((c, i) => (
          <polygon
            key={c}
            points={wallRight(3.0 + i * 0.78, 3.62 + i * 0.78, 2.92, 3.08)}
            fill={c}
          />
        ))}
      </g>

      {/* Shop fan on a stand */}
      <g className="shop-detail">
        <Box x={4.75} y={7.95} z={0} w={0.3} d={0.3} h={0.55} />
        {(() => {
          const [fx, fy] = iso(4.9, 8.1, 0.95)
          return (
            <g>
              <circle cx={fx} cy={fy} r="15" fill="#2f353c" stroke="#5b636c" strokeWidth="1.2" />
              <circle cx={fx} cy={fy} r="9.5" fill="none" stroke="#767e88" strokeWidth="1" />
              <circle cx={fx} cy={fy} r="3.4" fill="#8d949c" />
            </g>
          )
        })()}
      </g>

      {/* Broom leaning by the workbench, and a cable run */}
      <g className="shop-detail">
        {(() => {
          const [b1x, b1y] = iso(7.0, 0.3, 0)
          const [b2x, b2y] = iso(7.0, 0.3, 1.5)
          const [c1x, c1y] = iso(7.3, 1.7, 0)
          const [c2x, c2y] = iso(5.7, 2.7, 0)
          return (
            <g>
              <line x1={b1x} y1={b1y} x2={b2x} y2={b2y} stroke="#a8813f" strokeWidth="2.4" />
              <rect x={b1x - 8} y={b1y - 7} width="16" height="7" rx="1" fill="#6d5330" />
              <path
                d={`M${c1x} ${c1y} Q ${(c1x + c2x) / 2} ${(c1y + c2y) / 2 + 16} ${c2x} ${c2y}`}
                fill="none" stroke="#15181c" strokeWidth="2.6" strokeLinecap="round"
              />
            </g>
          )
        })()}
      </g>

      {/* Pendant lamps, hung long off the roof lattice. Detail-only: with
          the lattice hidden on mobile the stems would hang from nothing,
          and the light pools carry the lighting on their own. */}
      <g className="shop-detail">
        <Lamp x={3.0} y={2.2} />
        <Lamp x={6.2} y={5.4} />
        <Lamp x={1.6} y={6.4} glow="#ffe0b8" />
      </g>
    </>
  )
})
