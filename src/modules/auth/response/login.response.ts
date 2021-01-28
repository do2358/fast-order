import { UserEntity } from './../../user/entity/user.entity';
export class LoginResponse {
  token: string;
  user: UserEntity;
  constructor(token: string, userEntity: UserEntity) {
    this.token = token;
    this.user = userEntity;
  }
}
