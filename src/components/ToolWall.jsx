import { useState } from 'react'
import ToolIcon from './ToolIcon'
import { skillGroups } from '../data/content'

function Hook() {
  return (
    <svg viewBox="0 0 20 14" width="20" height="14" aria-hidden="true">
      <path
        d="M4 2 v5 a6 6 0 0 0 12 0"
        fill="none"
        stroke="#8d949c"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function Gauge({ level, on }) {
  // No rating in the source material means no gauge — an empty five-bar
  // meter would read as "rated zero", which is worse than showing nothing.
  if (level == null) return null
  return (
    <div className="mt-1 flex justify-center gap-[3px]">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className="h-[3px] w-[7px] transition-colors duration-200"
          style={{
            background:
              i < level
                ? on
                  ? 'var(--orange)'
                  : 'rgba(232,230,225,.42)'
                : 'rgba(255,255,255,.10)',
          }}
        />
      ))}
    </div>
  )
}

function ToolGroup({ group, tools, baseDelay }) {
  const [hover, setHover] = useState(null)
  const [seq, setSeq] = useState(0)

  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <span
          className="tech-type text-[10px]"
          style={{ color: 'var(--orange)' }}
        >
          {group}
        </span>
        <span className="h-px flex-1" style={{ background: 'rgba(255,255,255,.09)' }} />
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 lg:grid-cols-4">
        {tools.map((t, i) => {
          const on = hover === i
          const nudged = hover !== null && Math.abs(hover - i) === 1
          return (
            <div
              key={t.name}
              className="cur-md flex flex-col items-center text-center"
              onMouseEnter={() => {
                setHover(i)
                setSeq((s) => s + 1)
              }}
              onMouseLeave={() => setHover(null)}
              tabIndex={0}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
            >
              <Hook />
              <div
                key={nudged ? `n-${seq}` : `s-${i}`}
                className={
                  nudged ? 'anim-nudge' : on ? '' : 'anim-pendulum'
                }
                style={{
                  transformOrigin: '50% 8%',
                  animationDelay: on || nudged ? '0ms' : `${baseDelay + i * 65}ms`,
                  transform: on ? 'rotate(-4deg)' : undefined,
                  transition: on ? 'transform 260ms cubic-bezier(.3,1.4,.5,1)' : undefined,
                }}
              >
                <span
                  className="block transition-colors duration-200"
                  style={{ color: on ? 'var(--orange)' : 'var(--chalk-dim)' }}
                >
                  <ToolIcon name={t.icon} size={40} />
                </span>
              </div>
              <span
                className="tech-type mt-2 text-[9px] leading-tight transition-colors duration-200"
                style={{ color: on ? 'var(--chalk)' : 'var(--chalk-faint)' }}
              >
                {t.name}
              </span>
              <Gauge level={t.level} on={on} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function ToolWall() {
  return (
    <div
      className="pegboard grain relative rounded-[3px] p-6 sm:p-10"
      style={{
        boxShadow:
          'inset 0 1px 0 rgba(255,255,255,.06), inset 0 0 60px rgba(0,0,0,.5), 0 20px 50px rgba(0,0,0,.5)',
      }}
    >
      <div className="space-y-12">
        {skillGroups.map((g, gi) => (
          <ToolGroup
            key={g.group}
            group={g.group}
            tools={g.tools}
            baseDelay={gi * 160}
          />
        ))}
      </div>
    </div>
  )
}
