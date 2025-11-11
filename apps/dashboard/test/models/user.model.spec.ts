import { User } from '../../src/app/models/user.model';
import { Organization } from '../../src/app/models/organization.model';
import { Role } from '../../src/app/models/role.model';

describe('User Model', () => {
  it('should create a user with minimal fields', () => {
    const user: User = {
      id: 1
    };

    expect(user.id).toBe(1);
    expect(user.org).toBeUndefined();
    expect(user.role).toBeUndefined();
  });

  it('should create a user with org and role', () => {
    const org: Organization = {
      id: 1,
      name: 'Test Org'
    };

    const role: Role = {
      id: 1,
      name: 'Admin',
      permissions: []
    };

    const user: User = {
      id: 1,
      org: org,
      role: role
    };

    expect(user.id).toBe(1);
    expect(user.org).toBe(org);
    expect(user.role).toBe(role);
  });
});