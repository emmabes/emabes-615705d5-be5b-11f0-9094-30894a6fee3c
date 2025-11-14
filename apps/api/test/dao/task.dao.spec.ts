import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { TaskDao } from '../../src/dao/task.dao';
import { Task } from '../../src/database/entities/task.entity';
import { TaskDto } from '../../src/controller/dtos/task.dto';

describe('TaskDao', () => {
  let dao: TaskDao;
  let repository: Repository<Task>;

  const createMockTask = (id: number, name: string): Task => ({
    id,
    name,
    orgId: 1,
    org: { id: 1, name: 'Test Org' },
    adminId: 1,
    ownerId: 1,
    isActive: true,
    status: 'active',
    priority: 'medium',
    category: 'test',
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    deleteDate: null
  } as Task);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskDao,
        {
          provide: getRepositoryToken(Task),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    dao = module.get<TaskDao>(TaskDao);
    repository = module.get<Repository<Task>>(getRepositoryToken(Task));
  });

  describe('get', () => {
    it('should return all tasks when no parameter provided', async () => {
      const mockTasks = [createMockTask(1, 'Task 1'), createMockTask(2, 'Task 2')];
      jest.spyOn(repository, 'find').mockResolvedValue(mockTasks);

      const result = await dao.get();

      expect(repository.find).toHaveBeenCalledWith({ relations: ['org'] });
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe(1);
    });

    it('should return specific tasks by ID using batch query', async () => {
      const mockTasks = [createMockTask(1, 'Task 1')];
      jest.spyOn(repository, 'find').mockResolvedValue(mockTasks);

      const mockDtos = [{ id: 1, name: '', org: { id: 1, name: 'Test' }, adminId: 1, ownerId: 1, isActive: true, permissions: [] } as TaskDto];

      const result = await dao.get(mockDtos);

      expect(repository.find).toHaveBeenCalledWith({
        where: { id: In([1]) },
        relations: ['org']
      });
      expect(result).toHaveLength(1);
    });

    it('should throw BadRequestException for invalid ID format', async () => {
      const mockDto = { id: 'invalid', name: '', org: { id: 1, name: 'Test' }, adminId: 1, ownerId: 1, isActive: true, permissions: [] } as any;

      await expect(dao.get([mockDto])).rejects.toThrow(BadRequestException);
    });


  });

  describe('getMocks', () => {
    it('should return 8 mock tasks', async () => {
      const result = await dao.getMocks();

      expect(result).toHaveLength(8);
      expect(result[0].name).toBe('Design System Implementation');
      expect(result[0].org.name).toBe('Engineering');
    });
  });
});