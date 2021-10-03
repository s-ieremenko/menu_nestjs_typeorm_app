import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateSecondDto } from './dto/create-second.dto';
import { Second } from './second.entity';
import { SecondService } from './second.service';

@Controller('second')
export class SecondController {
  constructor(private secondService: SecondService) {}

  @Get()
  async getAll(): Promise<Second[]> {
    return this.secondService.findAll();
  }

  @Post('post')
  async createOne(@Body() createSecondDto: CreateSecondDto): Promise<void> {
    return this.secondService.create(createSecondDto);
  }
}
