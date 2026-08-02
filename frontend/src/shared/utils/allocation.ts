import type { Allocation } from "@/shared/models/allocation"

export const allocationTypeLabels: Record<Allocation["type"], string> = {
  CDB: "CDB",
  BTC: "Bitcoin",
  USD: "Dólar",
  OTHER: "Outro",
}

export const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
})

export function formatCurrency(value: number) {
  return currencyFormatter.format(value)
}
