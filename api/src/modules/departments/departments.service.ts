import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './entities/department.entity';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private departmentsRepository: Repository<Department>,
  ) {}

  findAll() {
    return this.departmentsRepository.find({ where: { deletedAt: undefined}, relations: ['organization'] });
  }

  findOne(id: string) {
    return this.departmentsRepository.findOne({ where: { id, deletedAt: undefined }, relations: ['organization'] });
  }

  create(createDeptDto: any) {
    const dept = this.departmentsRepository.create(createDeptDto);
    return this.departmentsRepository.save(dept);
  }

  async update(id: string, updateDeptDto: any) {
    await this.departmentsRepository.update(id, updateDeptDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.departmentsRepository.update(id, { deletedAt: new Date() });
    return { message: 'Department soft deleted' };
  }
}
