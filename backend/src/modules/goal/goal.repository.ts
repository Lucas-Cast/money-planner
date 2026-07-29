import { Injectable } from '@nestjs/common'
import { Prisma } from '../../../generated/prisma/client'
import { DatabaseService } from '../database/database.service'

@Injectable()
export class GoalRepository {
  constructor(private readonly database: DatabaseService) {}

  create(data: Prisma.GoalCreateInput) {
    return this.database.goal.create({ data })
  }

  findAllActive() {
    return this.database.goal.findMany({
      where: { deletedAt: null },
      include: {
        allocations: {
          where: { deletedAt: null },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
  }

  findActiveById(id: number) {
    return this.database.goal.findFirst({
      where: { id, deletedAt: null },
      include: {
        allocations: {
          where: { deletedAt: null },
        },
      },
    })
  }

  update(id: number, data: Prisma.GoalUpdateInput) {
    return this.database.goal.update({
      where: { id },
      data,
      include: {
        allocations: {
          where: { deletedAt: null },
        },
      },
    })
  }

  softDelete(id: number) {
    const deletedAt = new Date()

    return this.database.$transaction([
      this.database.allocation.updateMany({
        where: { goalId: id, deletedAt: null },
        data: { deletedAt },
      }),
      this.database.goal.update({
        where: { id },
        data: { deletedAt },
      }),
    ])
  }
}
