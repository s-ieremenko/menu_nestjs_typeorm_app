import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Drink } from 'src/drink/drink.entity';
import { Main } from 'src/main/main.entity';
import { Second } from 'src/second/second.entity';
import { DayController } from './day.controller';
import { Day } from './day.entity';
import { DayService } from './day.service';

@Module({
  providers: [DayService],
  imports: [TypeOrmModule.forFeature([Day, Main, Second, Drink])],
  controllers: [DayController],
})
export class MenuModule {}
