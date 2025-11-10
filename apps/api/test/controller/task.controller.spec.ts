import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from '../../src/controller/task.controller';
import { TaskDto } from '../../src/controller/dtos/task.dto';
import { TaskDao } from '../../src/dao/task.dao';

describe('TaskController', () => {
  let controller: TaskController;
  let taskDao: TaskDao;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskDao,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController);
    taskDao = module.get<TaskDao>(TaskDao);
  });

  describe('getTasks', () => {
    it('should return an array of tasks', async () => {
      const mockTasks = [{ id: 1, name: 'Task 1' }, { id: 2, name: 'Task 2' }];
      jest.spyOn(taskDao, 'get').mockResolvedValue(mockTasks);
      
      const result = await controller.getTasks();
      
      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(2);
    });

    it('should return tasks with correct structure', async () => {
      const mockTasks = [{ id: 1, name: 'Task 1' }];
      jest.spyOn(taskDao, 'get').mockResolvedValue(mockTasks);
      
      const result = await controller.getTasks();
      
      result.forEach(task => {
        expect(task).toHaveProperty('id');
        expect(task).toHaveProperty('name');
        expect(typeof task.id).toBe('number');
        expect(typeof task.name).toBe('string');
      });
    });

    it('should call taskDao.get with no parameters', async () => {
      const mockTasks = [{ id: 1, name: 'Task 1' }];
      jest.spyOn(taskDao, 'get').mockResolvedValue(mockTasks);
      
      await controller.getTasks();
      
      expect(taskDao.get).toHaveBeenCalledWith();
    });
  });
});