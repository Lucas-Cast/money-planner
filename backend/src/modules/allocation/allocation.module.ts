import { Module } from '@nestjs/common'
import { GoalModule } from '../goal/goal.module'
import { AllocationController } from './allocation.controller'
import { AllocationRepository } from './allocation.repository'
import { AllocationService } from './allocation.service'

@Module({
  imports: [GoalModule],
  controllers: [AllocationController],
  providers: [AllocationService, AllocationRepository],
})
export class AllocationModule {}
