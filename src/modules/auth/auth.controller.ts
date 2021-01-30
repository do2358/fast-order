import { ApiResult } from './../../base/ApiResult';
import { MyLogger } from './../logger/my-logger.service';
import { Controller, Post, Body } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthenticationDTO } from './dto/authen.dto';
import { CreateEmployeeOwnerDTO } from './dto/create-employee-owner.dto';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private myLogger: MyLogger,
  ) {
    this.myLogger.setContext(AuthController.name);
  }

  @Post('by-phone')
  @ApiBody({ type: AuthenticationDTO })
  async authenByPhone(@Body() authenRequest: AuthenticationDTO): Promise<any> {
    this.myLogger.log(
      '===> login by phone request: ' + JSON.stringify(authenRequest),
    );
    const token = await this.authService.authenticationByPhone(authenRequest);
    this.myLogger.log('===> login by phone response: ' + JSON.stringify(token));
    return ApiResult.SUCCESS(token, 'Thành công');
  }

  @Post('create-employee-owner')
  @ApiBody({ type: CreateEmployeeOwnerDTO })
  async createEmployeeOwner(
    @Body() body: CreateEmployeeOwnerDTO,
  ): Promise<any> {
    this.myLogger.log(
      '===> create employee owner request: ' + JSON.stringify(body),
    );
    const data = await this.authService.createOwnerEmployee(body);
    this.myLogger.log(
      '===> create employee owner response: ' + JSON.stringify(data),
    );
    return ApiResult.SUCCESS(data, 'Thành công');
  }
}
