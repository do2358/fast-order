export class ApiResult {
  private code: number;
  private message: string;
  private data: any;

  constructor(code: number, message: string, data?: any) {
    this.data = data;
    this.code = code;
    this.message = message;
  }

  public static SUCCESS(data: any, message?: string) {
    return new ApiResult(200, message, data);
  }

  public static ERROR(code: number, message: string) {
    return new ApiResult(code, message, null);
  }

  public static ERROR_WITH_DATA(code: number, message: string, data: any) {
    return new ApiResult(code, message, data);
  }
}
