import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger'
import { AllocationService } from './allocation.service'
import { CreateAllocationDto } from './dto/create-allocation.dto'
import { UpdateAllocationDto } from './dto/update-allocation.dto'

@ApiTags('allocations')
@Controller('allocations')
export class AllocationController {
  constructor(private readonly allocationService: AllocationService) {}

  @Post()
  @ApiOperation({ summary: 'Create an allocation' })
  create(@Body() dto: CreateAllocationDto) {
    return this.allocationService.create(dto)
  }

  @Get()
  @ApiOperation({ summary: 'List all active allocations' })
  @ApiQuery({ name: 'goalId', required: false, type: Number })
  findAll(
    @Query('goalId', new ParseIntPipe({ optional: true })) goalId?: number,
  ) {
    return this.allocationService.findAll(goalId)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an allocation by id' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.allocationService.findOne(id)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an allocation' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAllocationDto,
  ) {
    return this.allocationService.update(id, dto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete an allocation' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.allocationService.remove(id)
  }
}
