import { ApiProperty } from '@nestjs/swagger';

export class SendOtpDTO {
  @ApiProperty({ example: '1234' })
  readonly phone: string;
}
