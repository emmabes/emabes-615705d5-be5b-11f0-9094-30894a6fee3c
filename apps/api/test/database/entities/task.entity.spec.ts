import { Task } from '../../../src/database/entities/task.entity';
import { Organization } from '../../../src/database/entities/organization.entity';

describe('Task Entity', () => {
  it('should create a task with required fields', () => {
    const org = new Organization();
    org.id = 1;

    const task = new Task();
    task.id = 1;
    task.name = 'Test Task';
    task.orgId = 1;
    task.org = org;
    task.adminId = 1;
    task.ownerId = 2;
    task.isActive = true;

    expect(task.id).toBe(1);
    expect(task.name).toBe('Test Task');
    expect(task.orgId).toBe(1);
    expect(task.adminId).toBe(1);
    expect(task.ownerId).toBe(2);
    expect(task.isActive).toBe(true);
  });

  it('should handle optional fields', () => {
    const task = new Task();
    task.status = 'in-progress';
    task.category = 'development';
    task.startDate = '2024-01-01';
    task.endDate = '2024-01-31';
    task.deleteDate = '2024-02-01';

    expect(task.status).toBe('in-progress');
    expect(task.category).toBe('development');
    expect(task.startDate).toBe('2024-01-01');
    expect(task.endDate).toBe('2024-01-31');
    expect(task.deleteDate).toBe('2024-02-01');
  });

});