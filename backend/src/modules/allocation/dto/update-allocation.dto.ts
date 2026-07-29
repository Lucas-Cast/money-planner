import { OmitType, PartialType } from '@nestjs/swagger'
import { CreateAllocationDto } from './create-allocation.dto'

export class UpdateAllocationDto extends PartialType(
  OmitType(CreateAllocationDto, ['goalId'] as const),
) {}
