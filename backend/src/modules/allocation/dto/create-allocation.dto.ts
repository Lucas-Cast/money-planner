import { ApiProperty } from '@nestjs/swagger'
import { AssetType } from '../../../../generated/prisma/client'
import { IsEnum, IsInt, IsNumber, IsString, Min } from 'class-validator'

export class CreateAllocationDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  goalId: number

  @ApiProperty({ example: 'CDB XP' })
  @IsString()
  label: string

  @ApiProperty({ enum: AssetType, example: AssetType.CDB })
  @IsEnum(AssetType)
  type: AssetType

  @ApiProperty({ example: 1000, minimum: 0 })
  @IsNumber()
  @Min(0)
  amount: number
}
