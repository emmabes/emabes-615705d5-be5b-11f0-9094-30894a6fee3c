import { Task } from '../../src/app/models/task.model';

export function createMockTask(id: number, name: string): Task {
  return {
    id,
    name,
    org: { id: 1, name: 'Test Org' },
    adminId: 1,
    ownerId: 1,
    isActive: true,
    permissions: []
  };
}