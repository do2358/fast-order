import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../base/BaseEntity';

@Entity({
  name: 'tb_token',
})
export class TokenEntity extends BaseEntity {
  @Column()
  token: string;

  @Column({ name: 'employee_id' })
  employeeId: string;
}
