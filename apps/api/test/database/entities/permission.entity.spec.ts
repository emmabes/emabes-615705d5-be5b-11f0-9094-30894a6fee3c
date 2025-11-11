import { Permission } from '../../../src/database/entities/permission.entity';

describe('Permission Entity', () => {
  it('should create a permission with required fields', () => {
    const permission = new Permission();
    permission.id = 1;
    permission.action = 'read';

    expect(permission.id).toBe(1);
    expect(permission.action).toBe('read');
  });
});