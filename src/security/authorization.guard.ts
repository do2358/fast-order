import { type } from 'os';
import { JwtService } from '@nestjs/jwt';
import { ErrorCode } from 'src/constants/ErrorCode';
import { AppException } from '../exception/app.exception';
import { UserService } from '../modules/user/user.service';
import { TokenService } from '../modules/user/token.service';
import {
  Injectable,
  Inject,
  CanActivate,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class FOAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly tokenService: TokenService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const secured = this.reflector.get<string[]>(
      'secured',
      context.getHandler(),
    );

    if (!secured) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userTokenInfo = await this.tokenService.decodeToken(
      request.headers.token,
    );
    if (!userTokenInfo || !userTokenInfo.userId || !userTokenInfo.employeeId) {
      AppException.throwBusinessException(ErrorCode.ERR_30002());
    }
    request.headers.user_id = userTokenInfo.userId;
    request.headers.employeeId = userTokenInfo.employeeId;
    request.headers.type = userTokenInfo.type;
    return true;
  }
}
