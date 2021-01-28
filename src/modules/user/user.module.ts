import { JwtModule } from '@nestjs/jwt';
import { MyLogger } from './../logger/my-logger.service';
import { LoggerModule } from './../logger/logger.module';
import { TokenEntity } from './entity/token.entity';
import { UserEntity } from './entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenService } from './token.service';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtConfigService } from 'src/security/JwtConfig';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, TokenEntity]),
    LoggerModule,
    JwtModule.registerAsync({
      useClass: JwtConfigService,
    }),
  ],
  controllers: [UserController],
  providers: [UserService, TokenService],
  exports: [UserService, TokenService],
})
export class UserModule {}
