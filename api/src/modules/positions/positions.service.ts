import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Position } from './entities/position.entity';

@Injectable()
export class PositionsService {
  constructor(
    @InjectRepository(Position)
    private positionsRepository: Repository<Position>,
  ) {}

  findAll() {
    return this.positionsRepository.find({ where: { deletedAt: IsNull() } });
  }

  findOne(id: string) {
    return this.positionsRepository.findOne({ where: { id, deletedAt: IsNull() } });
  }

  create(createPositionDto: any) {
    const position = this.positionsRepository.create(createPositionDto);
    return this.positionsRepository.save(position);
  }

  async update(id: string, updatePositionDto: any) {
    const existing = await this.positionsRepository.findOne({ where: { id, deletedAt: IsNull() } });
    if (!existing) {
      throw new NotFoundException(`Position with ID "${id}" not found`);
    }
    await this.positionsRepository.update(id, updatePositionDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const existing = await this.positionsRepository.findOne({ where: { id, deletedAt: IsNull() } });
    if (!existing) {
      throw new NotFoundException(`Position with ID "${id}" not found`);
    }
    await this.positionsRepository.update(id, { deletedAt: new Date() });
    return { message: 'Position soft deleted' };
  }
}