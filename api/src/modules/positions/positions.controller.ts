import { Controller, Get, Post, Put, Delete, Body, Param, UsePipes, ParseUUIDPipe } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
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
  findOne(@Param('id', new ParseUUIDPipe()) id: string) { 
    return this.positionsService.findOne(id);
  }

  @Post()
  @UsePipes(new JoiValidationPipe(createPositionSchema)) 
  create(@Body() createDto: CreatePositionDto) { 
    return this.positionsService.create(createDto);
  }

  @Put(':id')
  @UsePipes(new JoiValidationPipe(updatePositionSchema)) 
  update(
    @Param('id', new ParseUUIDPipe()) id: string, 
    @Body() updateDto: UpdatePositionDto, 
  ) {
    return this.positionsService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) { 
    return this.positionsService.remove(id);
  }
}