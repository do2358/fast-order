import { JwtService } from '@nestjs/jwt';
import { ErrorCode } from './../../constants/ErrorCode';
import { MyLogger } from './../logger/my-logger.service';
import { TokenEntity } from './entity/token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AppException } from 'src/exception/app.exception';
import { type } from 'os';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,
    private myLogger: MyLogger,
    private readonly jwtService: JwtService,
  ) {
    this.myLogger.setContext(TokenService.name);
  }

  async createTokenUser(employeeId, token) {
    try {
      const tokenEntity = new TokenEntity();
      tokenEntity.token = token;
      tokenEntity.employeeId = employeeId;
      this.tokenRepository.create(tokenEntity);
      await this.tokenRepository.save(tokenEntity);
    } catch (error) {
      this.myLogger.error(error);
      AppException.throwBusinessException(ErrorCode.ERR_40001());
    }
  }

  async updateTokenUser(employeeId, token) {
    try {
      const tokenEntity = await this.tokenRepository.findOne({
        employeeId: employeeId,
      });
      this.myLogger.log('===> Update token for user: ' + tokenEntity);
      tokenEntity.token = token;
      await this.tokenRepository.save(tokenEntity);
    } catch (error) {
      this.myLogger.error(error);
      AppException.throwBusinessException(ErrorCode.ERR_40001());
    }
  }

  async decodeToken(token) {
    const current = new Date().getTime();
    const tokenModel = await this.tokenRepository.findOne({
      token: token,
    });
    let result = null;
    if (tokenModel) {
      try {
        const tokenData = this.jwtService.decode(tokenModel.token) as {
          exp: number;
          userId: string;
          type: number;
          employeeId: string;
        };
        if (
          !tokenData ||
          tokenData.exp * 1000 <= current ||
          tokenData.employeeId !== tokenModel.employeeId
        ) {
          result = null;
        } else {
          result = {
            employeeId: tokenData.employeeId,
            type: tokenData.type,
            userId: tokenData.userId,
          };
        }
      } catch (e) {
        result = null;
      }
    }
    return result;
  }
}
