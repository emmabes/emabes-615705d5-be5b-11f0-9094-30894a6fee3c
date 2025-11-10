import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskDao } from '../../src/dao/task.dao';
import { Task } from '../../src/database/entities/task.entity';
import { TaskDto } from '../../src/controller/dtos/task.dto';

describe('TaskDao', () => {
  let dao: TaskDao;
  let repository: Repository<Task>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskDao,
        {
          provide: getRepositoryToken(Task),
          useClass: Repository,
        },
      ],
    }).compile();

    dao = module.get<TaskDao>(TaskDao);
    repository = module.get<Repository<Task>>(getRepositoryToken(Task));
  });

  describe('get', () => {
    it('should return all tasks when no parameter provided', async () => {
      const mockTasks = [
        { id: 1, name: 'Task 1' },
        { id: 2, name: 'Task 2' }
      ];
      jest.spyOn(repository, 'find').mockResolvedValue(mockTasks);

      const result = await dao.get();

      expect(result).toEqual([
        { id: 1, name: 'Task 1' },
        { id: 2, name: 'Task 2' }
      ]);
    });

    it('should return all tasks when empty array provided', async () => {
      const mockTasks = [{ id: 1, name: 'Task 1' }];
      jest.spyOn(repository, 'find').mockResolvedValue(mockTasks);

      const result = await dao.get([]);

      expect(result).toEqual([{ id: 1, name: 'Task 1' }]);
    });

    it('should return specific tasks by ID', async () => {
      jest.spyOn(repository, 'findOne')
        .mockResolvedValueOnce({ id: 1, name: 'Task 1' })
        .mockResolvedValueOnce({ id: 3, name: 'Task 3' });

      const result = await dao.get([{ id: 1, name: '' }, { id: 3, name: '' }]);

      expect(result).toEqual([
        { id: 1, name: 'Task 1' },
        { id: 3, name: 'Task 3' }
      ]);
    });

    it('should return empty TaskDto for non-existent ID', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      const result = await dao.get([{ id: 999, name: '' }]);

      expect(result).toEqual([{ id: 999, name: '' }]);
    });

    it('should ignore null ID', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue({ id: 1, name: 'Task 1' });

      const result = await dao.get([
        { id: null, name: '' },
        { id: 1, name: '' }
      ]);

      expect(result).toEqual([{ id: 1, name: 'Task 1' }]);
    });

    it('should ignore undefined ID', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue({ id: 1, name: 'Task 1' });

      const result = await dao.get([
        { id: undefined, name: '' },
        { id: 1, name: '' }
      ]);

      expect(result).toEqual([{ id: 1, name: 'Task 1' }]);
    });

    it('should throw error for invalid ID format', async () => {
      await expect(dao.get([{ id: 'invalid' as any, name: '' }]))
        .rejects.toThrow('Invalid id format: invalid');
    });

    it('should throw error for non-integer ID', async () => {
      await expect(dao.get([{ id: 1.5, name: '' }]))
        .rejects.toThrow('Invalid id format: 1.5');
    });
  });
});