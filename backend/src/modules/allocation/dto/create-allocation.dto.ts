import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { AssetType } from '../../../../generated/prisma/client'
import { IsEnum, IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator'

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

  @ApiPropertyOptional({
    example: 350000,
    minimum: 0,
    description: 'Unit purchase price (e.g. BTC)',
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  unitPrice?: number

  @ApiPropertyOptional({
    example: 110,
    minimum: 0,
    description: 'Yield as percent of CDI (e.g. 110 = 110% CDI)',
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  yieldPercent?: number
}
