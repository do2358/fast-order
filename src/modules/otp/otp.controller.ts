import { ApiResult } from './../../base/ApiResult';
import { OtpService } from './otp.service';
import { MyLogger } from './../logger/my-logger.service';
import { FOAuthGuard } from './../../security/authorization.guard';
import { Body, Controller, Post, UseGuards, Headers } from '@nestjs/common';
import { Authorization } from 'src/security/authorization.decorator';
import { ApiTags } from '@nestjs/swagger';
import { OtpDTO } from './dto/otp.dto';

@Controller('otp')
@ApiTags('Otp')
export class OtpController {
  constructor(private myLogger: MyLogger, private otpService: OtpService) {
    this.myLogger.setContext(OtpController.name);
  }
  @Authorization(true)
  @UseGuards(FOAuthGuard)
  @Post('verify')
  async verifyOtp(
    @Headers('user_id') id: string,
    @Headers('type') typeEmployee: number,
    @Body() otpDto: OtpDTO,
  ) {
    this.myLogger.log(
      '===> before verify otp  id=' +
        id +
        ' type=' +
        typeEmployee +
        ' otp=' +
        JSON.stringify(otpDto),
    );
    const result = await this.otpService.verifyOtp(id, typeEmployee, otpDto);
    return ApiResult.SUCCESS(result, 'Xác thực OTP thành công');
  }

  @Authorization(true)
  @UseGuards(FOAuthGuard)
  @Post('resend-otp')
  async resendOtp(
    @Headers('user_id') id: string,
    @Headers('type') typeEmployee: number,
  ) {
    this.myLogger.log(
      '===> before resend otp  id=' + id + ' type=' + typeEmployee,
    );
    const result = await this.otpService.resendOtp(id, typeEmployee);
    return ApiResult.SUCCESS(result, 'Resend OTP thành công');
  }
}
