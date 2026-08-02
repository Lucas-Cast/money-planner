import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { DatePicker } from '@/shared/components/date-picker'
import { TextInput } from '@/shared/components/text-input'
import { routes } from '@/shared/config/routes'
import { usePost } from '@/shared/hooks/use-post'
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
}

export function GoalForm({ onCreated }: GoalFormProps) {
  const { post, loading, error } = usePost<Goal, GoalFormValues>()
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

  const onSubmit = async (values: GoalFormValues) => {
    await post(routes.goals.create, {
      ...values,
      targetDate: new Date(`${values.targetDate}T00:00:00`).toISOString(),
    })
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
            label="Contribuição mensal"
            helperMessage="Opcional: quanto você pretende investir por mês?"
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

      {Boolean(error) && (
        <p role="alert" className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300">
          Não foi possível criar a meta. Verifique os dados e tente novamente.
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-2xl bg-[var(--text-h)] px-5 py-3 text-sm font-semibold text-[var(--bg)] transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--text-h)] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? 'Salvando...' : 'Criar meta'}
      </button>
    </form>
  )
}
