import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

import { Day } from './day.entity';
import { DayService } from './day.service';
import { Second } from '../second/second.entity';
import { Drink } from '../drink/drink.entity';
import { Main } from '../main/main.entity';
import { mainStub } from '../main/main.stub';
import { secondStub } from '../second/second.stub';
import { drinkStub } from '../drink/drink.stub';
import { DrinkService } from '../drink/drink.service';
import { MainService } from '../main/main.service';
import { SecondService } from '../second/second.service';
import { dayStub } from './day.stub';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
});

describe('DayService', () => {
  let dayService: DayService;
  let dayRepository: MockRepository;
  let mainRepository: MockRepository;
  let secondRepository: MockRepository;
  let drinkRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DayService,
        MainService,
        SecondService,
        DrinkService,
        {
          provide: getRepositoryToken(Day),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(Main),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(Second),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(Drink),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    dayService = module.get<DayService>(DayService);
    dayRepository = module.get<MockRepository>(getRepositoryToken(Day));
    mainRepository = module.get<MockRepository>(getRepositoryToken(Main));
    secondRepository = module.get<MockRepository>(getRepositoryToken(Second));
    drinkRepository = module.get<MockRepository>(getRepositoryToken(Drink));
  });

  it('should be defined', () => {
    expect(dayService).toBeDefined();
  });
  describe('getAll', () => {
    it('should return all the dishes on the week', async () => {
      const expectedDishes = [mainStub(), secondStub(), drinkStub()];
      dayRepository.find.mockResolvedValue(expectedDishes);

      const dishes = await dayService.getAll();

      expect(dishes).toEqual(expectedDishes);
      expect(dishes).toHaveLength(expectedDishes.length);
    });
  });

  describe('otherwise', () => {
    it('should throw the "NotFoundException"', async () => {
      const expectedDishes = undefined;
      dayRepository.find.mockReturnValue(expectedDishes);

      await dayService.getAll().catch((err) => {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err.message).toEqual('No dishes found');
      });
    });
  });

  describe('createDayMenu', () => {
    it('should create menu for week', async () => {
      const expectedDayMenu = {
        id: 1,
        name: 'Monday',
        main: 'soup',
        second: 'potato',
        drink: 'tea',
      };
      const days = [];
      dayRepository.find.mockReturnValue(days);

      const expectedMains = [],
        expectedSeconds = [],
        expectedDrinks = [];
      for (let i = 0; i < 5; i++) {
        expectedMains.push(mainStub());
        expectedSeconds.push(secondStub());
        expectedDrinks.push(drinkStub());
      }

      mainRepository.find.mockReturnValue(expectedMains);
      expect(expectedMains.length).toBeGreaterThanOrEqual(5);

      secondRepository.find.mockReturnValue(expectedSeconds);
      expect(expectedSeconds.length).toBeGreaterThanOrEqual(5);

      drinkRepository.find.mockReturnValue(expectedDrinks);
      expect(expectedDrinks.length).toBeGreaterThanOrEqual(5);

      dayRepository.create.mockReturnValue(expectedDayMenu);
      await dayService.createDayMenu();

      expect(dayRepository.create).toBeCalledTimes(5);
    });
  });

  describe('update', () => {
    it('should update menu', async () => {
      const expectedMains = [],
        expectedSeconds = [],
        expectedDrinks = [];

      for (let i = 0; i < 5; i++) {
        expectedMains.push(mainStub());
        expectedSeconds.push(secondStub());
        expectedDrinks.push(drinkStub());
      }
      mainRepository.find.mockReturnValue(expectedMains);

      secondRepository.find.mockReturnValue(expectedSeconds);

      drinkRepository.find.mockReturnValue(expectedDrinks);
      dayRepository.find.mockReturnValue([
        dayStub(),
        dayStub(),
        dayStub(),
        dayStub(),
        dayStub(),
      ]);
      await dayService.updateMenu();

      expect(dayRepository.update).toBeCalledTimes(5);
    });
  });
});
