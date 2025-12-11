import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';

@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Get()
  findAll() {
    return this.organizationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizationsService.findOne(id);
  }

  @Post()
  create(@Body() createOrgDto: any) {
    return this.organizationsService.create(createOrgDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateOrgDto: any) {
    return this.organizationsService.update(id, updateOrgDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizationsService.remove(id);
  }
}