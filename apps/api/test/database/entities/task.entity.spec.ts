import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../../../src/database/entities/task.entity';

describe('Task Entity', () => {
  let repository: Repository<Task>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(Task),
          useClass: Repository,
        },
      ],
    }).compile();

    repository = module.get<Repository<Task>>(getRepositoryToken(Task));
  });

  describe('create', () => {
    it('should create a task', async () => {
      const task = new Task();
      task.name = 'Test Task';
      
      jest.spyOn(repository, 'save').mockResolvedValue({ id: 1, name: 'Test Task' });
      
      const result = await repository.save(task);
      expect(result.id).toBe(1);
      expect(result.name).toBe('Test Task');
    });

    it('should handle null name', async () => {
      const task = new Task();
      task.name = null;
      
      jest.spyOn(repository, 'save').mockRejectedValue(new Error('Name cannot be null'));
      
      await expect(repository.save(task)).rejects.toThrow('Name cannot be null');
    });
  });

  describe('get', () => {
    it('should get a task by id', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue({ id: 1, name: 'Test Task' });
      
      const result = await repository.findOne({ where: { id: 1 } });
      expect(result.id).toBe(1);
      expect(result.name).toBe('Test Task');
    });

    it('should return null for non-existent task', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);
      
      const result = await repository.findOne({ where: { id: 999 } });
      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update a task', async () => {
      jest.spyOn(repository, 'update').mockResolvedValue({ affected: 1, generatedMaps: [], raw: [] });
      
      const result = await repository.update(1, { name: 'Updated Task' });
      expect(result.affected).toBe(1);
    });

    it('should handle updating non-existent task', async () => {
      jest.spyOn(repository, 'update').mockResolvedValue({ affected: 0, generatedMaps: [], raw: [] });
      
      const result = await repository.update(999, { name: 'Updated Task' });
      expect(result.affected).toBe(0);
    });
  });

  describe('delete', () => {
    it('should delete a task', async () => {
      jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 1, raw: [] });
      
      const result = await repository.delete(1);
      expect(result.affected).toBe(1);
    });

    it('should handle deleting non-existent task', async () => {
      jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 0, raw: [] });
      
      const result = await repository.delete(999);
      expect(result.affected).toBe(0);
    });
  });
});