import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '../database/database.module';
import { TaskController } from '../controller/task.controller';
import { AuthController } from '../controller/auth.controller';
import { TaskDao } from '../dao/task.dao';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../database/entities/task.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Task])],
  controllers: [AppController, TaskController, AuthController],
  providers: [AppService, TaskDao],
})
export class AppModule {}
