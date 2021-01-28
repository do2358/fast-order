import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
  Column,
  DeleteDateColumn,
} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Timestamp;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Timestamp;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  deletedAt: Timestamp;

  @Column({ name: 'create_by', type: 'varchar', default: 'system' })
  createBy: string;

  @Column({ name: 'update_by', type: 'varchar', default: 'system' })
  updateBy: string;
}
