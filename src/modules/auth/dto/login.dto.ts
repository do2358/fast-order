import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
  @ApiProperty({ example: '0962673461' })
  readonly phone: string;

  @ApiProperty({ example: '123456' })
  readonly password: string;
}
