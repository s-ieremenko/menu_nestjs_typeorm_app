import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Drink } from 'src/drink/drink.entity';
import { Main } from 'src/main/main.entity';
import { Second } from 'src/second/second.entity';
import { Repository } from 'typeorm';
// import uniqueRandom from 'unique-random';
import { Day } from './day.entity';

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

  async createDayMenu(): Promise<void> {
    const week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const mains = await this.mainRepository.find();
    const seconds = await this.secondRepository.find();
    const drinks = await this.drinkRepository.find();

    for (const day of week) {
      const main = mains[Math.floor(Math.random() * mains.length)];
      const second = seconds[Math.floor(Math.random() * seconds.length)];
      const drink = drinks[Math.floor(Math.random() * drinks.length)];
      const day1: Day = this.dayRepository.create({
        name: day,
        main,
        second,
        drink,
      });
      await this.dayRepository.save(day1);
    }
  }
  async getAll(): Promise<Day[]> {
    const menu: Day[] = await this.dayRepository.find({
      relations: ['main', 'second', 'drink'],
    });
    return menu;
  }
  // async createDayMenu(): Promise<void> {
  //   const week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  //   const mains = await this.mainRepository.find();
  //   const seconds = await this.secondRepository.find();
  //   const drinks = await this.drinkRepository.find();
  //   const randomIndexMain = this.uniqueRandom(1, mains.length);
  //   const randomIndexSecond = this.uniqueRandom(1, seconds.length);
  //   const randomIndexDrink = this.uniqueRandom(1, drinks.length);
  //   console.log(randomIndexMain);

  //   for (const day of week) {
  //     // const main = mains[Math.floor(Math.random() * mains.length)];
  //     // const second = seconds[Math.floor(Math.random() * seconds.length)];
  //     // const drink = drinks[Math.floor(Math.random() * drinks.length)];
  //     const day1: Day = this.dayRepository.create({
  //       name: day,
  //       main: mains[randomIndexMain()],
  //       second: seconds[randomIndexSecond()],
  //       drink: drinks[randomIndexDrink()],
  //     });
  //     await this.dayRepository.save(day1);
  //   }
  // }
}
