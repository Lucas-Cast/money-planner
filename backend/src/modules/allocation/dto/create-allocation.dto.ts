import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { AssetType } from '../../../../generated/prisma/client'
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator'

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

  @ApiProperty({ example: 1000, minimum: 0, description: 'Amount in BRL' })
  @IsNumber()
  @Min(0)
  amount: number

  @ApiPropertyOptional({
    example: 60000,
    minimum: 0,
    description: 'Entry price per asset unit (e.g. ETH/BTC/MSTR)',
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  entryPrice?: number

  @ApiPropertyOptional({
    example: 5,
    minimum: 0,
    description: 'FX rate in BRL per 1 USD',
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  fxRate?: number

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
