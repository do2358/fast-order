import { OTP_IS_USE } from './../../../constants/AppConfig';
import { Column, Entity, Timestamp } from 'typeorm';
import { BaseEntity } from './../../../base/BaseEntity';

@Entity({ name: 'tb_otp' })
export class OtpEntity extends BaseEntity {
  @Column()
  otp: string;

  @Column({ name: 'expire', type: 'timestamp' })
  exprie: Date;

  @Column({ name: 'phone' })
  phone: string;
}
