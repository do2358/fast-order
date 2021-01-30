export class AuthByPhoneResponse {
  isVerify: boolean;
  isCreateEmployeeOwner: boolean;
  constructor(isVerify: boolean, isCreateEmployeeOwner: boolean) {
    this.isVerify = isVerify;
    this.isCreateEmployeeOwner = isCreateEmployeeOwner;
  }
}
