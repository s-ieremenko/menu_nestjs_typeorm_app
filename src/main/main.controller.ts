import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreateMainDto } from './dto/create-main.dto';
import { Main } from './main.entity';
import { MainService } from './main.service';

@Controller('main')
export class MainController {
  constructor(private mainService: MainService) {}

  @Get()
  async getAll(): Promise<Main[]> {
    return this.mainService.findAll();
  }

  @Post('post')
  async create(@Body() createMainDto: CreateMainDto): Promise<Main> {
    return this.mainService.create(createMainDto);
  }
}
