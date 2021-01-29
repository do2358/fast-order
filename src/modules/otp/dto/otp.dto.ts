import { ApiProperty } from '@nestjs/swagger';

export class OtpDTO {
  @ApiProperty({ example: '1234' })
  readonly otp: string;
}
