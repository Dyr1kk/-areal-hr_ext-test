import { Controller, Get, Post, Put, Delete, Body, Param, UsePipes, ParseUUIDPipe } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto} from './dto/create-organization.dto';
import { UpdateOrganizationDto} from './dto/update-organization.dto';
import { JoiValidationPipe } from '../../pipes/joi-validation.pipe'; 
import { createOrganizationSchema, updateOrganizationSchema } from '../../schemas/organization.joi.schema'; // ✅

@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Get()
  findAll() {
    return this.organizationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) { 
    return this.organizationsService.findOne(id);
  }

  @Post()
  @UsePipes(new JoiValidationPipe(createOrganizationSchema)) 
  create(@Body() createDto: CreateOrganizationDto) { 
    return this.organizationsService.create(createDto);
  }

  @Put(':id')
  @UsePipes(new JoiValidationPipe(updateOrganizationSchema))
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateDto: UpdateOrganizationDto, 
  ) {
    return this.organizationsService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) { 
    return this.organizationsService.remove(id);
  }
}