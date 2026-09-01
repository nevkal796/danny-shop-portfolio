import { useState } from 'react'
import { hobbies } from '../data/content'

function Screw({ className }) {
  return (
    <span
      className={`absolute h-[7px] w-[7px] rounded-full ${className}`}
      style={{
        background: 'radial-gradient(circle at 35% 30%, #8d949c, #40464d)',
        boxShadow: 'inset 0 -1px 1px rgba(0,0,0,.6), 0 1px 1px rgba(0,0,0,.5)',
      }}
    >
      <span className="absolute left-1/2 top-1/2 h-[1px] w-[5px] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-black/60" />
    </span>
  )
}

export default function HobbiesSign({ highlight = false }) {
  const [active, setActive] = useState(highlight ? 0 : null)

  return (
    <div className="w-full max-w-[340px]">
      {/* Chains */}
      <div className="mx-auto flex w-[64%] justify-between px-2">
        {[0, 1].map((i) => (
          <span
            key={i}
            className="block w-[3px]"
            style={{
              height: 34,
              background:
                'repeating-linear-gradient(180deg,#7b828a 0 4px,#3a4047 4px 8px)',
            }}
          />
        ))}
      </div>

      <div className="anim-sway-slow">
        <div
          className="grain relative rounded-[2px] px-4 py-4"
          style={{
            background: 'linear-gradient(170deg,#1f2a33 0%,#161d24 100%)',
            boxShadow:
              'inset 0 0 0 2px rgba(232,230,225,.10), inset 0 1px 0 rgba(255,255,255,.08), 0 16px 34px rgba(0,0,0,.6)',
          }}
        >
          <Screw className="left-2 top-2" />
          <Screw className="right-2 top-2" />
          <Screw className="bottom-2 left-2" />
          <Screw className="bottom-2 right-2" />

          <p
            className="sign-type mb-3 text-center text-[10px] leading-relaxed"
            style={{ color: 'var(--chalk-dim)' }}
          >
            If not in shop,
            <br />
            you can find me at
          </p>

          <div
            className="mx-auto mb-3 h-px w-10"
            style={{ background: 'var(--orange)' }}
          />

          <ul className="space-y-[2px]">
            {hobbies.map((h, i) => {
              const on = active === i
              return (
                <li key={h.place}>
                  <button
                    className="cur-md w-full px-2 py-[5px] text-left transition-colors duration-150"
                    style={{ background: on ? 'rgba(255,107,26,.12)' : 'transparent' }}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(on ? null : i)}
                    aria-expanded={on}
                  >
                    <span
                      className="sign-type block text-[12px] transition-colors duration-150"
                      style={{ color: on ? 'var(--orange)' : 'var(--chalk)' }}
                    >
                      {h.place}
                    </span>
                    <span
                      className="grid transition-all duration-300 ease-out"
                      style={{
                        gridTemplateRows: on ? '1fr' : '0fr',
                        opacity: on ? 1 : 0,
                      }}
                    >
                      <span className="overflow-hidden">
                        <span
                          className="block pt-1 text-[11px] leading-snug"
                          style={{ color: 'var(--chalk-dim)' }}
                        >
                          {h.note}
                        </span>
                      </span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
