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

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private employeeService: EmployeeService,
    private tokenService: TokenService,
    private otpService: OtpService,
  ) {}

  async authenticationByPhone(authenRequest: AuthenticationDTO) {
    if (!validatePhone(authenRequest.phone)) {
      AppException.throwBusinessException(ErrorCode.ERR_20101());
    }
    const user = await this.userService.findByPhone(authenRequest.phone);
    if (!user) {
      const newUser = await this.userService.createByPhone(authenRequest.phone);
      const newEmployeee = await this.employeeService.createOwnerEmployeee(
        authenRequest.phone,
        newUser.id,
      );
      const token = this.jwtService.sign(
        {
          employeeId: newEmployeee.id,
          userId: newUser.id,
          type: newEmployeee.type,
        },
        {
          expiresIn: '1d',
        },
      );
      await Promise.all([
        this.tokenService.createTokenUser(newEmployeee.id, token),
        this.otpService.sendOtp(newUser.id, newUser.phone),
      ]);
      delete newUser.otp_id;
      return new LoginResponse(token, newUser);
    }
    const employeee = await this.employeeService.findOwnerEmployee(user.id);
    const token = this.jwtService.sign(
      {
        employeeId: employeee.id,
        userId: user.id,
        type: employeee.type,
      },
      {
        expiresIn: '1d',
      },
    );
    if (user.disable === STATUS.DISABLE) {
      AppException.throwBusinessException(ErrorCode.ERR_20102());
    }
    await this.tokenService.updateTokenUser(employeee.id, token);
    if (user.isVerify === VERIFY_STATUS.NO) {
      await this.otpService.sendOtp(user.id, user.phone);
    }
    delete user.otp_id;
    return new LoginResponse(token, user);
  }
}
