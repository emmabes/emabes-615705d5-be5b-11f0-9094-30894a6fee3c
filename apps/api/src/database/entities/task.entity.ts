import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Organization } from './organization.entity';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name?: string;

  @Column()
  orgId: number;

  @ManyToOne(() => Organization)
  @JoinColumn({ name: 'orgId' })
  org: Organization;

  @Column()
  adminId: number;

  @Column()
  ownerId: number;

  @Column({ nullable: true })
  status?: string;

  @Column({ nullable: true })
  priority?: string;

  @Column({ nullable: true })
  category?: string;

  @Column({ nullable: true })
  startDate?: string;

  @Column({ nullable: true })
  endDate?: string;

  @Column()
  isActive: boolean;

  @Column({ nullable: true })
  deleteDate?: string;
}