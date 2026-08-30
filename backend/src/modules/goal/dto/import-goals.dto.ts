import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Transform, Type } from 'class-transformer'
import {
  IsArray,
  IsDate,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator'
import { AssetType } from '../../../../generated/prisma/client'

export class ImportAllocationDto {
  @ApiPropertyOptional({
    description: 'Accepted for backups but ignored; the database generates a new ID.',
    example: 5,
  })
  @IsOptional()
  @IsInt()
  id?: number

  @ApiPropertyOptional({
    description: 'Accepted for backups but ignored; the parent goal defines the relation.',
    example: 5,
  })
  @IsOptional()
  @IsInt()
  goalId?: number

  @ApiProperty({ example: 'CDB Férias' })
  @IsString()
  label: string

  @ApiProperty({ enum: AssetType, example: AssetType.CDB })
  @IsEnum(AssetType)
  type: AssetType

  @ApiProperty({ example: 1606, minimum: 0 })
  @IsNumber()
  @Min(0)
  amount: number

  @ApiPropertyOptional({ example: null, minimum: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  entryPrice?: number | null

  @ApiPropertyOptional({ example: null, minimum: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  fxRate?: number | null

  @ApiPropertyOptional({ example: 102, minimum: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  yieldPercent?: number | null

  @ApiPropertyOptional({
    description: 'Accepted for backups but ignored; the database generates it.',
  })
  @IsOptional()
  @Transform(({ value }) => (value ? new Date(value) : value))
  @IsDate()
  createdAt?: Date | null

  @ApiPropertyOptional({
    description: 'Accepted for backups but ignored; the database generates it.',
  })
  @IsOptional()
  @Transform(({ value }) => (value ? new Date(value) : value))
  @IsDate()
  updatedAt?: Date | null

  @ApiPropertyOptional({
    description: 'Accepted for backups but ignored; imported entities are active.',
    example: null,
  })
  @IsOptional()
  @Transform(({ value }) => (value ? new Date(value) : value))
  @IsDate()
  deletedAt?: Date | null
}

export class ImportGoalDto {
  @ApiPropertyOptional({
    description: 'Accepted for backups but ignored; the database generates a new ID.',
    example: 5,
  })
  @IsOptional()
  @IsInt()
  id?: number

  @ApiProperty({ example: 'Viagem para o Japão' })
  @IsString()
  title: string

  @ApiProperty({ example: 'Meta de economia para viagem' })
  @IsString()
  description: string

  @ApiProperty({ example: '2027-12-31T00:00:00.000Z' })
  @Transform(({ value }) => (value ? new Date(value) : value))
  @IsDate()
  targetDate: Date

  @ApiProperty({ example: 15000, minimum: 0 })
  @IsNumber()
  @Min(0)
  targetValue: number

  @ApiPropertyOptional({ example: 500, minimum: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  monthlyContribution?: number

  @ApiPropertyOptional({
    description: 'Accepted for backups but ignored; the database generates it.',
  })
  @IsOptional()
  @Transform(({ value }) => (value ? new Date(value) : value))
  @IsDate()
  createdAt?: Date | null

  @ApiPropertyOptional({
    description: 'Accepted for backups but ignored; the database generates it.',
  })
  @IsOptional()
  @Transform(({ value }) => (value ? new Date(value) : value))
  @IsDate()
  updatedAt?: Date | null

  @ApiPropertyOptional({
    description: 'Accepted for backups but ignored; imported entities are active.',
    example: null,
  })
  @IsOptional()
  @Transform(({ value }) => (value ? new Date(value) : value))
  @IsDate()
  deletedAt?: Date | null

  @ApiProperty({ type: () => [ImportAllocationDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImportAllocationDto)
  allocations: ImportAllocationDto[]
}
