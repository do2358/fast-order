import { ApiResult } from './../../base/ApiResult';
import { OtpService } from './otp.service';
import { MyLogger } from './../logger/my-logger.service';
import { FOAuthGuard } from './../../security/authorization.guard';
import { Body, Controller, Post, UseGuards, Headers } from '@nestjs/common';
import { Authorization } from 'src/security/authorization.decorator';
import { ApiTags } from '@nestjs/swagger';
import { OtpDTO } from './dto/otp.dto';
import { SendOtpDTO } from './dto/send-otp.dto';
import { send } from 'process';

@Controller('otp')
@ApiTags('Otp')
export class OtpController {
  constructor(private myLogger: MyLogger, private otpService: OtpService) {
    this.myLogger.setContext(OtpController.name);
  }

  @Post('verify')
  async verifyOtp(@Body() otpDto: OtpDTO) {
    this.myLogger.log('===> before verify otp=' + JSON.stringify(otpDto));
    const result = await this.otpService.verifyOtp(otpDto);
    return ApiResult.SUCCESS(result, 'Xác thực OTP thành công');
  }

  // @Authorization(true)
  // @UseGuards(FOAuthGuard)
  @Post('resend-otp')
  async reSendOtp(@Body() sendOtp: SendOtpDTO) {
    this.myLogger.log('===> before verify otp=' + JSON.stringify(sendOtp));
    const result = await this.otpService.resendOtp(sendOtp);
    return ApiResult.SUCCESS(result, 'Resend OTP thành công');
  }
}
