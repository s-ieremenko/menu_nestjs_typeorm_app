import { Controller, Get, Post, Patch, Param } from '@nestjs/common';

import WEEKDAYS from 'src/common/enum.week';
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

  @Patch('patch')
  async update(): Promise<void> {
    return this.dayService.updateMenu()
  }

  @Get(':day')
  async getMenuForOneDay(@Param('day') day: WEEKDAYS): Promise<Day> {
    return await this.dayService.getOneDayMenu(day)
  }
}


