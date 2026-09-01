import { useNavigate } from 'react-router-dom'
import { contact } from '../data/content'

const LINKS = [
  ['projects', 'Projects'],
  ['skills', 'Skills'],
  ['experience', 'Experience'],
  ['education', 'Education'],
  ['about', 'About'],
  ['contact', 'Contact'],
]

export default function Nav({ active }) {
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-40 pt-2">
      {/* Two short chains, so it reads as hung rather than docked */}
      <div className="pointer-events-none mx-auto flex max-w-3xl justify-between px-16">
        {[0, 1].map((i) => (
          <span
            key={i}
            className="block w-[3px]"
            style={{
              height: 10,
              background:
                'repeating-linear-gradient(180deg,#7b828a 0 3px,#3a4047 3px 6px)',
            }}
          />
        ))}
      </div>

      <nav
        className="plate grain mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-[2px] px-3 py-2 sm:px-5"
        style={{ backdropFilter: 'blur(6px)' }}
      >
        <button
          onClick={() => navigate('/shop')}
          className="cur-md sign-type shrink-0 text-[11px] transition-colors hover:text-[color:var(--orange)]"
          style={{ color: 'var(--chalk)' }}
          title="Back to the shop floor"
        >
          ← Shop floor
        </button>

        <ul className="flex flex-1 flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:gap-x-5">
          {LINKS.map(([id, label]) => (
            <li key={id}>
              <button
                onClick={() => navigate('/' + id)}
                className="cur-md sign-type relative py-1 text-[10px] transition-colors sm:text-[11px]"
                style={{
                  color: active === id ? 'var(--orange)' : 'var(--chalk-dim)',
                }}
              >
                {label}
                <span
                  className="absolute -bottom-[1px] left-0 h-[2px] w-full transition-transform duration-200"
                  style={{
                    background: 'var(--orange)',
                    transform: active === id ? 'scaleX(1)' : 'scaleX(0)',
                  }}
                />
              </button>
            </li>
          ))}
        </ul>

        <a
          href={contact.resumeHref}
          download={contact.resumeFilename}
          className="cur-lg sign-type shrink-0 rounded-[2px] px-3 py-[6px] text-[10px] transition-transform duration-150 hover:-translate-y-[1px]"
          style={{ background: 'var(--orange)', color: 'var(--steel)' }}
        >
          Résumé ↓
        </a>
      </nav>
    </header>
  )
}
