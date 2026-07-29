import { Injectable } from '@nestjs/common'
import { Prisma } from '../../../generated/prisma/client'
import { DatabaseService } from '../database/database.service'

@Injectable()
export class AllocationRepository {
  constructor(private readonly database: DatabaseService) {}

  create(data: Prisma.AllocationCreateInput) {
    return this.database.allocation.create({ data })
  }

  findAllActive(goalId?: number) {
    return this.database.allocation.findMany({
      where: {
        deletedAt: null,
        ...(goalId ? { goalId } : {}),
        goal: { deletedAt: null },
      },
      orderBy: { createdAt: 'desc' },
    })
  }

  findActiveById(id: number) {
    return this.database.allocation.findFirst({
      where: {
        id,
        deletedAt: null,
        goal: { deletedAt: null },
      },
    })
  }

  update(id: number, data: Prisma.AllocationUpdateInput) {
    return this.database.allocation.update({
      where: { id },
      data,
    })
  }

  softDelete(id: number) {
    return this.database.allocation.update({
      where: { id },
      data: { deletedAt: new Date() },
    })
  }
}
