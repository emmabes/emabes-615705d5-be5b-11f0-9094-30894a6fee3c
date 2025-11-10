import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../database/entities/task.entity';
import { TaskDto } from '../controller/dtos/task.dto';

@Injectable()
export class TaskDao {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async get(taskDtos?: TaskDto[]): Promise<TaskDto[]> {
    if (!taskDtos || taskDtos.length === 0) {
      const tasks = await this.taskRepository.find();
      return tasks.map(task => ({ id: task.id, name: task.name }));
    }

    const results: TaskDto[] = [];
    
    for (const dto of taskDtos) {
      if (dto.id === null || dto.id === undefined) {
        continue;
      }

      if (typeof dto.id !== 'number' || !Number.isInteger(dto.id)) {
        throw new Error(`Invalid id format: ${dto.id}`);
      }

      const task = await this.taskRepository.findOne({ where: { id: dto.id } });
      
      if (task) {
        results.push({ id: task.id, name: task.name });
      } else {
        results.push({ id: dto.id, name: '' });
      }
    }

    return results;
  }
}