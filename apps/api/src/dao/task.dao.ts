import { Injectable, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Task } from '../database/entities/task.entity';
import { TaskDto } from '../controller/dtos/task.dto';

@Injectable()
export class TaskDao {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async get(taskDtos?: TaskDto[]): Promise<TaskDto[]> {
    try {
      if (!taskDtos || taskDtos.length === 0) {
        return this.getAllTasks();
      }
      
      const validIds = this.extractValidIds(taskDtos);
      
      if (validIds.length === 0) return [];
      
      return this.getTasksByIds(validIds);
    } catch (error) {
      this.handleGetError(error);
    }
  }

  private async getAllTasks(): Promise<TaskDto[]> {
    const tasks = await this.taskRepository.find({ relations: ['org'] });
    return tasks.map(task => this.mapToDto(task));
  }

  private extractValidIds(taskDtos: TaskDto[]): number[] {
    const validIds: number[] = [];
    
    for (const dto of taskDtos) {
      if (dto.id === null || dto.id === undefined) continue;
      
      this.validateId(dto.id);
      validIds.push(dto.id);
    }
    
    return validIds;
  }

  private validateId(id: any): void {
    if (typeof id !== 'number' || !Number.isInteger(id)) {
      throw new BadRequestException(`Invalid id format: ${id}`);
    }
  }

  private async getTasksByIds(validIds: number[]): Promise<TaskDto[]> {
    const tasks = await this.taskRepository.find({
      where: { id: In(validIds) },
      relations: ['org']
    });
    
    return tasks.map(task => this.mapToDto(task));
  }

  private handleGetError(error: any): never {
    if (error instanceof BadRequestException) {
      throw error;
    }
    throw new InternalServerErrorException('Failed to retrieve tasks from database');
  }

  async getMocks(): Promise<TaskDto[]> {
    try {
      return this.getMockTasks();
    } catch (error) {
      throw new InternalServerErrorException('Failed to generate mock tasks');
    }
  }

  private getMockTasks(): TaskDto[] {
    return [
      this.createMockTask(1, 'Design System Implementation', 'Engineering', 'in-progress', 'high', 'development', -10, 7),
      this.createMockTask(2, 'User Authentication Module', 'Engineering', 'completed', 'medium', 'security', -14, 2),
      this.createMockTask(3, 'Database Migration Scripts', 'DevOps', 'pending', 'high', 'infrastructure', 5, 25),
      this.createMockTask(4, 'API Documentation Update', 'Engineering', 'in-progress', 'low', 'documentation', -5, 5),
      this.createMockTask(5, 'Performance Optimization', 'Engineering', 'pending', 'medium', 'performance', 8, 30),
      this.createMockTask(6, 'Security Audit', 'Security', 'completed', 'high', 'security', -10, 4),
      this.createMockTask(7, 'Mobile App Testing', 'QA', 'in-progress', 'medium', 'testing', -3, 9),
      this.createMockTask(8, 'Customer Feedback Analysis', 'Product', 'pending', 'low', 'research', 10, 35)
    ];
  }

  private createMockTask(
    id: number,
    name: string,
    orgName: string,
    status: string,
    priority: string,
    category: string,
    startDaysOffset: number,
    endDaysOffset: number
  ): TaskDto {
    return {
      id,
      name,
      org: this.createMockOrg(orgName),
      adminId: 1,
      ownerId: 2,
      viewerIds: [3],
      status,
      priority,
      category,
      startDate: this.formatDate(this.addDays(new Date(), startDaysOffset)),
      endDate: this.formatDate(this.addDays(new Date(), endDaysOffset)),
      isActive: true,
      deleteDate: null,
      permissions: this.createMockPermissions(status)
    };
  }

  private createMockOrg(name: string) {
    const orgMap = {
      'Engineering': { id: 1, name: 'Engineering' },
      'DevOps': { id: 2, name: 'DevOps' },
      'Security': { id: 3, name: 'Security' },
      'QA': { id: 4, name: 'QA' },
      'Product': { id: 5, name: 'Product' }
    };
    return orgMap[name] || { id: 1, name: 'Engineering' };
  }

  private createMockPermissions(status: string) {
    const basePermissions = [{ id: 1, action: 'read' }];
    if (status === 'in-progress') {
      basePermissions.push({ id: 2, action: 'write' });
    }
    return basePermissions;
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  private addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
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
