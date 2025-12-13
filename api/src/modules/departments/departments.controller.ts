import { Controller, Get, Post, Put, Delete, Body, Param, UsePipes } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { JoiValidationPipe } from '../../pipes/joi-validation.pipe';
import { createDepartmentSchema, updateDepartmentSchema } from '../../schemas/department.joi.schema';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Get()
  findAll() {
    return this.departmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departmentsService.findOne(id);
  }

  @Post()
  @UsePipes(new JoiValidationPipe(createDepartmentSchema))
  create(@Body() createDeptDto: any) {
    return this.departmentsService.create(createDeptDto);
  }

  @Put(':id')
  @UsePipes(new JoiValidationPipe(updateDepartmentSchema))
  update(@Param('id') id: string, @Body() updateDeptDto: any) {
    return this.departmentsService.update(id, updateDeptDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departmentsService.remove(id);
  }
}