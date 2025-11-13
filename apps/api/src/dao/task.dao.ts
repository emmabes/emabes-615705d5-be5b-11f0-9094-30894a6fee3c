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
      const tasks = await this.taskRepository.find({ relations: ['org'] });
      return tasks.map(task => this.mapToDto(task));
    }

    const results: TaskDto[] = [];
    
    for (const dto of taskDtos) {
      if (dto.id === null || dto.id === undefined) {
        continue;
      }

      if (typeof dto.id !== 'number' || !Number.isInteger(dto.id)) {
        throw new Error(`Invalid id format: ${dto.id}`);
      }

      const task = await this.taskRepository.findOne({ 
        where: { id: dto.id },
        relations: ['org']
      });
      
      if (task) {
        results.push(this.mapToDto(task));
      }
    }

    return results;
  }

  async getMocks(): Promise<TaskDto[]> {
    return this.getMockTasks();
  }

  private getMockTasks(): TaskDto[] {
    return [
      {
        id: 1,
        name: 'Design System Implementation',
        org: { id: 1, name: 'Engineering' },
        adminId: 1,
        ownerId: 2,
        viewerIds: [3],
        status: 'in-progress',
        priority: 'high',
        category: 'development',
        startDate: '2024-01-15',
        endDate: '2024-02-15',
        isActive: true,
        deleteDate: null,
        permissions: [{ id: 1, action: 'read' }, { id: 2, action: 'write' }]
      },
      {
        id: 2,
        name: 'User Authentication Module',
        org: { id: 1, name: 'Engineering' },
        adminId: 1,
        ownerId: 2,
        viewerIds: [3],
        status: 'completed',
        priority: 'medium',
        category: 'security',
        startDate: '2024-01-01',
        endDate: '2024-01-30',
        isActive: true,
        deleteDate: null,
        permissions: [{ id: 1, action: 'read' }]
      },
      {
        id: 3,
        name: 'Database Migration Scripts',
        org: { id: 2, name: 'DevOps' },
        adminId: 1,
        ownerId: 2,
        viewerIds: [3],
        status: 'pending',
        priority: 'high',
        category: 'infrastructure',
        startDate: '2024-02-01',
        endDate: '2024-02-28',
        isActive: true,
        deleteDate: null,
        permissions: [{ id: 1, action: 'read' }, { id: 3, action: 'execute' }]
      },
      {
        id: 4,
        name: 'API Documentation Update',
        org: { id: 1, name: 'Engineering' },
        adminId: 1,
        ownerId: 2,
        viewerIds: [3],
        status: 'in-progress',
        priority: 'low',
        category: 'documentation',
        startDate: '2024-01-20',
        endDate: '2024-02-10',
        isActive: true,
        deleteDate: null,
        permissions: [{ id: 1, action: 'read' }, { id: 2, action: 'write' }]
      },
      {
        id: 5,
        name: 'Performance Optimization',
        org: { id: 1, name: 'Engineering' },
        adminId: 1,
        ownerId: 2,
        viewerIds: [3],
        status: 'pending',
        priority: 'medium',
        category: 'performance',
        startDate: '2024-02-15',
        endDate: '2024-03-15',
        isActive: true,
        deleteDate: null,
        permissions: [{ id: 1, action: 'read' }]
      },
      {
        id: 6,
        name: 'Security Audit',
        org: { id: 3, name: 'Security' },
        adminId: 1,
        ownerId: 2,
        viewerIds: [3],
        status: 'completed',
        priority: 'high',
        category: 'security',
        startDate: '2024-01-05',
        endDate: '2024-01-25',
        isActive: true,
        deleteDate: null,
        permissions: [{ id: 1, action: 'read' }, { id: 4, action: 'audit' }]
      },
      {
        id: 7,
        name: 'Mobile App Testing',
        org: { id: 4, name: 'QA' },
        adminId: 2,
        ownerId: 3,
        viewerIds: [1],
        status: 'in-progress',
        priority: 'medium',
        category: 'testing',
        startDate: '2024-01-25',
        endDate: '2024-02-20',
        isActive: true,
        deleteDate: null,
        permissions: [{ id: 1, action: 'read' }, { id: 5, action: 'test' }]
      },
      {
        id: 8,
        name: 'Customer Feedback Analysis',
        org: { id: 5, name: 'Product' },
        adminId: 3,
        ownerId: 1,
        viewerIds: [2],
        status: 'pending',
        priority: 'low',
        category: 'research',
        startDate: '2024-02-05',
        endDate: '2024-02-25',
        isActive: true,
        deleteDate: null,
        permissions: [{ id: 1, action: 'read' }, { id: 6, action: 'analyze' }]
      }
    ];
  }

  private mapToDto(task: Task): TaskDto {
    return {
      id: task.id,
      name: task.name,
      org: task.org ? {
        id: task.org.id,
        name: task.org.name,
        parentId: task.org.parentId,
        childIds: []
      } : { id: 0, name: 'Unknown' },
      adminId: task.adminId,
      ownerId: task.ownerId,
      viewerIds: [],
      status: task.status,
      priority: task.priority,
      category: task.category,
      startDate: task.startDate,
      endDate: task.endDate,
      isActive: task.isActive,
      deleteDate: task.deleteDate,
      permissions: []
    };
  }
}
