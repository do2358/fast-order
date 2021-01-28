import { VERIFY_STATUS } from './../../constants/AppConfig';
import { MyLogger } from './../logger/my-logger.service';
import { ErrorCode } from './../../constants/ErrorCode';
import { UserEntity } from './entity/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppException } from 'src/exception/app.exception';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private myLogger: MyLogger,
  ) {
    this.myLogger.setContext(UserService.name);
  }
  async findByPhone(phone): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      phone: phone,
      isDelete: 0,
    });
    return user;
  }

  async createByPhone(phone) {
    try {
      const userEntity = new UserEntity();
      userEntity.phone = phone;
      console.log(JSON.stringify(userEntity));
      const newEntity = this.userRepository.create(userEntity);
      await this.userRepository.save(newEntity);
      return newEntity;
    } catch (error) {
      this.myLogger.error(error);
      AppException.throwBusinessException(ErrorCode.ERR_40001());
    }
  }

  async updateOtp(userId, otpId) {
    try {
      const user = await this.userRepository.findOne({ id: userId });
      user.otp_id = otpId;
      this.userRepository.save(user);
    } catch (error) {
      this.myLogger.error(error);
    }
  }

  async findById(userId): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOne({ id: userId });
      return user;
    } catch (error) {
      this.myLogger.error('error findById' + userId);
    }
  }

  async verifyOtpSuccess(userId) {
    try {
      const user = await this.userRepository.findOne({ id: userId });
      user.isVerify = VERIFY_STATUS.YES;
      this.userRepository.save(user);
    } catch (error) {
      this.myLogger.error('error verifyOtpSuccess' + error);
    }
  }
}
