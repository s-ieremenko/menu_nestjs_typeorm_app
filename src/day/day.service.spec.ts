import { Test, TestingModule } from '@nestjs/testing';
import { DayService } from './day.service';

describe('MenuService', () => {
  let service: DayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DayService],
    }).compile();

    service = module.get<DayService>(DayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
