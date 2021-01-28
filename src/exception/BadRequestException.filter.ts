import { ErrorCode } from './../constants/ErrorCode';
import { ApiResult } from './../base/ApiResult';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(BadRequestException)
export class BadRequestFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const a = exception.getResponse();
    console.log(JSON.stringify(exception.getResponse()));
    response.status(200).json(ApiResult.ERROR(500000, JSON.stringify(a)));
  }
}
