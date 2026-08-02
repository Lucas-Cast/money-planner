import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { CreateGoalDto } from './dto/create-goal.dto'
import { UpdateGoalDto } from './dto/update-goal.dto'
import { GoalService } from './goal.service'

@ApiTags('goals')
@Controller('goals')
export class GoalController {
  constructor(private readonly goalService: GoalService) {}

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
