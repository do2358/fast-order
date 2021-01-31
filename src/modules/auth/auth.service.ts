import { LoginDTO } from './dto/login.dto';
import { CreateEmployeeOwnerDTO } from './dto/create-employee-owner.dto';
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
import { validateLengthPwd, validatePhone } from 'src/util/ValidateUtils';
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
    console.log(user);
    if (!user) {
      const newUser = await this.userService.createByPhone(authenRequest.phone);
      await this.otpService.sendOtp(newUser.id, newUser.phone);
      return new AuthByPhoneResponse(false, false);
    }
    if (user.disable === STATUS.DISABLE) {
      AppException.throwBusinessException(ErrorCode.ERR_20102());
    }
    if (user.isVerify === VERIFY_STATUS.NO) {
      await this.otpService.sendOtp(user.id, user.phone);
      return new AuthByPhoneResponse(false, false);
    }
    const employee = await this.employeeService.findOwnerEmployee(user.id);
    console.log(employee);
    if (!employee) {
      return new AuthByPhoneResponse(true, false);
    }
    return new AuthByPhoneResponse(true, true);
  }

  async createOwnerEmployee(ceoDTO: CreateEmployeeOwnerDTO) {
    if (!validatePhone(ceoDTO.phone)) {
      AppException.throwBusinessException(ErrorCode.ERR_20301());
    }
    if (!validateLengthPwd(ceoDTO.password)) {
      AppException.throwBusinessException(ErrorCode.ERR_20302());
    }
    const user = await this.userService.findByPhone(ceoDTO.phone);
    const employee = await this.employeeService.findOwnerEmployee(user.id);
    if (employee) {
      AppException.throwBusinessException(ErrorCode.ERR_20303());
    }
    const newEmployee = await this.employeeService.createOwnerEmployee(
      user.phone,
      user.id,
      ceoDTO.password,
      ceoDTO.displayName,
    );
    const token = this.jwtService.sign(
      {
        employeeId: newEmployee.id,
        userId: user.id,
        type: newEmployee.type,
      },
      {
        expiresIn: '1d',
      },
    );
    await this.tokenService.createTokenUser(newEmployee.id, token);
    delete user.otpId;
    delete user.isDelete;
    delete user.deletedAt;
    return new LoginResponse(token, user, newEmployee);
  }

  async login(loginDTO: LoginDTO) {
    if (!loginDTO.phone || !loginDTO.password) {
      AppException.throwBusinessException(ErrorCode.ERR_10001());
    }
    if (!validatePhone(loginDTO.phone)) {
      AppException.throwBusinessException(ErrorCode.ERR_20301());
    }
    if (!validateLengthPwd(loginDTO.password)) {
      AppException.throwBusinessException(ErrorCode.ERR_20302());
    }
    const user = await this.userService.findByPhone(loginDTO.phone);
    const employee = await this.employeeService.findOwnerEmployee(user.id);
    if (!employee) {
      AppException.throwBusinessException(ErrorCode.ERR_30001());
    }
    const token = this.jwtService.sign(
      {
        employeeId: employee.id,
        userId: user.id,
        type: employee.type,
      },
      {
        expiresIn: '1d',
      },
    );
    await this.tokenService.createTokenUser(employee.id, token);
    delete user.otpId;
    delete user.isDelete;
    delete user.deletedAt;
    return new LoginResponse(token, user, employee);
  }
}
