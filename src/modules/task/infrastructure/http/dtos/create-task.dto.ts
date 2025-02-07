import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

import { BaseTaskResponseDto } from './base-task.dto';

export class CreateTaskBodyDto {
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

export class CreateTaskResponseDto extends BaseTaskResponseDto {}
