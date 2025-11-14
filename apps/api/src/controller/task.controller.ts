import { Controller, Get, HttpException, InternalServerErrorException } from '@nestjs/common';
import { TaskDto } from './dtos/task.dto';
import { TaskDao } from '../dao/task.dao';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskDao: TaskDao) {}

  @Get()
  async getTasks(): Promise<TaskDto[]> {
    try {
      return await this.taskDao.get();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch tasks');
    }
  }

  @Get('mocks')
  async getMockTasks(): Promise<TaskDto[]> {
    try {
      return await this.taskDao.getMocks();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch mock tasks');
    }
  }
}