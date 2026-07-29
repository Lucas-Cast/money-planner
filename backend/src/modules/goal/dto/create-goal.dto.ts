import { Transform } from 'class-transformer'
import { IsDate, IsNumber, IsOptional, IsString, Min } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateGoalDto {
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
}
