import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { SelectInput } from '@/shared/components/select-input'
import { TextInput } from '@/shared/components/text-input'
import { routes } from '@/shared/config/routes'
import { usePost } from '@/shared/hooks/use-post'
import { usePatch } from '@/shared/hooks/use-patch'
import { allocationTypes, type Allocation } from '@/shared/models/allocation'

const allocationSchema = z.object({
  label: z.string().trim().min(1, 'Informe o nome da alocação.'),
  type: z.enum(allocationTypes),
  amount: z.number({ message: 'Informe o valor alocado.' }).min(0, 'O valor não pode ser negativo.'),
  entryPrice: z.number().min(0, 'O preço não pode ser negativo.').optional(),
  fxRate: z.number().min(0, 'A taxa de câmbio não pode ser negativa.').optional(),
  yieldPercent: z.number().min(0, 'A rentabilidade não pode ser negativa.').optional(),
})

type AllocationFormValues = z.infer<typeof allocationSchema>

type AllocationFormProps = {
  goalId: number
  onCreated: () => void
  allocation?: Allocation
}

const allocationTypeOptions = allocationTypes.map((type) => ({
  value: type,
  label: type === 'OTHER' ? 'Outro' : type,
}))

export function AllocationForm({ goalId, onCreated, allocation }: AllocationFormProps) {
  const { post, loading: creating, error: createError } = usePost<Allocation, AllocationFormValues & { goalId: number }>()
  const { patch, loading: updating, error: updateError } = usePatch<Allocation, AllocationFormValues>()
  const { control, handleSubmit, reset, formState: { errors } } = useForm<AllocationFormValues>({
    resolver: zodResolver(allocationSchema),
    defaultValues: {
      label: '',
      type: 'OTHER',
      amount: undefined,
      entryPrice: undefined,
      fxRate: undefined,
      yieldPercent: undefined,
    },
  })

  useEffect(() => {
    if (!allocation) return
    reset({
      label: allocation.label,
      type: allocation.type,
      amount: allocation.amount,
      entryPrice: allocation.entryPrice ?? undefined,
      fxRate: allocation.fxRate ?? undefined,
      yieldPercent: allocation.yieldPercent ?? undefined,
    })
  }, [allocation, reset])

  const loading = creating || updating
  const error = createError ?? updateError

  const onSubmit = async (values: AllocationFormValues) => {
    if (allocation) {
      await patch(routes.allocations.update(allocation.id), values)
    } else {
      await post(routes.allocations.create, { ...values, goalId })
    }
    reset()
    onCreated()
  }

  const numericField = (name: 'amount' | 'entryPrice' | 'fxRate' | 'yieldPercent', label: string, errorMessage?: string, helperMessage?: string) => (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextInput
          {...field}
          value={field.value ?? ''}
          label={label}
          type="number"
          min="0"
          step="0.01"
          inputMode="decimal"
          placeholder="0,00"
          helperMessage={helperMessage}
          errorMessage={errorMessage}
          onChange={(event) => field.onChange(event.target.value === '' ? undefined : Number(event.target.value))}
        />
      )}
    />
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-7 space-y-5">
      <Controller
        name="label"
        control={control}
        render={({ field }) => <TextInput {...field} label="Nome" placeholder="Ex.: CDB XP" errorMessage={errors.label?.message} />}
      />

      <Controller
        name="type"
        control={control}
        render={({ field }) => (
          <SelectInput {...field} id="allocation-type" label="Tipo de ativo" options={allocationTypeOptions} />
        )}
      />

      {numericField('amount', 'Valor alocado', errors.amount?.message)}

      <div className="grid gap-5 sm:grid-cols-2">
        {numericField('entryPrice', 'Preço de entrada', errors.entryPrice?.message, 'Opcional.')}
        {numericField('fxRate', 'Taxa de câmbio', errors.fxRate?.message, 'Opcional para ativos em moeda estrangeira.')}
      </div>

      {numericField('yieldPercent', 'Rentabilidade', errors.yieldPercent?.message, 'Opcional. Informe conforme o tipo de ativo.')}

      {Boolean(error) && <p role="alert" className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300">Não foi possível {allocation ? 'atualizar' : 'criar'} a alocação. Tente novamente.</p>}

      <button type="submit" disabled={loading} className="w-full rounded-2xl bg-[var(--text-h)] px-5 py-3 text-sm font-semibold text-[var(--bg)] transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--text-h)] disabled:cursor-not-allowed disabled:opacity-50">
        {loading ? 'Salvando...' : allocation ? 'Salvar alterações' : 'Adicionar alocação'}
      </button>
    </form>
  )
}
