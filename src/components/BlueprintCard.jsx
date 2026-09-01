import { useState } from 'react'

// Linear easing throughout. This is a drafting machine, not a spring.
const EASE = 'linear'

function DimensionRule({ id, on, tolerance }) {
  const line = (delay, dur) => ({
    strokeDasharray: 1,
    strokeDashoffset: on ? 0 : 1,
    transition: `stroke-dashoffset ${dur}ms ${EASE} ${on ? delay : 0}ms`,
  })

  return (
    <svg
      viewBox="0 0 400 34"
      preserveAspectRatio="none"
      className="mt-3 h-[34px] w-full"
      aria-hidden="true"
    >
      <defs>
        <marker
          id={`ar-${id}`}
          markerWidth="7"
          markerHeight="7"
          refX="6"
          refY="3.5"
          orient="auto"
        >
          <path d="M0,0 L7,3.5 L0,7 z" fill="var(--cyan)" />
        </marker>
        <marker
          id={`arr-${id}`}
          markerWidth="7"
          markerHeight="7"
          refX="1"
          refY="3.5"
          orient="auto"
        >
          <path d="M7,0 L0,3.5 L7,7 z" fill="var(--cyan)" />
        </marker>
      </defs>

      {/* Extension lines */}
      <line
        x1="4" y1="0" x2="4" y2="24"
        stroke="var(--cyan)" strokeWidth="1" pathLength="1"
        style={line(0, 200)}
      />
      <line
        x1="396" y1="0" x2="396" y2="24"
        stroke="var(--cyan)" strokeWidth="1" pathLength="1"
        style={line(0, 200)}
      />

      {/* The dimension itself. Drawn markerless so no arrowheads hang in
          empty space, then the arrowed copy fades in once it arrives. */}
      <line
        x1="8" y1="15" x2="392" y2="15"
        stroke="var(--cyan)" strokeWidth="1" pathLength="1"
        style={line(190, 400)}
      />
      <line
        x1="8" y1="15" x2="392" y2="15"
        stroke="var(--cyan)" strokeWidth="1"
        markerStart={`url(#arr-${id})`}
        markerEnd={`url(#ar-${id})`}
        style={{
          opacity: on ? 1 : 0,
          transition: `opacity 120ms ${EASE} ${on ? 560 : 0}ms`,
        }}
      />

      {/* Tolerance callout, sitting on the line. Only drawn when there is
          a real tolerance — an empty box on the line reads as a defect. */}
      {tolerance ? (
        <>
          <rect
            x="168" y="7" width="64" height="16"
            fill="var(--blueprint)"
            style={{ opacity: on ? 1 : 0, transition: `opacity 160ms ${EASE} ${on ? 520 : 0}ms` }}
          />
          <text
            x="200" y="19" textAnchor="middle"
            fontFamily="'IBM Plex Mono', monospace" fontSize="10" letterSpacing="1"
            fill="var(--cyan)"
            style={{ opacity: on ? 1 : 0, transition: `opacity 160ms ${EASE} ${on ? 540 : 0}ms` }}
          >
            {tolerance}
          </text>
        </>
      ) : null}
    </svg>
  )
}

export default function BlueprintCard({ project, onOpen }) {
  const [on, setOn] = useState(false)

  return (
    <article
      className="cur-lg blueprint-paper grain relative w-full rounded-[2px] p-5 text-left transition-all duration-300 sm:p-7"
      style={{
        transform: on ? 'translateY(-5px)' : 'none',
        boxShadow: on
          ? '0 26px 60px rgba(0,0,0,.65), inset 0 0 0 1px rgba(127,178,217,.30)'
          : '0 12px 30px rgba(0,0,0,.45), inset 0 0 0 1px rgba(127,178,217,.14)',
      }}
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
      onFocus={() => setOn(true)}
      onBlur={() => setOn(false)}
    >
      {/* REV stamp */}
      <span
        className="tech-type absolute right-4 top-4 rotate-[-9deg] border px-2 py-[2px] text-[9px]"
        style={{ color: 'var(--orange)', borderColor: 'var(--orange)', opacity: 0.85 }}
      >
        REV {project.rev}
      </span>

      <p className="tech-type text-[10px]" style={{ color: 'var(--cyan)' }}>
        {project.no} · {project.subtitle}
      </p>

      <h3
        className="sign-type mt-2 max-w-[85%] text-xl leading-tight sm:text-2xl"
        style={{ color: 'var(--chalk)' }}
      >
        {project.title}
      </h3>

      <DimensionRule id={project.id} on={on} tolerance={project.tolerance} />

      <p className="mt-1 text-[13px] leading-relaxed" style={{ color: '#c3d3e2' }}>
        {project.summary}
      </p>

      <ul className="mt-4 space-y-2">
        {project.contributions.map((c) => (
          <li
            key={c}
            className="flex gap-2 text-[12.5px] leading-snug"
            style={{ color: '#a8bccd' }}
          >
            <span style={{ color: 'var(--orange)' }}>—</span>
            <span>{c}</span>
          </li>
        ))}
      </ul>

      {/* Title block */}
      <div
        className="mt-6 grid grid-cols-3 border text-[8.5px] sm:grid-cols-4"
        style={{ borderColor: 'rgba(127,178,217,.30)', color: 'var(--cyan)' }}
      >
        {[
          ['PROJECT NO.', project.no],
          ['SCALE', project.scale],
          ['DATE', project.date],
          ['MATERIALS', project.materials.join(' · ')],
        ].map(([k, v], i) => (
          <div
            key={k}
            className={`tech-type border-r px-2 py-[6px] ${
              i === 3 ? 'col-span-3 border-r-0 sm:col-span-1' : ''
            }`}
            style={{ borderColor: 'rgba(127,178,217,.30)' }}
          >
            <div style={{ opacity: 0.55 }}>{k}</div>
            <div className="mt-[2px] normal-case tracking-normal">{v}</div>
          </div>
        ))}
      </div>

      {/* Only offered when there is a real breakdown to explode. */}
      {project.parts?.length > 0 && (
        <button
          onClick={() => onOpen(project)}
          className="cur-lg sign-type mt-5 inline-flex items-center gap-2 border px-3 py-2 text-[10px] transition-colors duration-200"
          style={{
            borderColor: on ? 'var(--orange)' : 'rgba(127,178,217,.4)',
            color: on ? 'var(--orange)' : 'var(--cyan)',
          }}
        >
          Exploded view
          <span aria-hidden="true">↗</span>
        </button>
      )}
    </article>
  )
}
