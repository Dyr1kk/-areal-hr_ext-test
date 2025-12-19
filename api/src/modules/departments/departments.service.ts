import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Department } from './entities/department.entity';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private departmentsRepository: Repository<Department>,
  ) {}

  findAll() {
    return this.departmentsRepository.find({ where: { deletedAt: IsNull() }, relations: ['organization'] });
  }

  findOne(id: string) {
    return this.departmentsRepository.findOne({ where: { id, deletedAt: IsNull() }, relations: ['organization'] });
  }

  create(createDeptDto: any) {
    const dept = this.departmentsRepository.create(createDeptDto);
    return this.departmentsRepository.save(dept);
  }

  async update(id: string, updateDeptDto: any) {
    const existing = await this.departmentsRepository.findOne({ where: { id, deletedAt: IsNull() } });
    if (!existing) {
      throw new NotFoundException(`Department with ID "${id}" not found`);
    }
    await this.departmentsRepository.update(id, updateDeptDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const existing = await this.departmentsRepository.findOne({ where: { id, deletedAt: IsNull() } });
    if (!existing) {
      throw new NotFoundException(`Department with ID "${id}" not found`);
    }
    await this.departmentsRepository.update(id, { deletedAt: new Date() });
    return { message: 'Department soft deleted' };
  }
}