import { Permission } from '../../src/app/models/permission.model';

describe('Permission Model', () => {
  it('should create a permission with required fields', () => {
    const permission: Permission = {
      id: 1,
      action: 'read'
    };

    expect(permission.id).toBe(1);
    expect(permission.action).toBe('read');
  });
});