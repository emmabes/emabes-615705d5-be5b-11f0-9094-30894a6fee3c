import { Organization } from '../../../src/database/entities/organization.entity';

describe('Organization Entity', () => {
  it('should create an organization with required fields', () => {
    const org = new Organization();
    org.id = 1;
    org.name = 'Test Org';

    expect(org.id).toBe(1);
    expect(org.name).toBe('Test Org');
  });

  it('should handle parent-child relationships', () => {
    const parent = new Organization();
    parent.id = 1;
    parent.name = 'Parent Org';

    const child = new Organization();
    child.id = 2;
    child.name = 'Child Org';
    child.parentId = 1;
    child.parent = parent;

    expect(child.parentId).toBe(1);
    expect(child.parent).toBe(parent);
  });
});