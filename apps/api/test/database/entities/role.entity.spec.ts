import { Role } from '../../../src/database/entities/role.entity';
import { Permission } from '../../../src/database/entities/permission.entity';

describe('Role Entity', () => {
  it('should create a role with required fields', () => {
    const role = new Role();
    role.id = 1;
    role.name = 'Admin';

    expect(role.id).toBe(1);
    expect(role.name).toBe('Admin');
  });

  it('should handle permissions relationship', () => {
    const permission = new Permission();
    permission.id = 1;
    permission.action = 'read';

    const role = new Role();
    role.id = 1;
    role.name = 'Admin';
    role.permissions = [permission];

    expect(role.permissions).toHaveLength(1);
    expect(role.permissions[0].action).toBe('read');
  });
});