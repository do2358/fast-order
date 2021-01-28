import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../base/BaseEntity';

@Entity({
  name: 'tb_store_employee',
})
export class StoreEmployeeEntity extends BaseEntity {
  @Column()
  storeId: string;

  @Column()
  employeeId: number;
}
