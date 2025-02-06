import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateTaskRequestDto {
  @ApiProperty({
    example: 'Task 1',
  })
  @IsString()
  @MinLength(3)
  title: string;

  @ApiProperty({
    example: 'Task 1 description',
  })
  @IsString()
  @MinLength(3)
  description: string;
}

export class CreateTaskResponseDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  id: string;

  @ApiProperty({
    example: 'Task 1',
  })
  title: string;

  @ApiProperty({
    example: 'Task 1 description',
  })
  description: string;

  @ApiProperty({
    example: 'PENDING',
  })
  status: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  userId: string;

  @ApiProperty({
    example: '2022-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2022-01-01T00:00:00.000Z',
  })
  updatedAt: Date | null;

  constructor(partial: Partial<CreateTaskResponseDto>) {
    Object.assign(this, partial);
  }
}
