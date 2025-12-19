import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Organization } from './entities/organization.entity';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private organizationsRepository: Repository<Organization>,
  ) {}

  findAll() {
    return this.organizationsRepository.find({ where: { deletedAt: IsNull() } });
  }

  findOne(id: string) {
    return this.organizationsRepository.findOne({ where: { id, deletedAt: IsNull() } });
  }

  create(createOrgDto: any) {
    const org = this.organizationsRepository.create(createOrgDto);
    return this.organizationsRepository.save(org);
  }

  async update(id: string, updateOrgDto: any) {
    const existing = await this.organizationsRepository.findOne({ where: { id, deletedAt: IsNull() } });
    if (!existing) {
      throw new NotFoundException(`Organization with ID "${id}" not found`);
    }
    await this.organizationsRepository.update(id, updateOrgDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const existing = await this.organizationsRepository.findOne({ where: { id, deletedAt: IsNull() } });
    if (!existing) {
      throw new NotFoundException(`Organization with ID "${id}" not found`);
    }
    await this.organizationsRepository.update(id, { deletedAt: new Date() });
    return { message: 'Organization soft deleted' };
  }
}