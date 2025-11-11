import { Task } from '../../src/app/models/task.model';
import { Organization } from '../../src/app/models/organization.model';
import { Permission } from '../../src/app/models/permission.model';

describe('Task Model', () => {
  it('should create a task with required fields', () => {
    const org: Organization = {
      id: 1,
      name: 'Test Org'
    };

    const permission: Permission = {
      id: 1,
      action: 'read'
    };

    const task: Task = {
      id: 1,
      name: 'Test Task',
      org: org,
      adminId: 1,
      ownerId: 2,
      isActive: true,
      permissions: [permission]
    };

    expect(task.id).toBe(1);
    expect(task.name).toBe('Test Task');
    expect(task.org).toBe(org);
    expect(task.adminId).toBe(1);
    expect(task.ownerId).toBe(2);
    expect(task.isActive).toBe(true);
    expect(task.permissions).toHaveLength(1);
  });

  it('should handle optional fields', () => {
    const org: Organization = { id: 1 };

    const task: Task = {
      id: 1,
      org: org,
      adminId: 1,
      ownerId: 2,
      isActive: true,
      permissions: [],
      status: 'in-progress',
      category: 'development',
      viewerIds: [3, 4],
      startDate: '2024-01-01',
      endDate: '2024-01-31'
    };

    expect(task.status).toBe('in-progress');
    expect(task.category).toBe('development');
    expect(task.viewerIds).toEqual([3, 4]);
    expect(task.startDate).toBe('2024-01-01');
    expect(task.endDate).toBe('2024-01-31');
  });
});