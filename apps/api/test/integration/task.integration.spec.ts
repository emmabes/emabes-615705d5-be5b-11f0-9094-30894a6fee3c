import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from '../../src/app/app.module';
import { Task } from '../../src/database/entities/task.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DatabaseModule } from '../../src/database/database.module';

describe('Task Integration Tests', () => {
  let app: INestApplication;
  let taskRepository: Repository<Task>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
    .overrideModule(DatabaseModule)
    .useModule(
      TypeOrmModule.forRoot({
        type: 'sqlite',
        database: ':memory:',
        entities: [Task],
        synchronize: true,
      })
    )
    .compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    taskRepository = moduleFixture.get<Repository<Task>>(getRepositoryToken(Task));
    
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await taskRepository.clear();
  });

  describe('GET /api/tasks', () => {
    it('should return empty array when no tasks exist', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/tasks')
        .expect(200);

      expect(response.body).toEqual([]);
    });

    it('should return all tasks', async () => {
      await taskRepository.save([
        { name: 'Task 1' },
        { name: 'Task 2' }
      ]);

      const response = await request(app.getHttpServer())
        .get('/api/tasks')
        .expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('name', 'Task 1');
      expect(response.body[1]).toHaveProperty('name', 'Task 2');
    });
  });
});