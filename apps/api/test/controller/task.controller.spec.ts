import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, InternalServerErrorException } from '@nestjs/common';
import { TaskController } from '../../src/controller/task.controller';
import { TaskDao } from '../../src/dao/task.dao';
import { TaskDto } from '../../src/controller/dtos/task.dto';

describe('TaskController', () => {
  let controller: TaskController;
  let taskDao: TaskDao;

  const createMockTaskDto = (id: number, name: string): TaskDto => ({
    id,
    name,
    org: { id: 1, name: 'Test Org' },
    adminId: 1,
    ownerId: 1,
    viewerIds: [],
    status: 'active',
    category: 'test',
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    isActive: true,
    deleteDate: null,
    permissions: []
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskDao,
          useValue: {
            get: jest.fn(),
            getMocks: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController);
    taskDao = module.get<TaskDao>(TaskDao);
  });

  describe('getTasks', () => {
    it('should return all tasks', async () => {
      const mockTasks = [createMockTaskDto(1, 'Task 1'), createMockTaskDto(2, 'Task 2')];
      jest.spyOn(taskDao, 'get').mockResolvedValue(mockTasks);

      const result = await controller.getTasks();

      expect(taskDao.get).toHaveBeenCalledWith();
      expect(result).toEqual(mockTasks);
    });

    it('should handle empty result', async () => {
      jest.spyOn(taskDao, 'get').mockResolvedValue([]);

      const result = await controller.getTasks();

      expect(result).toEqual([]);
    });

    it('should handle dao errors and wrap in InternalServerErrorException', async () => {
      jest.spyOn(taskDao, 'get').mockRejectedValue(new Error('Database error'));

      await expect(controller.getTasks()).rejects.toThrow(InternalServerErrorException);
    });

    it('should preserve HttpExceptions from dao', async () => {
      const httpError = new HttpException('Bad request', 400);
      jest.spyOn(taskDao, 'get').mockRejectedValue(httpError);

      await expect(controller.getTasks()).rejects.toThrow(HttpException);
    });
  });

  describe('getMockTasks', () => {
    it('should return mock tasks', async () => {
      const mockTasks = [createMockTaskDto(1, 'Mock Task 1')];
      jest.spyOn(taskDao, 'getMocks').mockResolvedValue(mockTasks);

      const result = await controller.getMockTasks();

      expect(taskDao.getMocks).toHaveBeenCalled();
      expect(result).toEqual(mockTasks);
    });

    it('should handle dao errors and wrap in InternalServerErrorException', async () => {
      jest.spyOn(taskDao, 'getMocks').mockRejectedValue(new Error('Mock generation failed'));

      await expect(controller.getMockTasks()).rejects.toThrow(InternalServerErrorException);
    });
  });
});