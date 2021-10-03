import { Controller, Get, Post } from '@nestjs/common';
import { Day } from './day.entity';
import { DayService } from './day.service';

@Controller('day')
export class DayController {
  constructor(private dayService: DayService) {}
  @Post('post')
  async create(): Promise<void> {
    return await this.dayService.createDayMenu();
  }

  @Get()
  async showMenu(): Promise<Day[]> {
    return await this.dayService.getAll();
  }
}
