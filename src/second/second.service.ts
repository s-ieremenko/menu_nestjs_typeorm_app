import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateSecondDto } from './dto/create-second.dto';
import { Second } from './second.entity';

@Injectable()
export class SecondService {
  constructor(
    @InjectRepository(Second)
    private readonly secondRepository: Repository<Second>,
  ) {}

  async findAll(): Promise<Second[]> {
    const seconds: Second[] = await this.secondRepository.find();
    if (!seconds) {
      throw new NotFoundException('No second dishes found');
    }
    return seconds;
  }

  async create(createSecondDto: CreateSecondDto): Promise<void> {
    const existingSecond: Second = await this.secondRepository.findOne({
      where: {
        name: createSecondDto.name,
      },
    });
    if (existingSecond) {
      throw new BadRequestException('Such a second dish already exists');
    }
    const second: Second = this.secondRepository.create(createSecondDto);
    await this.secondRepository.save(second);
  }
}
