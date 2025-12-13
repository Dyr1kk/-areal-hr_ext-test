import { Controller, Get, Post, Put, Delete, Body, Param, UsePipes } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { JoiValidationPipe } from '../../pipes/joi-validation.pipe';
import { createPositionSchema, updatePositionSchema } from '../../schemas/position.joi.schema';

@Controller('positions')
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @Get()
  findAll() {
    return this.positionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.positionsService.findOne(id);
  }

  @Post()
  @UsePipes(new JoiValidationPipe(createPositionSchema))
  create(@Body() createPositionDto: any) {
    return this.positionsService.create(createPositionDto);
  }

  @Put(':id')
  @UsePipes(new JoiValidationPipe(updatePositionSchema))
  update(@Param('id') id: string, @Body() updatePositionDto: any) {
    return this.positionsService.update(id, updatePositionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.positionsService.remove(id);
  }
}