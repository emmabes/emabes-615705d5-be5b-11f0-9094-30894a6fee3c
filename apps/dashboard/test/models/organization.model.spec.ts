import { Organization } from '../../src/app/models/organization.model';

describe('Organization Model', () => {
  it('should create an organization with required fields', () => {
    const org: Organization = {
      id: 1,
      name: 'Test Org'
    };

    expect(org.id).toBe(1);
    expect(org.name).toBe('Test Org');
  });

  it('should handle parent-child relationships', () => {
    const org: Organization = {
      id: 1,
      name: 'Parent Org',
      parentId: undefined,
      childIds: [2, 3]
    };

    expect(org.childIds).toEqual([2, 3]);
    expect(org.parentId).toBeUndefined();
  });
});