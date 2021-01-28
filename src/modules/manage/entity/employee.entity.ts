import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../base/BaseEntity';

@Entity({
  name: 'tb_employee',
})
export class EmployeeEntity extends BaseEntity {
  @Column()
  username: string;

  @Column({ nullable: true })
  password: string;

  @Column({ name: 'display_name' })
  displayName: string;

  @Column({ name: 'type', type: 'int', default: 2 })
  type: number;

  @Column({ name: 'disable', type: 'int', default: 0 })
  disable: number;

  @Column({ name: 'fcm_token', nullable: true })
  fcmToken: string;

  @Column({ name: 'user_id', default: '' })
  userId: string;

  @Column({ name: 'is_delete', type: 'int', default: 0 })
  isDelete: number;
}
