import type { Entity } from './entity'

export interface Goal extends Entity {
  title: string
  description: string
  targetDate: string
  targetValue: number
  monthlyContribution?: number
}

export interface GoalMetrics {
  totalAllocated: number
  remainingValue: number
  completionPercentage: number
  missingPercentage: number
}
