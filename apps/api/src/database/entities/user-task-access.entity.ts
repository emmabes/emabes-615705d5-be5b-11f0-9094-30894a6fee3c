import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Task } from './task.entity';

@Entity('user_task_access')
export class UserTaskAccess {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  taskId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Task)
  @JoinColumn({ name: 'taskId' })
  task: Task;
}