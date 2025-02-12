import { ApiProperty } from '@nestjs/swagger';

export class BaseUserResponseDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    example: 'johndoe@example.com',
  })
  email: string;

  @ApiProperty({
    example: '2021-08-03T00:00:00.000',
  })
  createdAt?: Date;

  @ApiProperty({
    example: '2021-08-03T00:00:00.000',
  })
  updatedAt?: Date | null;

  constructor(props: BaseUserResponseDto) {
    Object.assign(this, props);
  }
}
