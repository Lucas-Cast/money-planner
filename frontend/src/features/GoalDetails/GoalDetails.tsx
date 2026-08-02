import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AllocationCard } from './components/AllocationCard'
import { AllocationForm } from './components/AllocationForm'
import { Modal } from '@/shared/components/modal'
import { ConfirmDeleteModal } from '@/shared/components/confirm-delete-modal'
import { routes } from '@/shared/config/routes'
import { useGet } from '@/shared/hooks/use-get'
import { useDelete } from '@/shared/hooks/use-delete'
import type { Allocation } from '@/shared/models/allocation'
import type { Goal, GoalMetrics } from '@/shared/models/goal'
import { formatCurrency } from '@/shared/utils/allocation'

type GoalTab = 'overview' | 'allocations'

function formatDate(value: string) {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? 'Prazo não definido' : new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(date)
}

function formatPercentage(value: number) {
  return `${new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1 }).format(value)}%`
}

export function GoalDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const goalId = Number(id)
  const [activeTab, setActiveTab] = useState<GoalTab>('allocations')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [allocationToDelete, setAllocationToDelete] = useState<Allocation | null>(null)
  const [allocationToEdit, setAllocationToEdit] = useState<Allocation | null>(null)
  const { data: goal, error: goalError, loading: goalLoading, get: getGoal } = useGet<Goal>()
  const { data: metrics, error: metricsError, loading: metricsLoading, get: getMetrics } = useGet<GoalMetrics>()
  const { data: allocations, error: allocationsError, loading: allocationsLoading, get: getAllocations } = useGet<Allocation[]>()
  const { remove: deleteAllocation, loading: deletingAllocation, error: deleteAllocationError } = useDelete()

  const loadData = useCallback(() => {
    if (!Number.isInteger(goalId) || goalId <= 0) return
    getGoal(routes.goals.getById(goalId)).catch(() => undefined)
    getMetrics(routes.goals.metrics(goalId)).catch(() => undefined)
    getAllocations(routes.allocations.listByGoal(goalId)).catch(() => undefined)
  }, [getAllocations, getGoal, getMetrics, goalId])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleAllocationCreated = () => {
    setIsModalOpen(false)
    getAllocations(routes.allocations.listByGoal(goalId)).catch(() => undefined)
    getMetrics(routes.goals.metrics(goalId)).catch(() => undefined)
  }

  const handleAllocationUpdated = () => {
    setAllocationToEdit(null)
    getAllocations(routes.allocations.listByGoal(goalId)).catch(() => undefined)
    getMetrics(routes.goals.metrics(goalId)).catch(() => undefined)
  }

  const handleDeleteAllocation = async () => {
    if (!allocationToDelete) return
    try {
      await deleteAllocation(routes.allocations.delete(allocationToDelete.id))
      setAllocationToDelete(null)
      getAllocations(routes.allocations.listByGoal(goalId)).catch(() => undefined)
      getMetrics(routes.goals.metrics(goalId)).catch(() => undefined)
    } catch {
      // O hook mantém o erro para ser exibido no modal de confirmação.
    }
  }

  if (goalLoading && !goal) {
    return <main className="min-h-screen bg-[var(--bg)] p-6 text-[var(--text)] sm:p-12">Carregando meta...</main>
  }

  if (!goal || goalError || !Number.isInteger(goalId) || goalId <= 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--bg)] p-6 text-center">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--text-h)]">Meta não encontrada</h1>
          <button type="button" onClick={() => navigate('/')} className="mt-5 rounded-full bg-[var(--text-h)] px-5 py-3 text-sm font-semibold text-[var(--bg)]">Voltar para minhas metas</button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[var(--bg)] px-5 py-8 text-left sm:px-8 sm:py-12 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <button type="button" onClick={() => navigate('/')} className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--text)] transition hover:text-[var(--text-h)]">
          <span aria-hidden="true">←</span> Minhas metas
        </button>

        <header className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
          <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(360px,520px)] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text)]">Meta financeira</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-[var(--text-h)] sm:text-4xl">{goal.title}</h1>
              <p className="mt-3 max-w-2xl leading-7 text-[var(--text)]">{goal.description}</p>
            </div>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <div className="rounded-2xl bg-[var(--accent-bg)] px-4 py-3 lg:text-right">
                  <p className="text-xs text-[var(--text)]">Valor da meta</p>
                  <p className="mt-1 text-sm font-semibold text-[var(--text-h)]">{formatCurrency(goal.targetValue)}</p>
                </div>
                <div className="rounded-2xl bg-[var(--accent-bg)] px-4 py-3 lg:text-right">
                  <p className="text-xs text-[var(--text)]">Prazo</p>
                  <p className="mt-1 text-sm font-semibold text-[var(--text-h)]">{formatDate(goal.targetDate)}</p>
                </div>
              </div>
              {metricsLoading && !metrics ? (
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--accent-bg)] p-4">
                  <div className="h-4 w-32 animate-pulse rounded-full bg-[var(--border)]" />
                  <div className="mt-4 h-2 animate-pulse rounded-full bg-[var(--border)]" />
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="h-14 animate-pulse rounded-xl bg-[var(--border)]" />
                    <div className="h-14 animate-pulse rounded-xl bg-[var(--border)]" />
                  </div>
                </div>
              ) : null}
              {metrics && !metricsError ? (
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--accent-bg)] p-4">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs text-[var(--text)]">Completude</p>
                      <p className="mt-1 text-2xl font-semibold text-[var(--text-h)]">{formatPercentage(metrics.completionPercentage)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-[var(--text)]">Falta</p>
                      <p className="mt-1 text-sm font-semibold text-[var(--text-h)]">{formatPercentage(metrics.missingPercentage)}</p>
                    </div>
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-[var(--surface)]">
                    <div className="h-full rounded-full bg-[var(--text-h)] transition-all" style={{ width: `${metrics.completionPercentage}%` }} />
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div>
                      <p className="text-xs text-[var(--text)]">Alocado</p>
                      <p className="mt-1 text-sm font-semibold text-[var(--text-h)]">{formatCurrency(metrics.totalAllocated)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[var(--text)]">Restante</p>
                      <p className="mt-1 text-sm font-semibold text-[var(--text-h)]">{formatCurrency(metrics.remainingValue)}</p>
                    </div>
                  </div>
                </div>
              ) : null}
              {metricsError ? <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-950 dark:bg-red-950/30 dark:text-red-300">Não foi possível carregar as métricas.</p> : null}
            </div>
          </div>

          <div className="mt-8 flex w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--accent-bg)] p-1.5 shadow-inner" role="tablist" aria-label="Seções da meta">
            {(['allocations', 'overview'] as const).map((tab) => (
              <button key={tab} type="button" role="tab" aria-selected={activeTab === tab} onClick={() => setActiveTab(tab)} className={`flex-1 rounded-xl border px-4 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--text-h)] ${activeTab === tab ? 'border-[var(--text-h)] bg-transparent text-[var(--text-h)]' : 'border-transparent text-[var(--text)] hover:border-[var(--border)] hover:bg-[var(--surface)] hover:text-[var(--text-h)]'}`}>
                {tab === 'allocations' ? 'Alocações' : 'Visão geral'}
              </button>
            ))}
          </div>
        </header>

        {activeTab === 'overview' ? (
          <section className="mt-6 rounded-3xl border border-dashed border-[var(--border)] bg-[var(--surface)] px-6 py-20 text-center sm:py-28">
            <span className="inline-flex rounded-full bg-[var(--accent-bg)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text)]">Em breve</span>
            <h2 className="mt-5 text-2xl font-semibold text-[var(--text-h)]">A visão geral está sendo preparada</h2>
            <p className="mx-auto mt-3 max-w-lg leading-7 text-[var(--text)]">Quando os endpoints de dashboard estiverem disponíveis, você poderá acompanhar o progresso e a distribuição dessa meta por aqui.</p>
          </section>
        ) : (
          <section className="mt-6">
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-[var(--text-h)]">Alocações</h2>
                <p className="mt-1 text-sm text-[var(--text)]">Investimentos vinculados a esta meta.</p>
              </div>
              <button type="button" onClick={() => setIsModalOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--text-h)] px-5 py-3 text-sm font-semibold text-[var(--bg)] transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--text-h)]">
                <span className="text-lg leading-none">+</span> Nova alocação
              </button>
            </div>

            {allocationsLoading && !allocations ? <p className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center text-sm text-[var(--text)]">Carregando alocações...</p> : null}
            {Boolean(allocationsError) && <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-950 dark:bg-red-950/30"><p className="text-sm text-red-700 dark:text-red-300">Não foi possível carregar as alocações.</p><button type="button" onClick={() => getAllocations(routes.allocations.listByGoal(goalId)).catch(() => undefined)} className="mt-4 text-sm font-semibold text-red-700 underline dark:text-red-300">Tentar novamente</button></div>}
            {!allocationsLoading && !allocationsError && !allocations?.length && <div className="rounded-3xl border border-dashed border-[var(--border)] bg-[var(--surface)] px-6 py-16 text-center"><h3 className="text-lg font-semibold text-[var(--text-h)]">Nenhuma alocação ainda</h3><p className="mt-2 text-sm text-[var(--text)]">Adicione o primeiro investimento vinculado a esta meta.</p></div>}
            {!!allocations?.length && <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{allocations.map((allocation) => <AllocationCard key={allocation.id} allocation={allocation} onDelete={setAllocationToDelete} onEdit={setAllocationToEdit} />)}</div>}
          </section>
        )}
      </div>

      <Modal open={isModalOpen} title="Nova alocação" onClose={() => setIsModalOpen(false)}>
        <AllocationForm goalId={goalId} onCreated={handleAllocationCreated} />
      </Modal>
      <Modal open={Boolean(allocationToEdit)} title="Editar alocação" onClose={() => setAllocationToEdit(null)}>
        {allocationToEdit && <AllocationForm goalId={goalId} allocation={allocationToEdit} onCreated={handleAllocationUpdated} />}
      </Modal>
      <ConfirmDeleteModal
        open={Boolean(allocationToDelete)}
        itemName={allocationToDelete?.label ?? 'esta alocação'}
        loading={deletingAllocation}
        error={Boolean(deleteAllocationError)}
        onClose={() => setAllocationToDelete(null)}
        onConfirm={handleDeleteAllocation}
      />
    </main>
  )
}
