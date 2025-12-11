import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Position } from './entities/position.entity';

@Injectable()
export class PositionsService {
  constructor(
    @InjectRepository(Position)
    private positionsRepository: Repository<Position>,
  ) {}

  findAll() {
    return this.positionsRepository.find({ where: { deletedAt: undefined } });
  }

  findOne(id: string) {
    return this.positionsRepository.findOne({ where: { id, deletedAt: undefined } });
  }

  create(createPositionDto: any) {
    const position = this.positionsRepository.create(createPositionDto);
    return this.positionsRepository.save(position);
  }

  async update(id: string, updatePositionDto: any) {
    await this.positionsRepository.update(id, updatePositionDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.positionsRepository.update(id, { deletedAt: new Date() });
    return { message: 'Position soft deleted' };
  }
}