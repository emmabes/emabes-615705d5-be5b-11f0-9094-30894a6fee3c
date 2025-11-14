import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Task } from './entities/task.entity';
import { Organization } from './entities/organization.entity';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { UserTaskAccess } from './entities/user-task-access.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: configService.get('DATABASE_TYPE') as any,
        database: configService.get('DATABASE_PATH'),
        entities: [Task, Organization, User, Role, Permission, UserTaskAccess],
        synchronize: configService.get('DATABASE_SYNC') === 'true',
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}