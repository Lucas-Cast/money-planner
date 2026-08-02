import type { Allocation } from '@/shared/models/allocation'
import { allocationTypeLabels, formatCurrency } from '@/shared/utils/allocation'

function formatOptionalValue(value: number | null | undefined, suffix = '') {
  return value == null ? null : `${value.toLocaleString('pt-BR')}${suffix}`
}

export function AllocationCard({ allocation, onDelete, onEdit }: { allocation: Allocation; onDelete?: (allocation: Allocation) => void; onEdit?: (allocation: Allocation) => void }) {
  const details = [
    allocation.yieldPercent != null && {
      label: 'Rentabilidade',
      value: formatOptionalValue(allocation.yieldPercent, '%'),
    },
    allocation.entryPrice != null && {
      label: 'Preço de entrada',
      value: formatCurrency(allocation.entryPrice),
    },
    allocation.fxRate != null && {
      label: 'Taxa de câmbio',
      value: formatCurrency(allocation.fxRate),
    },
  ].filter(Boolean) as Array<{ label: string; value: string | null }>

  return (
    <article className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(15,23,42,0.09)] sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-lg font-semibold text-[var(--text-h)]">{allocation.label}</p>
          <span className="mt-2 inline-flex rounded-full bg-[var(--accent-bg)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text)]">
            {allocationTypeLabels[allocation.type]}
          </span>
        </div>
        <div className="flex items-start gap-3">
          <p className="text-right text-lg font-semibold text-[var(--text-h)]">
            {formatCurrency(allocation.amount)}
          </p>
          <div className="flex flex-col items-center gap-1">
            {onDelete && (
              <button type="button" onClick={() => onDelete(allocation)} aria-label={`Excluir a alocação ${allocation.label}`} className="rounded-xl p-2 text-red-500 transition hover:bg-red-50 hover:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 dark:hover:bg-red-950/30">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 7h16m-10 4v6m4-6v6M9 7V4h6v3m-9 0 1 13h10l1-13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            )}
            {onEdit && (
              <button type="button" onClick={() => onEdit(allocation)} aria-label={`Editar a alocação ${allocation.label}`} className="rounded-xl p-2 text-[var(--text)] transition hover:bg-[var(--accent-bg)] hover:text-[var(--text-h)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--text-h)]">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m4 16.5-.75 3.25L6.5 19l10.9-10.9a2.12 2.12 0 0 0-3-3L3.5 16.1M13 6l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {details.length > 0 && (
        <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-[var(--border)] pt-4">
          {details.map((detail) => (
            <div key={detail.label}>
              <dt className="text-xs text-[var(--text)]">{detail.label}</dt>
              <dd className="mt-1 text-sm font-medium text-[var(--text-h)]">{detail.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </article>
  )
}
