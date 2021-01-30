import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeOwnerDTO {
  @ApiProperty({ example: '0962673461' })
  readonly phone: string;

  @ApiProperty({ example: 'Abc123' })
  readonly password: string;

  @ApiProperty({ example: 'Anh Nguyen' })
  readonly displayName: string;
}
