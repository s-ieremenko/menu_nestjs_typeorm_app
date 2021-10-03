import { Body, Controller, Get, Post } from '@nestjs/common';
import { Drink } from './drink.entity';
import { DrinkService } from './drink.service';
import { CreateDrinkDto } from './dto/create-drink.dto';

@Controller('drink')
export class DrinkController {
  constructor(private drinkService: DrinkService) {}
  @Get()
  async getAll(): Promise<Drink[]> {
    return this.drinkService.findAll();
  }

  @Post('post')
  async create(@Body() createDrinkDto: CreateDrinkDto): Promise<void> {
    return this.drinkService.create(createDrinkDto);
  }
}
