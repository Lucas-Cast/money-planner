import type { Goal } from '@/shared/models/goal'
import { useNavigate } from 'react-router-dom'

type GoalCardProps = {
  goal: Goal
  onOpen?: (goal: Goal) => void
  onDelete?: (goal: Goal) => void
  onEdit?: (goal: Goal) => void
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

export function GoalCard({ goal, onOpen, onDelete, onEdit, detailsPath }: GoalCardProps) {
  const navigate = useNavigate()

  const handleOpen = () => {
    if (onOpen) {
      onOpen(goal)
      return
    }

    navigate(detailsPath ?? `/goals/${goal.id}`)
  }

  return (
    <article className="group flex min-h-[280px] flex-col overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[var(--accent-border)] hover:shadow-[0_18px_42px_rgba(15,23,42,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_18px_42px_rgba(0,0,0,0.35)] sm:p-7">
      <div className="mb-7 flex items-start justify-between gap-4">
        <span className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-bg)] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--accent)]">
          <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
          Meta financeira
        </span>

        <div className="flex flex-col items-center gap-1">
          {onDelete && (
            <button type="button" onClick={() => onDelete(goal)} aria-label={`Excluir a meta ${goal.title}`} className="rounded-xl p-2 text-red-500 transition hover:bg-red-50 hover:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 dark:hover:bg-red-950/30">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 7h16m-10 4v6m4-6v6M9 7V4h6v3m-9 0 1 13h10l1-13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          )}
          {onEdit && (
            <button type="button" onClick={() => onEdit(goal)} aria-label={`Editar a meta ${goal.title}`} className="rounded-xl p-2 text-[var(--text)] transition hover:bg-[var(--accent-bg)] hover:text-[var(--text-h)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--text-h)]">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m4 16.5-.75 3.25L6.5 19l10.9-10.9a2.12 2.12 0 0 0-3-3L3.5 16.1M13 6l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          )}
        </div>
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
