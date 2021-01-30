import { MyLogger } from './../logger/my-logger.service';
import { AuthByPhoneResponse } from './response/auth-byphone.response';
import { STATUS, VERIFY_STATUS } from './../../constants/AppConfig';
import { LoginResponse } from './response/login.response';
import { OtpService } from './../otp/otp.service';
import { TokenService } from './../user/token.service';
import { EmployeeService } from './../manage/employee.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ErrorCode } from 'src/constants/ErrorCode';
import { AppException } from 'src/exception/app.exception';
import { validatePhone } from 'src/util/ValidateUtils';
import { UserService } from '../user/user.service';
import { AuthenticationDTO } from './dto/authen.dto';
import { use } from 'passport';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private employeeService: EmployeeService,
    private tokenService: TokenService,
    private otpService: OtpService,
    private logger: MyLogger,
  ) {}

  async authenticationByPhone(authenRequest: AuthenticationDTO) {
    if (!validatePhone(authenRequest.phone)) {
      AppException.throwBusinessException(ErrorCode.ERR_20101());
    }
    const user = await this.userService.findByPhone(authenRequest.phone);
    if (!user) {
      const newUser = await this.userService.createByPhone(authenRequest.phone);
      await this.otpService.sendOtp(newUser.id, newUser.phone);
      return new AuthByPhoneResponse(true, false);
    }
    if (user.isVerify === VERIFY_STATUS.NO) {
      await this.otpService.sendOtp(user.id, user.phone);
      return new AuthByPhoneResponse(false, false);
    }
    const employee = await this.employeeService.findOwnerEmployee(user.id);
    if (!employee) {
      return new AuthByPhoneResponse(true, false);
    }
    return new AuthByPhoneResponse(true, true);
  }
}
