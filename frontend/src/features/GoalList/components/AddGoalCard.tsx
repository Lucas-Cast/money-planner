type AddGoalCardProps = {
  onClick: () => void
}

export function AddGoalCard({ onClick }: AddGoalCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex min-h-[280px] flex-col items-center justify-center rounded-3xl border border-dashed border-[var(--border)] bg-[var(--surface)] p-6 text-center transition duration-300 hover:-translate-y-1 hover:border-[var(--text)] hover:bg-[var(--accent-bg)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--text-h)] sm:p-7"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent-bg)] text-[var(--text-h)] transition group-hover:scale-105">
        <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 5v14m7-7H5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </span>
      <span className="mt-5 text-lg font-semibold text-[var(--text-h)]">Adicionar meta</span>
      <span className="mt-2 max-w-[220px] text-sm leading-6 text-[var(--text)]">
        Defina um novo objetivo para acompanhar sua evolução.
      </span>
    </button>
  )
}
