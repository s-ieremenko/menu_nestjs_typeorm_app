import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Main } from './main.entity';
import { MainService } from './main.service';
import { mainStub } from './main.stub';

const mockRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
};

describe('MainCourseService', () => {
  let service: MainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MainService,
        {
          provide: getRepositoryToken(Main),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<MainService>(MainService);
    mockRepository.find.mockReset();
    mockRepository.findOne.mockReset();
    mockRepository.create.mockReset();
    mockRepository.save.mockReset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all the main dishes', async () => {
      const expectedDish = mainStub();
      mockRepository.find.mockResolvedValue([
        expectedDish,
        expectedDish,
        expectedDish,
      ]);
      const dishes = await service.findAll();
      // expect(dishes).toHaveLength(3);
      expect(dishes).toEqual([expectedDish, expectedDish, expectedDish]);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
      expect(mockRepository.find).toReturn();
      expect(dishes).toBeDefined();
    });

    it('should throw an exception if no main dishes found', async () => {
      const expectedDish = undefined;
      mockRepository.find([expectedDish]);
      mockRepository.find.mockRejectedValue(
        new NotFoundException('No main dishes found'),
      );

      service.findAll().catch((e) => {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e).toMatchObject({
          message: 'No main dishes found',
        });
      });
    });
  });

  describe('create', () => {
    it('should throw an exception if the dish already exists', async () => {
      const existingDish = mainStub();
      mockRepository.findOne.mockReturnValue(existingDish.name);
      mockRepository.create.mockReturnValue(existingDish);

      await service.create(existingDish).catch((e) => {
        expect(e).toBeInstanceOf(BadRequestException);
        expect(e).toMatchObject({
          message: 'Such a dish already exists',
        });
      });
      expect(mockRepository.findOne).toBeCalledTimes(1);
      expect(mockRepository.create).not.toBeCalledTimes(1);
    });

    it('should create and save a main dish', async () => {
      const dish = mainStub();
      mockRepository.create.mockReturnValue(dish);
      mockRepository.save.mockReturnValue(dish);
      const savedDish = await service.create(dish);
      
      expect(savedDish).toMatchObject(dish);
      expect(mockRepository.create).toBeCalledTimes(1);
      expect(mockRepository.save).toBeCalledTimes(1);
    });

    it('should return an exception when doesnt create a main dish', async () => {
      const maindish = mainStub();
      mockRepository.save.mockReturnValue(null);
      mockRepository.create.mockReturnValue(maindish);

      await service.create(maindish).catch((e) => {
        expect(e).toBeInstanceOf(InternalServerErrorException);
        expect(e).toMatchObject({
          message: 'Problem to create a main dish. Try again',
        });
      });
      expect(mockRepository.create).toBeCalledTimes(1);
      expect(mockRepository.save).toBeCalledTimes(1);
    });
  });
});
