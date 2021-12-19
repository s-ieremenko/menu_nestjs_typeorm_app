import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MainController } from './main.controller';
import { Main } from './main.entity';
import { MainService } from './main.service';

@Module({
  providers: [MainService],
  imports: [TypeOrmModule.forFeature([Main])],
  controllers: [MainController],
})
export class MainModule {}
