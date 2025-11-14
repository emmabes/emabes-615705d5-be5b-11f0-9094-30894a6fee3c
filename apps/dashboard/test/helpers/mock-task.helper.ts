import { Task } from '../../src/app/models/task.model';

export function createMockTask(id: number, name: string, status = 'pending'): Task {
  return {
    id,
    name,
    org: { id: 1, name: 'Test Org' },
    adminId: 1,
    ownerId: 1,
    isActive: true,
    permissions: [],
    status,
    priority: 'medium',
    category: 'test',
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    deleteDate: undefined
  };
}