import { useState } from 'react'
import { contact } from '../data/content'

const JOB_NO = () =>
  'WO-' + String(Math.floor(Date.now() / 1000) % 100000).padStart(5, '0')

export default function WorkOrder() {
  const [job] = useState(JOB_NO)
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', body: '' })

  // No backend: this hands the message to the visitor's own mail client.
  const submit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`${job} — work requested`)
    const body = encodeURIComponent(
      `${form.body}\n\n—\n${form.name}\n${form.email}\nRef ${job}`
    )
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  const field =
    'w-full bg-transparent border-b px-1 py-2 text-[13px] outline-none transition-colors'
  const fieldStyle = {
    borderColor: 'rgba(0,0,0,.22)',
    color: '#22201d',
  }

  return (
    <div className="flex justify-center">
      <div className="relative w-full max-w-lg">
            {/* Perforated tear-off edge */}
            <div
              className="h-3 w-full"
              style={{
                background:
                  'radial-gradient(circle at 6px 0, transparent 0 4px, #efeade 4.5px) repeat-x',
                backgroundSize: '12px 12px',
              }}
            />
            <form
              onSubmit={submit}
              className="grain relative p-6 sm:p-8"
              style={{
                background: 'linear-gradient(180deg,#efeade,#e2dccd)',
                color: '#22201d',
                boxShadow: '0 22px 50px rgba(0,0,0,.55)',
              }}
            >
              <div
                className="flex items-start justify-between border-b pb-3"
                style={{ borderColor: 'rgba(0,0,0,.25)' }}
              >
                <div>
                  <p className="tech-type text-[9px]" style={{ color: '#8a5a2b' }}>
                    WORK ORDER
                  </p>
                  <p className="sign-type text-lg leading-none">{job}</p>
                </div>
                <p className="tech-type text-[9px]" style={{ color: '#5f5a52' }}>
                  COPY 1 OF 2
                </p>
              </div>

              <label className="mt-5 block">
                <span className="tech-type text-[9px]" style={{ color: '#8a5a2b' }}>
                  CUSTOMER
                </span>
                <input
                  required
                  className={field}
                  style={fieldStyle}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </label>

              <label className="mt-4 block">
                <span className="tech-type text-[9px]" style={{ color: '#8a5a2b' }}>
                  RETURN ADDRESS
                </span>
                <input
                  required
                  type="email"
                  className={field}
                  style={fieldStyle}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </label>

              <label className="mt-4 block">
                <span className="tech-type text-[9px]" style={{ color: '#8a5a2b' }}>
                  DESCRIPTION OF WORK REQUESTED
                </span>
                <textarea
                  required
                  rows={4}
                  className={field + ' resize-none'}
                  style={fieldStyle}
                  value={form.body}
                  onChange={(e) => setForm({ ...form, body: e.target.value })}
                />
              </label>

              <button
                type="submit"
                className="cur-lg sign-type mt-6 w-full rounded-[2px] py-3 text-[11px] transition-transform duration-150 hover:-translate-y-[1px]"
                style={{
                  background: 'var(--orange)',
                  color: '#1a1206',
                  boxShadow: '0 8px 20px rgba(255,107,26,.3)',
                }}
              >
                Submit work order
              </button>

              <p
                className="tech-type mt-3 text-center text-[8.5px]"
                style={{ color: '#7a746a' }}
              >
                Opens in your mail client · or write direct to {contact.email}
              </p>

              {/* RECEIVED stamp */}
              {sent && (
                <span
                  className="pointer-events-none absolute right-6 top-1/2 border-[3px] px-4 py-2"
                  style={{
                    color: '#b3261e',
                    borderColor: '#b3261e',
                    opacity: 0.85,
                    animation: 'stamp 380ms cubic-bezier(.2,1.5,.4,1) forwards',
                  }}
                >
                  <span className="sign-type text-xl">Received</span>
                </span>
              )}

              <style>{`
                @keyframes stamp {
                  0%   { transform: rotate(-26deg) scale(2.4); opacity: 0; }
                  60%  { opacity: .95; }
                  100% { transform: rotate(-13deg) scale(1);   opacity: .85; }
                }
              `}</style>
        </form>
      </div>
    </div>
  )
}
