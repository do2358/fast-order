import { ErrorCode } from 'src/constants/ErrorCode';
import { AppException } from './../../exception/app.exception';
import { EMPLOYEE_TYPE, VERIFY_STATUS } from './../../constants/AppConfig';
import { OtpDTO } from './dto/authen.dto';
import { UserService } from './../user/user.service';
import { OtpEntity } from './enity/otp.entity';
import { MyLogger } from './../logger/my-logger.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getExpire, randomOtp } from 'src/util/CommandUtils';

@Injectable()
export class OtpService {
  constructor(
    private myLogger: MyLogger,
    @InjectRepository(OtpEntity)
    private readonly otpRepository: Repository<OtpEntity>,
    private readonly userService: UserService,
  ) {}

  async sendOtp(userId, phone) {
    try {
      const otp = randomOtp();
      this.myLogger.log('send otp ==> ' + phone + ' ' + otp);
      const otpEntity = new OtpEntity();
      otpEntity.phone = phone;
      otpEntity.otp = otp;
      const now = new Date();
      const timeExpire = getExpire(now, 5);
      otpEntity.exprie = timeExpire;
      const newOtp = this.otpRepository.create(otpEntity);
      await this.otpRepository.save(newOtp);
      await this.userService.updateOtp(userId, newOtp.id);
    } catch (error) {
      this.myLogger.log(
        `===> error send otp with phone: ${phone}, ${userId} and error: ${JSON.stringify(
          error,
        )}`,
      );
    }
  }

  async verifyOtp(id: string, typeEmployee: number, otpDto: OtpDTO) {
    const date = new Date();
    if (typeEmployee !== EMPLOYEE_TYPE.OWNER) {
      AppException.throwBusinessException(ErrorCode.ERR_30003());
    }
    const userEntity = await this.userService.findById(id);
    if (!userEntity) {
      AppException.throwBusinessException(ErrorCode.ERR_30004());
    }
    if (!userEntity.otpId || userEntity.otpId === null) {
      AppException.throwBusinessException(ErrorCode.ERR_20201());
    }
    if (userEntity.isVerify === VERIFY_STATUS.YES) {
      AppException.throwBusinessException(ErrorCode.ERR_20202());
    }
    const otpEntity = await this.otpRepository.findOne(userEntity.otpId);
    if (otpEntity.exprie.getTime() <= date.getTime()) {
      AppException.throwBusinessException(ErrorCode.ERR_20203());
    }
    if (otpEntity.otp !== otpDto.otp) {
      AppException.throwBusinessException(ErrorCode.ERR_20205());
    }
    await this.userService.verifyOtpSuccess(id);
    return true;
  }
}
