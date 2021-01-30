/*
  Config mã lỗi
  1 số đầu tiên
    - 1: Lỗi http
    - 2: lỗi logic
    - 3: lỗi lỗi authen
    - 4: lỗi sql
  4 số tiếp theo: config từng lỗi theo thứ tự bắt đầu từ 0001
  riêng lỗi  2 số đầu mã lỗi usecase 2 số tiếp theo mã lỗi thứ tự
  01: Authenbyphone
  Đặc biệt: 50000 lỗi default
*/

export class ErrorCode {
  private code: number;
  private message: string;

  constructor(code: number, message: string) {
    this.code = code;
    this.message = message;
  }

  public static ERR_10001() {
    return { code: 10001, message: 'Lỗi HTTP' };
  }
  public static ERR_20101() {
    return { code: 20101, message: 'Số điện thoại nhập không đúng định dạng' };
  }
  public static ERR_20102() {
    return { code: 20102, message: 'Tài khoản của bạn đã bị khóa' };
  }
  public static ERR_20201() {
    return { code: 20201, message: 'Không thể xác thực OTP' };
  }
  public static ERR_20202() {
    return { code: 20202, message: 'Tài khoản đã xác thực OTP' };
  }
  public static ERR_20203() {
    return { code: 20203, message: 'Mã OTP đã hết hạn' };
  }
  public static ERR_20204() {
    return { code: 20204, message: 'Mã OTP đã được sử dụng' };
  }
  public static ERR_20205() {
    return { code: 20205, message: 'Mã OTP xác thực không chinh xác' };
  }
  public static ERR_20301() {
    return { code: 20301, message: 'Số điện thoại nhập không đúng định dạng' };
  }
  public static ERR_20302() {
    return { code: 20302, message: 'Mật khẩu phải gồm 6 kí tự' };
  }
  public static ERR_20303() {
    return { code: 20303, message: 'Tài khoản đã được tạo. Vui lòng thử lại' };
  }
  public static ERR_30001() {
    return { code: 300001, message: 'Sai tài khoản hoặc mật khẩu' };
  }
  public static ERR_30002() {
    return { code: 300002, message: 'Sai thông tin token' };
  }

  public static ERR_30004() {
    return { code: 300004, message: 'Không tìm thấy người dùng' };
  }
  public static ERR_30003() {
    return {
      code: 300003,
      message: 'Bạn không có quyền sử dụng chức năng này',
    };
  }
  public static ERR_40001() {
    return {
      code: 400001,
      message: 'Không thể liên kết, vui lòng thử lại sau',
    };
  }
  public static ERR_50000() {
    return { code: 50000, message: 'Có một lỗi gì đó, vui lòng thử lại sau' };
  }
}
