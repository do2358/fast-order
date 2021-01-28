import { UserModule } from './../user/user.module';
import { LoggerModule } from './../logger/logger.module';
import { OtpEntity } from './enity/otp.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { OtpController } from './otp.controller';
import { OtpService } from './otp.service';

@Module({
  imports: [TypeOrmModule.forFeature([OtpEntity]), LoggerModule, UserModule],
  controllers: [OtpController],
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpModule {}
