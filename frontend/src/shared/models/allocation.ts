export const allocationTypes = ['CDB', 'BTC', 'USD', 'OTHER'] as const

export type AllocationType = (typeof allocationTypes)[number]

export interface Allocation {
  id: number
  goalId: number
  label: string
  type: AllocationType
  amount: number
  entryPrice?: number | null
  fxRate?: number | null
  yieldPercent?: number | null
  createdAt: string
  updatedAt: string
  deletedAt?: string | null
}
