import { useState } from 'react'
import { about, education, experience } from '../data/content'

function Tape({ className, rotate }) {
  return (
    <span
      className={`absolute h-5 w-14 ${className}`}
      style={{
        transform: `rotate(${rotate}deg)`,
        background:
          'linear-gradient(180deg, rgba(255,255,255,.16), rgba(255,255,255,.08))',
        boxShadow: '0 1px 3px rgba(0,0,0,.4)',
      }}
    />
  )
}

function Poster({ item, tilt }) {
  const [on, setOn] = useState(false)
  return (
    <article
      className="cur-md relative"
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
      onFocus={() => setOn(true)}
      onBlur={() => setOn(false)}
      tabIndex={0}
      style={{
        transform: on ? 'rotate(0deg) translateY(-6px)' : `rotate(${tilt}deg)`,
        transition: 'transform 320ms cubic-bezier(.2,.7,.3,1), box-shadow 320ms ease',
      }}
    >
      <Tape className="-top-2 left-4" rotate={-7} />
      <Tape className="-top-2 right-4" rotate={6} />
      <div
        className="grain relative p-5 sm:p-6"
        style={{
          background: 'linear-gradient(180deg,#efeade 0%,#e0d9ca 100%)',
          color: '#22201d',
          boxShadow: on
            ? '0 24px 50px rgba(0,0,0,.55)'
            : '0 10px 22px rgba(0,0,0,.4)',
        }}
      >
        <p className="tech-type text-[9px]" style={{ color: '#8a5a2b' }}>
          {item.period}
        </p>
        <h3 className="sign-type mt-1 text-lg leading-tight sm:text-xl">
          {item.role}
        </h3>
        <p className="tech-type mt-1 text-[10px]" style={{ color: '#5f5a52' }}>
          {item.org}
        </p>
        <div className="my-3 h-px" style={{ background: 'rgba(0,0,0,.15)' }} />
        <ul className="space-y-[6px]">
          {item.bullets.map((b) => (
            <li key={b} className="flex gap-2 text-[12.5px] leading-snug">
              <span style={{ color: 'var(--orange)' }}>—</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

function Diploma() {
  const [glare, setGlare] = useState({ x: 50, y: 40 })

  return (
    <div
      className="cur-md relative mx-auto w-full max-w-md"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        setGlare({
          x: ((e.clientX - r.left) / r.width) * 100,
          y: ((e.clientY - r.top) / r.height) * 100,
        })
      }}
    >
      {/* Frame */}
      <div
        className="relative rounded-[2px] p-3"
        style={{
          background: 'linear-gradient(150deg,#5c452e,#33251a 60%,#4a3626)',
          boxShadow:
            'inset 0 1px 0 rgba(255,255,255,.14), 0 22px 50px rgba(0,0,0,.6)',
        }}
      >
        {/* Mount board */}
        <div
          className="relative overflow-hidden p-6 text-center"
          style={{ background: '#efeade', color: '#22201d' }}
        >
          <p className="tech-type text-[9px]" style={{ color: '#8a5a2b' }}>
            {education.period}
          </p>
          <h3 className="sign-type mt-2 text-lg leading-tight sm:text-xl">
            {education.degree}
          </h3>
          <p className="mt-1 text-[13px]" style={{ color: '#5f5a52' }}>
            {education.school}
          </p>
          <div
            className="mx-auto my-3 h-px w-16"
            style={{ background: 'rgba(0,0,0,.2)' }}
          />
          <p className="text-[12px]" style={{ color: '#5f5a52' }}>
            {education.detail}
          </p>

          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {education.honours.map((h) => (
              <span
                key={h}
                className="tech-type border px-2 py-[3px] text-[9px]"
                style={{ borderColor: 'rgba(0,0,0,.25)', color: '#5f5a52' }}
              >
                {h}
              </span>
            ))}
          </div>

          {/* Glass: a static diagonal streak plus a highlight that tracks the cursor */}
          <span
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(115deg, transparent 30%, rgba(255,255,255,.35) 44%, transparent 56%)',
              mixBlendMode: 'screen',
            }}
          />
          <span
            className="pointer-events-none absolute inset-0 transition-opacity duration-200"
            style={{
              background: `radial-gradient(circle 40% at ${glare.x}% ${glare.y}%, rgba(255,255,255,.30), transparent 60%)`,
              mixBlendMode: 'screen',
            }}
          />
        </div>
      </div>

      <div className="mt-5">
        <p className="tech-type mb-2 text-[9px]" style={{ color: 'var(--chalk-faint)' }}>
          SELECTED COURSEWORK
        </p>
        <div className="flex flex-wrap gap-2">
          {education.coursework.map((c) => (
            <span
              key={c}
              className="tech-type border px-2 py-1 text-[9px]"
              style={{
                borderColor: 'rgba(255,255,255,.14)',
                color: 'var(--chalk-dim)',
              }}
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function Clipboard() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      {/* Clip */}
      <div
        className="absolute -top-3 left-1/2 z-10 h-6 w-24 -translate-x-1/2 rounded-[3px]"
        style={{
          background: 'linear-gradient(180deg,#9aa1a9,#4a5058)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,.4), 0 3px 8px rgba(0,0,0,.5)',
        }}
      />
      <div
        className="grain relative rounded-[2px] p-3"
        style={{
          background: 'linear-gradient(180deg,#6b5334,#4a3826)',
          boxShadow: '0 18px 44px rgba(0,0,0,.55)',
        }}
      >
        <div
          className="p-5 pt-7 sm:p-6 sm:pt-8"
          style={{
            background:
              'repeating-linear-gradient(180deg,#f4f0e6 0 27px, #e9e4d6 27px 28px)',
            color: '#22201d',
          }}
        >
          <p className="tech-type text-[9px]" style={{ color: '#8a5a2b' }}>
            {about.heading}
          </p>
          <div className="mt-3 space-y-3">
            {about.body.map((p) => (
              <p key={p} className="text-[13px] leading-[27px]">
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Each office fixture is now its own page body; the page shell supplies
// the heading plate and the warm room lighting.
export function ExperienceSection() {
  return (
    <div className="grid gap-8 md:grid-cols-2 md:gap-6">
      {experience.map((e, i) => (
        <Poster key={e.role} item={e} tilt={i % 2 === 0 ? -1.2 : 1.4} />
      ))}
    </div>
  )
}

export function EducationSection() {
  return <Diploma />
}

export function AboutSection() {
  return <Clipboard />
}
