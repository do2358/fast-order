import { ApiResult } from '../base/ApiResult';
import { HttpException } from '@nestjs/common';

export class AppException extends HttpException {
  constructor(errorData: ApiResult) {
    super(errorData, 200);
  }

  public static throwBusinessException(payload: {
    code: number;
    message: string;
  }) {
    throw new AppException(ApiResult.ERROR(payload.code, payload.message));
  }
}
