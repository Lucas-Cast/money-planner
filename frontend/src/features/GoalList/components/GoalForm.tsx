import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { DatePicker } from '@/shared/components/date-picker'
import { TextInput } from '@/shared/components/text-input'
import { routes } from '@/shared/config/routes'
import { usePost } from '@/shared/hooks/use-post'
import { usePatch } from '@/shared/hooks/use-patch'
import { formatCurrency } from '@/shared/utils/allocation'
import type { Goal } from '@/shared/models/goal'

const goalFormSchema = z.object({
  title: z.string().trim().min(1, 'Informe um título para a meta.'),
  description: z.string().trim().min(1, 'Informe uma descrição para a meta.'),
  targetDate: z.string().min(1, 'Informe uma data limite.'),
  targetValue: z.number({ message: 'Informe um valor para a meta.' }).min(0, 'O valor não pode ser negativo.'),
  monthlyContribution: z.number().min(0, 'A contribuição não pode ser negativa.').optional(),
})

type GoalFormValues = z.infer<typeof goalFormSchema>

type GoalFormProps = {
  onCreated: () => void
  goal?: Goal
}

function toDateInputValue(value: string) {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? '' : date.toISOString().slice(0, 10)
}

function estimateContributionTotal(targetDate: string, monthlyContribution?: number) {
  if (!targetDate || monthlyContribution == null || monthlyContribution <= 0) return null

  const today = new Date()
  const deadline = new Date(`${targetDate}T00:00:00`)

  if (Number.isNaN(deadline.getTime()) || deadline <= today) return null

  const monthsUntilDeadline = Math.max(
    1,
    (deadline.getFullYear() - today.getFullYear()) * 12 + deadline.getMonth() - today.getMonth(),
  )

  return monthlyContribution * monthsUntilDeadline
}

export function GoalForm({ onCreated, goal }: GoalFormProps) {
  const { post, loading: creating, error: createError } = usePost<Goal, GoalFormValues>()
  const { patch, loading: updating, error: updateError } = usePatch<Goal, GoalFormValues>()
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GoalFormValues>({
    resolver: zodResolver(goalFormSchema),
    defaultValues: {
      title: '',
      description: '',
      targetDate: '',
      targetValue: undefined,
      monthlyContribution: undefined,
    },
  })
  const targetDate = useWatch({ control, name: 'targetDate' })
  const monthlyContribution = useWatch({ control, name: 'monthlyContribution' })
  const estimatedTotal = estimateContributionTotal(targetDate, monthlyContribution)

  useEffect(() => {
    if (!goal) return
    reset({
      title: goal.title,
      description: goal.description,
      targetDate: toDateInputValue(goal.targetDate),
      targetValue: goal.targetValue,
      monthlyContribution: goal.monthlyContribution,
    })
  }, [goal, reset])

  const loading = creating || updating
  const error = createError ?? updateError

  const onSubmit = async (values: GoalFormValues) => {
    const payload = {
      ...values,
      targetDate: new Date(`${values.targetDate}T00:00:00`).toISOString(),
    }

    if (goal) {
      await patch(routes.goals.update(goal.id), payload)
    } else {
      await post(routes.goals.create, payload)
    }
    reset()
    onCreated()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-7 space-y-5">
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <TextInput {...field} label="Título" placeholder="Ex.: Reserva de emergência" errorMessage={errors.title?.message} />
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextInput {...field} label="Descrição" placeholder="Para que você está criando essa meta?" errorMessage={errors.description?.message} />
        )}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Controller
          name="targetDate"
          control={control}
          render={({ field }) => (
            <DatePicker {...field} label="Data limite" errorMessage={errors.targetDate?.message} />
          )}
        />

        <Controller
          name="targetValue"
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              value={field.value ?? ''}
              label="Valor da meta"
              type="number"
              min="0"
              step="0.01"
              inputMode="decimal"
              placeholder="0,00"
              onChange={(event) => field.onChange(event.target.value === '' ? undefined : Number(event.target.value))}
              errorMessage={errors.targetValue?.message}
            />
          )}
        />
      </div>

      <Controller
        name="monthlyContribution"
        control={control}
        render={({ field }) => (
          <TextInput
            {...field}
            value={field.value ?? ''}
            label="Contribuição mensal pretendida"
            helperMessage="Opcional. Usada apenas para exibir uma estimativa simples no prazo da meta."
            type="number"
            min="0"
            step="0.01"
            inputMode="decimal"
            placeholder="0,00"
            onChange={(event) => field.onChange(event.target.value === '' ? undefined : Number(event.target.value))}
            errorMessage={errors.monthlyContribution?.message}
          />
        )}
      />

      {estimatedTotal != null && (
        <p className="rounded-2xl bg-[var(--accent-bg)] px-4 py-3 text-sm leading-6 text-[var(--text)]">
          Mantendo essa contribuição mensal pretendida, ao final da meta você terá acumulado aproximadamente{' '}
          <strong className="font-semibold text-[var(--text-h)]">{formatCurrency(estimatedTotal)}</strong>.
        </p>
      )}

      {Boolean(error) && (
        <p role="alert" className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300">
          Não foi possível {goal ? 'atualizar' : 'criar'} a meta. Verifique os dados e tente novamente.
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-2xl bg-[var(--text-h)] px-5 py-3 text-sm font-semibold text-[var(--bg)] transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--text-h)] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? 'Salvando...' : goal ? 'Salvar alterações' : 'Criar meta'}
      </button>
    </form>
  )
}
