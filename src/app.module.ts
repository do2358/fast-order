import { OtpModule } from './modules/otp/otp.module';
import { OtpEntity } from './modules/otp/enity/otp.entity';
import { StoreEmployeeEntity } from './modules/manage/entity/store-employee.enity';
import { StoreEntity } from './modules/manage/entity/store.enity';
import { EmployeeEntity } from './modules/manage/entity/employee.entity';
import { LoggerModule } from './modules/logger/logger.module';
import { UserModule } from './modules/user/user.module';
import { TIME_CACHE_DB } from './constants/AppConfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserEntity } from './modules/user/entity/user.entity';
import { TokenEntity } from './modules/user/entity/token.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PSQL_HOST,
      port: parseInt(process.env.PSQL_PORT, 10) || 5432,
      username: process.env.PSQL_USER,
      password: process.env.PSQL_PASSWORD,
      database: process.env.PSQL_DATABASE,
      entities: [
        TokenEntity,
        UserEntity,
        EmployeeEntity,
        StoreEntity,
        StoreEmployeeEntity,
        OtpEntity,
      ],
      synchronize: true,
      cache: {
        duration: TIME_CACHE_DB,
      },
    }),
    OtpModule,
    LoggerModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
