import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
      const result = await dao.get();

      expect(result).toHaveLength(8); // Mock data has 8 tasks
      expect(result[0].id).toBe(1);
      expect(result[0].name).toBe('Design System Implementation');
    });

    it('should return all tasks when empty array provided', async () => {
      const result = await dao.get([]);

      expect(result).toHaveLength(8); // Mock data has 8 tasks
    });

    it('should return specific tasks by ID', async () => {
      jest.spyOn(repository, 'findOne')
        .mockResolvedValueOnce(createMockTask(1, 'Task 1'))
        .mockResolvedValueOnce(createMockTask(3, 'Task 3'));

      const mockDto = { 
        id: 1, 
        name: '', 
        org: { id: 1, name: 'Test' }, 
        adminId: 1, 
        ownerId: 1, 
        isActive: true, 
        permissions: [] 
      } as TaskDto;

      const result = await dao.get([mockDto]);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(1);
    });

    it('should handle non-existent ID', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      const mockDto = { 
        id: 999, 
        name: '', 
        org: { id: 1, name: 'Test' }, 
        adminId: 1, 
        ownerId: 1, 
        isActive: true, 
        permissions: [] 
      } as TaskDto;

      const result = await dao.get([mockDto]);

      expect(result).toEqual([]);
    });
  });
});