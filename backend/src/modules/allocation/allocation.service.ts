import { Injectable, NotFoundException } from '@nestjs/common'
import { GoalRepository } from '../goal/goal.repository'
import { AllocationRepository } from './allocation.repository'
import { CreateAllocationDto } from './dto/create-allocation.dto'
import { UpdateAllocationDto } from './dto/update-allocation.dto'

@Injectable()
export class AllocationService {
  constructor(
    private readonly allocationRepository: AllocationRepository,
    private readonly goalRepository: GoalRepository,
  ) {}

  async create(dto: CreateAllocationDto) {
    const goal = await this.goalRepository.findActiveById(dto.goalId)
    if (!goal) {
      throw new NotFoundException(`Goal ${dto.goalId} not found`)
    }

    return this.allocationRepository.create({
      label: dto.label,
      type: dto.type,
      amount: dto.amount,
      unitPrice: dto.unitPrice,
      yieldPercent: dto.yieldPercent,
      goal: { connect: { id: dto.goalId } },
    })
  }

  findAll(goalId?: number) {
    return this.allocationRepository.findAllActive(goalId)
  }

  async findOne(id: number) {
    const allocation = await this.allocationRepository.findActiveById(id)

    if (!allocation) {
      throw new NotFoundException(`Allocation ${id} not found`)
    }

    return allocation
  }

  async update(id: number, dto: UpdateAllocationDto) {
    await this.findOne(id)

    return this.allocationRepository.update(id, dto)
  }

  async remove(id: number) {
    await this.findOne(id)
    await this.allocationRepository.softDelete(id)

    return { id, deleted: true }
  }
}
