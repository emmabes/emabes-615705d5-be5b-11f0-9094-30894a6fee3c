import { UserTaskAccess } from '../../../src/database/entities/user-task-access.entity';
import { User } from '../../../src/database/entities/user.entity';
import { Task } from '../../../src/database/entities/task.entity';

describe('UserTaskAccess Entity', () => {
  it('should create a user-task access relationship', () => {
    const user = new User();
    user.id = 1;

    const task = new Task();
    task.id = 1;

    const access = new UserTaskAccess();
    access.userId = 1;
    access.taskId = 1;
    access.user = user;
    access.task = task;

    expect(access.userId).toBe(1);
    expect(access.taskId).toBe(1);
    expect(access.user).toBe(user);
    expect(access.task).toBe(task);
  });
});