import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Drink } from './drink.entity';
import { CreateDrinkDto } from './dto/create-drink.dto';

@Injectable()
export class DrinkService {
  constructor(
    @InjectRepository(Drink)
    private readonly drinkRepository: Repository<Drink>,
  ) {}

  async findAll(): Promise<Drink[]> {
    const drinks: Drink[] = await this.drinkRepository.find();
    if (!drinks) {
      throw new NotFoundException('No drinks found');
    }
    return drinks;
  }

  async create(createDrinkDto: CreateDrinkDto): Promise<void> {
    const existingDrink: Drink = await this.drinkRepository.findOne({
      where: {
        name: createDrinkDto.name,
      },
    });
    if (existingDrink) {
      throw new BadRequestException('Such a drink already exists');
    }
    const drink: Drink = this.drinkRepository.create(createDrinkDto);
    await this.drinkRepository.save(drink);
  }
}
