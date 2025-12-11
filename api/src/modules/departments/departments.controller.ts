import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { DepartmentsService } from './departments.service';

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
  create(@Body() createDeptDto: any) {
    return this.departmentsService.create(createDeptDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDeptDto: any) {
    return this.departmentsService.update(id, updateDeptDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departmentsService.remove(id);
  }
}