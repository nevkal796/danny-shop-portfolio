const PANELS = 5
const PANEL_MS = 700
const STAGGER = 70

export default function GarageDoor({ opening, onOpen }) {
  return (
    <div className="relative mx-auto w-full max-w-[420px]">
      {/* Door frame / jamb */}
      <div
        className="relative rounded-[3px] p-[6px]"
        style={{
          background: 'linear-gradient(180deg,#454b53,#22262b)',
          boxShadow:
            'inset 0 1px 0 rgba(255,255,255,.12), 0 18px 50px rgba(0,0,0,.6)',
        }}
      >
        {/* The opening itself */}
        <div
          className="relative aspect-[5/4] overflow-hidden rounded-[2px]"
          style={{ perspective: '900px', background: '#07090b' }}
        >
          {/* Interior, revealed as the panels leave */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 80% 70% at 50% 100%, rgba(255,184,112,.30), rgba(143,184,216,.10) 45%, transparent 75%)',
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-1/3"
            style={{
              background:
                'linear-gradient(180deg, transparent, rgba(255,184,112,.16))',
            }}
          />

          {/* Panels */}
          <div
            className="absolute inset-0 flex flex-col"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {Array.from({ length: PANELS }).map((_, i) => (
              <div
                key={i}
                className="relative flex-1"
                style={{
                  transformOrigin: '50% 0%',
                  background:
                    'linear-gradient(180deg,#3a4047 0%,#2d3238 18%,#262a30 82%,#1b1e23 100%)',
                  boxShadow:
                    'inset 0 1px 0 rgba(255,255,255,.10), inset 0 -2px 3px rgba(0,0,0,.6)',
                  animation: opening
                    ? `door-roll ${PANEL_MS}ms cubic-bezier(.4,0,.2,1) ${
                        i * STAGGER
                      }ms forwards`
                    : 'none',
                }}
              >
                {/* Pressed rib detail */}
                <div
                  className="absolute inset-x-[8%] inset-y-[22%] rounded-[2px]"
                  style={{
                    boxShadow:
                      'inset 0 1px 0 rgba(255,255,255,.06), inset 0 -1px 0 rgba(0,0,0,.45)',
                  }}
                />
                {/* Windows in the top panel, like a real door */}
                {i === 0 && (
                  <div className="absolute inset-x-[9%] inset-y-[26%] grid grid-cols-4 gap-[6px]">
                    {Array.from({ length: 4 }).map((_, w) => (
                      <div
                        key={w}
                        style={{
                          background:
                            'linear-gradient(150deg, rgba(143,184,216,.35), rgba(255,184,112,.18) 60%, rgba(0,0,0,.5))',
                          boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.55)',
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Handle + call to action */}
          {!opening && (
            <button
              onClick={onOpen}
              className="cur-lg group absolute bottom-[8%] left-1/2 -translate-x-1/2 px-5 py-2"
              aria-label="Open the garage door and enter the shop"
            >
              <span
                className="block h-[6px] w-24 rounded-full transition-transform duration-200 group-hover:translate-y-[2px]"
                style={{
                  background: 'linear-gradient(180deg,#6d757e,#3a4047)',
                  boxShadow:
                    'inset 0 1px 0 rgba(255,255,255,.35), 0 3px 8px rgba(0,0,0,.6)',
                }}
              />
              <span
                className="sign-type mt-3 block text-[11px] transition-colors duration-200"
                style={{ color: 'var(--chalk-dim)' }}
              >
                <span className="group-hover:text-[color:var(--orange)]">
                  Pull to enter
                </span>
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Concrete apron under the door */}
      <div
        className="mx-auto h-6 w-[108%] -translate-x-[4%] rounded-b-[2px]"
        style={{
          background: 'linear-gradient(180deg,#1e2126,#141619)',
          boxShadow: '0 14px 30px rgba(0,0,0,.7)',
        }}
      />

      <style>{`
        @keyframes door-roll {
          0%   { transform: translateY(0) rotateX(0deg);        opacity: 1; }
          70%  { opacity: .55; }
          100% { transform: translateY(-118%) rotateX(-84deg);  opacity: .06; }
        }
      `}</style>
    </div>
  )
}
