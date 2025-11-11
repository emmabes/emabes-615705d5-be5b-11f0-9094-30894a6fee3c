import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from '../../src/controller/task.controller';
import { TaskDao } from '../../src/dao/task.dao';
import { Task } from '../../src/database/entities/task.entity';
import { Organization } from '../../src/database/entities/organization.entity';

describe('Task Integration', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Task, Organization],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Task, Organization]),
      ],
      controllers: [TaskController],
      providers: [TaskDao],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  }, 10000);

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  it('/tasks (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/tasks')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });
});