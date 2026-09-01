import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Loader from './components/Loader'
import Exterior from './components/Exterior'
import ShopFloor from './components/ShopFloor'
import SectionPage, { ORDER } from './components/SectionPage'
import { prefersReducedMotion } from './lib/motion'

const VISITED_KEY = 'shop:visited'

function ExteriorRoute({ openHobbies }) {
  const navigate = useNavigate()
  // No zone means the door was used: land on the shop floor.
  // A zone means the visitor took the shortcut from the plan outside.
  return (
    <Exterior
      onEnter={(zone) => navigate(zone ? '/' + zone : '/shop')}
      openHobbies={openHobbies}
    />
  )
}

export default function App() {
  // The arrival sequence runs once per session, and only at the front door.
  // Deep links and reduced-motion skip it entirely.
  const [booting, setBooting] = useState(() => {
    if (window.location.pathname !== '/') return false
    let visited = false
    try {
      visited = sessionStorage.getItem(VISITED_KEY) === '1'
    } catch {
      /* private mode — treat as first visit */
    }
    return !(visited || prefersReducedMotion())
  })

  useEffect(() => {
    try {
      sessionStorage.setItem(VISITED_KEY, '1')
    } catch {
      /* ignore */
    }
  }, [])

  if (booting) return <Loader onDone={() => setBooting(false)} />

  return (
    <Routes>
      <Route path="/" element={<ExteriorRoute />} />
      <Route path="/hobbies" element={<ExteriorRoute openHobbies />} />
      <Route path="/shop" element={<ShopFloor />} />
      {ORDER.map((id) => (
        <Route key={id} path={'/' + id} element={<SectionPage id={id} />} />
      ))}
      <Route path="*" element={<Navigate to="/shop" replace />} />
    </Routes>
  )
}
