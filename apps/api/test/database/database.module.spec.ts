import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { DatabaseModule } from '../../src/database/database.module';
import { Task } from '../../src/database/entities/task.entity';

describe('DatabaseModule', () => {
  let module: TestingModule;
  let dataSource: DataSource;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Task],
          synchronize: true,
        }),
      ],
    }).compile();

    dataSource = module.get<DataSource>(DataSource);
  });

  afterEach(async () => {
    await module.close();
  });

  it('should establish database connection', async () => {
    expect(dataSource.isInitialized).toBe(true);
  });

  it('should create Task table', async () => {
    const hasTable = await dataSource.query(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='task'"
    );
    expect(hasTable).toHaveLength(1);
  });

  it('should have correct Task table schema', async () => {
    const columns = await dataSource.query("PRAGMA table_info(task)");
    const columnNames = columns.map(col => col.name);
    
    expect(columnNames).toContain('id');
    expect(columnNames).toContain('name');
  });

  it('should handle database transactions', async () => {
    await dataSource.transaction(async manager => {
      const task = manager.create(Task, { name: 'Transaction Test' });
      const saved = await manager.save(task);
      expect(saved.id).toBeDefined();
    });
  });
});