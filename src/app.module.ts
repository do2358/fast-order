import * as dotenv from 'dotenv';
dotenv.config();
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import DB_CONFIG from './shared/config/pgsql.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => DB_CONFIG,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
