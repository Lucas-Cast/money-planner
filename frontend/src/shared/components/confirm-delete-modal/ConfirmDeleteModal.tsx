import { Modal } from '@/shared/components/modal'

type ConfirmDeleteModalProps = {
  open: boolean
  itemName: string
  loading?: boolean
  error?: boolean
  onClose: () => void
  onConfirm: () => void | Promise<void>
}

export function ConfirmDeleteModal({ open, itemName, loading = false, error = false, onClose, onConfirm }: ConfirmDeleteModalProps) {
  return (
    <Modal open={open} title="Confirmar exclusão" onClose={onClose}>
      <div className="mt-6">
        <p className="leading-7 text-[var(--text)]">
          Tem certeza que deseja excluir <strong className="font-semibold text-[var(--text-h)]">{itemName}</strong>? Essa ação não poderá ser desfeita.
        </p>

        {error && (
          <p role="alert" className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300">
            Não foi possível excluir o item. Tente novamente.
          </p>
        )}

        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-2xl border border-[var(--border)] px-5 py-3 text-sm font-semibold text-[var(--text-h)] transition hover:bg-[var(--accent-bg)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="rounded-2xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Excluindo...' : 'Excluir'}
          </button>
        </div>
      </div>
    </Modal>
  )
}
