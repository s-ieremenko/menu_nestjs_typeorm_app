import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DrinkController } from './drink.controller';
import { Drink } from './drink.entity';
import { DrinkService } from './drink.service';

@Module({
  providers: [DrinkService],
  imports: [TypeOrmModule.forFeature([Drink])],
  controllers: [DrinkController],
})
export class DrinkModule {}
