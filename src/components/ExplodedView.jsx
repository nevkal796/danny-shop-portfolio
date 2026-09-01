import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// Assembly axis in the 420×320 drawing space.
const A = [62, 274]
const B = [380, 62]
const ANGLE = (Math.atan2(B[1] - A[1], B[0] - A[0]) * 180) / Math.PI // ≈ -32.7°
const PERP = (() => {
  const dx = B[0] - A[0]
  const dy = B[1] - A[1]
  const n = Math.hypot(dx, dy)
  return [-dy / n, dx / n]
})()

export default function ExplodedView({ project, onClose }) {
  const [open, setOpen] = useState(false)
  const closeRef = useRef(null)

  useEffect(() => {
    const id = requestAnimationFrame(() => setOpen(true))
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    return () => {
      cancelAnimationFrame(id)
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const parts = useMemo(() => {
    const n = project.parts.length
    const mid = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2]
    return project.parts.map((p, i) => {
      const t = n === 1 ? 0.5 : i / (n - 1)
      const pos = [A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t]
      const side = i % 2 === 0 ? 1 : -1
      const balloon = [pos[0] + PERP[0] * 58 * side, pos[1] + PERP[1] * 58 * side]
      return {
        ...p,
        pos,
        mid,
        balloon,
        // Kept short enough that a clear gap opens between components —
        // otherwise the assembly reads as one continuous bar.
        w: 36 + (i % 3) * 9,
        h: 22 + (i % 2) * 6,
        side,
      }
    })
  }, [project])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        style={{ background: 'rgba(5,7,10,.86)', backdropFilter: 'blur(3px)' }}
      >
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} exploded view`}
          onClick={(e) => e.stopPropagation()}
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.26, ease: [0.2, 0.7, 0.3, 1] }}
          className="blueprint-paper grain relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-[2px] p-5 sm:p-8"
          style={{ boxShadow: '0 40px 100px rgba(0,0,0,.7)' }}
        >
          <button
            ref={closeRef}
            onClick={onClose}
            className="cur-md tech-type absolute right-4 top-4 border px-2 py-1 text-[10px]"
            style={{ color: 'var(--cyan)', borderColor: 'rgba(127,178,217,.4)' }}
          >
            Close ✕
          </button>

          <p className="tech-type text-[10px]" style={{ color: 'var(--cyan)' }}>
            {project.no} · EXPLODED ASSEMBLY · SHEET 2 OF 2
          </p>
          <h3
            className="sign-type mt-1 max-w-[80%] text-xl sm:text-2xl"
            style={{ color: 'var(--chalk)' }}
          >
            {project.title}
          </h3>

          <div className="mt-5 grid gap-6 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
            {/* Drawing */}
            <svg viewBox="0 0 420 320" className="w-full" aria-hidden="true">
              {/* Assembly axis, dash-dot as per drawing convention */}
              <line
                x1={A[0] - 26} y1={A[1] + 17} x2={B[0] + 26} y2={B[1] - 17}
                stroke="var(--cyan)" strokeOpacity=".45" strokeWidth="1"
                strokeDasharray="14 4 2 4"
              />

              {parts.map((p, i) => {
                const tx = open ? p.pos[0] : p.mid[0]
                const ty = open ? p.pos[1] : p.mid[1]
                const delay = i * 70
                return (
                  <g key={p.n}>
                    {/* Leader line to the balloon */}
                    <line
                      x1={p.pos[0]} y1={p.pos[1]}
                      x2={p.balloon[0]} y2={p.balloon[1]}
                      stroke="var(--cyan)" strokeOpacity=".5" strokeWidth=".9"
                      style={{
                        opacity: open ? 1 : 0,
                        transition: `opacity 200ms linear ${delay + 240}ms`,
                      }}
                    />
                    <circle
                      cx={p.balloon[0]} cy={p.balloon[1]} r="11"
                      fill="var(--blueprint-deep)" stroke="var(--cyan)" strokeWidth="1"
                      style={{
                        opacity: open ? 1 : 0,
                        transition: `opacity 200ms linear ${delay + 280}ms`,
                      }}
                    />
                    <text
                      x={p.balloon[0]} y={p.balloon[1] + 3.6}
                      textAnchor="middle" fontSize="10"
                      fontFamily="'IBM Plex Mono', monospace" fill="var(--cyan)"
                      style={{
                        opacity: open ? 1 : 0,
                        transition: `opacity 200ms linear ${delay + 300}ms`,
                      }}
                    >
                      {p.n}
                    </text>

                    {/* The component itself, travelling outward */}
                    <g
                      style={{
                        transform: `translate(${tx}px, ${ty}px) rotate(${ANGLE}deg)`,
                        transition: `transform 520ms cubic-bezier(.25,.8,.35,1) ${delay}ms`,
                      }}
                    >
                      <rect
                        x={-p.w / 2} y={-p.h / 2} width={p.w} height={p.h} rx="3"
                        fill="rgba(127,178,217,.13)"
                        stroke="var(--cyan)" strokeWidth="1.2"
                      />
                      <line
                        x1={-p.w / 2 + 6} y1="0" x2={p.w / 2 - 6} y2="0"
                        stroke="var(--cyan)" strokeOpacity=".4" strokeWidth=".8"
                        strokeDasharray="3 3"
                      />
                    </g>
                  </g>
                )
              })}
            </svg>

            {/* Parts list */}
            <div>
              <p
                className="tech-type mb-2 border-b pb-2 text-[9px]"
                style={{ color: 'var(--cyan)', borderColor: 'rgba(127,178,217,.3)' }}
              >
                PARTS LIST
              </p>
              <ul>
                {project.parts.map((p, i) => (
                  <li
                    key={p.n}
                    className="flex items-center gap-3 border-b py-2 text-[12px]"
                    style={{
                      borderColor: 'rgba(127,178,217,.14)',
                      color: '#bdd0e0',
                      opacity: open ? 1 : 0,
                      transform: open ? 'none' : 'translateX(-6px)',
                      transition: `opacity 220ms linear ${i * 70 + 300}ms, transform 220ms ease-out ${
                        i * 70 + 300
                      }ms`,
                    }}
                  >
                    <span
                      className="tech-type flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[9px]"
                      style={{ borderColor: 'var(--cyan)', color: 'var(--cyan)' }}
                    >
                      {p.n}
                    </span>
                    {p.label}
                  </li>
                ))}
              </ul>

              <div
                className="tech-type mt-4 border p-3 text-[9px] leading-relaxed"
                style={{ borderColor: 'rgba(127,178,217,.3)', color: 'var(--cyan)' }}
              >
                <div style={{ opacity: 0.55 }}>MATERIALS &amp; METHODS</div>
                <div className="mt-1 normal-case tracking-normal">
                  {project.materials.join(' · ')}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
