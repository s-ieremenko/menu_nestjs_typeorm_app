import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecondController } from './second.controller';
import { Second } from './second.entity';
import { SecondService } from './second.service';

@Module({
  controllers: [SecondController],
  imports: [TypeOrmModule.forFeature([Second])],
  providers: [SecondService],
})
export class SecondModule {}
