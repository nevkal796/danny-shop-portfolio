export default function SectionPlate({ no, title, sub }) {
  return (
    <div className="flex items-end gap-4">
      <div
        className="plate grain relative rounded-[2px] px-4 py-3 sm:px-6 sm:py-4"
        style={{ minWidth: 72 }}
      >
        <span
          className="sign-type block text-2xl leading-none sm:text-3xl"
          style={{ color: 'var(--orange)' }}
        >
          {no}
        </span>
      </div>

      <div className="pb-1">
        <h2
          className="sign-type text-2xl leading-none sm:text-4xl"
          style={{ color: 'var(--chalk)' }}
        >
          {title}
        </h2>
        <p
          className="tech-type mt-2 text-[10px]"
          style={{ color: 'var(--chalk-faint)' }}
        >
          {sub}
        </p>
      </div>

      <span
        className="mb-3 hidden h-px flex-1 sm:block"
        style={{ background: 'rgba(255,255,255,.10)' }}
      />
    </div>
  )
}
