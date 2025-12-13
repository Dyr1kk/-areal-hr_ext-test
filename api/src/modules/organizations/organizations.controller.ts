import { Controller, Get, Post, Put, Delete, Body, Param, UsePipes } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { JoiValidationPipe } from '../../pipes/joi-validation.pipe';
import { createOrganizationSchema, updateOrganizationSchema } from '../../schemas/organization.joi.schema';

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
  @UsePipes(new JoiValidationPipe(createOrganizationSchema))
  create(@Body() createOrgDto: any) {
    return this.organizationsService.create(createOrgDto);
  }

  @Put(':id')
  @UsePipes(new JoiValidationPipe(updateOrganizationSchema))
  update(@Param('id') id: string, @Body() updateOrgDto: any) {
    return this.organizationsService.update(id, updateOrgDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizationsService.remove(id);
  }
}