import { Controller, Get, Post, Put, Delete, Body, Param, UsePipes, ParseUUIDPipe } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { JoiValidationPipe } from '../../pipes/joi-validation.pipe'; 
import { createDepartmentSchema, updateDepartmentSchema } from '../../schemas/department.joi.schema'; // ✅

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Get()
  findAll() {
    return this.departmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) { 
    return this.departmentsService.findOne(id);
  }

  @Post()
  @UsePipes(new JoiValidationPipe(createDepartmentSchema)) 
  create(@Body() createDto: CreateDepartmentDto) { 
    return this.departmentsService.create(createDto);
  }

  @Put(':id')
  @UsePipes(new JoiValidationPipe(updateDepartmentSchema)) 
  update(
    @Param('id', new ParseUUIDPipe()) id: string, 
    @Body() updateDto: UpdateDepartmentDto, 
  ) {
    return this.departmentsService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) { 
    return this.departmentsService.remove(id);
  }
}