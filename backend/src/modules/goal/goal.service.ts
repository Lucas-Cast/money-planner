import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateGoalDto } from './dto/create-goal.dto'
import { UpdateGoalDto } from './dto/update-goal.dto'
import { GoalRepository } from './goal.repository'

@Injectable()
export class GoalService {
  constructor(private readonly goalRepository: GoalRepository) {}

  create(dto: CreateGoalDto) {
    return this.goalRepository.create({
      title: dto.title,
      description: dto.description,
      targetDate: dto.targetDate,
      targetValue: dto.targetValue,
      monthlyContribution: dto.monthlyContribution,
    })
  }

  findAll() {
    return this.goalRepository.findAllActive()
  }

  async findOne(id: number) {
    const goal = await this.goalRepository.findActiveById(id)

    if (!goal) {
      throw new NotFoundException(`Goal ${id} not found`)
    }

    return goal
  }

  async update(id: number, dto: UpdateGoalDto) {
    await this.findOne(id)

    return this.goalRepository.update(id, dto)
  }

  async remove(id: number) {
    await this.findOne(id)
    await this.goalRepository.softDelete(id)

    return { id, deleted: true }
  }
}
