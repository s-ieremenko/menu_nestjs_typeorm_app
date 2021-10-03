import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { MainModule } from './main/main.module';
import { SecondModule } from './second/second.module';
import { DrinkModule } from './drink/drink.module';
import { typeOrmConfigAsync } from './config/typeorm.config';
import { MenuModule } from './day/day.module';

@Module({
  imports: [
    MainModule,
    SecondModule,
    DrinkModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    MenuModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
