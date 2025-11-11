import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Organization } from './entities/organization.entity';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { UserTaskAccess } from './entities/user-task-access.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data/app.db',
      entities: [Task, Organization, User, Role, Permission, UserTaskAccess],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}