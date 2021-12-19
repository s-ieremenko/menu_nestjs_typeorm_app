import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Drink } from '../drink/drink.entity';
import { Main } from '../main/main.entity';
import { Second } from '../second/second.entity';
import { Day } from './day.entity';
import WEEKDAYS from '../common/enum.week';

@Injectable()
export class DayService {
  constructor(
    @InjectRepository(Day)
    private readonly dayRepository: Repository<Day>,
    @InjectRepository(Main)
    private readonly mainRepository: Repository<Main>,
    @InjectRepository(Drink)
    private readonly drinkRepository: Repository<Drink>,
    @InjectRepository(Second)
    private readonly secondRepository: Repository<Second>,
  ) {}

  shuffle(arr: Main[] | Second[] | Drink[]) {
    if (arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
    return arr;
  }

  async getAllDishes() {
    const mains = await this.mainRepository.find();
    const seconds = await this.secondRepository.find();
    const drinks = await this.drinkRepository.find();
    const newmains = this.shuffle(mains);
    const newseconds = this.shuffle(seconds);
    const newdrinks = this.shuffle(drinks);
    return [newmains, newseconds, newdrinks];
  }

  async createDayMenu(): Promise<void> {
    const days = await this.getAll();
    if (days.length === 0) {
      const week = [
        WEEKDAYS.MONDAY,
        WEEKDAYS.TUESDAY,
        WEEKDAYS.WEDNESDAY,
        WEEKDAYS.THURSDAY,
        WEEKDAYS.FRIDAY,
      ];
      const [mains, seconds, drinks] = await this.getAllDishes();
      if (mains.length >= 5 && seconds.length >= 5 && drinks.length >= 5) {
        let i = 0,
          n = 0,
          m = 0;

        for (const day of week) {
          const day1: Day = this.dayRepository.create({
            name: day,
            main: mains[i++],
            second: seconds[m++],
            drink: drinks[n++],
          });
          await this.dayRepository.save(day1);
        }
      } else {
        throw new BadRequestException('Amount of dishes must be >5');
      }
    } else {
      throw new BadRequestException('Table is already filled');
    }
  }

  async getAll(): Promise<Day[]> {
    const menu: Day[] = await this.dayRepository.find({
      relations: ['main', 'second', 'drink'],
    });
    if (!menu) {
      throw new NotFoundException('No dishes found');
    }
    return menu;
  }

  async updateMenu(): Promise<void> {
    const [mains, seconds, drinks] = await this.getAllDishes();
    let i = 0,
      n = 0,
      m = 0;
    const days: Day[] = await this.getAll();
    for (const day of days) {
      await this.dayRepository.update(day.id, {
        main: mains[i++],
        second: seconds[m++],
        drink: drinks[n++],
      });
    }
  }

  async getOneDayMenu(day: WEEKDAYS): Promise<Day> {
    const menu: Day = await this.dayRepository.findOne({
      where: {
        name: day,
      },
      relations: ['main', 'second', 'drink'],
    });
    if (!menu) {
      throw new NotFoundException('No dishes found');
    }
    return menu;
  }
}