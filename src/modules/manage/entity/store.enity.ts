import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../base/BaseEntity';

@Entity({
  name: 'tb_store',
})
export class StoreEntity extends BaseEntity {
  @Column({ name: 'store_name' })
  storeName: string;

  @Column()
  description: string;

  @Column({ name: 'type', type: 'int', default: 2 })
  accountType: number;

  @Column({ name: 'user_id', default: '' })
  userId: string;

  @Column({ name: 'is_delete', type: 'int', default: 0 })
  isDelete: number;
}
