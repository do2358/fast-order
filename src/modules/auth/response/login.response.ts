import { EmployeeEntity } from './../../manage/entity/employee.entity';
import { UserEntity } from './../../user/entity/user.entity';
export class LoginResponse {
  token: string;
  employee: EmployeeEntity;
  userInfo: UserEntity;
  constructor(token: string, userInfo: UserEntity, employee: EmployeeEntity) {
    this.token = token;
    this.employee = employee;
    this.userInfo = userInfo;
  }
}
