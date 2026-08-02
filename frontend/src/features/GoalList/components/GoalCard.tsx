import type { Goal } from '@/shared/models/goal'

type GoalCardProps = {
  goal: Goal
  onOpen?: (goal: Goal) => void
  detailsPath?: string
}

function formatDate(date: string) {
  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) {
    return 'Prazo não definido'
  }

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(parsedDate)
}

export function GoalCard({ goal, onOpen, detailsPath }: GoalCardProps) {
  const handleOpen = () => {
    if (onOpen) {
      onOpen(goal)
      return
    }

    window.location.assign(detailsPath ?? `/goals/${goal.id}`)
  }

  return (
    <article className="group flex min-h-[280px] flex-col overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[var(--accent-border)] hover:shadow-[0_18px_42px_rgba(15,23,42,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_18px_42px_rgba(0,0,0,0.35)] sm:p-7">
      <div className="mb-7 flex items-start justify-between gap-4">
        <span className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-bg)] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--accent)]">
          <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
          Meta financeira
        </span>

        <span className="shrink-0 text-xs font-medium text-[var(--text)]">
          #{goal.id}
        </span>
      </div>

      <div className="flex-1">
        <h2 className="line-clamp-2 text-2xl font-semibold tracking-[-0.03em] text-[var(--text-h)] sm:text-[1.7rem]">
          {goal.title}
        </h2>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-[var(--text)] sm:text-[0.95rem]">
          {goal.description || 'Essa meta ainda não possui uma descrição.'}
        </p>
      </div>

      <div className="mt-7 flex items-end justify-between gap-4 border-t border-[var(--border)] pt-5">
        <div>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-[var(--text)]">
            Prazo
          </p>
          <p className="mt-1 text-sm font-medium text-[var(--text-h)]">
            {formatDate(goal.targetDate)}
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpen}
          aria-label={`Abrir detalhes da meta ${goal.title}`}
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[var(--text-h)] px-4 py-2.5 text-sm font-semibold text-[var(--bg)] transition hover:gap-3 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--text-h)]"
        >
          Ver detalhes
          <svg
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3.333 8h9.334m-4-3.333L12 8l-3.333 3.333"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </article>
  )
}
