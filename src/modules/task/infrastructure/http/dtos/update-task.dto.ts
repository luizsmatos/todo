import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '@src/modules/task/domain/entities/task.entity';
import { IsEnum, IsString, IsUUID, MinLength } from 'class-validator';

import { BaseTaskResponseDto } from './base-task.dto';

export class UpdateTaskParamsDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  @IsUUID()
  taskId: string;
}

export class UpdateTaskBodyDto {
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

  @ApiProperty({
    example: 'PENDING',
    enum: TaskStatus,
    enumName: 'TaskStatus',
  })
  @IsEnum(TaskStatus)
  status: TaskStatus;
}

export class UpdateTaskResponseDto extends BaseTaskResponseDto {}
