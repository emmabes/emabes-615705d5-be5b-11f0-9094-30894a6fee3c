import { Controller, Get } from '@nestjs/common';
import { TaskDto } from './dtos/task.dto';
import { TaskDao } from '../dao/task.dao';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskDao: TaskDao) {}

  @Get()
  async getTasks(): Promise<TaskDto[]> {
    return await this.taskDao.get();
  }

  @Get('mocks')
  async getMockTasks(): Promise<TaskDto[]> {
    return await this.taskDao.getMocks();
  }
}