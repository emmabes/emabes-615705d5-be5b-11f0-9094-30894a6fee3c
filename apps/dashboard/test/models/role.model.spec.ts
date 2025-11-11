import { Role } from '../../src/app/models/role.model';
import { Permission } from '../../src/app/models/permission.model';

describe('Role Model', () => {
  it('should create a role with permissions', () => {
    const permission: Permission = {
      id: 1,
      action: 'read'
    };

    const role: Role = {
      id: 1,
      name: 'Admin',
      permissions: [permission]
    };

    expect(role.id).toBe(1);
    expect(role.name).toBe('Admin');
    expect(role.permissions).toHaveLength(1);
    expect(role.permissions[0].action).toBe('read');
  });
});