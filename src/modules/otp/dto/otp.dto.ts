import { ApiProperty } from '@nestjs/swagger';

export class OtpDTO {
  @ApiProperty({ example: '1234' })
  readonly otp: string;

  @ApiProperty({ example: '0962673471' })
  readonly phone: string;
}
