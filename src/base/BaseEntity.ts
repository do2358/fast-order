import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
  Column,
} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @CreateDateColumn({ name: 'create_at', type: 'timestamp' })
  createdAt: Timestamp;

  @UpdateDateColumn({ name: 'update_at', type: 'timestamp' })
  updateAt: Timestamp;

  @Column({ name: 'create_by', type: 'varchar', default: 'system' })
  createBy: string;

  @Column({ name: 'update_by', type: 'varchar', default: 'system' })
  updateBy: string;
}
