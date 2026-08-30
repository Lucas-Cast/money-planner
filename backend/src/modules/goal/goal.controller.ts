import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common'
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { CreateGoalDto } from './dto/create-goal.dto'
import { ImportGoalDto } from './dto/import-goals.dto'
import { UpdateGoalDto } from './dto/update-goal.dto'
import { GoalService } from './goal.service'

@ApiTags('goals')
@Controller('goals')
export class GoalController {
  constructor(private readonly goalService: GoalService) {}

  @Post('import')
  @ApiOperation({
    summary: 'Import goals and their allocations from a JSON array',
  })
  @ApiBody({ type: ImportGoalDto, isArray: true })
  import(
    @Body(
      new ParseArrayPipe({
        items: ImportGoalDto,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    goals: ImportGoalDto[],
  ) {
    return this.goalService.import(goals)
  }

  @Post()
  @ApiOperation({ summary: 'Create a goal' })
  create(@Body() dto: CreateGoalDto) {
    return this.goalService.create(dto)
  }

  @Get()
  @ApiOperation({ summary: 'List all active goals' })
  findAll() {
    return this.goalService.findAll()
  }

  @Get(':id/metrics')
  @ApiOperation({ summary: 'Get goal metrics' })
  getMetrics(@Param('id', ParseIntPipe) id: number) {
    return this.goalService.getMetrics(id)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a goal by id' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.goalService.findOne(id)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a goal' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateGoalDto,
  ) {
    return this.goalService.update(id, dto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a goal' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.goalService.remove(id)
  }
}
