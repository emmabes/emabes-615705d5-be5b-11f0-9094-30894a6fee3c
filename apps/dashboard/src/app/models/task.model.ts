import { Organization } from './organization.model';
import { Permission } from './permission.model';

export interface Task {
  id: number;
  name?: string;
  org: Organization;
  adminId: number;
  ownerId: number;
  viewerIds?: number[];
  status?: string;
  priority?: string;
  category?: string;
  startDate?: string;
  endDate?: string;
  isActive: boolean;
  deleteDate?: string;
  permissions: Permission[];
}