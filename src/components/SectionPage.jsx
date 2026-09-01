import { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Nav from './Nav'
import Altimeter from './Altimeter'
import SectionPlate from './SectionPlate'
import BuildBay from './BuildBay'
import ToolWall from './ToolWall'
import WorkOrder from './WorkOrder'
import { AboutSection, EducationSection, ExperienceSection } from './Office'
import { contact, identity } from '../data/content'

export const PAGES = {
  projects: {
    no: '01', title: 'Build Bay', sub: 'SAE Aero Design · selected work',
    tone: 'cool', width: 'max-w-6xl', Body: BuildBay,
  },
  skills: {
    no: '02', title: 'Tool Wall', sub: 'Skills & capability',
    tone: 'cool', width: 'max-w-5xl', Body: ToolWall,
  },
  experience: {
    no: '03', title: 'Experience', sub: 'On the office wall',
    tone: 'warm', width: 'max-w-6xl', Body: ExperienceSection,
  },
  education: {
    no: '04', title: 'Education', sub: 'Framed, above the desk',
    tone: 'warm', width: 'max-w-6xl', Body: EducationSection,
  },
  about: {
    no: '05', title: 'About', sub: 'On the clipboard by the desk',
    tone: 'warm', width: 'max-w-6xl', Body: AboutSection,
  },
  contact: {
    no: '06', title: 'Front Desk', sub: 'Raise a work order',
    tone: 'cool', width: 'max-w-6xl', Body: WorkOrder,
  },
}

export const ORDER = ['projects', 'skills', 'experience', 'education', 'about', 'contact']

const TONE = {
  cool: {
    bg: 'linear-gradient(180deg,#1a1d21 0%,#15181c 55%,#0e1013 100%)',
    pool:
      'radial-gradient(ellipse 50% 28% at 50% 0%, rgba(143,184,216,.14), transparent 70%)',
  },
  warm: {
    bg: 'linear-gradient(180deg,#211e1c 0%,#1a1816 55%,#141311 100%)',
    pool:
      'radial-gradient(ellipse 48% 26% at 50% 0%, rgba(255,184,112,.15), transparent 70%)',
  },
}

export default function SectionPage({ id }) {
  const navigate = useNavigate()
  const page = PAGES[id]

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (!page) return <Navigate to="/shop" replace />

  const { Body, tone, width } = page
  const i = ORDER.indexOf(id)
  const prev = ORDER[(i - 1 + ORDER.length) % ORDER.length]
  const next = ORDER[(i + 1) % ORDER.length]

  return (
    <div className="grain relative min-h-screen" style={{ background: TONE[tone].bg }}>
      <Nav active={id} />
      <Altimeter />

      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[60vh]"
        style={{ background: TONE[tone].pool }}
      />

      <main className={`relative mx-auto ${width} px-5 pb-24 pt-16 sm:px-8`}>
        <SectionPlate no={page.no} title={page.title} sub={page.sub} />
        <div className="mt-12">
          <Body />
        </div>

        {/* Walk to the next area */}
        <nav className="mt-20 flex items-center justify-between gap-4 border-t pt-6"
          style={{ borderColor: 'rgba(255,255,255,.09)' }}>
          <button
            onClick={() => navigate('/' + prev)}
            className="cur-md sign-type text-left text-[11px] transition-colors hover:text-[color:var(--orange)]"
            style={{ color: 'var(--chalk-dim)' }}
          >
            <span className="tech-type block text-[9px]" style={{ color: 'var(--chalk-faint)' }}>
              PREVIOUS
            </span>
            ← {PAGES[prev].title}
          </button>

          <button
            onClick={() => navigate('/shop')}
            className="cur-lg sign-type shrink-0 border px-4 py-2 text-[10px] transition-colors"
            style={{ borderColor: 'rgba(255,255,255,.18)', color: 'var(--chalk)' }}
          >
            Shop floor
          </button>

          <button
            onClick={() => navigate('/' + next)}
            className="cur-md sign-type text-right text-[11px] transition-colors hover:text-[color:var(--orange)]"
            style={{ color: 'var(--chalk-dim)' }}
          >
            <span className="tech-type block text-[9px]" style={{ color: 'var(--chalk-faint)' }}>
              NEXT
            </span>
            {PAGES[next].title} →
          </button>
        </nav>
      </main>

      <footer
        className="relative border-t px-5 py-10 text-center sm:px-8"
        style={{ borderColor: 'rgba(255,255,255,.08)' }}
      >
        <p className="sign-type text-[11px]" style={{ color: 'var(--chalk-dim)' }}>
          {identity.first} {identity.last} · {identity.discipline}
        </p>
        <div className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-2">
          <a
            className="tech-type text-[10px] transition-colors hover:text-[color:var(--orange)]"
            style={{ color: 'var(--chalk-faint)' }}
            href={contact.linkedin} target="_blank" rel="noreferrer noopener"
          >
            LINKEDIN
          </a>
          <a
            className="tech-type text-[10px] transition-colors hover:text-[color:var(--orange)]"
            style={{ color: 'var(--chalk-faint)' }}
            href={`mailto:${contact.email}`}
          >
            EMAIL
          </a>
          <button
            className="tech-type text-[10px] transition-colors hover:text-[color:var(--orange)]"
            style={{ color: 'var(--chalk-faint)' }}
            onClick={() => navigate('/')}
          >
            BACK OUTSIDE
          </button>
        </div>
      </footer>
    </div>
  )
}
