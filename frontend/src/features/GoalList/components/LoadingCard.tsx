export function LoadingCard() {
  return (
    <div className="h-[280px] animate-pulse rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-7">
      <div className="h-6 w-32 rounded-full bg-[var(--accent-bg)]" />
      <div className="mt-10 h-8 w-3/4 rounded-lg bg-[var(--accent-bg)]" />
      <div className="mt-4 h-4 w-full rounded bg-[var(--accent-bg)]" />
      <div className="mt-2 h-4 w-2/3 rounded bg-[var(--accent-bg)]" />
      <div className="mt-12 h-px bg-[var(--border)]" />
    </div>
  )
}
