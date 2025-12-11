import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from './entities/organization.entity';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private organizationsRepository: Repository<Organization>,
  ) {}

findAll() {
  return this.organizationsRepository.find({ where: { deletedAt: undefined } });
}

findOne(id: string) {
  return this.organizationsRepository.findOne({ where: { id, deletedAt: undefined } }); 
}

  create(createOrgDto: any) {
    const org = this.organizationsRepository.create(createOrgDto);
    return this.organizationsRepository.save(org);
  }

  async update(id: string, updateOrgDto: any) {
    await this.organizationsRepository.update(id, updateOrgDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.organizationsRepository.update(id, { deletedAt: new Date() });
    return { message: 'Organization soft deleted' };
  }
}