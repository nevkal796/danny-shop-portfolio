import { useState } from 'react'
import BlueprintCard from './BlueprintCard'
import ExplodedView from './ExplodedView'
import { projects } from '../data/content'

export default function BuildBay() {
  const [openProject, setOpenProject] = useState(null)

  return (
    <>
      {/* Drafting surface */}
      <div
        className="grain rounded-[3px] p-4 sm:p-7"
        style={{
          background: 'linear-gradient(180deg,#1e2227 0%,#171a1e 100%)',
          boxShadow:
            'inset 0 1px 0 rgba(255,255,255,.05), 0 20px 50px rgba(0,0,0,.5)',
        }}
      >
        <div className="grid gap-5 lg:grid-cols-2">
          {projects.map((p, i) => (
            <div key={p.id} className={i === 0 ? 'lg:col-span-2' : ''}>
              <BlueprintCard project={p} onOpen={setOpenProject} />
            </div>
          ))}
        </div>
      </div>

      {openProject && (
        <ExplodedView
          project={openProject}
          onClose={() => setOpenProject(null)}
        />
      )}
    </>
  )
}
