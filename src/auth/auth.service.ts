import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, plainPassword: string): Promise<any> {
    // const user = await this.userService.findByUsername(username);
    // if (
    //   user &&
    //   (await this.userService.compareHashedPassword(
    //     plainPassword,
    //     user.password,
    //   ))
    // ) {
    //   delete user.password;

    //   return user;
    // }

    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
