import {
  STATUS,
  DELETE_STATUS,
  VERIFY_STATUS,
} from './../../../constants/AppConfig';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './../../../base/BaseEntity';
import { EmployeeRole } from 'src/constants/EmplyeeContant';

@Entity({
  name: 'tb_user',
})
export class UserEntity extends BaseEntity {
  @Column()
  phone: string;

  @Column({ name: 'is_verify', type: 'int', default: VERIFY_STATUS.NO })
  isVerify: number;

  @Column({ name: 'is_delete', type: 'int', default: DELETE_STATUS.NO })
  isDelete: number;

  @Column({ name: 'account_type', type: 'int', default: EmployeeRole.OWNER })
  accountType: number;

  @Column({ name: 'disable', type: 'int', default: STATUS.ENABLE })
  disable: number;

  @Column({ name: 'otp_id', nullable: true })
  otpId: string;
}
