import { ApiProperty } from '@nestjs/swagger';

export class AuthenticationDTO {
  @ApiProperty({ example: '0962673461' })
  readonly phone: string;
}
