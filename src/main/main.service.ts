import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMainDto } from './dto/create-main.dto';
import { Main } from './main.entity';

@Injectable()
export class MainService {
  constructor(
    @InjectRepository(Main)
    private readonly mainRepository: Repository<Main>,
  ) {}
  async findAll(): Promise<Main[]> {
    const dishes: Main[] = await this.mainRepository.find();

    if (!dishes.length) {
      throw new NotFoundException('No main dishes found');
    }
    return dishes;
  }

  async create(createMainDto: CreateMainDto): Promise<void> {
    const mainDishExists: Main = await this.mainRepository.findOne({
      where: {
        name: createMainDto.name,
      },
    });
    if (mainDishExists) {
      throw new BadRequestException('Such a dish already exists');
    }
    const mainDish: Main = this.mainRepository.create(createMainDto);
    this.mainRepository.save(mainDish);
  }
}
