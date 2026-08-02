import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { GoalList } from './features/GoalList/GoalList'
import { GoalDetails } from './features/GoalDetails/GoalDetails'

function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] px-5 py-8 text-left sm:px-8 sm:py-12 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text)]">Finanças pessoais</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-[var(--text-h)] sm:text-5xl">Minhas metas</h1>
            <p className="mt-3 max-w-xl text-base leading-7 text-[var(--text)]">
              Organize seus objetivos e acompanhe cada passo rumo ao que importa.
            </p>
          </div>
          <div className="hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-right sm:block">
            <p className="text-xs font-medium text-[var(--text)]">Visão geral</p>
            <p className="mt-1 text-sm font-semibold text-[var(--text-h)]">Acompanhe seu progresso</p>
          </div>
        </header>

        <GoalList />
      </div>
    </main>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/goals/:id" element={<GoalDetails />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
