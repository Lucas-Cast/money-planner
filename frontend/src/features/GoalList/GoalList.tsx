import { useCallback, useEffect, useState } from 'react'
import { AddGoalCard } from './components/AddGoalCard'
import { GoalCard } from './components/GoalCard'
import { GoalForm } from './components/GoalForm'
import { LoadingCard } from './components/LoadingCard'
import { Modal } from '@/shared/components/modal'
import { routes } from '@/shared/config/routes'
import { useGet } from '@/shared/hooks/use-get'
import type { Goal } from '@/shared/models/goal'

export function GoalList() {
  const { data: goals, error, loading, get } = useGet<Goal[]>()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const loadGoals = useCallback(() => {
    get(routes.goals.list).catch(() => undefined)
  }, [get])

  const handleGoalCreated = () => {
    setIsModalOpen(false)
    loadGoals()
  }

  useEffect(() => {
    loadGoals()
  }, [loadGoals])

  if (loading && !goals) {
    return (
      <section aria-label="Carregando metas" className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
      </section>
    )
  }

  if (error) {
    return (
      <section className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-950 dark:bg-red-950/30">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-300">
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 8v4m0 4h.01M10.3 3.84 2.5 17.5A2 2 0 0 0 4.23 20.5h15.54a2 2 0 0 0 1.73-3L13.7 3.84a2 2 0 0 0-3.4 0Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="mt-4 text-xl font-semibold text-[var(--text-h)]">Não foi possível carregar suas metas</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--text)]">
          Verifique se a API está disponível e tente novamente.
        </p>
        <button
          type="button"
          onClick={loadGoals}
          className="mt-6 rounded-full bg-[var(--text-h)] px-5 py-2.5 text-sm font-semibold text-[var(--bg)] transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--text-h)]"
        >
          Tentar novamente
        </button>
      </section>
    )
  }

  if (!goals?.length) {
    return (
      <>
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-3xl border border-dashed border-[var(--border)] bg-[var(--surface)] px-6 py-14 text-center md:col-span-2 xl:col-span-2">
            <h2 className="text-xl font-semibold text-[var(--text-h)]">Você ainda não tem metas</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--text)]">
              Crie sua primeira meta financeira para começar a acompanhar seu progresso.
            </p>
          </div>
          <AddGoalCard onClick={() => setIsModalOpen(true)} />
        </section>
        <Modal open={isModalOpen} title="Adicionar meta" onClose={() => setIsModalOpen(false)}>
          <GoalForm onCreated={handleGoalCreated} />
        </Modal>
      </>
    )
  }

  return (
    <section aria-label="Suas metas" className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {goals.map((goal) => (
        <GoalCard key={goal.id} goal={goal} />
      ))}
      <AddGoalCard onClick={() => setIsModalOpen(true)} />
      <Modal open={isModalOpen} title="Adicionar meta" onClose={() => setIsModalOpen(false)}>
        <GoalForm onCreated={handleGoalCreated} />
      </Modal>
    </section>
  )
}
