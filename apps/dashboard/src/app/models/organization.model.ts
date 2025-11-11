export interface Organization {
  id: number;
  name?: string;
  parentId?: number;
  childIds?: number[];
}