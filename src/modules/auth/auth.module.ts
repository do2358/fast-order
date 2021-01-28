import { OtpModule } from './../otp/otp.module';
import { ManageModule } from './../manage/manage.module';
import { LoggerModule } from './../logger/logger.module';
import { JwtConfigService } from '../../security/JwtConfig';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      useClass: JwtConfigService,
    }),
    LoggerModule,
    ManageModule,
    OtpModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
