import { User } from '../../../src/database/entities/user.entity';
import { Organization } from '../../../src/database/entities/organization.entity';
import { Role } from '../../../src/database/entities/role.entity';

describe('User Entity', () => {
  it('should create a user with required fields', () => {
    const user = new User();
    user.id = 1;
    user.username = 'testuser';
    user.password = 'password123';

    expect(user.id).toBe(1);
    expect(user.username).toBe('testuser');
    expect(user.password).toBe('password123');
  });

  it('should handle organization and role relationships', () => {
    const org = new Organization();
    org.id = 1;
    org.name = 'Test Org';

    const role = new Role();
    role.id = 1;
    role.name = 'Admin';

    const user = new User();
    user.id = 1;
    user.username = 'testuser';
    user.password = 'password123';
    user.orgId = 1;
    user.org = org;
    user.roleId = 1;
    user.role = role;

    expect(user.orgId).toBe(1);
    expect(user.org).toBe(org);
    expect(user.roleId).toBe(1);
    expect(user.role).toBe(role);
  });
});