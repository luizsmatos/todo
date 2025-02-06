import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

import { BaseTaskResponseDto } from './base-task.dto';

export class GetTaskRequestDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  @IsUUID()
  taskId: string;
}

export class GetTaskResponseDto extends BaseTaskResponseDto {}
