import { Organization } from './organization.model';
import { Role } from './role.model';

export interface User {
  id: number;
  org?: Organization;
  role?: Role;
}